// pages/_app.tsx
import 'primereact/resources/themes/lara-light-blue/theme.css'; // Theme
import 'primereact/resources/primereact.min.css';               // Core CSS
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css'                            // Icons
import '../styles/globals.css';                           // Your global CSS

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
