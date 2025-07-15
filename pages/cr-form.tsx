// pages/cr-form.tsx
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { crFieldsConfig, CRField } from '../config/crFieldsConfig';

interface CRFormState {
  [key: string]: any;
}

interface ValidationState {
  [key: string]: boolean;
}

export default function CRFormPage() {
  const [formData, setFormData] = useState<CRFormState>({});
  const [validation, setValidation] = useState<ValidationState>({});

  const handleChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setValidation(prev => ({ ...prev, [key]: false }));
  };

  const validateFields = () => {
    const errors: ValidationState = {};
    crFieldsConfig.forEach(field => {
      if (field.required && !formData[field.key]) {
        errors[field.key] = true;
      }
    });
    setValidation(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateFields()) {
      console.log('Form submitted:', formData);
      // submit logic
    } else {
      console.warn('Validation failed');
    }
  };

  const renderField = (field: CRField) => {
    const value = formData[field.key] || '';
    const isInvalid = validation[field.key];

    switch (field.type) {
      case 'dropdown':
        return (
          <Dropdown
            value={value}
            options={field.options}
            onChange={(e) => handleChange(field.key, e.value)}
            placeholder={`Select ${field.label}`}
            className={`w-full ${isInvalid ? 'p-invalid' : ''}`}
          />
        );
      case 'date':
        return (
          <Calendar
            value={value}
            onChange={(e) => handleChange(field.key, e.value)}
            className={`w-full ${isInvalid ? 'p-invalid' : ''}`}
            showIcon
          />
        );
      case 'textarea':
        return (
          <InputTextarea
            value={value}
            onChange={(e) => handleChange(field.key, e.target.value)}
            className={`w-full ${isInvalid ? 'p-invalid' : ''}`}
            rows={3}
          />
        );
      default:
        return (
          <InputText
            value={value}
            onChange={(e) => handleChange(field.key, e.target.value)}
            className={`w-full ${isInvalid ? 'p-invalid' : ''}`}
          />
        );
    }
  };

  return (
    <>
      <Header />
      <main className="p-4 max-w-3xl mx-auto">
        <h3>CR Request Form</h3>
        <div className="grid gap-4 mt-4">
          {crFieldsConfig.map(field => (
            <div key={field.key}>
              <label className="block mb-1 font-medium">{field.label}{field.required && ' *'}</label>
              {renderField(field)}
              {validation[field.key] && (
                <small className="text-red-500">This field is required</small>
              )}
            </div>
          ))}
        </div>
        <Button label="Submit" className="mt-4" onClick={handleSubmit} />
      </main>
      <Footer />
    </>
  );
}
