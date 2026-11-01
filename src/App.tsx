/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { PROGRAMS } from './data/gymData';
import { parseRoute, getPageMetadata, type RouteState } from './utils/gymLogic';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { EnquiryModal, type SubmittedEnquiry } from './components/EnquiryModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { ProgramDetailPage } from './pages/ProgramDetailPage';
import { BranchesPage } from './pages/BranchesPage';
import { GalleryPage } from './pages/GalleryPage';
import { TransformationsPage } from './pages/TransformationsPage';
import { ContactPage } from './pages/ContactPage';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [route, setRoute] = useState<RouteState>(() =>
    parseRoute(window.location.pathname)
  );
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryDefaults, setEnquiryDefaults] = useState<{
    program?: string;
    branch?: string;
  }>({});
  const [submittedEnquiries, setSubmittedEnquiries] = useState<SubmittedEnquiry[]>([]);
  const mainRef = useRef<HTMLElement | null>(null);

  // Initialize Lenis smooth scrolling respecting prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 0.9,
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Listen to browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseRoute(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync page-specific SEO title & meta description and run subtle GSAP entrance animations
  useEffect(() => {
    const meta = getPageMetadata(route, PROGRAMS);
    document.title = meta.title;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) {
      descEl.setAttribute('content', meta.description);
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion || !mainRef.current) return;

    const ctx = gsap.context(() => {
      const sections = mainRef.current?.querySelectorAll('[data-gsap="reveal"]');
      sections?.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0.92, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 88%',
              once: true,
            },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, [route]);

  const handleNavigate = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setRoute(parseRoute(path));
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const handleOpenEnquiry = (program?: string, branch?: string) => {
    setEnquiryDefaults({ program, branch });
    setIsEnquiryOpen(true);
  };

  const handleEnquirySuccess = (record: SubmittedEnquiry) => {
    setSubmittedEnquiries((prev) => [record, ...prev]);
  };

  const renderPage = () => {
    switch (route.page) {
      case 'about':
        return (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        );
      case 'programs':
        return (
          <ProgramsPage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        );
      case 'program-detail':
        return (
          <ProgramDetailPage
            slug={route.slug}
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        );
      case 'branches':
        return <BranchesPage onOpenEnquiry={handleOpenEnquiry} />;
      case 'gallery':
        return <GalleryPage onOpenEnquiry={handleOpenEnquiry} />;
      case 'transformations':
        return (
          <TransformationsPage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        );
      case 'contact':
        return <ContactPage onSuccessSubmit={handleEnquirySuccess} />;
      case 'home':
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
            recentEnquiries={submittedEnquiries}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F4EF] text-[#171A18]">
      <Header
        currentPage={route.page}
        onNavigate={handleNavigate}
        onOpenEnquiry={handleOpenEnquiry}
        enquiryCount={submittedEnquiries.length}
      />

      <main ref={mainRef} className="flex-1">
        {renderPage()}
      </main>

      <Footer
        onNavigate={handleNavigate}
        onOpenEnquiry={handleOpenEnquiry}
      />

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        defaultProgram={enquiryDefaults.program}
        defaultBranch={enquiryDefaults.branch}
        onSuccessSubmit={handleEnquirySuccess}
      />
    </div>
  );
}
