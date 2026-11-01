export interface ProgramScheduleSlot {
  days: string;
  morning: string;
  evening: string;
}

export interface Program {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'Strength' | 'Conditioning' | 'Mobility & Recovery' | 'Personal Coaching';
  intensity: 'Foundational' | 'Intermediate' | 'High Output';
  durationMinutes: number;
  sessionsPerWeek: string;
  monthlyFeeInr: number;
  coachRatio: string;
  image: string;
  imageAlt: string;
  focusAreas: string[];
  weeklyStructure: {
    dayLabel: string;
    focus: string;
    detail: string;
  }[];
  whoItIsFor: string[];
  schedule: ProgramScheduleSlot[];
  leadCoach: string;
}

export interface Branch {
  id: string;
  slug: string;
  name: string;
  city: string;
  neighborhood: string;
  address: string;
  landmark: string;
  phone: string;
  email: string;
  hoursWeekday: string;
  hoursWeekend: string;
  areaSqFt: string;
  racksCount: number;
  turfLengthMeters: number;
  directionsUrl: string;
  image: string;
  imageAlt: string;
  highlights: string[];
}

export interface TransformationStory {
  id: string;
  memberName: string;
  age: number;
  profession: string;
  branchName: string;
  programTitle: string;
  timeframeWeeks: number;
  summary: string;
  outcomeMetric: string;
  coachQuote: string;
  coachName: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  beforeFilterStyle?: string;
  afterFilterStyle?: string;
}

export interface Testimonial {
  id: string;
  memberName: string;
  role: string;
  branch: string;
  program: string;
  quote: string;
  outcome: string;
  tenure: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: 'Strength Floor' | 'Conditioning Turf' | 'Coaching' | 'Recovery & Architecture';
  branch: string;
  image: string;
  aspectRatio: 'wide' | 'tall' | 'standard';
  objectPosition?: string;
}

export interface Coach {
  id: string;
  name: string;
  role: string;
  credentials: string;
  branch: string;
  bio: string;
  image: string;
}

export const BRAND_INFO = {
  name: 'DraftWorks',
  tagline: 'Strength, Conditioning & Personal Coaching',
  email: 'hello@draftworks.in',
  phone: '+91 89596 90529',
  phoneHref: 'tel:+918959690529',
  currency: 'INR',
  foundedYear: 2021,
};

export const IMAGES = {
  heroGymTraining: '/temp/hero.webp',
  facilityInteriorWide: '/temp/facility.webp',
  programFunctionalAthletics: '/temp/program.webp',
  transformationBefore: '/temp/transformation-before.webp',
  transformationAfter: '/temp/transformation-after.webp',
};

