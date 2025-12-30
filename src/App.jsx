import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AppRouters from "./routes/AppRouter";

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
