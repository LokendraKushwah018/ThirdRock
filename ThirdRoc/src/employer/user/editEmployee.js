import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AddEmployees, EditEmployees, GetEmployee } from '../service/employService';

const EditEmployer = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [data, setDeta] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    const employer = JSON.parse(localStorage.getItem("employer"));


    const getEmployeesData = async (token, id) => {
        const response = await GetEmployee(token, id);
        if (response.status == true) {
            setDeta(response.Data);
        } else {
            console.log("get employees data response", response);
        }
    }


    useEffect(() => {
        const date = new Date(startDate);
        const WorkingSinceDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        EditForm.setValues({
            ...EditForm.values,
            Working_since_date: WorkingSinceDate
        })
    }, [startDate])

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    // const EditForm = useFormik({

    //     initialValues: {
    //         Name: "",
    //         Email: "",
    //         Mobile: "",
    //         Working_since_date: "",
    //         Salary: "",
    //         House: "",
    //         Gender: "",
    //         Age: "",
    //         Role: "",
    //         Location: "",
    //         Home_address_permanent: "",
    //         Home_address_communication: ""
    //     },
    //     enableReinitialize: true,
    //     validationSchema: yup.object({
    //         Name: yup.string().required('Please enter your name'),
    //         Email: yup.string().email("Invalid email address format").required('Please enter valid email address'),
    //         Mobile: yup.string().required('Please enter mobile number').min(10, "Mobile number must contain 10 number").max(10, "Mobile number must contain 10 number").matches(phoneRegExp, 'Please enter only number values'),
    //         Working_since_date: yup.date().required('Please select date'),
    //         Salary: yup.string().required('Please select salary'),
    //         House: yup.string().required('Please select house'),
    //         Gender: yup.string().required('Please select gender'),
    //         Age: yup.string().required('Please enter age'),
    //         Role: yup.string().required('Please enter role'),
    //         Location: yup.string().required('Please enter location'),
    //         Home_address_permanent: yup.string().required('Please enter permanent home address'),
    //         Home_address_communication: yup.string().required('Please enter communication home address permanent'),
    //     }),
    //     onSubmit: async values => {
    //         const employer_id = JSON.parse(localStorage.getItem("employer"));
    //         const data = JSON.stringify({ id: id, ...values });
    //         const response = await EditEmployees(data, employer_id.employer_token);
    //         if (response.status === true) {
    //             console.log('inside tanmay', response);
    //             toast.success(response.message);
    //             navigate(-1);
    //         } else {
    //             console.log('inside tanmay', response);
    //             toast.success(response.message);
    //         }
    //     }
    // });

    const handleChangeQueryBuilder = e => {
        const { name, value } = e.target;
        EditForm.setValues({
            ...EditForm.values,
            [name]: value.trim()
        })
    };

    // useEffect(() => {
    //     EditForm.setValues({
    //         ...EditForm.values,
    //         Name: data.Name,
    //         Email: data.Email,
    //         Mobile: data.Mobile,
    //         Salary: data.Salary,
    //         House: data.House,
    //         Gender: data.Gender,
    //         Working_since_date: data.Working_since_date,
    //         Age: data.Age,
    //         Role: data.Role,
    //         Location: data.Location,
    //         Home_address_permanent: data.Home_address_permanent,
    //         Home_address_communication: data.Home_address_communication
    //     });
    // }, [data]);

    // useEffect(() => {
    //     getEmployeesData(employer.employer_token, id);
    // }, [id]);




    const con_data = [
        {
            id: 1,
            name: "fiji"
        },
        {
            id: 2,
            name: "india"
        },
        {
            id: 3,
            name: "austrlia"
        },
        {
            id: 4,
            name: "usa"
        }
    ];


    const EditForm = useFormik({

        initialValues: {
            Country: "",
            Mobile: ""
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            Country: yup.string().required('Please select Country'),
            Mobile: yup.string().required('Please Enter Mobile No.'),
        }),

        onSubmit: async values => {
            console.table(values);
            // completePersonalDetailForm();
            const employer_id = JSON.parse(localStorage.getItem("employer"))
            const data = JSON.stringify({
                mobile_number: values.Mobile,
                country_name: values.Country
            });
            // navigate(process.env.REACT_APP_EMPLOYER_PRIFIX + '/employees');
            navigate(-1);
            return false;
            const response = await AddEmployees(data, employer_id.employer_token)
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




    return (
        <>
            <div className="main-container container-fluid px-0">
                <div className="page-header">
                    <div className="page-leftheader">
                        <h4 className="page-title mb-0 text-primary">Update Employee</h4>
                    </div>
                </div>

                <form className="mt-5 ms-5 row" id='registerForm' onSubmit={EditForm.handleSubmit}>

                    <div className="row">

                        <div className="col-xl-12 col-lg-12 col-md-12 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Country</label>
                                <div className="row g-xs">
                                    <div className="wd-200 mg-b-30">
                                        <div className="input-group">
                                            <select className="form-control mb-0" name="Country" {...EditForm.getFieldProps("Country")} onChange={(e) => handleChangeQueryBuilder(e)}>
                                                <option>Select Country</option>
                                                {
                                                    con_data.map((e) => {
                                                        return (
                                                            <option key={e.id} value={e.name}>{e.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        {EditForm.touched.Country && EditForm.errors.Country ?
                                            <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.Country}</div> : ''}
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
                                        <input type="text" className="form-control" placeholder="Enter Mobile No." {...EditForm.getFieldProps("Mobile")} />
                                    </div>
                                    {EditForm.touched.Mobile && EditForm.errors.Mobile ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.Mobile}</div> : ''}
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


    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />

            <div className="main-container container-fluid px-0">
                <div className="page-header">
                    <div className="page-leftheader">
                        <h4 className="page-title mb-0 text-primary">Update employee's</h4>
                    </div>
                </div>

                <form className="mt-5 row" id='registerForm' onSubmit={EditForm.handleSubmit}>
                    <div className="row">

                        <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Employer Name</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter employer name" {...EditForm.getFieldProps("Name")} />
                                    </div>
                                    {EditForm.touched.Name && EditForm.errors.Name ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.Name}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="email" className="form-control" placeholder="Enter Email" {...EditForm.getFieldProps("Email")} />
                                    </div>
                                    {EditForm.touched.Email && EditForm.errors.Email ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.Email}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Mobile number</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter Mobile number" {...EditForm.getFieldProps("Mobile")} />
                                    </div>
                                    {EditForm.touched.Mobile && EditForm.errors.Mobile ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.Mobile}</div> : ''}
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
                                            <select className="form-control mb-0 " name="Salary" {...EditForm.getFieldProps("Salary")} onChange={(e) => handleChangeQueryBuilder(e)}>
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
                                        {EditForm.touched.Salary && EditForm.errors.Salary ?
                                            <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.Salary}</div> : ''}
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
                                            <select className="form-control mb-0" name="House" {...EditForm.getFieldProps("House")} onChange={(e) => handleChangeQueryBuilder(e)}>
                                                <option>Select House</option>
                                                <option value="Own">Own</option>
                                                <option value="Rent">Rent</option>
                                            </select>
                                        </div>
                                        {EditForm.touched.House && EditForm.errors.House ?
                                            <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.House}</div> : ''}
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
                                            <select className="form-control mb-0" name="Gender" {...EditForm.getFieldProps("Gender")} onChange={(e) => handleChangeQueryBuilder(e)}>
                                                <option>Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>
                                        {EditForm.touched.Gender && EditForm.errors.Gender ?
                                            <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.Gender}</div> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                            <div class="form-group">
                                <label class="form-label">Age</label>
                                <div class="row g-xs">
                                    <div class="input-group">
                                        <input type="number" min={18} max={60} name="Age"{...EditForm.getFieldProps("Age")} class="form-control" placeholder="Enter your age" />
                                    </div>
                                    {EditForm.touched.Age && EditForm.errors.Age ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.Age}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                            <div class="form-group">
                                <label class="form-label">Role</label>
                                <div class="row g-xs">
                                    <div class="input-group">
                                        <input type="text" name="Role"{...EditForm.getFieldProps("Role")} class="form-control" placeholder="Enter role" />
                                    </div>
                                    {EditForm.touched.Role && EditForm.errors.Role ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.Role}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                            <div class="form-group">
                                <label class="form-label">Location</label>
                                <div class="row g-xs">
                                    <div class="input-group">
                                        <input type="text" name="Location"{...EditForm.getFieldProps("Location")} class="form-control" placeholder="Enter location" />
                                    </div>
                                    {EditForm.touched.Location && EditForm.errors.Location ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.Location}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                            <div class="form-group">
                                <label class="form-label">Home Address Permanent</label>
                                <div class="row g-xs">
                                    <div class="input-group">
                                        <input type="text" name="Home_address_permanent"{...EditForm.getFieldProps("Home_address_permanent")} class="form-control" placeholder="Enter your permanent address" />
                                    </div>
                                    {EditForm.touched.Home_address_permanent && EditForm.errors.Home_address_permanent ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.Home_address_permanent}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                            <div class="form-group">
                                <label class="form-label">Home Address Communication</label>
                                <div class="row g-xs">
                                    <div class="input-group">
                                        <input type="text" name="Home_address_communication" {...EditForm.getFieldProps("Home_address_communication")} class="form-control" placeholder="Enter your communication address" />
                                    </div>
                                    {EditForm.touched.Home_address_communication && EditForm.errors.Home_address_communication ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.Home_address_communication}</div> : ''}
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
export default EditEmployer;