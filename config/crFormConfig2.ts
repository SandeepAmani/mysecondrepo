// config/crFormConfig2.ts
import { CRFormField } from '@/components/CrForm1';

export const crFormConfig2: CRFormField[] = [
  {
    key: 'environment',
    label: 'Environment',
    type: 'dropdown',
    required: true,
    colSpan: 6,
    options: ['DEV', 'QA', 'UAT', 'PROD']
  },
  {
    key: 'owner',
    label: 'Assigned To',
    type: 'textbox',
    required: true,
    colSpan: 6,
    pattern: /^[A-Za-z\s-]+$/
  },
  {
    key: 'description',
    label: 'Description',
    type: 'textarea',
    required: true,
    colSpan: 12,
    maxLength: 4000
  }
];
