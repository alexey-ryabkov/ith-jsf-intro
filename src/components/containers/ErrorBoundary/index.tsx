import { Component, ErrorInfo, PropsWithChildren } from 'react';
import { APP_ROUTES } from '@app/constants';
import TitleBox from '@ui/TitleBox';
import TitleBoxProps from '@ui/TitleBox/types';

type ErrorBoundaryProps = {
  desc?: string;
  size?: TitleBoxProps['level'];
};
type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught in ErrorBoundary');
    console.dir(error);
    console.dir(errorInfo);
  }

  componentDidMount() {
    window.addEventListener('error', this.handleError);
    window.addEventListener('unhandledrejection', this.handlePromiseRejection);
  }

  componentWillUnmount() {
    window.removeEventListener('error', this.handleError);
    window.removeEventListener(
      'unhandledrejection',
      this.handlePromiseRejection,
    );
  }

  handleError = (event: ErrorEvent) => {
    event.preventDefault();
    this.setState({ hasError: true });
    console.error('Global error caught in ErrorBoundary');
    console.dir(event.error);
  };

  handlePromiseRejection = (event: PromiseRejectionEvent) => {
    event.preventDefault();
    this.setState({ hasError: true });
    console.error('Unhandled promise rejection caught in ErrorBoundary');
    console.dir(event.reason);
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 flex items-center justify-center text-base-b px-step-5">
          <div>
            <TitleBox level={this.props.size ?? 2} className="!block">
              {this.props.desc ?? 'Oops, something went wrong...'}
            </TitleBox>
            <div className="flex justify-center space-x-step-2">
              <a href={APP_ROUTES.MAIN} className="btn">
                Go Home
              </a>
              <button
                onClick={() => window.location.reload()}
                className="btn-alternative"
              >
                Try to Reload
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
