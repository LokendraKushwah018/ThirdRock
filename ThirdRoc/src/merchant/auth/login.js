import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import Service from '../../lenderService';
import { MerchantLoign } from '../service/MerchantService';
const config = require('../../config.json')
const api = new Service();

//merchant Login API
const Login = () => {
  const navigate = useNavigate();
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const [currentStep, setCurrentStep] = useState(0);
  const [showOtpField, setshowOtpField] = useState(false);

  const [closeModal, setcloseModal] = useState(false);
  const [hideResetForm, sethideResetForm] = useState(true);
  const [verficationMobNumber, setverficationMobNumber] = useState('');

  const form = useFormik({
    initialValues: {
      mobile_number: "",
      password: "",
      wrong_message: ""
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      mobile_number: yup.string().required('Please enter mobile number').matches(phoneRegExp, 'Please enter only number').min(10, 'Mobile number must contain 10 number').max(10, 'Mobile number must contain 10 number'),
      password: yup.string().required('Please enter password'),
    }),
    onSubmit: async values => {

      const response = await MerchantLoign(JSON.stringify(values));
      if (response.status === true) {
        toast.success(response.message);
        let merchant = {
          user_type: response.user_type == 'USERS' ? response.user_type.toLowerCase() : 'merchant',
          merchant_token: response.token,
          user_id: response.user_id,
        }
        localStorage.setItem('merchant', JSON.stringify(merchant));
        navigate('/merchant/dashboard')
      } else {
        toast.error(response.message);
        form.setFieldValue('wrong_message', response.message)
        setTimeout(() => {
          form.setFieldValue('wrong_message', '')
        }, 3500);
      }

      // api.postApi('dsa/login', values).then(response => {
      //   if (response.status === true) {
      //     toast.success(response.message);
      //     let merchant = {
      //       user_type: response.user_type == 'USERS' ? response.user_type.toLowerCase() : 'merchant',
      //       merchant_token: response.token,
      //       user_id: response.user_id,

      //     }
      //     localStorage.setItem('merchant', JSON.stringify(merchant));

      //     navigate('/merchant/dashboard')
      //   } else {
      //     form.setFieldValue('wrong_message', response.message)
      //     setTimeout(() => {
      //       form.setFieldValue('wrong_message', '')
      //     }, 3500);
      //   }
      // }).catch(error => {
      //   form.setFieldValue('wrong_message', error.message)
      // });
    }
  });
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const [valuesConfP, setValuesConfP] = React.useState({
    password: "",
    showConfPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowConfPassword = () => {
    setValuesConfP({ ...valuesConfP, showConfPassword: !valuesConfP.showConfPassword });
  };
  // const handleClickShowConfPassword = () => {
  //   setValuesConfP({ ...valuesConfP, showConfPassword: !valuesConfP.showConfPassword });
  // };
  const eyeBtnStyle = {
    position: 'absolute',
    marginLeft: '0px',
    marginTop: '0px',
  }

  const eyeBtnStyle1 = {
    position: 'absolute',
    marginLeft: '262px',
    marginTop: '16px',
  }

  const eyeBtnStyle2 = {
    position: 'absolute',
    marginLeft: '0px',
    marginTop: '0px',
  }

  const eyeBtnStyle3 = {
    position: 'absolute',
    marginLeft: '262px',
    marginTop: '16px',
  }
  //merchant ForgotPassword API
  const forgotPasswordForm = useFormik({
    initialValues: {
      mobile_number: "",
      wrong_message: ""
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      mobile_number: yup.string().required('Please enter mobile number').matches(phoneRegExp, 'Please enter only number').min(10, 'Mobile number must contain 10 number').max(10, 'Mobile number must contain 10 number'),
    }),
    onSubmit: values => {
      api.postApi('merchant/send-otp-forgot-pass', values).then(response => {
        if (response.status === true) {
          toast.success(response.message);
          setshowOtpField(true);
          setverficationMobNumber(values.mobile_number)

        }
        else {
          forgotPasswordForm.setFieldValue('wrong_message', response.message)
          setTimeout(() => {
            forgotPasswordForm.setFieldValue('wrong_message', '')
          }, 3500);
        }
      }).catch(error => {
        forgotPasswordForm.setFieldValue('wrong_message', error.message)
      });
    }
  });

  //merchant OTP Verification API
  const otpForm = useFormik({
    initialValues: {
      mobile_number: verficationMobNumber,
      otp: "",
      wrong_message: ""
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      mobile_number: yup.string().required('Please enter mobile number').matches(phoneRegExp, 'Please enter only number').min(10, 'Mobile number must contain 10 number').max(10, 'Mobile number must contain 10 number'),
      otp: yup.string().required('Please enter otp').matches(phoneRegExp, 'Please enter otp'),
    }),
    onSubmit: values => {
      api.postApi('merchant/verify-otp', values).then(response => {
        if (response.status === true) {
          toast.success(response.message);
          window.$('#forgotpassword').modal('hide');

          sethideResetForm(false)
        } else {
          otpForm.setFieldValue('wrong_message', response.message)
          setTimeout(() => {
            otpForm.setFieldValue('wrong_message', '')

          }, 3500);

        }
      }).catch(error => {
        otpForm.setFieldValue('wrong_message', error.message)
      });
    }
  });

  //merchant Reset-Password API
  const resetPasswordForm = useFormik({
    initialValues: {
      mobile_number: verficationMobNumber,
      password: "",
      confirmedPassword: "",
      wrong_message: ""
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      mobile_number: yup.string().required('Please enter mobile number').matches(phoneRegExp, 'Please enter only number').min(10, 'Mobile number must contain 10 number').max(10, 'Mobile number must contain 10 number'),
      password: yup.string().required('Please enter password'),
      confirmedPassword: yup.string().required('Please enter confirm password'),
    }),
    onSubmit: values => {
      api.postApi('merchant/reset-password', values).then(response => {
        if (response.status === true) {
          toast.success(response.message);
          sethideResetForm(true)
        } else {
          resetPasswordForm.setFieldValue('wrong_message', response.message)
          setTimeout(() => {
            resetPasswordForm.setFieldValue('wrong_message', '')
          }, 3500);

        }
      }).catch(error => {
        resetPasswordForm.setFieldValue('wrong_message', error.message)
      });
    }
  });
  //let history = useHistory();
  const [show, setShow] = useState(false);
  const [close, setClose] = useState(false);

  const handleClose = () => {
    setShow(false);
    setshowOtpField(false);
    forgotPasswordForm.values.mobile_number = ''

  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="page">
        <div className="page-single bg-back">
          <div className="container">
            <div className="row">
              <div className="col mx-auto">
                <div className="row justify-content-center">
                  <div className="col-xl-7 col-lg-12">
                    <div className="mb-5 br-7 text-center"><Link to="/"><img src={process.env.PUBLIC_URL + "/assets/img/logo-thirdroc.png"} className="header-brand-img loginlogo" alt="logo" /></Link></div>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-xl-7 col-lg-12">
                    <div className="row p-0 m-0 bg-white br-7">
                      <div className="col-lg-6 p-0">
                        <div className="text-justified text-white p-5 register-1 overflow-hidden">
                          <div className="custom-content">
                            <div className="">
                              <div className="fs-22 mb-4 font-weight-bold text-white">Welcome Back To ThirdRoc!</div>
                              <h6>Personal Loans</h6>
                              <div className="mb-2 text-white-50 d-flex"><i className="fa-solid fa-circle-dot fa-fw me-3 postop"></i> No Collateral/Security Required. Personal loans don't need you to provide any collateral such as a house or car to avail a personal loan.</div>
                              <div className="mb-2 text-white-50 d-flex"><i className="fa-solid fa-circle-dot fa-fw me-3 postop"></i> Flexible End Use.</div>
                              <div className="mb-2 text-white-50 d-flex"><i className="fa-solid fa-circle-dot fa-fw me-3 postop"></i> Flexible Tenure.</div>
                              <div className="mb-2 text-white-50 d-flex"><i className="fa-solid fa-circle-dot fa-fw me-3 postop"></i> Minimal Documentation.</div>
                              <div className="mb-2 text-white-50 d-flex"><i className="fa-solid fa-circle-dot fa-fw me-3 postop"></i> Quick Disbursal.</div>
                              <div className="mb-2 text-white-50 d-flex"><i className="fa-solid fa-circle-dot fa-fw me-3 postop"></i> Flexible Loan Amount.</div>


                              <h6 className="mt-5">Business Loans</h6>
                              <div className="mb-2 text-white-50 d-flex"><i className="fa-solid fa-circle-dot fa-fw me-3 postop"></i> Unsecured Business Loans/ No Collateral Required</div>
                              <div className="mb-2 text-white-50 d-flex"><i className="fa-solid fa-circle-dot fa-fw me-3 postop"></i> Minimum KYC</div>
                              <div className="mb-2 text-white-50 d-flex"><i className="fa-solid fa-circle-dot fa-fw me-3 postop"></i> Furnishes your Working Capital Requirement, Manage operational cost, growth & expansion of Business</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {hideResetForm &&
                        <div className="col-md-8 col-lg-6 p-0 mx-auto">
                          <div className="bg-white text-dark br-7 br-tl-0 br-bl-0">
                            <div className="card-body">
                              <div className="text-center mb-3">
                                <h3 className="mb-2">Login As Merchant</h3>
                              </div>
                              <form className="mt-5" onSubmit={form.handleSubmit}>
                                {form.values.wrong_message ?
                                  <div className="invalid-feedback mb-3" style={{ display: "block", textAlign: "center" }}>{form.values.wrong_message}</div>
                                  : ''}
                                <div className="input-group mb-4">
                                  <div className="input-group-text"> <i className="fa-solid fa-phone fa-fw" /> </div>
                                  <input type="text" className="form-control" name="mobile_number" {...form.getFieldProps("mobile_number")} placeholder="Mobile Number " />
                                  {form.touched.mobile_number && form.errors.mobile_number ?
                                    <div className="invalid-feedback" style={{ display: "block" }}>{form.errors.mobile_number}</div> : ''}
                                </div>
                                <div className="input-group">
                                  <div className="input-group-text"> <i className="fa-solid fa-lock fa-fw" aria-hidden="true" /> </div>
                                  <input className="form-control" name="password" {...form.getFieldProps("password")} type={values.showPassword ? "text" : "password"} placeholder="Password" id="password-field" />
                                  {/* <span toggle="#password-field" onClick={handleClickShowPassword} style={eyeBtnStyle} class="fa fa-fw fa-eye-slash field-icon toggle-password hideeyes r20"></span> */}
                                  {!values.showPassword ?
                                    <span toggle="#password-field" onClick={handleClickShowPassword} style={eyeBtnStyle} className="fa fa-fw fa-eye field-icon toggle-password hideeyes"></span>
                                    :
                                    <span toggle="#password-field" onClick={handleClickShowPassword} style={eyeBtnStyle1} className="fa fa-fw fa-eye-slash field-icon toggle-password hideeyes1"></span>

                                  }
                                  {form.touched.password && form.errors.password ?
                                    <div className="invalid-feedback" style={{ display: "block" }}>{form.errors.password}</div> : ''}
                                </div>

                                <div className='text-center mb-3 mt-3'>
                                  <Link to="" data-bs-target="#forgotpassword" data-bs-toggle="modal" >FORGOT PASSWORD</Link>
                                  {/* <a href="/merchant/registration" style={{textAlign:"right"}}>SIGNUP</a> */}
                                </div>
                                <div className="form-group text-center mb-3 mt-3"> <button type="submit" className="btn btn-primary btn-lg w-100 br-7">Log In</button> </div>
                                {/* <div className='text-center mb-3 mt-3'>
                                  <a href="/merchant/registration">SIGNUP</a>
                                </div> */}


                                <div className="form-group mt-3">Don't have account? <Link to={"/merchant/registration"}
                                  className="font-weight-bold"> Register</Link></div>


                                <div className="form-group fs-12 text-center"> By logging in, you agree to the following Credit report
                                  {/* <Link to="" className="font-weight-bold">Terms &amp; Conditions</Link> and have read and
                                  acknowledge our <Link to="" className="font-weight-bold">Privacy
                                    &amp; Services.</Link>  */}
                                  <a target="blank" href={config.PRODUCTION_MODE == 1 ? config.DOMAIN + '/terms-of-use' : config.DEV_DOMAIN + '/terms-of-use'} alt="Terms of use"> &nbsp;Terms & Conditions </a> &nbsp;and have read and
                                  acknowledge our&nbsp;<a rel="noreferrer" href={config.PRODUCTION_MODE == 1 ? config.DOMAIN + '/privacy-policy' : config.DEV_DOMAIN + '/privacy-policy'} alt="Privacy Policy" target="_blank"> Privacy Policy </a>

                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      }

                      {/* ResetPassword modal */}
                      {!hideResetForm &&
                        <div className="col-md-8 col-lg-6 p-0 mx-auto">
                          <div className="bg-white text-dark br-7 br-tl-0 br-bl-0">
                            <div className="card-body">
                              <div className="text-center mb-3">
                                <h3 className="mb-2">Reset Password</h3>
                                <a href="javascript:void(0);" className="">Create New Password</a>
                              </div>
                              <form className="mt-5" onSubmit={resetPasswordForm.handleSubmit}>
                                {resetPasswordForm.values.wrong_message ?
                                  <div className="invalid-feedback mb-3" style={{ display: "block", textAlign: "center" }}>{resetPasswordForm.values.wrong_message}</div>
                                  : ''}
                                <div className="input-group mb-3">
                                  <a className="input-group-text"> <i className="fa-solid fa-lock fa-fw" aria-hidden="true"></i> </a>
                                  <input className="form-control" type={values.showPassword ? "text" : "password"} placeholder="New Password"
                                    name="password" {...resetPasswordForm.getFieldProps("password")} />
                                  {!values.showPassword ?
                                    <span toggle="#password-field" onClick={handleClickShowPassword} style={eyeBtnStyle2} className="fa fa-fw fa-eye field-icon toggle-password hideeyes"></span>
                                    :
                                    <span toggle="#password-field" onClick={handleClickShowPassword} style={eyeBtnStyle3} className="fa fa-fw fa-eye-slash field-icon toggle-password hideeyes1"></span>

                                  }

                                  {resetPasswordForm.touched.password && resetPasswordForm.errors.password ?
                                    <div className="invalid-feedback" style={{ display: "block" }}>{resetPasswordForm.errors.password}</div> : ''}
                                </div>
                                <div className="input-group">
                                  <a className="input-group-text"> <i className="fa-solid fa-lock fa-fw" aria-hidden="true"></i> </a>
                                  <input className="form-control" type={valuesConfP.showConfPassword ? "text" : "password"} placeholder="Confirm Password"
                                    name="confirmedPassword" {...resetPasswordForm.getFieldProps("confirmedPassword")} />

                                  {!valuesConfP.showConfPassword ?
                                    <span toggle="#password-field" onClick={handleClickShowConfPassword} style={eyeBtnStyle2} className="fa fa-fw fa-eye field-icon toggle-password hideeyes"></span>
                                    :
                                    <span toggle="#password-field" onClick={handleClickShowConfPassword} style={eyeBtnStyle3} className="fa fa-fw fa-eye-slash field-icon toggle-password hideeyes1"></span>

                                  }

                                  {resetPasswordForm.touched.confirmedPassword && resetPasswordForm.errors.confirmedPassword ?
                                    <div className="invalid-feedback" style={{ display: "block" }}>{resetPasswordForm.errors.confirmedPassword}</div> : ''}
                                </div>
                                <div className="form-group text-center mb-3 mt-3"> <button type='submit' className="btn btn-primary btn-lg w-100 br-7">Reset Password</button> </div>

                              </form>
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal For Forgot Password    */}
      <div className="modal fade effect-scale" id="forgotpassword" aria-modal="true" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">password
          <div className="modal-content modal-content-demo">
            <div className="modal-header"> <h6 className="modal-title">Forgot Password</h6>
              <button aria-label="Close" onClick={handleClose} className="btn-close" data-bs-dismiss="modal" type="button"><span aria-hidden="true">×</span></button> </div>
            {showOtpField &&
              <form className="mt-2" onSubmit={otpForm.handleSubmit}>
                {otpForm.values.wrong_message ?
                  <div className="invalid-feedback mb-3" style={{ display: "block", textAlign: "center" }}>{otpForm.values.wrong_message}</div>
                  : ''}
                <div className="col-md-12 mt-2">
                  <div className="form-group m-0">
                    <div className="row g-xs">
                      <div className="col-12">
                        <div className="input-group mb-2">
                          <div className="input-group-text"> <i className="fa-solid fa-user fa-fw" /> </div>
                          <input type="text" className="form-control" name="otp" {...otpForm.getFieldProps("otp")} placeholder="Please enter otp" />
                          {otpForm.touched.otp && otpForm.errors.otp ?
                            <div className="invalid-feedback" style={{ display: "block" }}>{otpForm.errors.otp}</div> : ''}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-footer mt-2 mb-2 ms-2 text-center mb-3 mt-3">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>}

            {!showOtpField && <form className="mt-2" onSubmit={forgotPasswordForm.handleSubmit}>
              {forgotPasswordForm.values.wrong_message ?
                <div className="invalid-feedback mb-3" style={{ display: "block", textAlign: "center" }}>{forgotPasswordForm.values.wrong_message}</div>
                : ''}
              <div className="modal-body application-modal">
                <div className="row">
                  <div className="col-md-12">
                    <label className="form-label">Mobile Number</label>
                    <div className="input-group mb-2">
                      <div className="input-group-text"> <i className="fa fa-phone"></i> </div>
                      <input type="text" className="form-control" name="mobile_number" placeholder="Enter Number"  {...forgotPasswordForm.getFieldProps("mobile_number")} />
                      {forgotPasswordForm.touched.mobile_number && forgotPasswordForm.errors.mobile_number ?
                        <div className="invalid-feedback" style={{ display: "block" }}>{forgotPasswordForm.errors.mobile_number}</div> : ''}
                    </div>
                  </div>
                  <div className="text-center mb-3 mt-3 form-footer mt-2">
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </div>
                </div>
              </div>
            </form>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Login