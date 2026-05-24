import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";

import { Auth } from "./config/firebase.config";
import { useGetMe } from "./Hooks/useGetMe";
import Spinner from "./components/Spinner";
import CommunityPage from "./Pages/SubPages/CommunityPage/CommunityPage";
import EventsPage from "./Pages/SubPages/Events/EventsPage";
import Profile from "./Pages/SubPages/Profile/Profile";

const Login = lazy(() => import("./Pages/Login"));
const Onboarding = lazy(() => import("./Pages/Onboarding"));
const Home = lazy(() => import("./Pages/Home"));
const Dashboard = lazy(
  () => import("./Pages/SubPages/dashboard/Dashboard")
);

const App = () => {
  const [user, authLoading] = useAuthState(Auth);

  const { data, isPending } = useGetMe();

  if (authLoading || (user && isPending)) {
    return <Spinner />;
  }

  return (
    <>
      <Toaster position="top-right" />

      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route
            path="/login"
            element={
              !user ? (
                <Login />
              ) : !data?.isProfileComplete ? (
                <Navigate to="/on-boarding" replace />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />

          <Route
            path="/on-boarding"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : data?.isProfileComplete ? (
                <Navigate to="/home" replace />
              ) : (
                <Onboarding />
              )
            }
          />

          <Route
            path="/home"
            element={
              user ? (
                data?.isProfileComplete ? (
                  <Home />
                ) : (
                  <Navigate to="/on-boarding" replace />
                )
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >
            <Route index element={<Dashboard />} />

            <Route
              path="community/:id"
              element={<CommunityPage />}
            />
            <Route
              path="events"
              element={<EventsPage />}
            />
            <Route
              path="profile"
              element={<Profile />}
            />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;