export const PROGRAMS: Program[] = [
  {
    id: 'prog-1',
    slug: 'foundational-strength',
    title: 'Foundational Barbell & Strength',
    shortDescription:
      'Progressive barbell mechanics, compound lifts, and structured overload in small groups of eight.',
    fullDescription:
      'Built around the squat, hinge, press, and loaded carry. Every 8-week cycle tracks your working weights, bar speed, and joint control so you build durable strength without ego lifting or guesswork.',
    category: 'Strength',
    intensity: 'Foundational',
    durationMinutes: 60,
    sessionsPerWeek: '3 to 4 sessions / week',
    monthlyFeeInr: 6500,
    coachRatio: '1:8 Coach-to-Member Ratio',
    image: IMAGES.heroGymTraining,
    imageAlt: 'Athlete preparing for a barbell deadlift on a wooden lifting platform at DraftWorks',
    focusAreas: [
      'Compound barbell mechanics (Squat, Deadlift, Overhead Press)',
      'Unilateral accessory work for hip and shoulder stability',
      'Tracked 8-week progressive overload cycles',
      'Tempo control and bracing under sub-maximal loads',
    ],
    weeklyStructure: [
      {
        dayLabel: 'Monday',
        focus: 'Lower Body Squat & Core Bracing',
        detail: 'Back squat progression, Bulgarian split squats, and heavy suitcase carries.',
      },
      {
        dayLabel: 'Wednesday',
        focus: 'Upper Body Push / Pull Balance',
        detail: 'Barbell bench or overhead press paired with chest-supported rows and chin-ups.',
      },
      {
        dayLabel: 'Friday',
        focus: 'Posterior Chain & Hinge Mechanics',
        detail: 'Trap-bar or conventional deadlifts, Romanian deadlifts, and sled drags.',
      },
      {
        dayLabel: 'Saturday',
        focus: 'Optional Hypertrophy & Mobility',
        detail: 'Joint-friendly accessory volume, thoracic opener work, and loaded carries.',
      },
    ],
    whoItIsFor: [
      'Beginners who want proper barbell coaching from day one',
      'Desk professionals looking to fix posture and build lean muscle mass',
      'Lifters tired of crowded commercial floors with zero supervision',
    ],
    schedule: [
      { days: 'Mon · Wed · Fri', morning: '06:30 AM, 07:45 AM, 09:00 AM', evening: '05:30 PM, 06:45 PM, 08:00 PM' },
      { days: 'Saturday', morning: '07:30 AM, 09:00 AM', evening: '05:00 PM Open Platform' },
    ],
    leadCoach: 'Arjun Menon, CSCS',
  },
  {
    id: 'prog-2',
    slug: 'metabolic-engine',
    title: 'Metabolic Engine & Turf Conditioning',
    shortDescription:
      'Prowler sleds, kettlebells, erg intervals, and aerobic threshold work engineered for stamina.',
    fullDescription:
      'High-output conditioning that respects your joints. Instead of random exhaustion, sessions alternate between alactic power intervals, threshold rowing/skiing, and heavy turf sled work.',
    category: 'Conditioning',
    intensity: 'High Output',
    durationMinutes: 55,
    sessionsPerWeek: '3 sessions / week',
    monthlyFeeInr: 6000,
    coachRatio: '1:10 Coach-to-Member Ratio',
    image: IMAGES.programFunctionalAthletics,
    imageAlt: 'Two athletes pushing weighted prowler sleds and swinging kettlebells on the indoor turf',
    focusAreas: [
      'Aerobic base and VO2 max interval progressions',
      'Heavy prowler sled pushes, pulls, and farmer walks',
      'Kettlebell ballistic technique and rotational core power',
      'Heart-rate recovery pacing between work bouts',
    ],
    weeklyStructure: [
      {
        dayLabel: 'Tuesday',
        focus: 'Alactic Power & Heavy Sleds',
        detail: 'Short, explosive 20-second turf sprints and heavy sled pushes with full recovery.',
      },
      {
        dayLabel: 'Thursday',
        focus: 'Aerobic Threshold & Erg Pacing',
        detail: 'Sustained 4-minute intervals combining Concept2 Row, SkiErg, and kettlebell complexes.',
      },
      {
        dayLabel: 'Saturday',
        focus: 'Team Turf Conditioning',
        detail: 'Partner-paced loaded carries, medicine ball slams, and shuttle intervals.',
      },
    ],
    whoItIsFor: [
      'Runners, recreational footballers, and racquet-sport players seeking gas-tank stamina',
      'Members aiming for sustainable fat loss alongside strength training',
      'Anyone who enjoys high-energy group pacing without high-impact joint wear',
    ],
    schedule: [
      { days: 'Tue · Thu', morning: '06:30 AM, 08:00 AM', evening: '06:00 PM, 07:15 PM' },
      { days: 'Saturday', morning: '08:00 AM, 09:30 AM', evening: '04:30 PM' },
    ],
    leadCoach: 'Rhea Deshmukh, EXOS-XPS',
  },
  {
    id: 'prog-3',
    slug: 'athletic-hypertrophy',
    title: 'Athletic Hypertrophy & Physique',
    shortDescription:
      'Targeted muscle building combining calibrated free weights, cables, and controlled eccentric tempo.',
    fullDescription:
      'Designed for members who want visible muscular development without sacrificing athletic movement. Combines heavy primary lifts with high-tension dumbbell and cable volume.',
    category: 'Strength',
    intensity: 'Intermediate',
    durationMinutes: 65,
    sessionsPerWeek: '4 sessions / week',
    monthlyFeeInr: 7200,
    coachRatio: '1:8 Coach-to-Member Ratio',
    image: IMAGES.facilityInteriorWide,
    imageAlt: 'DraftWorks strength floor with calibrated bumper plates, squat racks, and sprint lane',
    focusAreas: [
      'Upper/Lower 4-day split with tracked volume landmarks',
      'Controlled eccentric tempos for tendon and muscular hypertrophy',
      'Shoulder, upper-back, and glute/hamstring structural balance',
      'Nutritional protein and recovery check-ins every 4 weeks',
    ],
    weeklyStructure: [
      {
        dayLabel: 'Monday',
        focus: 'Upper Body Horizontal Emphasis',
        detail: 'Incline dumbbell press, seal rows, weighted dips, and rear-delt cable work.',
      },
      {
        dayLabel: 'Tuesday',
        focus: 'Lower Body Quad & Calves',
        detail: 'Safety-bar squats, hack squats, walking lunges, and seated calf raises.',
      },
      {
        dayLabel: 'Thursday',
        focus: 'Upper Body Vertical & Arms',
        detail: 'Overhead press, weighted pull-ups, lateral raises, and direct arm supersets.',
      },
      {
        dayLabel: 'Friday',
        focus: 'Lower Body Posterior & Core',
        detail: 'Romanian deadlifts, hip thrusts, seated hamstring curls, and hanging leg raises.',
      },
    ],
    whoItIsFor: [
      'Intermediate lifters ready to move past plateaued workouts',
      'Members targeting body recomposition and lean mass gain',
    ],
    schedule: [
      { days: 'Mon · Tue · Thu · Fri', morning: '07:00 AM, 08:30 AM', evening: '05:30 PM, 07:00 PM, 08:15 PM' },
    ],
    leadCoach: 'Vikramaditya Nair, CSCS',
  },
  {
    id: 'prog-4',
    slug: 'personal-performance-coaching',
    title: '1-on-1 Personal Performance Coaching',
    shortDescription:
      'Bespoke programming, movement screening, and dedicated private coaching tailored to your schedule.',
    fullDescription:
      'Starts with a 60-minute biomechanical assessment, joint range-of-motion audit, and training history review. Your coach builds and supervises every session around your exact goals, injuries, and travel calendar.',
    category: 'Personal Coaching',
    intensity: 'Foundational',
    durationMinutes: 60,
    sessionsPerWeek: 'Flexible (3 to 5 sessions / week)',
    monthlyFeeInr: 16500,
    coachRatio: '1:1 Dedicated Coach',
    image: IMAGES.transformationAfter,
    imageAlt: 'Personal coaching client on the strength floor at DraftWorks',
    focusAreas: [
      'Full 1-on-1 supervision and real-time technique cueing',
      'Post-rehab return-to-lifting and asymmetrical strength correction',
      'Custom nutrition habits, sleep hygiene, and travel workouts',
      'Bi-weekly body composition and strength benchmark reviews',
    ],
    weeklyStructure: [
      {
        dayLabel: 'Assessment',
        focus: 'Day 1 Biomechanical & Mobility Audit',
        detail: 'Ankle, hip, thoracic, and overhead screening plus baseline strength testing.',
      },
      {
        dayLabel: 'Custom Block',
        focus: '12-Week Periodized Blueprint',
        detail: 'Sessions scheduled at your preferred slot between 06:00 AM and 09:30 PM.',
      },
    ],
    whoItIsFor: [
      'Founders, executives, and professionals needing flexible appointment slots',
      'Individuals recovering from knee, lower-back, or shoulder setbacks',
      'Members preparing for treks, marathons, or milestone body transformations',
    ],
    schedule: [
      { days: 'Mon – Sat (By Appointment)', morning: '06:00 AM – 12:00 PM', evening: '04:00 PM – 09:30 PM' },
    ],
    leadCoach: 'Kabir Sen & Senior Coaching Staff',
  },
  {
    id: 'prog-5',
    slug: 'joint-longevity-mobility',
    title: 'Joint Longevity, Kinstretch & Mobility',
    shortDescription:
      'End-range joint strength, spine decompression, and active flexibility for lifters and desk workers.',
    fullDescription:
      'Not passive stretching. We train strength at end ranges of motion—hips, shoulders, ankles, and thoracic spine—so you move without stiffness and lift heavier without joint pain.',
    category: 'Mobility & Recovery',
    intensity: 'Foundational',
    durationMinutes: 50,
    sessionsPerWeek: '2 to 3 sessions / week',
    monthlyFeeInr: 4800,
    coachRatio: '1:10 Coach-to-Member Ratio',
    image: IMAGES.facilityInteriorWide,
    imageAlt: 'Natural daylight flooding the recovery and turf zone at DraftWorks',
    focusAreas: [
      'Controlled Articular Rotations (CARs) for daily joint maintenance',
      'PAILs/RAILs isometric end-range hip and shoulder strengthening',
      'Diaphragmatic breathwork and parasympathetic down-regulation',
      'Lower-back decompression and scapular upward rotation control',
    ],
    weeklyStructure: [
      {
        dayLabel: 'Wednesday',
        focus: 'Hips, Ankles & Lower Spine',
        detail: '90/90 hip switches, deep squat ankle dorsiflexion, and Jefferson curls.',
      },
      {
        dayLabel: 'Sunday',
        focus: 'Thoracic Spine, Shoulders & Breathwork',
        detail: 'Overhead capsule work, thoracic rotation, and 10-minute guided down-regulation.',
      },
    ],
    whoItIsFor: [
      'Lifters feeling tight hips, stiff shoulders, or lower-back fatigue',
      'Professionals spending 8+ hours seated at a laptop daily',
    ],
    schedule: [
      { days: 'Wed · Fri', morning: '08:00 AM', evening: '07:30 PM' },
      { days: 'Sunday', morning: '08:30 AM, 10:00 AM', evening: 'Closed' },
    ],
    leadCoach: 'Meera Krishnan, FRCms',
  },
  {
    id: 'prog-6',
    slug: 'olympic-lifting-power',
    title: 'Barbell Club & Explosive Power',
    shortDescription:
      'Technical snatch, clean & jerk, plyometrics, and rate-of-force development on competition platforms.',
    fullDescription:
      'Dedicated platform sessions using calibrated Eleiko and Rogue bumper plates. Focuses on triple extension, receiving position stability, and explosive vertical/horizontal jump power.',
    category: 'Strength',
    intensity: 'High Output',
    durationMinutes: 75,
    sessionsPerWeek: '3 sessions / week',
    monthlyFeeInr: 7500,
    coachRatio: '1:6 Coach-to-Member Ratio',
    image: IMAGES.heroGymTraining,
    imageAlt: 'Heavy barbell platform set up for Olympic weightlifting at DraftWorks',
    focusAreas: [
      'Clean, Jerk, and Snatch positional breakdowns',
      'Front squat and overhead squat structural strength',
      'Box jumps, medicine ball throws, and explosive pulls',
      'Video bar-path feedback during Saturday platform sessions',
    ],
    weeklyStructure: [
      {
        dayLabel: 'Tuesday',
        focus: 'Snatch Mechanics & Overhead Stability',
        detail: 'Hang snatch progressions, snatch balances, and pause front squats.',
      },
      {
        dayLabel: 'Thursday',
        focus: 'Clean & Jerk Power Positions',
        detail: 'Clean pulls from blocks, split jerk footwork, and heavy pulls.',
      },
      {
        dayLabel: 'Saturday',
        focus: 'Platform Totals & Plyometrics',
        detail: 'Heavy single-rep technical waves with coach video review.',
      },
    ],
    whoItIsFor: [
      'Experienced lifters wanting to master Olympic lifts safely',
      'Athletes looking to improve explosive sprint and jump power',
    ],
    schedule: [
      { days: 'Tue · Thu', morning: '07:30 AM', evening: '06:30 PM' },
      { days: 'Saturday', morning: '10:30 AM', evening: '04:00 PM' },
    ],
    leadCoach: 'Arjun Menon, CSCS',
  },
];

