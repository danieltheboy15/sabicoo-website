import React, { useState, useEffect } from 'react';
import { RollingButton } from './RollingButton';
import { CalendarCheck, EnvelopeSimple, Clock, CheckCircle, X, ArrowSquareOut } from '@phosphor-icons/react';

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
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedTrack) {
      setForm((prev) => ({ ...prev, track: preselectedTrack }));
    }
  }, [preselectedTrack]);

  if (!isOpen) return null;

  const handleBriefSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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

                <RollingButton
                  type="submit"
                  variant="blue"
                  className="w-full"
                >
                  Submit Confidential Brief
                </RollingButton>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4 animate-in fade-in duration-300">
                <div className="w-14 h-14 bg-blue-50 text-[#1896FA] rounded-full flex items-center justify-center mx-auto border border-blue-200">
                  <CheckCircle className="w-7 h-7" weight="fill" />
                </div>
                <h4 className="font-display font-extrabold text-2xl text-[#0A0F1D]">
                  Scoping Brief Received
                </h4>
                <p className="text-base text-slate-600 font-semibold max-w-md mx-auto leading-relaxed">
                  Our senior advisory team will review your operational brief and respond within 24 hours with scoping feedback.
                </p>
                <div className="pt-4">
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-full bg-[#0A0F1D] text-white font-bold text-xs hover:bg-slate-900 transition-colors cursor-pointer"
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
