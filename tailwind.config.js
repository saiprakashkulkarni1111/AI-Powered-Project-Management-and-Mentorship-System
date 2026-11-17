/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          dark: '#06070B',
          purple: '#181224',
          modal: 'rgba(28, 20, 42, 0.82)',
          panel: 'rgba(24, 18, 36, 0.58)',
        },
        cyan: {
          vibrant: '#00F2FE',
          glow: 'rgba(0, 242, 254, 0.35)',
        },
        teal: {
          track: '#14B8A6',
        },
        accent: {
          green: '#10B981',
          pink: '#FF007F',
          orange: '#FF6B00',
          blue: '#3B82F6',
          gold: '#F59E0B',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 24px -2px rgba(0, 242, 254, 0.5)',
        'neon-cyan-lg': '0 0 36px 0 rgba(0, 242, 254, 0.7)',
        'neon-pink': '0 0 20px -2px rgba(255, 0, 127, 0.45)',
        'warm-orange': '0 0 20px -2px rgba(255, 107, 0, 0.45)',
        'glass-panel': '0 8px 32px 0 rgba(0, 0, 0, 0.45), inset 0 1px 0 0 rgba(255, 255, 255, 0.14)',
        'glass-modal': '0 24px 48px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 0 rgba(255, 255, 255, 0.16)',
      },
      animation: {
        'mesh-slow': 'mesh 25s ease-in-out infinite alternate',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 6, 1) infinite',
      },
      keyframes: {
        mesh: {
          '0%': { transform: 'scale(1) translate(0px, 0px) rotate(0deg)' },
          '50%': { transform: 'scale(1.08) translate(30px, -20px) rotate(3deg)' },
          '100%': { transform: 'scale(1) translate(-20px, 15px) rotate(-2deg)' },
        }
      }
    },
  },
  plugins: [],
}
