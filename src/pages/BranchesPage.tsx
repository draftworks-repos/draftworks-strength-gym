import React from 'react';
import { MapPin, Phone, Clock, ArrowUpRight, Check } from 'lucide-react';
import { BRANCHES, IMAGES } from '../data/gymData';
import { ResilientImage } from '../components/ResilientImage';

interface BranchesPageProps {
  onOpenEnquiry: (program?: string, branch?: string) => void;
}

export const BranchesPage: React.FC<BranchesPageProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="w-full overflow-x-hidden">
      {/* HERO (Option A — Location-Focused Full-Screen Hero, 100svh) */}
      <section className="relative min-h-[100svh] w-full flex items-end bg-[#171A18] text-[#F5F4EF] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ResilientImage
            src={IMAGES.facilityInteriorWide}
            alt="DraftWorks Indiranagar Bengaluru flagship strength floor"
            priority={true}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171A18] via-[#171A18]/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 pt-28 pb-16 sm:pb-24">
          <div className="max-w-3xl space-y-5">
            <p className="text-xs sm:text-sm font-medium tracking-wide text-[#F5F4EF]/80">
              Bengaluru · Mumbai · Pune · Hyderabad
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F4EF] leading-[0.96]">
              Four Strength Clubs Built for Serious Lifters.
            </h1>
            <p className="text-base sm:text-lg text-[#F5F4EF]/85 max-w-xl leading-relaxed">
              Every DraftWorks location features custom power racks, oak lifting platforms, 22m+ conditioning turf, and natural daylight architecture.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onOpenEnquiry()}
                className="px-7 py-4 text-sm sm:text-base font-semibold rounded-xl bg-[#315B43] text-[#F5F4EF] hover:bg-[#264835] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Book a Club Visit &amp; Trial
              </button>
              <a
                href="#branch-list"
                className="px-5 py-4 text-sm font-medium text-[#F5F4EF]/90 hover:text-[#F5F4EF] transition-colors"
              >
                Explore All 4 Locations ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ALTERNATING EDITORIAL BRANCH PRESENTATIONS */}
      <section id="branch-list" className="py-16 lg:py-24 bg-[#F5F4EF] text-[#171A18]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-20 lg:space-y-28">
          {BRANCHES.map((branch, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <article
                key={branch.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pb-16 border-b border-[#E3E5DF] last:border-b-0 last:pb-0"
              >
                <div
                  className={`lg:col-span-6 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="rounded-2xl overflow-hidden aspect-[16/11] bg-[#171A18] border border-[#E3E5DF]">
                    <ResilientImage
                      src={branch.image}
                      alt={branch.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div
                  className={`lg:col-span-6 space-y-5 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="text-xs text-[#315B43] font-semibold uppercase tracking-wider">
                    0{idx + 1}. {branch.city} · {branch.areaSqFt}
                  </div>
                  <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#171A18]">
                    {branch.name}
                  </h2>

                  <div className="space-y-2.5 text-sm text-[#171A18]/85">
                    <p className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#315B43] shrink-0 mt-1" />
                      <span>
                        {branch.address} <span className="text-[#858B85]">({branch.landmark})</span>
                      </span>
                    </p>
                    <p className="flex items-center gap-2.5 tabular-nums">
                      <Clock className="w-4 h-4 text-[#315B43] shrink-0" />
                      <span>
                        Mon–Sat: {branch.hoursWeekday} · Sun: {branch.hoursWeekend}
                      </span>
                    </p>
                    <p className="flex items-center gap-2.5 tabular-nums">
                      <Phone className="w-4 h-4 text-[#315B43] shrink-0" />
                      <a
                        href={`tel:${branch.phone.replace(/\s+/g, '')}`}
                        className="hover:underline font-medium"
                      >
                        {branch.phone}
                      </a>
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {branch.highlights.map((feat) => (
                      <div
                        key={feat}
                        className="flex items-start gap-2 text-xs sm:text-sm text-[#171A18]/80 bg-white p-3 rounded-xl border border-[#E3E5DF]"
                      >
                        <Check className="w-3.5 h-3.5 text-[#315B43] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        onOpenEnquiry(undefined, `${branch.name} (${branch.city})`)
                      }
                      className="px-6 py-3 text-xs sm:text-sm font-semibold rounded-xl bg-[#315B43] text-[#F5F4EF] hover:bg-[#264835] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      Book Trial at {branch.city}
                    </button>
                    <a
                      href={branch.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-3 text-xs sm:text-sm font-semibold rounded-xl border border-[#171A18]/25 hover:border-[#171A18] transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Open in Google Maps</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};
