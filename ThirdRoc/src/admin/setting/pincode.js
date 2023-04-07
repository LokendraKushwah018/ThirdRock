import React, { useState, useEffect } from 'react';
import PaginationComponent from '../../PaginationComponent';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Service from '../../adminService';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useLocation, useParams, useNavigate, Form } from 'react-router-dom';

const api = new Service();
const Pincode = (props) => {
  const [search, setSearch] = useState('');
  const [loading, setloading] = useState(false);
  const [pagesCount, setpagesCount] = useState(0);
  const [dataArray, setDataArray] = useState([]);
  const [state, setStateData] = useState([]);
  const [city, setCityData] = useState([]);
  const [Id, setPincodeId] = useState('');
  const [totalItems, settotalItems] = useState(0);

  useEffect(() => {
    getList();
  }, [search])

  const getList = (page = 1) => {
    setloading(true)
    props.api.getApi('pincode-list', { page:page-1, size:12,search:search.trim()}).then(response => {
      setDataArray(response.data.record);
      setpagesCount(response.data.totalItems + 1)
      settotalItems(response.data.totalItems)
      setloading(false)
    }).catch(error => {
      setloading(false)
      props.toast.error(error.message);
    });
  }
//Dropdown State List
  useEffect(() => {
    api.getApi('api/v1/states').then(response => {
      //console.log('response',response);
      if (response.status === true) {
        setStateData(response.data
          );
      }
    }).catch(error => {
      console.log('error', error);
    });
  }, [])

//Dropdown City List
  useEffect(() => {
    api.getApi('api/v1/cityByStateID').then(response => {
      //console.log('response',response);
      if (response.status == true) {
        setCityData(response.data
          );
      }
    }).catch(error => {
      console.log('error', error);
    });
  }, [])
  
  // Add Pincode API For Admin
  const form = useFormik({
    initialValues: {
      pincode: "",
      city: "",
      state_id:"",
      wrong_message: ""
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      pincode: yup.string().required('Please enter pincode'),
      city: yup.string().required('Please enter city'),
      state_id: yup.string().required('Please enter state'),

    }),
    onSubmit: values => {
      api.postApi('add-pincode', values).then(response => {
        if (response.status == true) {
          toast.success(response.message);
          window.$('#pincode-modal').modal('hide')
          getList(1)
        }
      }).catch(error => {
        form.setFieldValue('wrong_message', error.message)
      });
    }
  });

  //Update Pincode API For Admin
  const EditForm = useFormik({
    initialValues: {
      id: Id,
      pincode: "",
      city: "",
      state_id: "",
      wrong_message: ""
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      pincode: yup.string().required('Please enter pincode'),
      city: yup.string().required('Please enter city'),
      state_id : yup.string().required('Please enter State'),

    }),
    onSubmit: values => {
      console.log('values', values);
      console.log('inside edit Form');
      api.postApi('update-state', values).then(response => {

        if (response.status == true) {
          // console.log('value', response.data);
          // stateData(response.data);
          toast.success(response.message);
          window.$('#update-pincode-modal').modal('hide')
          getList(1)
        }
      }).catch(error => {
        console.log('error', error);
        toast.error(error);
      });
    }
  });
  return (
    <>
      <div className="main-container container-fluid px-0">
        {/*Page header*/}
        <div className="page-header">
          <div className="page-leftheader">
            <h4 className="page-title mb-0 text-primary">Pincode List {totalItems ? '('+ totalItems +')' : ''}</h4>
          </div>
          <div className="page-rightheader">
            <div className="btn-list">
              <Link to="" data-bs-target="#pincode-modal" data-bs-toggle="modal" className="btn btn-primary btn-pill"><i className="fa fa-plus me-2" /> Add New</Link>
            </div>
          </div>
        </div>
        {/*End Page header*/} {/* Row-1 */}
        <div className="row" >
          <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
            <div className="form-group">
              <label className="form-label">Search Keyword</label>
              <div className="row g-xs">
                <div className="input-group">
                  <input type="text" value = {search} onChange = {(e)=>setSearch(e.target.value)} className="form-control" placeholder="Enter Keyword" />
                  {/* <span className="input-group-append"> <button className="btn btn-primary" type="button"><i className="fa fa-search" /></button> </span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Row-1 */}
        <div className="card p-5">
          <div className="row">
            {dataArray.length > 0 && dataArray.map((option, index) => (
              <div className="col-lg-4" key={index}>
                <div className="d-flex align-items-center border p-3 mb-3 br-7">
                  <div className="main-avatar avatar-md offline">
                    <span className="avatar avatar-md bradius bg-orange me-3"></span>
                  </div>
                  <div className="wrapper ms-3">
                    <p className="mb-0 mt-1  font-weight-semibold">{option.city}</p>
                    <small className="text-muted"></small><br /><small className="font-weight-semibold">{option.pincode}</small>
                  </div>
                  <div className="float-end ms-auto">
                    <Link to=""data-bs-target="#update-pincode-modal" data-bs-toggle="modal" className="btn btn-primary btn-md">
                      <i className="fa fa-pencil" /> Edit</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {pagesCount > 0 && dataArray.length > 0 ?
          <>
            <div className="col-md-12">
              <div className="card-body">
                <PaginationComponent className="justify-content-center"
                  totalItems={pagesCount}
                  pageSize={20}
                  maxPaginationNumbers={3}
                  onSelect={(e) => getList(e)}
                />
              </div>
            </div>
          </>
          : ''}
      </div>

{/* Pincode Add modal */}
  <div className="modal fade effect-scale show" id="pincode-modal" aria-modal="true" role="dialog"> 
  <div className="modal-dialog" role="document"> 
     <div className="modal-content modal-content-demo"> 
	   <div className="modal-header"> <h6 className="modal-title">Add Pincode</h6>
	   <button aria-label="Close" className="btn-close" data-bs-dismiss="modal" type="button"><span aria-hidden="true">×</span></button> </div> 
     <form className="mt-5" onSubmit={form.handleSubmit}>
     {form.values.wrong_message ?
        <div className="invalid-feedback mb-3" style={{ display: "block", textAlign: "center" }}>{form.values.wrong_message}</div>
        : ''}
	     <div className="modal-body application-modal">       
	        <div className="row">
			    <div className="col-md-12">
				  <div className="form-group m-0"> 
				    <label className="form-label">State</label> 
					  <div className="row g-xs"> 
						  <div className="col-12"> 
						   <select className="form-control custom-select">
               {state.map((option, index) => (
							 <option value="">{option.name}</option> 
               ))}
						   </select>
						  </div> 
					  </div> 
					</div>
				</div>
				<div className="col-md-12">
				  <div className="form-group m-0"> 
				    <label className="form-label">City</label> 
					  <div className="row g-xs"> 
						  <div className="col-12"> 
              <select className="form-control custom-select">
              {city.map((option, index) => (
							 <option value="">{option.name}</option> 
               ))}
						   </select>
						  </div> 
					  </div> 
					</div>
				</div>
				<div className="col-md-12">
				  <div className="form-group m-0"> 
				    <label className="form-label">Pin Code</label> 
					  <div className="row g-xs"> 
						  <div className="col-12"> 
						   <input type="text" name="pincode" {...form.getFieldProps("pincode")} className="form-control" placeholder="Enter area pincode"/>
						  </div> 
					  </div> 
					</div>
				</div>
				<div className="form-footer mt-2"> <button type="submit" className="btn btn-primary">Save</button> </div>				
		     </div>       
	     </div> 
       </form>
	   </div> 
	</div> 
</div>

{/* Update Pincode Modal */}
<form className="mt-5 row" id='registerForm' onSubmit={EditForm.handleSubmit} >
        {EditForm.values.wrong_message ?
          <div className="invalid-feedback mb-3" style={{ display: "block", textAlign: "center" }}>{EditForm.values.wrong_message}</div>
          : ''}
<div className="modal fade effect-scale show" id="update-pincode-modal" aria-modal="true" role="dialog"> 
  <div className="modal-dialog" role="document"> 
     <div className="modal-content modal-content-demo"> 
	   <div className="modal-header"> <h6 className="modal-title">Edit Pincode</h6>
	   <button aria-label="Close" className="btn-close" data-bs-dismiss="modal" type="button"><span aria-hidden="true">×</span></button> </div> 	   
	     <div className="modal-body application-modal"> 
	        <div className="row">
			    <div className="col-md-12">
				  <div className="form-group m-0"> 
				    <label className="form-label">State</label> 
					  <div className="row g-xs"> 
						  <div className="col-12"> 
						   <select className="form-control custom-select">
               {state.map((option, index) => (
							 <option value="">{option.name}</option> 
               ))}
						   </select>
						  </div> 
					  </div> 
					</div>
				</div>
				<div className="col-md-12">
				  <div className="form-group m-0"> 
				    <label className="form-label">City</label> 
					  <div className="row g-xs"> 
						  <div className="col-12"> 
              <select className="form-control custom-select">
              {city.map((option, index) => (
							 <option value="">{option.name}</option> 
               ))}
						   </select>
						  </div> 
					  </div> 
					</div>
				</div>
				<div className="col-md-12">
				  <div className="form-group m-0"> 
				    <label className="form-label">Pin Code</label> 
					  <div className="row g-xs"> 
						  <div className="col-12"> 
						   <input type="text"  name="pincode" {...form.getFieldProps("pincode")} className="form-control" placeholder="Enter area pincode"/>
						  </div> 
					  </div> 
					</div>
				</div>
				<div className="form-footer mt-2"> <button type="submit" className="btn btn-primary">Save</button> </div>				
		     </div>
	     </div> 
	   </div> 
	</div> 
</div>
</form>
    </>
  )
}

export default Pincode