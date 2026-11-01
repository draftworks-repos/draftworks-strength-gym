import React from 'react';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { BRAND_INFO, PROGRAMS, BRANCHES } from '../data/gymData';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenEnquiry: (program?: string, branch?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenEnquiry }) => {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="bg-[#171A18] text-[#F5F4EF] border-t border-[#F5F4EF]/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[#F5F4EF]/10">
          {/* Col 1: Brand & Overview */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="/"
              onClick={(e) => handleNav(e, '/')}
              className="font-display text-3xl font-bold tracking-tight text-[#F5F4EF] inline-block"
            >
              DraftWorks
            </a>
            <p className="text-sm text-[#858B85] max-w-sm leading-relaxed">
              Coach-led barbell strength, metabolic turf conditioning, and joint longevity clubs across Bengaluru, Mumbai, Pune, and Hyderabad.
            </p>
            <div className="pt-2 space-y-2 text-sm">
              <a
                href={BRAND_INFO.phoneHref}
                className="flex items-center gap-2.5 text-[#F5F4EF]/90 hover:text-[#F5F4EF] transition-colors tabular-nums"
              >
                <Phone className="w-4 h-4 text-[#315B43]" />
                <span>{BRAND_INFO.phone}</span>
              </a>
              <a
                href={`mailto:${BRAND_INFO.email}`}
                className="flex items-center gap-2.5 text-[#F5F4EF]/90 hover:text-[#F5F4EF] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#315B43]" />
                <span>{BRAND_INFO.email}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-display text-lg font-semibold tracking-wide text-[#F5F4EF]">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm text-[#858B85]">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/about' },
                { label: 'Programs', path: '/programs' },
                { label: 'Transformations', path: '/transformations' },
                { label: 'Our Branches', path: '/branches' },
                { label: 'Facilities Gallery', path: '/gallery' },
                { label: 'Contact Us', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    onClick={(e) => handleNav(e, link.path)}
                    className="hover:text-[#F5F4EF] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Training Programs */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display text-lg font-semibold tracking-wide text-[#F5F4EF]">
              Training Programs
            </h3>
            <ul className="space-y-2.5 text-sm text-[#858B85]">
              {PROGRAMS.map((prog) => (
                <li key={prog.id}>
                  <a
                    href={`/programs/${prog.slug}`}
                    onClick={(e) => handleNav(e, `/programs/${prog.slug}`)}
                    className="hover:text-[#F5F4EF] transition-colors block"
                  >
                    {prog.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Branches */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display text-lg font-semibold tracking-wide text-[#F5F4EF]">
              Club Locations
            </h3>
            <ul className="space-y-3 text-sm text-[#858B85]">
              {BRANCHES.map((branch) => (
                <li key={branch.id} className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#315B43] shrink-0 mt-0.5" />
                  <div>
                    <a
                      href="/branches"
                      onClick={(e) => handleNav(e, '/branches')}
                      className="text-[#F5F4EF]/90 hover:text-[#F5F4EF] font-medium transition-colors"
                    >
                      {branch.city} — {branch.neighborhood.split(',')[0]}
                    </a>
                    <p className="text-xs text-[#858B85] mt-0.5">{branch.hoursWeekday}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenEnquiry()}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F5F4EF] bg-[#315B43] hover:bg-[#264835] px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                <span>Book a Coached Trial</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Social Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#858B85]">
          <p>© {new Date().getFullYear()} DraftWorks Fitness Pvt. Ltd. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F5F4EF] transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F5F4EF] transition-colors"
            >
              YouTube
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F5F4EF] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F5F4EF] transition-colors"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
