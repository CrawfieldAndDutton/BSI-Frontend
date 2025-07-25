import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Users from "./pages/users/Users";
import Customers from "./pages/customers/Customers";
import CustomerProfile from "./pages/customers/CustomerProfile";
import CustomerAnalysis from "./pages/customers/CustomerAnalysis";
import Monitoring from "./pages/monitoring/Monitoring";
import IndividualSignals from "./pages/monitoring/IndividualSignals";
import Recovery from "./pages/recovery/Recovery";
import CallHistory from "./pages/recovery/CallHistory";
import Notifications from "./pages/notifications/Notifications";
import NotFound from "./pages/NotFound";
import { MainLayout } from "./components/layout/MainLayout";
import Settings from "./pages/settings/Settings";

// Bank Statement Intelligence Journey
import BankStatementIndex from "./pages/bank-statement/BankStatementIndex";
import SubmitDetails from "./pages/bank-statement/SubmitDetails";
import AccountDiscovery from "./pages/bank-statement/AccountDiscovery";
import Consent from "./pages/bank-statement/Consent";
import ThankYou from "./pages/bank-statement/ThankYou";

// Credit Report Journey
import CreditReportConsent from "./pages/credit-report/CreditReportConsent";
import { Provider } from "react-redux";
import store from "./store/store";
import PrivateRoute from "./routes/PrivateRoute";
import { useEffect } from "react";
import { authApi } from "./apis/modules/auth";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const tokenExpiry = localStorage.getItem("tokenExpiry");
    const refreshToken = localStorage.getItem("refreshToken");
    const interval = setInterval(() => {
      console.log("Running every 5 seconds", tokenExpiry, refreshToken);
      if (refreshToken) {
        const expiryTime = new Date(tokenExpiry);
        const now = new Date();
        const diffInMs = Number(expiryTime) - Number(now);
        const diffInMinutes = diffInMs / 1000 / 60;
        console.log(diffInMinutes);
        if (diffInMinutes < 10) {
          const refreshApi = async () => {
            try {
              const response = await authApi.refresh(refreshToken);
            } catch (error) {
              console.error("Error during token refresh:", error);
            }
          };
        }
      }
    }, 100000);

    return () => clearInterval(interval);
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />

              {/* All routes are now accessible without authentication */}
              <Route element={<PrivateRoute />}>
                <Route
                  path="/dashboard"
                  element={
                    <MainLayout>
                      <Dashboard />
                    </MainLayout>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <MainLayout>
                      <Users />
                    </MainLayout>
                  }
                />
                <Route
                  path="/customers"
                  element={
                    <MainLayout>
                      <Customers />
                    </MainLayout>
                  }
                />
                <Route
                  path="/customers/:id"
                  element={
                    <MainLayout>
                      <CustomerProfile />
                    </MainLayout>
                  }
                />
                <Route
                  path="/customers/:id/analysis"
                  element={
                    <MainLayout>
                      <CustomerAnalysis />
                    </MainLayout>
                  }
                />
                <Route
                  path="/monitoring"
                  element={
                    <MainLayout>
                      <Monitoring />
                    </MainLayout>
                  }
                />
                <Route
                  path="/monitoring/signals"
                  element={
                    <MainLayout>
                      <IndividualSignals />
                    </MainLayout>
                  }
                />
                <Route
                  path="/monitoring/signals/:id"
                  element={
                    <MainLayout>
                      <IndividualSignals />
                    </MainLayout>
                  }
                />
                <Route
                  path="/recovery"
                  element={
                    <MainLayout>
                      <Recovery />
                    </MainLayout>
                  }
                />
                <Route
                  path="/recovery/history/:id"
                  element={
                    <MainLayout>
                      <CallHistory />
                    </MainLayout>
                  }
                />
                <Route
                  path="/notifications"
                  element={
                    <MainLayout>
                      <Notifications />
                    </MainLayout>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <MainLayout>
                      <Settings />
                    </MainLayout>
                  }
                />

                {/* Bank Statement Intelligence Journey */}
                <Route
                  path="/bank-statement"
                  element={<BankStatementIndex />}
                />
                <Route
                  path="/bank-statement/submit-details"
                  element={<SubmitDetails />}
                />
                <Route
                  path="/bank-statement/account-discovery"
                  element={<AccountDiscovery />}
                />
                <Route path="/bank-statement/consent" element={<Consent />} />
                <Route
                  path="/bank-statement/thank-you"
                  element={<ThankYou />}
                />

                {/* Credit Report Journey */}
                <Route
                  path="/credit-report/consent"
                  element={<CreditReportConsent />}
                />

                {/* Redirect root to dashboard */}
                <Route
                  path="/"
                  element={
                    <MainLayout>
                      <Dashboard />
                    </MainLayout>
                  }
                />

                {/* 404 Not Found */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
