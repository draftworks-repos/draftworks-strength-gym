import React, { useState, useRef, useId } from 'react';
import { MoveHorizontal } from 'lucide-react';
import type { TransformationStory } from '../data/gymData';
import { clampSliderPosition } from '../utils/gymLogic';

interface BeforeAfterSliderProps {
  story: TransformationStory;
  tone?: 'dark' | 'light';
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  story,
  tone = 'dark',
}) => {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const clipId = useId().replace(/:/g, '');

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    const rawPercent = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(clampSliderPosition(rawPercent));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateFromClientX(e.clientX);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPos((cur) => clampSliderPosition(cur - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPos((cur) => clampSliderPosition(cur + 5));
    }
  };

  const splitX = Math.round(sliderPos * 8);

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={containerRef}
        tabIndex={0}
        role="slider"
        aria-label={`Before and after comparison slider for ${story.memberName}`}
        aria-valuemin={5}
        aria-valuemax={95}
        aria-valuenow={Math.round(sliderPos)}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#171A18] border border-[#E3E5DF]/20 cursor-ew-resize select-none touch-none focus-visible:outline-2 focus-visible:outline-[#315B43]"
        data-testid="before-after-viewport"
        data-slider-position={sliderPos}
      >
        <svg
          viewBox="0 0 800 1000"
          className="w-full h-full block"
          role="img"
          aria-label={`Before and after comparison for ${story.memberName}`}
        >
          <defs>
            <clipPath id={`clip-${clipId}`}>
              <rect x="0" y="0" width={splitX} height="1000" />
            </clipPath>
            <filter id={`before-tone-${clipId}`}>
              <feColorMatrix type="saturate" values="0.82" />
            </filter>
          </defs>

          {/* After Image (Full Canvas) */}
          <image
            href={story.afterImage}
            x="0"
            y="0"
            width="800"
            height="1000"
            preserveAspectRatio="xMidYMid slice"
          />

          {/* Before Image (Clipped Left Portion) */}
          <g clipPath={`url(#clip-${clipId})`}>
            <image
              href={story.beforeImage}
              x="0"
              y="0"
              width="800"
              height="1000"
              preserveAspectRatio="xMidYMid slice"
              filter={`url(#before-tone-${clipId})`}
            />
          </g>

          {/* Divider Line */}
          <line
            x1={splitX}
            y1="0"
            x2={splitX}
            y2="1000"
            stroke="#F5F4EF"
            strokeWidth="3"
          />

          {/* Center Drag Handle Circle */}
          <circle
            cx={splitX}
            cy="500"
            r="28"
            fill="#315B43"
            stroke="#F5F4EF"
            strokeWidth="3"
          />
          <path
            d={`M ${splitX - 10} 500 L ${splitX - 3} 493 M ${splitX - 10} 500 L ${splitX - 3} 507 M ${splitX + 10} 500 L ${splitX + 3} 493 M ${splitX + 10} 500 L ${splitX + 3} 507`}
            stroke="#F5F4EF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Overlay Badges: Only "Before" on left and "After" on right */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 pt-16 pb-4 px-4 sm:px-5 bg-gradient-to-t from-[#171A18]/80 via-[#171A18]/25 to-transparent flex items-end justify-between gap-3 text-xs text-[#F5F4EF]">
          <div className="bg-[#171A18]/85 backdrop-blur-sm px-3.5 py-1.5 rounded-lg border border-[#F5F4EF]/15 whitespace-nowrap shrink-0">
            <span className="font-semibold text-[#F5F4EF]">Before</span>
          </div>
          <div className="bg-[#315B43]/90 backdrop-blur-sm px-3.5 py-1.5 rounded-lg border border-[#F5F4EF]/20 text-right whitespace-nowrap shrink-0">
            <span className="font-semibold text-[#F5F4EF]">After</span>
          </div>
        </div>
      </div>

      {/* Small Helper Text Below Image */}
      <div
        className={`flex items-center gap-2 text-xs ${
          tone === 'light' ? 'text-[#171A18]/70' : 'text-[#858B85]'
        }`}
      >
        <MoveHorizontal className="w-4 h-4 text-[#315B43] shrink-0" />
        <span>Drag divider left or right to compare before and after</span>
      </div>
    </div>
  );
};
