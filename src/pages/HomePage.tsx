import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  Phone,
  CheckCircle2,
} from 'lucide-react';
import {
  PROGRAMS,
  BRANCHES,
  TRANSFORMATIONS,
  TESTIMONIALS,
  GALLERY_ITEMS,
  IMAGES,
  BRAND_INFO,
} from '../data/gymData';
import { getNextCarouselIndex, formatInr } from '../utils/gymLogic';
import { ResilientImage } from '../components/ResilientImage';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import type { SubmittedEnquiry } from '../components/EnquiryModal';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenEnquiry: (program?: string, branch?: string) => void;
  recentEnquiries: SubmittedEnquiry[];
}

const MASONRY_ASPECTS = [
  'aspect-[4/3]',
  'aspect-[3/4]',
  'aspect-[16/10]',
  'aspect-[4/5]',
  'aspect-[4/3]',
  'aspect-[16/11]',
];

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenEnquiry,
  recentEnquiries,
}) => {
  const [programIndex, setProgramIndex] = useState(0);
  const [branchIndex, setBranchIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [activeStoryId, setActiveStoryId] = useState(TRANSFORMATIONS[0].id);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const activeStory =
    TRANSFORMATIONS.find((s) => s.id === activeStoryId) || TRANSFORMATIONS[0];

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  const maxProgramIndex = Math.max(0, PROGRAMS.length - 3);
  const maxBranchIndex = Math.max(0, BRANCHES.length - 2);
  const maxTestimonialIndex = Math.max(0, TESTIMONIALS.length - 2);

  return (
    <div className="w-full overflow-x-hidden">
      {/* 1. FULL-SCREEN HERO (Option A — Full-bleed background photograph, 100svh) */}
      <section
        data-gsap="hero"
        className="relative min-h-[100svh] w-full flex items-end bg-[#171A18] text-[#F5F4EF] overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <ResilientImage
            src={IMAGES.heroGymTraining}
            alt="Athlete chalking hands before a heavy barbell deadlift inside DraftWorks strength studio"
            priority={true}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#171A18]/90 via-[#171A18]/55 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 pt-28 pb-16 sm:pb-24 lg:pb-28">
          <div className="max-w-2xl space-y-6">
            <p className="text-xs sm:text-sm font-medium tracking-wide text-[#F5F4EF]/80">
              Bengaluru · Mumbai · Pune · Hyderabad
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F4EF] leading-[0.96]">
              Serious Strength. Coached in Small Groups.
            </h1>
            <p className="text-base sm:text-lg text-[#F5F4EF]/85 max-w-xl leading-relaxed">
              Calibrated barbells, 28 meter conditioning turf, and structured 8-week training blocks capped at eight members per coach.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onOpenEnquiry()}
                className="px-7 py-4 text-sm sm:text-base font-semibold rounded-xl bg-[#315B43] text-[#F5F4EF] hover:bg-[#264835] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Book a Trial Session
              </button>
              <a
                href="/programs"
                onClick={(e) => handleNav(e, '/programs')}
                className="inline-flex items-center gap-2 px-1 md:px-5 py-4 text-sm sm:text-base font-medium text-[#F5F4EF] hover:text-[#F5F4EF]/80 transition-colors whitespace-nowrap shrink-0"
              >
                <span>Explore Programs</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {recentEnquiries.length > 0 && (
              <div
                role="status"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#315B43]/30 border border-[#315B43] text-xs text-[#F5F4EF]"
              >
                <CheckCircle2 className="w-4 h-4 text-[#F5F4EF] shrink-0" />
                <span>
                  Trial request <strong className="font-semibold">{recentEnquiries[0].id}</strong> confirmed for{' '}
                  {recentEnquiries[0].branch} ({recentEnquiries[0].program}).
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. SHORT INTRODUCTION / ABOUT THE GYM (Light Section — Editorial Split) */}
      <section
        data-gsap="reveal"
        className="py-20 lg:py-28 bg-[#F5F4EF] text-[#171A18] border-b border-[#E3E5DF]"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs font-semibold tracking-wide text-[#315B43]">
                Built for Progression, Not Crowds
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#171A18] leading-[1.04]">
                A training floor where every set is coached and every lift is logged.
              </h2>
              <p className="text-base text-[#171A18]/80 leading-relaxed max-w-xl">
                Most commercial gyms rent you access to machines and leave your progression to chance. At DraftWorks, you train inside an architectural strength room with a dedicated coach watching your bar speed, joint alignment, and recovery week after week.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-8 text-sm text-[#171A18]/80 border-t border-[#E3E5DF] pt-6">
                <div>
                  <span className="block font-display text-3xl font-bold text-[#171A18] tabular-nums">
                    1 : 8
                  </span>
                  <span className="text-xs text-[#858B85]">Max Coach-to-Member Ratio</span>
                </div>
                <div>
                  <span className="block font-display text-3xl font-bold text-[#171A18] tabular-nums">
                    8 Weeks
                  </span>
                  <span className="text-xs text-[#858B85]">Periodized Strength Cycles</span>
                </div>
                <div>
                  <span className="block font-display text-3xl font-bold text-[#171A18] tabular-nums">
                    4 Cities
                  </span>
                  <span className="text-xs text-[#858B85]">Bengaluru, Mumbai, Pune, Hyd</span>
                </div>
              </div>
              <div className="pt-2">
                <a
                  href="/about"
                  onClick={(e) => handleNav(e, '/about')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#315B43] hover:text-[#171A18] transition-colors"
                >
                  <span>Read Our Coaching Philosophy</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/11] bg-[#171A18]">
                <ResilientImage
                  src={IMAGES.facilityInteriorWide}
                  alt="DraftWorks Indiranagar strength floor with custom racks and indoor sprint lane"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRAINING PROGRAMS (Smooth Sliding Carousel) */}
      <section
        data-gsap="reveal"
        className="py-20 lg:py-28 bg-[#F5F4EF] text-[#171A18]"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#315B43] mb-2">
                Structured Curriculum
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#171A18]">
                Training Programs
              </h2>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              <span className="text-xs text-[#858B85] tabular-nums mr-1">
                0{programIndex + 1} / 0{maxProgramIndex + 1}
              </span>
              <button
                type="button"
                onClick={() =>
                  setProgramIndex((cur) =>
                    getNextCarouselIndex(cur, PROGRAMS.length, 3, 'prev')
                  )
                }
                disabled={programIndex === 0}
                aria-label="Previous programs"
                className="p-2.5 rounded-xl border border-[#E3E5DF] bg-white text-[#171A18] hover:border-[#171A18] disabled:opacity-35 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setProgramIndex((cur) =>
                    getNextCarouselIndex(cur, PROGRAMS.length, 3, 'next')
                  )
                }
                disabled={programIndex >= maxProgramIndex}
                aria-label="Next programs"
                className="p-2.5 rounded-xl border border-[#E3E5DF] bg-white text-[#171A18] hover:border-[#171A18] disabled:opacity-35 transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="/programs"
                onClick={(e) => handleNav(e, '/programs')}
                className="ml-2 text-xs sm:text-sm font-semibold text-[#315B43] hover:underline whitespace-nowrap shrink-0"
              >
                View All ({PROGRAMS.length})
              </a>
            </div>
          </div>

          <div
            onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStartX === null) return;
              const delta = e.changedTouches[0].clientX - touchStartX;
              if (delta < -40) {
                setProgramIndex((cur) =>
                  getNextCarouselIndex(cur, PROGRAMS.length, 3, 'next')
                );
              } else if (delta > 40) {
                setProgramIndex((cur) =>
                  getNextCarouselIndex(cur, PROGRAMS.length, 3, 'prev')
                );
              }
              setTouchStartX(null);
            }}
            className="overflow-hidden -mx-3"
          >
            <div className={`flex carousel-track-3col slide-index-${programIndex}`}>
              {PROGRAMS.map((program) => (
                <div
                  key={program.id}
                  className="w-full md:w-1/2 lg:w-1/3 shrink-0 px-3 flex"
                >
                  <article className="group w-full rounded-2xl bg-white border border-[#E3E5DF] overflow-hidden flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1">
                    <div>
                      <div className="aspect-[16/10] overflow-hidden bg-[#171A18]">
                        <ResilientImage
                          src={program.image}
                          alt={program.imageAlt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <div className="text-xs text-[#858B85] mb-2 tabular-nums">
                          <span>{program.category}</span>
                          <span aria-hidden="true"> · </span>
                          <span>{program.durationMinutes} mins</span>
                          <span aria-hidden="true"> · </span>
                          <span>{formatInr(program.monthlyFeeInr)}/mo</span>
                        </div>
                        <h3 className="font-display text-2xl font-bold text-[#171A18]">
                          {program.title}
                        </h3>
                        <p className="text-sm text-[#171A18]/75 mt-2 leading-relaxed">
                          {program.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-[#E3E5DF]/60">
                      <a
                        href={`/programs/${program.slug}`}
                        onClick={(e) => handleNav(e, `/programs/${program.slug}`)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#171A18] hover:text-[#315B43] transition-colors"
                      >
                        <span>Program Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => onOpenEnquiry(program.title)}
                        className="text-xs font-semibold text-[#315B43] hover:underline cursor-pointer"
                      >
                        Book Trial
                      </button>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY TRAIN HERE — Architectural Numbered Split */}
      <section
        data-gsap="reveal"
        className="py-20 lg:py-28 bg-[#171A18] text-[#F5F4EF]"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-6">
              <p className="text-xs font-semibold tracking-wide text-[#858B85]">
                How We Coach
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#F5F4EF] leading-[1.03]">
                Built for lifters who value coaching over choreography.
              </h2>
              <p className="text-sm sm:text-base text-[#F5F4EF]/75 leading-relaxed">
                We stripped away the nightclub lighting, random daily circuits, and overcrowded floors. Every detail at DraftWorks supports progressive strength and long-term joint health.
              </p>
              <div className="rounded-2xl overflow-hidden aspect-[4/3] mt-6 border border-[#F5F4EF]/10">
                <ResilientImage
                  src={IMAGES.programFunctionalAthletics}
                  alt="Athletes pushing prowler sleds and swinging kettlebells at DraftWorks"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 divide-y divide-[#F5F4EF]/12 border-t border-b border-[#F5F4EF]/12">
              {[
                {
                  index: '01.',
                  title: 'Capped 1:8 Small-Group Floor',
                  description:
                    'You never share a squat rack with three strangers or wait for bumper plates. Every member gets an assigned rack, platform, and coach eye-line.',
                },
                {
                  index: '02.',
                  title: '8-Week Periodized Blocks',
                  description:
                    'Instead of random daily workouts that leave you sore without getting stronger, we follow structured 8-week cycles with deload weeks and benchmark testing.',
                },
                {
                  index: '03.',
                  title: 'Competition Bars & 28m Turf',
                  description:
                    'Train with calibrated kilogram plates, Rogue and Eleiko barbells, heavy prowler sleds, Concept2 ergs, and full kettlebell runs up to 48 kg.',
                },
                {
                  index: '04.',
                  title: 'Kinstretch & Joint Longevity Built In',
                  description:
                    'Warm-ups and cooldowns target hip internal rotation, ankle dorsiflexion, and scapular control so you lift heavier with zero lower-back or knee pain.',
                },
              ].map((item) => (
                <div
                  key={item.index}
                  className="py-7 sm:py-8 flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-8"
                >
                  <span className="font-display text-2xl sm:text-3xl font-bold text-[#315B43] tabular-nums shrink-0">
                    {item.index}
                  </span>
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#F5F4EF]">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#F5F4EF]/75 leading-relaxed max-w-xl">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. FACILITIES & GYM GALLERY (Masonry Layout, Label Only, No Title/Description) */}
      <section
        data-gsap="reveal"
        className="py-20 lg:py-28 bg-[#F5F4EF] text-[#171A18] border-b border-[#E3E5DF]"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between gap-6 mb-10">
            <p className="text-xs font-semibold tracking-wide text-[#315B43]">
              Spaces &amp; Equipment
            </p>
            <a
              href="/gallery"
              onClick={(e) => handleNav(e, '/gallery')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#315B43] hover:text-[#171A18] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Explore Full Gallery</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {GALLERY_ITEMS.map((item, idx) => (
              <div
                key={item.id}
                className={`break-inside-avoid relative rounded-2xl overflow-hidden bg-[#171A18] group border border-[#E3E5DF] ${
                  idx === GALLERY_ITEMS.length - 1
                    ? 'aspect-[4/3] lg:aspect-[3/4]'
                    : MASONRY_ASPECTS[idx % MASONRY_ASPECTS.length]
                }`}
              >
                <ResilientImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#171A18]/80 via-[#171A18]/20 to-transparent text-[#F5F4EF]">
                  <span className="inline-block text-xs font-medium text-[#F5F4EF]/90">
                    {item.category} · {item.branch}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BEFORE & AFTER TRANSFORMATIONS (Redesigned Clean Layout) */}
      <section
        data-gsap="reveal"
        className="py-20 lg:py-28 bg-[#171A18] text-[#F5F4EF]"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div>
                <p className="text-xs font-semibold tracking-wide text-[#858B85] mb-2">
                  Real Member Outcomes
                </p>
                <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#F5F4EF]">
                  Earned Over 16 to 24 Weeks.
                </h2>
              </div>

              {/* Member Selector Tabs */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {TRANSFORMATIONS.map((story) => (
                  <button
                    key={story.id}
                    type="button"
                    onClick={() => setActiveStoryId(story.id)}
                    className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      story.id === activeStory.id
                        ? 'bg-[#315B43] text-[#F5F4EF]'
                        : 'bg-[#F5F4EF]/10 text-[#F5F4EF]/75 hover:text-[#F5F4EF]'
                    }`}
                  >
                    {story.memberName} ({story.timeframeWeeks} Weeks)
                  </button>
                ))}
              </div>

              {/* Description & Quote directly below tabs (removed small metadata text & outcome heading) */}
              <div key={activeStory.id} className="space-y-5 pt-1 transition-opacity duration-300">
                <p className="text-sm sm:text-base text-[#F5F4EF]/85 leading-relaxed">
                  {activeStory.summary}
                </p>

                <blockquote className="p-5 rounded-2xl bg-[#F5F4EF]/5 border border-[#F5F4EF]/10 text-sm text-[#F5F4EF]/85 italic">
                  “{activeStory.coachQuote}”
                  <footer className="not-italic text-xs text-[#858B85] mt-2 font-medium">
                    — {activeStory.coachName}
                  </footer>
                </blockquote>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onOpenEnquiry(activeStory.programTitle)}
                  className="px-6 py-3.5 text-sm font-semibold rounded-xl bg-[#315B43] text-[#F5F4EF] hover:bg-[#264835] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  Start Your 8-Week Block
                </button>
                <a
                  href="/transformations"
                  onClick={(e) => handleNav(e, '/transformations')}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#F5F4EF]/85 hover:text-[#F5F4EF] transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Explore All Transformations</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <BeforeAfterSlider story={activeStory} />
            </div>
          </div>
        </div>
      </section>

      {/* 7. OUR BRANCHES / LOCATIONS (Smooth Sliding Carousel) */}
      <section
        data-gsap="reveal"
        className="py-20 lg:py-28 bg-[#F5F4EF] text-[#171A18] border-b border-[#E3E5DF]"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#315B43] mb-2">
                Four Indian Locations
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#171A18]">
                Our Strength Clubs
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setBranchIndex((cur) =>
                    getNextCarouselIndex(cur, BRANCHES.length, 2, 'prev')
                  )
                }
                disabled={branchIndex === 0}
                aria-label="Previous branches"
                className="p-2.5 rounded-xl border border-[#E3E5DF] bg-white text-[#171A18] hover:border-[#171A18] disabled:opacity-35 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setBranchIndex((cur) =>
                    getNextCarouselIndex(cur, BRANCHES.length, 2, 'next')
                  )
                }
                disabled={branchIndex >= maxBranchIndex}
                aria-label="Next branches"
                className="p-2.5 rounded-xl border border-[#E3E5DF] bg-white text-[#171A18] hover:border-[#171A18] disabled:opacity-35 transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="/branches"
                onClick={(e) => handleNav(e, '/branches')}
                className="ml-2 text-xs sm:text-sm font-semibold text-[#315B43] hover:underline whitespace-nowrap shrink-0"
              >
                All 4 Branches
              </a>
            </div>
          </div>

          <div className="overflow-hidden -mx-4">
            <div className={`flex carousel-track-2col slide-index-${branchIndex}`}>
              {BRANCHES.map((branch) => (
                <div
                  key={branch.id}
                  className="w-full md:w-1/2 shrink-0 px-4 flex"
                >
                  <div className="w-full rounded-2xl bg-white border border-[#E3E5DF] overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="aspect-[16/9] overflow-hidden bg-[#171A18]">
                        <ResilientImage
                          src={branch.image}
                          alt={branch.imageAlt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 sm:p-8 space-y-3">
                        <div className="text-xs text-[#858B85]">
                          <span>{branch.city}</span>
                          <span aria-hidden="true"> · </span>
                          <span>{branch.areaSqFt}</span>
                          <span aria-hidden="true"> · </span>
                          <span>{branch.racksCount} Power Racks</span>
                        </div>
                        <h3 className="font-display text-3xl font-bold text-[#171A18]">
                          {branch.name}
                        </h3>
                        <p className="text-sm text-[#171A18]/75 flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-[#315B43] shrink-0 mt-0.5" />
                          <span>{branch.address}</span>
                        </p>
                      </div>
                    </div>

                    <div className="px-6 sm:px-8 pb-6 pt-4 border-t border-[#E3E5DF]/70 flex flex-wrap items-center justify-between gap-4">
                      <a
                        href={branch.directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#171A18] hover:text-[#315B43] transition-colors"
                      >
                        <span>Google Maps Directions</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() =>
                          onOpenEnquiry(undefined, `${branch.name} (${branch.city})`)
                        }
                        className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#315B43] text-[#F5F4EF] hover:bg-[#264835] transition-colors cursor-pointer"
                      >
                        Book Trial Here
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. MEMBER TESTIMONIALS (Smooth Sliding Carousel + Clean Google Icon Name Footer) */}
      <section
        data-gsap="reveal"
        className="py-20 lg:py-28 bg-[#F5F4EF] text-[#171A18]"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#315B43] mb-2">
                Member Perspectives
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#171A18]">
                From the Lifting Floor
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setTestimonialIndex((cur) =>
                    getNextCarouselIndex(cur, TESTIMONIALS.length, 2, 'prev')
                  )
                }
                disabled={testimonialIndex === 0}
                aria-label="Previous testimonials"
                className="p-2.5 rounded-xl border border-[#E3E5DF] bg-white text-[#171A18] hover:border-[#171A18] disabled:opacity-35 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setTestimonialIndex((cur) =>
                    getNextCarouselIndex(cur, TESTIMONIALS.length, 2, 'next')
                  )
                }
                disabled={testimonialIndex >= maxTestimonialIndex}
                aria-label="Next testimonials"
                className="p-2.5 rounded-xl border border-[#E3E5DF] bg-white text-[#171A18] hover:border-[#171A18] disabled:opacity-35 transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="overflow-hidden -mx-4">
            <div className={`flex carousel-track-2col slide-index-${testimonialIndex}`}>
              {TESTIMONIALS.map((item) => (
                <div
                  key={item.id}
                  className="w-full md:w-1/2 shrink-0 px-4 flex"
                >
                  <blockquote className="w-full rounded-2xl bg-white p-8 border border-[#E3E5DF] flex flex-col justify-between gap-6">
                    <p className="text-base sm:text-lg text-[#171A18] leading-relaxed">
                      “{item.quote}”
                    </p>
                    <footer className="pt-4 border-t border-[#E3E5DF] flex items-center gap-3">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5 shrink-0"
                        aria-hidden="true"
                      >
                        <path
                          fill="#4285F4"
                          d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
                        />
                      </svg>
                      <span className="font-display text-xl font-bold text-[#171A18]">
                        {item.memberName}
                      </span>
                    </footer>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. CONTACT / VISIT THE GYM CTA */}
      <section className="py-16 lg:py-24 bg-[#F5F4EF] px-5 sm:px-8" >
        <div style={{
              backgroundImage: `
                linear-gradient(rgba(49, 91, 67, 1), rgba(49, 91, 67, 0.9)),
                url(${IMAGES.heroGymTraining})
              `,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
            className="max-w-7xl mx-auto rounded-3xl bg-[#315B43] text-[#F5F4EF] p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 space-y-4">
            <p className="text-xs font-semibold tracking-wide text-[#F5F4EF]/80">
              First Session on the Platform
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#F5F4EF]">
              Step onto the floor before you commit to a plan.
            </h2>
            <p className="text-sm sm:text-base text-[#F5F4EF]/85 max-w-2xl leading-relaxed">
              Book a 60-minute coached trial and biomechanical screen at Indiranagar, Bandra West, Koregaon Park, or Jubilee Hills.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col lg:flex-col gap-3.5 justify-end">
            <button
              type="button"
              onClick={() => onOpenEnquiry()}
              className="w-full py-4 px-6 rounded-xl bg-[#171A18] text-[#F5F4EF] font-semibold text-sm hover:bg-[#171A18]/90 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Book Your Coached Trial
            </button>
            <a
              href={BRAND_INFO.phoneHref}
              className="w-full py-3.5 px-6 rounded-xl border border-[#F5F4EF]/30 text-[#F5F4EF] font-medium text-sm hover:bg-[#F5F4EF]/10 transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 tabular-nums"
            >
              <Phone className="w-4 h-4" />
              <span>Call {BRAND_INFO.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
