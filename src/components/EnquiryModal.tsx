import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Phone, MapPin, Calendar } from 'lucide-react';
import { PROGRAMS, BRANCHES, BRAND_INFO } from '../data/gymData';
import { validateEnquiryForm, type EnquiryFormInput } from '../utils/gymLogic';

export interface SubmittedEnquiry extends EnquiryFormInput {
  id: string;
  submittedAt: string;
  normalizedPhone: string;
}

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProgram?: string;
  defaultBranch?: string;
  onSuccessSubmit: (enquiry: SubmittedEnquiry) => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultProgram = '',
  defaultBranch = '',
  onSuccessSubmit,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [program, setProgram] = useState(defaultProgram || PROGRAMS[0].title);
  const [branch, setBranch] = useState(defaultBranch || BRANCHES[0].name);
  const [preferredTime, setPreferredTime] = useState('Morning (06:30 AM – 10:00 AM)');
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    program?: string;
    branch?: string;
  }>({});
  const [submittedRecord, setSubmittedRecord] = useState<SubmittedEnquiry | null>(null);

  useEffect(() => {
    if (defaultProgram) setProgram(defaultProgram);
  }, [defaultProgram]);

  useEffect(() => {
    if (defaultBranch) setBranch(defaultBranch);
  }, [defaultBranch]);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateEnquiryForm({
      name,
      phone,
      program,
      branch,
      preferredTime,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const newRecord: SubmittedEnquiry = {
      id: `DW-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name.trim(),
      phone: phone.trim(),
      normalizedPhone: validation.normalizedPhone,
      program,
      branch,
      preferredTime,
      submittedAt: new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setSubmittedRecord(newRecord);
    onSuccessSubmit(newRecord);
  };

  const handleResetAndClose = () => {
    setSubmittedRecord(null);
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#171A18]/80 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
    >
      {/* Backdrop click target */}
      <div
        className="fixed inset-0"
        onClick={handleResetAndClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-[#F5F4EF] text-[#171A18] border border-[#E3E5DF] shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Top Header Bar */}
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-[#E3E5DF]">
          <div>
            <p className="text-xs font-medium text-[#315B43] tracking-wide">
              1-on-1 Trial &amp; Assessment Session
            </p>
            <h2
              id="enquiry-modal-title"
              className="font-display text-2xl sm:text-3xl font-semibold text-[#171A18] mt-0.5"
            >
              Book a Coached Trial at DraftWorks
            </h2>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label="Close enquiry modal"
            className="p-2 rounded-lg text-[#171A18]/70 hover:text-[#171A18] hover:bg-[#E3E5DF]/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submittedRecord ? (
            <div className="py-4 space-y-5">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#315B43]/10 border border-[#315B43]/25">
                <CheckCircle2 className="w-6 h-6 text-[#315B43] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-base text-[#171A18]">
                    Trial Request Confirmed ({submittedRecord.id})
                  </h3>
                  <p className="text-sm text-[#171A18]/80 mt-1">
                    Thank you, <span className="font-semibold">{submittedRecord.name}</span>. Our front-desk team at{' '}
                    <span className="font-semibold">{submittedRecord.branch}</span> will call or WhatsApp you on{' '}
                    <span className="font-semibold tabular-nums">{submittedRecord.normalizedPhone}</span> within 2 business hours.
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-white p-4 border border-[#E3E5DF] space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-[#858B85]">Selected Program</span>
                  <span className="font-medium text-right">{submittedRecord.program}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#858B85]">Branch Location</span>
                  <span className="font-medium text-right">{submittedRecord.branch}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#858B85]">Preferred Window</span>
                  <span className="font-medium text-right">{submittedRecord.preferredTime}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <a
                  href={BRAND_INFO.phoneHref}
                  className="inline-flex items-center gap-2 text-xs font-medium text-[#315B43] hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Direct Desk: {BRAND_INFO.phone}</span>
                </a>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedRecord(null);
                      setName('');
                      setPhone('');
                    }}
                    className="px-4 py-2 text-xs font-semibold rounded-lg border border-[#E3E5DF] hover:border-[#171A18] transition-colors whitespace-nowrap shrink-0"
                  >
                    Book Another Slot
                  </button>
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#315B43] text-[#F5F4EF] hover:bg-[#264835] transition-colors whitespace-nowrap shrink-0"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <p className="text-sm text-[#171A18]/75 leading-relaxed">
                Includes a 60-minute coached session and movement assessment. Trial fee of ₹500 is fully adjusted against any membership plan.
              </p>

              <div>
                <label
                  htmlFor="enquiry-name"
                  className="block text-xs font-semibold text-[#171A18] mb-1.5"
                >
                  Full Name *
                </label>
                <input
                  id="enquiry-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white border border-[#E3E5DF] focus:outline-none focus:border-[#315B43] text-[#171A18]"
                />
                {errors.name && (
                  <p role="alert" className="text-xs text-red-700 mt-1 font-medium">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="enquiry-phone"
                  className="block text-xs font-semibold text-[#171A18] mb-1.5"
                >
                  Mobile Number (India) *
                </label>
                <input
                  id="enquiry-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors({ ...errors, phone: undefined });
                  }}
                  placeholder="+91 98450 12345"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white border border-[#E3E5DF] focus:outline-none focus:border-[#315B43] text-[#171A18] tabular-nums"
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
                    htmlFor="enquiry-program"
                    className="block text-xs font-semibold text-[#171A18] mb-1.5"
                  >
                    Interested Program *
                  </label>
                  <select
                    id="enquiry-program"
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white border border-[#E3E5DF] focus:outline-none focus:border-[#315B43] text-[#171A18]"
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
                    htmlFor="enquiry-branch"
                    className="block text-xs font-semibold text-[#171A18] mb-1.5"
                  >
                    Preferred Branch *
                  </label>
                  <select
                    id="enquiry-branch"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white border border-[#E3E5DF] focus:outline-none focus:border-[#315B43] text-[#171A18]"
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
                  htmlFor="enquiry-slot"
                  className="block text-xs font-semibold text-[#171A18] mb-1.5"
                >
                  Preferred Training Window
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    'Morning (06:30 AM – 10:00 AM)',
                    'Evening (05:30 PM – 09:00 PM)',
                  ].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setPreferredTime(slot)}
                      className={`px-3 py-2 text-xs font-medium rounded-xl border text-left transition-colors ${
                        preferredTime === slot
                          ? 'bg-[#171A18] text-[#F5F4EF] border-[#171A18]'
                          : 'bg-white text-[#171A18] border-[#E3E5DF] hover:border-[#171A18]/40'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5 inline mr-1.5 opacity-80" />
                      {slot.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <div className="text-xs text-[#858B85] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#315B43] shrink-0" />
                  <span>Bengaluru · Mumbai · Pune · Hyderabad</span>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-semibold rounded-xl bg-[#315B43] text-[#F5F4EF] hover:bg-[#264835] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Confirm Trial Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
