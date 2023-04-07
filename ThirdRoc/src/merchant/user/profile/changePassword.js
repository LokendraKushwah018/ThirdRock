import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {ChangeUserPassword} from '../../service/MerchantService';
import toast, { Toaster } from 'react-hot-toast';

// const api = new Service();

const ChangePassword = (props) => {
  const [profileData, setprofileData] = useState({});
  const user_id = useParams();
  const navigate = useNavigate();
  const merchant = JSON.parse(localStorage.getItem("merchant"));
  const merchantUserId = merchant.user_id;
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

  const changePasswordForm = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
      user_id:user_id,
      wrong_message: ""
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      old_password: yup.string().required('Please enter old_password'),
      new_password: yup.string().required('Please enter new_password'),
      confirm_password: yup.string().required('Please enter confirm_password'),
    }),
    onSubmit: async values => {
      console.log('values', values);
      console.log('inside edit Form');
      let data = JSON.stringify(values)
      const response = await ChangeUserPassword(data, merchant.merchant_token);

      if (response.status === true) {
        toast.success(response.message);
        navigate(process.env.REACT_APP_MARCHNT_PRIFIX + '/profile');
      } else {
        toast.error(response.message);
        console.log(response);
      }
    }
  });

  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const [valuesNewP, setValuesNewP] = React.useState({
    password: "",
    showNewPassword: false,
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
  const handleClickShowNewPassword = () => {
    setValuesNewP({ ...valuesNewP, showNewPassword: !valuesNewP.showNewPassword });
  };
  const eyeBtnStyle = {
    position: 'absolute',
    marginLeft: '0px',
    marginTop: '0px',
    marginRight:'13px'
  }

  const eyeBtnStyle1 = {
    position: 'absolute',
    marginLeft: '295px',
    marginTop: '16px',
  }
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
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
                      <input type={values.showPassword ? "text" : "password"} className="form-control" placeholder="Enter Old Password" {...changePasswordForm.getFieldProps("old_password")} />
                      {!values.showPassword ?
                           <span toggle="#password-field" onClick={handleClickShowPassword} style={eyeBtnStyle} className="fa fa-fw fa-eye field-icon toggle-password hideeyes"></span>
                                    :
                            <span toggle="#password-field" onClick={handleClickShowPassword} style={eyeBtnStyle1} className="fa fa-fw fa-eye-slash field-icon toggle-password hideeyes1"></span>

                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <div className="row g-xs">
                    <div className="input-group">
                      <input type={valuesNewP.showNewPassword ? "text" : "password"} className="form-control" placeholder="Enter new Password" {...changePasswordForm.getFieldProps("new_password")} />
                      {!valuesNewP.showNewPassword ?
                           <span toggle="#password-field" onClick={handleClickShowNewPassword} style={eyeBtnStyle} className="fa fa-fw fa-eye field-icon toggle-password hideeyes"></span>
                               :
                            <span toggle="#password-field" onClick={handleClickShowNewPassword} style={eyeBtnStyle1} className="fa fa-fw fa-eye-slash field-icon toggle-password hideeyes1"></span>

                       }
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <div className="row g-xs">
                    <div className="input-group">
                      <input type={valuesConfP.showConfPassword ? "text" : "password"} className="form-control" placeholder="Enter Confirm Password" {...changePasswordForm.getFieldProps("confirm_password")} />
                      {!valuesConfP.showConfPassword ?
                           <span toggle="#password-field" onClick={handleClickShowConfPassword} style={eyeBtnStyle} className="fa fa-fw fa-eye field-icon toggle-password hideeyes"></span>
                               :
                            <span toggle="#password-field" onClick={handleClickShowConfPassword} style={eyeBtnStyle1} className="fa fa-fw fa-eye-slash field-icon toggle-password hideeyes1"></span>

                       }
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <button type="submit" className="btn btn-primary mb-6 w-md mb-1 mt-1"> Save and Update</button>
              </div>
            </div>
          </form>
        </div>
    </>
  )
}
export default ChangePassword;
