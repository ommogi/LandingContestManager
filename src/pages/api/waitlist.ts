import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => null);

  if (!body) {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim().toLowerCase();
  const organization = String(body.organization ?? '').trim();

  if (!name || !email) {
    return new Response(JSON.stringify({ error: 'Name and email are required' }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ error: 'Invalid email address' }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // ── Supabase insert ────────────────────────────────────────────────────────
  const supabase = createClient(
    import.meta.env.SUPABASE_URL,
    import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
  );

  const { error: dbError } = await supabase
    .from('waitlist')
    .insert({ name, email, organization: organization || null });

  if (dbError) {
    if (dbError.code === '23505') {
      return new Response(JSON.stringify({ error: 'already_registered' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    console.error('[waitlist] Supabase error:', dbError);
    return new Response(JSON.stringify({ error: 'Database error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // ── Resend emails ─────────────────────────────────────────────────────────
  const resend = new Resend(import.meta.env.RESEND_API_KEY);
  const fromAddress = import.meta.env.RESEND_FROM ?? 'onboarding@resend.dev';
  const adminEmail = import.meta.env.ADMIN_EMAIL ?? 'mtr.omarmg@gmail.com';

  // Admin notification
  await resend.emails.send({
    from: fromAddress,
    to: adminEmail,
    subject: `Nueva inscripción waitlist: ${name}`,
    html: `
      <h2>Nueva inscripción en la waitlist</h2>
      <table>
        <tr><td><strong>Nombre</strong></td><td>${name}</td></tr>
        <tr><td><strong>Email</strong></td><td>${email}</td></tr>
        <tr><td><strong>Organización</strong></td><td>${organization || '—'}</td></tr>
      </table>
    `,
  }).catch((err: unknown) => console.error('[waitlist] Admin email error:', err));

  // Confirmation to user — silently skipped if domain not verified
  await resend.emails.send({
    from: fromAddress,
    to: email,
    subject: 'Te apuntaste a la lista blanca de ContestManager',
    html: `
      <h2>¡Hola, ${name}!</h2>
      <p>Has quedado inscrito en la lista blanca de <strong>ContestManager</strong>.</p>
      <p>Te avisaremos en cuanto esté disponible. Como inscrito, tendrás un <strong>5% de descuento</strong> en tu primera compra.</p>
      <br/>
      <p>— El equipo de ContestManager</p>
    `,
  }).catch((err: unknown) => console.error('[waitlist] User confirmation email error:', err));

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
