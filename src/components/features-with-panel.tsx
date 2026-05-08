'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface FeatureItem {
  title: string;
  alt?: string;
  description?: string;
  content: string | React.ReactNode;
}

interface FeaturesWithPanelProps {
  items?: FeatureItem[];
  className?: string;
}

function FeatureMedia({ content, alt }: { content: string | React.ReactNode; alt?: string }) {
  if (typeof content !== 'string') {
    return <div className='w-full h-full'>{content}</div>;
  }

  const isVideo = /\.(mp4|webm|ogg)$/i.test(content);
  const isImage = /\.(jpg|jpeg|png|webp|gif|avif|svg)$/i.test(content) || /unsplash|images\./i.test(content);

  if (isVideo) {
    return (
      <video
        src={content}
        autoPlay
        muted
        loop
        playsInline
        className='w-full h-full object-cover'
      />
    );
  }

  if (isImage) {
    return <img src={content} alt={alt} className='w-full h-full object-cover' />;
  }

  return (
    <div className='flex items-center justify-center w-full h-full p-8'>
      <p className='text-sm leading-relaxed' style={{ color: 'var(--muted)' }}>{content}</p>
    </div>
  );
}

export default function FeaturesWithPanel({
  items = [],
  className,
}: FeaturesWithPanelProps) {
  const [active, setActive] = React.useState(0);

  return (
    <section className={cn('relative w-full py-24', className)}>
      <div className='mx-auto max-w-6xl px-6'>
        <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-16 lg:items-start'>

          <div>
            <ul className='flex flex-col gap-1'>
              {items.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.07, ease: 'easeOut' }}
                  onClick={() => setActive(index)}
                  className={cn(
                    'flex flex-col px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-200 lg:flex-row lg:items-center lg:gap-4 border',
                    active === index
                      ? ''
                      : 'border-transparent hover:border-opacity-50'
                  )}
                  style={{
                    borderColor: active === index ? 'var(--accent)' : 'transparent',
                    background: active === index ? 'var(--panel-soft)' : 'transparent',
                  }}
                >
                  <div className='flex flex-row items-center gap-4 w-full lg:contents'>
                    <span
                      className={cn(
                        'size-7 rounded-full flex items-center justify-center text-xs font-medium shrink-0 transition-colors duration-200',
                      )}
                      style={{
                        background: active === index ? 'var(--accent)' : 'var(--panel-soft)',
                        color: active === index ? '#081009' : 'var(--muted)',
                      }}
                    >
                      {index + 1}
                    </span>
                    <span
                      className={cn(
                        'text-sm font-medium transition-colors duration-200',
                      )}
                      style={{
                        color: active === index ? 'var(--text)' : 'var(--muted)',
                      }}
                    >
                      {item.title}
                    </span>
                  </div>

                  <AnimatePresence initial={false}>
                    {active === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        className='w-full overflow-hidden lg:hidden'
                      >
                        <div
                          className='w-full mt-3 overflow-hidden rounded-xl border aspect-[4/3] relative'
                          style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}
                        >
                          <div className='absolute inset-0'>
                            <FeatureMedia content={item.content} alt={item.alt} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className='hidden lg:block sticky top-10'>
            <div
              className='relative w-full aspect-[4/3] overflow-hidden rounded-xl border'
              style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}
            >
              <AnimatePresence mode='wait'>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className='absolute inset-0'
                >
                  <FeatureMedia content={items[active].content} alt={items[active].alt} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
