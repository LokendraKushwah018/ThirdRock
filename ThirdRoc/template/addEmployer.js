import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AddEmployees } from '../service/employService';

const AddEmployer = () => {
    const [startDate, setStartDate] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        const date = new Date(startDate);
        const WorkingSinceDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        AddForm.setValues({
            ...AddForm.values,
            Working_since_date: WorkingSinceDate
        })
    }, [startDate])

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const AddForm = useFormik({

        initialValues: {
            Name: "",
            Email: "",
            Mobile: "",
            Working_since_date: "",
            Salary: "",
            House: "",
            Gender: "",
            Age: "",
            Role: "",
            Location: "",
            Home_address_permanent: "",
            Home_address_communication: ""
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            Name: yup.string().required('Please enter your name'),
            Email: yup.string().email("Invalid email address format").required('Please enter valid email address'),
            Mobile: yup.string().required('Please enter mobile number').min(10, "Mobile number must contain 10 number").max(10, "Mobile number must contain 10 number").matches(phoneRegExp, 'Please enter only number values'),
            Working_since_date: yup.date().required('Please select date'),
            Salary: yup.string().required('Please select salary'),
            House: yup.string().required('Please select house'),
            Gender: yup.string().required('Please select gender'),
            Age: yup.string().required('Please enter age'),
            Role: yup.string().required('Please enter role'),
            Location: yup.string().required('Please enter location'),
            Home_address_permanent: yup.string().required('Please enter permanent home address'),
            Home_address_communication: yup.string().required('Please enter communication home address permanent'),
        }),
        onSubmit: async values => {
            ;
            const employer_id = JSON.parse(localStorage.getItem("employer"))
            const data = JSON.stringify({ ...values });
            const response = await AddEmployees(data, employer_id.employer_token)
            if (response.status === 200) {
                console.log('inside tanmay', response);
                toast.success(response.message);
                navigate('/employer/employees')
            } else {
                console.log('inside tanmay', response);
                toast.success(response.message);
            }
        }
    });

    const handleChangeQueryBuilder = e => {
        const { name, value } = e.target;
        AddForm.setValues({
            ...AddForm.values,
            [name]: value.trim()
        })
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />

            <div className="main-container container-fluid px-0">
                <div className="page-header">
                    <div className="page-leftheader">
                        <h4 className="page-title mb-0 text-primary">Add Employer's</h4>
                    </div>
                </div>

                <form className="mt-5 row" id='registerForm' onSubmit={AddForm.handleSubmit}>
                    <div className="row">

                        <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Employer Name</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter employer name" {...AddForm.getFieldProps("Name")} />
                                    </div>
                                    {AddForm.touched.Name && AddForm.errors.Name ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Name}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="email" className="form-control" placeholder="Enter Email" {...AddForm.getFieldProps("Email")} />
                                    </div>
                                    {AddForm.touched.Email && AddForm.errors.Email ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Email}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Mobile number</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter Mobile number" {...AddForm.getFieldProps("Mobile")} />
                                    </div>
                                    {AddForm.touched.Mobile && AddForm.errors.Mobile ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Mobile}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Working since date</label>
                                <div className="row g-xs">
                                    <div className="wd-200 mg-b-30">
                                        <div className="input-group">
                                            <DatePicker className="form-control fc-datepicker hasDatepicker" selected={startDate} maxDate={Date.now()} onChange={(date) => setStartDate(date)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Salary</label>
                                <div className="row g-xs">
                                    <div className="wd-200 mg-b-30">
                                        <div className="input-group">
                                            <select className="form-control mb-0 " name="Salary" {...AddForm.getFieldProps("Salary")} onChange={(e) => handleChangeQueryBuilder(e)}>
                                                <option>Select Salary</option>
                                                <option value="Frequency">Frequency</option>
                                                <option value="Amount">Amount</option>
                                                <option disabled>───────────────────────────────────────────────────────</option>
                                                <option value="PF">Deductions</option>
                                                <option value="PF">— PF</option>
                                                <option value="Paye (Pay as You Earn)">— Paye (Pay as You Earn)</option>
                                                <option value="Direct Deductions">— Direct Deductions</option>
                                            </select>
                                        </div>
                                        {AddForm.touched.Salary && AddForm.errors.Salary ?
                                            <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Salary}</div> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">House</label>
                                <div className="row g-xs">
                                    <div className="wd-200 mg-b-30">
                                        <div className="input-group">
                                            <select className="form-control mb-0" name="House" {...AddForm.getFieldProps("House")} onChange={(e) => handleChangeQueryBuilder(e)}>
                                                <option>Select House</option>
                                                <option value="Own">Own</option>
                                                <option value="Rent">Rent</option>
                                            </select>
                                        </div>
                                        {AddForm.touched.House && AddForm.errors.House ?
                                            <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.House}</div> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Gender</label>
                                <div className="row g-xs">
                                    <div className="wd-200 mg-b-30">
                                        <div className="input-group">
                                            <select className="form-control mb-0" name="Gender" {...AddForm.getFieldProps("Gender")} onChange={(e) => handleChangeQueryBuilder(e)}>
                                                <option>Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>
                                        {AddForm.touched.Gender && AddForm.errors.Gender ?
                                            <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Gender}</div> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                            <div class="form-group">
                                <label class="form-label">Age</label>
                                <div class="row g-xs">
                                    <div class="input-group">
                                        <input type="number" min={18} max={60} name="Age"{...AddForm.getFieldProps("Age")} class="form-control" placeholder="Enter your age" />
                                    </div>
                                    {AddForm.touched.Age && AddForm.errors.Age ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Age}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                            <div class="form-group">
                                <label class="form-label">Role</label>
                                <div class="row g-xs">
                                    <div class="input-group">
                                        <input type="text" name="Role"{...AddForm.getFieldProps("Role")} class="form-control" placeholder="Enter role" />
                                    </div>
                                    {AddForm.touched.Role && AddForm.errors.Role ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Role}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                            <div class="form-group">
                                <label class="form-label">Location</label>
                                <div class="row g-xs">
                                    <div class="input-group">
                                        <input type="text" name="Location"{...AddForm.getFieldProps("Location")} class="form-control" placeholder="Enter location" />
                                    </div>
                                    {AddForm.touched.Location && AddForm.errors.Location ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Location}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                            <div class="form-group">
                                <label class="form-label">Home Address Permanent</label>
                                <div class="row g-xs">
                                    <div class="input-group">
                                        <input type="text" name="Home_address_permanent"{...AddForm.getFieldProps("Home_address_permanent")} class="form-control" placeholder="Enter your permanent address" />
                                    </div>
                                    {AddForm.touched.Home_address_permanent && AddForm.errors.Home_address_permanent ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Home_address_permanent}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                            <div class="form-group">
                                <label class="form-label">Home Address Communication</label>
                                <div class="row g-xs">
                                    <div class="input-group">
                                        <input type="text" name="Home_address_communication" {...AddForm.getFieldProps("Home_address_communication")} class="form-control" placeholder="Enter your communication address" />
                                    </div>
                                    {AddForm.touched.Home_address_communication && AddForm.errors.Home_address_communication ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Home_address_communication}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <button type="submit" className="btn btn-primary mb-6 w-md mb-1 mt-1">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
export default AddEmployer;