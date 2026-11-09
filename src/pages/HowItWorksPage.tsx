import React, { useRef, useState, useEffect } from 'react';
import { CheckCircle } from 'iconoir-react';
import { RollingButton } from '../components/RollingButton';
import { FaqSection } from '../components/FaqSection';

interface HowItWorksPageProps {
  onNavigate: (page: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  const [activeStep, setActiveStep] = useState(0);

  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

  const scrollToCard = (ref: React.RefObject<HTMLDivElement | null>, stepIndex: number) => {
    setActiveStep(stepIndex);
    if (ref.current) {
      const yOffset = -100;
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current];
      const scrollPos = window.scrollY + window.innerHeight * 0.45;

      for (let i = cards.length - 1; i >= 0; i--) {
        const card = cards[i];
        if (card && card.offsetTop <= scrollPos) {
          setActiveStep(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full bg-[#FFFFFF] text-[#0A0F1D]">
      {/* Header */}
      <section className="pt-16 pb-20 bg-[#021347] text-white border-b border-[#0A1C40]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl uppercase tracking-tight text-white mb-3">
            How It Works
          </h1>

          <div className="text-sm sm:text-base text-[#1896FA] font-bold uppercase tracking-wider">
            A simple 4-step path: Intake → Diagnostic → Build → Hand Over.
          </div>
        </div>
      </section>

      {/* Sequential Operating Sequence with Sticky Stacking Cards */}
      <section className="py-20 sm:py-28 bg-[#F8FAFC] border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header & Sticky Controls */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="font-mono text-xs font-bold text-[#1896FA] uppercase tracking-widest block mb-2">
              OUR 4-STEP PROCESS
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#021347] leading-[1.12]">
              How We Organize Your Business
            </h2>
            <p className="mt-3 text-base sm:text-lg md:text-xl text-[#021347] leading-relaxed font-bold">
              We do not give you theoretical advice or useless 80-page slide decks. We come in, find out where your business is losing time and money, create simple step-by-step guides for your team, and train them until the company runs smoothly without you.
            </p>

            {/* Step Progress Indicators Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 max-w-2xl mx-auto">
              {[
                { title: "1. Listen & Checkup", ref: card1Ref },
                { title: "2. Find The Leaks", ref: card2Ref },
                { title: "3. Build & Train", ref: card3Ref },
                { title: "4. Handover & Freedom", ref: card4Ref }
              ].map((step, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToCard(step.ref, idx)}
                  className="text-left cursor-pointer group py-1"
                >
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        activeStep >= idx ? 'bg-[#1896FA] w-full' : 'w-0'
                      }`}
                    />
                  </div>
                  <span
                    className={`text-[11px] sm:text-xs font-bold mt-1.5 block transition-colors ${
                      activeStep === idx ? 'text-[#1896FA]' : 'text-[#021347] opacity-70'
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Physical Sticky Stacking Cards Container */}
          <div className="relative pb-24 sm:pb-36">

            {/* Card 1: Step 01 Intake & Assessment */}
            <div
              ref={card1Ref}
              className="sticky top-24 sm:top-28 z-10 pb-[25vh] sm:pb-[35vh]"
            >
              <div className="bg-white text-[#021347] rounded-3xl p-6 sm:p-9 md:p-11 border-2 border-gray-300/80 shadow-2xl transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-gray-200 mb-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-extrabold text-white bg-[#1896FA] px-2.5 py-1 rounded-md">
                      STEP 01
                    </span>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[#021347]">
                      Getting To Know Your Business
                    </h3>
                  </div>
                  <div className="font-bold text-sm sm:text-base text-[#1896FA] shrink-0 uppercase tracking-wider">
                    Business Intake & Discovery
                  </div>
                </div>

                <div className="space-y-4 text-base sm:text-lg md:text-xl leading-relaxed font-bold text-[#021347] mb-6">
                  <p>
                    Before we can help improve your business, we need to understand it. We start by getting to know your business, how it operates, what it offers, who it serves, and what you’re looking to achieve.
                  </p>
                  <p>
                    We gather the essential information about your business, its structure, team, products or services, existing processes, and current challenges. We also establish your expectations, priorities, and what success looks like for you.
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                    What We Deliver In This Step:
                  </span>
                  {[
                    "An understanding of your business goals, immediate priorities, expectations, and the challenges you want to address.",
                    "A collection of relevant business information, documents, records, and existing systems needed for the engagement.",
                    "An agreed scope of work, engagement objectives, timelines, and expectations for the process ahead."
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#1896FA] shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base font-bold leading-snug text-[#021347]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl font-bold text-sm sm:text-base bg-blue-50 text-[#021347] border border-blue-200">
                  STEP 1 RESULT: A clear understanding of your business, its needs, and what we will be working towards together.
                </div>
              </div>
            </div>

            {/* Card 2: Step 02 Forensic Diagnostic */}
            <div
              ref={card2Ref}
              className="sticky top-28 sm:top-36 z-20 pb-[25vh] sm:pb-[35vh]"
            >
              <div className="bg-[#F8FAFC] text-[#021347] rounded-3xl p-6 sm:p-9 md:p-11 border-2 border-gray-300 shadow-[0_25px_60px_-15px_rgba(2,19,71,0.25)] transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-gray-200 mb-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-extrabold text-white bg-[#1896FA] px-2.5 py-1 rounded-md">
                      STEP 02
                    </span>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[#021347]">
                      Understanding How Your Business Really Works
                    </h3>
                  </div>
                  <div className="font-bold text-sm sm:text-base text-[#1896FA] shrink-0 uppercase tracking-wider">
                    Business Diagnostic & Mapping
                  </div>
                </div>

                <div className="space-y-4 text-base sm:text-lg md:text-xl leading-relaxed font-bold text-[#021347] mb-6">
                  <p>
                    Now that we understand your business, it’s time to look beneath the surface.
                  </p>
                  <p>
                    We take a closer look at how different parts of your business function, from daily operations and internal processes to people management, sales, customer experience, financial management, and the systems that hold everything together.
                  </p>
                  <p>
                    We examine how work gets done, how decisions are made, where resources are being wasted, and where things break down. We identify inefficiencies, operational gaps, recurring challenges, and the root causes behind them, not just the symptoms.
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                    What We Deliver In This Step:
                  </span>
                  {[
                    "A comprehensive assessment of your business operations, highlighting what’s working, what’s not, and where improvements are needed.",
                    "A clear map of your key business processes, workflows, responsibilities, and the areas where bottlenecks or inefficiencies occur.",
                    "Identification of operational gaps, resource constraints, risks, and opportunities for improvement across the business.",
                    "A prioritised action plan outlining what needs to be fixed, improved, streamlined, or automated, and where to start."
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#1896FA] shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base font-bold leading-snug text-[#021347]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl font-bold text-sm sm:text-base bg-blue-50 text-[#021347] border border-blue-200">
                  STEP 2 RESULT: A clear picture of your business’s current state, the problems holding it back, and a prioritised roadmap for making things better.
                </div>
              </div>
            </div>

            {/* Card 3: Step 03 Active Operator Build */}
            <div
              ref={card3Ref}
              className="sticky top-32 sm:top-44 z-30 pb-[25vh] sm:pb-[35vh]"
            >
              <div className="bg-white text-[#021347] rounded-3xl p-6 sm:p-9 md:p-11 border-2 border-gray-300 shadow-[0_30px_65px_-15px_rgba(2,19,71,0.3)] transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-gray-200 mb-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-extrabold text-white bg-[#1896FA] px-2.5 py-1 rounded-md">
                      STEP 03
                    </span>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[#021347]">
                      Building Your Daily Systems & Tools
                    </h3>
                  </div>
                  <div className="font-bold text-sm sm:text-base text-[#1896FA] shrink-0 uppercase tracking-wider">
                    Hands-On Execution
                  </div>
                </div>

                <p className="text-base sm:text-lg md:text-xl leading-relaxed font-bold text-[#021347] mb-6">
                  We work side-by-side with your staff to write clear, step-by-step checklists (SOPs), set up easy digital tools on their phones or computers, and make sure everyone knows their exact daily duties.
                </p>

                <div className="space-y-3 mb-6">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                    What We Deliver In This Step:
                  </span>
                  {[
                    "Standard Operating Procedures (simple step-by-step checklists and short videos) written directly with your staff",
                    "A simple dashboard on your phone or laptop showing daily sales, money in the bank, and pending orders at a glance",
                    "Clear job scorecards for every staff member so everyone knows their exact duties, targets, and who is responsible for what"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#1896FA] shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base font-bold leading-snug text-[#021347]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl font-bold text-sm sm:text-base bg-blue-50 text-[#021347] border border-blue-200">
                  STEP 3 RESULT: Your team now has clear written guides, simple tools, and zero confusion about how to do their jobs without asking you.
                </div>
              </div>
            </div>

            {/* Card 4: Step 04 Autonomous Handover (The Master Finale Card) */}
            <div
              ref={card4Ref}
              className="sticky top-36 sm:top-52 z-40"
            >
              <div className="bg-[#021347] text-white rounded-3xl p-6 sm:p-9 md:p-11 border-2 border-[#1896FA] shadow-[0_35px_70px_-15px_rgba(24,150,250,0.35)] transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-white/20 mb-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-extrabold text-[#021347] bg-[#38BDF8] px-2.5 py-1 rounded-md">
                      STEP 04
                    </span>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-white">
                      Running Without You (Your Freedom Handover)
                    </h3>
                  </div>
                  <div className="font-bold text-sm sm:text-base text-[#38BDF8] shrink-0 uppercase tracking-wider">
                    Independence & Scale
                  </div>
                </div>

                <p className="text-base sm:text-lg md:text-xl leading-relaxed font-bold text-white/95 mb-6">
                  We put your new systems to the real test. You take a step back, and we watch your team run the daily business completely on their own. When questions come up, the checklists answer them—not your personal phone.
                </p>

                <div className="space-y-3 mb-6">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    What We Deliver In This Step:
                  </span>
                  {[
                    "A real-world test where the business runs for a full week without you answering operational questions",
                    "Staff training tests to make sure every team member can execute their role independently and reliably",
                    "A final review of your operations and an optional monthly check-in plan to keep things running sharp"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#1896FA] shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base font-bold leading-snug text-white/95">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="p-3.5 rounded-xl font-bold text-sm sm:text-base bg-white/10 text-[#38BDF8] border border-white/20 w-full sm:w-auto">
                    FINAL RESULT: You can take a 2-week vacation, turn off your work phone, and return to find your business running smoothly and making money.
                  </div>

                  <RollingButton
                    variant="blue"
                    size="lg"
                    onClick={() => onNavigate('contact')}
                    className="w-full sm:w-auto px-8 py-3.5 shadow-xl shadow-[#1896FA]/30"
                  >
                    Book a Discovery Call
                  </RollingButton>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Replicated Homepage FAQ Section */}
      <FaqSection
        onOpenContact={() => onNavigate('contact')}
      />

      {/* Bottom CTA */}
      <section className="py-16 sm:py-20 bg-[#021347] text-white border-t border-[#0A1C40]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
            Ready to Stop Putting Out Fires Every Day?
          </h3>
          <p className="text-white/80 max-w-xl mx-auto mb-8 text-base sm:text-lg font-bold">
            Book a 30-minute chat with our senior operators. We will listen to your daily challenges and show you the exact steps to organize your business so it runs without you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <RollingButton
              variant="blue"
              size="lg"
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-8 py-3.5 shadow-xl shadow-blue-500/25"
            >
              Book a 30-Min Call
            </RollingButton>
            <button
              onClick={() => onNavigate('services')}
              className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white hover:text-[#021347] text-white font-bold text-xs uppercase tracking-wider rounded-full border border-white/20 transition-all cursor-pointer"
            >
              Explore Our Services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

