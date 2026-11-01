import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react';
import type { PageId } from '../utils/gymLogic';
import { BRAND_INFO } from '../data/gymData';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (path: string) => void;
  onOpenEnquiry: (program?: string, branch?: string) => void;
  enquiryCount: number;
}

const DESKTOP_NAV_ITEMS: { label: string; path: string; page: PageId }[] = [
  { label: 'Programs', path: '/programs', page: 'programs' },
  { label: 'Transformations', path: '/transformations', page: 'transformations' },
  { label: 'Branches', path: '/branches', page: 'branches' },
  { label: 'About', path: '/about', page: 'about' },
  { label: 'Contact', path: '/contact', page: 'contact' },
];

const MOBILE_DRAWER_ITEMS: { label: string; path: string; page: PageId }[] = [
  { label: 'Home', path: '/', page: 'home' },
  { label: 'Programs', path: '/programs', page: 'programs' },
  { label: 'Transformations', path: '/transformations', page: 'transformations' },
  { label: 'Our Branches', path: '/branches', page: 'branches' },
  { label: 'Gallery', path: '/gallery', page: 'gallery' },
  { label: 'About Us', path: '/about', page: 'about' },
  { label: 'Contact', path: '/contact', page: 'contact' },
];

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenEnquiry,
  enquiryCount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Pages with full-bleed dark hero backgrounds start with transparent light-text header
  const hasFullBleedDarkHero =
    currentPage === 'home' ||
    currentPage === 'about' ||
    currentPage === 'programs' ||
    currentPage === 'program-detail' ||
    currentPage === 'branches' ||
    currentPage === 'gallery';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 36);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    onNavigate(path);
  };

  const useLightTextOnDark = hasFullBleedDarkHero && !isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-colors duration-200 ${
          isScrolled
            ? 'bg-[#171A18]/95 backdrop-blur-md border-b border-[#F5F4EF]/10 text-[#F5F4EF]'
            : useLightTextOnDark
              ? 'bg-gradient-to-b from-[#171A18]/80 to-transparent text-[#F5F4EF]'
              : 'bg-[#F5F4EF]/95 backdrop-blur-md border-b border-[#E3E5DF] text-[#171A18]'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-5 sm:px-8 h-16 sm:h-20">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="font-display text-2xl sm:text-3xl font-bold tracking-tight whitespace-nowrap shrink-0"
          >
            DraftWorks
          </a>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-7 text-sm font-medium"
          >
            {DESKTOP_NAV_ITEMS.map((item) => {
              const isActive =
                currentPage === item.page ||
                (item.page === 'programs' && currentPage === 'program-detail');
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleLinkClick(e, item.path)}
                  className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                    isActive
                      ? 'border-[#315B43] font-semibold'
                      : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action on desktop, menu button on mobile */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenEnquiry()}
              className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-[#315B43] text-[#F5F4EF] hover:bg-[#264835] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {enquiryCount > 0 ? `Book a Trial (${enquiryCount})` : 'Book a Trial'}
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              className="lg:hidden inline-flex items-center justify-center p-2.5 rounded-xl border border-current/20 hover:bg-current/10 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Fixed Mobile Navigation Drawer Overlay (outside normal document flow) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#171A18]/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-over panel */}
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#171A18] text-[#F5F4EF] border-l border-[#F5F4EF]/10 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#F5F4EF]/10">
                <a
                  href="/"
                  onClick={(e) => handleLinkClick(e, '/')}
                  className="font-display text-2xl font-bold tracking-tight text-[#F5F4EF] whitespace-nowrap shrink-0"
                >
                  DraftWorks
                </a>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="p-2.5 rounded-xl text-[#F5F4EF]/80 hover:text-[#F5F4EF] hover:bg-[#F5F4EF]/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav aria-label="Mobile Navigation" className="mt-6 flex flex-col gap-1">
                {MOBILE_DRAWER_ITEMS.map((item) => {
                  const isActive =
                    currentPage === item.page ||
                    (item.page === 'programs' && currentPage === 'program-detail');
                  return (
                    <a
                      key={item.path}
                      href={item.path}
                      onClick={(e) => handleLinkClick(e, item.path)}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-display text-2xl tracking-wide transition-colors ${
                        isActive
                          ? 'bg-[#315B43] text-[#F5F4EF] font-semibold'
                          : 'text-[#F5F4EF]/85 hover:bg-[#F5F4EF]/5 hover:text-[#F5F4EF]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-60" />
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#F5F4EF]/10 space-y-4">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full py-3.5 px-5 rounded-xl bg-[#315B43] text-[#F5F4EF] font-semibold text-sm hover:bg-[#264835] transition-colors cursor-pointer"
              >
                Book a Trial Session
              </button>

              <div className="flex items-center justify-between text-xs text-[#858B85] pt-1">
                <a
                  href={BRAND_INFO.phoneHref}
                  className="inline-flex items-center gap-1.5 text-[#F5F4EF]/80 hover:text-[#F5F4EF]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#315B43]" />
                  <span className="tabular-nums">{BRAND_INFO.phone}</span>
                </a>
                <span>{BRAND_INFO.email}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
