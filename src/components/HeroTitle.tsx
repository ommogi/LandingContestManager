import TextHighlighter from './ui/text-highlighter';

interface HeroTitleProps {
  title: string;
  highlight: string;
  heroClass?: string;
}

/** Split text into per-word animation units. Bare punctuation stays as plain text. */
function wordSpans(text: string) {
  const parts = text.match(/(\S+|\s+)/g) || [];
  return parts.map((part, i) =>
    /\w/.test(part)
      ? <span key={i} className="text-animation-unit">{part}</span>
      : part  // whitespace / bare punctuation (e.g. ".") stays as plain text
  );
}

export default function HeroTitle({ title, highlight, heroClass = '' }: HeroTitleProps) {
  const highlightIndex = title.toLowerCase().indexOf(highlight.toLowerCase());

  if (highlightIndex === -1) {
    return <h1 className={heroClass}>{wordSpans(title)}</h1>;
  }

  const before = title.slice(0, highlightIndex);
  const match = title.slice(highlightIndex, highlightIndex + highlight.length);
  const after = title.slice(highlightIndex + highlight.length);

  return (
    <h1 className={heroClass}>
      {before && wordSpans(before)}
      {/* Wrap highlighted phrase as one spring-scale-in unit */}
      <span className="text-animation-unit" style={{ display: 'inline-block' }}>
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
      </span>
      {wordSpans(after)}
    </h1>
  );
}
