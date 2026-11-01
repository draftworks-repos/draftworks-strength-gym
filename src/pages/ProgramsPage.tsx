import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X, ArrowRight, RotateCcw } from 'lucide-react';
import { PROGRAMS, IMAGES } from '../data/gymData';
import { filterPrograms, formatInr } from '../utils/gymLogic';
import { ResilientImage } from '../components/ResilientImage';

interface ProgramsPageProps {
  onNavigate: (path: string) => void;
  onOpenEnquiry: (program?: string, branch?: string) => void;
}

const CATEGORIES = [
  'All',
  'Strength',
  'Conditioning',
  'Mobility & Recovery',
  'Personal Coaching',
];

const INTENSITIES = ['All', 'Foundational', 'Intermediate', 'High Output'];

export const ProgramsPage: React.FC<ProgramsPageProps> = ({
  onNavigate,
  onOpenEnquiry,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedIntensity, setSelectedIntensity] = useState('All');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const filteredPrograms = filterPrograms(
    PROGRAMS,
    searchQuery,
    selectedCategory,
    selectedIntensity
  );

  useEffect(() => {
    if (!isFilterDrawerOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isFilterDrawerOpen]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedIntensity('All');
  };

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  const activeFilterCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedIntensity !== 'All' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  return (
    <div className="w-full overflow-x-hidden">
      {/* HERO (Full-Screen Background Image Hero like Homepage and Branches Page, 100svh) */}
      <section className="relative min-h-[100svh] w-full flex items-end bg-[#171A18] text-[#F5F4EF] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ResilientImage
            src={IMAGES.programFunctionalAthletics}
            alt="Athletes training with prowler sleds and kettlebells at DraftWorks"
            priority={true}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171A18] via-[#171A18]/70 to-[#171A18]/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#171A18]/90 via-[#171A18]/45 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 pt-28 pb-16 sm:pb-24 lg:pb-28">
          <div className="max-w-2xl space-y-6">
            <p className="text-xs sm:text-sm font-medium tracking-wide text-[#F5F4EF]/80">
              8-Week Periodized Blocks
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F4EF] leading-[0.96]">
              Programs Built Around Measurable Progression.
            </h1>
            <p className="text-base sm:text-lg text-[#F5F4EF]/85 max-w-xl leading-relaxed">
              Whether you are learning barbell mechanics for the first time, building aerobic engine on the sled turf, or working 1-on-1 with a performance coach, every session follows a written curriculum.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onOpenEnquiry()}
                className="px-7 py-4 text-sm sm:text-base font-semibold rounded-xl bg-[#315B43] text-[#F5F4EF] hover:bg-[#264835] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Book a Program Assessment
              </button>
              <a
                href="#program-catalog"
                className="px-5 py-4 text-sm sm:text-base font-medium text-[#F5F4EF] hover:text-[#F5F4EF]/80 transition-colors whitespace-nowrap shrink-0"
              >
                Browse {PROGRAMS.length} Programs ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER & SEARCH SECTION + PROGRAM LISTING */}
      <section
        id="program-catalog"
        className="py-16 lg:py-24 bg-[#F5F4EF] text-[#171A18]"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Top Search & Filter Bar */}
          <div className="rounded-2xl bg-white p-4 sm:p-5 border border-[#E3E5DF] mb-10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Compact Search Field */}
              <div className="relative flex-1 min-w-[220px] max-w-md">
                <Search className="w-4 h-4 text-[#858B85] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <label htmlFor="program-search" className="sr-only">
                  Search training programs
                </label>
                <input
                  id="program-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search barbell, sleds, hypertrophy, mobility..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-[#F5F4EF] border border-[#E3E5DF] focus:outline-none focus:border-[#315B43] text-[#171A18]"
                />
              </div>

              {/* Desktop Intensity & Reset Controls */}
              <div className="hidden lg:flex items-center gap-3">
                <span className="text-xs font-medium text-[#858B85]">Level:</span>
                <div className="flex items-center gap-1 bg-[#F5F4EF] p-1 rounded-xl border border-[#E3E5DF]">
                  {INTENSITIES.map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setSelectedIntensity(level)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        selectedIntensity === level
                          ? 'bg-[#171A18] text-[#F5F4EF]'
                          : 'text-[#171A18]/75 hover:text-[#171A18]'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>

                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#315B43] hover:text-[#171A18] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Tablet & Mobile Filter Drawer Trigger Button */}
              <button
                type="button"
                onClick={() => setIsFilterDrawerOpen(true)}
                aria-label="Open program filters"
                className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl bg-[#171A18] text-[#F5F4EF] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>
                  Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}
                </span>
              </button>
            </div>

            {/* Desktop Horizontal Category Tabs */}
            <div className="hidden lg:flex items-center justify-between pt-3 border-t border-[#E3E5DF]">
              <div className="flex flex-wrap items-center gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      selectedCategory === category
                        ? 'bg-[#315B43] text-[#F5F4EF]'
                        : 'bg-[#F5F4EF] text-[#171A18]/80 hover:text-[#171A18]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <span className="text-xs text-[#858B85] tabular-nums">
                Showing {filteredPrograms.length} of {PROGRAMS.length} programs
              </span>
            </div>
          </div>

          {/* Filtered Results Grid */}
          {filteredPrograms.length === 0 ? (
            <div className="rounded-2xl bg-white p-12 text-center border border-[#E3E5DF] space-y-4">
              <h2 className="font-display text-2xl font-bold text-[#171A18]">
                No training programs match your current filters
              </h2>
              <p className="text-sm text-[#858B85] max-w-md mx-auto">
                Try clearing your search term or switching the category filter back to All.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-[#315B43] text-[#F5F4EF] hover:bg-[#264835] transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredPrograms.map((program) => (
                <article
                  key={program.id}
                  className="rounded-2xl bg-white border border-[#E3E5DF] overflow-hidden flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1"
                >
                  <div>
                    <div className="aspect-[16/10] overflow-hidden bg-[#171A18]">
                      <ResilientImage
                        src={program.image}
                        alt={program.imageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 space-y-2.5">
                      <div className="text-xs text-[#858B85] tabular-nums">
                        <span>{program.category}</span>
                        <span aria-hidden="true"> · </span>
                        <span>{program.intensity}</span>
                        <span aria-hidden="true"> · </span>
                        <span>{program.durationMinutes} mins</span>
                      </div>
                      <h2 className="font-display text-2xl font-bold text-[#171A18]">
                        {program.title}
                      </h2>
                      <p className="text-sm text-[#171A18]/75 leading-relaxed">
                        {program.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-4 border-t border-[#E3E5DF]/70 flex items-center justify-between gap-4">
                    <div>
                      <span className="block text-xs text-[#858B85]">Monthly Plan</span>
                      <span className="font-display text-xl font-bold text-[#171A18] tabular-nums">
                        {formatInr(program.monthlyFeeInr)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href={`/programs/${program.slug}`}
                        onClick={(e) => handleNav(e, `/programs/${program.slug}`)}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl bg-[#171A18] text-[#F5F4EF] hover:bg-[#315B43] transition-colors whitespace-nowrap shrink-0"
                      >
                        <span>Explore Program</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* MOBILE & TABLET FILTER OVERLAY DRAWER (Does not shift layout) */}
      {isFilterDrawerOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Filter Training Programs"
        >
          <div
            className="fixed inset-0 bg-[#171A18]/75 backdrop-blur-sm"
            onClick={() => setIsFilterDrawerOpen(false)}
            aria-hidden="true"
          />

          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#F5F4EF] text-[#171A18] p-6 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E3E5DF]">
                <h2 className="font-display text-2xl font-bold">Filter Programs</h2>
                <button
                  type="button"
                  onClick={() => setIsFilterDrawerOpen(false)}
                  aria-label="Close filter drawer"
                  className="p-2 rounded-xl hover:bg-[#E3E5DF]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-semibold tracking-wide text-[#858B85]">
                  Category
                </h3>
                <div className="flex flex-col gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-3 text-left text-sm font-medium rounded-xl border transition-colors ${
                        selectedCategory === cat
                          ? 'bg-[#315B43] text-[#F5F4EF] border-[#315B43]'
                          : 'bg-white text-[#171A18] border-[#E3E5DF]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-semibold tracking-wide text-[#858B85]">
                  Training Intensity
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {INTENSITIES.map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setSelectedIntensity(level)}
                      className={`px-3 py-2.5 text-xs font-semibold rounded-xl border transition-colors ${
                        selectedIntensity === level
                          ? 'bg-[#171A18] text-[#F5F4EF] border-[#171A18]'
                          : 'bg-white text-[#171A18] border-[#E3E5DF]'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E3E5DF] flex items-center gap-3">
              <button
                type="button"
                onClick={handleResetFilters}
                className="flex-1 py-3 px-4 text-xs font-semibold rounded-xl border border-[#171A18]/30 text-[#171A18]"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsFilterDrawerOpen(false)}
                className="flex-1 py-3 px-4 text-xs font-semibold rounded-xl bg-[#315B43] text-[#F5F4EF]"
              >
                Apply ({filteredPrograms.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
