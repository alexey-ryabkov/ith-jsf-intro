import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { APP_ROUTES } from '@app/constants';

const MainPage = lazy(() => import('@pages/Main'));
const CategoriesPage = lazy(() => import('@pages/Categories'));
const CategoryPage = lazy(() => import('@pages/Category'));
const ProductsPage = lazy(() => import('@pages/Products'));
const ProductDetailsPage = lazy(() => import('@pages/ProductDetails'));
const SalesPage = lazy(() => import('@pages/Sales'));
const CartPage = lazy(() => import('@pages/Cart'));
const Error404Page = lazy(() => import('@pages/Error404'));

const AppRoutes = () => (
  <Routes>
    <Route index element={<MainPage />} />
    <Route path={APP_ROUTES.CATEGORIES}>
      <Route index element={<CategoriesPage />} />
      <Route path=":id" element={<CategoryPage />} />
    </Route>
    <Route path={APP_ROUTES.PRODUCTS}>
      <Route index element={<ProductsPage />} />
      <Route path=":id" element={<ProductDetailsPage />} />
    </Route>
    <Route path={APP_ROUTES.SALES} element={<SalesPage />} />
    <Route path={APP_ROUTES.CART} element={<CartPage />} />
    <Route path={APP_ROUTES.UNKNOWN} element={<Error404Page />} />
    <Route path="*" element={<Navigate to={APP_ROUTES.UNKNOWN} />} />
  </Routes>
);
export default AppRoutes;