export const BRANCHES: Branch[] = [
  {
    id: 'branch-blr',
    slug: 'indiranagar-bengaluru',
    name: 'DraftWorks Indiranagar',
    city: 'Bengaluru',
    neighborhood: 'HAL 2nd Stage, Indiranagar',
    address: '748, 100 Feet Road, Above Third Wave Roasters, Indiranagar, Bengaluru, Karnataka 560038',
    landmark: '350m from Indiranagar Metro Station',
    phone: '+91 89596 90529',
    email: 'indiranagar@draftworks.in',
    hoursWeekday: '05:30 AM – 10:00 PM',
    hoursWeekend: '06:30 AM – 08:00 PM',
    areaSqFt: '6,800 sq. ft.',
    racksCount: 10,
    turfLengthMeters: 28,
    directionsUrl: 'https://maps.google.com/?q=100+Feet+Road+Indiranagar+Bengaluru',
    image: IMAGES.facilityInteriorWide,
    imageAlt: 'DraftWorks Indiranagar Bengaluru flagship gym floor with natural skylights and sprint turf',
    highlights: [
      '10 Custom Half-Racks with Oak Lifting Platforms',
      '28-Meter Indoor Sprint & Prowler Turf Lane',
      'Dedicated Recovery Studio & Cold Plunge Suite',
      'Valet Two-Wheeler & Four-Wheeler Parking',
    ],
  },
  {
    id: 'branch-bom',
    slug: 'bandra-west-mumbai',
    name: 'DraftWorks Bandra West',
    city: 'Mumbai',
    neighborhood: 'Pali Hill, Bandra West',
    address: 'Plot 14, Off 16th Road, Near Pali Village Cafe, Bandra West, Mumbai, Maharashtra 400050',
    landmark: 'Off 16th Road & Ambedkar Road Junction',
    phone: '+91 89596 90529',
    email: 'bandra@draftworks.in',
    hoursWeekday: '05:30 AM – 10:30 PM',
    hoursWeekend: '06:30 AM – 08:30 PM',
    areaSqFt: '5,400 sq. ft.',
    racksCount: 8,
    turfLengthMeters: 22,
    directionsUrl: 'https://maps.google.com/?q=16th+Road+Bandra+West+Mumbai',
    image: IMAGES.heroGymTraining,
    imageAlt: 'DraftWorks Bandra West Mumbai barbell and personal training studio',
    highlights: [
      '8 Competition Power Racks & Calibrated Eleiko Plates',
      '22-Meter Acoustic-Dampened Turf Track',
      'Private 1-on-1 Biomechanics Assessment Room',
      'Post-Workout Espresso & Protein Bar',
    ],
  },
  {
    id: 'branch-pnq',
    slug: 'koregaon-park-pune',
    name: 'DraftWorks Koregaon Park',
    city: 'Pune',
    neighborhood: 'Lane 7, Koregaon Park',
    address: 'Bungalow 19, North Main Road, Lane 7, Koregaon Park, Pune, Maharashtra 411001',
    landmark: 'Opposite Osho Teerth Park Gate',
    phone: '+91 89596 90529',
    email: 'pune@draftworks.in',
    hoursWeekday: '06:00 AM – 09:30 PM',
    hoursWeekend: '06:30 AM – 07:30 PM',
    areaSqFt: '6,100 sq. ft.',
    racksCount: 8,
    turfLengthMeters: 25,
    directionsUrl: 'https://maps.google.com/?q=Lane+7+Koregaon+Park+Pune',
    image: IMAGES.programFunctionalAthletics,
    imageAlt: 'DraftWorks Koregaon Park Pune sunlit industrial strength training space',
    highlights: [
      'Indoor-Outdoor Industrial Warehouse Architecture',
      'Full Kettlebell & Strongman Implement Rig',
      'Dedicated Kinstretch & Mobility Loft',
      'Private Locker Suites with Rain Showers',
    ],
  },
  {
    id: 'branch-hyd',
    slug: 'jubilee-hills-hyderabad',
    name: 'DraftWorks Jubilee Hills',
    city: 'Hyderabad',
    neighborhood: 'Road No. 45, Jubilee Hills',
    address: 'Plot 291/A, Road No. 45, Nandagiri Hills, Jubilee Hills, Hyderabad, Telangana 500033',
    landmark: '400m from Peddamma Temple Metro',
    phone: '+91 89596 90529',
    email: 'hyderabad@draftworks.in',
    hoursWeekday: '05:30 AM – 10:00 PM',
    hoursWeekend: '06:30 AM – 08:00 PM',
    areaSqFt: '7,200 sq. ft.',
    racksCount: 12,
    turfLengthMeters: 30,
    directionsUrl: 'https://maps.google.com/?q=Road+No+45+Jubilee+Hills+Hyderabad',
    image: IMAGES.facilityInteriorWide,
    imageAlt: 'DraftWorks Jubilee Hills Hyderabad double-height strength and conditioning club',
    highlights: [
      '12 Olympic Platforms & Full Dumbbells up to 60 kg',
      '30-Meter Dual-Lane Conditioning Turf',
      'InBody 770 Composition & Force-Plate Testing',
      'Dedicated Basement Parking for 35 Vehicles',
    ],
  },
];

