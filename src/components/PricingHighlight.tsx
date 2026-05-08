import React from "react";
import HighlightCard from "./ui/highlight-card";
import { Ticket, ClipboardList, ShieldCheck } from "lucide-react";

interface PricingCardData {
  title: string;
  description: string[];
  iconKey: "ticket" | "clipboard" | "shield";
}

interface PricingHighlightProps {
  cards: PricingCardData[];
}

const ICON_MAP = {
  ticket: Ticket,
  clipboard: ClipboardList,
  shield: ShieldCheck,
} as const;

export default function PricingHighlight({ cards }: PricingHighlightProps) {
  return (
    <div className="grid grid-cols-3 items-stretch gap-6 px-4 max-w-5xl mx-auto w-full">
      {cards.map((card, i) => {
        const IconComponent = ICON_MAP[card.iconKey];
        const isWhitelist = i === 2;
        return (
          <HighlightCard
            key={card.iconKey}
            title={card.title}
            description={card.description}
            icon={<IconComponent className="w-8 h-8 text-white" />}
            variant={isWhitelist ? "accent" : "default"}
          />
        );
      })}
    </div>
  );
}