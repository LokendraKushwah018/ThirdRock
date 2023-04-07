import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { MerchantRegistration, GetCountry ,AddStores} from '../../service/MerchantService';
const config = require('../../../config.json')


//Lender Registration API
const AddStore = () => {

  // const [uploadBr, setUploadBr] = useState({ 'logo': 0, 'gstproof_image': 0 });
  const urlR =  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

  const [pancardImageFile, setPancardImageFile] = useState({});
  const [uploadBr, setUploadBr] = useState({ 'pancard_image': 0, 'gstproof_image': 0, 'business_address_proof': 0, 'bank_statement': 0, 'itr_docs': 0 });
  const [s3path, setS3path] = useState({});
  const [country, setCountry] = useState([]);
  const merchant = JSON.parse(localStorage.getItem("merchant"));
  const [apiError, setApiError] = useState({
    email: '',
    mobile_number: ''
  })
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
  const eyeBtnStyle = {
    position: 'absolute',
    marginLeft: '0px',
    marginTop: '0px',
    marginRight: '10px'
  }

  const eyeBtnStyle1 = {
    position: 'absolute',
    marginLeft: '221px',
    marginTop: '16px',
  }

  const [logoValue, setDocValue] = useState({})
  const navigate = useNavigate();

  const uploadLogoFunc = async (e) => {
    console.log('e.target.files[0]', e.target.files[0]);
    const file = e.target.files[0];
    setDocValue(file);
    form.setValues({
      ...form.values,
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
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const regex = /[A-Za-z]/;

  const checkURL = (url) => {
    return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
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
    getCountry();
  }, [])
  const removeImage = (e, index, path, co_index = 0) => {
    e.preventDefault()
    var array;
    array = form.values[path].split(',')
    array.splice(index, 1)
    if (array == '') {
      form.setFieldValue(path + '_true', false);
    }
    form.setFieldValue(path, array.join(','));
  }
  const form = useFormik({
    initialValues: {
      company_name: "",
      full_name: "",
      mobile_number: "",
      gst_number: "",
      address: "",
      website: "",
      password: "",
      confirmedPassword: "",
      country:"",
      logo: "",
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      company_name: yup.string().required('Please enter merchant name'),
      full_name: yup.string().required('Please enter full name').matches(regex, 'Please enter only charachter values'),
      mobile_number: yup.string().required('Please enter mobile number').matches(phoneRegExp, 'Please enter only number values').min(10, "Mobile number must contain 10 number").max(10, "Mobile number must contain 10 number"),
      gst_number: yup.string().required('Please enter GST number'),
      address: yup.string().required('Please enter address'),
      // website: yup.string().required('Please enter website').matches(urlR, 'Please enter valid website url'),
      password: yup.string().required('Please enter password'),
      confirmedPassword: yup.string().required('Please enter confirm password'),
      // country: yup.string().required('Please enter country'),
      // logo: yup.string().required('Please upload your logo'),
    }),


    onSubmit: async (values) => {
      setApiError({ ...apiError, mobile_number: '', email: '' });

      const formData = new FormData();
      formData.append("merchant_id", merchant.user_id);
      formData.append("logo", logoValue);
      formData.append("company_name", form.getFieldProps('company_name').value);
      formData.append("country", form.getFieldProps('country').value);
      formData.append("full_name", form.getFieldProps('full_name').value);
      formData.append("address", form.getFieldProps('address').value);
      formData.append("mobile_number", form.getFieldProps('mobile_number').value);
      formData.append("gst_number", form.getFieldProps('gst_number').value);
      formData.append("website", form.getFieldProps('website').value);
      formData.append("password", form.getFieldProps('password').value);
      formData.append("confirmedPassword", form.getFieldProps('confirmedPassword').value);

      const response = await AddStores(formData);

      if (response.status === true) {
        toast.success(response.message);
        // let merchant = {
        //   user_type: response.user_type == 'USERS' ? response.user_type.toLowerCase() : 'merchant',
        //   merchant_token: response.token,
        //   user_id: response.data.user_id
        // }
        // localStorage.setItem('merchant', JSON.stringify(merchant));
        navigate(process.env.REACT_APP_MARCHNT_PRIFIX + '/store_list');
      } else {
        if (response.message == 'mobile_number must be unique') {
          
          toast.error('Mobile Number Already Exists');
        }else{

          toast.error(response.message);
        }
        console.log(response);
      }



    },
  });

  const imageUpload = (e, path, s3_path, co_index = 0) => {
    console.log("event pancard", e);

    if (e.target.files.length) {



      console.log('logoValue', logoValue);

      const formData1 = new FormData();
      for (let i = 0; i < e.target.files.length; i++) {
        formData1.append('image', e.target.files[i])
      }
      formData1.append('folder', s3_path)
      console.log('file length', e.target.files.length);
      const file = e.target.files[0]
      console.log('file', file);

      setPancardImageFile(file)
      setS3path(s3_path)

  
    }
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div class="page">
          <div class="container">
              
                <div class="row justify-content-center">
                  
                      {/* <div class="col-lg-5 p-0">
                        <div class="text-justified text-white p-5 register-1 overflow-hidden">
                          <div class="custom-content">
                            <div class="">
                              <div class="fs-22 mb-4 font-weight-bold text-white">Welcome Back To ThirdRoc!</div>
                              <h6>Personal Loans</h6>
                              <div class="mb-2 text-white-50 d-flex"><i class="fa-solid fa-circle-dot fa-fw me-3 postop"></i> No Collateral/Security Required. Personal loans don't need you to provide any collateral such as a house or car to avail a personal loan.</div>
                              <div class="mb-2 text-white-50 d-flex"><i class="fa-solid fa-circle-dot fa-fw me-3 postop"></i> Flexible End Use.</div>
                              <div class="mb-2 text-white-50 d-flex"><i class="fa-solid fa-circle-dot fa-fw me-3 postop"></i> Flexible Tenure.</div>
                              <div class="mb-2 text-white-50 d-flex"><i class="fa-solid fa-circle-dot fa-fw me-3 postop"></i> Minimal Documentation.</div>
                              <div class="mb-2 text-white-50 d-flex"><i class="fa-solid fa-circle-dot fa-fw me-3 postop"></i> Quick Disbursal.</div>
                              <div class="mb-2 text-white-50 d-flex"><i class="fa-solid fa-circle-dot fa-fw me-3 postop"></i> Flexible Loan Amount.</div>

                              <h6 class="mt-5">Business Loans</h6>
                              <div class="mb-2 text-white-50 d-flex"><i class="fa-solid fa-circle-dot fa-fw me-3 postop"></i> Unsecured Business Loans/ No Collateral Required</div>
                              <div class="mb-2 text-white-50 d-flex"><i class="fa-solid fa-circle-dot fa-fw me-3 postop"></i> Minimum KYC</div>
                              <div class="mb-2 text-white-50 d-flex"><i class="fa-solid fa-circle-dot fa-fw me-3 postop"></i> Furnishes your Working Capital Requirement, Manage operational cost, growth & expansion of Business</div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                      <div class="col-md-12 col-lg-12 p-0 mx-auto">
                        <div class="bg-white text-dark br-7 br-tl-0 br-bl-0">
                          <div class="card-body">
                            <div class="text-center mb-3">
                              <h3 class="mb-2">Add Store</h3>
                            </div>
                            {/* {form.values.wrong_message ?
                              <div className="invalid-feedback mb-3 mt-2" style={{ display: "block", textAlign: "center" }}>{form.values.wrong_message}</div>
                              : ''} */}
                            <form className="mt-5 row" id='registrationForm' onSubmit={form.handleSubmit}>
                              <div className="input-group mb-4 col-lg-6">
                                <div className="input-group-text">
                                  <i className="fa-solid fa-building fa-fw" /> </div>
                                <input type="text" name="company_name" {...form.getFieldProps("company_name")} className="form-control" placeholder="Merchant Name" />
                                {form.touched.company_name && form.errors.company_name ?
                                  <div className="invalid-feedback" style={{ display: "block" }}>{form.errors.company_name}</div> : ''}
                              </div>
                              <div className="input-group mb-4 col-lg-6">
                                <div className="input-group-text">
                                  <i className="fa-solid fa-user fa-fw" /> </div>
                                <input type="text" name="full_name" {...form.getFieldProps("full_name")} className="form-control" placeholder="Name Of Contact Person" />
                                {form.touched.full_name && form.errors.full_name ?
                                  <div className="invalid-feedback" style={{ display: "block" }}>{form.errors.full_name}</div> : ''}
                              </div>
                              
                              <div className="input-group mb-4 col-lg-6">
                                <div className="input-group-text">
                                  <i className="fa-solid fa-phone fa-fw" /> </div>
                                <input type="text" name="mobile_number" {...form.getFieldProps("mobile_number")} className="form-control" placeholder="Mobile Number" />
                                {form.touched.mobile_number && form.errors.mobile_number ?
                                  <div className="invalid-feedback" style={{ display: "block" }}>{form.errors.mobile_number}</div> : ''}
                                {apiError.mobile_number ?
                                  <div className="invalid-feedback mb-3 mt-2" style={{ display: "block", textAlign: "center" }}>{apiError.mobile_number}</div>
                                  : ''}
                              </div>
                              <div className="input-group mb-4 col-lg-6">
                                <div className="input-group-text">
                                  <i className="fa-solid fa-address-card fa-fw" /> </div>
                                <input type="text" name="gst_number" {...form.getFieldProps("gst_number")} className="form-control" placeholder="GST No." />
                                {form.touched.gst_number && form.errors.gst_number ?
                                  <div className="invalid-feedback" style={{ display: "block" }}>{form.errors.gst_number}</div> : ''}
                              </div>
                              <div className="input-group mb-4 col-lg-6">
                                <div className="input-group-text">
                                  <i className="fa-solid fa-location-dot fa-fw" /> </div>
                                <input type="text" name="address" {...form.getFieldProps("address")} className="form-control" placeholder="Address" />
                                {form.touched.address && form.errors.address ?
                                  <div className="invalid-feedback" style={{ display: "block" }}>{form.errors.address}</div> : ''}
                              </div>
                              <div className="input-group mb-4 col-lg-6">
                                <a className="input-group-text"> <i className="fa-solid fa-globe fa-fw" /></a>
                                <input className="form-control" type="text" name="website" {...form.getFieldProps("website")} placeholder="Website" id="password-field" />
                                {form.touched.website && form.errors.website ?
                                  <div className="invalid-feedback" style={{ display: "block" }}>{form.errors.website}</div> : ''}
                                {/* <span toggle="#password-field" className="fa fa-fw fa-eye-slash field-icon toggle-password hideeyes r20" /> */}
                              </div>
                              <div className="input-group mb-4 col-lg-6">
                                <div className="input-group-text">
                                <i class="fa-solid fa-earth-americas"></i> </div>
                                <select className="form-control" name="country" {...form.getFieldProps("country")}>
                                  <option value="">Select Country</option>
                                  {country.map(item => (<option key={item.id} value={item.name}>{item.name}</option>))}

                                </select>
                                {form.touched.country && form.errors.country ?
                                  <div className="invalid-feedback" style={{ display: "block" }}>{form.errors.country}</div> : ''}
                              </div>
                           
                              <div className="input-group mb-4 col-lg-6">
                                <a className="input-group-text"> <i className="fa-solid fa-lock fa-fw" aria-hidden="true"></i> </a>
                                <input className="form-control" {...form.getFieldProps("password")} type={values.showPassword ? "text" : "password"} name="password" placeholder="Password" id="password-field" />


                                {!values.showPassword ?
                                  <span toggle="#password-field" onClick={handleClickShowPassword} style={eyeBtnStyle} className="fa fa-fw fa-eye field-icon toggle-password hideeyes"></span>
                                  :
                                  <span toggle="#password-field" onClick={handleClickShowPassword} style={eyeBtnStyle1} className="fa fa-fw fa-eye-slash field-icon toggle-password hideeyes1"></span>

                                }
                                {form.touched.password && form.errors.password ?
                                  <div className="invalid-feedback" style={{ display: "block" }}>{form.errors.password}</div> : ''}
                                {/* <span toggle="#password-field" onClick={handleClickShowPassword} style={eyeBtnStyle} className="fa fa-fw fa-eye-slash field-icon toggle-password hideeyes r20"></span> */}
                              </div>
                              <div className="input-group mb-4 col-lg-6">
                                <a className="input-group-text"> <i className="fa-solid fa-lock fa-fw" aria-hidden="true"></i> </a>
                                <input className="form-control" {...form.getFieldProps("confirmedPassword")} type={valuesConfP.showConfPassword ? "text" : "password"} name="confirmedPassword" placeholder="Confirm Password" id="password-field" />
                                {form.touched.confirmedPassword && form.errors.confirmedPassword ?
                                  <div className="invalid-feedback" style={{ display: "block" }}>{form.errors.confirmedPassword}</div> : ''}
                                {!valuesConfP.showConfPassword ?
                                  <span toggle="#password-field" onClick={handleClickShowConfPassword} style={eyeBtnStyle} className="fa fa-fw fa-eye field-icon toggle-password hideeyes"></span>
                                  :
                                  <span toggle="#password-field" onClick={handleClickShowConfPassword} style={eyeBtnStyle1} className="fa fa-fw fa-eye-slash field-icon toggle-password hideeyes1"></span>

                                }

                                {/* <span toggle="#password-field" onClick={handleClickShowConfPassword} style={eyeBtnStyle} className="fa fa-fw fa-eye-slash field-icon toggle-password hideeyes r20"></span> */}
                              </div>
                              <div className="input-group file-browser mb-5">
                                <input type="text" className="form-control browse-file" placeholder="Upload your logo" />
                                <label className="input-group-text btn btn-primary"> Browse <input type="file" className="file-browserinput" onChangeCapture={uploadLogoFunc} onChange={(e) => imageUpload(e, 'dsa_doc', 'uploads/merchant/pancard')} style={{ display: 'none' }} multiple /> </label>
                                {/* {form.touched.logo && form.errors.logo ?
                                  <div className="invalid-feedback" style={{ display: "block" }}>{form.errors.logo}</div> : ''} */}
                              </div>

                              {logoValue && logoValue.name ? <ul className="imgpreview-newbx">
                                <li className="registerboximg">
                                  <img src={URL.createObjectURL(logoValue)} alt="" />
                                  <Link to="" onClick={() => setDocValue({})} className="upload__img-close"><i className="fa-solid fa-close fa-fw"></i></Link>
                                  <p>img preview name here</p>
                                </li>
                              </ul> : ""}

                              {/* <ul className="imgpreview-newbx">
										<li className="registerboximg">
										    <img src="../assets/img/Fintranxect-Logo-1.png" alt="" />
										    <a href="" className="upload__img-close"><i className="fa-solid fa-close fa-fw"></i></a>
											<p>img preview name here</p>
										</li>
										
									</ul> */}
                              {/* <div className="input-group col-lg-12">

                                {form.values.dsa_doc && form.values.dsa_doc.split(',') && form.values.dsa_doc.split(',').length > 0 ?
                                  <>
                                    <ul className="imgpreview-newbx">
                                      {uploadBr['dsa_doc'] > 0 ?
                                        <div className="progress-imgupload">
                                          <div className="progress-value" style={{ width: uploadBr['dsa_doc'] + '%' }}><span>{uploadBr['dsa_doc']}%</span></div>
                                        </div>
                                        : ''}
                                      {form.values.dsa_doc && form.values.dsa_doc.split(',').map((option, index) => (
                                        <li key={index} >

                                          {checkURL(config.s3_url + 'uploads/merchant/pancard/' + option) ?
                                            <>
                                              <img src={config.s3_url + 'uploads/merchant/pancard/' + option} alt="" onClick={() => openImageViewer(index, form.values.dsa_doc, 'uploads/merchant/pancard/')} />
                                              <Link to="" onClick={(e) => { removeImage(e, index, 'dsa_doc') }} className="upload__img-close" ><i className="fa-solid fa-close fa-fw"></i></Link>
                                              <p>{option}</p>
                                            </>
                                            :

                                            <>
                                              <Link to="" onClick={(e) => { removeImage(e, index, 'dsa_doc') }} className="upload__img-close" ><i className="fa-solid fa-close fa-fw"></i></Link>
                                              <p>{option}</p>
                                            </>
                                          }
                                        </li>
                                      ))}
                                    </ul>
                                  </>
                                  : ''}
                              </div> */}


                              {/* <div className="input-group file-browser mb-5"> <input {...form.getFieldProps("logo")} type="file" className="form-control browse-file" placeholder="Upload Your Logo" /> <label className="input-group-text btn btn-primary"> Browse <input type="file" className="file-browserinput" style={{ display: 'none' }} multiple /> </label> </div> */}
                              <div type="submit" className="form-group text-center mb-3 mt-3"> <button type='submit' className="btn btn-primary btn-lg w-100 br-7">Register</button> </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    
                </div>
            
          </div>
        
      </div>

    </>
  )
}

export default AddStore
