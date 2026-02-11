import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './components/ui/Toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Authorize from './pages/Authorize';
import Admin from './pages/Admin';
import FAQ from './pages/FAQ';
import Partners from './pages/Partners';
import Blog from './pages/Blog';
import DocsOAuth from './pages/DocsOAuth';
import DocsSelfHosting from './pages/DocsSelfHosting';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

const WireframeBackground = lazy(() => import('./components/ui/WireframeBackground'));

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <div className="min-h-screen flex flex-col bg-surface-50 dark:bg-[#0f1117] transition-colors duration-300">
            <Suspense fallback={null}>
              <WireframeBackground />
            </Suspense>
            <Navbar />
            <main className="flex-1 relative z-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/authorize" element={<Authorize />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/partners" element={<Partners />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/docs/oauth" element={<DocsOAuth />} />
                <Route path="/docs/self-hosting" element={<DocsSelfHosting />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
