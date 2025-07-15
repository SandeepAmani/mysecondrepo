// pages/cr-create-wrapper.tsx
import dynamic from 'next/dynamic';

// Dynamically load your CR form component with SSR disabled
const CRCreatePage = dynamic(() => import('./cr-create'), {
  ssr: false
});

export default function CRCreateWrapper() {
  return <CRCreatePage />;
}