export const TRANSFORMATIONS: TransformationStory[] = [
  {
    id: 'trans-rohan',
    memberName: 'Rohan Kulkarni',
    age: 32,
    profession: 'Principal Product Manager',
    branchName: 'DraftWorks Indiranagar, Bengaluru',
    programTitle: 'Foundational Barbell & Strength',
    timeframeWeeks: 24,
    summary:
      'Arrived with chronic lower-back stiffness from 11-hour workdays and zero barbell experience. Over 24 weeks of four-day strength training and daily step targets, Rohan dropped 11.5 kg of fat while taking his trap-bar deadlift from 60 kg to 145 kg.',
    outcomeMetric: '-11.5 kg Body Weight · 145 kg Trap-Bar Deadlift · Zero Lower-Back Pain',
    coachQuote:
      'Rohan never missed a Monday or Friday hinge session. Once his bracing and hip mobility clicked in week six, his body composition changed rapidly.',
    coachName: 'Arjun Menon, Lead Strength Coach',
    beforeImage: IMAGES.transformationBefore,
    afterImage: IMAGES.transformationAfter,
    beforeLabel: 'Week 1 · 86.5 kg · 28% Body Fat',
    afterLabel: 'Week 24 · 75.0 kg · 15% Body Fat',
  },
  {
    id: 'trans-sid',
    memberName: 'Siddharth Verma',
    age: 35,
    profession: 'Corporate Litigator',
    branchName: 'DraftWorks Bandra West, Mumbai',
    programTitle: '1-on-1 Personal Performance Coaching',
    timeframeWeeks: 20,
    summary:
      'After an ACL reconstruction two years ago, Siddharth avoided heavy lower-body work and gained 9 kg. Through unilateral knee restoration and progressive strength blocks, he rebuilt symmetrical quad strength and lean upper-body mass.',
    outcomeMetric: '-8.2 kg Waist Reduction · +4.1 kg Lean Muscle · Full Squat Depth Restored',
    coachQuote:
      'We spent the first four weeks strictly on split-squat tempo and ankle dorsiflexion before loading the bar. Patience made the transformation stick.',
    coachName: 'Kabir Sen, Senior Performance Coach',
    beforeImage: IMAGES.transformationBefore,
    afterImage: IMAGES.transformationAfter,
    beforeLabel: 'Week 1 · Post-Injury Deconditioned',
    afterLabel: 'Week 20 · Symmetrical Strength & Lean Mass',
    beforeFilterStyle: 'contrast(0.95) saturate(0.85)',
    afterFilterStyle: 'contrast(1.06) brightness(1.02)',
  },
  {
    id: 'trans-karthik',
    memberName: 'Karthik Rajagopal',
    age: 29,
    profession: 'Architect & Marathoner',
    branchName: 'DraftWorks Koregaon Park, Pune',
    programTitle: 'Athletic Hypertrophy & Metabolic Engine',
    timeframeWeeks: 16,
    summary:
      'Karthik ran half-marathons but struggled with recurring shin splints and low upper-body strength. Combining three hypertrophy days with two low-impact sled and SkiErg sessions added 5.4 kg of lean tissue and shaved 9 minutes off his half-marathon PR.',
    outcomeMetric: '+5.4 kg Lean Mass · 1:38 Half-Marathon PR · 10 Weighted Chin-Ups',
    coachQuote:
      'Adding heavy posterior-chain strength and sled pushes completely changed Karthik’s running economy in the final 5 kilometers.',
    coachName: 'Rhea Deshmukh, Conditioning Lead',
    beforeImage: IMAGES.transformationBefore,
    afterImage: IMAGES.transformationAfter,
    beforeLabel: 'Week 1 · 66.0 kg · Under-muscled Frame',
    afterLabel: 'Week 16 · 71.4 kg · Athletic Build',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    memberName: 'Ananya Sundaram',
    role: 'VP of Engineering, Fintech',
    branch: 'Indiranagar, Bengaluru',
    program: 'Foundational Barbell & Strength',
    quote:
      'Every commercial gym I joined before DraftWorks left me guessing on the floor. Here, my coach knows my exact squat numbers, corrects my bracing on set two, and caps the group at eight people so you never wait for a rack.',
    outcome: 'Deadlifted 110 kg for 3 reps after 7 months of structured training',
    tenure: 'Member for 14 months',
  },
  {
    id: 'test-2',
    memberName: 'Devansh Mehta',
    role: 'Founder, Architectural Studio',
    branch: 'Bandra West, Mumbai',
    program: '1-on-1 Personal Performance Coaching',
    quote:
      'I came in with two herniated discs from years of bad posture. Six months with Kabir gave me my mornings back—I am lifting heavier at 38 than I did in college, without a single flare-up.',
    outcome: 'Lost 9.4 kg and eliminated chronic sciatic pain in 20 weeks',
    tenure: 'Member for 11 months',
  },
  {
    id: 'test-3',
    memberName: 'Priyanka Gokhale',
    role: 'Orthopaedic Resident',
    branch: 'Koregaon Park, Pune',
    program: 'Metabolic Engine & Turf Conditioning',
    quote:
      'As a doctor, I care deeply about joint mechanics. DraftWorks is the rare gym that pairs genuine intensity on the sled turf with strict anatomical coaching and programmed deload weeks.',
    outcome: 'Improved resting heart rate from 68 bpm to 53 bpm in 16 weeks',
    tenure: 'Member for 9 months',
  },
  {
    id: 'test-4',
    memberName: 'Raghavendra Rao',
    role: 'Director of Operations',
    branch: 'Jubilee Hills, Hyderabad',
    program: 'Athletic Hypertrophy & Physique',
    quote:
      'The space itself makes you want to train seriously—natural light, calibrated plates, zero mirrors cluttered with neon signs, and coaches who actually log your progression every single week.',
    outcome: 'Added 4.8 kg of lean muscle while dropping 4 inches off his waist',
    tenure: 'Member for 8 months',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Main Strength Floor & Sprint Turf',
    caption: '28-meter conditioning lane flanked by ten custom matte-black power racks in Indiranagar.',
    category: 'Strength Floor',
    branch: 'Indiranagar, Bengaluru',
    image: IMAGES.facilityInteriorWide,
    aspectRatio: 'wide',
  },
  {
    id: 'gal-2',
    title: 'Barbell Platform Sessions',
    caption: 'Small-group compound strength coaching with calibrated plates and oak platforms.',
    category: 'Coaching',
    branch: 'Bandra West, Mumbai',
    image: IMAGES.heroGymTraining,
    aspectRatio: 'standard',
  },
  {
    id: 'gal-3',
    title: 'Prowler Sled & Kettlebell Intervals',
    caption: 'Thursday evening Metabolic Engine threshold work on the acoustic-dampened turf.',
    category: 'Conditioning Turf',
    branch: 'Koregaon Park, Pune',
    image: IMAGES.programFunctionalAthletics,
    aspectRatio: 'standard',
  },
  {
    id: 'gal-4',
    title: 'Personal Performance Assessment',
    caption: '1-on-1 strength and posture progression tracked in 8-week training blocks.',
    category: 'Coaching',
    branch: 'Jubilee Hills, Hyderabad',
    image: IMAGES.transformationAfter,
    aspectRatio: 'tall',
  },
  {
    id: 'gal-5',
    title: 'Natural Daylight Architecture',
    caption: 'High industrial clerestory windows and forest-green acoustic walls designed for focus.',
    category: 'Recovery & Architecture',
    branch: 'Indiranagar, Bengaluru',
    image: IMAGES.facilityInteriorWide,
    aspectRatio: 'standard',
    objectPosition: 'left center',
  },
  {
    id: 'gal-6',
    title: 'Heavy Pulls & Chalked Grip',
    caption: 'Friday posterior-chain sessions focusing on deadlift bar speed and bracing.',
    category: 'Strength Floor',
    branch: 'Bandra West, Mumbai',
    image: IMAGES.heroGymTraining,
    aspectRatio: 'wide',
    objectPosition: 'center 30%',
  },
];

export const COACHES: Coach[] = [
  {
    id: 'coach-1',
    name: 'Arjun Menon',
    role: 'Head of Strength & Co-Founder',
    credentials: 'CSCS (NSCA) · Former National-Level Weightlifter',
    branch: 'Indiranagar, Bengaluru',
    bio: 'Over 11 years coaching barbell mechanics for everyday professionals and competitive lifters across India.',
    image: IMAGES.transformationAfter,
  },
  {
    id: 'coach-2',
    name: 'Rhea Deshmukh',
    role: 'Director of Conditioning',
    credentials: 'EXOS Performance Specialist · B.Sc. Sports Science',
    branch: 'Koregaon Park, Pune',
    bio: 'Specializes in energy-system development, turf sled conditioning, and return-to-sport programming.',
    image: IMAGES.heroGymTraining,
  },
  {
    id: 'coach-3',
    name: 'Kabir Sen',
    role: 'Lead Personal Performance Coach',
    credentials: 'FRCms · Post-Rehab Strength Specialist',
    branch: 'Bandra West, Mumbai',
    bio: 'Focuses on joint longevity, spine resilience, and 1-on-1 transformations for high-stress executives.',
    image: IMAGES.programFunctionalAthletics,
  },
];
