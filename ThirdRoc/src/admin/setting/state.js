import { Link } from 'react-router-dom';
import React, { useState, useEffect, navigate } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import PaginationComponent from '../../PaginationComponent';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Service from '../../adminService';
import toast, { Toaster } from 'react-hot-toast';

import $ from 'jquery';
const api = new Service();
export const State = (props) => {
  const navigate = useNavigate();
  const [stateData, setstateData] = useState({});
  const [search, setSearch] = useState('');
  const [editForm, setEditForm] = useState({});
  const [loading, setloading] = useState(false);
  const [pagesCount, setpagesCount] = useState(0);
  const [dataArray, setDataArray] = useState([]);
  const [id, setId] = useState('');
  const [stateId, setStateId] = useState('');
  const [totalItems,settotalItems] = useState(0);

  useEffect(() => {
    getList();
  }, [search])

  //State List API in Super-Admin
  const getList = (page = 1) => {
    setloading(true)
    props.api.getApi('state-list', { page: page - 1, size: 10, search: search.trim() }).then(response => {
      setDataArray(response.data.record);
      setpagesCount(response.data.totalItems + 1)
      settotalItems(response.data.totalItems)
      setloading(false)
      form.setFieldValue('',)
    }).catch(error => {
      setloading(false)
      props.toast.error(error.message);
    });
  }

  // Add State API
  const form = useFormik({
    initialValues: {
      name: "",
      country_id: "101",
      wrong_message: ""
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      name: yup.string().required('Please enter country'),

    }),
    onSubmit: values => {
      api.postApi('add-state', values).then(response => {
        if (response.status == true) {
          console.log(response)
          toast.success(response.message);
          window.$('#state-modal').modal('hide')
          getList(1)
        }
      }).catch(error => {
        form.setFieldValue('wrong_message', error.message)
      });
    }
  });

  // Update State API
  const EditForm = useFormik({
    initialValues: {
      id: stateId,
      name: " ",
      wrong_message: ""
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      name: yup.string().required('Please enter State name'),

    }),
    onSubmit: values => {
      console.log('values', values);
      console.log('inside edit Form');
      api.postApi('update-state', values).then(response => {

        if (response.status == true) {
          // console.log('value', response.data);
          // stateData(response.data);
          toast.success(response.message);
          window.$('#update-state-modal').modal('hide')
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
            <h4 className="page-title mb-0 text-primary">State List {totalItems ? '(' + totalItems + ')' : ''}</h4>
          </div>
          <div className="page-rightheader">
            <div className="btn-list">
              <Link to="" data-bs-target="#state-modal" data-bs-toggle="modal" className="btn btn-primary btn-pill"><i className="fa fa-plus me-2" /> Add New</Link>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
            <div className="form-group">
              <label className="form-label">Search Keyword</label>
              <div className="row g-xs">
                <div className="input-group">
                  <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="form-control" placeholder="Enter Keyword" />
                  {/* <span className="input-group-append"> <button className="btn btn-primary" type="button"><i className="fa fa-search" /></button> </span>  */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*End Page header*/} {/* Row-1 */}

        <div className="card p-5">
          <div className="row">
            {dataArray.length > 0 && dataArray.map((option, index) => (
              <div className="col-lg-6" key={option.id}>
                <div className="d-flex align-items-center border p-3 mb-3 br-7">
                  <div className="main-avatar avatar-md offline">
                    <span className="avatar avatar-md bradius bg-orange me-3"></span>
                  </div>
                  <div className="wrapper ms-3"> <p className="mb-0 mt-1  font-weight-semibold">{option.name}</p></div>
                  <div className="float-end ms-auto" value={option.id}>
                    <button type='button' onClick={() => setStateId(option.id)} data-bs-target="#update-state-modal" data-bs-toggle="modal" className="btn btn-primary btn-md">
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
                    pageSize={10}
                    maxPaginationNumbers={3}
                    onSelect={(e) => getList(e)}
                  />
                </div>
              </div>
            </>
            : ''}
        </div>
      </div>

      {/* Add New State Modal */}
      <div className="modal fade effect-scale show" id="state-modal" aria-modal="true" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content modal-content-demo">
            <div className="modal-header"> <h6 className="modal-title">Add State</h6>
              <button aria-label="Close" className="btn-close" data-bs-dismiss="modal" type="button"><span aria-hidden="true">×</span></button> </div>
            <div className="modal-body application-modal">
              <form className="mt-5" onSubmit={form.handleSubmit}>
                {form.values.wrong_message ?
                  <div className="invalid-feedback mb-3" style={{ display: "block", textAlign: "center" }}>{form.values.wrong_message}</div>
                  : ''}
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group m-0">
                      <label className="form-label">State</label>
                      <div className="row g-xs">
                        <div className="col-12">
                          <input type="text" name="name" {...form.getFieldProps("name")} className="form-control" />
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

      {/* Update State Modal */}
      {/* {EditForm */}
      <form className="mt-5 row" id='registerForm' onSubmit={EditForm.handleSubmit} >
        {EditForm.values.wrong_message ?
          <div className="invalid-feedback mb-3" style={{ display: "block", textAlign: "center" }}>{EditForm.values.wrong_message}</div>
          : ''}
        <div className="modal fade effect-scale show" id="update-state-modal" aria-modal="true" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content modal-content-demo">
              <div className="modal-header"> <h6 className="modal-title">Update State</h6>
                <button aria-label="Close" className="btn-close" data-bs-dismiss="modal" type="button"><span aria-hidden="true">×</span></button> </div>
              <div className="modal-body application-modal">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group m-0">
                      <label className="form-label">State</label>
                      <div className="row g-xs">
                        <div className="col-12">
                          <input type="text" {...EditForm.getFieldProps("name")} className="form-control" />
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

export default State