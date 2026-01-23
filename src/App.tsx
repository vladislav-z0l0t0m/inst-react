import { Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { JSX } from "react";
import { queryClient } from "./api/queryClient";
import { AppRoutes } from "./constants";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import { RequireAuth } from "./components/RequireAuth";

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Routes>
        <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
        <Route path={AppRoutes.REGISTER} element={<RegisterPage />} />

        <Route element={<MainLayout />}>
          <Route path={AppRoutes.HOME} element={<HomePage />} />
          <Route element={<RequireAuth />}>
            <Route path={AppRoutes.PROFILE} element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
