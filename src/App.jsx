// App.jsx
import './App.css';
import { Suspense, lazy } from 'react';

import AppRouters from './routes/AppRouter';

// Example of lazy-loaded component
// const Card = lazy(() => import('./Card'));

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AppRouters />
        </Suspense>
    );
}

export default App;
