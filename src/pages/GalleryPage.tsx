import React, { useState } from 'react';
import { X, Maximize2 } from 'lucide-react';
import { GALLERY_ITEMS, IMAGES, type GalleryItem } from '../data/gymData';
import { ResilientImage } from '../components/ResilientImage';

interface GalleryPageProps {
  onOpenEnquiry: (program?: string, branch?: string) => void;
}

const GALLERY_CATEGORIES = [
  'All',
  'Strength Floor',
  'Conditioning Turf',
  'Coaching',
  'Recovery & Architecture',
];

const MASONRY_ASPECTS = [
  'aspect-[4/3]',
  'aspect-[3/4]',
  'aspect-[16/10]',
  'aspect-[4/5]',
  'aspect-[4/3]',
  'aspect-[16/11]',
];

export const GalleryPage: React.FC<GalleryPageProps> = ({ onOpenEnquiry }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="w-full overflow-x-hidden">
      {/* HERO (Option A — Visual-First Full-Screen Hero with Minimal Text, 100svh) */}
      <section className="relative min-h-[100svh] w-full flex items-end bg-[#171A18] text-[#F5F4EF] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ResilientImage
            src={IMAGES.facilityInteriorWide}
            alt="Natural light streaming across the DraftWorks strength and turf floor"
            priority={true}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171A18] via-[#171A18]/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 pt-28 pb-16 sm:pb-24 flex flex-col sm:flex-row sm:items-end justify-between gap-8">
          <div className="max-w-xl space-y-4">
            <p className="text-xs font-semibold tracking-wide text-[#F5F4EF]/80">
              Spaces &amp; Equipment
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F4EF] leading-[0.95]">
              Designed for Focus.
            </h1>
            <p className="text-sm sm:text-base text-[#F5F4EF]/85">
              High industrial windows, calibrated steel, and zero visual clutter across our four studios.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenEnquiry()}
            className="px-6 py-3.5 text-sm font-semibold rounded-xl bg-[#315B43] text-[#F5F4EF] hover:bg-[#264835] transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-auto"
          >
            Tour a Club in Person
          </button>
        </div>
      </section>

      {/* FILTERABLE MASONRY ARCHITECTURAL GALLERY (Label Only on Cards) */}
      <section className="py-16 lg:py-24 bg-[#F5F4EF] text-[#171A18]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-10 border-b border-[#E3E5DF]">
            <div className="flex flex-wrap items-center gap-2">
              {GALLERY_CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    activeCategory === category
                      ? 'bg-[#171A18] text-[#F5F4EF]'
                      : 'bg-white text-[#171A18]/80 border border-[#E3E5DF] hover:border-[#171A18]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <span className="text-xs text-[#858B85] tabular-nums">
              {filteredItems.length} Photographs
            </span>
          </div>

          <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                className={`break-inside-avoid group relative rounded-2xl overflow-hidden bg-[#171A18] border border-[#E3E5DF] ${
                  MASONRY_ASPECTS[idx % MASONRY_ASPECTS.length]
                }`}
              >
                <ResilientImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-[#171A18]/85 via-[#171A18]/25 to-transparent flex items-end justify-between gap-4">
                  <span className="text-xs font-medium text-[#F5F4EF]/90">
                    {item.category} · {item.branch}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    aria-label={`View larger image of ${item.category} at ${item.branch}`}
                    className="p-2 rounded-xl bg-[#F5F4EF]/15 text-[#F5F4EF] hover:bg-[#315B43] transition-colors shrink-0 cursor-pointer"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#171A18]/90 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedItem.category} · ${selectedItem.branch}`}
        >
          <div
            className="fixed inset-0"
            onClick={() => setSelectedItem(null)}
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-4xl w-full rounded-2xl overflow-hidden bg-[#171A18] border border-[#F5F4EF]/15 text-[#F5F4EF]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#F5F4EF]/10">
              <span className="text-xs font-medium text-[#F5F4EF]/85">
                {selectedItem.category} · {selectedItem.branch}
              </span>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label="Close image preview"
                className="p-2 rounded-xl hover:bg-[#F5F4EF]/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-[16/10] bg-[#171A18]">
              <ResilientImage
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
