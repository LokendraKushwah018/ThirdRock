import { Link, } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Service from '../../lenderService';
import $ from 'jquery';

const api = new Service();

const Api = () => {
  const [keyData, setkeyData] = useState({});
  const [IpData, setIpData] = useState({});

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


  //Lender Get Secret Key API
  useEffect(() => {
    api.getApi('lender/get-secret-key').then(response => {
      console.log('response', response);
      if (response.status === true) {
        setkeyData(response);


      }
    }).catch(error => {
      console.log('error', error);
    });
  }, [])

  

  const changeSecretKey = () => {
    api.getApi('lender/genrate-secret-key').then(response => {
      console.log('response', response);
      if (response.status === true) {
        setkeyData(response);
        window.$('#changekey').modal('hide');
        
        

      }
    }).catch(error => {
      console.log('error', error);
    });
  }

  // useEffect(() => {
  //   api.getApi('dsa/genrate-secret-key').then(response => {
  //     console.log('response',response);
  //     if (response.status === true) {
  //       setIpData(response);
  //     }
  //   }).catch(error => {
  //     console.log('error', error);
  //   });
  // }, [])

  //Lender Get White Ip API 
  useEffect(() => {
  getIp();
  }, [])

  const getIp =()=>{
    api.getApi('lender/get-ip').then(response => {
      console.log('response get ip', response.white_ip);
      if (response.status === true) {
        setIpData(response.white_ip);
      }
    }).catch(error => {
      console.log('error', error);
    });
  }

  //Add White IP 
  const addIpForm = useFormik({
    initialValues: {
      ip_address: "",
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      ip_address: yup.string().required('Please enter Ip address')
      // .matches(phoneRegExp, 'Please enter only number'),
    }),
    onSubmit: values => {
      console.log('values',values);
      api.postApi('lender/add-ip', values).then(response => {
        if (response.status === true) {
          window.$('#Addkey-modal').modal('hide');
          getIp();
          // toast.success(response.message);

        }
      }).catch(error => {
        addIpForm.setFieldValue('wrong_message', error.message)
      });
    }
  });

  const editIpForm = useFormik({
    initialValues: {
      ip_address: "",
      ip_id: ""
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      ip_address: yup.string().required('Please enter Ip address')
      // .matches(phoneRegExp, 'Please enter only number'),
    }),
    onSubmit: values => {
      console.log('values',values);
      api.postApi('lender/update-ip', values).then(response => {
        if (response.status === true) {
          getIp();
          window.$('#Editkey-modal').modal('hide');

        }
      }).catch(error => {
        addIpForm.setFieldValue('wrong_message', error.message)
      });
    }
  });
 
