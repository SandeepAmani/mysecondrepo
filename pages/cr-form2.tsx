import { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';

import { crFormConfig1 } from '../config/crFormConfig1';
import { crFormConfig2 } from '../config/crFormConfig2';
import { crFormConfig3 } from '../config/crFormConfig3';
import { CRFormField } from "../types/crFormField";
// export interface CRFormField {
//   key: string;
//   label: string;
//   type: 'textbox' | 'dropdown' | 'textarea' | 'calendar';
//   required?: boolean;
//   maxLength?: number;
//   pattern?: RegExp;
//   options?: string[];
//   colSpan?: number;
// }

export default function CrForm1() {
  const toast = useRef<Toast>(null);
  const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const allFields = [...crFormConfig1, ...crFormConfig2, ...crFormConfig3];

  type FormFieldKey = typeof allFields[number]['key'];
type FormData = Record<FormFieldKey, string | Date | null>;

  // const initialFormState = Object.fromEntries(allFields.map(f => [f.key, '']));
  // const [formData, setFormData] = useState<Record<string, unknown>>(initialFormState);
  const [formData, setFormData] = useState<FormData>(
  Object.fromEntries(allFields.map(f => [f.key, ''])) as FormData
);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    { label: 'Basic Info', fields: crFormConfig1 },
    { label: 'Details', fields: crFormConfig2 },
    { label: 'Schedule', fields: crFormConfig3 }
  ];

  const handleChange = <T extends string | Date | null>(key: string, value: T) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: '' }));
  };

//   const handleChange = (key: string, value: string | Date | null | undefined) => {
//   setFormData(prev => ({ ...prev, [key]: value }));
//   setErrors(prev => ({ ...prev, [key]: '' }));
// };

  const validateFields = (fields: CRFormField[]): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach(field => {
      const val = formData[field.key] as string;
      if (field.required && (!val || val === '')) {
        newErrors[field.key] = 'Required';
      }
      if (field.type === 'textbox' && field.pattern && val && !field.pattern.test(val)) {
        newErrors[field.key] = 'Only letters, spaces, hyphens allowed';
      }
      if (field.type === 'textarea' && val && field.maxLength && val.length > field.maxLength) {
        newErrors[field.key] = `Max ${field.maxLength} characters allowed`;
      }
    });

    setErrors(prev => ({ ...prev, ...newErrors }));

    if (Object.keys(newErrors).length > 0) {
      const firstErrorKey = Object.keys(newErrors)[0];
      fieldRefs.current[firstErrorKey]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleStepSubmit = (i: number) => {
    const stepFields = steps[i].fields;
    if (!validateFields(stepFields)) return;
    if (!completedSteps.includes(i)) setCompletedSteps(prev => [...prev, i]);
    if (i < steps.length - 1) setActiveIndex(i + 1);
    toast.current?.show({
      severity: 'success',
      summary: 'Step Completed',
      detail: `${steps[i].label} submitted`
    });
  };

  const handleFinalSubmit = async () => {
    const isValid = validateFields(allFields);
    if (!isValid) {
      toast.current?.show({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Fix all errors before submission'
      });
      return;
    }

    setLoading(true);
    try {
      const submissionData = allFields.reduce((acc, field) => {
        let val = formData[field.key];
        if (field.type === 'calendar' && val instanceof Date) {
          val = val.toISOString();
        }
        acc[field.key] = val;
        return acc;
      }, {} as Record<string, string | Date | null>);

      const res = await fetch('/api/submit-cr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });

      if (!res.ok) throw new Error('Submission failed');

      toast.current?.show({
        severity: 'success',
        summary: 'Submitted',
        detail: 'CR submitted successfully'
      });
    } catch {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Submission failed' });
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field: CRFormField) => {
    const value = formData[field.key];
    const error = errors[field.key];

    switch (field.type) {
      case 'textbox':
        return <InputText value={typeof value === 'string' ? value : value?.toString() ?? ''} onChange={e => handleChange(field.key, e.target.value)} className={`w-full ${error ? 'p-invalid' : ''}`} />;
      case 'dropdown':
        return <Dropdown value={value} options={field.options} onChange={e => handleChange(field.key, e.value)} placeholder="Select" className={`w-full ${error ? 'p-invalid' : ''}`} />;
      case 'textarea':
        return <InputTextarea value={typeof value === 'string' ? value : value?.toString() ?? ''} onChange={e => handleChange(field.key, e.target.value)} rows={5} maxLength={field.maxLength} className={`w-full ${error ? 'p-invalid' : ''}`} />;
      case 'calendar':
        return <Calendar value={value ?new Date(value) :null} onChange={e => handleChange(field.key, e.value?? null)} showIcon showTime showSeconds hideOnDateTimeSelect hourFormat="24" minDate={new Date()} className={`w-full ${error ? 'p-invalid' : ''}`} dateFormat="dd-mm-yy" />;
    }
  };

  return (
    <>
      <Toast ref={toast} position="top-right" />
      <Accordion multiple={false} activeIndex={activeIndex} onTabChange={e => setActiveIndex(e.index as number)}>
        {steps.map((step, i) => (
          <AccordionTab key={i} header={step.label} disabled={i > 0 && !completedSteps.includes(i - 1)}>
            <div className="grid formgrid p-fluid">
              {step.fields.map(field => {
                const colSpan = field.colSpan ?? 4;
                return (
                  <div
                    key={field.key}
                    ref={el => {(fieldRefs.current[field.key] = el)}}
                    className={`field col-12 md:col-${colSpan}`}
                  >
                    <label className="block font-medium mb-1">
                      {field.label} {field.required && '*'}
                    </label>
                    {renderField(field)}
                    {errors[field.key] && <small className="p-error">{errors[field.key]}</small>}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end mt-4 gap-2">
              {i < steps.length - 1 ? (
                <Button label="Submit Section" onClick={() => handleStepSubmit(i)} />
              ) : (
                <Button label="Final Submit" onClick={handleFinalSubmit} disabled={loading} />
              )}
              {loading && i === steps.length - 1 && (
                <ProgressSpinner style={{ width: '25px', height: '25px' }} strokeWidth="6" />
              )}
            </div>
          </AccordionTab>
        ))}
      </Accordion>
    </>
  );
}
