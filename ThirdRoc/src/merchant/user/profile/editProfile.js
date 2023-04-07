import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Service from '../../../lenderService';
import toast, { Toaster } from 'react-hot-toast';
import ImageViewer from 'react-simple-image-viewer';
import { GetProfile, UpdateProfile, GetCountry,UploadLogo } from '../../service/MerchantService';
const config = require('../../../config.json')

const api = new Service();

const EditProfile = (props) => {
  const [profileData, setprofileData] = useState({});
  const navigate = useNavigate();
  const [progressName, setProgressName] = useState('');
  const [country, setCountry] = useState([]);
  const user_id = useParams();
  const merchant = JSON.parse(localStorage.getItem("merchant"));
  const merchantUserId = merchant.user_id;
  const [pancardImageFile, setPancardImageFile] = useState({});
  const [uploadBr, setUploadBr] = useState({ 'pancard_image': 0, 'logo': 0, 'gstproof_image': 0, 'business_address_proof': 0, 'bank_statement': 0, 'itr_docs': 0 });
  const [s3path, setS3path] = useState({});

  const getProfile = async (token) => {
    const response = await GetProfile(token, merchantUserId);
    if (response.status) {
      setprofileData(response.data)
    } else {
      console.log(response);
    }
  }
  useEffect(() => {
    getProfile(merchant.merchant_token)
  }, [])
  const checkURL = (url) => {
    return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }
  const updateprofile = async (token, data) => {
    const response = await UpdateProfile(token, data);
    if (response.status) {
      setprofileData(response.data);
      toast.success(response.message);
      navigate(props.prefix + '/profile')
    } else {
      console.log(response);
      toast.error(response.message);
    }
  }
  useEffect(() => {
    EditForm.setValues({
      user_id: profileData.user_id,
      company_name: profileData.company_name,
      full_name: profileData.full_name,
      country: profileData.country,
      address: profileData.address,
      mobile_number: profileData.mobile_number,
      gst_number: profileData.gst_number,
      website: profileData.website,
      logo: profileData.logo,
    })
  }, [profileData])

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const EditForm = useFormik({

    initialValues: {
      user_id: "",
      company_name: "",
      full_name: "",
      address: "",
      country: "",
      mobile_number: "",
      gst_number: "",
      website: "",
      logo: "",
      logo_true:'',
      wrong_message: ""
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      company_name: yup.string().required('Please enter company name'),
      full_name: yup.string().required('Please enter company name'),
      address: yup.string().required('Please enter address'),
      country: yup.string().required('Please enter country'),
      //   mobile_number: yup.number().typeError('please enter a valid number').required('Please enter mobile number').positive(),
      mobile_number: yup.string().required('Please enter mobile number').min(10, "Mobile number must contain 10 number").max(10, "Mobile number must contain 10 number").matches(phoneRegExp, 'Please enter only number values'),
      gst_number: yup.string().required('Please enter valid GST number'),
      website: yup.string().required('Please enter valid website'),
    }),
    onSubmit: values => {
      console.log('values', values);
      console.log('inside edit Form');
      let data = JSON.stringify(values);

      updateprofile(merchant.merchant_token, data);
    }
  });

  const getCountry = async () => {
    const response = await GetCountry();
    if (response.status == true) {
      setCountry(response.data);
    } else {
      console.log("get Country data response", response);
    }
  }
 
  useEffect(() => {
    getCountry()
  }, [])
  const [logoValue, setDocValue] = useState({})
  const uploadLogoFunc = async (e) => {
    console.log('e.target.files[0]', e.target.files[0]);
    const file = e.target.files[0];
    setDocValue(file);
    EditForm.setValues({
      ...EditForm.values,
      logo: file
    })
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
    const updateAndSaveMerchantRecord = (e, path,) => {
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
            <h4 className="page-title mb-0 text-primary">Update Merchant Profile</h4>
          </div>
        </div>
        <form className="mt-5 row" id='registerForm' onSubmit={EditForm.handleSubmit}>
          <div className="row">

            <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
              <div className="form-group">
                <label className="form-label">Merchant Name</label>
                <div className="row g-xs">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Enter Merchant Name" {...EditForm.getFieldProps("company_name")} />
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
                    <input type="text" className="form-control" placeholder="Enter Name" {...EditForm.getFieldProps("full_name")} />
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
                      {country.map(item => (<option key={item.id} value={item.name}>{item.name}</option>))}

                    </select>
                  </div>
                  {EditForm.touched.email && EditForm.errors.email ?
                    <div className="invalid-feedback" style={{ display: "block" }}>{EditForm.errors.email}</div> : ''}
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <div className="row g-xs">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Enter Mobile Number" {...EditForm.getFieldProps("mobile_number")} />
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
                    <input type="text" className="form-control" placeholder="Enter Address" {...EditForm.getFieldProps("address")} />
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
                    <input type="text" className="form-control" placeholder="Enter GST Number" {...EditForm.getFieldProps("gst_number")} />
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
                    <input type="text" className="form-control" placeholder="Enter Website" {...EditForm.getFieldProps("website")} />
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
                      name="logo" onChange={(e) => imageUpload(e, 'logo', 'merchant-logo-')}
                      onBlur={(e) => updateAndSaveMerchantRecord(e, 'logo')}
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

                        {checkURL(config.s3_url + 'merchant-logo-' + option) ?
                          <>
                            <img src={config.s3_url + 'merchant-logo-' + option} alt="" onClick={() => openImageViewer(index, EditForm.values.logo, 'merchant-logo-')} />
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
              <button type="submit" className="btn btn-primary mb-6 w-md mb-1 mt-1">Save Changes</button>
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
