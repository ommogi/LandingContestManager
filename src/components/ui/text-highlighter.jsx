import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const TextHighlighter = ({
  children,
  highlightColor = '#ff6b9d',
  highlightOpacity = 1,
  animationDuration = 1.2,
  animationDelay = 0,
  strokeWidth = 2,
  className = '',
  style = {},
  type = 'wavy',
  triggerOnView = true,
  repeat = false,
}) => {
  const spanRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(!triggerOnView);

  useEffect(() => {
    if (!triggerOnView) return;

    const el = spanRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!repeat) observer.unobserve(el);
        } else if (repeat) {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerOnView, repeat]);

  const updateDimensions = useCallback(() => {
    const el = spanRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setDimensions({ width: rect.width, height: rect.height });
  }, []);

  useEffect(() => {
    updateDimensions();
    const el = spanRef.current;
    if (!el) return;
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, [updateDimensions]);

  const generateWavyPath = (width, height) => {
    const y = height * 0.88;
    const amplitude = 3;
    const frequency = 0.06;
    let path = `M 0 ${y}`;
    for (let x = 1; x <= width; x += 2) {
      const yVal = y + Math.sin(x * frequency) * amplitude;
      path += ` L ${x} ${yVal}`;
    }
    return path;
  };

  const generateZigzagPath = (width, height) => {
    const y = height * 0.88;
    const amplitude = 3;
    const wavelength = 8;
    let path = `M 0 ${y}`;
    for (let x = 0; x <= width; x += wavelength) {
      const yVal = y + ((Math.round(x / wavelength) % 2 === 0) ? -amplitude : amplitude);
      path += ` L ${x} ${yVal}`;
    }
    return path;
  };

  const path = type === 'wavy'
    ? generateWavyPath(dimensions.width, dimensions.height)
    : generateZigzagPath(dimensions.width, dimensions.height);

  return (
    <span
      ref={spanRef}
      className={className}
      style={{ position: 'relative', display: 'inline-block', ...style }}
    >
      {children}
      {dimensions.width > 0 && (
        <svg
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: dimensions.width,
            height: dimensions.height,
            pointerEvents: 'none',
            overflow: 'visible',
          }}
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          fill="none"
        >
          <motion.path
            d={path}
            stroke={highlightColor}
            strokeOpacity={highlightOpacity}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{
              duration: animationDuration,
              delay: animationDelay,
              ease: 'easeInOut',
            }}
          />
        </svg>
      )}
    </span>
  );
};

export default TextHighlighter;