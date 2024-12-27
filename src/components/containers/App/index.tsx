import { Suspense } from 'react';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import ErrorBoundary from '@containers/ErrorBoundary';
import AppRoutes from '@app/routes';
import { store } from '@app/store';
import Notifier from '@components/Notifier';

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="fixed inset-0 flex items-center justify-center text-base-b">
              Loading...
            </div>
          }
        >
          <Provider store={store}>
            <AppRoutes />
            <Notifier />
          </Provider>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
