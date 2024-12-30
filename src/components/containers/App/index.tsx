import { Suspense } from 'react';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import ErrorBoundary from '@containers/ErrorBoundary';
import AppRoutes from '@app/routes';
import { store } from '@app/store';
import Notifier from '@components/Notifier';
import Preloader from '@ui/Preloader';

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<Preloader className="fixed inset-0 bg-white" />}>
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
