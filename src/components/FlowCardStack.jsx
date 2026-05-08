import { CardStack } from "./ui/card-stack.jsx";

const SCREEN_MAP = [
  "/mockups/Pasos/Crear_concurso.png",
  "/mockups/Pasos/Carga_participantes.png",
  "/mockups/Pasos/Asignar_jurados.png",
  "/mockups/Pasos/Gestionar_rondas.png",
  "/mockups/Pasos/Ordenar_calendario.png",
];

function FlowCard({ item }) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0">
        <img
          src={item.imageSrc}
          alt={item.title}
          className="h-full w-full object-cover"
          draggable={false}
          loading="eager"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <div className="relative z-10 flex h-full flex-col justify-end p-7">
        <span
          style={{
            color: "var(--accent)",
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: "0.68rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: "10px",
            display: "block",
          }}
        >
          Paso {item.tag}
        </span>
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: "1.35rem",
            lineHeight: 1.15,
            color: "white",
          }}
        >
          {item.title}
        </div>
        {item.description && (
          <div
            style={{
              marginTop: "8px",
              fontSize: "0.9rem",
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.65)",
            }}
          >
            {item.description}
          </div>
        )}
      </div>
    </div>
  );
}

export function FlowCardStack({ steps }) {
  const items = steps.map(([number, title, description], i) => ({
    id: number,
    tag: number,
    title,
    description,
    imageSrc: SCREEN_MAP[i] ?? "/mockups/Pasos/Crear_concurso.png",
  }));

  return (
    <CardStack
      items={items}
      autoAdvance
      intervalMs={2600}
      pauseOnHover
      showDots
      cardWidth={500}
      cardHeight={320}
      maxVisible={5}
      overlap={0.58}
      spreadDeg={36}
      depthPx={100}
      tiltXDeg={10}
      activeScale={1.04}
      inactiveScale={0.93}
      activeLiftPx={20}
      springStiffness={260}
      springDamping={26}
      renderCard={(item, { active }) => <FlowCard item={item} active={active} />}
    />
  );
}
