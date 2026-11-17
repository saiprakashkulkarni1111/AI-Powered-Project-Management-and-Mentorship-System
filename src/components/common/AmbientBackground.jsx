import React from 'react';

export const AmbientBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#06070B]">
      
      {/* Deep Space Background Mesh Gradients */}
      {/* 1. Top: Very dark, rich purple */}
      <div 
        className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[90vw] h-[55vw] rounded-full blur-[140px] opacity-45 mix-blend-screen animate-mesh-slow"
        style={{
          background: 'radial-gradient(circle, #38125E 0%, #200B3B 50%, rgba(15, 6, 28, 0) 75%)'
        }}
      />

      {/* 2. Bottom-Left: Deep electric blue */}
      <div 
        className="absolute -bottom-[15%] -left-[10%] w-[65vw] h-[65vw] rounded-full blur-[150px] opacity-40 mix-blend-screen animate-mesh-slow"
        style={{
          background: 'radial-gradient(circle, #0F328C 0%, #09205C 45%, rgba(6, 15, 48, 0) 75%)',
          animationDelay: '-10s'
        }}
      />

      {/* 3. Bottom-Right: Vibrant cyan / teal */}
      <div 
        className="absolute -bottom-[10%] -right-[8%] w-[60vw] h-[60vw] rounded-full blur-[140px] opacity-35 mix-blend-screen animate-mesh-slow"
        style={{
          background: 'radial-gradient(circle, #0891B2 0%, #0E7490 35%, #064E3B 65%, rgba(6, 78, 59, 0) 80%)',
          animationDelay: '-18s'
        }}
      />

      {/* Tactile 2% SVG noise texture overlay for physical film grain depth */}
      <div className="absolute inset-0 noise-overlay opacity-80" />

      {/* Subtle fine hairline grid for engineering precision */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />
    </div>
  );
};