const editIpAdd =(id,ipAdd)=>{
  console.log('index',id, 'ipAdd',ipAdd);
  editIpForm.setValues(
    {
      ip_address:ipAdd,
      ip_id:id
    }
  )
}

  return (
    <>
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
      <div className="main-container container-fluid px-0">
        {/*Page header*/}
        <div className="page-header">
          <div className="page-leftheader">
            <h4 className="page-title mb-0 text-primary">Api Management</h4>
          </div>
          <div className="page-rightheader">
          <div className="col-lg-12 col-xl-6 text-right p-0 mb-3">
          <button  className="btn btn-outline-primary btn-sm mt-3" data-bs-target="#Addkey-modal" data-bs-toggle="modal"><i className="fa-regular fa-pen-to-square fa-fw" /> Add IP</button>
            </div>
            {/* <div >
              <button  data-bs-target="#apikey-modal" data-bs-toggle="modal" className="btn btn-outline-primary"><i className="fa fa-plus me-2" /> Add IP</button>
            </div> */}
          </div>
        </div>
        <div className="main-proifle">
          <div className="row">
            <div className="col-lg-12 col-xl-6 p-0">
              <div className="box-widget widget-user">
                <div className="widget-user-image1 d-xl-flex d-block flexwrap">
                  <div className="col-md-12">
                    <p className="mb-0 font-weight-semibold">Secret Key:  <small className="font-weight-semibold text-muted"> {keyData.secret_key}</small></p>
                    <h4 className="pro-user-username mb-3 font-weight-bold"></h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-xl-6 text-right p-0 mb-3">
              <Link to="/" data-bs-target="#changekey" data-bs-toggle="modal" className="btn btn-primary">
                <i className="fa-solid fa-key me-2" />Change Key</Link>
            </div>
            <div className="col-md-12">
              <hr className="mt-1 mb-3s" />
              {/* {IpData.length > 0 && IpData.map((option, index) => (     */}
              <div className="main-profile-contact-list row">

                <div className="media mb-3 col-md-6">
                  <div className="media-icon bg-danger-transparent text-danger me-3"> <i className="fa-solid fa-key fa-fw" /> </div>
                  {IpData.length && IpData.map((ip,index) => (

                    <div className="media-body ">
                      <small className="text-muted">White List Ip {index + 1} : {ip.ip_address}  </small>
                      <div className="font-weight-normal1 fs-18"></div>
                      {/* <button  className="btn btn-outline-primary btn-sm mt-3" data-bs-target="#Addkey-modal" data-bs-toggle="modal"><i className="fa-regular fa-pen-to-square fa-fw" /> Add key</button> */}
                      <button onClick={() =>editIpAdd(ip.id,ip.ip_address)} className="btn btn-outline-primary btn-sm mt-3 ms-3" data-bs-target="#Editkey-modal" data-bs-toggle="modal"  ><i className="fa-regular fa-pen-to-square fa-fw"/> Edit IP</button>
                    </div>
                  ))
                  }

                </div>
                {/* <div className="media mb-3 col-md-3">
                      <div className="media-icon bg-danger-transparent text-danger me-3"> <i className="fa-solid fa-key fa-fw" /> </div>
                      <div className="media-body"> 
                        <small className="text-muted">White List Ip 2 : {ip.ip_address} </small> 
                        <div className="font-weight-normal1 fs-18"></div> 
                        <Link to="/" className="btn btn-outline-primary btn-sm" data-bs-target="#apikey-modal" data-bs-toggle="modal"><i className="fa-regular fa-pen-to-square fa-fw" /> Edit key</Link>
                      </div>	
                    </div>  */}

              </div>


              {/* ))}   */}
            </div>
          </div>
        </div>
        {/* End Row-1 */}
      </div>

      <div class="modal fade effect-scale" id="changekey" aria-modal="true" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content modal-content-demo">
            <div class="modal-header"> <h6 class="modal-title">Change Secret Key</h6>
              <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"><span aria-hidden="true">×</span></button> </div>

            <div class="modal-body application-modal">
              <div class="row">
                <div class="col-md-12 text-center">
                  <i class="fa-regular fa-circle-question fa-fw fs-55 mb-3 text-danger"></i>
                  <h3 class="mb-1">Are Your Sure?</h3>
                  <p>You want to change secret key ?</p>
                </div>

                <div class="form-footer mt-2 text-center" > <button type="submit" class="btn btn-primary" onClick={changeSecretKey}>Confirm</button> </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Ip Address modal */}
      {<form className="mt-2" onSubmit={addIpForm.handleSubmit}>
        {addIpForm.values.wrong_message ?
          <div className="invalid-feedback mb-3" style={{ display: "block", textAlign: "center" }}>{addIpForm.values.wrong_message}</div>
          : ''}
        <div class="modal fade effect-scale show" id="Addkey-modal" aria-modal="true" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content modal-content-demo">
              <div class="modal-header"> <h6 class="modal-title">Add Whitelist Ip</h6>
                <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"><span aria-hidden="true">×</span></button> </div>

              <div class="modal-body application-modal">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group m-0">
                      <label class="form-label">IP Address</label>
                      <div class="row g-xs">
                        <div class="col-12">
                          <input type="text" {...addIpForm.getFieldProps("ip_address")} class="form-control" />
                        </div>
                        {addIpForm.touched.ip_address && addIpForm.errors.ip_address ?
                                                                    <div className="invalid-feedback" style={{ display: "block" }}>{addIpForm.errors.ip_address}</div> : ''}
                      </div>
                    </div>
                  </div>
                  <div class="form-footer mt-2"> <button type="submit" class="btn btn-primary">SUBMIT</button> </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </form>


      }
      {<form className="mt-2" onSubmit={editIpForm.handleSubmit}>
        {addIpForm.values.wrong_message ?
          <div className="invalid-feedback mb-3" style={{ display: "block", textAlign: "center" }}>{addIpForm.values.wrong_message}</div>
          : ''}
        <div class="modal fade effect-scale show" id="Editkey-modal" aria-modal="true" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content modal-content-demo">
              <div class="modal-header"> <h6 class="modal-title">Edit Whitelist Ip</h6>
                <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"><span aria-hidden="true">×</span></button> </div>

              <div class="modal-body application-modal">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group m-0">
                      <label class="form-label">IP Address</label>
                      <div class="row g-xs">
                        <div class="col-12">
                          <input type="text" class="form-control" {...editIpForm.getFieldProps("ip_address")}/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-footer mt-2"><button type="submit" class="btn btn-primary">SUBMIT</button> </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </form>


      }
    </>
  )
}
export default Api;