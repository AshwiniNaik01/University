// App.jsx
import './App.css';
import { Suspense, lazy } from 'react';

import AppRouters from './routes/AppRouter';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FullScreenLogoLoader from './components/loaders/FullScreenLogoLoader';

// Example of lazy-loaded component
// const Card = lazy(() => import('./Card'));

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AppRouters />
             <ToastContainer position="top-right" autoClose={3000} />
        </Suspense>
    );
}

export default App;
