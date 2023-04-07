import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import Service from './../adminService';
import { AdminLoign } from './service/adminService';

const api = new Service();
const Login = () => {
  const navigate = useNavigate();
  const form = useFormik({
    initialValues: {
      username: "",
      password: "",
      wrong_message: ""
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      username: yup.string().email('Please enter a valid email address').required('Please enter email address'),
      password: yup.string().required('Please enter password'),
    }),
    onSubmit: async values => {

      try {
        const data = JSON.stringify({
          username: values.username,
          password: values.password
        });

        const response = await AdminLoign(data);

        if (response.status == true) {
          if (response.status) {
            toast.success(response.message);
            console.log(response)

            let admin = {
              user_type: response.user_type == 'USERS' ? response.user_type.toLowerCase() : 'admin',
              admin_token: response.token,
              user_id: response.user_id,
              main_permission: JSON.stringify(response.main_permission),
              sub_permission: JSON.stringify(response.sub_permission)
            }

            localStorage.setItem('admin', JSON.stringify(admin));
            navigate(process.env.REACT_APP_ADMIN_PRIFIX + '/dashboard')

          } else {
            toast.error(response.message);
            localStorage.removeItem('admin');
            form.setFieldValue('wrong_message', response.message)
          }
        }
      } catch (err) {
        console.log("🚀 ~ file: login.js:28 ~ Login ~ err:", err)
        localStorage.removeItem('admin');
        toast.error(err.message);
        form.setFieldValue('wrong_message', err.message)
      }




      // api.postApi('admin/login', values).then(response => {
      //   console.log('response', response);
      //   if (response.status === true) {
      //     toast.success(response.message);



      // let admin = {
      //   user_type: response.user_type.toLowerCase() == 'admin' ? 'admin':'admin',
      //   admin_token: response.token,
      //   user_id: response.user_id,
      //   main_permission: JSON.stringify(response.main_permission),
      //   sub_permission: JSON.stringify(response.sub_permission)

      // }
      // localStorage.setItem('admin', JSON.stringify(admin));



      // let admin = {
      //   user_type: response.user_type == 'USERS' ? response.user_type.toLowerCase() : 'admin',
      //   admin_token: response.token,
      //   user_id: response.user_id,
      //   main_permission: JSON.stringify(response.main_permission),
      //   sub_permission: JSON.stringify(response.sub_permission)

      // }
      // localStorage.setItem('admin', JSON.stringify(admin));
      // navigate('/admin/dashboard')


      // localStorage.setItem('user_type',response.user_type == 'USERS' ? response.user_type.toLowerCase() : 'admin' );
      // localStorage.setItem('admin-token', response.token);
      // localStorage.setItem('user_id', response.user_id);
      // localStorage.setItem('main_permission', JSON.stringify(response.main_permission));
      // localStorage.setItem('sub_permission', JSON.stringify(response.sub_permission));

    }
    //   }).catch(error => {
    //     form.setFieldValue('wrong_message', error.message)
    //   });
    // }
  });

  const [toggle, setToggle] = useState(false)

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
                    <div className="mb-5 br-7 text-center"><Link to="/"><img src={process.env.PUBLIC_URL + "/assets/img/logo-thirdroc.png"} className="header-brand-img" alt="thirdroc" /></Link></div>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-xl-7 col-lg-12">
                    <div className="row p-0 m-0 bg-white br-7">
                      <div className="col-lg-6 p-0" style={{ backgroundColor: "#413aa4" }}>
                        <div className="text-justified text-white p-5 register-1 overflow-hidden">
                          <div className="custom-content">
                            <div >
                              <div className="fs-22 mb-4 font-weight-bold text-white">Welcome Back To Thirdroc !</div>
                              <div className="mb-2 text-white-50"><i className="fa-solid fa-circle-dot fa-fw" /> Access all information related to your loan</div>
                              <div className="mb-2 text-white-50"><i className="fa-solid fa-circle-dot fa-fw" /> View Latest Offers</div>
                              <div className="mb-2 text-white-50"><i className="fa-solid fa-circle-dot fa-fw" /> Get a new loan</div>
                              <div className="mb-2 text-white-50"><i className="fa-solid fa-circle-dot fa-fw" /> Pay EMI and Overdues</div>
                              <div className="mb-2 text-white-50"><i className="fa-solid fa-circle-dot fa-fw" /> Create a service request</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-8 col-lg-6 p-0 mx-auto">
                        <div className="bg-white text-dark br-7 br-tl-0 br-bl-0">
                          <div className="card-body">
                            <div className="text-center mb-3">
                              <h3 className="mb-2">Login with Super Admin</h3>
                              <Link to="/" >Hello There !</Link>
                            </div>
                            <form className="mt-5" onSubmit={form.handleSubmit}>
                              {form.values.wrong_message ?
                                <div className="invalid-feedback mb-3" style={{ display: "block", textAlign: "center" }}>{form.values.wrong_message}</div>
                                : ''}
                              <div className="input-group mb-4">
                                <div className="input-group-text"> <i className="fa-solid fa-user fa-fw" /> </div>
                                <input type="text" className="form-control" name="username" {...form.getFieldProps("username")} placeholder="Please enter email address " />
                                {form.touched.username && form.errors.username ?
                                  <div className="invalid-feedback" style={{ display: "block" }}>{form.errors.username}</div> : ''}
                              </div>
                              <div className="input-group">
                                <div className="input-group-text"> <i className="fa-solid fa-lock fa-fw" aria-hidden="true" /> </div>
                                <input className="form-control" name="password" {...form.getFieldProps("password")} type={toggle ? "text" : "password"} placeholder="Please enter password" id="password-field" />
                                <span toggle="#password-field" onClick={() => setToggle(!toggle)} className={toggle ? "fa fa-fw fa-eye field-icon toggle-password hideeyes" : "fa fa-fw fa-eye-slash field-icon toggle-password hideeyes"}></span>
                                {form.touched.password && form.errors.password ?
                                  <div className="invalid-feedback" style={{ display: "block" }}>{form.errors.password}</div> : ''}
                              </div>
                              <div className="form-group text-center mb-3 mt-3"> <button type="submit" className="btn btn-primary btn-lg w-100 br-7">Log In</button> </div>
                            </form>
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
      </div>

    </>
  )
}

export default Login