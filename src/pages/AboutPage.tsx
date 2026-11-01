import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { COACHES, IMAGES, BRANCHES } from '../data/gymData';
import { ResilientImage } from '../components/ResilientImage';

interface AboutPageProps {
  onNavigate: (path: string) => void;
  onOpenEnquiry: (program?: string, branch?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenEnquiry,
}) => {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* HERO (Full-Screen Background Image Hero like Homepage and Branches Page, 100svh) */}
      <section className="relative min-h-[100svh] w-full flex items-end bg-[#171A18] text-[#F5F4EF] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ResilientImage
            src={IMAGES.facilityInteriorWide}
            alt="DraftWorks flagship strength and conditioning floor"
            priority={true}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171A18] via-[#171A18]/70 to-[#171A18]/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#171A18]/90 via-[#171A18]/45 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 pt-28 pb-16 sm:pb-24 lg:pb-28">
          <div className="max-w-2xl space-y-6">
            <p className="text-xs sm:text-sm font-medium tracking-wide text-[#F5F4EF]/80">
              About DraftWorks · Est. 2021
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F4EF] leading-[0.96]">
              We Built the Strength Club We Couldn’t Find in India.
            </h1>
            <p className="text-base sm:text-lg text-[#F5F4EF]/85 max-w-xl leading-relaxed">
              Started in a converted Indiranagar warehouse with four squat racks and a simple rule: every member on the floor deserves the same biomechanical coaching and calibrated equipment once reserved for competitive athletes.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onOpenEnquiry()}
                className="px-7 py-4 text-sm sm:text-base font-semibold rounded-xl bg-[#315B43] text-[#F5F4EF] hover:bg-[#264835] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Book an Assessment Session
              </button>
              <a
                href="/branches"
                onClick={(e) => handleNav(e, '/branches')}
                className="inline-flex items-center gap-2 px-5 py-4 text-sm sm:text-base font-medium text-[#F5F4EF] hover:text-[#F5F4EF]/80 transition-colors whitespace-nowrap shrink-0"
              >
                <span>Visit Our 4 Locations</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* COACHING PHILOSOPHY (Dark Typography-Led Section) */}
      <section className="py-20 lg:py-28 bg-[#171A18] text-[#F5F4EF]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-wide text-[#858B85] mb-2">
                Our Coaching Standard
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#F5F4EF]">
                Technique first. Load second. Ego never.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-6 text-base text-[#F5F4EF]/80 leading-relaxed">
              <p>
                Walk into an ordinary gym at 7:00 PM and you will see dozens of people waiting for cable machines or rushing through random high-intensity circuits with compromised spine mechanics. Six months later, most have either quit or picked up a nagging shoulder or lower-back injury.
              </p>
              <p>
                At DraftWorks, training is organized into structured 8-week blocks. Before you load a barbell, we screen your ankle dorsiflexion, hip internal rotation, and overhead ribcage control. You train in groups capped at eight lifters—or 1-on-1—so your coach is present for every working set.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  'Full 60-minute biomechanical intake for every new member',
                  'Written logbooks and digital load tracking across 8-week cycles',
                  'Zero loud club music or distracting neon mirrors',
                  'Coaches certified in NSCA-CSCS, EXOS, and Functional Range Conditioning',
                ].map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 p-4 rounded-xl bg-[#F5F4EF]/5 border border-[#F5F4EF]/10 text-sm text-[#F5F4EF]"
                  >
                    <Check className="w-4 h-4 text-[#315B43] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SENIOR COACHING STAFF (Light Section) */}
      <section className="py-20 lg:py-28 bg-[#F5F4EF] text-[#171A18] border-b border-[#E3E5DF]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold tracking-wide text-[#315B43] mb-2">
              Leadership on the Floor
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#171A18]">
              Senior Coaching Team
            </h2>
            <p className="text-sm sm:text-base text-[#171A18]/75 mt-3">
              Our programme directors coach on the floor every week across Bengaluru, Mumbai, Pune, and Hyderabad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COACHES.map((coach) => (
              <div
                key={coach.id}
                className="rounded-2xl bg-white border border-[#E3E5DF] overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/4] overflow-hidden bg-[#171A18]">
                    <ResilientImage
                      src={coach.image}
                      alt={coach.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-6 space-y-2">
                    <p className="text-xs text-[#315B43] font-semibold">
                      {coach.credentials}
                    </p>
                    <h3 className="font-display text-2xl font-bold text-[#171A18]">
                      {coach.name}
                    </h3>
                    <p className="text-xs text-[#858B85]">{coach.role} · {coach.branch}</p>
                    <p className="text-sm text-[#171A18]/80 pt-2 leading-relaxed">
                      {coach.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTPRINT SUMMARY */}
      <section className="py-20 bg-[#F5F4EF] text-[#171A18]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-2">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#171A18]">
              Four clubs. One membership standard.
            </h2>
            <p className="text-sm text-[#171A18]/75">
              Active members can drop into any DraftWorks studio across {BRANCHES.map((b) => b.city).join(', ')} when travelling for work.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/gallery"
              onClick={(e) => handleNav(e, '/gallery')}
              className="px-5 py-3 text-sm font-semibold rounded-xl border border-[#171A18] text-[#171A18] hover:bg-[#171A18] hover:text-[#F5F4EF] transition-colors whitespace-nowrap shrink-0"
            >
              Tour Facility Gallery
            </a>
            <button
              type="button"
              onClick={() => onOpenEnquiry()}
              className="px-6 py-3 text-sm font-semibold rounded-xl bg-[#315B43] text-[#F5F4EF] hover:bg-[#264835] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Book a Trial Session
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
