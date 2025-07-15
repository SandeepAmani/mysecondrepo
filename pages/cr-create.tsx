// pages/cr-create.tsx
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Accordion, AccordionTab } from 'primereact/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { crCreationFields, CRCreationField } from '@/config/crCreationConfig';

interface FormState {
  [key: string]: any;
}

interface ValidationState {
  [key: string]: boolean;
}

export default function CRCreatePage() {
  const [formData, setFormData] = useState<FormState>({});
  const [validation, setValidation] = useState<ValidationState>({});

  const handleChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setValidation(prev => ({ ...prev, [key]: false }));
  };

  const validate = () => {
    const errors: ValidationState = {};
    crCreationFields.forEach(f => {
      if (f.required && !formData[f.key]) {
        errors[f.key] = true;
      }
    });
    setValidation(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log('Form submitted:', formData);
      // Trigger save API or next step
    }
  };

  const renderField = (field: CRCreationField) => {
    const val = formData[field.key] || '';
    const invalid = validation[field.key];

    switch (field.type) {
      case 'dropdown':
        return (
          <Dropdown
            value={val}
            options={field.options || []}
            onChange={(e) => handleChange(field.key, e.value)}
            placeholder={`Select ${field.label}`}
            className={`w-full ${invalid ? 'p-invalid' : ''}`}
          />
        );
      case 'date':
        return (
          <Calendar
            value={val}
            onChange={(e) => handleChange(field.key, e.value)}
            className={`w-full ${invalid ? 'p-invalid' : ''}`}
            showIcon
            dateFormat="dd/mm/yy"
          />
        );
      case 'readonly':
        return (
          <InputText value={val || field.label} className="w-full" disabled />
        );
      default:
        return (
          <InputText
            value={val}
            onChange={(e) => handleChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            className={`w-full ${invalid ? 'p-invalid' : ''}`}
          />
        );
    }
  };

  return (
    <>
      <Header />

      <main className="p-4 max-w-6xl mx-auto">
        {/* Top-right action buttons */}
        <div className="flex justify-end gap-2 mb-4">
          <Button label="Move" severity="secondary" />
          <Button label="Reload" severity="secondary" />
          <Button label="Rollback" severity="secondary" />
          <Button label="Logs" severity="secondary" />
        </div>

        {/* Accordion wrapping the form */}
        <Accordion activeIndex={0}>
          <AccordionTab header="CR Form Details">
            <div className="p-fluid grid mt-4">
              {crCreationFields.map(field => (
                <div key={field.key}>
                  <label className="block font-medium mb-1">
                    {field.label} {field.required && '*'}
                  </label>
                  {renderField(field)}
                  {validation[field.key] && (
                    <small className="text-red-500">This field is required</small>
                  )}
                </div>
              ))}
            </div>

            {/* Submit button at bottom of form */}
            <div className="mt-6 flex justify-end">
              <Button label="Submit" onClick={handleSubmit} />
            </div>
          </AccordionTab>
        </Accordion>
      </main>

      <Footer />
    </>
  );
}
