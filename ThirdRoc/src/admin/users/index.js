import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import PaginationComponent from '../../PaginationComponent';

import $ from 'jquery';

const Users= (props) => {
    const [loading, setloading] = useState(false);
    const [pagesCount, setpagesCount] = useState(0);
    const [dataArray, setDataArray] = useState([]);
	const [totalItems, settotalItems] = useState(0);

    const [detail, setDetail] = useState([]);
    const [profileDetail, setProfileDetail] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getList();
    }, [])

    const getList = (page=1) => {
        setloading(true)
        props.api.getApi('admin/getUserList',{page:page-1,size:10}).then(response => {
            setDataArray(response.data.record);
            setpagesCount(response.data.totalItems+1)
			settotalItems(response.data.totalItems)
            setloading(false)
        }).catch(error => {  
            setloading(false)
            props.toast.error(error.message);
        }); 
    }  

    const getDetail = (user_id) => {
        setloading(true)
        props.api.postApi('admin/getUserDetail',{user_id:user_id}).then(response => {
            setDetail(response.data);
			setProfileDetail(response.profileData)
            setloading(false)
        }).catch(error => {  
            setloading(false)
            props.toast.error(error.message);
        }); 
    }  

	const hideModel =(e)  => {
		navigate(props.prefix+'/edit-user/'+e.user_id)
	}

    
    return (
        <>
        <div className="main-container container-fluid px-0">
               <div className="page-header">
                  <div className="page-leftheader">
                     <h4 className="page-title mb-0 text-primary">Users Report {totalItems ? '(' + totalItems + ')' : ''}</h4>
                  </div>
                  <div className="page-rightheader"> 
				       <div className="btn-list"> 
				          <Link   to={props.prefix+'/add-user'}  className="btn btn-outline-primary"><i className="fa fa-plus me-2"></i> Add Profile</Link>  
				       </div> 
					   
				  </div>
               </div>
              {/* <div className="row">
				  <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                     <div className="form-group"> 
						<label className="form-label">Search</label> 
						<div className="row g-xs"> 
							<div className="input-group"> 
							  <input type="text" className="form-control" placeholder="Enter Keyword" /> 
							  <span className="input-group-append"> <button className="btn btn-primary" type="button"><i className="fa fa-search"></i></button> </span> 
							</div> 
						</div> 
					</div>
                  </div>
               </div> */}
			   
			   <div className="row">
			      <div className="col-lg-12">
                    {dataArray.length > 0 && dataArray.map((option, index) => (
                    <div className="main-proifle" key={index}> 
                        <div className="row"> 
                        <div className="col-lg-12 col-xl-9"> 
                            <div className="box-widget widget-user"> 
                            <div className="widget-user-image1 d-xl-flex d-block">
                                <div className="col-md-12"> 
                                <h4 className="pro-user-username mb-3 font-weight-bold">{option.full_name}<i className="fa fa-check-circle text-success"></i></h4> 
                                    <ul className="mb-0 pro-details"> 
                                    <li><span className="profile-icon bg-warning-transparent text-warning"><i className="fa fa-phone"></i></span><span className="h6 mt-3">{option.mobile_number}</span></li> 
                                    <li><span className="profile-icon bg-success-transparent text-success"><i className="fa-regular fa-envelope fa-fw"></i></span><span className="h6 mt-3">{option.email}</span></li> 
                                    <li><span className="profile-icon bg-info-transparent text-info"><i className="fa-solid fa-location-dot fa-fw"></i></span><span className="h6 mt-3">{option.address}</span></li> 
                                    </ul> 
                                </div> 
                            </div> 
                            </div> 
                            </div> 
                            <div className="col-lg-12 col-md-auto col-xl-3"> 
                                <div className="text-xl-right text-left btn-list mt-4 mt-lg-0"> 
                                <Link   to="" data-bs-target="#profile-view" data-bs-toggle="modal" className="btn btn-outline-primary" onClick={() =>getDetail(option.user_id)}><i className="fa fa-eye"></i> View Profile</Link>
                                </div>
                            </div> 
                        </div>
                    </div>
                    ))} 				  
				   </div>
			   </div>			   
			   <div className="row">
				   <div className="col-md-12">
				   </div>
			 </div>			 
         </div>
		 {pagesCount>0 && dataArray.length>0? 
                 <>
                <div className="col-md-12">
                   <div className="card-body">
                    <PaginationComponent className="justify-content-center"
                        totalItems={pagesCount}
                        pageSize={10}
                        maxPaginationNumbers={3}
                        onSelect={(e) => getList(e) }
                    />
                    </div>
                </div>
                </>
                : '' }

<div className="modal fade effect-fall show" id="profile-view" aria-modal="true" role="dialog"> 
  <div className="modal-dialog modal-lg" role="document"> 
     <div className="modal-content modal-content-demo"> 
	   <div className="modal-header"> <h6 className="modal-title">User Information</h6>
	   <button aria-label="Close" className="btn-close" data-bs-dismiss="modal" type="button"><span aria-hidden="true">×</span></button> </div> 
	   
	   <div className="modal-body application-modal"> 
	      
		  <div className="row">
		     <div className="col-lg-12 col-xl-12">
			   <div className="">
				  <div className="main-content-body main-content-body-contacts">
					 {/* <h6>User Information</h6> */}
					 <div className="main-contact-info-header bg-contacthead pb15">
						<div className="media">
						   <div className="media-body text-white ml-0">
							  <p className="mb-1">Person Name:</p>
							  <h4 className="text-white">{detail?detail.full_name:''}</h4>
						   </div>
						</div>
						<div className="main-contact-action"> <Link data-bs-dismiss="modal"  className="btn btn-primary" onClick={() => hideModel(detail)}  > Edit</Link></div>
					 </div>
					 <div className="main-contact-info-body">
						<div className="media-list p-0">
						   <div className="media py-4 mt-0">
							  <div className="media-body">
								 <div className="d-flex">
									<div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa fa-phone"></i> </div>
									<div className="w-70"> <label>Phone</label> <span className="font-weight-normal1 fs-14">{detail?detail.mobile_number:''}</span> </div>
								 </div>
								 <div className="d-flex">
									<div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa fa-envelope"></i> </div>
									<div className="w-70"> <label>Email</label> <span className="font-weight-normal1 fs-14">{detail?detail.email:''}</span> </div>
								 </div>
							  </div>
						   </div>
						   <div className="media py-4 border-top mt-0">
							  <div className="media-body">
								 <div className="d-flex">
									<div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa-regular fa-address-card fa-fw"></i> </div>
									<div className="w-70"> <label>Pan Number:</label> <span className="font-weight-normal1 fs-14">{detail?detail.pan_number:''}</span> </div>
								 </div>
								 <div className="d-flex">
									<div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa-solid fa-location-dot fa-fw"></i> </div>
									<div className="w-70"> <label>Address:</label> <span className="font-weight-normal1 fs-14">{detail?detail.address:''}</span> </div>
								 </div>
							  </div>
						   </div>
						   <div className="media py-4 border-top mt-0">
							  <div className="media-body">
								 <div className="d-flex">
									<div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa-solid fa-percent fa-fw"></i> </div>
									<div className="w-70"> <label>Permission:</label> <span className="font-weight-normal1 fs-14">{profileDetail && profileDetail?.title}</span> </div>
								 </div>
								 
							  </div>
						   </div>
						  
						</div>
					 </div>
				  </div>
			   </div>
			</div>
		  </div>
	   </div> 
	 </div> 
	</div> 
 </div>
 
      
        </>
    )
}
export default Users;