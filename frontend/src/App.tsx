import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";

import { Auth } from "./config/firebase.config";
import { useGetMe } from "./Hooks/useGetMe";
import Spinner from "./components/Spinner";

const Login = lazy(() => import("./Pages/Login"));
const Onboarding = lazy(() => import("./Pages/Onboarding"));
const Home = lazy(() => import("./Pages/Home"));
const Dashboard = lazy(() => import("./Pages/SubPages/dashboard/Dashboard"));

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
                <Navigate to="/on-boarding" />
              ) : (
                <Navigate to="/home" />
              )
            }
          />

          <Route
            path="/on-boarding"
            element={user ? <Onboarding /> : <Navigate to="/login" />}
          />
          
          <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />}>
            <Route index element={<Dashboard/>}/>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
