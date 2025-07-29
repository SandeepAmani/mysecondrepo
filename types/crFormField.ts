export interface CRFormField {
  key: string;
  label: string;
  type: 'textbox' | 'dropdown' | 'textarea' | 'calendar';
  required?: boolean;
  maxLength?: number;
  pattern?: RegExp;
  options?: string[];
  colSpan?: number;
  placeholder?: string; // Optional placeholder for text inputs
}