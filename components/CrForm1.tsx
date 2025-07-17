import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Calendar} from 'primereact/calendar';
import { Nullable } from "primereact/ts-helpers";
import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";
import { Accordion, AccordionTab } from 'primereact/accordion';
import { InputTextarea } from "primereact/inputtextarea";

//import { crService } from "../../services/crcreationService";
const optionsYesNo= [{label:'No',value:'no'},
    {label:'Yes',value:'yes'}
]

const typeOptions= [{label:'Normal',value:'normal'},
    {label:'Emergency',value:'emergency'}
]

const catgryOptions= [{label:'Hardware',value:'Hardware'},
    {label:'Software',value:'Software'},
    {label:'Service',value:'Service'},
    {label:'Telecom',value:'Telecom'},
    {label:'Network',value:'Network'},
    {label:'Corporate Real Estate',value:'Corporate Real Estate'},
    {label:'Data Center facilities',value:'Data Center facilities'},
    {label:'Informational',value:'Informational'},
]

const subTypeOptions= [{label:'None',value:'none'},
    {label:'Retro',value:'retro'},
    {label:'Major',value:'major'},
    {label:'Standalone',value:'Standalone'},
    {label:'DevOps',value:'DevOps'}
]

const optionsNone= [{label:'None',value:'none'},
    {label:'JIRA',value:'jira'},
    {label:'Release Note',value:'release note'},
    {label:'Other',value:'other'}
]
const envOptions= [{label:'UK-BO-Qlik',value:'UK-BO-Qlik'}]

const serverOptions= [{label:'DEV',value:'DEV'},
    {label:'UAT',value:'UAT'},
    {label:'PROD',value:'PROD'},
    {label:'PROD_NEW',value:'PROD_NEW'},
]

const FormField = ({
    id,
    label,
    tooltip,
    helpText,
    children
}: {
    id: string,
    label: string,
    tooltip: string,
    helpText: string,
    children: React.ReactNode
}) => (
    <div className="col-12 md:col-4">
        <label htmlFor={id} className="block font-medium mb-1">
            {label}
            {
			tooltip && (
                    <>
                        <i className="pi pi-question-circle ml-2" data-pr-tooltip={tooltip}></i>
                        <Tooltip target='.pi-question-circle'></Tooltip>
                    </>
                )
            }
        </label>
        <small className="block text-color-secondary mb-2">{helpText}</small>
        {children}
    </div>
)

