import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import PaginationComponent from '../../PaginationComponent';

import Moment from 'react-moment';

const QueryBuilder= (props) => {

    return ( 
        <>
          <div className="main-container container-fluid px-0">
               <div className="page-header mb-3">
                  <div className="page-leftheader">
                     <h4 className="page-title mb-0 text-primary">Query Builder</h4>
                  </div>
                  
               </div>
               
			   <div className="row">
			      <div className="col-md-12">
				      <div className="card">
					    <div className="card-body p-0"> 
						  <div className="table-responsive"> 
						    <table className="table table-hover card-table table-vcenter text-nowrap"> 
							  <thead className="border-bottom-0 pt-3 pb-3">
							    <tr>
								  <th className="font-weight-bold">Column</th>
								  <th className="font-weight-bold">Operator</th>
								  <th className="font-weight-bold">Value</th>
								  <th></th>
								</tr> 
							   </thead> 
								<tbody>
									<tr>
									  <td>Partner List</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td><select className="form-control"><option>select Value</option></select></td>
									</tr>
									<tr>
									  <td>Lender List</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td><select className="form-control"><option>select Value</option></select></td>
									</tr>
									<tr>
									  <td>Case Id</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td><input type="text" className="form-control" /></td>
									</tr>
									<tr>
									  <td>Loan Type</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td><select className="form-control"><option>select Value</option></select></td>
									</tr>
									<tr>
									  <td>Full Name</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td><input type="text" className="form-control" /></td>
									</tr>
									<tr>
									  <td>Company Name</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td><input type="text" className="form-control" /></td>
									</tr>
									
									<tr>
									  <td>Email</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td><input type="text" className="form-control" /></td>
									</tr>
									<tr>
									  <td>Mobile Number</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td><input type="text" className="form-control" /></td>
									</tr>
									<tr>
									  <td>Age</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td><input type="text" className="form-control" /></td>
									</tr>
									<tr>
									  <td>Create Time</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td><input type="text" className="form-control" /></td>
									</tr>
									<tr>
									  <td>Received Time</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td><input type="text" className="form-control" /></td>
									</tr>
									<tr>
									  <td>Short Close Time</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td><input type="text" className="form-control" /></td>
									</tr>
									<tr>
									  <td>Comment Time</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td><input type="text" className="form-control" /></td>
									</tr>
									
									<tr>
									  <td>Remark Time</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td><input type="text" className="form-control" /></td>
									</tr>
									<tr>
									  <td>Assigned Time</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td><input type="text" className="form-control" /></td>
									</tr>
									<tr>
									  <td>Logged Time</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td><input type="text" className="form-control" /></td>
									</tr>
									<tr>
									  <td>Pending Time</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td><input type="text" className="form-control" /></td>
									</tr>
									<tr>
									  <td>Approved Time</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td><input type="text" className="form-control" /></td>
									</tr>
									<tr>
									  <td>Reject Time</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td><input type="text" className="form-control" /></td>
									</tr>
									<tr>
									  <td>Disbursed Time</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td><input type="text" className="form-control" /></td>
									</tr>
									
									<tr>
									  <td>City</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td><input type="text" className="form-control" /></td>
									</tr>
									<tr>
									  <td>Pincode</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td><input type="text" className="form-control" /></td>
									</tr>
									<tr>
									  <td>State</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td><input type="text" className="form-control" /></td>
									</tr>
									<tr>
									  <td>Firm Type</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td><input type="text" className="form-control" /></td>
									</tr>
									<tr>
									  <td>Father Name</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td><input type="text" className="form-control" /></td>
									</tr>
									<tr>
									  <td>Qualification</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td><input type="text" className="form-control" /></td>
									</tr>
									<tr>
									  <td>Marital Status</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td><input type="text" className="form-control" /></td>
									</tr>
									
									<tr>
									  <td>Employer Name</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td><input type="text" className="form-control" /></td>
									</tr>
									<tr>
									  <td>Status</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									</tr>
									<tr>
									  <td>Order BY</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									</tr>
									<tr>
									  <td>Per Page</td>
									  <td><select className="form-control"><option>select Operator</option></select></td>
									  <td></td>
									</tr>
									
								</tbody>
							  </table> 
						   </div> 
						</div>
					  
			      </div>
			   </div>
			   <div className="col-md-12">
					  <button type="submit" className="btn btn-primary mb-6 w-md mb-1 mt-1"> Submit</button> 
				   </div>
			  
            </div>
         </div>
        </>
    )

}
export default QueryBuilder;