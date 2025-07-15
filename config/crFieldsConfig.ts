// config/crFieldsConfig.ts
export interface CRField {
  key: string;
  label: string;
  type: 'text' | 'dropdown' | 'date' | 'textarea';
  required?: boolean;
  options?: { label: string; value: string }[];
}

export const crFieldsConfig: CRField[] = [
  {
    key: 'priority',
    label: 'Priority',
    type: 'dropdown',
    required: true,
    options: [
      { label: 'High', value: 'High' },
      { label: 'Medium', value: 'Medium' },
      { label: 'Low', value: 'Low' }
    ]
  },
  { key: 'request', label: 'Request', type: 'text', required: true },
  { key: 'movement', label: 'Movement', type: 'text', required: true },
  { key: 'streams', label: 'Streams', type: 'text', required: true },
  { key: 'appName', label: 'App Name', type: 'text' },
  { key: 'comment', label: 'Comment', type: 'textarea' },
  {
    key: 'progress',
    label: 'Progress',
    type: 'dropdown',
    required: true,
    options: [
      { label: 'Ongoing', value: 'Ongoing' },
      { label: 'Blocked', value: 'Blocked' },
      { label: 'Completed', value: 'Completed' }
    ]
  }
];
