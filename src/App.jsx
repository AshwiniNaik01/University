// App.jsx
import "./App.css";
import { Suspense, lazy } from "react";
import AppRouters from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FullScreenLogoLoader from "./components/loaders/FullScreenLogoLoader";

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <AppRouters />
      </Suspense>

      {/* ToastContainer must be outside Suspense and mounted only once */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
export default App;
