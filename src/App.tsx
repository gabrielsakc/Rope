import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Splash } from './pages/Splash';
import { Onboarding } from './pages/Onboarding';
import { Login } from './pages/Login';
import { SetupProfile } from './pages/SetupProfile';
import { Home } from './pages/Home';
import { Health } from './pages/Health';
import { Tracking } from './pages/Tracking';
import { Store } from './pages/Store';
import { Profile } from './pages/Profile';
import { Vets } from './pages/Vets';
import { BottomNav } from './components/BottomNav';
import { UserProvider } from './contexts/UserContext';

function AppContent() {
  const [step, setStep] = useState<'splash' | 'onboarding' | 'login' | 'setup' | 'app'>(() => {
    return (localStorage.getItem('dogsfeels_step') as any) || 'splash';
  });

  const updateStep = (newStep: 'splash' | 'onboarding' | 'login' | 'setup' | 'app') => {
    localStorage.setItem('dogsfeels_step', newStep);
    setStep(newStep);
  };

  const handleSplashComplete = () => updateStep('login');
  const handleOnboardingComplete = () => updateStep('login');
  const handleLogin = () => updateStep('setup');
  const handleSetupComplete = () => updateStep('app');

  return (
    <Router>
      <AnimatePresence mode="wait">
        {step === 'splash' && <Splash onComplete={handleSplashComplete} />}
        {step === 'onboarding' && <Onboarding onComplete={handleOnboardingComplete} />}
        {step === 'login' && <Login onLogin={handleLogin} />}
        {step === 'setup' && <SetupProfile onComplete={handleSetupComplete} />}
        {step === 'app' && (
          <div key="app" className="min-h-screen bg-background">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/health" element={<Health />} />
              <Route path="/tracking" element={<Tracking />} />
              <Route path="/store" element={<Store />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/vets" element={<Vets />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
            <BottomNav />
          </div>
        )}
      </AnimatePresence>
    </Router>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}
