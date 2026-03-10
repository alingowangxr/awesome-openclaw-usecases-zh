/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"',
          '"PingFang TC"', '"Noto Sans TC"', '"Microsoft JhengHei"',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
