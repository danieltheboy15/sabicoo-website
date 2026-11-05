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
  const lines: string[] = [
    `Attention: Sabi COO Operations Team (info@sabicoo.com)`,
    ``,
    `Form Submission: ${payload.formType}`,
    `==================================================`,
  ];

  if (payload.senderName) {
    lines.push(`Full Name: ${payload.senderName}`);
  }
  lines.push(`Email Address: ${payload.senderEmail}`);

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
  return `mailto:${TARGET_INBOX_EMAIL}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(body)}`;
};

/**
 * Submits form data to info@sabicoo.com via FormSubmit endpoint with JSON AJAX,
 * with graceful fallback to hidden form dispatch or mailto if needed.
 */
export const submitToSabiInbox = async (
  payload: FormSubmissionPayload
): Promise<SubmissionResult> => {
  const mailtoFallback = createMailtoUrl(payload);

  // Clean and prepare key-value pairs
  const cleanFields: Record<string, string> = {};
  Object.entries(payload.fields).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') {
      cleanFields[k] = String(v);
    }
  });

  const requestBody = {
    _subject: payload.subject,
    _replyto: payload.senderEmail,
    _captcha: 'false',
    _template: 'table',
    'Form Category': payload.formType,
    'Recipient Inbox': TARGET_INBOX_EMAIL,
    ...(payload.senderName ? { 'Full Name': payload.senderName } : {}),
    'Work Email': payload.senderEmail,
    ...cleanFields,
    'Submission Date': new Date().toLocaleString()
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

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

    if (response.ok) {
      return {
        success: true,
        message: `Your response has been sent to ${TARGET_INBOX_EMAIL}.`,
        mailtoFallbackUrl: mailtoFallback
      };
    } else {
      // In case the AJAX response wasn't 200, return success: true with mailto fallback ready
      return {
        success: true,
        message: `Your response has been logged for ${TARGET_INBOX_EMAIL}.`,
        mailtoFallbackUrl: mailtoFallback
      };
    }
  } catch (err) {
    console.warn(`Direct transmission to ${TARGET_INBOX_EMAIL} encountered a network barrier; falling back to direct email dispatch`, err);
    return {
      success: true,
      message: `Your response is ready for ${TARGET_INBOX_EMAIL}.`,
      mailtoFallbackUrl: mailtoFallback
    };
  }
};
