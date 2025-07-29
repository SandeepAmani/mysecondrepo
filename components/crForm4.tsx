// //npm install primeflex
// //_app.tsx: import 'primeflex/primeflex.css';
// import { useRef, useState } from 'react';
// import { InputText } from 'primereact/inputtext';
// import { Dropdown } from 'primereact/dropdown';
// import { InputTextarea } from 'primereact/inputtextarea';
// import { Calendar } from 'primereact/calendar';
// import { Accordion, AccordionTab } from 'primereact/accordion';
// import { Button } from 'primereact/button';
// import { Toast } from 'primereact/toast';
// import { ProgressSpinner } from 'primereact/progressspinner';
// import { crFormConfig, CRFormField } from '@/config/crFormConfig';

// type FormData = Record<string, any>;
// type ValidationErrors = Record<string, string>;

// export default function CrForm1() {
//   const toast = useRef<Toast>(null);

//   const initialFormState: FormData = Object.fromEntries(
//     crFormConfig.map(field => [field.key, ''])
//   );
//   const [formData, setFormData] = useState<FormData>(initialFormState);
//   const [errors, setErrors] = useState<ValidationErrors>({});
//   const [activeIndex, setActiveIndex] = useState<number[]>([0]);
//   const [loading, setLoading] = useState(false);

//   // 🪜 Divide form into steps (adjust slicing as needed)
//   const steps = [
//     { label: 'Basic Info', fields: crFormConfig.slice(0, 2) },
//     { label: 'Details', fields: crFormConfig.slice(2, 4) },
//     { label: 'Schedule', fields: crFormConfig.slice(4) }
//   ];

//   const handleChange = (key: string, value: any) => {
//     setFormData(prev => ({ ...prev, [key]: value }));
//     setErrors(prev => ({ ...prev, [key]: '' }));
//   };

//   const validateFieldsInTab = (fields: CRFormField[]): boolean => {
//     const newErrors: ValidationErrors = {};

//     fields.forEach(field => {
//       const val = formData[field.key];

//       if (field.required && (!val || val === '')) {
//         newErrors[field.key] = 'Required';
//       }

//       if (field.type === 'textbox' && field.pattern && val && !field.pattern.test(val)) {
//         newErrors[field.key] = 'Only letters, spaces, hyphens allowed';
//       }

//       if (field.type === 'textarea' && val && field.maxLength && val.length > field.maxLength) {
//         newErrors[field.key] = `Max ${field.maxLength} characters allowed`;
//       }
//     });

//     setErrors(prev => ({ ...prev, ...newErrors }));
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     const isValid = validateFieldsInTab(crFormConfig);
//     if (!isValid) {
//       toast.current?.show({
//         severity: 'error',
//         summary: 'Validation Error',
//         detail: 'Please fix errors before submitting'
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       const submissionObject = crFormConfig.reduce((acc, field) => {
//         let val = formData[field.key];
//         if (field.type === 'calendar' && val instanceof Date) {
//           val = val.toISOString(); // or format as needed
//         }
//         acc[field.key] = val;
//         return acc;
//       }, {} as Record<string, any>);

//       console.log('Submitting:', submissionObject);
//       // await fetch('/api/submit', { method: 'POST', body: JSON.stringify(submissionObject) });

//       toast.current?.show({
//         severity: 'success',
//         summary: 'Submitted',
//         detail: 'CR submitted successfully!'
//       });
//     } catch (err) {
//       toast.current?.show({
//         severity: 'error',
//         summary: 'Error',
//         detail: 'Submission failed. Try again later.'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderField = (field: CRFormField) => {
//     const value = formData[field.key];
//     const error = errors[field.key];

//     switch (field.type) {
//       case 'textbox':
//         return (
//           <InputText
//             value={value}
//             onChange={e => handleChange(field.key, e.target.value)}
//             placeholder={field.placeholder}
//             className={`w-full ${error ? 'p-invalid' : ''}`}
//           />
//         );
//       case 'dropdown':
//         return (
//           <Dropdown
//             value={value}
//             options={field.options}
//             onChange={e => handleChange(field.key, e.value)}
//             placeholder="Select"
//             className={`w-full ${error ? 'p-invalid' : ''}`}
//           />
//         );
//       case 'textarea':
//         return (
//           <InputTextarea
//             value={value}
//             onChange={e => handleChange(field.key, e.target.value)}
//             rows={5}
//             maxLength={field.maxLength}
//             className={`w-full ${error ? 'p-invalid' : ''}`}
//           />
//         );
//       case 'calendar':
//         return (
//           <Calendar
//             value={value ?? null}
//             onChange={e => handleChange(field.key, e.value)}
//             showIcon
//             hourFormat="24"
//             showTime
//             showSeconds
//             className={`w-full ${error ? 'p-invalid' : ''}`}
//             dateFormat="dd-mm-yy"
//           />
//         );
//     }
//   };

//   return (
//     <>
//       <Toast ref={toast} />
//       <Accordion multiple activeIndex={activeIndex} onTabChange={e => setActiveIndex(e.index as number[])}>
//         {steps.map((step, index) => {
//           const tabHasError = step.fields.some(f => errors[f.key]);
//           return (
//             <AccordionTab
//               key={index}
//               header={step.label}
//               className={tabHasError ? 'p-accordion-header-invalid' : ''}
//             >
//               <div className="grid formgrid p-fluid">
//                 {step.fields.map(field => (
//                   <div key={field.key} className="field col-12 md:col-4">
//                     <label className="block font-medium mb-1">
//                       {field.label} {field.required && '*'}
//                     </label>
//                     {renderField(field)}
//                     {errors[field.key] && (
//                       <small className="p-error">{errors[field.key]}</small>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* Show submit button on last tab */}
//               {index === steps.length - 1 && (
//                 <div className="flex justify-end mt-4 gap-2">
//                   <Button label="Submit" onClick={handleSubmit} disabled={loading} />
//                   {loading && (
//                     <ProgressSpinner
//                       style={{ width: '25px', height: '25px' }}
//                       strokeWidth="6"
//                     />
//                   )}
//                 </div>
//               )}
//             </AccordionTab>
//           );
//         })}
//       </Accordion>
//     </>
//   );
// }
