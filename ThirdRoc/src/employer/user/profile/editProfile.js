import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Service from '../../../lenderService';
import toast, { Toaster } from 'react-hot-toast';
import { GetProfile, UpdateProfile, GetCountry, UploadLogo } from '../../service/employService';
import { data } from 'jquery';
import ImageViewer from 'react-simple-image-viewer';
const config = require('../../../config.json')

const api = new Service();

const EditProfile = (props) => {
  const [profileData, setprofileData] = useState({});
  const [country, setCountry] = useState([]);
  const navigate = useNavigate();
  const user_id = useParams();
  const employer = JSON.parse(localStorage.getItem("employer"));
  const [uploadBr, setUploadBr] = useState({ 'pancard_image': 0, 'logo': 0, 'gstproof_image': 0, 'business_address_proof': 0, 'bank_statement': 0, 'itr_docs': 0 });

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
  const getCountry = async () => {
    const response = await GetCountry();
    console.log('response', response);
    if (response.status == true) {
      setCountry(response.data);
    } else {
      console.log("get Country data response", response);
    }
  }

  useEffect(() => {
    getCountry();
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
      country: profileData.country,
      logo: profileData.logo,
      
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
      country: "",
      logo: "",
      logo_true: "",
      wrong_message: ""
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      company_name: yup.string().required('Please enter company name'),
      full_name: yup.string().required('Please enter your name'),
      address: yup.string().required('Please enter address'),
      email: yup.string().email("Invalid email address format").required('Please enter valid email address'),
      //   mobile_number: yup.number().typeError('please enter a valid number').required('Please enter mobile number').positive(),
      mobile_number: yup.string().required('Please enter mobile number').min(10, "Mobile number must contain 10 number").max(10, "Mobile number must contain 10 number").matches(phoneRegExp, 'Please enter only number values'),
      // gst_number: yup.string().required('Please enter valid GST number'),
      // website: yup.string().required('Please enter valid website'),
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
        mobile_number: `${values.mobile_number}`,
        country: `${values.country}`,
        logo:`${values.logo}`
      });

      const response = await UpdateProfile(data, employer.employer_token)

      if (response.status === true) {
        console.log('inside tanmay', response.data);
        setprofileData(response.data);
        toast.success(response.message);
        navigate(process.env.REACT_APP_EMPLOYER_PRIFIX + '/profile');
      } else {
        console.log('error', response);
        toast.error(response);
      }

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
  const checkURL = (url) => {
    return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }
  const [images, setimages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const openImageViewer = (index, field_path, image_path) => {
    let data = [];
    let url = field_path.split(',');
    if (checkURL(config.s3_url + '' + image_path + '' + url[index])) {
      data.push(config.s3_url + '' + image_path + '' + url[index])
    }
    if (data.length) {
      setimages(data, setCurrentImage(0, setIsViewerOpen(true)))
    }
  }
  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  const imageUpload = async (e, path, s3_path, co_index = 0) => {
    console.log("event pancard", e, "path", path, "co_index", co_index, "s3_path", s3_path);

    if (e.target.files.length) {
      const formData = new FormData();

      formData.append('logo', e.target.files[0])


      const response = await UploadLogo(formData);
      if (response.status) {
        EditForm.setFieldValue(path, EditForm.values[path] ? EditForm.values[path] + ',' + response.Data : response.Data)
        EditForm.setFieldValue(path + '_true', true);
      } else {
        console.log(response);
      }


    }

  }
  const removeImage = (e, index, path, co_index = 0) => {
    e.preventDefault()
    var array;
    array = EditForm.values[path].split(',')
    array.splice(index, 1)
    if (array == '') {
      EditForm.setFieldValue(path + '_true', false);
    }
    EditForm.setFieldValue(path, array.join(','));
  }


  const updateAndSaveEmployerRecord = (e, path,) => {
    
    console.log("e", e, "path", path);
    if (e.target.value || e.target.type == 'file') {
      EditForm.setFieldValue(path + '_true', false);
      if (e.target.type == 'file') {
        EditForm.validateForm().then((res) => {
          if (res[path] == undefined) {
            EditForm.setFieldValue(path + '_true', true);
          }
        })
      }
    } else {
      if (e.target.type == 'file') {
      } else {
        EditForm.setFieldValue(path, e.target.value);
      }
      EditForm.setFieldValue(path + '_true', false);

    }
  }
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="main-container container-fluid px-0">
        <div className="page-header">
          <div className="page-leftheader">
            <h4 className="page-title mb-0 text-primary">Update Employer Profile</h4>
          </div>
        </div>
        <form className="mt-5 row" id='registerForm' onSubmit={EditForm.handleSubmit}>
          <div className="row">

            <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
              <div className="form-group">
                <label className="form-label">Employer Name</label>
                <div className="row g-xs">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Enter employer name" {...EditForm.getFieldProps("company_name")} />
                  </div>
                  {EditForm.touched.company_name && EditForm.errors.company_name ?
                    <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.company_name}</div> : ''}
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
              <div className="form-group">
                <label className="form-label">Name Of Contact Person</label>
                <div className="row g-xs">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Enter name" {...EditForm.getFieldProps("full_name")} />
                  </div>
                  {EditForm.touched.full_name && EditForm.errors.full_name ?
                    <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.full_name}</div> : ''}
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
              <div className="form-group">
                <label className="form-label">Country</label>
                <div className="row g-xs">
                  <div className="input-group">
                    <select className="form-control" name="country" {...EditForm.getFieldProps("country")}>
                      <option value="">Select Country</option>
                      {country.map(item => (<option key={item.id} value={item.id}>{item.name}</option>))}

                    </select>
                  </div>
                  {EditForm.touched.country && EditForm.errors.country ?
                    <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.country}</div> : ''}
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
              <div className="form-group">
                <label className="form-label">Mobile Number</label>
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

            {/* <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
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
            </div> */}

            <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
              <div className="form-group">
                <label className="form-label">Email</label>
                <div className="row g-xs">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Enter email" {...EditForm.getFieldProps("email")} />
                  </div>
                  {EditForm.touched.email && EditForm.errors.email ?
                    <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.email}</div> : ''}
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

            <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
              <label className="form-label">Logo</label>
              <div className="upload__box">
                <div className="upload__btn-box">
                  <label className="upload__btn">
                    <i
                      className="fa-solid fa-arrow-up-from-bracket fa-fw"></i>
                    <p>Upload images <span className="addmore-plus"><i
                      className="fa-solid fa-plus fa-fw"></i></span>
                      <small
                        style={{ display: "block", color: "#a5a5a5" }}>(JPG,
                        PNG only)</small>
                    </p>
                    <input type="file" accept=".jpg, .png" multiple
                      name="logo" onChange={(e) => imageUpload(e, 'logo', 'employer-logo-')}
                      onBlur={(e) => updateAndSaveEmployerRecord(e, 'logo')}
                      data-max_length="20"
                      className="upload__inputfile" />
                    {/* <input type="file" accept=".jpg, .png" multiple
																name="cheque_image"

																data-max_length="20"
																className="upload__inputfile" /> */}

                  </label>
                </div>
              </div>
              {EditForm.values.logo && EditForm.values.logo.split(',') && EditForm.values.logo.split(',').length > 0 ?

                <>
                  <ul className="imgpreview-newbx">
                    {uploadBr['logo'] > 0 ?
                      <div className="progress-imgupload">
                        <div className="progress-value" style={{ width: uploadBr['logo'] + '%' }}><span>{uploadBr['logo']}%</span></div>
                      </div>
                      : ''}
                    {EditForm.values.logo && EditForm.values.logo.split(',').map((option, index) => (
                      <li key={index} >

                        {checkURL(config.s3_url + 'employer-logo-' + option) ?
                          <>
                            <img src={config.s3_url + 'employer-logo-' + option} alt="" onClick={() => openImageViewer(index, EditForm.values.logo, 'employer-logo-')} />
                            <Link to="" onClick={(e) => { removeImage(e, index, 'logo') }} className="upload__img-close" ><i className="fa-solid fa-close fa-fw"></i></Link>
                            <p>{option}</p>
                          </>
                          :

                          <>
                            <Link to="" onClick={(e) => { removeImage(e, index, 'logo') }} className="upload__img-close" ><i className="fa-solid fa-close fa-fw"></i></Link>
                            <p>{option}</p>
                          </>
                        }
                      </li>
                    ))}
                  </ul>
                </>
                : ''}

            </div>


            <div className="col-md-12">
              <button type="submit" className="btn btn-primary mb-6 w-md mb-1 mt-1">Submit</button>
            </div>


          </div>
        </form>




      </div>
      {isViewerOpen && images && (
        <ImageViewer
          src={images}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}





    </>
  )
}
export default EditProfile;
