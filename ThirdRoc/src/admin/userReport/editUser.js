import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Service from '../../adminService';
import toast, { Toaster } from 'react-hot-toast';



const api = new Service();

const EditUsers = (props) => {
  const [profileData, setprofileData] = useState({});
  const navigate = useNavigate();
  const {user_id }= useParams();
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  useEffect(() => {
    api.getApi('admin/getUsersById',{ user_id : user_id}).then(response => {

    if (response.status === true) {
      console.log('inside tanmay', response.data);
      setprofileData(response.data);


    }
  }).catch(error => {
    console.log('error', error);
  });
  }, [user_id])


   useEffect(() => {
    EditForm.setValues({
      user_id: user_id,
      first_name: profileData.full_name,
      last_name: profileData.full_name,
      company_name: profileData.company_name,
      age: profileData.age,
      email: profileData.email,
      mobile_number: profileData.mobile_number,
      occupation: profileData.occupation ? profileData.occupation : "",
      user_name: profileData.user_name,
      address: profileData.address,
      gst_number: profileData.gst_number,
      website: profileData.website,

    })
  }, [profileData])

  const EditForm = useFormik({

    initialValues: {
      user_name: "",
      company_name: "",
      first_name: "",
      last_name: "",
      email: "",
      mobile_number: "",
      address: "",
      age: "",
      occupation: "",
      gst_number: "",
      website: "",
      user_id: user_id,
      password:"",
      wrong_message: ""
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      user_name: yup.string().required('Please enter user_name'),
      address: yup.string().required('Please enter address'),
      company_name: yup.string().required('Please enter company_name'),
      gst_number: yup.string().required('Please enter gst_number'),
      first_name: yup.string().required('Please enter first_name'),
      last_name: yup.string().required('Please enter last_name'),
      age: yup.number().typeError('please enter a valid number').required('Please enter age'),
      email: yup.string().required('Please enter email'),
      mobile_number: yup.string().required('Please enter mobile number').min(10, "Mobile number must contain 10 number").max(10, "Mobile number must contain 10 number").matches(phoneRegExp, 'Please enter only number values'),
      website: yup.string().required('Please enter website'),
      occupation: yup.string().required('Please enter occupation'),
      password:  yup.string(),
    }),
    onSubmit: values => {
      console.log('values', values);
      console.log('inside edit Form');
      api.postApi('admin/editUsersProfile', values).then(response => {

        if (response.status === true) {
          console.log('inside tanmay', response.data);
          setprofileData(response.data);
          toast.success(response.message);
          navigate('/admin/users')

        }
      }).catch(error => {
        console.log('error', error);
        toast.error(error);

      });
    }
  });







  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="main-container container-fluid px-0">
        <div className="page-header">
          <div className="page-leftheader">
            <h4 className="page-title mb-0 text-primary">Personal Info</h4>
          </div>
        </div>
        <form className="mt-5 row" id='registerForm' onSubmit={EditForm.handleSubmit}>
          <div className="row">
            <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
              <div className="form-group">
                <label className="form-label">Username</label>
                <div className="row g-xs">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Enter Name" {...EditForm.getFieldProps("user_name")} />
                  </div>
                  {EditForm.touched.user_name && EditForm.errors.user_name ?
                    <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.user_name}</div> : ''}
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
              <div className="form-group">
                <label className="form-label">Company Name</label>
                <div className="row g-xs">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Enter company name" {...EditForm.getFieldProps("company_name")} />
                  </div>
                  {EditForm.touched.company_name && EditForm.errors.company_name ?
                    <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.company_name}</div> : ''}
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <div className="row g-xs">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Enter Name" {...EditForm.getFieldProps("first_name")} />
                  </div>
                  {EditForm.touched.first_name && EditForm.errors.first_name ?
                    <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.first_name}</div> : ''}
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <div className="row g-xs">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Enter Name" {...EditForm.getFieldProps("last_name")} />
                  </div>
                  {EditForm.touched.last_name && EditForm.errors.last_name ?
                    <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.last_name}</div> : ''}
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
                <label className="form-label">Type Of Occupation</label>
                <div className="row g-xs">
                  <div className="input-group">
                    <select {...EditForm.getFieldProps("occupation")} className="form-control"><option>Selct Occupation</option>
                      <option>Engineer</option>
                      <option>Manager</option>
                      <option>Loan provider</option>
                    </select>
                    {EditForm.touched.occupation && EditForm.errors.occupation ?
                      <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.occupation}</div> : ''}
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
                  {EditForm.touched.address && EditForm.errors.address ?
                    <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.address}</div> : ''}
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
              <div className="form-group">
                <label className="form-label">Age</label>
                <div className="row g-xs">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Enter Age" {...EditForm.getFieldProps("age")} />
                  </div>
                  {EditForm.touched.age && EditForm.errors.age ?
                    <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.age}</div> : ''}
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

            <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="row g-xs">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Enter Password" {...EditForm.getFieldProps("password")} />
                  </div>
                  {EditForm.touched.password && EditForm.errors.password ?
                    <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.password}</div> : ''}
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
export default EditUsers;
