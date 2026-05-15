import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
// import { useGetMe } from "./Hooks/useGetMe";
// import Spinner from "./components/Spinner";
// import { Auth } from "./config/firebase.config";

// const Test = lazy(() => import("./Pages/Test").then((m) => ({default:m.Test})));
const Login = lazy(() => import("./Pages/Login"));
const Onboarding = lazy(() => import("./Pages/Onboarding"));
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "./config/firebase.config";

const App = () => {
  const [user] = useAuthState(Auth);

  return (
    <>
      <Toaster position="top-right" />

      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/on-boarding" />}
          />

          <Route
            path="/on-boarding"
            element={user ? <Onboarding /> : <Navigate to="/login" />}
          />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
