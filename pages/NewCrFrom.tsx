// pages/cr-create-wrapper.tsx
import dynamic from 'next/dynamic';

// Dynamically load your CR form component with SSR disabled
const CRFormPage = dynamic(() => import('../components/CrForm1'), {
  ssr: false
});

export default function NewCrForm() {
  return <CRFormPage />;
}