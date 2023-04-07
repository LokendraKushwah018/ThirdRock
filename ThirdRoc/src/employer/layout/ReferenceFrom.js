import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AddEmployees } from '../service/employService';

const ReferenceForm = ({ previousReferenceForm, completeReferenceForm }) => {
    const navigate = useNavigate();
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


    const ReferenceForm = useFormik({

        initialValues: {
            Name: "",
            Occupation: "",
            Address: "",
            Email: "",
            Relationship: "",
            Phone: "",
            Name1: "",
            Occupation1: "",
            Address1: "",
            Email1: "",
            Relationship1: "",
            Phone1: "",
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            Name: yup.string().required('Please Enter Your Name'),
            Occupation: yup.string().required('Please Enter Occupation'),
            Address: yup.string().required('Please Enter Occupation'),
            Email: yup.string().email("Invalid email address format").required('Please Enter Email'),
            Phone: yup.string().required('Please enter mobile number').matches(phoneRegExp, 'Please enter only number values').min(10, "Mobile number must contain 10 number").max(10, "Mobile number must contain 10 number"),
            Relationship: yup.string().required('Please Enter Relationship'),
            Name1: yup.string().required('Please Enter Your Name'),
            Occupation1: yup.string().required('Please Enter Occupation'),
            Address1: yup.string().required('Please Enter Occupation'),
            Email1: yup.string().email("Invalid email address format").required('Please Enter Email'),
            Phone1: yup.string().required('Please enter mobile number').matches(phoneRegExp, 'Please enter only number values').min(10, "Mobile number must contain 10 number").max(10, "Mobile number must contain 10 number"),
            Relationship1: yup.string().required('Please Enter Relationship'),
        }),

        onSubmit: async values => {
            completeReferenceForm();
            console.table(values);
            localStorage.setItem("ReferenceForm_Data", JSON.stringify(values));

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
        ReferenceForm.setValues({
            ...ReferenceForm.values,
            [name]: value.trim()
        })
    };

    const saveReferenceData = () => {
        localStorage.setItem("ReferenceForm_Data", JSON.stringify(ReferenceForm.values));
        navigate(-1);
    }

    useEffect(() => {
        const Get_ReferenceForm_Data = JSON.parse(localStorage.getItem("ReferenceForm_Data"));
        console.log("🚀 ~ file: ReferenceFrom.js:80 ~ useEffect ~ Get_ReferenceForm_Data:", Get_ReferenceForm_Data)
        if (Get_ReferenceForm_Data && Get_ReferenceForm_Data != null) {
            ReferenceForm.setValues({
                ...ReferenceForm.values,
                ...Get_ReferenceForm_Data
            });
        }
    }, []);

    return (
        <>
            <div className="main-container container-fluid px-0">
                <div className="page-header">
                    <div className="page-leftheader">
                        <h4 className="page-title mb-0 text-primary">Personal Reference</h4>
                    </div>
                </div>

                <form className="mt-5 ms-5 row" id='registerForm' onSubmit={ReferenceForm.handleSubmit}>
                    <h6 className="page-title mb-0 text-primary">Referee 1</h6>

                    <div className="row">

                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Name</label>
                                <div className="row g-xs">
                                    <div className="wd-200 mg-b-30">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Enter Name" {...ReferenceForm.getFieldProps("Name")} />
                                        </div>
                                        {ReferenceForm.touched.Name && ReferenceForm.errors.Name ?
                                            <div className="invalid-feedback" style={{ display: "block" }}>{ReferenceForm.errors.Name}</div> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Occupation</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter Occupation" {...ReferenceForm.getFieldProps("Occupation")} />
                                    </div>
                                    {ReferenceForm.touched.Occupation && ReferenceForm.errors.Occupation ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{ReferenceForm.errors.Occupation}</div> : ''}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row">

                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Address</label>
                                <div className="row g-xs">
                                    <div className="wd-200 mg-b-30">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Enter Address" {...ReferenceForm.getFieldProps("Address")} />
                                        </div>
                                        {ReferenceForm.touched.Address && ReferenceForm.errors.Address ?
                                            <div className="invalid-feedback" style={{ display: "block" }}>{ReferenceForm.errors.Address}</div> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="email" className="form-control" placeholder="Enter Email" {...ReferenceForm.getFieldProps("Email")} />
                                    </div>
                                    {ReferenceForm.touched.Email && ReferenceForm.errors.Email ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{ReferenceForm.errors.Email}</div> : ''}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row">

                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Relationship</label>
                                <div className="row g-xs">
                                    <div className="wd-200 mg-b-30">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Enter Your Relationship" {...ReferenceForm.getFieldProps("Relationship")} />
                                        </div>
                                        {ReferenceForm.touched.Relationship && ReferenceForm.errors.Relationship ?
                                            <div className="invalid-feedback" style={{ display: "block" }}>{ReferenceForm.errors.Relationship}</div> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Phone</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter Your Phone No." {...ReferenceForm.getFieldProps("Phone")} />
                                    </div>
                                    {ReferenceForm.touched.Phone && ReferenceForm.errors.Phone ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{ReferenceForm.errors.Phone}</div> : ''}
                                </div>
                            </div>
                        </div>
                    </div>


                    <h6 className="page-title mt-5 text-primary">Referee 2</h6>

                    <div className="row">

                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Name</label>
                                <div className="row g-xs">
                                    <div className="wd-200 mg-b-30">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Enter Name" {...ReferenceForm.getFieldProps("Name1")} />
                                        </div>
                                        {ReferenceForm.touched.Name1 && ReferenceForm.errors.Name1 ?
                                            <div className="invalid-feedback" style={{ display: "block" }}>{ReferenceForm.errors.Name1}</div> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Occupation</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter Occupation" {...ReferenceForm.getFieldProps("Occupation1")} />
                                    </div>
                                    {ReferenceForm.touched.Occupation1 && ReferenceForm.errors.Occupation1 ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{ReferenceForm.errors.Occupation1}</div> : ''}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row">

                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Address</label>
                                <div className="row g-xs">
                                    <div className="wd-200 mg-b-30">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Enter Address" {...ReferenceForm.getFieldProps("Address1")} />
                                        </div>
                                        {ReferenceForm.touched.Address1 && ReferenceForm.errors.Address1 ?
                                            <div className="invalid-feedback" style={{ display: "block" }}>{ReferenceForm.errors.Address1}</div> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="email" className="form-control" placeholder="Enter Email" {...ReferenceForm.getFieldProps("Email1")} />
                                    </div>
                                    {ReferenceForm.touched.Email1 && ReferenceForm.errors.Email1 ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{ReferenceForm.errors.Email1}</div> : ''}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row">

                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Relationship</label>
                                <div className="row g-xs">
                                    <div className="wd-200 mg-b-30">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Enter Your Relationship" {...ReferenceForm.getFieldProps("Relationship1")} />
                                        </div>
                                        {ReferenceForm.touched.Relationship1 && ReferenceForm.errors.Relationship1 ?
                                            <div className="invalid-feedback" style={{ display: "block" }}>{ReferenceForm.errors.Relationship1}</div> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Phone</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter Your Phone No." {...ReferenceForm.getFieldProps("Phone1")} />
                                    </div>
                                    {ReferenceForm.touched.Phone1 && ReferenceForm.errors.Phone1 ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{ReferenceForm.errors.Phone1}</div> : ''}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 my-3">
                        <div className="row">
                            <div className="col-2">
                                <button type="button"
                                    onClick={() => previousReferenceForm()}
                                    className=" btn btn-outline-primary mb-6 w-md mb-1 mt-1"><i
                                        className="fa-solid fa-arrow-left-long fa-fw" ></i> Previous</button>
                            </div>
                            <div className="col-2">
                                <input type="submit" name="next" className="next action-button apply-now-btn ml-00 mt-1" value="Continue" />
                            </div>
                            <div className="col-2 mt-2">
                                <span className='Save_continue_btn' onClick={() => saveReferenceData()}>Save & continue later</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ReferenceForm