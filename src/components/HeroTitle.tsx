import TextHighlighter from './ui/text-highlighter';

interface HeroTitleProps {
  title: string;
  highlight: string;
  heroClass?: string;
}

export default function HeroTitle({ title, highlight, heroClass = '' }: HeroTitleProps) {
  const highlightIndex = title.toLowerCase().indexOf(highlight.toLowerCase());

  if (highlightIndex === -1) {
    return <h1 className={heroClass}>{title}</h1>;
  }

  const before = title.slice(0, highlightIndex);
  const match = title.slice(highlightIndex, highlightIndex + highlight.length);
  const after = title.slice(highlightIndex + highlight.length);

  return (
    <h1 className={heroClass}>
      {before}
      <TextHighlighter
        type="wavy"
        highlightColor="#b8ff7a"
        animationDuration={1.2}
        animationDelay={0.6}
        strokeWidth={2.5}
        triggerOnView={false}
      >
        {match}
      </TextHighlighter>
      {after}
    </h1>
  );
}