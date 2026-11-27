export type ScreenerTriggerSource =
  | 'auto_popup'
  | 'hero'
  | 'how_it_works'
  | 'home_cta'
  | 'insights_page'
  | 'footer'
  | 'floating_button'
  | 'navbar';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA4_MEASUREMENT_ID = 'G-JWY03G3JN9';

function sendGtagEvent(
  eventName: string,
  params: Record<string, string | number | boolean>
) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  } else {
    window.dataLayer.push(['event', eventName, params]);
  }
}

export function trackScreenerOpened(
  triggerSource: ScreenerTriggerSource,
  pageName: string
) {
  sendGtagEvent('screener_opened', {
    trigger_source: triggerSource,
    page_name: pageName,
    send_to: GA4_MEASUREMENT_ID
  });
}

export function trackScreenerQuestionAnswered(params: {
  questionNumber: number;
  questionId: string | number;
  questionText: string;
  selectedOption: string;
  optionTone: 'positive' | 'balanced' | 'challenge';
}) {
  sendGtagEvent('screener_question_answered', {
    question_number: params.questionNumber,
    question_id: params.questionId,
    question_text: params.questionText.slice(0, 100),
    selected_option: params.selectedOption.slice(0, 100),
    option_tone: params.optionTone,
    send_to: GA4_MEASUREMENT_ID
  });
}

export function trackScreenerCompleted(params: {
  diagnosisCategory: string;
  healthStatus: string;
  badgeTone: 'positive' | 'balanced' | 'focus';
  totalQuestions: number;
}) {
  sendGtagEvent('screener_completed', {
    diagnosis_category: params.diagnosisCategory,
    health_status: params.healthStatus,
    badge_tone: params.badgeTone,
    total_questions: params.totalQuestions,
    send_to: GA4_MEASUREMENT_ID
  });
}

export function trackScreenerReportEmailSent(params: {
  diagnosisCategory: string;
  deliverySuccess: boolean;
}) {
  sendGtagEvent('screener_report_email_sent', {
    diagnosis_category: params.diagnosisCategory,
    delivery_success: params.deliverySuccess,
    send_to: GA4_MEASUREMENT_ID
  });
}

export function trackScreenerBookCallClicked(params: {
  diagnosisCategory: string;
  healthStatus: string;
}) {
  sendGtagEvent('screener_book_call_clicked', {
    diagnosis_category: params.diagnosisCategory,
    health_status: params.healthStatus,
    send_to: GA4_MEASUREMENT_ID
  });
}

export function trackScreenerRetake(params: {
  fromCompleted: boolean;
  stepNumber: number;
}) {
  sendGtagEvent('screener_retake', {
    from_completed: params.fromCompleted,
    step_number: params.stepNumber,
    send_to: GA4_MEASUREMENT_ID
  });
}

export function trackScreenerClosed(params: {
  completed: boolean;
  lastQuestionNumber: number;
  reportEmailed: boolean;
}) {
  sendGtagEvent('screener_closed', {
    completed: params.completed,
    last_question_number: params.lastQuestionNumber,
    report_emailed: params.reportEmailed,
    send_to: GA4_MEASUREMENT_ID
  });
}
