import React, { useState } from 'react';
import { SCREENER_QUESTIONS } from '../data/sabiData';
import { RollingButton } from './RollingButton';
import { Sparkle, ArrowRight, ArrowsClockwise, X } from '@phosphor-icons/react';

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
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

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
    setScores(newScores);
    setSelectedOption(null);

    if (currentStep < SCREENER_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const getDiagnosis = () => {
    const highest = Object.entries(scores).reduce((a, b) => (a[1] > b[1] ? a : b));
    switch (highest[0]) {
      case 'founder':
        return {
          category: 'Founder Bottleneck & Heroics Trap',
          severity: 'Critical Operational Friction',
          analysis:
            'Your business is held hostage by founder dependency. Decisions stall when you are not in the office, and the founder is working as the Chief Everything Officer rather than the visionary.',
          recommendation:
            'Tier 1 Sprint 02 (Fractional COO Embed): Tiered approval matrices, delegation protocols, and physical SOP playbooks to decouple founder time from daily revenue execution.'
        };
      case 'ops':
        return {
          category: 'Process Void & Operational Leakage',
          severity: 'Severe Workflow Drag',
          analysis:
            'Customer handoffs, fulfillment, and communications rely on memory rather than documented machinery. Cost of rework is silently eroding profit margins.',
          recommendation:
            'Tier 1 Sprint 01 & 02: End-to-end SOP construction, ERP software configuration, and live operational dashboards.'
        };
      case 'cash':
        return {
          category: 'Cash Velocity & Working Capital Lag',
          severity: 'Urgent Financial Choke',
          analysis:
            'Revenue is growing, but cash collection lags behind expenditure. Invoicing is delayed, receivable terms are loose, and there is no 13-week cash visibility.',
          recommendation:
            'Tier 1 Sprint 01 Diagnostic: 13-Week Cash Visibility Model, milestone-billing triggers, and working capital discipline.'
        };
      case 'people':
      default:
        return {
          category: 'Staff Accountability & Role Ambiguity',
          severity: 'Organizational Stagnation',
          analysis:
            'Employees wait to be told what to do each morning. There is no clear scorecard, and performance metrics are subjective rather than transparent.',
          recommendation:
            'Organisational Review & Accountability Matrix: Define clean role boundaries, performance metrics, and manager autonomy.'
        };
    }
  };

  const diagnosis = isCompleted ? getDiagnosis() : null;

  const handleReset = () => {
    setCurrentStep(0);
    setScores({ founder: 0, ops: 0, cash: 0, people: 0 });
    setSelectedOption(null);
    setIsCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1896FA] flex items-center justify-center font-bold">
              <Sparkle className="w-4 h-4 text-[#1896FA]" weight="fill" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#1896FA] uppercase tracking-wider block">
                Diagnostic Screener
              </span>
              <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#0A0F1D]">
                60-Second Bottleneck Audit
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
                <span>QUESTION 0{currentStep + 1} OF 04</span>
                <span>{Math.round(((currentStep + 1) / 4) * 100)}% COMPLETE</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1896FA] transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
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
                <span>{currentStep === 3 ? 'Generate Diagnosis' : 'Next Question'}</span>
                <ArrowRight className="w-3.5 h-3.5" weight="bold" />
              </button>
            </div>
          </div>
        ) : diagnosis ? (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200">
              <span className="font-mono text-[10px] font-bold text-[#1896FA] uppercase tracking-wider block mb-1">
                PRIMARY BOTTLENECK IDENTIFIED
              </span>
              <h4 className="font-display font-extrabold text-xl text-[#0A0F1D] mb-1">
                {diagnosis.category}
              </h4>
              <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-white text-red-600 border border-red-200">
                {diagnosis.severity}
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Forensic Diagnosis:
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                {diagnosis.analysis}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#1896FA] uppercase tracking-wider">
                Recommended Operator Intervention:
              </span>
              <p className="text-xs sm:text-sm text-[#0A0F1D] leading-relaxed font-bold bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                {diagnosis.recommendation}
              </p>
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
                Book Discovery Call with this Diagnosis
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
