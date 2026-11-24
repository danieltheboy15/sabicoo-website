/**
 * Centralized Mail & Form Submission Service for Sabi COO
 * Ensures all form submissions and inquiries are reliably routed to info@sabicoo.com
 */

export const TARGET_INBOX_EMAIL = 'info@sabicoo.com';

export interface FormSubmissionPayload {
  formType: string;
  subject: string;
  senderName?: string;
  senderEmail: string;
  ccSender?: boolean;
  fields: Record<string, string | number | undefined | null>;
}

export interface SubmissionResult {
  success: boolean;
  message: string;
  mailtoFallbackUrl: string;
}

/**
 * Builds a formatted mailto URL as a universal zero-failure fallback
 */
export const createMailtoUrl = (payload: FormSubmissionPayload): string => {
  const cleanSenderEmail = payload.senderEmail.trim();
  const lines: string[] = [
    `Attention: Sabi COO Operations Team (info@sabicoo.com)`,
    ``,
    `Form Submission: ${payload.formType}`,
    `==================================================`,
  ];

  if (payload.senderName) {
    lines.push(`Full Name: ${payload.senderName}`);
  }
  lines.push(`Email Address: ${cleanSenderEmail}`);

  Object.entries(payload.fields).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== '') {
      lines.push(`${key}: ${val}`);
    }
  });

  lines.push(`==================================================`);
  lines.push(`Submission Timestamp: ${new Date().toLocaleString()}`);
  lines.push(`Target Destination: ${TARGET_INBOX_EMAIL}`);
  lines.push(``);
  lines.push(`We look forward to connecting with the Sabi COO operator team.`);

  const body = lines.join('\n');
  const shouldCc =
    Boolean(payload.ccSender) &&
    cleanSenderEmail.length > 0 &&
    cleanSenderEmail.toLowerCase() !== TARGET_INBOX_EMAIL.toLowerCase();

  const ccParam = shouldCc ? `cc=${encodeURIComponent(cleanSenderEmail)}&` : '';
  return `mailto:${TARGET_INBOX_EMAIL}?${ccParam}subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(body)}`;
};

/**
 * Submits form data to info@sabicoo.com via FormSubmit AJAX endpoint,
 * carbon-copying the sender via _cc when requested for dual-inbox delivery.
 */
export const submitToSabiInbox = async (
  payload: FormSubmissionPayload
): Promise<SubmissionResult> => {
  const cleanSenderEmail = payload.senderEmail.trim();
  const mailtoFallback = createMailtoUrl(payload);

  // Clean and prepare key-value pairs
  const cleanFields: Record<string, string> = {};
  Object.entries(payload.fields).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') {
      cleanFields[k] = String(v);
    }
  });

  const shouldCcSender =
    Boolean(payload.ccSender) &&
    cleanSenderEmail.length > 0 &&
    cleanSenderEmail.toLowerCase() !== TARGET_INBOX_EMAIL.toLowerCase();

  const requestBody: Record<string, string> = {
    _subject: payload.subject,
    _replyto: cleanSenderEmail,
    _captcha: 'false',
    _template: 'table',
    ...(shouldCcSender ? { _cc: cleanSenderEmail } : {}),
    'Form Category': payload.formType,
    'Recipient Inbox': TARGET_INBOX_EMAIL,
    ...(payload.senderName ? { 'Full Name': payload.senderName } : {}),
    email: cleanSenderEmail,
    ...cleanFields,
    'Submission Date': new Date().toLocaleString()
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(`https://formsubmit.co/ajax/${TARGET_INBOX_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const data = await response.json().catch(() => null);
    const accepted =
      response.ok &&
      data?.success !== false &&
      data?.success !== 'false';

    if (accepted) {
      return {
        success: true,
        message: shouldCcSender
          ? `Report dispatched to ${cleanSenderEmail} and ${TARGET_INBOX_EMAIL}.`
          : `Your response has been sent to ${TARGET_INBOX_EMAIL}.`,
        mailtoFallbackUrl: mailtoFallback
      };
    }

    return {
      success: false,
      message:
        data?.message ||
        `Direct delivery could not be verified. Please use the email copy link below.`,
      mailtoFallbackUrl: mailtoFallback
    };
  } catch (err) {
    console.warn(`Direct transmission to ${TARGET_INBOX_EMAIL} encountered a network barrier; falling back to direct email dispatch`, err);
    return {
      success: false,
      message: `Network issue while dispatching. Use the email copy button below to send directly.`,
      mailtoFallbackUrl: mailtoFallback
    };
  }
};
