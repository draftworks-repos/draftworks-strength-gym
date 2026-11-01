import React from 'react';
import { ArrowRight } from 'lucide-react';
import { TRANSFORMATIONS, IMAGES } from '../data/gymData';
import { ResilientImage } from '../components/ResilientImage';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';

interface TransformationsPageProps {
  onNavigate: (path: string) => void;
  onOpenEnquiry: (program?: string, branch?: string) => void;
}

export const TransformationsPage: React.FC<TransformationsPageProps> = ({
  onNavigate,
  onOpenEnquiry,
}) => {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* HERO (Option B — Photographic Split Hero, 100svh) */}
      <section className="min-h-[100svh] pt-20 bg-[#F5F4EF] text-[#171A18] border-b border-[#E3E5DF] flex items-stretch">
        <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <p className="text-xs font-semibold tracking-wide text-[#315B43]">
              Before &amp; After Case Studies
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#171A18] leading-[0.96]">
              Real Strength Shows Up in Posture and Performance.
            </h1>
            <p className="text-base sm:text-lg text-[#171A18]/80 max-w-xl leading-relaxed">
              We don’t sell 21-day crash diets. Every transformation below was built through three to four weekly strength sessions, progressive barbell overload, and sustainable protein targets.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onOpenEnquiry()}
                className="px-6 py-3.5 text-sm font-semibold rounded-xl bg-[#315B43] text-[#F5F4EF] hover:bg-[#264835] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Start Your First 8-Week Block
              </button>
              <a
                href="/programs"
                onClick={(e) => handleNav(e, '/programs')}
                className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-semibold text-[#171A18] hover:text-[#315B43] transition-colors whitespace-nowrap shrink-0"
              >
                <span>Compare Training Programs</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-[#171A18] border border-[#E3E5DF] relative">
              <ResilientImage
                src={IMAGES.transformationBefore}
                alt="Member day one baseline portrait"
                priority={true}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 px-3.5 py-1.5 rounded-lg bg-[#171A18]/85 text-[#F5F4EF] text-xs font-semibold">
                Before
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-[#171A18] border border-[#E3E5DF] relative">
              <ResilientImage
                src={IMAGES.transformationAfter}
                alt="Member week 24 athletic portrait"
                priority={true}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-lg bg-[#315B43] text-[#F5F4EF] text-xs font-semibold">
                After
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REDESIGNED INTERACTIVE TRANSFORMATION SECTIONS (Inspired by Homepage Transformation Redesign) */}
      <section className="py-20 lg:py-28 bg-[#171A18] text-[#F5F4EF]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-24 lg:space-y-32">
          {TRANSFORMATIONS.map((story, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <article
                key={story.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pb-20 border-b border-[#F5F4EF]/12 last:border-b-0 last:pb-0"
              >
                <div
                  className={`lg:col-span-6 space-y-6 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-[#858B85] mb-2">
                      {story.timeframeWeeks} Weeks · {story.programTitle}
                    </p>
                    <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#F5F4EF]">
                      {story.memberName}
                    </h2>
                  </div>

                  <p className="text-sm sm:text-base text-[#F5F4EF]/85 leading-relaxed">
                    {story.summary}
                  </p>

                  <blockquote className="p-5 rounded-2xl bg-[#F5F4EF]/5 border border-[#F5F4EF]/10 text-sm text-[#F5F4EF]/85 italic">
                    “{story.coachQuote}”
                    <footer className="not-italic text-xs text-[#858B85] mt-2 font-medium">
                      — {story.coachName}
                    </footer>
                  </blockquote>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => onOpenEnquiry(story.programTitle)}
                      className="px-6 py-3.5 text-sm font-semibold rounded-xl bg-[#315B43] text-[#F5F4EF] hover:bg-[#264835] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      Train in {story.programTitle}
                    </button>
                    <a
                      href="/programs"
                      onClick={(e) => handleNav(e, '/programs')}
                      className="inline-flex items-center gap-2 text-sm font-medium text-[#F5F4EF]/85 hover:text-[#F5F4EF] transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>View Program Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div
                  className={`lg:col-span-6 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <BeforeAfterSlider story={story} />
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};
