import React, { useState } from 'react';
import { Phone, Mail, MapPin, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { BRAND_INFO, BRANCHES, PROGRAMS } from '../data/gymData';
import { validateEnquiryForm } from '../utils/gymLogic';
import type { SubmittedEnquiry } from '../components/EnquiryModal';

interface ContactPageProps {
  onSuccessSubmit: (enquiry: SubmittedEnquiry) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onSuccessSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [program, setProgram] = useState(PROGRAMS[0].title);
  const [branch, setBranch] = useState(`${BRANCHES[0].name} (${BRANCHES[0].city})`);
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    program?: string;
    branch?: string;
  }>({});
  const [submitted, setSubmitted] = useState<SubmittedEnquiry | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateEnquiryForm({
      name,
      phone,
      program,
      branch,
      notes,
    });
    if (!res.valid) {
      setErrors(res.errors);
      return;
    }
    setErrors({});
    const record: SubmittedEnquiry = {
      id: `DW-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name.trim(),
      phone: phone.trim(),
      normalizedPhone: res.normalizedPhone,
      program,
      branch,
      notes: notes.trim(),
      submittedAt: new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setSubmitted(record);
    onSuccessSubmit(record);
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* HERO (Option B — Composed Split Hero Leading Directly Into Contact & Booking, 100svh) */}
      <section className="min-h-[100svh] pt-20 bg-[#F5F4EF] text-[#171A18] border-b border-[#E3E5DF] flex items-center">
        <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Details & Club Desks */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#315B43]">
                Contact &amp; Trial Bookings
              </p>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#171A18] leading-[0.96]">
                Visit a Club or Speak With a Coach.
              </h1>
              <p className="text-base text-[#171A18]/80 max-w-lg leading-relaxed">
                Have questions about barbell onboarding, recovering from a past injury, or choosing between small-group and 1-on-1 coaching? Reach our desk directly.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={BRAND_INFO.phoneHref}
                className="p-5 rounded-2xl bg-white border border-[#E3E5DF] hover:border-[#315B43] transition-colors space-y-1"
              >
                <Phone className="w-5 h-5 text-[#315B43]" />
                <div className="text-xs text-[#858B85] pt-1">Phone &amp; WhatsApp Desk</div>
                <div className="font-display text-2xl font-bold text-[#171A18] tabular-nums">
                  {BRAND_INFO.phone}
                </div>
              </a>

              <a
                href={`mailto:${BRAND_INFO.email}`}
                className="p-5 rounded-2xl bg-white border border-[#E3E5DF] hover:border-[#315B43] transition-colors space-y-1"
              >
                <Mail className="w-5 h-5 text-[#315B43]" />
                <div className="text-xs text-[#858B85] pt-1">General &amp; Corporate Enquiries</div>
                <div className="font-display text-2xl font-bold text-[#171A18]">
                  {BRAND_INFO.email}
                </div>
              </a>
            </div>

            <div className="space-y-3 pt-2">
              <h2 className="font-display text-2xl font-bold text-[#171A18]">
                Branch Front Desks
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BRANCHES.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 rounded-xl bg-white border border-[#E3E5DF] text-xs space-y-1"
                  >
                    <div className="font-semibold text-sm text-[#171A18] flex items-center justify-between">
                      <span>{b.name}</span>
                      <a
                        href={b.directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#315B43] inline-flex items-center gap-0.5 hover:underline"
                      >
                        <span>Map</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-[#171A18]/75">{b.neighborhood}, {b.city}</p>
                    <p className="text-[#858B85] tabular-nums">{b.hoursWeekday}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Direct Trial & Enquiry Form */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-white p-6 sm:p-8 border border-[#E3E5DF] shadow-sm">
              <h2 className="font-display text-3xl font-bold text-[#171A18]">
                Schedule Your Trial Session
              </h2>
              <p className="text-sm text-[#171A18]/75 mt-1 mb-6">
                Fill in your details below and our branch head coach will confirm your preferred slot.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-[#315B43]/10 border border-[#315B43]/30 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#315B43] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-base text-[#171A18]">
                        Enquiry Received ({submitted.id})
                      </h3>
                      <p className="text-sm text-[#171A18]/80 mt-1">
                        We have registered your trial request for{' '}
                        <strong>{submitted.program}</strong> at{' '}
                        <strong>{submitted.branch}</strong>. We will reach out on{' '}
                        <span className="tabular-nums font-medium">{submitted.normalizedPhone}</span>.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(null);
                      setName('');
                      setPhone('');
                      setNotes('');
                    }}
                    className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#171A18] text-[#F5F4EF] cursor-pointer"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[#171A18] mb-1.5"
                    >
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      placeholder="e.g. Rohan Kulkarni"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#F5F4EF] border border-[#E3E5DF] focus:outline-none focus:border-[#315B43]"
                    />
                    {errors.name && (
                      <p role="alert" className="text-xs text-red-700 mt-1 font-medium">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-semibold text-[#171A18] mb-1.5"
                    >
                      Mobile Number (India) *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      placeholder="+91 98450 12345"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#F5F4EF] border border-[#E3E5DF] focus:outline-none focus:border-[#315B43] tabular-nums"
                    />
                    {errors.phone && (
                      <p role="alert" className="text-xs text-red-700 mt-1 font-medium">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-program"
                        className="block text-xs font-semibold text-[#171A18] mb-1.5"
                      >
                        Interested Program *
                      </label>
                      <select
                        id="contact-program"
                        value={program}
                        onChange={(e) => setProgram(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#F5F4EF] border border-[#E3E5DF] focus:outline-none focus:border-[#315B43]"
                      >
                        {PROGRAMS.map((p) => (
                          <option key={p.id} value={p.title}>
                            {p.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-branch"
                        className="block text-xs font-semibold text-[#171A18] mb-1.5"
                      >
                        Preferred Branch *
                      </label>
                      <select
                        id="contact-branch"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#F5F4EF] border border-[#E3E5DF] focus:outline-none focus:border-[#315B43]"
                      >
                        {BRANCHES.map((b) => (
                          <option key={b.id} value={`${b.name} (${b.city})`}>
                            {b.name} ({b.city})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-notes"
                      className="block text-xs font-semibold text-[#171A18] mb-1.5"
                    >
                      Training Goals or Injury Notes (Optional)
                    </label>
                    <textarea
                      id="contact-notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Let us know your current training routine or preferred time of day..."
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#F5F4EF] border border-[#E3E5DF] focus:outline-none focus:border-[#315B43]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 text-sm font-semibold rounded-xl bg-[#315B43] text-[#F5F4EF] hover:bg-[#264835] transition-colors cursor-pointer"
                  >
                    Request Trial Session
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
