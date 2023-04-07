import React, { useState, useEffect, navigate } from 'react';
import PaginationComponent from '../../PaginationComponent';
import { useFormik } from 'formik';
import Service from '../../adminService';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import $ from 'jquery';

const api = new Service();

const EditCity = (props) => {
    //const { id } = useParams();
 
  return (
   <>
   <div className="row">
                <div className="col-md-12">
                  <div className="form-group m-0">
                    <label className="form-label">State</label>
                    <div className="row g-xs">
                      <div className="col-12">
                        <select className="form-control custom-select">
                         <option></option>
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
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-footer mt-2"> <button type="submit" className="btn btn-primary">Save</button> </div>
              </div>
   </>
  )
}

export default EditCity