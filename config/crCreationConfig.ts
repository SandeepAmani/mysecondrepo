// config/crCreationConfig.ts
export interface CRCreationField {
  key: string;
  label: string;
  type: 'text' | 'dropdown' | 'date' | 'readonly';
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
}

export const crCreationFields: CRCreationField[] = [
  { key: 'assignmentGroup', label: 'Assignment Group', type: 'dropdown', required: true, options: [] },
  { key: 'application', label: 'Application', type: 'dropdown', required: true, options: [] },
  { key: 'ticketRef', label: 'Ticket Ref', type: 'text', placeholder: 'e.g. GE-1234', required: true },
  { key: 'changeType', label: 'Change Type', type: 'dropdown', required: true, options: [] },
  { key: 'changeSubType', label: 'Change SubType', type: 'dropdown', required: true, options: [] },
  { key: 'scheduleDateTime', label: 'Schedule Date/Time', type: 'date', required: true },
  { key: 'duration', label: 'Duration in Minutes', type: 'text', placeholder: 'Specify the time in Minutes', required: true },
  { key: 'businessService', label: 'Business Service', type: 'readonly' },
  { key: 'serviceOffering', label: 'Service Offering', type: 'readonly' }
];
