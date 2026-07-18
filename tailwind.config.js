/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue"
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF9F5',
        rose: {
          50: '#FFF0F0',
          100: '#FFE8E5',
          200: '#FFD4CF',
          300: '#F4B8B2',
          400: '#E8958E',
          500: '#D4756B',
          600: '#B85A52',
          900: '#4A2020'
        },
        blush: {
          50: '#FFF5F7',
          100: '#FFE4E8',
          200: '#FFCDD4',
          300: '#F4A3AD',
          400: '#E87C88',
          500: '#D4606A'
        },
        gold: {
          50: '#FFFDF5',
          100: '#FFF9E0',
          200: '#FFF0B3',
          300: '#FFE680'
        },
        ink: '#3D2C2E'
      },
      fontFamily: {
        display: ['"Baloo 2"', 'ui-rounded', 'sans-serif'],
        hand: ['"Caveat"', 'cursive'],
        writing: ['"Rouge Script"', 'cursive'],
        body: ['Poppins', 'ui-sans-serif', 'sans-serif']
      },
      boxShadow: {
        elegant: '0 4px 20px rgba(61,44,46,0.06), 0 1px 3px rgba(61,44,46,0.04)',
        'elegant-md': '0 8px 32px rgba(61,44,46,0.08), 0 2px 6px rgba(61,44,46,0.04)',
        'elegant-lg': '0 16px 48px rgba(61,44,46,0.1), 0 4px 12px rgba(61,44,46,0.04)',
        'elegant-xl': '0 24px 64px rgba(61,44,46,0.12), 0 6px 16px rgba(61,44,46,0.06)',
        soft: '0 6px 20px -8px rgba(232,149,142,0.3)'
      },
      borderRadius: {
        blob: '42% 58% 65% 35% / 45% 40% 60% 55%'
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        drift: {
          '0%,100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-14px) translateX(8px) rotate(3deg)' },
          '50%': { transform: 'translateY(-6px) translateX(-5px) rotate(-2deg)' },
          '75%': { transform: 'translateY(-16px) translateX(-10px) rotate(2deg)' }
        },
        sway: {
          '0%,100%': { transform: 'rotate(-3deg) translateY(0px)' },
          '50%': { transform: 'rotate(3deg) translateY(-6px)' }
        },
        'fall-1': {
          '0%': { transform: 'translateY(-10vh) translateX(0px) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.5' },
          '90%': { opacity: '0.3' },
          '100%': { transform: 'translateY(110vh) translateX(-15px) rotate(360deg)', opacity: '0' }
        },
        'fall-2': {
          '0%': { transform: 'translateY(-10vh) translateX(0px) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.4' },
          '90%': { opacity: '0.25' },
          '100%': { transform: 'translateY(110vh) translateX(25px) rotate(-360deg)', opacity: '0' }
        },
        'fall-3': {
          '0%': { transform: 'translateY(-10vh) translateX(0px) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.45' },
          '90%': { opacity: '0.2' },
          '100%': { transform: 'translateY(110vh) translateX(-30px) rotate(540deg)', opacity: '0' }
        },
        unfold: {
          '0%': { transform: 'translateX(-50%) rotateX(-90deg)', opacity: '0' },
          '100%': { transform: 'translateX(-50%) rotateX(0deg)', opacity: '1' }
        },
        'seal-press': {
          '0%': { transform: 'translate(-50%, -50%) scale(1.3)', opacity: '0' },
          '60%': { transform: 'translate(-50%, -50%) scale(0.94)', opacity: '1' },
          '100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: '1' }
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.08)' },
          '50%': { transform: 'scale(1)' },
          '75%': { transform: 'scale(1.04)' }
        },
        wiggle: {
          '0%,100%': { transform: 'translateX(0px)' },
          '20%': { transform: 'translateX(-4px)' },
          '40%': { transform: 'translateX(4px)' },
          '60%': { transform: 'translateX(-3px)' },
          '80%': { transform: 'translateX(2px)' }
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'reveal-in': {
          '0%': { opacity: '0', transform: 'translateY(30px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
        },
        'bouquet-in': {
          '0%': { transform: 'scale(0.08)', opacity: '0' },
          '6%': { transform: 'scale(0.18)', opacity: '0.7' },
          '15%': { transform: 'scale(0.4)', opacity: '1' },
          '35%': { transform: 'scale(1.0)', opacity: '1' },
          '55%': { transform: 'scale(1.8)', opacity: '1' },
          '75%': { transform: 'scale(3.0)', opacity: '0.6' },
          '90%': { transform: 'scale(4.5)', opacity: '0.15' },
          '100%': { transform: 'scale(0.05)', opacity: '0' }
        }
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        drift: 'drift 12s ease-in-out infinite',
        sway: 'sway 6s ease-in-out infinite',
        'fall-1': 'fall-1 16s linear infinite',
        'fall-2': 'fall-2 18s linear infinite',
        'fall-3': 'fall-3 20s linear infinite',
        unfold: 'unfold 2.5s .3s cubic-bezier(.4,0,.2,1) both',
        'seal-press': 'seal-press .8s 1.8s cubic-bezier(.34,1.56,.64,1) both',
        heartbeat: 'heartbeat 3s ease-in-out infinite',
        'fade-in': 'fade-in .4s ease-out both',
        'reveal-in': 'reveal-in 1.2s cubic-bezier(.4,0,.2,1) both',
        'bouquet-in': 'bouquet-in 8s cubic-bezier(.4,0,.2,1) both'
      }
    }
  },
  plugins: []
}
