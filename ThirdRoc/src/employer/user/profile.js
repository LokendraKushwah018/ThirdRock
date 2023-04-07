import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Service from '../../lenderService';
import toast, { Toaster } from 'react-hot-toast';

const api = new Service();
const Profile = (props) => {
  const [profileData, setprofileData] = useState({});
  const [showProfilePage, setShowProfilePage] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

  // useEffect(() => {
  //   api.getApi('lender/profile').then(response => {
  //     if (response.status === true) {
  //       console.log('inside tanmay', response.data);
  //       setprofileData(response.data);
  //     }
  //   }).catch(error => {
  //     console.log('error', error);
  //   });
  // }, [])

  // const EditForm = useFormik({
  //   initialValues: {
  //     company_name: "",
  //     address: "",
  //     email: "",
  //     mobile_number: "",
  //     gst_number: "",
  //     mini_rate_of_intrest: "",
  //     max_rate_of_intrest: "",
  //     mini_loan_range: "",
  //     max_loan_range: "",
  //     mini_tenure: "",
  //     max_tenure: "",
  //     wrong_message: ""
  //   },
  //   enableReinitialize: true,
  //   validationSchema: yup.object({
  //     company_name: yup.string().required('Please enter company name'),
  //     address: yup.string().required('Please enter address'),
  //     email: yup.string().email("Invalid email address format").required('Please enter valid email address'),
  //     mobile_number: yup.number().typeError('please enter a valid number').required('Please enter mobile number').positive(),
  //     gst_number: yup.string().required('please enter valid GST number'),
  //     mini_rate_of_intrest: yup.number().typeError('please enter a valid rate of intrest').required('Please enter minimum rate of intrest'),
  //     max_rate_of_intrest: yup.number().typeError('please enter a valid rate of intrest').required('Please enter maximum rate of intrest'),
  //     mini_loan_range: yup.number().typeError('please enter a valid loan range').required('Please enter minimum loan range'),
  //     max_loan_range: yup.number().typeError('please enter a valid loan range').required('Please enter maximum loan range'),
  //     mini_tenure: yup.number().typeError('please enter a valid tenure').required('Please enter minimum tenure'),
  //     max_tenure: yup.number().typeError('please enter a valid tenure').required('Please enter maximum tenure '),
  //   }),
  //   onSubmit: values => {
  //     console.log('values', values);
  //     console.log('inside edit Form');
  //     api.postApi('lender/updateprofile', values).then(response => {

  //       if (response.status === true) {
  //         console.log('inside tanmay', response.data);
  //         setprofileData(response.data);
  //         toast.success(response.message);
  //         setShowProfilePage(true);
  //         setShowEditForm(false);
  //         setShowChangePasswordForm(false);
  //       }
  //     }).catch(error => {
  //       console.log('error', error);
  //       toast.error(error);
  //       setShowProfilePage(false);
  //       setShowEditForm(true);
  //       setShowChangePasswordForm(false);

  //     });
  //   }
  // });

  // const changePasswordForm = useFormik({
  //   initialValues: {
  //     old_password: "",
  //     new_password: "",
  //     confirm_password: "",
  //     user_id: "",
  //     wrong_message: ""
  //   },
  //   enableReinitialize: true,
  //   validationSchema: yup.object({
  //     old_password: yup.string().required('Please enter old_password'),
  //     new_password: yup.string().required('Please enter new_password'),
  //     confirm_password: yup.string().required('Please enter confirm_password'),
  //   }),
  //   onSubmit: values => {
  //     console.log('values', values);
  //     console.log('inside edit Form');
  //     api.postApi('dsa/change_password', values).then(response => {

  //       if (response.status === true) {
  //         toast.success(response.message);
  //         setShowProfilePage(true);
  //         setShowEditForm(false);
  //         setShowChangePasswordForm(false);
  //       }
  //     }).catch(error => {
  //       console.log('error', error);
  //       setShowProfilePage(false);
  //       setShowEditForm(false);
  //       setShowChangePasswordForm(true);
  //     });
  //   }
  // });

  const ShowEditForm = () => {
    console.log('inside edit form');
    setShowEditForm(true)
    setShowProfilePage(false)
    setShowChangePasswordForm(false)

    EditForm.setValues({
      user_id: profileData.user_id,
      company_name: profileData.company_name,
      email: profileData.email,
      address: profileData.address,
      mobile_number: profileData.mobile_number,
      gst_number: profileData.gst_number,
      mini_rate_of_intrest: profileData.mini_rate_of_intrest,
      max_rate_of_intrest: profileData.max_rate_of_intrest,
      mini_loan_range: profileData.mini_loan_range,
      max_loan_range: profileData.max_loan_range,
      mini_tenure: profileData.mini_tenure,
      max_tenure: profileData.max_tenure,
      logo: profileData.logo,
    })
    console.log('outside edit Form');

  }
  const ShowChangePassForm = () => {
    console.log('inside change pass form');
    setShowEditForm(false)
    setShowProfilePage(false)
    setShowChangePasswordForm(true)
    changePasswordForm.setValues({
      user_id: profileData.user_id
    })
  }
  // const [values, setValues] = React.useState({
  //   password: "",
  //   showPassword: false,
  // });
  // const [valuesConfP, setValuesConfP] = React.useState({
  //   password: "",
  //   showConfPassword: false,
  // });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleClickShowConfPassword = () => {
    setValuesConfP({ ...valuesConfP, showConfPassword: !valuesConfP.showConfPassword });
  };
  const eyeBtnStyle = {
    position: 'absolute',
    marginLeft: '0px',
    marginTop: '0px',
    marginRight:'10px'
  }

  const eyeBtnStyle1 = {
    position: 'absolute',
    marginLeft: '221px',
    marginTop: '16px',
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <h1>Profile</h1>
      <h1>Profile</h1>
      <h1>Profile</h1>
      <h1>Profile</h1>
      {/* {showProfilePage &&
        <div className="main-container container-fluid px-0">
          <div className="page-header mb-3">
            <div className="page-leftheader">
              <h4 className="page-title mb-0 text-primary">Lender's Personal Detail</h4>
            </div>
            <div className="page-rightheader">
              <div className="btn-list">
                <Link to="" className="btn btn-outline-primary" onClick={ShowEditForm}><i className="fa-solid fa-user-pen fa-fw me-2"></i> Edit Profile</Link>
                <Link to="" className="btn btn-primary btn-pill" onClick={ShowChangePassForm}><i className="fa-regular fa-pen-to-square fa-fw me-2"></i> Change Password</Link>
              </div>
            </div>
          </div>
          <div className="main-proifle">
            <div className="row">
              <div className="col-lg-12 col-xl-12 p-0">
                <div className="box-widget widget-user">
                  <div className="widget-user-image1 d-xl-flex d-block flexwrap">
                    <div className="col-md-12">
                      <p class="mb-0"><small class="text-muted">FILE ID:{profileData?.full_name}</small></p>
                      <h4 className="pro-user-username mb-3 font-weight-bold">{profileData?.full_name}</h4>
                      <div className="row">
                        <div className="media mb-5 col-md-4">
                          <div className="media-icon bg-info-transparent text-info me-3"> <i className="fa-regular fa-building fa-fw"></i> </div>
                          <div className="media-body">
                            <small className="text-muted">Company Name:</small>
                            <div className="font-weight-normal1">{profileData?.company_name}</div>
                          </div>
                        </div>
                        <div className="media  mb-5 col-md-4">
                          <div className="media-icon bg-success-transparent text-success me-3"> <i className="fa-solid fa-mobile-screen-button fa-fw"></i> </div>
                          <div className="media-body">
                            <small className="text-muted">Mobile no:</small>
                            <div className="font-weight-normal1">{profileData?.mobile_number}</div>
                          </div>
                        </div>
                        <div className="media  mb-5 col-md-4">
                          <div className="media-icon bg-primary-transparent text-primary me-3"> <i className="fa-regular fa-envelope fa-fw"></i> </div>
                          <div className="media-body">
                            <small className="text-muted">Email:</small>
                            <div className="font-weight-normal1">{profileData?.email}</div>
                          </div>
                        </div>
                        <div className="media  mb-5 col-md-4">
                          <div className="media-icon bg-danger-transparent text-danger me-3"> <i className="fa-solid fa-globe fa-fw"></i> </div>
                          <div className="media-body">
                            <small className="text-muted">Website:</small>
                            <div className="font-weight-normal1">{profileData?.website}</div>
                          </div>
                        </div>
                        <div className="media mb-5 col-md-4">
                          <div className="media-icon bg-warning-transparent text-warning me-3"> <i className="fa-regular fa-address-card fa-fw"></i> </div>
                          <div className="media-body">
                            <small className="text-muted">Pan/GST no:</small>
                            <div className="font-weight-normal1">{profileData?.gst_number}</div>
                          </div>
                        </div>
                        <div className="media  mb-5 col-md-4">
                          <div className="media-icon bg-cyan-transparent text-cyan me-3"> <i className="fa-solid fa-location-dot fa-fw"></i> </div>
                          <div className="media-body">
                            <small className="text-muted">Address:</small>
                            <div className="font-weight-normal1">{profileData?.address}</div>
                          </div>
                        </div>
                        <div className="media  mb-5 col-md-4">
                          <div class="media-icon bg-cyan-transparent text-cyan me-3"> <i class="fa-solid fa-percent fa-fw"></i> </div>
                          <div class="media-body">
                            <small className="text-muted">Maximum Rate Of Interest:</small>
                            <div className="font-weight-normal1">{profileData?.max_rate_of_intrest} <i class="fa-solid fa-percent fa-fw"></i> </div>
                          </div>
                        </div>
                        <div className="media  mb-5 col-md-4">
                          <div class="media-icon bg-cyan-transparent text-cyan me-3"> <i class="fa-solid fa-percent fa-fw"></i> </div>
                          <div class="media-body">
                            <small className="text-muted">Minimum Rate Of Interest</small>
                            <div className="font-weight-normal1">{profileData?.mini_rate_of_intrest} <i class="fa-solid fa-percent fa-fw"></i> </div>
                          </div>
                        </div>
                        <div className="media  mb-5 col-md-4">
                          <div class="media-icon bg-cyan-transparent text-cyan me-3"> <i class="fa-solid fa-indian-rupee-sign fa-fw"></i> </div>
                          <div class="media-body">
                            <small className="text-muted">Maximum Loan Range</small>
                            <div className="font-weight-normal1">{profileData?.max_loan_range} <i class="fa-solid fa-indian-rupee-sign fa-fw"></i> </div>
                          </div>
                        </div>
                        <div className="media  mb-5 col-md-4">
                          <div class="media-icon bg-cyan-transparent text-cyan me-3"> <i class="fa-solid fa-indian-rupee-sign fa-fw"></i> </div>
                          <div class="media-body">
                            <small className="text-muted">Minimum Loan Range</small>
                            <div className="font-weight-normal1">{profileData?.mini_loan_range} <i class="fa-solid fa-indian-rupee-sign fa-fw"></i> </div>
                          </div>
                        </div>
                        <div className="media  mb-5 col-md-4">
                          <div class="media-icon bg-cyan-transparent text-cyan me-3"> <i class="fa-solid fa-calendar fa-fw"></i> </div>
                          <div class="media-body">
                            <small className="text-muted">Maximum tenure</small>
                            <div className="font-weight-normal1">{profileData?.max_tenure} Month </div>
                          </div>
                        </div>
                        <div className="media  mb-5 col-md-4">
                          <div class="media-icon bg-cyan-transparent text-cyan me-3"> <i class="fa-solid fa-calendar fa-fw"></i> </div>
                          <div class="media-body">
                            <small className="text-muted">Minimum tenure</small>
                            <div className="font-weight-normal1">{profileData?.mini_tenure} Month </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 col-xl-12 p-0">
                <div className="box-widget widget-user">
                  <div className="widget-user-image1 d-xl-flex d-block flexwrap">
                    <div className="col-md-12">
                      <h4 className="pro-user-username mb-3 font-weight-bold">Logo</h4>
                      <div className="row">
                        <div className="media col-md-4">
                          <div className="media-body">
                            <img src={'https://fintranxect.s3.ap-south-1.amazonaws.com/lender-logo-' + profileData.logo} alt="no logo here" style={{ height: "230px", width: "230px", objectFit: "contain" }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      } */}
      {/* {showEditForm &&
        <div className="main-container container-fluid px-0">
          <div className="page-header">
            <div className="page-leftheader">
              <h4 className="page-title mb-0 text-primary">Update Profile Info</h4>
            </div>
          </div>
          <form className="mt-5 row" id='registerForm' onSubmit={EditForm.handleSubmit}>
            <div className="row">
              <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                <div className="form-group">
                  <label className="form-label">Company Name</label>
                  <div className="row g-xs">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Enter company name" {...EditForm.getFieldProps("company_name")} />
                    </div>
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
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                <div class="form-group">
                  <label class="form-label">GST Number</label>
                  <div class="row g-xs">
                    <div class="input-group">
                      <input type="text" name="gst_number"{...EditForm.getFieldProps("gst_number")} class="form-control" placeholder="Enter gst number" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-lg-6 col-md-6 col-xm-12">
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
              </div>
              <div className="col-md-12">
                <button type="submit" className="btn btn-primary mb-6 w-md mb-1 mt-1"> Save </button>
              </div>
            </div>
          </form>
        </div>
      } */}
      
      {/* {showChangePasswordForm &&
        <div className="main-container container-fluid px-0">
          <div class="page-header">
            <div class="page-leftheader">
              <h4 class="page-title mb-0 text-primary">Change Password</h4>
            </div>
          </div>
          <form className="mt-5 row" id='registerForm' onSubmit={changePasswordForm.handleSubmit}>
            {changePasswordForm.values.wrong_message ?
              <div className="invalid-feedback mb-3 mt-2" style={{ display: "block", textAlign: "center" }}>{changePasswordForm.values.wrong_message}</div>
              : ''}
            <div className="row">
              <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                <div className="form-group">
                  <label className="form-label">Old Password</label>
                  <div className="row g-xs">
                    <div className="input-group">
                      <input className="form-control" type={values.showPassword ? "text" : "password"} placeholder="Enter Old Password" {...changePasswordForm.getFieldProps("old_password")} />
                      
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <div className="row g-xs">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Enter new Password" {...changePasswordForm.getFieldProps("new_password")} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <div className="row g-xs">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Enter Confirm Password" {...changePasswordForm.getFieldProps("confirm_password")} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <button type="submit" className="btn btn-primary mb-6 w-md mb-1 mt-1"> Save </button>
              </div>
            </div>
          </form>
        </div>
      } */}
    </>
  )
}
export default Profile;
