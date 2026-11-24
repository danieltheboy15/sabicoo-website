import React, { useState } from 'react';
import { SCREENER_QUESTIONS } from '../data/sabiData';
import { RollingButton } from './RollingButton';
import { Sparkle, ArrowRight, ArrowsClockwise, X, CheckCircle, CircleNotch, EnvelopeSimple } from '@phosphor-icons/react';
import { submitToSabiInbox, TARGET_INBOX_EMAIL } from '../services/mailService';

interface BottleneckScreenerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookWithDiagnosis: (resultSummary: string) => void;
}

export const BottleneckScreenerModal: React.FC<BottleneckScreenerModalProps> = ({
  isOpen,
  onClose,
  onBookWithDiagnosis
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState({ founder: 0, ops: 0, cash: 0, people: 0 });
  const [strengthScores, setStrengthScores] = useState({ founder: 0, ops: 0, cash: 0, people: 0 });
  const [answers, setAnswers] = useState<{ question: string; label: string; tone: 'positive' | 'balanced' | 'challenge' }[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [senderEmail, setSenderEmail] = useState('');
  const [isSendingReport, setIsSendingReport] = useState(false);
  const [reportSent, setReportSent] = useState(false);
  const [deliveryNotice, setDeliveryNotice] = useState('');
  const [deliverySuccess, setDeliverySuccess] = useState(true);
  const [mailtoUrl, setMailtoUrl] = useState('');

  if (!isOpen) return null;

  const currentQ = SCREENER_QUESTIONS[currentStep];

  const handleNext = () => {
    if (selectedOption === null) return;
    const opt = currentQ.options[selectedOption];
    const newScores = {
      founder: scores.founder + opt.points.founder,
      ops: scores.ops + opt.points.ops,
      cash: scores.cash + opt.points.cash,
      people: scores.people + opt.points.people
    };
    const optStrengths = opt.strengths ?? { founder: 0, ops: 0, cash: 0, people: 0 };
    const newStrengths = {
      founder: strengthScores.founder + optStrengths.founder,
      ops: strengthScores.ops + optStrengths.ops,
      cash: strengthScores.cash + optStrengths.cash,
      people: strengthScores.people + optStrengths.people
    };
    setScores(newScores);
    setStrengthScores(newStrengths);
    setAnswers([
      ...answers,
      {
        question: currentQ.question,
        label: opt.label,
        tone: opt.tone ?? 'balanced'
      }
    ]);
    setSelectedOption(null);

    if (currentStep < SCREENER_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const getDiagnosis = () => {
    const totalFriction = scores.founder + scores.ops + scores.cash + scores.people;
    const positiveOrBalancedCount = answers.filter(
      (a) => a.tone === 'positive' || a.tone === 'balanced'
    ).length;

    const sortedStrengths = Object.entries(strengthScores).sort((a, b) => b[1] - a[1]);
    const topStrengthKey = sortedStrengths[0][0];
    const secondStrengthKey = sortedStrengths[1][0];

    const strengthMessages: Record<string, string> = {
      founder: 'You have protected strategic leadership bandwidth and delegated key decisions effectively.',
      ops: 'Your core workflows and delivery execution already show dependable day-to-day momentum.',
      cash: 'Your revenue activity and cash visibility give you a solid financial base to build on.',
      people: 'Your team structure shows strong commitment and clear alignment on core responsibilities.'
    };

    let workingWell = '';
    if (totalFriction <= 2) {
      workingWell =
        'Daily operations, documented workflows, cash visibility, and founder focus are all operating on a strong, healthy footing. Your team handles routine execution reliably without constant intervention.';
    } else if (positiveOrBalancedCount >= 2) {
      workingWell = `${strengthMessages[topStrengthKey]} ${
        sortedStrengths[1][1] > 2 ? strengthMessages[secondStrengthKey] : ''
      }`.trim();
    } else {
      workingWell =
        'You have active business momentum and a clear, honest view of where operational friction sits—putting you in a strong position to unlock quick time and margin wins once key systems are tightened.';
    }

    if (totalFriction <= 2) {
      return {
        category: 'Strong & Scale-Ready Operational Foundation',
        healthStatus: 'Balanced & Healthy • Ready to Scale',
        badgeTone: 'positive' as const,
        workingWell,
        opportunity:
          'No urgent operational bottlenecks are holding your business back right now. Your main opportunity is proactive governance—sharpening live KPI scorecards and stress-testing systems ahead of your next growth milestone.',
        recommendation:
          'Strategic Advisory or Benchmarking Check-in: Periodic senior review to keep margins, reporting, and leadership capacity ahead of expansion.'
      };
    }

    const highestFriction = Object.entries(scores).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
    const isModerate = totalFriction <= 7;
    const badgeTone = isModerate ? ('balanced' as const) : ('focus' as const);
    const healthStatus = isModerate
      ? 'Balanced Core • Targeted Growth Upside'
      : 'Solid Momentum • Key Bottleneck to Unlock';

    switch (highestFriction) {
      case 'founder':
        return {
          category: isModerate
            ? 'Balanced Core with Founder Approval Bottleneck'
            : 'Founder Dependency & Delegation Bottleneck',
          healthStatus,
          badgeTone,
          workingWell,
          opportunity:
            'While core business demand is moving well, too many routine approvals and escalations still route back through you. Clear decision boundaries and delegation rules will free up your strategic hours without sacrificing quality.',
          recommendation:
            'Tier 1 — Fixed-Fee Engagement (Delegation & SOP Build): Clear approval rules, team playbooks, and management handover so daily execution runs smoothly without you.'
        };
      case 'ops':
        return {
          category: isModerate
            ? 'Steady Delivery with Workflow Documentation Upside'
            : 'Workflow & Process Standardization Opportunity',
          healthStatus,
          badgeTone,
          workingWell,
          opportunity:
            'Your team is getting work done, but relying on informal chats and memory rather than simple written guides creates avoidable rework as volume grows.',
          recommendation:
            'Tier 1 — Fixed-Fee Engagement (SOP & Systems Build): Simple step-by-step operating guides, cleaner team handoffs, and live operational dashboards.'
        };
      case 'cash':
        return {
          category: isModerate
            ? 'Active Sales with Cash Forecasting Upside'
            : 'Cash Flow Timing & Visibility Opportunity',
          healthStatus,
          badgeTone,
          workingWell,
          opportunity:
            'Revenue demand is active, and tightening invoicing timelines, receivable follow-ups, and forward cash planning will make monthly cash flow far calmer and more predictable.',
          recommendation:
            'Tier 1 — Fixed-Fee Engagement (Cash & Reporting Discipline): 13-week cash visibility tracking, clear billing triggers, and easy-to-read margin scorecards.'
        };
      case 'people':
      default:
        return {
          category: isModerate
            ? 'Committed Team with Role Clarity Upside'
            : 'Role Clarity & Team Accountability Opportunity',
          healthStatus,
          badgeTone,
          workingWell,
          opportunity:
            'You have hardworking people, and eliminating overlapping duties with clear role scorecards will help managers and frontline staff take ownership faster.',
          recommendation:
            'Tier 1 — Fixed-Fee Engagement (Team Structure & Training): Clear org chart, role scorecards, and hands-on manager coaching.'
        };
    }
  };

  const diagnosis = isCompleted ? getDiagnosis() : null;

  const handleReset = () => {
    setCurrentStep(0);
    setScores({ founder: 0, ops: 0, cash: 0, people: 0 });
    setStrengthScores({ founder: 0, ops: 0, cash: 0, people: 0 });
    setAnswers([]);
    setSelectedOption(null);
    setIsCompleted(false);
    setSenderEmail('');
    setReportSent(false);
    setDeliveryNotice('');
    setDeliverySuccess(true);
    setMailtoUrl('');
  };

  const handleSendDiagnosisEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = senderEmail.trim();
    if (!cleanEmail || !diagnosis) return;
    setIsSendingReport(true);
    try {
      const result = await submitToSabiInbox({
        formType: '60-Second Operational Health & Bottleneck Screener',
        subject: `[Sabi COO Screener] Your Operational Snapshot: ${diagnosis.category}`,
        senderEmail: cleanEmail,
        ccSender: true,
        fields: {
          'Profile Summary': diagnosis.category,
          'Health Status': diagnosis.healthStatus,
          'What Is Working Well': diagnosis.workingWell,
          'Where To Focus Next': diagnosis.opportunity,
          'Recommended Next Step': diagnosis.recommendation,
          'Selected Responses': answers.map((a, idx) => `Q${idx + 1}: ${a.label}`).join(' | '),
          'Strength Scores (Founder / Ops / Cash / People)': `${strengthScores.founder} / ${strengthScores.ops} / ${strengthScores.cash} / ${strengthScores.people}`,
          'Focus Scores (Founder / Ops / Cash / People)': `${scores.founder} / ${scores.ops} / ${scores.cash} / ${scores.people}`,
          'Recipients': `${cleanEmail}, ${TARGET_INBOX_EMAIL}`,
        }
      });
      setMailtoUrl(result.mailtoFallbackUrl);
      setDeliverySuccess(result.success);
      setDeliveryNotice(result.message);
      setReportSent(true);
    } finally {
      setIsSendingReport(false);
    }
  };

  const badgeClasses =
    diagnosis?.badgeTone === 'positive'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : diagnosis?.badgeTone === 'balanced'
      ? 'bg-white text-[#1896FA] border-blue-200'
      : 'bg-amber-50 text-amber-700 border-amber-200';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2.5">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#1896FA] uppercase tracking-wider block">
                60-Second Screener
              </span>
              <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#0A0F1D]">
                Operational Health & Bottleneck Check
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center font-semibold text-sm hover:bg-slate-100 transition-colors cursor-pointer text-slate-500"
          >
            <X className="w-4 h-4" weight="bold" />
          </button>
        </div>

        {!isCompleted ? (
          <div>
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-bold text-[#0A0F1D] mb-2 font-mono">
                <span>QUESTION 0{currentStep + 1} OF 0{SCREENER_QUESTIONS.length}</span>
                <span>{Math.round(((currentStep + 1) / SCREENER_QUESTIONS.length) * 100)}% COMPLETE</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1896FA] transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / SCREENER_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <h4 className="font-display font-extrabold text-base sm:text-lg text-[#0A0F1D] mb-5 leading-snug">
              {currentQ.question}
            </h4>

            {/* Options */}
            <div className="space-y-2.5 mb-8">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedOption(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    selectedOption === idx
                      ? 'border-[#1896FA] bg-blue-50/50 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                    selectedOption === idx ? 'border-[#1896FA] bg-[#1896FA]' : 'border-slate-300'
                  }`}>
                    {selectedOption === idx && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#0A0F1D] leading-relaxed">
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={handleReset}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <ArrowsClockwise className="w-3.5 h-3.5" weight="bold" />
                <span>Reset</span>
              </button>

              <button
                disabled={selectedOption === null}
                onClick={handleNext}
                className={`px-6 py-2.5 rounded-full font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                  selectedOption !== null
                    ? 'bg-[#0A0F1D] hover:bg-[#1896FA] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>{currentStep === SCREENER_QUESTIONS.length - 1 ? 'View Report' : 'Next Question'}</span>
                <ArrowRight className="w-3.5 h-3.5" weight="bold" />
              </button>
            </div>
          </div>
        ) : diagnosis ? (
          <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200">
              <span className="font-mono text-[10px] font-bold text-[#1896FA] uppercase tracking-wider block mb-1">
                OPERATIONAL HEALTH SNAPSHOT
              </span>
              <h4 className="font-display font-extrabold text-xl text-[#0A0F1D] mb-1.5">
                {diagnosis.category}
              </h4>
              <span className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold border ${badgeClasses}`}>
                {diagnosis.healthStatus}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-1.5">
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider block">
                What Is Working Well:
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                {diagnosis.workingWell}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
                Where To Focus Next:
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                {diagnosis.opportunity}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold text-[#1896FA] uppercase tracking-wider block">
                Recommended Path:
              </span>
              <p className="text-xs sm:text-sm text-[#0A0F1D] leading-relaxed font-bold bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                {diagnosis.recommendation}
              </p>
            </div>

            {/* Direct Email Dispatch of Diagnosis to both User & info@sabicoo.com */}
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200">
              <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
                <span className="text-xs font-bold text-[#021347]">
                  Send Report Copy to Your Email & Sabi COO:
                </span>
                <span className="text-[11px] font-mono font-bold text-[#1896FA]">info@sabicoo.com</span>
              </div>

              {!reportSent ? (
                <form onSubmit={handleSendDiagnosisEmail} className="flex gap-2">
                  <input
                    required
                    type="email"
                    placeholder="Enter your work email..."
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white rounded-xl border border-slate-300 text-xs font-semibold text-[#0A0F1D] focus:outline-none focus:border-[#1896FA]"
                  />
                  <button
                    type="submit"
                    disabled={isSendingReport}
                    className="px-4 py-2 bg-[#1896FA] hover:bg-blue-600 disabled:bg-slate-400 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1.5 shrink-0"
                  >
                    {isSendingReport ? (
                      <CircleNotch className="w-3.5 h-3.5 animate-spin" weight="bold" />
                    ) : (
                      <EnvelopeSimple className="w-3.5 h-3.5" weight="bold" />
                    )}
                    <span>Send Report</span>
                  </button>
                </form>
              ) : (
                <div className="space-y-2">
                  <div className={`text-xs font-bold bg-white p-2.5 rounded-xl border flex items-center gap-2 ${
                    deliverySuccess
                      ? 'text-green-700 border-green-200'
                      : 'text-amber-700 border-amber-200'
                  }`}>
                    <CheckCircle
                      className={`w-4 h-4 shrink-0 ${deliverySuccess ? 'text-green-600' : 'text-amber-600'}`}
                      weight="fill"
                    />
                    <span>{deliveryNotice}</span>
                  </div>
                  {mailtoUrl && (
                    <div className="flex items-center justify-between text-[11px] px-1">
                      <span className="text-slate-500 font-semibold">
                        Check your spam folder if not seen within a minute.
                      </span>
                      <a
                        href={mailtoUrl}
                        className="font-bold text-[#1896FA] hover:underline shrink-0 ml-2"
                      >
                        Open Email Copy
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <RollingButton
                variant="dark"
                size="md"
                onClick={() => {
                  onClose();
                  onBookWithDiagnosis(diagnosis.category);
                }}
                className="w-full"
              >
                Book Discovery Call with this Report
              </RollingButton>
              <button
                onClick={handleReset}
                className="px-4 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Retake
              </button>
            </div>
          </div>
        ) : null}

      </div>
    </div>
  );
};
