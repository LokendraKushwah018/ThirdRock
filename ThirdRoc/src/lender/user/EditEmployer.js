import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
// import Service from '../../lender/service/lenderService';
import toast, { Toaster } from 'react-hot-toast';
import { GetProfile, UpdateProfile } from '../../employer/service/employService';
import { data } from 'jquery';



// const api = new Service();

const EditEmployer = (props) => {
    const [profileData, setprofileData] = useState({});
    const navigate = useNavigate();
    const user_id = useParams();
    const employer = JSON.parse(localStorage.getItem("employer"));

    const getProfile = async (token) => {
        const response = await GetProfile(token);
        if (response.status == true) {
            setprofileData(response.data);
        } else {
            console.log("get employees data response", response);
        }
    }

    useEffect(() => {
        getProfile(employer.employer_token)
    }, [])

    useEffect(() => {
        EditForm.setValues({
            user_id: profileData.user_id,
            full_name: profileData.full_name,
            company_name: profileData.company_name,
            email: profileData.email,
            address: profileData.address,
            mobile_number: profileData.mobile_number,
            gst_number: profileData.gst_number,
            website: profileData.website,
            // mini_rate_of_intrest: profileData.mini_rate_of_intrest,
            // max_rate_of_intrest: profileData.max_rate_of_intrest,
            // mini_loan_range: profileData.mini_loan_range,
            // max_loan_range: profileData.max_loan_range,
            // mini_tenure: profileData.mini_tenure,
            // max_tenure: profileData.max_tenure,   

        })
    }, [profileData])

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const EditForm = useFormik({

        initialValues: {
            company_name: "",
            full_name: "",
            address: "",
            email: "",
            mobile_number: "",
            gst_number: "",
            website: "",
            // mini_rate_of_intrest: "",
            // max_rate_of_intrest: "",
            // mini_loan_range: "",
            // max_loan_range: "",
            // mini_tenure: "",
            // max_tenure: "",
            // wrong_message: ""
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            company_name: yup.string().required('Please enter company name'),
            full_name: yup.string().required('Please enter your name'),
            address: yup.string().required('Please enter address'),
            email: yup.string().email("Invalid email address format").required('Please enter valid email address'),
            //   mobile_number: yup.number().typeError('please enter a valid number').required('Please enter mobile number').positive(),
            mobile_number: yup.string().required('Please enter mobile number').min(10, "Mobile number must contain 10 number").max(10, "Mobile number must contain 10 number").matches(phoneRegExp, 'Please enter only number values'),
            gst_number: yup.string().required('please enter valid GST number'),
            website: yup.string().required('please enter valid website'),
            // mini_rate_of_intrest: yup.number().typeError('please enter a valid rate of intrest').required('Please enter minimum rate of intrest'),
            // max_rate_of_intrest: yup.number().typeError('please enter a valid rate of intrest').required('Please enter maximum rate of intrest'),
            // mini_loan_range: yup.number().typeError('please enter a valid loan range').required('Please enter minimum loan range'),
            // max_loan_range: yup.number().typeError('please enter a valid loan range').required('Please enter maximum loan range'),
            // mini_tenure: yup.number().typeError('please enter a valid tenure').required('Please enter minimum tenure'),
            // max_tenure: yup.number().typeError('please enter a valid tenure').required('Please enter maximum tenure '),
        }),
        onSubmit: async values => {
            console.log('values', values);
            console.log('inside edit Form');

            const data = JSON.stringify({
                company_name: `${values.company_name}`,
                full_name: `${values.full_name}`,
                address: `${values.address}`,
                email: `${values.email}`,
                gst_number: `${values.gst_number}`,
                website: `${values.website}`,
                mobile_number: `${values.mobile_number}`
            });
            navigate(-1);
            // const response = await UpdateProfile(data, employer.employer_token)

            // if (response.status === true) {
            //     console.log('inside tanmay', response.data);
            //     setprofileData(response.data);
            //     toast.success(response.message);
            //     navigate(process.env.REACT_APP_EMPLOYER_PRIFIX + '/profile');
            // } else {
            //     console.log('error', response);
            //     toast.error(response);
            // }

            // api.postApi('lender/updateprofile', values).then(response => {

            //   if (response.status === true) {
            //     console.log('inside tanmay', response.data);
            //     setprofileData(response.data);
            //     toast.success(response.message);
            //     navigate('/lender/profile')

            //   }
            // }).catch(error => {
            //   console.log('error', error);
            //   toast.error(error);

            // });
        }
    });

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />

            <div className="main-container container-fluid px-0">
                <div className="page-header">
                    <div className="page-leftheader">
                        <h4 className="page-title mb-0 text-primary">Update Employer</h4>
                    </div>
                </div>
                <form className="mt-5 row" id='registerForm' onSubmit={EditForm.handleSubmit}>
                    <div className="row">

                        <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Company Name</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter your name" {...EditForm.getFieldProps("company_name")} />
                                    </div>
                                    {EditForm.touched.company_name && EditForm.errors.company_name ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.company_name}</div> : ''}
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Employer Name</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter company name" {...EditForm.getFieldProps("full_name")} />
                                    </div>
                                    {EditForm.touched.full_name && EditForm.errors.full_name ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.full_name}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="email" className="form-control" placeholder="Enter Email" {...EditForm.getFieldProps("email")} />
                                    </div>
                                    {EditForm.touched.email && EditForm.errors.email ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.email}</div> : ''}
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Mobile number</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter Mobile number" {...EditForm.getFieldProps("mobile_number")} />
                                    </div>
                                    {EditForm.touched.mobile_number && EditForm.errors.mobile_number ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.mobile_number}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Address</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter address" {...EditForm.getFieldProps("address")} />
                                    </div>
                                    {EditForm.touched.address && EditForm.errors.address ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.address}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Gst Number</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter gst_number" {...EditForm.getFieldProps("gst_number")} />
                                    </div>
                                    {EditForm.touched.gst_number && EditForm.errors.gst_number ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.gst_number}</div> : ''}
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                            <div className="form-group">
                                <label className="form-label">Website</label>
                                <div className="row g-xs">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter website" {...EditForm.getFieldProps("website")} />
                                    </div>
                                    {EditForm.touched.website && EditForm.errors.website ?
                                        <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.website}</div> : ''}
                                </div>
                            </div>
                        </div>

                        {/* <div class="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                <div class="form-group">
                  <label class="form-label">Maximum Rate of Interest</label>
                  <div class="row g-xs">
                    <div class="input-group">
                      <input type="text" name="max_rate_of_intrest"{...EditForm.getFieldProps("max_rate_of_intrest")} class="form-control" placeholder="Enter maximum rate of interest" />
                    </div>
                  </div>
                </div>
            </div>

            <div class="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                <div class="form-group">
                  <label class="form-label">Minimum Rate of Interest</label>
                  <div class="row g-xs">
                    <div class="input-group">
                      <input type="text" name="mini_rate_of_intrest"{...EditForm.getFieldProps("mini_rate_of_intrest")} class="form-control" placeholder="Enter minimum rate of interest" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                <div class="form-group">
                  <label class="form-label">Maximum Loan Range</label>
                  <div class="row g-xs">
                    <div class="input-group">
                      <input type="text" name="max_loan_range"{...EditForm.getFieldProps("max_loan_range")} class="form-control" placeholder="Enter maximum loan range" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                <div class="form-group">
                  <label class="form-label">Minimum Loan Range</label>
                  <div class="row g-xs">
                    <div class="input-group">
                      <input type="text" name="mini_loan_range"{...EditForm.getFieldProps("mini_loan_range")} class="form-control" placeholder="Enter email" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                <div class="form-group">
                  <label class="form-label">Maximum Tenure(Months)</label>
                  <div class="row g-xs">
                    <div class="input-group">
                      <input type="text" name="max_tenure"{...EditForm.getFieldProps("max_tenure")} class="form-control" placeholder="Enter maximum tenure" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                <div class="form-group">
                  <label class="form-label">Minimum Tenure(Months)</label>
                  <div class="row g-xs">
                    <div class="input-group">
                      <input type="text" name="mini_tenure"{...EditForm.getFieldProps("mini_tenure")} class="form-control" placeholder="Enter minimum tenure" />
                    </div>
                  </div>
                </div>
              </div> */}

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
