import { Suspense } from 'react';
import { BrowserRouter } from 'react-router';
import AppRoutes from '@app/routes';
import ErrorBoundary from '@containers/ErrorBoundary';

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
          <AppRoutes />
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
