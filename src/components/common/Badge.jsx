import React from 'react';

export const Badge = ({ children, variant = 'default', size = 'sm', className = '' }) => {
  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-[10px] tracking-wide',
    sm: 'px-2 py-0.5 text-xs tracking-normal',
    md: 'px-2.5 py-1 text-xs font-medium',
  };

  const variantClasses = {
    // Task Priority Tags
    p0: 'bg-[#FF007F]/15 text-[#FF2E93] border border-[#FF007F]/45 font-mono-tabular font-bold shadow-sm shadow-[#FF007F]/20',
    p1: 'bg-[#FF6B00]/15 text-[#FF8533] border border-[#FF6B00]/45 font-mono-tabular font-semibold shadow-sm shadow-[#FF6B00]/20',
    p2: 'bg-[#3B82F6]/15 text-[#60A5FA] border border-[#3B82F6]/40 font-mono-tabular font-medium',
    
    // Status Highlights
    teal: 'bg-[#14B8A6]/15 text-[#14B8A6] border border-[#14B8A6]/35 font-medium',
    cyan: 'bg-[#00F2FE]/15 text-[#00F2FE] border border-[#00F2FE]/35 font-medium',
    green: 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/35 font-medium',
    
    // Legacy mapping aliases
    emerald: 'bg-[#14B8A6]/15 text-[#14B8A6] border border-[#14B8A6]/35 font-medium',
    glacier: 'bg-[#00F2FE]/15 text-[#00F2FE] border border-[#00F2FE]/35 font-medium',
    amber: 'bg-[#FF6B00]/15 text-[#FF8533] border border-[#FF6B00]/40 font-medium',
    coral: 'bg-[#FF007F]/15 text-[#FF2E93] border border-[#FF007F]/40 font-medium',
    slate: 'bg-white/[0.04] text-[#CBD5E1] border border-white/[0.08]',
    neutral: 'bg-white/[0.06] text-[#FFFFFF] border border-white/[0.14]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded font-mono-tabular font-medium ${sizeClasses[size]} ${variantClasses[variant] || variantClasses.slate} ${className}`}
    >
      {children}
    </span>
  );
};
