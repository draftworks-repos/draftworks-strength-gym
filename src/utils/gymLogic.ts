import type { Program } from '../data/gymData';

export type PageId =
  | 'home'
  | 'about'
  | 'programs'
  | 'program-detail'
  | 'branches'
  | 'gallery'
  | 'transformations'
  | 'contact';

export interface RouteState {
  page: PageId;
  slug?: string;
}

export interface EnquiryFormInput {
  name: string;
  phone: string;
  program: string;
  branch: string;
  preferredTime?: string;
  notes?: string;
}

export interface EnquiryValidationResult {
  valid: boolean;
  errors: {
    name?: string;
    phone?: string;
    program?: string;
    branch?: string;
  };
  normalizedPhone: string;
}

/**
 * Parses a URL pathname into a structured RouteState.
 */
export function parseRoute(pathname: string): RouteState {
  const clean = (pathname || '/').trim().replace(/\/+$/, '') || '/';

  if (clean === '/' || clean === '/home') {
    return { page: 'home' };
  }
  if (clean === '/about' || clean === '/about-us') {
    return { page: 'about' };
  }
  if (clean === '/programs' || clean === '/training') {
    return { page: 'programs' };
  }
  if (clean.startsWith('/programs/')) {
    const slug = clean.slice('/programs/'.length).trim();
    if (slug) {
      return { page: 'program-detail', slug };
    }
    return { page: 'programs' };
  }
  if (clean === '/branches' || clean === '/locations') {
    return { page: 'branches' };
  }
  if (clean === '/gallery' || clean === '/facilities') {
    return { page: 'gallery' };
  }
  if (clean === '/transformations' || clean === '/before-after') {
    return { page: 'transformations' };
  }
  if (clean === '/contact' || clean === '/visit') {
    return { page: 'contact' };
  }

  return { page: 'home' };
}

/**
 * Filters programs by search query, category, and intensity.
 */
export function filterPrograms(
  programs: Program[],
  searchQuery: string,
  category: string,
  intensity: string = 'All'
): Program[] {
  const q = searchQuery.trim().toLowerCase();
  const cat = category.trim();
  const int = intensity.trim();

  return programs.filter((program) => {
    const matchesCategory = !cat || cat === 'All' || program.category === cat;
    const matchesIntensity = !int || int === 'All' || program.intensity === int;

    if (!matchesCategory || !matchesIntensity) {
      return false;
    }

    if (!q) {
      return true;
    }

    const haystack = [
      program.title,
      program.shortDescription,
      program.fullDescription,
      program.category,
      program.intensity,
      program.leadCoach,
      ...program.focusAreas,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(q);
  });
}

/**
 * Validates the enquiry popup / contact form input.
 * Accepts standard 10-digit Indian mobile numbers with optional +91 or 0 prefix.
 */
export function validateEnquiryForm(input: EnquiryFormInput): EnquiryValidationResult {
  const errors: EnquiryValidationResult['errors'] = {};

  const trimmedName = (input.name || '').trim();
  if (trimmedName.length < 2) {
    errors.name = 'Please enter your full name (at least 2 characters).';
  }

  const rawPhone = (input.phone || '').trim();
  const digitsOnly = rawPhone.replace(/[\s\-()]/g, '');
  const indianPhoneRegex = /^(?:\+91|91|0)?([6-9]\d{9})$/;
  const match = digitsOnly.match(indianPhoneRegex);

  let normalizedPhone = '';
  if (!rawPhone) {
    errors.phone = 'Please enter your mobile number so our branch team can confirm your slot.';
  } else if (!match) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number (e.g. +91 98450 12345).';
  } else {
    const tenDigits = match[1];
    normalizedPhone = `+91 ${tenDigits.slice(0, 5)} ${tenDigits.slice(5)}`;
  }

  if (!(input.program || '').trim()) {
    errors.program = 'Please select a training program.';
  }

  if (!(input.branch || '').trim()) {
    errors.branch = 'Please select your preferred branch.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    normalizedPhone,
  };
}

/**
 * Clamps the interactive Before/After comparison slider percentage between 5 and 95.
 */
export function clampSliderPosition(percentage: number): number {
  if (Number.isNaN(percentage)) {
    return 50;
  }
  return Math.min(95, Math.max(5, Math.round(percentage * 10) / 10));
}

/**
 * Computes the next valid carousel index without overflowing items.
 */
export function getNextCarouselIndex(
  currentIndex: number,
  totalItems: number,
  visibleCount: number,
  direction: 'prev' | 'next'
): number {
  const safeVisible = Math.max(1, visibleCount);
  const maxIndex = Math.max(0, totalItems - safeVisible);

  if (direction === 'prev') {
    return Math.max(0, currentIndex - 1);
  }
  return Math.min(maxIndex, currentIndex + 1);
}

/**
 * Formats an amount in INR with the Indian numbering system (e.g. ₹6,500 or ₹16,500).
 */
export function formatInr(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * Returns SEO metadata (title and description) for the active route.
 */
export function getPageMetadata(
  route: RouteState,
  programs: Program[]
): { title: string; description: string } {
  switch (route.page) {
    case 'about':
      return {
        title: 'About DraftWorks — Coaching Philosophy & Standards',
        description:
          'Learn how DraftWorks builds durable strength and athletic conditioning across Bengaluru, Mumbai, Pune, and Hyderabad.',
      };
    case 'programs':
      return {
        title: 'Training Programs — Strength, Conditioning & Mobility | DraftWorks',
        description:
          'Explore coach-led barbell strength, turf conditioning, athletic hypertrophy, and 1-on-1 personal coaching programs at DraftWorks.',
      };
    case 'program-detail': {
      const matched = programs.find((p) => p.slug === route.slug);
      if (matched) {
        return {
          title: `${matched.title} — DraftWorks Training Program`,
          description: matched.shortDescription,
        };
      }
      return {
        title: 'Program Details — DraftWorks Strength & Conditioning',
        description: 'Structured 8-week training blocks coached in small groups at DraftWorks.',
      };
    }
    case 'branches':
      return {
        title: 'Our Branches — Bengaluru, Mumbai, Pune & Hyderabad | DraftWorks',
        description:
          'Visit DraftWorks strength and conditioning clubs in Indiranagar, Bandra West, Koregaon Park, and Jubilee Hills.',
      };
    case 'gallery':
      return {
        title: 'Facilities & Gallery — Inside DraftWorks Gym Floors',
        description:
          'Tour our custom power racks, 28m indoor sprint turf, calibrated weight rooms, and sunlit industrial spaces.',
      };
    case 'transformations':
      return {
        title: 'Member Transformations — Before & After Results | DraftWorks',
        description:
          'Real strength, fat loss, and posture transformations achieved by DraftWorks members through progressive coaching.',
      };
    case 'contact':
      return {
        title: 'Contact & Book a Trial — DraftWorks Gym India',
        description:
          'Schedule a coached trial session at DraftWorks. Call +91 89596 90529 or email hello@draftworks.in.',
      };
    case 'home':
    default:
      return {
        title: 'DraftWorks — Strength & Conditioning Gym in India',
        description:
          'Coach-led strength, conditioning, and athletic performance studios across Bengaluru, Mumbai, Pune, and Hyderabad. Book a trial session at DraftWorks.',
      };
  }
}
