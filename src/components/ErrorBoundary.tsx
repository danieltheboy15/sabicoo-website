import { ReactNode, Component, ErrorInfo } from 'react';
import { getQuotaUpgradeUrl, isQuotaExceededError } from '../firebase';

interface ErrorBoundaryProps {
  children: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
  isQuotaError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      message: '',
      isQuotaError: false
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    let readable = error.message || 'An unexpected error occurred.';
    try {
      const parsed = JSON.parse(error.message);
      if (parsed && typeof parsed.error === 'string') {
        readable = `${parsed.error}${parsed.path ? ` (${parsed.operationType} on ${parsed.path})` : ''}`;
      }
    } catch {
      // keep original message
    }

    return {
      hasError: true,
      message: readable,
      isQuotaError: isQuotaExceededError(error)
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Portal ErrorBoundary caught error:', error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, message: '', isQuotaError: false });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] bg-[#F8FAFC] py-16 px-4 flex items-center justify-center">
          <div className="max-w-lg w-full bg-white rounded-3xl border border-gray-200 p-8 shadow-sm space-y-5">
            <h2 className="font-display font-bold text-2xl text-[#021347]">
              Unable to complete workspace action
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed break-words">
              {this.state.isQuotaError
                ? 'Daily Firestore free-tier read/write quota has been reached. Quota resets tomorrow, or you can upgrade the database plan in Firebase.'
                : this.state.message}
            </p>
            {this.state.isQuotaError && (
              <p className="text-xs text-slate-500 break-all">
                Database console: {getQuotaUpgradeUrl()}
              </p>
            )}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleRetry}
                className="px-5 py-2.5 rounded-full bg-[#021347] text-white text-xs sm:text-sm font-bold hover:bg-[#0A2463] transition-colors cursor-pointer"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
