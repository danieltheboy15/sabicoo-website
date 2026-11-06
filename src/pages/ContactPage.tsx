import React, { useState, useEffect } from 'react';
import { CalendarBlank, PaperPlaneTilt, CheckCircle, Sparkle, ArrowSquareOut, EnvelopeSimple, CircleNotch } from '@phosphor-icons/react';
import { submitToSabiInbox, TARGET_INBOX_EMAIL } from '../services/mailService';

interface ContactPageProps {
  preselectedTrack?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ preselectedTrack }) => {
  const [activeTab, setActiveTab] = useState<'calendly' | 'form'>('calendly');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mailtoUrl, setMailtoUrl] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    currentRevenue: '₦10M - ₦50M',
    businessDescription: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (preselectedTrack) {
      // If a track or diagnosis was preselected, switch directly to the direct form tab so the user sees it immediately
      setActiveTab('form');
    }
  }, [preselectedTrack]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your full name';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your work email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone or WhatsApp number is required for follow-up';
    }
    if (!formData.businessName.trim()) {
      errs.businessName = 'Please enter your company/venture name';
    }
    if (!formData.businessDescription.trim()) {
      errs.businessDescription = 'Please briefly describe your primary operational bottleneck';
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitToSabiInbox({
        formType: 'Full Diagnostic Inquiry Form',
        subject: `[Sabi COO Inquiry] New Diagnostic Dossier: ${formData.name} (${formData.businessName})`,
        senderName: formData.name,
        senderEmail: formData.email,
        fields: {
          'Full Name': formData.name,
          'Work Email': formData.email,
          'WhatsApp / Phone': formData.phone,
          'Company / Venture Name': formData.businessName,
          'Current Revenue Stage': formData.currentRevenue,
          'Primary Bottleneck / Scope': formData.businessDescription,
          'Selected Engagement Track / Diagnosis': preselectedTrack || 'General Diagnostic Consultation',
          'Target Recipient': TARGET_INBOX_EMAIL,
        }
      });
      setMailtoUrl(result.mailtoFallbackUrl);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] text-[#0A0F1D]">
      {/* Page Header */}
      <section className="pt-16 pb-18 bg-[#021347] text-white border-b-2 border-[#021347]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
            Book a 30-Minute Diagnostic Conversation
          </h1>

          <p className="mt-4 text-base sm:text-xl md:text-2xl text-white/90 leading-relaxed font-semibold max-w-3xl">
            Direct conversation with a senior Sabi COO operator. We review where your operations are choking growth, examine your revenue stage, and provide direct feedback on whether our model is the right intervention.
          </p>
        </div>
      </section>

      {/* Main Form & Calendar Container */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Booking Mode Switcher with Phosphor Icons */}
          <div className="flex items-center justify-center mb-10">
            <div className="p-1.5 bg-slate-50 border border-slate-200 rounded-full shadow-xs inline-flex">
              <button
                type="button"
                onClick={() => setActiveTab('calendly')}
                className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'calendly'
                    ? 'bg-[#0A0F1D] text-white shadow-sm'
                    : 'text-slate-600 hover:text-[#0A0F1D]'
                }`}
              >
                <CalendarBlank className="w-4 h-4 shrink-0" weight="bold" />
                <span>Instant Calendar Booking</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('form')}
                className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'form'
                    ? 'bg-[#0A0F1D] text-white shadow-sm'
                    : 'text-slate-600 hover:text-[#0A0F1D]'
                }`}
              >
                <PaperPlaneTilt className="w-4 h-4 shrink-0" weight="bold" />
                <span>Direct Inquiry Form</span>
              </button>
            </div>
          </div>

          {/* Active View: Calendly Embed */}
          {activeTab === 'calendly' && (
            <div className="bg-[#FAFAFA] rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-4 sm:p-8">
              <div className="text-center mb-6">
                <span className="font-mono text-xs font-semibold text-[#1896FA] uppercase tracking-wider block">
                  LIVE CALENDAR DISPATCH
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#0A0F1D] mt-1">
                  Select a Time on Our Calendar
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 font-semibold">
                  Slots automatically sync across Lagos (WAT) and international time zones.
                </p>
                <div className="mt-3 flex items-center justify-center">
                  <a
                    href="https://calendly.com/sabicoo-info/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-bold text-[#1896FA] hover:text-[#021347] hover:border-slate-300 shadow-xs transition-all cursor-pointer"
                  >
                    <span>Open directly on Calendly</span>
                    <ArrowSquareOut className="w-3.5 h-3.5" weight="bold" />
                  </a>
                </div>
              </div>

              {/* Calendly Live Iframe */}
              <div className="w-full min-h-[680px] rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-inner">
                <iframe
                  src="https://calendly.com/sabicoo-info/30min?hide_event_type_details=0&hide_gdpr_banner=1&primary_color=1896fa"
                  width="100%"
                  height="680"
                  frameBorder="0"
                  title="Schedule a Discovery Call with Sabi COO"
                  className="w-full h-[680px]"
                />
              </div>
            </div>
          )}

          {/* Active View: Structured Direct Inquiry Form */}
          {activeTab === 'form' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 max-w-2xl mx-auto">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <span className="font-mono text-xs font-semibold text-[#1896FA] uppercase tracking-wider block mb-1">
                      STRUCTURED INTAKE
                    </span>
                    <h3 className="font-display font-bold text-2xl text-[#0A0F1D]">
                      Submit Your Operational Dossier
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 font-semibold">
                      Responses are routed directly to our senior operating team at <strong className="text-[#021347] font-bold">info@sabicoo.com</strong> for review within 24 hours.
                    </p>
                  </div>

                  {preselectedTrack && (
                    <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200 flex items-start gap-3">
                      <Sparkle className="w-5 h-5 text-[#1896FA] shrink-0 mt-0.5" weight="fill" />
                      <div>
                        <div className="text-[11px] font-mono font-bold text-[#1896FA] uppercase tracking-wider">
                          Attached Track / Diagnostic Result
                        </div>
                        <div className="text-sm font-bold text-[#021347] mt-0.5">
                          {preselectedTrack}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase font-mono mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Babatunde Adeleke"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#0A0F1D] focus:outline-none focus:border-[#1896FA] ${
                          errors.name ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                        }`}
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase font-mono mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="babatunde@venture.com"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#0A0F1D] focus:outline-none focus:border-[#1896FA] ${
                          errors.email ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                        }`}
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase font-mono mb-1.5">
                        WhatsApp / Phone *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+234 800 000 0000"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#0A0F1D] focus:outline-none focus:border-[#1896FA] ${
                          errors.phone ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                        }`}
                      />
                      {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase font-mono mb-1.5">
                        Company / Venture Name *
                      </label>
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="Acme Logistics Ltd"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#0A0F1D] focus:outline-none focus:border-[#1896FA] ${
                          errors.businessName ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                        }`}
                      />
                      {errors.businessName && <p className="text-xs text-red-500 mt-1">{errors.businessName}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase font-mono mb-1.5">
                      Current Revenue Stage
                    </label>
                    <select
                      value={formData.currentRevenue}
                      onChange={(e) => setFormData({ ...formData, currentRevenue: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-[#0A0F1D] focus:outline-none focus:border-[#1896FA] bg-white cursor-pointer"
                    >
                      <option value="Pre-revenue (₦0)">Pre-revenue (₦0)</option>
                      <option value="₦0 - ₦10M ARR">₦0 - ₦10M ARR</option>
                      <option value="₦10M - ₦50M ARR">₦10M - ₦50M ARR</option>
                      <option value="₦50M - ₦100M ARR">₦50M - ₦100M ARR</option>
                      <option value="Above ₦100M ARR">Above ₦100M ARR</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase font-mono mb-1.5">
                      Primary Operational Bottleneck *
                    </label>
                    <textarea
                      rows={3}
                      value={formData.businessDescription}
                      onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
                      placeholder="e.g. Delayed customer invoicing, inventory discrepancy in warehouse, founder trapped in staff micromanagement..."
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-[#0A0F1D] focus:outline-none focus:border-[#1896FA] ${
                        errors.businessDescription ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                      }`}
                    />
                    {errors.businessDescription && (
                      <p className="text-xs text-red-500 mt-1">{errors.businessDescription}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#0A0F1D] hover:bg-[#1896FA] disabled:bg-slate-400 text-white font-bold text-sm rounded-full transition-all cursor-pointer shadow-lg active:scale-98 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <CircleNotch className="w-5 h-5 animate-spin" weight="bold" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>Submit Request</span>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-blue-50 text-[#1896FA] flex items-center justify-center mx-auto mb-4 border border-blue-200">
                    <CheckCircle className="w-8 h-8 text-[#1896FA]" weight="fill" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-[#0A0F1D]">
                    Inquiry Received & Routed to info@sabicoo.com
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-semibold">
                    Thank you, <strong className="text-[#0A0F1D]">{formData.name}</strong>. Your operational brief for <strong className="text-[#0A0F1D]">{formData.businessName}</strong> has been transmitted to <span className="text-[#1896FA] font-bold">info@sabicoo.com</span>.
                  </p>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-600 max-w-sm mx-auto text-left space-y-1.5 font-bold">
                    <div>Recipient: <span className="font-bold text-[#1896FA]">info@sabicoo.com</span></div>
                    <div>Stage: <span className="font-bold text-[#0A0F1D]">{formData.currentRevenue}</span></div>
                    {preselectedTrack && (
                      <div>Track: <span className="font-bold text-[#0A0F1D]">{preselectedTrack}</span></div>
                    )}
                    <div>SLA: <span className="font-bold text-green-600">Guaranteed 24-Hour Scoping Call</span></div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                    {mailtoUrl && (
                      <a
                        href={mailtoUrl}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1896FA] text-white text-xs font-bold hover:bg-blue-600 transition-colors shadow-sm"
                      >
                        <EnvelopeSimple className="w-4 h-4" weight="bold" />
                        <span>Open Direct Email Draft Copy</span>
                      </a>
                    )}
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-full border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </section>
    </div>
  );
};
