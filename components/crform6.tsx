import { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { crFormConfig, CRFormField } from '@/config/crFormConfig';

type FormData = Record<string, any>;
type ValidationErrors = Record<string, string>;

export default function CrForm1() {
  const toast = useRef<Toast>(null);
  const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const initialFormState: FormData = Object.fromEntries(crFormConfig.map(f => [f.key, '']));
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Divide config into 3 accordion steps
  const steps = [
    { label: 'Basic Info', fields: crFormConfig.slice(0, 2) },
    { label: 'Details', fields: crFormConfig.slice(2, 4) },
    { label: 'Schedule', fields: crFormConfig.slice(4) }
  ];

  const handleChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const validateFields = (fields: CRFormField[]): boolean => {
    const newErrors: ValidationErrors = {};

    fields.forEach(field => {
      const val = formData[field.key];
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

  const handleStepSubmit = (stepIndex: number) => {
    const stepFields = steps[stepIndex].fields;
    if (!validateFields(stepFields)) {
      toast.current?.show({
        severity: 'error',
        summary: 'Validation Error',
        detail: `Please correct errors in "${steps[stepIndex].label}"`
      });
      return;
    }

    setCompletedSteps(prev => [...prev, stepIndex]);
    setActiveIndex(stepIndex + 1);
    toast.current?.show({
      severity: 'success',
      summary: 'Step Completed',
      detail: `${steps[stepIndex].label} submitted`
    });
  };

  const handleFinalSubmit = async () => {
    const isValid = validateFields(crFormConfig);
    if (!isValid) {
      toast.current?.show({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Fix all errors before final submission'
      });
      return;
    }

    setLoading(true);
    try {
      const submissionObject = crFormConfig.reduce((acc, field) => {
        let val = formData[field.key];
        if (field.type === 'calendar' && val instanceof Date) {
          val = val.toISOString();
        }
        acc[field.key] = val;
        return acc;
      }, {} as Record<string, any>);

      const res = await fetch('/api/submit-cr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionObject)
      });

      if (!res.ok) throw new Error('Submission failed');

      toast.current?.show({
        severity: 'success',
        summary: 'Submitted',
        detail: 'CR submitted successfully!'
      });
    } catch {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Submission failed. Try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field: CRFormField) => {
    const value = formData[field.key];
    const error = errors[field.key];

    switch (field.type) {
      case 'textbox':
        return <InputText value={value} onChange={e => handleChange(field.key, e.target.value)} placeholder={field.placeholder} className={`w-full ${error ? 'p-invalid' : ''}`} />;
      case 'dropdown':
        return <Dropdown value={value} options={field.options} onChange={e => handleChange(field.key, e.value)} placeholder="Select" className={`w-full ${error ? 'p-invalid' : ''}`} />;
      case 'textarea':
        return <InputTextarea value={value} onChange={e => handleChange(field.key, e.target.value)} rows={5} maxLength={field.maxLength} className={`w-full ${error ? 'p-invalid' : ''}`} />;
      case 'calendar':
        return <Calendar value={value ?? null} onChange={e => handleChange(field.key, e.value)} showIcon hourFormat="24" showTime showSeconds hideOnDateTimeSelect className={`w-full ${error ? 'p-invalid' : ''}`} dateFormat="dd-mm-yy" />;
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <Accordion multiple={false} activeIndex={activeIndex} onTabChange={e => setActiveIndex(e.index as number)}>
        {steps.map((step, i) => {
          const disabled = i > 0 && !completedSteps.includes(i - 1);
          const tabHasError = step.fields.some(f => errors[f.key]);

          return (
            <AccordionTab
              key={i}
              header={step.label}
              disabled={disabled}
              className={tabHasError ? 'p-accordion-header-invalid' : ''}
            >
              <div className="grid formgrid p-fluid">
                {step.fields.map(field => (
                  <div key={field.key} ref={el => (fieldRefs.current[field.key] = el)} className="field col-12 md:col-4">
                    <label className="block font-medium mb-1">
                      {field.label} {field.required && '*'}
                    </label>
                    {renderField(field)}
                    {errors[field.key] && <small className="p-error">{errors[field.key]}</small>}
                  </div>
                ))}
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
          );
        })}
      </Accordion>
    </>
  );
}
