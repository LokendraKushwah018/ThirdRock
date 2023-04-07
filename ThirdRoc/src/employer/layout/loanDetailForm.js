import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AddEmployees } from '../service/employService';

const LoanDetailForm = ({ previousLoanDetailForm, completeLoanDetailForm }) => {
    const navigate = useNavigate();


    const LoanForm = useFormik({

        initialValues: {
            Loan_Purpose: "",
            Loan_Details: "",
            Loan_Term: "",
            Loan_Amount: "",
            Loan_Repayment: "",
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            Loan_Purpose: yup.string().required('Please select Loan Purpose'),
            Loan_Details: yup.string().required('Please Enter Loan Details'),
            Loan_Term: yup.string(),
            Loan_Amount: yup.string().required('Please Enter Loan Amount'),
            Loan_Repayment: yup.string(),
        }),
        onSubmit: async values => {
            console.table(values);
            completeLoanDetailForm()
            localStorage.setItem("AddForm_LoanDetailData", JSON.stringify(values));

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
        LoanForm.setValues({
            ...LoanForm.values,
            [name]: value.trim()
        })
    };

    const saveLoanDetailData = () => {
        localStorage.setItem("AddForm_LoanDetailData", JSON.stringify(LoanForm.values));
        navigate(-1);
    }

    useEffect(() => {
        const Get_LoanDetailData = JSON.parse(localStorage.getItem("AddForm_LoanDetailData"));
        console.log("🚀 ~ file: loanDetailForm.js:64 ~ useEffect ~ Get_LoanDetailData:", Get_LoanDetailData)
        if (Get_LoanDetailData && Get_LoanDetailData != null) {
            LoanForm.setValues({
                ...LoanForm.values,
                ...Get_LoanDetailData
            });
        }
    }, []);

    return (
        <>
            <div className="main-container container-fluid px-0">
                <div className="page-header">
                    <div className="page-leftheader">
                        <h4 className="page-title mb-0 text-primary">Employee's Loan Details</h4>
                    </div>
                </div>

                <form className="mt-5 ms-5 row" id='registerForm' onSubmit={LoanForm.handleSubmit}>

                    <div className="row">

                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Loan Purpose</label>
                                <div className="row g-xs">
                                    <div className="wd-200 mg-b-30">
                                        <div className="input-group">
                                            <select className="form-control mb-0" name="Loan_Purpose" {...LoanForm.getFieldProps("Loan_Purpose")} onChange={(e) => handleChangeQueryBuilder(e)}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                        </div>
                                        {LoanForm.touched.Loan_Purpose && LoanForm.errors.Loan_Purpose ?
                                            <div className="invalid-feedback" style={{ display: "block" }}>{LoanForm.errors.Loan_Purpose}</div> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Loan Details</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <textarea className="form-control" placeholder="Enter Loan Details" cols={5} rows="7" {...LoanForm.getFieldProps("Loan_Details")} />
                                    </div>
                                    {LoanForm.touched.Loan_Details && LoanForm.errors.Loan_Details ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{LoanForm.errors.Loan_Details}</div> : ''}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">

                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Loan Term(Months)</label>
                                <div className="row g-xs">
                                    <div className="wd-200 mg-b-30">
                                        <div className="input-group">
                                            <select className="form-control mb-0" name="Loan_Term" {...LoanForm.getFieldProps("Loan_Term")} onChange={(e) => handleChangeQueryBuilder(e)}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                            </select>
                                        </div>
                                        {LoanForm.touched.Loan_Term && LoanForm.errors.Loan_Term ?
                                            <div className="invalid-feedback" style={{ display: "block" }}>{LoanForm.errors.Loan_Term}</div> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Loan Amount</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter Loan Amount" cols={5} rows="7" {...LoanForm.getFieldProps("Loan_Amount")} />
                                    </div>
                                    {LoanForm.touched.Loan_Amount && LoanForm.errors.Loan_Amount ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{LoanForm.errors.Loan_Amount}</div> : ''}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">

                        <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Loan Repayment</label>
                                <div className="row g-xs">
                                    <div className="wd-200 mg-b-30">
                                        <div className="input-group">
                                            <select className="form-control mb-0" name="Loan_Repayment" {...LoanForm.getFieldProps("Loan_Repayment")} onChange={(e) => handleChangeQueryBuilder(e)}>
                                                <option value="Weekly">Weekly</option>
                                                <option value="Monthly">Monthly</option>
                                                <option value="Yearly">Yearly</option>
                                            </select>
                                        </div>
                                        {LoanForm.touched.Loan_Repayment && LoanForm.errors.Loan_Repayment ?
                                            <div className="invalid-feedback" style={{ display: "block" }}>{LoanForm.errors.Loan_Repayment}</div> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="row">
                            <div className="col-2">
                                <button type="button"
                                    onClick={() => previousLoanDetailForm()}
                                    className=" btn btn-outline-primary mb-6 w-md mb-1 mt-1"><i
                                        className="fa-solid fa-arrow-left-long fa-fw" ></i> Previous</button>
                            </div>
                            <div className="col-2">
                                <input type="submit" name="next" className="next action-button apply-now-btn ml-00 mt-1" value="Continue" />
                            </div>
                            <div className="col-2 mt-2">
                                <span className='Save_continue_btn' onClick={() => saveLoanDetailData()}>Save & continue later</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default LoanDetailForm