const CRForm1: React.FC = () => {
    const [postTestDone, setPostTestDone] = useState('no')

    const [codeRevw, setCodeRevw] = useState('none')

    const [testEvd, setTestEvd] = useState('none')
    const [deployChk, setDeployChk] = useState('none')
    const [busApprvl, setBusApprvl] = useState('none')
    const [regTestM, setRegTestM] = useState('none')
    const [regTst, setRegTest] = useState('none')
    const [pStressTest, setPStresstest] = useState('none')
    const [environmnt, setEnvironmnt] = useState('')
    const [fromServr, setFromServr] = useState('')
    const [toServr, setToServr] = useState('')
    const [crNum, setCrNum] = useState('')
    const [impGrpNme, setImpGrpNme] = useState('')
    const [loading, setLoading] = useState(false);
    const [asgnmt, setAsgnmt] = useState('');
    const [appltn, setAppltn] = useState('');
    const [tick, setTick] = useState<Nullable<string>>(null);
    const [changeTy, setChangeTy] = useState<Nullable<string>>(null);
    const [changeSTy, setChangeSTy] = useState<Nullable<string>>(null);
    const [businessService, setBusinessService] = useState<Nullable<string>>(null);
    const [serviceOffering, setServiceOffering] = useState<Nullable<string>>(null);
    const [datetime24h, setDatetime24h] = useState<Nullable<Date>>(null);
    const [duration, setDuration] = useState<Nullable<string>>(null);
    const defaultStyle = "w-full";
    const [section2, setSection2] = useState(true);
    const [section3, setSection3] = useState(false);
    const [section4, setSection4] = useState(false);
    const [section5, setSection5] = useState(false);

    const handleSectionI = () => {
        if (asgnmt !== '' && appltn !== '' && tick !== null && changeTy !== null && changeSTy !== null
            && datetime24h !== null && duration !== null && businessService !== null && serviceOffering !== null)
            setSection2(false)
    }




    const handleFinalSubmit = () => {

        setLoading(true)

        const requestBody = {

            "assigned_to": "45341188@hsbc.com",

            "assignment_group": "HSBC-TEST",

            "backout_plan": "Implement a test backout plan",

            "business_service": "UDF",

            "category": "Network",

            "cmdb_ci": "test",

            "comments": "Created a test Change Request via API",

            "description": "Test Change Request via API",

            "end_date": "2024-07-20 11:00:00",

            "implementation_plan": "This is the implementation plan",

            "justification": "This Change request is required to test the API",

            "requestor": "45341188@hsbc.com",

            "risk_impact_analysis": "Risk impact analysis test",

            "service_offering": "UDF App Support",
            "short_description": "Test change request short description",

            "start_date": "2024-07-20 08:00:00",

            "state": "-5",

            "test_plan": "Test plan for test change request",

            "type": "normal",

            "u_backout_capability": "10",

            "u_backout_duration": "23",

            "u_nature_of_change": "20",

            "u_post_implementation_verification_capability": "10",

            "u_publicity_andor_regulatory_awareness": "20",

            "u_post_implementation_verification_capability_textbox": "test",

            "u_backout_capability_textbox": "test",

            "u_publicity_andor_regulatory_textbox": "This is the Publicity and Regulatory Textbox text",

            "u_technical_impact_details": "10",

            "u_change_purpose": "new_features"

        }

        // crService.createCRService(requestBody).then((response) => {

        //     if (response) {

        //         console.log(response)

        //         setLoading(false)

        //         console.log('response')

        //     }

        // })

        //     .catch((_error) => {

        //         console.log(_error);

        //         setLoading(false)

        //         //  setToastMessage({ severity: 'error', summary: 'Error', detail: constants.SENSE_REQUEST.SENSE_REQUEST_ERROR });

        //     });



    }

    return (
        <>
        <div className="surface-card p-4 border-round shawdow-1 w-full md:w12 mx auto">
            <Accordion activeIndex={0} multiple >
                <AccordionTab header="Section I: Change Request Details" >
                    <div className="p-fluid grid mt-4">
                        <FormField id="category" label="Category" tooltip="Ticket Reference format: GE - 1234" helpText="e.g. GE-1234">
                            <Dropdown id="category" options={catgryOptions} value={tick} onChange={(e: any) => setTick(e.value)} className={defaultStyle}></Dropdown>
                        </FormField>
                        <FormField id="changeType" label="Change Type" tooltip="Type of change" helpText="help text">
                            <Dropdown id="changeType" options={typeOptions} value={changeTy} onChange={(e: any) => setChangeTy(e.value)} className={defaultStyle}></Dropdown>
                        </FormField>
                        <FormField id="changeSubType" label="Change SubType" tooltip="SubType of change" helpText="help text">
                            <Dropdown id="changeSubType" options={subTypeOptions} value={changeSTy} onChange={(e: any) => setChangeSTy(e.value)} className={defaultStyle}></Dropdown>
                        </FormField>
                        <FormField id="businessService" label="Business Service" tooltip="Related Business Function" helpText="help text">
                            <InputText id="businessService" required placeholder='Business' value={businessService} onChange={(e: any) => setBusinessService(e.target.value)} className={defaultStyle}></InputText>
                        </FormField>
                        <FormField id="serviceOffering" label="Service Offering" tooltip="Associated service" helpText="help text">
                            <InputText id="serviceOffering" placeholder='Service' value={serviceOffering} onChange={(e: any) => setServiceOffering(e.target.value)} className={defaultStyle}></InputText>
                        </FormField>
                        

                    </div>
                    <div className="grid">
                        <div className="col-12 md:col-6">
                            <FormField id="appltn" label="Application" tooltip="Application Name" helpText="e.g. Application Name">
                                <InputText id="appltn" value={appltn} onChange={(e) => setAppltn(e.target.value)} className="w-full" />
                            </FormField>
                        </div>
                        <div className="col-12 md:col-6">
                            <FormField id="tick" label="Ticket Reference" tooltip="Ticket Reference format: GE - 1234" helpText="e.g. GE-1234">
                                <InputText id="tick" value={tick} onChange={(e) => setTick(e.target.value)} className="w-full" />
                            </FormField>
                        </div>
                        <div className="col-12 md:col-6">
                            <FormField id="datetime24h" label="Date and Time (24h)" tooltip="Select date and time" helpText="e.g. 2024-07-20 08:00:00">
                                <Calendar id="datetime24h" value={datetime24h} onChange={(e) => setDatetime24h(e.value)} showTime className="w-full" />
                            </FormField>
                        </div>
                        <div className="col-12 md:col-6">
                            <FormField id="duration" label="Duration" tooltip="Duration of the change" helpText="e.g. 2 hours">
                                <InputText id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full" />
                            </FormField>
                        </div>
                    </div>
                    <div className="grid">
                        <div className="col-4 txt-lbl-aln">
                            <label>Work Item IDs</label>
                        </div>
                        <div className="col-8">
                            <InputTextarea className={defaultStyle} rows={5} cols={30} />
                        </div>

                        <div className="col-12 md:col-6">
                            <FormField id="asgnmt" label="Assignment Group" tooltip="Group responsible for the change" helpText="e.g. HSBC-TEST">
                                <InputText id="asgnmt" value={asgnmt} onChange={(e) => setAsgnmt(e.target.value)} className="w-full" />
                            </FormField>
                        </div>
                        <div className="col-12 md:col-6">
                            <FormField id="crNum" label="CR Number" tooltip="Change Request Number" helpText="e.g. CR-1234">
                                <InputText id="crNum" value={crNum} onChange={(e) => setCrNum(e.target.value)} className="w-full" />
                            </FormField>
                        </div>
                        <div className="col-12 md:col-6">
                            <FormField id="impGrpNme" label="Implementation Group Name" tooltip="Group responsible for implementation" helpText="e.g. Implementation Group">
                                <InputText id="impGrpNme" value={impGrpNme} onChange={(e) => setImpGrpNme(e.target.value)} className="w-full" />
                            </FormField>
                        </div>
                        <div className="col-2 col-offset-10">
                            <button className="btn-hov p-button p-button-sm" onClick={handleSectionI}>Submit</button>
                        </div>
                    </div>
                </AccordionTab>
            </Accordion>
</div>
        </>
    )

}

export default CRForm1;