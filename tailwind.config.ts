
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
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				law: {
					charcoal: '#333333',
					darkgray: '#222222',
					gray: '#888888',
					gold: '#D4AF37',
					lightgold: '#F5E7BD',
					offwhite: '#F6F6F6',
					accent: '#B08C3C',
					cream: '#F8F5E9',
				}
			},
			fontFamily: {
				montserrat: ['Montserrat', 'sans-serif'],
				lato: ['Lato', 'sans-serif'],
				playfair: ['Playfair Display', 'serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-in-right': {
					'0%': {
						opacity: '0',
						transform: 'translateX(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'shimmer': {
					'0%': {
						'backgroundPosition': '-200% center',
					},
					'100%': {
						'backgroundPosition': '200% center',
					},
				},
				'scale-up': {
					'0%': { transform: 'scale(1)' },
					'100%': { transform: 'scale(1.05)' },
				},
				'scale-down': {
					'0%': { transform: 'scale(1.05)' },
					'100%': { transform: 'scale(1)' },
				},
				'border-beam': {
					'0%': { 'border-color': 'rgba(212, 175, 55, 0.3)' },
					'50%': { 'border-color': 'rgba(212, 175, 55, 0.6)' },
					'100%': { 'border-color': 'rgba(212, 175, 55, 0.3)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-gentle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.85' }
				},
				'shine': {
					'0%': { 'background-position': '-200% center' },
					'50%': { 'background-position': '200% center' },
					'100%': { 'background-position': '-200% center' }
				},
				'marquee': {
					'from': { transform: 'translateX(0)' },
					'to': { transform: 'translateX(calc(-100% - var(--gap)))' },
				},
				'marquee-vertical': {
					'from': { transform: 'translateY(0)' },
					'to': { transform: 'translateY(calc(-100% - var(--gap)))' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'fade-in-right': 'fade-in-right 0.6s ease-out',
				'shimmer': 'shimmer 3s infinite',
				'scale-up': 'scale-up 0.2s ease-out',
				'scale-down': 'scale-down 0.2s ease-out',
				'border-beam': 'border-beam 3s infinite',
				'float': 'float 6s ease-in-out infinite',
				'pulse-gentle': 'pulse-gentle 3s infinite',
				'shine': 'shine 8s ease-in-out infinite',
				'marquee': 'marquee var(--duration) linear infinite',
				'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-gold-radial': 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.1) 30%, transparent 70%)',
				'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #F5E7BD 50%, #D4AF37 100%)',
				'texture-paper': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmNWY1ZjUiPjwvcmVjdD4KPC9zdmc+Cg==')",
			},
			boxShadow: {
				'gold': '0 0px 15px -3px rgba(212, 175, 55, 0.3)',
				'gold-lg': '0 0px 25px -5px rgba(212, 175, 55, 0.3)',
				'inner-gold': 'inset 0 2px 4px 0 rgba(212, 175, 55, 0.2)',
				'elegant': '0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 5px rgba(212, 175, 55, 0.1)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
