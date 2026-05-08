import React, { useState } from "react";
import { motion } from "framer-motion";

interface Feature {
  title: string;
  description: string;
  imageSrc?: string;
}

interface BouncyCardsFeaturesProps {
  title?: string;
  features?: Feature[];
}

const defaultFeatures: Feature[] = [
  { title: "Categorías flexibles", description: "Organiza participantes, jurados y rondas por modalidad, edad o nivel.", imageSrc: "/mockups/Categorias.png" },
  { title: "Jurados y notas", description: "Introduce, revisa y corrige puntuaciones con medias centralizadas.", imageSrc: "/mockups/Notas_Jurado.png" },
  { title: "Pase de ronda", description: "Define cuántos participantes avanzan y ejecuta la decisión desde administración.", imageSrc: "/mockups/Pase_de_ronda.png" },
  { title: "Importación CSV", description: "Crea inscripciones desde archivos CSV cuando la organización ya tiene datos.", imageSrc: "/mockups/Importacion_CSV.png" },
  { title: "Ensayos y actuaciones", description: "Asigna hora, sala y ronda para cada ensayo o actuación.", imageSrc: "/mockups/Ensayos_y_actuaciones.png" },
  { title: "Calendario global", description: "Consulta todos los eventos de tus concursos desde una vista ordenada.", imageSrc: "/mockups/Calendario_gobal.png" },
];

export const BouncyCardsFeatures: React.FC<BouncyCardsFeaturesProps> = ({ 
  title,
  features 
}) => {
  const featureItems = features && features.length >= 6 
    ? features.slice(0, 6) 
    : defaultFeatures;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 text-slate-100">
      <div className="mb-8 flex flex-col items-center md:px-8">
        <h2 className="max-w-2xl text-center text-4xl font-bold md:text-5xl">
          {title}
        </h2>
      </div>
      
      {/* Row 1: 4 + 8 */}
      <div className="mb-4 grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-4">
          <CardTitle>{featureItems[0].title}</CardTitle>
          <FeatureDemo 
            imageSrc={featureItems[0].imageSrc}
          />
        </BounceCard>
        <BounceCard className="col-span-12 md:col-span-8">
          <CardTitle>{featureItems[1].title}</CardTitle>
          <FeatureDemo 
            imageSrc={featureItems[1].imageSrc}
          />
        </BounceCard>
      </div>
      
      {/* Row 2: 8 + 4 */}
      <div className="mb-4 grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-8">
          <CardTitle>{featureItems[2].title}</CardTitle>
          <FeatureDemo 
            imageSrc={featureItems[2].imageSrc}
          />
        </BounceCard>
        <BounceCard className="col-span-12 md:col-span-4">
          <CardTitle>{featureItems[3].title}</CardTitle>
          <FeatureDemo 
            imageSrc={featureItems[3].imageSrc}
          />
        </BounceCard>
      </div>
      
      {/* Row 3: 4 + 8 */}
      <div className="grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-4">
          <CardTitle>{featureItems[4].title}</CardTitle>
          <FeatureDemo 
            imageSrc={featureItems[4].imageSrc}
          />
        </BounceCard>
        <BounceCard className="col-span-12 md:col-span-8">
          <CardTitle>{featureItems[5].title}</CardTitle>
          <FeatureDemo 
            imageSrc={featureItems[5].imageSrc}
          />
        </BounceCard>
      </div>
    </section>
  );
};

const BounceCard: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 0.95, rotate: "-1deg" }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={`group relative min-h-[300px] cursor-pointer overflow-hidden rounded-2xl bg-slate-800 p-8 ${className}`}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === FeatureDemo) {
          return React.cloneElement(child as React.ReactElement<any>, { isHovered });
        }
        return child;
      })}
    </motion.div>
  );
};

const CardTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <h3 className="relative z-10 mx-auto text-center text-3xl font-semibold text-slate-100">{children}</h3>
  );
};

const FeatureDemo: React.FC<{ 
  imageSrc?: string;
  isHovered?: boolean;
}> = ({ 
  imageSrc,
  isHovered = false
}) => {
  return (
    <motion.div
      className="absolute bottom-0 left-4 right-4 top-32 rounded-t-2xl overflow-hidden bg-slate-200"
      initial={false}
      animate={{
        y: isHovered ? 16 : 32,
        rotate: isHovered ? 2 : 0
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Feature preview"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      )}
    </motion.div>
  );
};
