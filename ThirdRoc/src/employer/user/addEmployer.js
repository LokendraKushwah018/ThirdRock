import { Link, useLocation, useNavigate } from 'react-router-dom';
import { onUrlChange } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AddEmployees,GetCountry } from '../service/employService';
import { useMount, useUnmount } from 'react-use';
import { unmountComponentAtNode } from 'react-dom';
const prefix = process.env.REACT_APP_EMPLOYER_PRIFIX;

const AddEmployer = () => {

    const [country, setCountry] = useState([]);
    const navigate = useNavigate();
    const employer = JSON.parse(localStorage.getItem("employer"));


    // useEffect(() => {
    //     const date = new Date(startDate);
    //     const WorkingSinceDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    //     AddForm.setValues({
    //         ...AddForm.values,
    //     });
    // }, []);\

    const con_data = [
        {
            id: 1,
            name: "Austrlia"
            
        },
        {
            id: 2,
            name: "Fiji"
            
        },
        {
            id: 3,
            name: "India"
        },
        {
            id: 4,
            name: "Usa"
        }
    ];

    const AddForm = useFormik({

        initialValues: {
            Country: "",
            Mobile: ""
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            Country: yup.string().required('Please select Country'),
            Mobile: yup.number().typeError('Please enter a valid mobile number').required('Please Enter Mobile No.'),
        }),

        onSubmit: async values => {
            console.table(values);
            // completePersonalDetailForm();
            const employer = JSON.parse(localStorage.getItem("employer"))
            const data = JSON.stringify({
                mobile_number: values.Mobile,
                country_id: values.Country
            });
            const response = await AddEmployees(data, employer.employer_token)
            if (response.status) {
                console.log('inside abhi', response);
                toast.success(response.message);
                navigate(process.env.REACT_APP_EMPLOYER_PRIFIX + '/employees');
            } else {
                console.log('inside abhi', response);
                toast.error(response.message);
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

    const GetCountrys = async (token) => {
        try {
            const response = await GetCountry(token);
            console.log('response',response);
            if (response.status) {
                setCountry(response.data);
            }
        } catch (error) {
            toast.error("error :", error);
            console.error("🚀 ~ file: addEmployer.js:66 ~ GetCountry ~ error:", error)
        }
    }

    useEffect(() => {
        GetCountrys(employer.employer_token);
    }, []);

    return (
        <>

            <div className="main-container container-fluid px-0">
                <div className="page-header">
                    <div className="page-leftheader">
                        <h4 className="page-title mb-0 text-primary">Add Employee</h4>
                    </div>
                    <div className="page-rightheader">
                        <div className="btn-list">
                            <Link to={prefix + "/upload_employees"} className="btn btn-primary mt-2" ><i className="fa fa-plus me-2"></i> Upload Bulk Employee</Link>
                        </div>
                    </div>
                </div>

                <form className="mt-5 ms-5 row" id='registerForm' onSubmit={AddForm.handleSubmit}>

                    <div className="row">

                        <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Country</label>
                                <div className="row g-xs">
                                    <div className="wd-200 mg-b-30">
                                        <div className="input-group">
                                            <select className="form-control mb-0" name="Country" {...AddForm.getFieldProps("Country")} onChange={(e) => handleChangeQueryBuilder(e)}>
                                                <option>Select Country</option>
                                                {
                                                    country.map((e) => {
                                                        return (
                                                            <option key={e.id} value={e.id}>{e.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        {AddForm.touched.Country && AddForm.errors.Country ?
                                            <div className="invalid-feedback" style={{ display: "block" }}>{AddForm.errors.Country}</div> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
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
                    </div>

                    <div className="col-12 mt-2 mb-5">
                        <div className="row">
                            <div className="col-2">
                                <input type="submit" name="next" className="next action-button apply-now-btn ml-00 mt-1" value="Submit" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddEmployer;
