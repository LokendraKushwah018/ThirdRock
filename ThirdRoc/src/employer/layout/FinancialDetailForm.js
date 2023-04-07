import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AddEmployees } from '../service/employService';
import Form from 'react-bootstrap/Form';
import FormDropDown from './FormDropDown';

const FinancialDetailForm = ({ previousFinancialDetailForm, completeFinancialDetailForm }) => {
    const navigate = useNavigate();
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


    const FinancialForm = useFormik({

        initialValues: {
            Annual_Salary: "",
            Other_Income: "",
            Total_Monthly_Income: "",
            Rest: "",
            Electricity: "",
            Telephone: "",
            Water: "",
            House_Keeping: "",
            School_Fees: "",
            Travelling_Petrol_Bus: "",
            Entertainment_Video: "",
            Total_Hire_Purchase_Payments: "",
            Life_Insurance: "",
            Home_Loan: "",
            Other_Loan_Payments: "",
            Total_Outgoings: "",
            House_Value: "",
            Car_Value: "",
            Land_Value: "",
            Life_Policies: "",
            Debtors: "",
            Parsonal_Effects: "",
            Cash_At_Bank: "",
            Cash_On_Hand: "",
            Total_Asset: "",
            Mortgage_Loan_Balance: "",
            Total_Other_Loans_Balance: "",
            Credit_Cards: "",
            Liabilities: "",
            Hire_Purchase_Balance: "",
            Total_Liabilities: "",

            Legal_proceedings: "",
            Declared_Bankrupt: "",
            Consent: "",
            Signature: "",
            RecentPayslips: "",
            PhotoID: "",
            LetterEmployementConfirmation: "",
            TINLetter: "",
            LoanStatements: "",
            BankStatements: "",
            OtherProofDoc: "",
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            Annual_Salary: yup.number().required('Please Enter Annual Salary'),
            Other_Income: yup.number().required('Please Enter Other Income'),
            Total_Monthly_Income: yup.number().required('Please Enter Total Monthly Income'),
            Rest: yup.number().required('Please Enter Rest Charge'),
            Electricity: yup.number().required('Please Enter Electricity Charge'),
            Telephone: yup.number().required('Please Enter Telephone Charge'),
            Water: yup.number().required('Please Enter Water Charge'),
            House_Keeping: yup.number().required('Please Enter House Keeping'),
            School_Fees: yup.number().required('Please Enter School Fees'),
            Travelling_Petrol_Bus: yup.number().required('Please Enter Travelling/Petrol/Bus Charge'),
            Entertainment_Video: yup.number().required('Please Enter Entertainment/Video Charge'),
            Total_Hire_Purchase_Payments: yup.number().required('Please Enter Total Hire Purchase Payments'),
            Life_Insurance: yup.number().required('Please Enter Life Insurance'),
            Home_Loan: yup.number().required('Please Enter Home Loan'),
            Other_Loan_Payments: yup.number().required('Please Enter Other Loan Payments'),
            Total_Outgoings: yup.number().required('Please Enter Total Outgoings'),
            House_Value: yup.number().required('Please Enter House Value'),
            Car_Value: yup.number().required('Please Enter Car Value'),
            Land_Value: yup.number().required('Please Enter Land Value'),
            Life_Policies: yup.number().required('Please Enter Life Policies'),
            Debtors: yup.number().required('Please Enter Debtors'),
            Parsonal_Effects: yup.number().required('Please Enter Parsonal Effects'),
            Cash_At_Bank: yup.number().required('Please Enter Cash At Bank'),
            Cash_On_Hand: yup.number().required('Please Enter Cash On Hand'),
            Total_Asset: yup.number().required('Please Enter Total Asset'),
            Mortgage_Loan_Balance: yup.number().required('Please Enter Mortgage Loan Balance'),
            Total_Other_Loans_Balance: yup.number().required('Please Enter Total Other Loans Balance'),
            Credit_Cards: yup.number().required('Please Enter Credit Cards'),
            Liabilities: yup.number().required('Please Enter Liabilities'),
            Hire_Purchase_Balance: yup.number().required('Please Enter Hire Purchase Balance'),
            Total_Liabilities: yup.number().required('Please Enter Total Liabilities'),
            Legal_proceedings: yup.string().required('This fields is required.'),
            Declared_Bankrupt: yup.string().required('This fields is required.'),
            Consent: yup.string().required('This fields is required.'),
            Signature: yup.array().required('Signature is required.'),
            RecentPayslips: yup.array().required('Recent Payslips is required.'),
            PhotoID: yup.array().required('Photo ID,s is required.'),
            LetterEmployementConfirmation: yup.array().required('Letter Employement Confirmation is required.'),
            TINLetter: yup.array().required('TIN Letter is required.'),
            LoanStatements: yup.array().required('Loan Statements is required.'),
            BankStatements: yup.array().required('Bank Statements is required.'),
            OtherProofDoc: yup.array().required('Proof Documents is required.'),
        }),

        onSubmit: async values => {
            console.table(values);
            localStorage.setItem("FinancialForm_Data", JSON.stringify(values));
            completeFinancialDetailForm();
            navigate(-1);

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
        FinancialForm.setValues({
            ...FinancialForm.values,
            [name]: value.trim()
        })
    };

    const saveFinancialData = () => {
        localStorage.setItem("FinancialForm_Data", JSON.stringify(FinancialForm.values));
        navigate(-1);
    }

    const Signature = (data) => {
        FinancialForm.setValues({
            ...FinancialForm.values,
            Signature: [...data]
        })
    }

    const GetRecentPayslips = (data) => {
        FinancialForm.setValues({
            ...FinancialForm.values,
            RecentPayslips: [...data]
        })
    }

    const PhotoID = (data) => {
        FinancialForm.setValues({
            ...FinancialForm.values,
            PhotoID: [...data]
        })
    }

    const LetterEmployementConfirmation = (data) => {
        FinancialForm.setValues({
            ...FinancialForm.values,
            LetterEmployementConfirmation: [...data]
        })
    }

    const TINLetter = (data) => {
        FinancialForm.setValues({
            ...FinancialForm.values,
            TINLetter: [...data]
        })
    }

    const LoanStatements = (data) => {
        FinancialForm.setValues({
            ...FinancialForm.values,
            LoanStatements: [...data]
        })
    }

    const BankStatements = (data) => {
        FinancialForm.setValues({
            ...FinancialForm.values,
            BankStatements: [...data]
        })
    }

    const OtherProofDoc = (data) => {
        FinancialForm.setValues({
            ...FinancialForm.values,
            OtherProofDoc: [...data]
        })
    }



    console.log(Object.keys(FinancialForm.errors).length);
    useEffect(() => {
        const Get_FinancialForm_Data = JSON.parse(localStorage.getItem("FinancialForm_Data"));
        if (Get_FinancialForm_Data && Get_FinancialForm_Data != null) {
            FinancialForm.setValues({
                ...FinancialForm.values,
                ...Get_FinancialForm_Data
            });
        }
        if (Object.keys(FinancialForm.errors).length > 0) {
            console.log("🚀 ~ file: FinancialDetailForm.js:213 ~ useEffect ~ FinancialForm.errors:", FinancialForm.errors)
            toast.error(Object.values(FinancialForm.errors)[0]);
        }
    }, []);


    return (
        <>
            <div className="main-container container-fluid px-0">
                <div className="page-header">
                    <div className="page-leftheader">
                        <h4 className="page-title mb-0 text-primary">Financial Detail's</h4>
                    </div>
                </div>

                <form className="mt-5 ms-5 row" id='registerForm' onSubmit={FinancialForm.handleSubmit}>

                    <div className="row">

                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <h6 className="page-title mb-0 text-primary">Living Expenses</h6>
                            <div className="row">

                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">Annual Salary</label>
                                        <div className="row g-xs">
                                            <div className="wd-200 mg-b-30">
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Enter Annual Salary" {...FinancialForm.getFieldProps("Annual_Salary")} />
                                                </div>
                                                {FinancialForm.touched.Annual_Salary && FinancialForm.errors.Annual_Salary ?
                                                    <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Annual_Salary}</div> : ''}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">Other Income</label>
                                        <div className="row g-xs">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Other Income" {...FinancialForm.getFieldProps("Other_Income")} />
                                            </div>
                                            {FinancialForm.touched.Other_Income && FinancialForm.errors.Other_Income ?
                                                <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Other_Income}</div> : ''}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">Total Monthly Income</label>
                                        <div className="row g-xs">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="$0.00" {...FinancialForm.getFieldProps("Total_Monthly_Income")} />
                                            </div>
                                            {FinancialForm.touched.Total_Monthly_Income && FinancialForm.errors.Total_Monthly_Income ?
                                                <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Total_Monthly_Income}</div> : ''}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <h6 className="page-title mb-0 text-primary">Monthly Living Cost</h6>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">Rest</label>
                                        <div className="row g-xs">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Enter Rest Charge" {...FinancialForm.getFieldProps("Rest")} />
                                            </div>
                                            {FinancialForm.touched.Rest && FinancialForm.errors.Rest ?
                                                <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Rest}</div> : ''}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">Electricity</label>
                                        <div className="row g-xs">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Enter Electricity Charge" {...FinancialForm.getFieldProps("Electricity")} />
                                            </div>
                                            {FinancialForm.touched.Electricity && FinancialForm.errors.Electricity ?
                                                <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Electricity}</div> : ''}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">Telephone</label>
                                        <div className="row g-xs">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Enter Telephone Charge" {...FinancialForm.getFieldProps("Telephone")} />
                                            </div>
                                            {FinancialForm.touched.Telephone && FinancialForm.errors.Telephone ?
                                                <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Telephone}</div> : ''}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">Water</label>
                                        <div className="row g-xs">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Enter Water Charge" {...FinancialForm.getFieldProps("Water")} />
                                            </div>
                                            {FinancialForm.touched.Water && FinancialForm.errors.Water ?
                                                <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Water}</div> : ''}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">House Keeping</label>
                                        <div className="row g-xs">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="House Keeping" {...FinancialForm.getFieldProps("House_Keeping")} />
                                            </div>
                                            {FinancialForm.touched.House_Keeping && FinancialForm.errors.House_Keeping ?
                                                <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.House_Keeping}</div> : ''}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">School Fees</label>
                                        <div className="row g-xs">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Enter School Fees" {...FinancialForm.getFieldProps("School_Fees")} />
                                            </div>
                                            {FinancialForm.touched.School_Fees && FinancialForm.errors.School_Fees ?
                                                <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.School_Fees}</div> : ''}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">Travelling/Petrol/Bus</label>
                                        <div className="row g-xs">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Enter Total Travelling/Petrol/Bus Charge" {...FinancialForm.getFieldProps("Travelling_Petrol_Bus")} />
                                            </div>
                                            {FinancialForm.touched.Travelling_Petrol_Bus && FinancialForm.errors.Travelling_Petrol_Bus ?
                                                <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Travelling_Petrol_Bus}</div> : ''}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">Entertainment/Video</label>
                                        <div className="row g-xs">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Enter Your Entertainment/Video Charge" {...FinancialForm.getFieldProps("Entertainment_Video")} />
                                            </div>
                                            {FinancialForm.touched.Entertainment_Video && FinancialForm.errors.Entertainment_Video ?
                                                <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Entertainment_Video}</div> : ''}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">Total Hire Purchase Payments</label>
                                        <div className="row g-xs">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Enter Total Hire Purchase Payments" {...FinancialForm.getFieldProps("Total_Hire_Purchase_Payments")} />
                                            </div>
                                            {FinancialForm.touched.Total_Hire_Purchase_Payments && FinancialForm.errors.Total_Hire_Purchase_Payments ?
                                                <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Total_Hire_Purchase_Payments}</div> : ''}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">Life Insurance</label>
                                        <div className="row g-xs">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Life Insurance" {...FinancialForm.getFieldProps("Life_Insurance")} />
                                            </div>
                                            {FinancialForm.touched.Life_Insurance && FinancialForm.errors.Life_Insurance ?
                                                <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Life_Insurance}</div> : ''}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">Home Loan</label>
                                        <div className="row g-xs">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Home Loan" {...FinancialForm.getFieldProps("Home_Loan")} />
                                            </div>
                                            {FinancialForm.touched.Home_Loan && FinancialForm.errors.Home_Loan ?
                                                <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Home_Loan}</div> : ''}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">Other Loan Payments</label>
                                        <div className="row g-xs">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Enter Your Other Loan Payments" {...FinancialForm.getFieldProps("Other_Loan_Payments")} />
                                            </div>
                                            {FinancialForm.touched.Other_Loan_Payments && FinancialForm.errors.Other_Loan_Payments ?
                                                <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Other_Loan_Payments}</div> : ''}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">Total Outgoings</label>
                                        <div className="row g-xs">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="$0.00" {...FinancialForm.getFieldProps("Total_Outgoings")} />
                                            </div>
                                            {FinancialForm.touched.Total_Outgoings && FinancialForm.errors.Total_Outgoings ?
                                                <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Total_Outgoings}</div> : ''}
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <h6 className="page-title mb-0 text-primary">Asset Position</h6>
                            <div className="row">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">House Value</label>
                                        <div className="row g-xs">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Enter House Value" {...FinancialForm.getFieldProps("House_Value")} />
                                            </div>
                                            {FinancialForm.touched.House_Value && FinancialForm.errors.House_Value ?
                                                <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.House_Value}</div> : ''}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">Car Value</label>
                                        <div className="row g-xs">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Enter Car Value" {...FinancialForm.getFieldProps("Car_Value")} />
                                            </div>
                                            {FinancialForm.touched.Car_Value && FinancialForm.errors.Car_Value ?
                                                <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Car_Value}</div> : ''}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">Land Value</label>
                                        <div className="row g-xs">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Enter Land Value" {...FinancialForm.getFieldProps("Land_Value")} />
                                            </div>
                                            {FinancialForm.touched.Land_Value && FinancialForm.errors.Land_Value ?
                                                <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Land_Value}</div> : ''}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">Life Policies</label>
                                        <div className="row g-xs">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Enter Life Policies" {...FinancialForm.getFieldProps("Life_Policies")} />
                                            </div>
                                            {FinancialForm.touched.Life_Policies && FinancialForm.errors.Life_Policies ?
                                                <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Life_Policies}</div> : ''}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">Debtors</label>
                                        <div className="row g-xs">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Enter Debtors" {...FinancialForm.getFieldProps("Debtors")} />
                                            </div>
                                            {FinancialForm.touched.Debtors && FinancialForm.errors.Debtors ?
                                                <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Debtors}</div> : ''}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">Parsonal Effects</label>
                                        <div className="row g-xs">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Enter Parsonal Effects" {...FinancialForm.getFieldProps("Parsonal_Effects")} />
                                            </div>
                                            {FinancialForm.touched.Parsonal_Effects && FinancialForm.errors.Parsonal_Effects ?
                                                <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Parsonal_Effects}</div> : ''}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">Cash At Bank</label>
                                        <div className="row g-xs">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Enter Your Cash At Bank" {...FinancialForm.getFieldProps("Cash_At_Bank")} />
                                            </div>
                                            {FinancialForm.touched.Cash_At_Bank && FinancialForm.errors.Cash_At_Bank ?
                                                <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Cash_At_Bank}</div> : ''}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">Cash On Hand</label>
                                        <div className="row g-xs">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Enter Your Cash On Hand" {...FinancialForm.getFieldProps("Cash_On_Hand")} />
                                            </div>
                                            {FinancialForm.touched.Cash_On_Hand && FinancialForm.errors.Cash_On_Hand ?
                                                <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Cash_On_Hand}</div> : ''}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">Total Assets</label>
                                        <div className="row g-xs">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="$0.00" {...FinancialForm.getFieldProps("Total_Asset")} />
                                            </div>
                                            {FinancialForm.touched.Total_Asset && FinancialForm.errors.Total_Asset ?
                                                <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Total_Asset}</div> : ''}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <h6 className="page-title mb-0 text-primary">Liabilities</h6>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">Mortgage Loan Balance</label>
                                        <div className="row g-xs">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Enter Mortgage Loan Balance" {...FinancialForm.getFieldProps("Mortgage_Loan_Balance")} />
                                            </div>
                                            {FinancialForm.touched.Mortgage_Loan_Balance && FinancialForm.errors.Mortgage_Loan_Balance ?
                                                <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Mortgage_Loan_Balance}</div> : ''}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">Total Other Loans Balance</label>
                                        <div className="row g-xs">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Enter Total Other Loans Balance" {...FinancialForm.getFieldProps("Total_Other_Loans_Balance")} />
                                            </div>
                                            {FinancialForm.touched.Total_Other_Loans_Balance && FinancialForm.errors.Total_Other_Loans_Balance ?
                                                <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Total_Other_Loans_Balance}</div> : ''}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">Credit Cards</label>
                                        <div className="row g-xs">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Credit Cards" {...FinancialForm.getFieldProps("Credit_Cards")} />
                                            </div>
                                            {FinancialForm.touched.Credit_Cards && FinancialForm.errors.Credit_Cards ?
                                                <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Credit_Cards}</div> : ''}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">Liabilities</label>
                                        <div className="row g-xs">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Enter Liabilities" {...FinancialForm.getFieldProps("Liabilities")} />
                                            </div>
                                            {FinancialForm.touched.Liabilities && FinancialForm.errors.Liabilities ?
                                                <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Liabilities}</div> : ''}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">Hire Purchase Balance</label>
                                        <div className="row g-xs">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Enter Your Hire Purchase Balance" {...FinancialForm.getFieldProps("Hire_Purchase_Balance")} />
                                            </div>
                                            {FinancialForm.touched.Hire_Purchase_Balance && FinancialForm.errors.Hire_Purchase_Balance ?
                                                <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Hire_Purchase_Balance}</div> : ''}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                                    <div className="form-group">
                                        <label className="form-label">Total Liabilities</label>
                                        <div className="row g-xs">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="$0.00" {...FinancialForm.getFieldProps("Total_Liabilities")} />
                                            </div>
                                            {FinancialForm.touched.Total_Liabilities && FinancialForm.errors.Total_Liabilities ?
                                                <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Total_Liabilities}</div> : ''}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                    <hr />

                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Have you ever had legal proceedings against you for the recovery of a debt?</label>
                                <div className="row g-xs">
                                    <div className="wd-200 mg-b-30">
                                        <div className="input-group">
                                            <select className="form-control mb-0" name="Legal_proceedings" {...FinancialForm.getFieldProps("Legal_proceedings")} onChange={(e) => handleChangeQueryBuilder(e)}>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </div>
                                        {FinancialForm.touched.Legal_proceedings && FinancialForm.errors.Legal_proceedings ?
                                            <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Legal_proceedings}</div> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Have you ever been declared a bankrupt or hand bankruptcy proceedings against you?</label>
                                <div className="row g-xs">
                                    <div className="wd-200 mg-b-30">
                                        <div className="input-group">
                                            <select className="form-control mb-0" name="Declared_Bankrupt" {...FinancialForm.getFieldProps("Declared_Bankrupt")} onChange={(e) => handleChangeQueryBuilder(e)}>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </div>
                                        {FinancialForm.touched.Declared_Bankrupt && FinancialForm.errors.Declared_Bankrupt ?
                                            <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Declared_Bankrupt}</div> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Consent</label>
                                <div className="row g-xs">
                                    <div className="wd-200 mg-b-30">
                                        <div className="input-group">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="Yes" {...FinancialForm.getFieldProps("Consent")} id="flexCheckDefault" />
                                                <label className="form-check-label" for="flexCheckDefault">
                                                    I agree
                                                </label>
                                            </div>
                                        </div>
                                        {FinancialForm.touched.Consent && FinancialForm.errors.Consent ?
                                            <div className="invalid-feedback" style={{ display: "block" }}>{FinancialForm.errors.Consent}</div> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12 border mb-5 py-4 px-3">
                            <span>
                                1. I/We hereby consent to the release of credit information held by Merchant Finance Pte Limited to any Credit Reporting Agency and also authorize Merchant Finance Pte Limited to enquire with and to obtain credit information relating to me/us from any Credit Reporting Agency in relation to my credit facility. This authority is given by me/us and obtained by Merchant Finance Pte Limited pursuant to Regulation 9(6) of the Fair Reporting Regulation 2016.
                            </span>
                            <br /> <br />
                            <span>
                                2. I/We hereby declare that the information in this application for finance is true and accurate and Merchant Finance Pte Limited is authorized to carry out any further checks.
                            </span>

                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                            <label className="form-label">Signature</label>
                            <FormDropDown GetImg={Signature} />
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                            <label className="form-label">Two(2) most recent payslips</label>
                            <FormDropDown GetImg={GetRecentPayslips} />
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                            <label className="form-label">Two(2) valid photo ID,s</label>
                            <FormDropDown GetImg={PhotoID} />
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                            <label className="form-label">Letter of employement confirmation</label>
                            <FormDropDown GetImg={LetterEmployementConfirmation} />
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                            <label className="form-label">TIN letter / TIN</label>
                            <FormDropDown GetImg={TINLetter} />
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                            <label className="form-label">If any, 3 month statements of other loan or hire Purchase commitment</label>
                            <FormDropDown GetImg={LoanStatements} />
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                            <label className="form-label">Bank statements(letest 3 months)</label>
                            <FormDropDown GetImg={BankStatements} />
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                            <label className="form-label">Proof of othe income(if any)</label>
                            <FormDropDown GetImg={OtherProofDoc} />
                        </div>

                    </div>

                    <div className="col-12 my-3">
                        <div className="row">
                            <div className="col-2">
                                <button type="button"
                                    onClick={() => previousFinancialDetailForm()}
                                    className=" btn btn-outline-primary mb-6 w-md mb-1 mt-1"><i
                                        className="fa-solid fa-arrow-left-long fa-fw" ></i> Previous</button>
                            </div>
                            <div className="col-2">
                                <input type="submit" name="next" className="next action-button apply-now-btn ml-00 mt-1" value="Submit" />
                            </div>
                            <div className="col-2 mt-2">
                                <span className='Save_continue_btn' onClick={() => saveFinancialData()}>Save & continue later</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default FinancialDetailForm;