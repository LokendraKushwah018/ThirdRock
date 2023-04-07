import React, { useState, useEffect } from 'react';
import PaginationComponent from '../../PaginationComponent';
import Moment from 'react-moment';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Service from '../../adminService';
import toast, { Toaster } from 'react-hot-toast';
import $ from 'jquery';
const api = new Service();

const Status = (props) => {
  const [search , setSearch] = useState('');
  const [loading, setloading] = useState(false);
  const [pagesCount, setpagesCount] = useState(0);
  const [dataArray, setDataArray] = useState([]);
  const [Id, setStatusId] = useState('');
  const [totalItems, settotalItems] = useState('');

  useEffect(() => {
    getList();
  }, [search])

  // const getList = (page=1) => {
  //   setloading(true)
  //   props.api.getApi('status', { page:page-1, size:10}).then(response => {
  //     setDataArray(response.data.record);
  //     setpagesCount(response.data.totalItems+1)
  //     setloading(false)
  //   }).catch(error => {
  //     setloading(false)
  //     props.toast.error(error.message);
  //   });
  // }
  //Status List API In Super Admin
  const getList = (page=1) => {
    setloading(true)
    props.api.getApi('status',{page:page-1,size:20,search:search.trim()}).then(response => {
        setDataArray(response.data.record);
        setpagesCount(response.data.totalItems+1)
        settotalItems(response.data.totalItems)
        setloading(false)
    }).catch(error => {  
        setloading(false)
        props.toast.error(error.message);
    }); 
} 

  // Add Status API
  const form = useFormik({
    initialValues: {
      title: "",
      wrong_message: ""
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      title: yup.string().required('Please enter status'),
  
    }),
    onSubmit: values => {
      api.postApi('add-status', values).then(response => {       
        if (response.status == true) {
          console.log(response)
          toast.success(response.message);
          window.$('#status-modal').modal('hide')
          getList(1)
        }
      }).catch(error => {
        form.setFieldValue('wrong_message', error.message)
      });
    }
  });

  //Update Status API
  const EditForm = useFormik({
    initialValues: {
      id: Id,
      title: "",
      wrong_message: ""
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      title: yup.string().required('Please enter status'),
      
    }),
    onSubmit: values => {
      console.log('values', values);
      console.log('inside edit Form');
      api.postApi('update-status', values).then(response => {
        if (response.status == true) {
          // console.log('value', response.data);
          // stateData(response.data);
          toast.success(response.message);  
          window.$('#update-status-modal').modal('hide')
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
            <h4 className="page-title mb-0 text-primary">Incomplete Status List {totalItems ? '(' + totalItems + ')' : ''}</h4>
          </div>
          <div className="page-rightheader">
            <div className="btn-list">
              <Link to="" data-bs-target="#status-modal" data-bs-toggle="modal" className="btn btn-primary btn-pill"><i className="fa fa-plus me-2" /> Add New</Link>
            </div>
          </div>
        </div>
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
              <div className="col-lg-6" key={index}>
                <div className="d-flex align-items-center border p-3 mb-3 br-7">
                  {/* <div className="main-avatar avatar-md offline"> 
                  <span className="avatar avatar-md bradius bg-orange me-3"></span> 
                </div>  */}
                  <div className="wrapper ms-3">
                    {/* <p className="mb-0 mt-1  font-weight-semibold">Andhra Pradesh</p> */}
                    <small className="font-weight-semibold">{option.title}</small>
                  </div>
                  <div className="float-end ms-auto">
                  <button type='button' onClick={() => setStatusId(option.id)} data-bs-target="#update-status-modal" data-bs-toggle="modal" className="btn btn-primary btn-md">
                      <i className="fa fa-pencil" /> Edit</button> </div>
                </div>
              </div>
            ))}
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
      </div>
      {/* Add New Status Modal */}
      <div className="modal fade effect-scale show" id="status-modal" aria-modal="true" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content modal-content-demo">
            <div className="modal-header"> <h6 className="modal-title">Add Status</h6>
              <button aria-label="Close" className="btn-close" data-bs-dismiss="modal" type="button"><span aria-hidden="true">×</span></button> </div>
            <div className="modal-body application-modal">  
            <form className='mt-5' onSubmit={form.handleSubmit}>        
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group m-0">
                    <label className="form-label">Status</label>
                    <div className="row g-xs">
                      <div className="col-12">
                        <input type="text" name="title" {...form.getFieldProps("title")} className="form-control" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-footer mt-2"> <button type="submit" className="btn btn-primary">Save</button> </div>
              </div>
              </form>   
            </div>
          </div>
        </div>
      </div>

      {/* Update Status Modal */}
      <form className="mt-5 row" id='registerForm' onSubmit={EditForm.handleSubmit} >
      {EditForm.values.wrong_message ?
            <div className="invalid-feedback mb-3" style={{ display: "block", textAlign: "center" }}>{EditForm.values.wrong_message}</div>
            : ''}
      <div className="modal fade effect-scale show" id="update-status-modal" aria-modal="true" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content modal-content-demo">
            <div className="modal-header"> <h6 className="modal-title">Update Status</h6>
              <button aria-label="Close" className="btn-close" data-bs-dismiss="modal" type="button"><span aria-hidden="true">×</span></button> </div>
            <div className="modal-body application-modal">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group m-0">
                    <label className="form-label">Status</label>
                    <div className="row g-xs">
                      <div className="col-12">
                        <input type="text" name="title" {...EditForm.getFieldProps("title")} className="form-control" />
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

export default Status