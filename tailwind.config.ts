
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#4a6fdc',
					dark: '#3a5fc6',
					light: '#EDF2FD',
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: '#42b883',
					dark: '#379f70',
					foreground: '#FFFFFF'
				},
				destructive: {
					DEFAULT: '#ef4444',
					foreground: '#FFFFFF'
				},
				muted: {
					DEFAULT: '#f1f5f9',
					foreground: '#64748b'
				},
				accent: {
					DEFAULT: '#e0e7ff',
					foreground: '#4a6fdc'
				},
				popover: {
					DEFAULT: '#FFFFFF',
					foreground: '#1e293b'
				},
				card: {
					DEFAULT: '#FFFFFF',
					foreground: '#1e293b'
				},
				dark: '#1e293b',
				gray: '#64748b',
				light: '#f8fafc'
			},
			borderRadius: {
				lg: '10px',
				md: '6px',
				sm: '4px'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'fade-in-up': {
					from: { 
						opacity: '0',
						transform: 'translateY(20px)'
					},
					to: { 
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in-right': {
					from: { 
						opacity: '0',
						transform: 'translateX(20px)'
					},
					to: { 
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'hover-lift': {
					from: {
						transform: 'translateY(0)'
					},
					to: {
						transform: 'translateY(-5px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.3s ease-out',
				'accordion-up': 'accordion-up 0.3s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'fade-in-up': 'fade-in-up 0.8s ease-out',
				'slide-in-right': 'slide-in-right 0.5s ease-out',
				'hover-lift': 'hover-lift 0.3s forwards'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
