// config/crFormConfig.ts

export type CRFieldType = 'textbox' | 'dropdown' | 'textarea' | 'calendar';

export interface CRFormField {
  key: string;
  label: string;
  type: CRFieldType;
  required: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[]; // for dropdown
  maxLength?: number; // for textarea
  pattern?: RegExp;   // for textbox validation
}

export const crFormConfig: CRFormField[] = [
  {
    key: 'field1',
    label: 'Field 1',
    type: 'textbox',
    required: true,
    pattern: /^[A-Za-z\s-]+$/,
    placeholder: 'Alphabets, space, hyphen only'
  },
  {
    key: 'field2',
    label: 'Field 2',
    type: 'textbox',
    required: true,
    pattern: /^[A-Za-z\s-]+$/
  },
  {
    key: 'dropdown1',
    label: 'Dropdown',
    type: 'dropdown',
    required: true,
    options: [
      { label: 'Select', value: '' },
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2' }
    ]
  },
  {
    key: 'textarea1',
    label: 'Comments',
    type: 'textarea',
    required: true,
    maxLength: 4000
  },
  {
    key: 'scheduleDate',
    label: 'Schedule Date/Time',
    type: 'calendar',
    required: true
  }
];

/*
  import { crFormConfig, CRFormField } from '@/config/crFormConfig';

crFormConfig.map((field: CRFormField) => {
  switch (field.type) {
    case 'textbox':
      return (
        <InputText
          value={formData[field.key]}
          onChange={e => onChange(field.key, e.target.value)}
          placeholder={field.placeholder}
          className={errors[field.key] ? 'p-invalid' : ''}
        />
      );
    case 'dropdown':
      return (
        <Dropdown
          value={formData[field.key]}
          options={field.options}
          onChange={e => onChange(field.key, e.value)}
          className={errors[field.key] ? 'p-invalid' : ''}
        />
      );
    case 'textarea':
      return (
        <InputTextarea
          value={formData[field.key]}
          onChange={e => onChange(field.key, e.target.value)}
          maxLength={field.maxLength}
          className={errors[field.key] ? 'p-invalid' : ''}
        />
      );
    case 'calendar':
      return (
        <Calendar
          value={formData[field.key] ?? null}
          onChange={e => onChange(field.key, e.value)}
          showIcon
          className={errors[field.key] ? 'p-invalid' : ''}
        />
      );
  }
});
*/
