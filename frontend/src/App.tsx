import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import {
  AppLayout,
} from "./components/app-layout";

import {
  ProtectedRoute,
} from "./components/protected-route";

import {
  DashboardPage,
} from "./pages/dashboard-page";

import {
  LoginPage,
} from "./pages/login-page";

import {
  TransactionsPage,
} from "./pages/transactions-page";

import {
  ProductsPage,
} from "./pages/products-page";

import {
  UsersPage,
} from "./pages/users-page";

import {
  PaymentsPage,
} from "./pages/payments-page";

import {
  CartPage,
} from "./pages/cart-page";

export default function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/app"
          element={<AppLayout />}
        >
          <Route
            index
            element={<DashboardPage />}
          />

          <Route
            path="products"
            element={<ProductsPage />}
          />

          <Route
            path="users"
            element={<UsersPage />}
          />

          <Route
            path="payments"
            element={<PaymentsPage />}
          />

          <Route
            path="cart"
            element={<CartPage />}
          />

          <Route
            path="transactions"
            element={<TransactionsPage />}
          />
        </Route>
      </Route>

      <Route
        path="/"
        element={
          <Navigate
            to="/app"
            replace
          />
        }
      />

      <Route
        path="*"
        element={
          <Navigate
            to="/app"
            replace
          />
        }
      />
    </Routes>
  );
}