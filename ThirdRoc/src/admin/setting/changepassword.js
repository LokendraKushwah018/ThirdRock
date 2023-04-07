import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Service from '../../adminService';
import toast, { Toaster } from 'react-hot-toast';
const api = new Service();

const Changepassword = () => {
    const Form = useFormik({
        initialValues: {
          old_password: "",
          password: "",
          confirm_password: "",
          user_id: "",
          wrong_message: ""
        },
        enableReinitialize: true,
        validationSchema: yup.object({
          old_password: yup.string().required('Please enter old_password'),
          password: yup.string().required('Please enter new_password'),
          confirm_password: yup.string().required('Please enter confirm_password'),
        }),
        onSubmit: values => {
          console.log('values', values);
          console.log('inside edit Form');
          api.postApi('admin/changePassword', values).then(response => {
    
            if (response.status === true) {
              toast.success(response.message);
            //   setShowProfilePage(true);
            //   setShowEditForm(false);
            //   setShowChangePasswordForm(false);
            }
          }).catch(error => {
            console.log('error', error);
            // setShowProfilePage(false);
            // setShowEditForm(false);
            // setShowChangePasswordForm(true);
          });
        }
      });


  return (
   <>
   <div className="main-container container-fluid px-0">
          <div class="page-header">
            <div class="page-leftheader">
              <h4 class="page-title mb-0 text-primary">Change Password</h4>
            </div>
          </div>
          <form className="mt-5 row" id='registerForm' onSubmit={Form.handleSubmit}>
            {Form.values.wrong_message ?
              <div className="invalid-feedback mb-3 mt-2" style={{ display: "block", textAlign: "center" }}>{Form.values.wrong_message}</div>
              : ''}
            <div className="row">
              <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                <div className="form-group">
                  <label className="form-label">Old Password</label>
                  <div className="row g-xs">
                    <div className="input-group">
                      <input type="text" {...Form.getFieldProps("old_password")} className="form-control" placeholder="Enter Old Password" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <div className="row g-xs">
                    <div className="input-group">
                      <input type="text" {...Form.getFieldProps("password")} className="form-control" placeholder="Enter new Password" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <div className="row g-xs">
                    <div className="input-group">
                      <input type="text" {...Form.getFieldProps("confirm_password")} className="form-control" placeholder="Enter Confirm Password" />
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
   </>
  )
}

export default Changepassword