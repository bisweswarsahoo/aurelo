import React from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import PlayerBar from './components/PlayerBar';
import ExpandedModal from './components/ExpandedModal';
import QueueDrawer from './components/QueueDrawer';

function App() {
  return (
    <div className="relative min-h-screen bg-[#08090d] text-neutral-100 overflow-hidden font-sans">
      
      {/* Dynamic Ambient Background Glow Orbs */}
      <div className="ambient-glow-container">
        <div className="ambient-orb orb-1" />
        <div className="ambient-orb orb-2" />
        <div className="ambient-orb orb-3" />
      </div>

      {/* Main Flex Frame */}
      <div className="relative z-10 flex flex-col h-screen w-screen overflow-hidden">
        
        {/* Top Area: Sidebar + Main Content */}
        <div className="flex-1 flex overflow-hidden relative">
          <Sidebar />
          <MainContent />
          <QueueDrawer />
        </div>

        {/* Sticky Bottom Player Bar */}
        <PlayerBar />

      </div>

      {/* Fullscreen Expanded Apple Music Modal */}
      <ExpandedModal />

    </div>
  );
}

export default App;

