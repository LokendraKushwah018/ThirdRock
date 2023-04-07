import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AddEmployees } from '../service/employService';

const IntroForm = ({ completePersonalDetailForm }) => {

    const [startDate, setStartDate] = useState(new Date());
    const [ResidentialAddrressPeriod, setResidentialAddrressPeriod] = useState(new Date());
    const [PreviousAddressPeriod, setPreviousAddressPeriod] = useState(new Date());
    const [DOB, setDOB] = useState(new Date());
    const [CurrentEmployerPeriod, setCurrentEmployerPeriod] = useState(new Date());
    const [PreviousEmployerPeriod, setPreviousEmployerPeriod] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        const date = new Date(startDate);
        const WorkingSinceDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        AddForm.setValues({
            ...AddForm.values,
            Residential_Addrress_Period: ResidentialAddrressPeriod,
            Previous_Address_Period: PreviousAddressPeriod,
            DOB: DOB,
            Current_Employer_Period: CurrentEmployerPeriod,
            Previous_Employer_Period: PreviousEmployerPeriod
        });
    }, [ResidentialAddrressPeriod, PreviousAddressPeriod, DOB, CurrentEmployerPeriod, PreviousEmployerPeriod]);

    const AddForm = useFormik({

        initialValues: {
            Prefix: "Mr.",
            First: "",
            Middle: "",
            Last: "",
            Residential_Addrress: "",
            Residential_Addrress_Period: "",
            FNPF: "",
            TIN: "",
            Previous_Address: "",
            Previous_Address_Period: "",
            Postal_Address: "",
            Personal_Email: "",
            Work_Email: "",
            Mobile: "",
            Telephon_H: "",
            Telephon_W: "",
            Age: "",
            DOB: "",
            Marital_status: "single",
            Dependent_No: "",
            Occupation: "",
            Current_Employer: "",
            Current_Employer_Addrress: "",
            Current_Employer_Period: "",
            Previous_Employer: "",
            Previous_Employer_Addrress: "",
            Previous_Employer_Period: "",
            Own_House_Estimated_Value: "",
            Mortgage_With: "",
            Monthly_Payment: "",
            Mortgage_Balance: "",
            If_Not_Living_In_Own_House: "true",
            Bank_Name: "",
            Branch: "",
            Account_Name: "",
            Account_No: "",
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            Prefix: yup.string().required('Please select Name Prefix'),
            First: yup.string().required('Please Enter First Name'),
            Middle: yup.string().required('Please Enter Middle Name'),
            Last: yup.string().required('Please Enter Last Name'),
            Residential_Addrress: yup.string().required('Please Enter Residential Addrress'),
            Residential_Addrress_Period: yup.string().required('Please Select Date'),
            FNPF: yup.string().required('Please Enter FNPF'),
            TIN: yup.string().required('Please Enter TIN'),
            // Previous_Address: yup.string().required('Please Enter Previous Address'),
            Previous_Address: yup.string(),
            // Previous_Address_Period: yup.string().required('Please Select Date'),
            Previous_Address_Period: yup.string(),
            Postal_Address: yup.string().required('Please Enter Postal Address'),
            Personal_Email: yup.string().email("Invalid email address format").required('Please enter valid email address'),
            Work_Email: yup.string().email("Invalid email address format").required('Please enter valid email address'),
            Mobile: yup.string().required('Please Enter Mobile No.'),
            // Telephon_H: yup.string().required('Please Enter Telephon No.'),
            Telephon_H: yup.string(),
            Telephon_W: yup.string().required('Please Enter Telephon No.'),
            Age: yup.number().required('Please Enter Your Age'),
            DOB: yup.string().required('Please Enter Your DOB'),
            Marital_status: yup.string().required('Please Select Your Marital status'),
            Dependent_No: yup.number(),
            Occupation: yup.string().required('Please Enter Occupation'),
            Current_Employer: yup.string().required('Please Enter Current Employer Name'),
            Current_Employer_Addrress: yup.string().required('Please Enter Current Employer Addrress'),
            Current_Employer_Period: yup.string().required('Please Select Date'),
            Previous_Employer: yup.string(),
            Previous_Employer_Addrress: yup.string(),
            Previous_Employer_Period: yup.string(),
            Own_House_Estimated_Value: yup.string(),
            Mortgage_With: yup.string(),
            Monthly_Payment: yup.string(),
            Mortgage_Balance: yup.string(),
            If_Not_Living_In_Own_House: yup.string(),
            Bank_Name: yup.string().required('Please Enter Bank Name'),
            Branch: yup.string().required('Please Enter Branch'),
            Account_Name: yup.string().required('Please Enter Account Name'),
            Account_No: yup.string().required('Please Enter Account No.'),
        }),
        onSubmit: async values => {
            console.table(values);
            localStorage.setItem("AddForm_PersonalData", JSON.stringify(values));
            completePersonalDetailForm();
            // const employer_id = JSON.parse(localStorage.getItem("employer"))
            // const data = JSON.stringify({ ...values });
            // const response = await AddEmployees(data, employer_id.employer_token)
            // if (response.status === 200) {
            //     console.log('inside tanmay', response);
            //     toast.success(response.message);
            //     navigate('/employer/employees')
            // } else {
            //     console.log('inside tanmay', response);
            //     toast.success(response.message);
            // }
        }
    });

    const handleChangeQueryBuilder = e => {
        const { name, value } = e.target;
        AddForm.setValues({
            ...AddForm.values,
            [name]: value.trim()
        })
    };

    const savePersonalData = () => {
        localStorage.setItem("AddForm_PersonalData", JSON.stringify(AddForm.values));
        navigate(-1);
    }

    
    useEffect(() => {
        const Get_PersonalData = JSON.parse(localStorage.getItem("AddForm_PersonalData"));
        console.log("🚀 ~ file: introForm.js:149 ~ useEffect ~ Get_PersonalData:", Get_PersonalData)
        if (Get_PersonalData && Get_PersonalData != null) {
            console.log(Get_PersonalData);
            AddForm.setValues({
                ...AddForm.values,
                ...Get_PersonalData
            });
        }
    }, []);


    return (
        <>

            <div className="main-container container-fluid px-0">
                <div className="page-header">
                    <div className="page-leftheader">
                        <h4 className="page-title mb-0 text-primary">Employee's Personal Details</h4>
                    </div>
                </div>

                <form className="mt-5 ms-5 row" id='registerForm' onSubmit={AddForm.handleSubmit}>

                    <div className="row">

                        <div className="col-xl-3 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Prefix</label>
                                <div className="row g-xs">
                                    <div className="wd-200 mg-b-30">
                                        <div className="input-group">
                                            <select className="form-control mb-0" name="Prefix" {...AddForm.getFieldProps("Prefix")} onChange={(e) => handleChangeQueryBuilder(e)}>
                                                <option value="Mr.">Mr.</option>
                                                <option value="Mrs.">Mrs.</option>
                                            </select>
                                        </div>
                                        {AddForm.touched.Prefix && AddForm.errors.Prefix ?
                                            <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Prefix}</div> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">First</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" name='First' placeholder="Enter Your First Name" {...AddForm.getFieldProps("First")} />
                                    </div>
                                    {AddForm.touched.First && AddForm.errors.First ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.First}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Middle</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" name='Middle' placeholder="Enter Your Middle Name" {...AddForm.getFieldProps("Middle")} />
                                    </div>
                                    {AddForm.touched.Middle && AddForm.errors.Middle ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Middle}</div> : ''}
                                </div>
                            </div>
                        </div>


                        <div className="col-xl-3 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Last</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" name='Last' placeholder="Enter Your Last Name" {...AddForm.getFieldProps("Last")} />
                                    </div>
                                    {AddForm.touched.Last && AddForm.errors.Last ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Last}</div> : ''}
                                </div>
                            </div>
                        </div>



                    </div>

                    <div className="row">

                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Residential Addrress</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" name='Residential_Addrress' placeholder="Enter Your Residential Addrress" {...AddForm.getFieldProps("Residential_Addrress")} />
                                    </div>
                                    {AddForm.touched.Residential_Addrress && AddForm.errors.Residential_Addrress ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Residential_Addrress}</div> : ''}
                                </div>
                            </div>
                        </div>


                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Period</label>
                                <div className="row g-xs">
                                    <div className="wd-200 mg-b-30">
                                        <div className="input-group">
                                            <DatePicker className="form-control fc-datepicker hasDatepicker" selected={ResidentialAddrressPeriod} maxDate={Date.now()} onChange={(date) => setResidentialAddrressPeriod(date)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">FNPF</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" name='FNPF' placeholder="Enter FNPF" {...AddForm.getFieldProps("FNPF")} />
                                    </div>
                                    {AddForm.touched.FNPF && AddForm.errors.FNPF ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.FNPF}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">TIN</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" name='TIN' placeholder="Enter TIN" {...AddForm.getFieldProps("TIN")} />
                                    </div>
                                    {AddForm.touched.TIN && AddForm.errors.TIN ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.TIN}</div> : ''}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Previous Address</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" name='Previous_Address' placeholder="Enter Previous Address" {...AddForm.getFieldProps("Previous_Address")} />
                                    </div>
                                    {AddForm.touched.Previous_Address && AddForm.errors.Previous_Address ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Previous_Address}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Period</label>
                                <div className="row g-xs">
                                    <div className="wd-200 mg-b-30">
                                        <div className="input-group">
                                            <DatePicker className="form-control fc-datepicker hasDatepicker" selected={PreviousAddressPeriod} maxDate={Date.now()} onChange={(date) => setPreviousAddressPeriod(date)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Postal Address</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter Postal Address" {...AddForm.getFieldProps("Postal_Address")} />
                                    </div>
                                    {AddForm.touched.Postal_Address && AddForm.errors.Postal_Address ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Postal_Address}</div> : ''}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Personal Email</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter Personal Email" {...AddForm.getFieldProps("Personal_Email")} />
                                    </div>
                                    {AddForm.touched.Personal_Email && AddForm.errors.Personal_Email ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Personal_Email}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Work Email</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter Work Email" {...AddForm.getFieldProps("Work_Email")} />
                                    </div>
                                    {AddForm.touched.Work_Email && AddForm.errors.Work_Email ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Work_Email}</div> : ''}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-4 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Mobile</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter Mobile No." {...AddForm.getFieldProps("Mobile")} />
                                    </div>
                                    {AddForm.touched.Mobile && AddForm.errors.Mobile ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Mobile}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-4 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Telephone(H)</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter Telephone No." {...AddForm.getFieldProps("Telephon_H")} />
                                    </div>
                                    {AddForm.touched.Telephon_H && AddForm.errors.Telephon_H ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Telephon_H}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-4 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Telephone(w)</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter Telephone No." {...AddForm.getFieldProps("Telephon_W")} />
                                    </div>
                                    {AddForm.touched.Telephon_W && AddForm.errors.Telephon_W ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Telephon_W}</div> : ''}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-3 col-lg-3 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Age</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter Your Age." {...AddForm.getFieldProps("Age")} />
                                    </div>
                                    {AddForm.touched.Age && AddForm.errors.Age ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Age}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-3 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Date Of Birth</label>
                                <div className="row g-xs">
                                    <div className="wd-200 mg-b-30">
                                        <div className="input-group">
                                            <DatePicker className="form-control fc-datepicker hasDatepicker" selected={DOB} maxDate={Date.now()} onChange={(date) => setDOB(date)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-3 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Marital status </label>
                                <div className="row g-xs">
                                    <div className="wd-200 mg-b-30">
                                        <div className="input-group">
                                            <select className="form-control mb-0" name="Marital_status" {...AddForm.getFieldProps("Marital_status")} onChange={(e) => handleChangeQueryBuilder(e)}>
                                                <option value="single">Single</option>
                                                <option value="married">Married</option>
                                            </select>
                                        </div>
                                        {AddForm.touched.Marital_status && AddForm.errors.Marital_status ?
                                            <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Marital_status}</div> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-3 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Dependent(No.)</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter No." {...AddForm.getFieldProps("Dependent_No")} />
                                    </div>
                                    {AddForm.touched.Dependent_No && AddForm.errors.Dependent_No ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Dependent_No}</div> : ''}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Occupation</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Occupation" {...AddForm.getFieldProps("Occupation")} />
                                    </div>
                                    {AddForm.touched.Occupation && AddForm.errors.Occupation ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Occupation}</div> : ''}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-4 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Current Employer</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Current Employer" {...AddForm.getFieldProps("Current_Employer")} />
                                    </div>
                                    {AddForm.touched.Current_Employer && AddForm.errors.Current_Employer ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Current_Employer}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-4 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Addrress</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter Addrress" {...AddForm.getFieldProps("Current_Employer_Addrress")} />
                                    </div>
                                    {AddForm.touched.Current_Employer_Addrress && AddForm.errors.Current_Employer_Addrress ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Current_Employer_Addrress}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-4 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Period</label>
                                <div className="row g-xs">
                                    <div className="wd-200 mg-b-30">
                                        <div className="input-group">
                                            <DatePicker className="form-control fc-datepicker hasDatepicker" selected={CurrentEmployerPeriod} maxDate={Date.now()} onChange={(date) => setCurrentEmployerPeriod(date)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-4 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Previous Employer</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Previous Employer" {...AddForm.getFieldProps("Previous_Employer")} />
                                    </div>
                                    {AddForm.touched.Previous_Employer && AddForm.errors.Previous_Employer ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Previous_Employer}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-4 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Addrress</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter Addrress" {...AddForm.getFieldProps("Previous_Employer_Addrress")} />
                                    </div>
                                    {AddForm.touched.Previous_Employer_Addrress && AddForm.errors.Previous_Employer_Addrress ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Previous_Employer_Addrress}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-4 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Period</label>
                                <div className="row g-xs">
                                    <div className="wd-200 mg-b-30">
                                        <div className="input-group">
                                            <DatePicker className="form-control fc-datepicker hasDatepicker" selected={PreviousEmployerPeriod} maxDate={Date.now()} onChange={(date) => setPreviousEmployerPeriod(date)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-4 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Own House Estimated Value</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter Own House Estimated Value" {...AddForm.getFieldProps("Own_House_Estimated_Value")} />
                                    </div>
                                    {AddForm.touched.Own_House_Estimated_Value && AddForm.errors.Own_House_Estimated_Value ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Own_House_Estimated_Value}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-4 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Mortgage With</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Mortgage With" {...AddForm.getFieldProps("Mortgage_With")} />
                                    </div>
                                    {AddForm.touched.Mortgage_With && AddForm.errors.Mortgage_With ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Mortgage_With}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-4 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Monthly Payment</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter Monthly Payment" {...AddForm.getFieldProps("Monthly_Payment")} />
                                    </div>
                                    {AddForm.touched.Monthly_Payment && AddForm.errors.Monthly_Payment ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Monthly_Payment}</div> : ''}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">

                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Mortgage Balance</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter Mortgage Balance" {...AddForm.getFieldProps("Mortgage_Balance")} />
                                    </div>
                                    {AddForm.touched.Mortgage_Balance && AddForm.errors.Mortgage_Balance ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Mortgage_Balance}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">If Not Living In Own House</label>
                                <div className="row g-xs">
                                    <div className="wd-200 mg-b-30">
                                        <div className="input-group">
                                            <select className="form-control mb-0" name="If_Not_Living_In_Own_House" {...AddForm.getFieldProps("If_Not_Living_In_Own_House")} onChange={(e) => handleChangeQueryBuilder(e)}>
                                                <option value={true}>Yes</option>
                                                <option value={false}>No</option>
                                            </select>
                                        </div>
                                        {AddForm.touched.If_Not_Living_In_Own_House && AddForm.errors.If_Not_Living_In_Own_House ?
                                            <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.If_Not_Living_In_Own_House}</div> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="row">

                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Bank Name</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter Account Name" {...AddForm.getFieldProps("Bank_Name")} />
                                    </div>
                                    {AddForm.touched.Bank_Name && AddForm.errors.Bank_Name ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Bank_Name}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Branch</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter Account No." {...AddForm.getFieldProps("Branch")} />
                                    </div>
                                    {AddForm.touched.Branch && AddForm.errors.Branch ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Branch}</div> : ''}
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="row">

                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Account Name</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter Account Name" {...AddForm.getFieldProps("Account_Name")} />
                                    </div>
                                    {AddForm.touched.Account_Name && AddForm.errors.Account_Name ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Account_Name}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Account No.</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter Account No." {...AddForm.getFieldProps("Account_No")} />
                                    </div>
                                    {AddForm.touched.Account_No && AddForm.errors.Account_No ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Account_No}</div> : ''}
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="col-12 mt-2 mb-5">
                        <div className="row">
                            <div className="col-2">
                                <input type="submit" name="next" className="next action-button apply-now-btn ml-00 mt-1" value="Continue" />
                            </div>
                            <div className="col-2 mt-2">
                                <Link to="" onClick={() => savePersonalData()} className='Save_continue_btn'>Save & continue later</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default IntroForm