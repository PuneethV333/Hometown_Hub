import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Test = lazy(() => import("./Pages/Test").then((m) => ({default:m.Test})));

const App = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route path="/test" element={<Test />} />
      </Routes>
    </Suspense>
  );
};

export default App;