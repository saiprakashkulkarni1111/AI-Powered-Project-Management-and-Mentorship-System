import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { Bell, CheckCheck, MessageSquare, AlertTriangle, CheckCircle, Shield, X } from 'lucide-react';
import { Badge } from './Badge';

export const NotificationPopover = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const getIcon = (type) => {
    switch (type) {
      case 'feedback':
        return <MessageSquare className="w-4 h-4 text-[#38BDF8]" strokeWidth={1.5} />;
      case 'risk':
        return <AlertTriangle className="w-4 h-4 text-[#F43F5E]" strokeWidth={1.5} />;
      case 'milestone':
        return <CheckCircle className="w-4 h-4 text-[#10B981]" strokeWidth={1.5} />;
      default:
        return <Shield className="w-4 h-4 text-[#94A3B8]" strokeWidth={1.5} />;
    }
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={popoverRef}
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="absolute right-0 top-12 w-96 rounded-xl glass-modal z-50 overflow-hidden shadow-2xl border border-white/10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#F1F5F9]">Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="glacier" size="xs">
                  {unreadCount} new
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllNotificationsRead}
                  className="text-xs text-[#94A3B8] hover:text-[#38BDF8] flex items-center gap-1 transition-colors"
                >
                  <CheckCheck className="w-3.5 h-3.5" strokeWidth={1.5} />
                  Mark all read
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1 rounded-md text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.06] transition-colors"
              >
                <X className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-white/[0.05]">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#94A3B8]">
                No recent notifications
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => markNotificationRead(item.id)}
                  className={`p-3.5 flex items-start gap-3 transition-colors cursor-pointer hover:bg-white/[0.04] ${
                    item.unread ? 'bg-white/[0.02]' : 'opacity-80'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.06] shrink-0 mt-0.5">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-xs font-semibold text-[#F1F5F9] truncate">
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-mono-tabular text-[#94A3B8] shrink-0">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
                      {item.message}
                    </p>
                  </div>
                  {item.unread && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] mt-2 shrink-0 shadow-sm shadow-[#38BDF8]/50" />
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-white/[0.06] bg-white/[0.01] flex items-center justify-between text-[11px] text-[#94A3B8]">
            <span className="font-mono-tabular">Real-time Telemetry Push</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Connected
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
