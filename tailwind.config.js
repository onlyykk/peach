/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                peach: {
                    light: '#FFCCB3', // Primary
                    DEFAULT: '#FFCCB3',
                    dark: '#E8A88A', // Hover
                    bg: '#FFF8F0',   // Cream background
                },
                mint: {
                    light: '#B8E0D2', // Secondary
                    DEFAULT: '#B8E0D2',
                    dark: '#A3C9BC',
                },
                charcoal: {
                    DEFAULT: '#3D3D3D', // Text
                    light: '#5D5D5D',
                },
                paper: '#FFFDF8', // Slightly off-white for paper texture
            },
            fontFamily: {
                sans: ['Nunito', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
                hand: ['Pacifico', 'cursive'],
            },
            backgroundImage: {
                'paper-texture': "url('/assets/paper-texture.png')",
                'confetti': "url('/assets/confetti.png')",
            },
            boxShadow: {
                'vintage': '4px 4px 0px 0px rgba(61, 61, 61, 0.1)',
                'vintage-hover': '2px 2px 0px 0px rgba(61, 61, 61, 0.1)',
                'card': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            },
            animation: {
                'bounce-slow': 'bounce 3s infinite',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}
