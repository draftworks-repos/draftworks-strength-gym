import React from 'react';
import { ArrowLeft, ArrowRight, Check, Clock, Users, Calendar } from 'lucide-react';
import { PROGRAMS, type Program } from '../data/gymData';
import { formatInr } from '../utils/gymLogic';
import { ResilientImage } from '../components/ResilientImage';

interface ProgramDetailPageProps {
  slug?: string;
  onNavigate: (path: string) => void;
  onOpenEnquiry: (program?: string, branch?: string) => void;
}

export const ProgramDetailPage: React.FC<ProgramDetailPageProps> = ({
  slug,
  onNavigate,
  onOpenEnquiry,
}) => {
  const program: Program =
    PROGRAMS.find((p) => p.slug === slug) || PROGRAMS[0];

  const relatedPrograms = PROGRAMS.filter((p) => p.id !== program.id).slice(
    0,
    3
  );

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* FULL-SCREEN HERO (Option A — Full-bleed background photograph, 100svh) */}
      <section className="relative min-h-[100svh] w-full flex items-end bg-[#171A18] text-[#F5F4EF] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ResilientImage
            src={program.image}
            alt={program.imageAlt}
            priority={true}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171A18] via-[#171A18]/75 to-[#171A18]/35" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 pt-28 pb-16 sm:pb-24">
          <a
            href="/programs"
            onClick={(e) => handleNav(e, '/programs')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#F5F4EF]/80 hover:text-[#F5F4EF] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Training Programs</span>
          </a>

          <div className="max-w-3xl space-y-5">
            <div className="text-xs sm:text-sm text-[#F5F4EF]/80 tabular-nums">
              <span>{program.category}</span>
              <span aria-hidden="true"> · </span>
              <span>{program.intensity}</span>
              <span aria-hidden="true"> · </span>
              <span>{program.durationMinutes} Minutes</span>
              <span aria-hidden="true"> · </span>
              <span>{program.coachRatio}</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F4EF] leading-[0.96]">
              {program.title}
            </h1>

            <p className="text-base sm:text-lg text-[#F5F4EF]/85 max-w-2xl leading-relaxed">
              {program.fullDescription}
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={() => onOpenEnquiry(program.title)}
                className="px-7 py-4 text-sm sm:text-base font-semibold rounded-xl bg-[#315B43] text-[#F5F4EF] hover:bg-[#264835] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Book Trial for This Program
              </button>
              <div className="text-sm text-[#F5F4EF]/90 tabular-nums">
                <span className="text-[#858B85] block text-xs">Monthly Membership</span>
                <span className="font-display text-2xl font-bold">
                  {formatInr(program.monthlyFeeInr)} / month
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM & WEEKLY STRUCTURE */}
      <section className="py-20 lg:py-28 bg-[#F5F4EF] text-[#171A18] border-b border-[#E3E5DF]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Focus Areas & Who It Is For */}
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-4">
                <p className="text-xs font-semibold tracking-wider uppercase text-[#315B43]">
                  Technical Curriculum
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#171A18]">
                  What You Will Train
                </h2>
                <ul className="space-y-3 pt-2">
                  {program.focusAreas.map((area) => (
                    <li
                      key={area}
                      className="flex items-start gap-3 text-sm sm:text-base text-[#171A18]/85"
                    >
                      <Check className="w-4 h-4 text-[#315B43] shrink-0 mt-1" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E3E5DF] space-y-4">
                <h3 className="font-display text-2xl font-bold text-[#171A18]">
                  Who This Program Suits Best
                </h3>
                <ul className="space-y-2.5 text-sm text-[#171A18]/80">
                  {program.whoItIsFor.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="text-[#315B43] font-bold">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-3 border-t border-[#E3E5DF] flex items-center justify-between text-xs text-[#858B85]">
                  <span>Lead Programme Coach</span>
                  <span className="font-semibold text-[#171A18]">{program.leadCoach}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Weekly Microcycle & Timings */}
            <div className="lg:col-span-7 space-y-10">
              <div>
                <p className="text-xs font-semibold tracking-wider uppercase text-[#315B43] mb-2">
                  Weekly Microcycle
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#171A18] mb-6">
                  Session-by-Session Structure
                </h2>

                <div className="divide-y divide-[#E3E5DF] border-t border-b border-[#E3E5DF]">
                  {program.weeklyStructure.map((slot, index) => (
                    <div
                      key={slot.dayLabel}
                      className="py-5 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6"
                    >
                      <div className="w-36 shrink-0">
                        <span className="text-xs font-semibold text-[#315B43] tabular-nums">
                          0{index + 1}. {slot.dayLabel}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-display text-2xl font-bold text-[#171A18]">
                          {slot.focus}
                        </h3>
                        <p className="text-sm text-[#171A18]/75 leading-relaxed">
                          {slot.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timings Table */}
              <div className="rounded-2xl bg-[#171A18] text-[#F5F4EF] p-6 sm:p-8 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-bold">
                      Standard Batch Timings
                    </h3>
                    <p className="text-xs text-[#858B85] mt-0.5">
                      Available across Indiranagar, Bandra West, Koregaon Park &amp; Jubilee Hills
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#F5F4EF]/80">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#315B43]" />
                      {program.durationMinutes} mins
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#315B43]" />
                      {program.coachRatio}
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-[#F5F4EF]/10 border-t border-[#F5F4EF]/10">
                  {program.schedule.map((row) => (
                    <div
                      key={row.days}
                      className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs sm:text-sm tabular-nums"
                    >
                      <div className="font-semibold text-[#F5F4EF] flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#315B43]" />
                        <span>{row.days}</span>
                      </div>
                      <div className="text-[#F5F4EF]/80">
                        <span className="text-[#858B85] block text-[11px]">AM Batches</span>
                        {row.morning}
                      </div>
                      <div className="text-[#F5F4EF]/80">
                        <span className="text-[#858B85] block text-[11px]">PM Batches</span>
                        {row.evening}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OTHER PROGRAMS */}
      <section className="py-20 bg-[#F5F4EF] text-[#171A18]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-display text-3xl sm:text-4xl font-bold">
              Other Training Tracks
            </h2>
            <a
              href="/programs"
              onClick={(e) => handleNav(e, '/programs')}
              className="text-xs sm:text-sm font-semibold text-[#315B43] hover:underline"
            >
              View All Programs
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPrograms.map((rel) => (
              <div
                key={rel.id}
                className="rounded-2xl bg-white p-6 border border-[#E3E5DF] flex flex-col justify-between gap-4"
              >
                <div>
                  <p className="text-xs text-[#858B85]">
                    {rel.category} · {rel.durationMinutes} mins
                  </p>
                  <h3 className="font-display text-2xl font-bold text-[#171A18] mt-1">
                    {rel.title}
                  </h3>
                  <p className="text-sm text-[#171A18]/75 mt-2">
                    {rel.shortDescription}
                  </p>
                </div>
                <a
                  href={`/programs/${rel.slug}`}
                  onClick={(e) => handleNav(e, `/programs/${rel.slug}`)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#315B43] hover:text-[#171A18] transition-colors"
                >
                  <span>Explore {rel.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
