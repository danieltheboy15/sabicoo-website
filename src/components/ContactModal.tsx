import React, { useState, useEffect } from 'react';
import { RollingButton } from './RollingButton';
import { CalendarCheck, EnvelopeSimple, Clock, CheckCircle, X, ArrowSquareOut, CircleNotch, Sparkle } from '@phosphor-icons/react';
import { submitToSabiInbox, TARGET_INBOX_EMAIL } from '../services/mailService';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTrack?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  preselectedTrack = ''
}) => {
  const [activeTab, setActiveTab] = useState<'calendly' | 'brief'>('calendly');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mailtoUrl, setMailtoUrl] = useState('');

  // Form State
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    revenue: '₦10M - ₦50M ARR',
    track: preselectedTrack || 'Tier 1 - Fixed-Fee Engagement',
    bottleneck: ''
  });

  useEffect(() => {
    if (preselectedTrack) {
      setForm((prev) => ({ ...prev, track: preselectedTrack }));
      // If a track was explicitly selected, open the brief tab
      setActiveTab('brief');
    }
  }, [preselectedTrack]);

  if (!isOpen) return null;

  const handleBriefSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await submitToSabiInbox({
        formType: 'Confidential Discovery Session Request (Modal)',
        subject: `[Sabi COO Discovery] Brief from ${form.name} (${form.company})`,
        senderName: form.name,
        senderEmail: form.email,
        fields: {
          'Full Name': form.name,
          'Work Email': form.email,
          'Phone / WhatsApp': form.phone || 'Not provided',
          'Company Name': form.company,
          'Current Revenue Stage': form.revenue,
          'Engagement Track / Diagnosis': form.track,
          'Operational Breakdown': form.bottleneck,
          'Target Recipient': TARGET_INBOX_EMAIL
        }
      });
      setMailtoUrl(result.mailtoFallbackUrl);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div>
            <span className="font-mono text-xs font-bold text-[#1896FA] uppercase tracking-wider block">
              CONFIDENTIAL DISCOVERY
            </span>
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#0A0F1D] tracking-tight">
              Schedule Your Diagnostic Session
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center font-semibold text-sm hover:bg-slate-100 transition-colors cursor-pointer text-slate-500"
          >
            <X className="w-4 h-4" weight="bold" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border border-slate-200 rounded-full overflow-hidden mb-6 p-1 bg-slate-50">
          <button
            onClick={() => setActiveTab('calendly')}
            className={`flex-1 py-2 text-xs font-bold uppercase rounded-full transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'calendly'
                ? 'bg-[#0A0F1D] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0A0F1D]'
            }`}
          >
            <CalendarCheck className="w-4 h-4" weight="bold" />
            <span>Instant 30-Min Call</span>
          </button>

          <button
            onClick={() => setActiveTab('brief')}
            className={`flex-1 py-2 text-xs font-bold uppercase rounded-full transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'brief'
                ? 'bg-[#0A0F1D] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0A0F1D]'
            }`}
          >
            <EnvelopeSimple className="w-4 h-4" weight="bold" />
            <span>Submit Scoping Brief</span>
          </button>
        </div>

        {/* Tab 1: Instant Call Scheduler */}
        {activeTab === 'calendly' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#0A0F1D] mb-1">
                  <Clock className="w-4 h-4 text-[#1896FA]" weight="bold" />
                  <span>30 Minutes • Live Video Call via Google Meet / Zoom</span>
                </div>
                <div className="text-xs text-slate-600 font-semibold">
                  Timezone: <strong className="text-[#0A0F1D]">West Africa Time (WAT / GMT+1)</strong> • Real-time calendar synchronization
                </div>
              </div>
              <a
                href="https://calendly.com/sabicoo-info/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-[#1896FA] hover:text-[#021347] hover:border-slate-300 shadow-2xs transition-colors shrink-0"
              >
                <span>Open in Calendly</span>
                <ArrowSquareOut className="w-3.5 h-3.5" weight="bold" />
              </a>
            </div>

            <div className="w-full h-[520px] rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-inner">
              <iframe
                src="https://calendly.com/sabicoo-info/30min?hide_event_type_details=0&hide_gdpr_banner=1&primary_color=1896fa"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Schedule a Discovery Call with Sabi COO"
                className="w-full h-full"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Detailed Scoping Brief Form */}
        {activeTab === 'brief' && (
          <div>
            {!submitted ? (
              <form onSubmit={handleBriefSubmit} className="space-y-4">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 font-semibold flex items-center justify-between">
                  <span>Routing Destination:</span>
                  <span className="font-mono font-bold text-[#1896FA]">info@sabicoo.com</span>
                </div>

                {form.track && (
                  <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center gap-2.5">
                    <Sparkle className="w-4 h-4 text-[#1896FA] shrink-0" weight="fill" />
                    <div className="text-xs">
                      <span className="text-slate-500 font-semibold">Attached Track: </span>
                      <strong className="text-[#021347] font-bold">{form.track}</strong>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 font-mono mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Babatunde Adeleke"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-[#0A0F1D] focus:outline-none focus:border-[#1896FA]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 font-mono mb-1">
                      Work Email *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="babatunde@venture.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-[#0A0F1D] focus:outline-none focus:border-[#1896FA]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 font-mono mb-1">
                      WhatsApp / Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+234 800 000 0000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-[#0A0F1D] focus:outline-none focus:border-[#1896FA]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 font-mono mb-1">
                      Company Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Acme Logistics Ltd"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-[#0A0F1D] focus:outline-none focus:border-[#1896FA]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 font-mono mb-1">
                    Current Revenue Stage:
                  </label>
                  <select
                    value={form.revenue}
                    onChange={(e) => setForm({ ...form, revenue: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-[#0A0F1D] bg-white focus:outline-none focus:border-[#1896FA]"
                  >
                    <option value="Pre-revenue">Pre-revenue (₦0)</option>
                    <option value="₦0 - ₦10M ARR">₦0 - ₦10M ARR</option>
                    <option value="₦10M - ₦50M ARR">₦10M - ₦50M ARR</option>
                    <option value="₦50M - ₦100M ARR">₦50M - ₦100M ARR</option>
                    <option value="Above ₦100M ARR">Above ₦100M ARR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 font-mono mb-1">
                    Describe Current Operational Breakdown:
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Provide context on invoicing lag, staff friction, or founder bottlenecks..."
                    value={form.bottleneck}
                    onChange={(e) => setForm({ ...form, bottleneck: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-[#0A0F1D] focus:outline-none focus:border-[#1896FA]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-full bg-[#1896FA] hover:bg-blue-600 disabled:bg-slate-400 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <CircleNotch className="w-4 h-4 animate-spin" weight="bold" />
                      <span>Sending Brief to info@sabicoo.com...</span>
                    </>
                  ) : (
                    <span>Submit Confidential Brief → info@sabicoo.com</span>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4 animate-in fade-in duration-300">
                <div className="w-14 h-14 bg-blue-50 text-[#1896FA] rounded-full flex items-center justify-center mx-auto border border-blue-200">
                  <CheckCircle className="w-7 h-7" weight="fill" />
                </div>
                <h4 className="font-display font-extrabold text-2xl text-[#0A0F1D]">
                  Brief Routed to info@sabicoo.com
                </h4>
                <p className="text-sm text-slate-600 font-semibold max-w-md mx-auto leading-relaxed">
                  Your scoping brief for <strong className="text-[#0A0F1D]">{form.company}</strong> has been transmitted directly to <span className="text-[#1896FA] font-bold">info@sabicoo.com</span>. Our senior advisory team responds within 24 hours.
                </p>
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                  {mailtoUrl && (
                    <a
                      href={mailtoUrl}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                    >
                      <EnvelopeSimple className="w-4 h-4 text-[#1896FA]" weight="bold" />
                      <span>Open Copy in Email</span>
                    </a>
                  )}
                  <button
                    onClick={onClose}
                    className="px-6 py-2 rounded-full bg-[#0A0F1D] text-white font-bold text-xs hover:bg-slate-900 transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
