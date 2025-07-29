// import { useEffect, useRef, useState } from 'react';
// import { InputText } from 'primereact/inputtext';
// import { Dropdown } from 'primereact/dropdown';
// import { InputTextarea } from 'primereact/inputtextarea';
// import { Calendar } from 'primereact/calendar';
// import { Accordion, AccordionTab } from 'primereact/accordion';
// import { Button } from 'primereact/button';
// import { crFormConfig, CRFormField } from '@/config/crFormConfig';

// type FormData = Record<string, any>;
// type ValidationErrors = Record<string, string>;

// export default function CrForm1() {
//   const initialFormState: FormData = Object.fromEntries(crFormConfig.map(f => [f.key, '']));
//   const [formData, setFormData] = useState<FormData>(initialFormState);
//   const [errors, setErrors] = useState<ValidationErrors>({});
//   const [accordionError, setAccordionError] = useState(false);

//   // 🔃 Map to hold refs for scrolling
//   const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});

//   const handleChange = (key: string, value: any) => {
//     setFormData(prev => ({ ...prev, [key]: value }));
//     setErrors(prev => ({ ...prev, [key]: '' }));
//   };

//   const validate = () => {
//     const newErrors: ValidationErrors = {};

//     crFormConfig.forEach(field => {
//       const val = formData[field.key];

//       if (field.required && (!val || val === '')) {
//         newErrors[field.key] = 'Required';
//       }

//       if (field.type === 'textbox' && field.pattern && val && !field.pattern.test(val)) {
//         newErrors[field.key] = 'Only alphabets, spaces, and hyphens allowed';
//       }

//       if (field.type === 'textarea' && val && field.maxLength && val.length > field.maxLength) {
//         newErrors[field.key] = `Max ${field.maxLength} characters allowed`;
//       }
//     });

//     setErrors(newErrors);
//     setAccordionError(Object.keys(newErrors).length > 0);

//     if (Object.keys(newErrors).length > 0) {
//       const firstErrorKey = Object.keys(newErrors)[0];
//       const ref = fieldRefs.current[firstErrorKey];
//       if (ref) {
//         ref.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }
//     }

//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = () => {
//     if (validate()) {
//       const submissionObject: Record<string, any> = {};

//       crFormConfig.forEach(field => {
//         let value = formData[field.key];
//         if (field.type === 'calendar' && value instanceof Date) {
//           value = value.toISOString(); // or your desired date format
//         }
//         submissionObject[field.key] = value;
//       });

//       console.log('✅ Submission Object:', submissionObject);

//       // 🔽 Example for backend submission
//       // fetch('/api/submit', {
//       //   method: 'POST',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify(submissionObject),
//       // });

//       alert('Form submitted successfully!');
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
//             options={field.options || []}
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
//             className={`w-full ${error ? 'p-invalid' : ''}`}
//             dateFormat="dd-mm-yy"
//           />
//         );
//     }
//   };

//   return (
//     <Accordion activeIndex={0}>
//       <AccordionTab
//         header="Create a CR"
//         className={accordionError ? 'p-accordion-header-invalid' : ''}
//       >
//         <div className="grid formgrid p-fluid">
//           {crFormConfig.map(field => (
//             <div
//               key={field.key}
//               className="field col-12 md:col-4"
//               ref={el => {(fieldRefs.current[field.key] = el)}}
//             >
//               <label className="font-medium mb-1 block">
//                 {field.label} {field.required && '*'}
//               </label>
//               {renderField(field)}
//               {errors[field.key] && (
//                 <small className="p-error">{errors[field.key]}</small>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-end mt-4">
//           <Button label="Submit" onClick={handleSubmit} />
//         </div>
//       </AccordionTab>
//     </Accordion>
//   );
// }
