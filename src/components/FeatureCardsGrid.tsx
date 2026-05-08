import React from 'react';
import { CheckCircle, Shield, Eye } from 'lucide-react';
import { FeatureCard } from './ui/grid-feature-cards';

interface FeatureCardsGridProps {
  cards: [string, string][];
}

export function FeatureCardsGrid({ cards }: FeatureCardsGridProps) {
  const features = [
    {
      title: cards[0][0],
      icon: CheckCircle,
      description: cards[0][1],
    },
    {
      title: cards[1][0],
      icon: Shield,
      description: cards[1][1],
    },
    {
      title: cards[2][0],
      icon: Eye,
      description: cards[2][1],
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto">
      {features.map((feature, i) => (
        <div key={i} className="border border-dashed border-white/20 rounded-2xl overflow-hidden">
          <FeatureCard feature={feature} className="text-left" />
        </div>
      ))}
    </div>
  );
}
