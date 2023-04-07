import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Service from '../../../lenderService';
import toast, { Toaster } from 'react-hot-toast';
import { GetProfile, UpdateProfile, GetCountry ,UploadLogo} from '../../service/lenderService';
const config = require('../../../config.json')


const api = new Service();

const EditProfile = (props) => {
  const [profileData, setprofileData] = useState({});
  const [country, setCountry] = useState([]);
  const navigate = useNavigate();
  const user_id = useParams();
  const [uploadBr, setUploadBr] = useState({ 'pancard_image': 0, 'logo': 0, 'gstproof_image': 0, 'business_address_proof': 0, 'bank_statement': 0, 'itr_docs': 0 });

  const checkURL = (url) => {
    return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }

  const lender = JSON.parse(localStorage.getItem("lender"));

  const getProfile = async (token) => {
    const response = await GetProfile(token);
    if (response.status == true) {
      setprofileData(response.data);
    } else {
      console.log("get employees data response", response);
    }
  }
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
    getProfile(lender.lender_token);
  }, [])

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
      mini_rate_of_intrest: profileData.mini_rate_of_intrest,
      max_rate_of_intrest: profileData.max_rate_of_intrest,
      mini_loan_range: profileData.mini_loan_range,
      max_loan_range: profileData.max_loan_range,
      mini_tenure: profileData.mini_tenure,
      max_tenure: profileData.max_tenure,
      logo: profileData.logo,
    })
  }, [profileData])

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const EditForm = useFormik({

    initialValues: {
      company_name: "",
      full_name: "",
      address: "",
      country: "",
      mobile_number: "",
      gst_number: "",
      website: "",
      mini_rate_of_intrest: "",
      max_rate_of_intrest: "",
      mini_loan_range: "",
      max_loan_range: "",
      mini_tenure: "",
      max_tenure: "",
      logo: "",
      logo_true:'',
      wrong_message: ""
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      company_name: yup.string().required('Please enter company name'),
      full_name: yup.string().required('Please enter your name'),
      address: yup.string().required('Please enter address'),
      country: yup.string().required('Please enter country'),
      //   mobile_number: yup.number().typeError('please enter a valid number').required('Please enter mobile number').positive(),
      mobile_number: yup.string().required('Please enter mobile number').min(10, "Mobile number must contain 10 number").max(10, "Mobile number must contain 10 number").matches(phoneRegExp, 'Please enter only number values'),
      gst_number: yup.string().required('Please enter valid GST number'),
      website: yup.string().required('Please enter valid website'),
      mini_rate_of_intrest: yup.number().typeError('Please enter a valid rate of intrest').required('Please enter minimum rate of intrest'),
      max_rate_of_intrest: yup.number().typeError('Please enter a valid rate of intrest').required('Please enter maximum rate of intrest'),
      mini_loan_range: yup.number().typeError('Please enter a valid loan range').required('Please enter minimum loan range'),
      max_loan_range: yup.number().typeError('Please enter a valid loan range').required('Please enter maximum loan range'),
      mini_tenure: yup.number().typeError('Please enter a valid tenure').required('Please enter minimum tenure'),
      max_tenure: yup.number().typeError('Please enter a valid tenure').required('Please enter maximum tenure '),
    }),
    onSubmit: async values => {
      const response = await UpdateProfile(JSON.stringify(values), lender.lender_token);
      if (response.status === true) {
        setprofileData(response.data);
        toast.success(response.message);
        navigate(process.env.REACT_APP_LENDER_PRIFIX + '/profile')
      } else {
        console.log('inside abhi', response);
        toast.error(response.message);
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
            <h4 className="page-title mb-0 text-primary">Update Lender Profile</h4>
          </div>
        </div>
        <form className="mt-5 row" id='registerForm' onSubmit={EditForm.handleSubmit}>
          <div className="row">

            <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
              <div className="form-group">
                <label className="form-label">Company Name</label>
                <div className="row g-xs">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Enter Company Name" {...EditForm.getFieldProps("company_name")} />
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
                  <select className="form-control" name="country" {...EditForm.getFieldProps("country")}>
                    <option value="">Select Country</option>
                    {country.map(item => (<option key={item.id} value={item.name}>{item.name}</option>))}

                  </select>
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
            <div class="col-xl-4 col-lg-6 col-md-6 col-xm-12">
              <div class="form-group">
                <label class="form-label">Maximum Rate Of Interest</label>
                <div class="row g-xs">
                  <div class="input-group">
                    <input type="text" name="max_rate_of_intrest"{...EditForm.getFieldProps("max_rate_of_intrest")} class="form-control" placeholder="Enter Maximum Rate Of Interest" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-6 col-md-6 col-xm-12">
              <div class="form-group">
                <label class="form-label">Minimum Rate Of Interest</label>
                <div class="row g-xs">
                  <div class="input-group">
                    <input type="text" name="mini_rate_of_intrest"{...EditForm.getFieldProps("mini_rate_of_intrest")} class="form-control" placeholder="Enter Minimum Rate Of Interest" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-6 col-md-6 col-xm-12">
              <div class="form-group">
                <label class="form-label">Maximum Loan Range</label>
                <div class="row g-xs">
                  <div class="input-group">
                    <input type="text" name="max_loan_range"{...EditForm.getFieldProps("max_loan_range")} class="form-control" placeholder="Enter Maximum Loan Range" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-6 col-md-6 col-xm-12">
              <div class="form-group">
                <label class="form-label">Minimum Loan Range</label>
                <div class="row g-xs">
                  <div class="input-group">
                    <input type="text" name="mini_loan_range"{...EditForm.getFieldProps("mini_loan_range")} class="form-control" placeholder="Enter Manimum Loan Range" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-6 col-md-6 col-xm-12">
              <div class="form-group">
                <label class="form-label">Maximum Tenure(Months)</label>
                <div class="row g-xs">
                  <div class="input-group">
                    <input type="text" name="max_tenure"{...EditForm.getFieldProps("max_tenure")} class="form-control" placeholder="Enter maximum Tenure" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-6 col-md-6 col-xm-12">
              <div class="form-group">
                <label class="form-label">Minimum Tenure(Months)</label>
                <div class="row g-xs">
                  <div class="input-group">
                    <input type="text" name="mini_tenure"{...EditForm.getFieldProps("mini_tenure")} class="form-control" placeholder="Enter Minimum Tenure" />
                  </div>
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
                      name="logo" onChange={(e) => imageUpload(e, 'logo', 'lender-logo-')}
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

                        {checkURL(config.s3_url + 'lender-logo-' + option) ?
                          <>
                            <img src={config.s3_url + 'lender-logo-' + option} alt="" onClick={() => openImageViewer(index, EditForm.values.logo, 'lender-logo-')} />
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






    </>
  )
}
export default EditProfile;
