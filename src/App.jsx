import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AmbientBackground } from './components/common/AmbientBackground';
import { TopNavigation } from './components/common/TopNavigation';
import { CommandPalette } from './components/common/CommandPalette';
import { AiDrawer } from './components/ai/AiDrawer';
import { DocumentAnnotationModal } from './components/mentor/DocumentAnnotationModal';
import { CreateTaskModal } from './components/student/CreateTaskModal';
import { AuthModal } from './components/auth/AuthModal';
import { LoginPage } from './components/auth/LoginPage';

import { StudentDashboard } from './components/student/StudentDashboard';
import { MentorDashboard } from './components/mentor/MentorDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';

const AppContent = () => {
  const { role, showLoginPage } = useApp();

  return (
    <div className="relative min-h-screen flex flex-col font-sans selection:bg-[#38BDF8]/30 selection:text-white">
      {/* Tactile Frosted Obsidian Canvas Background & Mesh Lighting */}
      <AmbientBackground />

      {showLoginPage ? (
        <LoginPage />
      ) : (
        <>
          {/* Top Bar with Role Switcher & Micro-interactions */}
          <TopNavigation />

          {/* Main Dynamic Workspace based on Active Role */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 pb-20">
            {role === 'student' && <StudentDashboard />}
            {role === 'mentor' && <MentorDashboard />}
            {role === 'admin' && <AdminDashboard />}
          </main>
        </>
      )}

      {/* Global Interactive Drawers & Floating Modals */}
      <CommandPalette />
      <AiDrawer />
      <DocumentAnnotationModal />
      <CreateTaskModal />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
