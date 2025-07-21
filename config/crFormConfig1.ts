// config/crFormConfig1.ts
import { CRFormField } from '@/components/CrForm1';

export const crFormConfig1: CRFormField[] = [
  {
    key: 'title',
    label: 'Request Title',
    type: 'textbox',
    required: true,
    colSpan: 12,
    pattern: /^[A-Za-z\s-]+$/
  },
  {
    key: 'priority',
    label: 'Priority',
    type: 'dropdown',
    required: true,
    colSpan: 6,
    options: ['High', 'Medium', 'Low']
  }
];
