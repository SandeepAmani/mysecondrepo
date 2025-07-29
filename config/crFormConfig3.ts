// config/crFormConfig3.ts
import { CRFormField } from "../types/crFormField";

export const crFormConfig3: CRFormField[] = [
  {
    key: 'startDate',
    label: 'Planned Start Date',
    type: 'calendar',
    required: true,
    colSpan: 6
  },
  {
    key: 'endDate',
    label: 'Planned End Date',
    type: 'calendar',
    required: true,
    colSpan: 6
  },
  {
    key: 'remarks',
    label: 'Remarks',
    type: 'textarea',
    required: false,
    colSpan: 12,
    maxLength: 4000
  }
];
