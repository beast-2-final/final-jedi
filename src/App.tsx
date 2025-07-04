import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';
import Header from './components/Layout/Header';
import Navigation from './components/Layout/Navigation';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Upload from './pages/Upload';
import Skills from './pages/Skills';
import Courses from './pages/Courses';
import Quiz from './pages/Quiz';
import Progress from './pages/Progress';

const queryClient = new QueryClient();

function AppContent() {
  const { user, loading } = useAuth();
  const { theme } = useTheme();

  // Show loading spinner with timeout fallback
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'space-bg' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 ${
            theme === 'dark' ? 'border-blue-400' : 'border-indigo-500'
          }`}></div>
          <p className={`text-sm ${theme === 'dark' ? 'text-blue-200 share-tech' : 'text-gray-600'}`}>
            Loading your Jedi training...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className={`min-h-screen ${theme === 'dark' ? 'space-bg' : 'bg-gray-50'}`}>
        <Header />
        {user && <Navigation />}
        
        <main className={user ? 'ml-64' : ''}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={
              user ? <Navigate to="/" replace /> : <Auth />
            } />
            <Route path="/upload" element={
              user ? <Upload /> : <Navigate to="/auth" replace />
            } />
            <Route path="/courses" element={
              user ? <Courses /> : <Navigate to="/auth" replace />
            } />
            <Route path="/quiz/:courseId" element={
              user ? <Quiz /> : <Navigate to="/auth" replace />
            } />
            <Route path="/skills" element={
              user ? <Skills /> : <Navigate to="/auth" replace />
            } />
            <Route path="/progress" element={
              user ? <Progress /> : <Navigate to="/auth" replace />
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: theme === 'dark' ? {
              background: 'linear-gradient(135deg, #1e293b, #334155)',
              color: '#e2e8f0',
              border: '1px solid #3b82f6',
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
            } : {
              background: '#ffffff',
              color: '#1f2937',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            },
          }}
        />
      </div>
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;