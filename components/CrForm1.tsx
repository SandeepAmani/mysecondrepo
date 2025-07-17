import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Accordion, AccordionTab } from 'primereact/accordion';

const TEXT_PATTERN = /^[A-Za-z\s-]+$/;

const options1 = [ { label: 'Opt 1', value: 'opt1' } ]; // replace with your actual options

export default function CrForm1() {
  const [data, setData] = useState({
    field1: '',
    field2: '',
    dropdown1: '',
    textarea1: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeIndexErrors, setActiveIndexErrors] = useState<boolean[]>([false]);
type FieldKey = keyof typeof data;

  const validate = () => {
    const newErrors: Record<string,string> = {};

    // Text fields: required + pattern
    ['field1', 'field2'].forEach(key => {
      const val = data[key as keyof typeof data].trim();
      if (!val) newErrors[key] = 'Required';
      else if (!TEXT_PATTERN.test(val)) newErrors[key] = 'Only letters, spaces or -';
    });

    // Dropdown: required
    if (!data.dropdown1) newErrors['dropdown1'] = 'Required';

    // Textarea: required + length limit
    if (!data.textarea1.trim()) newErrors['textarea1'] = 'Required';
    else if (data.textarea1.length > 4000) newErrors['textarea1'] = 'Max 4000 chars';

    setErrors(newErrors);

    // Highlight Accordion error if any field inside it is invalid
    setActiveIndexErrors([Object.keys(newErrors).length > 0]);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log('Submitting', data);
      // send API call here
    }
  };

//   const onChange = (key: string, value: any) => {
//     setData(prev => ({ ...prev, [key]: value }));
//     setErrors(prev => ({ ...prev, [key]: '' }));
//   };
const onChange = (key: keyof typeof data, value: string) => {
  setData(prev => ({ ...prev, [key]: value }));
  setErrors(prev => ({ ...prev, [key]: '' }));
};
  return (
    <Accordion activeIndex={activeIndexErrors[0] ? 0 : undefined}>
      <AccordionTab header="Form" className={activeIndexErrors[0] ? 'p-accordion-header-invalid' : ''}>
        <div className="grid">
          <div className="col-4">
            <label>Field 1*</label>
            <InputText
              value={data.field1}
              onChange={e => onChange('field1', e.target.value)}
              className={errors.field1 ? 'p-invalid' : ''}
            />
            {errors.field1 && <small className="p-error">{errors.field1}</small>}
          </div>
          <div className="col-4">
            <label>Field 2*</label>
            <InputText
              value={data.field2}
              onChange={e => onChange('field2', e.target.value)}
              className={errors.field2 ? 'p-invalid' : ''}
            />
            {errors.field2 && <small className="p-error">{errors.field2}</small>}
          </div>
          <div className="col-4">
            <label>Dropdown*</label>
            <Dropdown
              value={data.dropdown1}
              options={options1}
              onChange={e => onChange('dropdown1', e.value)}
              placeholder="Select"
              className={errors.dropdown1 ? 'p-invalid' : ''}
            />
            {errors.dropdown1 && <small className="p-error">{errors.dropdown1}</small>}
          </div>
          <div className="col-12">
            <label>Comments*</label>
            <InputTextarea
              value={data.textarea1}
              onChange={e => onChange('textarea1', e.target.value)}
              rows={5}
              className={errors.textarea1 ? 'p-invalid' : ''}
            />
            {errors.textarea1 && <small className="p-error">{errors.textarea1}</small>}
          </div>
        </div>
        <div className="mt-4">
          <Button label="Submit" onClick={handleSubmit} />
        </div>
      </AccordionTab>
    </Accordion>
  );
}
