
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import PaginationComponent from '../../PaginationComponent';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import Moment from 'react-moment';


const User= (props) => {
    const [loading, setloading] = useState(false);
    const [startDate, setstartDate] = useState('');
    const [endDate, setendDate] = useState('');
    const [search, setSearch] = useState('');
    const [totalItems, settotalItems] = useState(0);

    const [pagesCount, setpagesCount] = useState(0);
    const [dataArray, setDataArray] = useState([]);
    const [dsaDetail, setDsaDetail] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
      getpartnerList();
    }, [])

    useEffect(() => {
        getpartnerList();
      }, [startDate,endDate,search])
  

    const getpartnerList = (page=1) => {
        setloading(true)
        props.api.getApi('admin/userList',{page:page-1,size:10,startDate:startDate,endDate:endDate,search:search.trim()}).then(response => {
            setDataArray(response.data.record);
            setpagesCount(response.data.totalItems+1)
            settotalItems(response.data.totalItems)
            setloading(false)
        }).catch(error => {  
            setloading(false)
            props.toast.error(error.message);
        }); 
    }  

    const getDsaDetail = (user_id) => {
        setloading(true)
        props.api.postApi('admin/userDetail',{user_id:user_id}).then(response => {
            setDsaDetail(response.data);
            setloading(false)
        }).catch(error => {  
            setloading(false)
            props.toast.error(error.message);
        }); 
    }  

    const getCasses = (status)  =>{
        if(dsaDetail && dsaDetail.cases && dsaDetail.cases.length) {
         let found = dsaDetail.cases.find(obj => {
           return obj.status === status;
         });
          return found?.value?found.value : 0;
        } else {
           return 0
        }
     }
    
   
    const handleCallback = (event, picker) => {
        picker.element.val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
        setstartDate(picker.startDate.format('MM/DD/YYYY'))
        setendDate(picker.endDate.format('MM/DD/YYYY'))
    }
    const handleCallbackOnCancel = (event, picker) => {
        picker.element.val('');
        setstartDate('')
        setendDate('')
    }
    const hideModel = (e) => {
        console.log('e.userDetail.user_id',e.userDetail.user_id);
        navigate(props.prefix + '/edit_dsa/' + e.userDetail.user_id)
    }

    return (
        <>
          
          <div className="main-container container-fluid px-0">
               <div className="page-header">
                  <div className="page-leftheader">
                     <h4 className="page-title mb-0 text-primary">Partner Report  {totalItems ? '(' + totalItems + ')' : ''}</h4>
                  </div>
                   <div className="page-rightheader"> 
				      {/* <div className="btn-list d-flex"> 
						<Link to="" className="btn btn-outline-primary partnericon"><i className="fa fa-user fs-18 me-4 p-2 border-primary brround bg-primary-transparent text-primary"></i> MTD Partners <span className="ms-auto badge bg-success ms-sm-7">14</span></Link> 
						<Link to=""  className="btn btn-outline-primary partnericon"><i className="fa fa-user fs-18 me-4 p-2 border-warning brround bg-warning-transparent text-warning"></i> YTD Partners <span className="ms-auto badge bg-success ms-sm-7">25</span></Link> 
					  </div>	  */}
				  </div>
               </div>
               <div className="row">
                  <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                     <div className="form-group"> 
						<label className="form-label">Select Date</label> 
						<div className="row g-xs"> 
							<div className="wd-200 mg-b-30"> 
							   <div className="input-group"> 
                               <DateRangePicker onApply={handleCallback} onCancel={handleCallbackOnCancel} initialSettings={{autoUpdateInput: false ,locale: { cancelLabel: 'Clear'} }}>
							   <input className="form-control fc-datepicker hasDatepicker" type="text"  defaultValue="" placeholder='Search By Date' /> 
							</DateRangePicker>
							   </div>
							</div>
						</div> 
					</div>
                  </div>
				  <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                     <div className="form-group"> 
						<label className="form-label">Search</label> 
						<div className="row g-xs"> 
							<div className="input-group"> 
							  <input type="text" className="form-control" placeholder="Enter Keyword" value={search} onChange={(e) => setSearch(e.target.value)} /> 
							  {/* <span className="input-group-append"> <button className="btn btn-primary" type="button"><i className="fa fa-search"></i></button> </span>  */}
							</div> 
						</div> 
					</div>
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
								  <th className="font-weight-bold">Partner ID</th>
								  <th className="w-470 font-weight-bold">Company Name</th>
                                  <th className="font-weight-bold">Name</th>
								  <th className="font-weight-bold">Mobile</th>
								  <th className="font-weight-bold">Created At</th>
								  <th className="font-weight-bold">Updated At</th>
								  <th></th>
								  {/* <th></th> */}
								  <th></th>
								</tr> 
							   </thead> 
								<tbody>
                                   {dataArray.length > 0 && dataArray.map((option, index) => (
                                        <tr  key={index} >
                                        <td>{option.file_id}</td>
                                        <td><span className="font-weight-normal1">{option.company_name}</span></td>
                                        <td><span className="font-weight-normal1">{option.full_name}</span></td>
										<td><span className="font-weight-normal1">{option.mobile_number}</span></td>
                                        <td><span className="font-weight-normal1"><Moment format="YYYY-MM-DD h:MM A">{option.created_at}</Moment></span></td>
                                        <td><span className="font-weight-normal1"><Moment format="YYYY-MM-DD h:MM A">{option.updated_at}</Moment></span></td>

                                        
                                        <td><Link to="" onClick={() =>getDsaDetail(option.user_id)} data-bs-target="#applicaiton-report" data-bs-toggle="modal"  className="view-pro"><i className="far fa-eye"></i> View Profile</Link></td>
                                        {/* <td><Link to="" data-bs-target="#assign-rm" data-bs-toggle="modal" className="view-rm"><i className="fa fa-user-plus"></i> RM</Link></td> */}
                                        <td><Link to={props.prefix+'/cases-dsa/'+option.user_id} className="view-case"><i className="fas fa-file-alt"></i> View Case</Link></td>
                                        </tr>
                                    ))} 
								</tbody>
							  </table> 
						   </div> 
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
                        onSelect={(e) => getpartnerList(e) }
                    />
                    </div>
                </div>
                </>
                : '' }
            </div>
         </div>


        
            <div className="modal fade effect-fall show" id="applicaiton-report" aria-modal="true" role="dialog"> 
                <div className="modal-dialog modal-lg" role="document"> 
                    <div className="modal-content modal-content-demo"> 
                    <div className="modal-header"> <h6 className="modal-title">Applicants Report</h6>
                    <button aria-label="Close" className="btn-close" data-bs-dismiss="modal" type="button"><span aria-hidden="true">×</span></button> </div> 
                    
                <div className="modal-body application-modal"> 
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-xl-3"> 
                            <div className="card"> 
                            <div className="card-body"> 					
                                <p className=" mb-1 text-muted fs-14">Total Cases</p>
                                <h2 className="mb-0 font-weight-bold text-success">{dsaDetail? getCasses('TOTAL') : 0}</h2>  
                            </div> 
                            </div> 
                        </div>
                        <div className="col-sm-12 col-md-6 col-xl-3"> 
                            <div className="card"> 
                            <div className="card-body"> 				
                                <p className=" mb-1 text-muted fs-14">Incomplete Cases</p>
                                <h2 className="mb-0 font-weight-bold text-primary">{dsaDetail? getCasses('INCOMPLETE') : 0}</h2>  
                            </div> 
                            </div> 
                        </div>
                        <div className="col-sm-12 col-md-6 col-xl-3"> 
                            <div className="card"> 
                            <div className="card-body"> 					
                                <p className=" mb-1 text-muted fs-14">Short Close Cases</p>
                                <h2 className="mb-0 font-weight-bold text-teal">{dsaDetail? getCasses('SHORTCLOSE') : 0}</h2>  
                            </div> 
                            </div> 
                        </div>
                        {/* <div className="col-sm-12 col-md-6 col-xl-3"> 
                            <div className="card"> 
                            <div className="card-body"> 				
                                <p className=" mb-1 text-muted fs-14">Received Cases</p>
                                <h2 className="mb-0 font-weight-bold text-success">{dsaDetail? getCasses('RECEIVED') : 0}</h2> 
                            </div> 
                            </div> 
                        </div> */}
                        
                        <div className="col-sm-12 col-md-6 col-xl-3"> 
                            <div className="card"> 
                            <div className="card-body"> 					
                                <p className=" mb-1 text-muted fs-14">Assigned Cases</p>
                                <h2 className="mb-0 font-weight-bold text-teal">{dsaDetail? getCasses('ASSIGNED') : 0}</h2>  
                            </div> 
                            </div> 
                        </div>
                        <div className="col-sm-12 col-md-6 col-xl-3"> 
                            <div className="card"> 
                            <div className="card-body"> 				
                                <p className=" mb-1 text-muted fs-14">Logged Cases</p>
                                <h2 className="mb-0 font-weight-bold text-danger">{dsaDetail? getCasses('LOGGED') : 0}</h2> 
                            </div> 
                            </div> 
                        </div>
                        <div className="col-sm-12 col-md-6 col-xl-3"> 
                            <div className="card"> 
                            <div className="card-body"> 					
                                <p className=" mb-1 text-muted fs-14">Pending Cases</p>
                                <h2 className="mb-0 font-weight-bold text-warning">{dsaDetail? getCasses('PENDING') : 0}</h2>  
                            </div> 
                            </div> 
                        </div>
                        <div className="col-sm-12 col-md-6 col-xl-3"> 
                            <div className="card"> 
                            <div className="card-body"> 				
                                <p className=" mb-1 text-muted fs-14">Approved Cases</p>
                                <h2 className="mb-0 font-weight-bold text-success">{dsaDetail? getCasses('APPROVED') : 0}</h2> 
                            </div> 
                            </div> 
                        </div>
                        
                        <div className="col-sm-12 col-md-6 col-xl-3"> 
                            <div className="card"> 
                            <div className="card-body"> 				
                                <p className=" mb-1 text-muted fs-14">Rejected Cases</p>
                                <h2 className="mb-0 font-weight-bold text-danger">{dsaDetail? getCasses('REJECTED') : 0}</h2> 
                            </div> 
                            </div> 
                        </div>
                        <div className="col-sm-12 col-md-6 col-xl-3"> 
                            <div className="card"> 
                            <div className="card-body"> 					
                                <p className=" mb-1 text-muted fs-14">Disbursed Cases</p>
                                <h2 className="mb-0 font-weight-bold text-primary">{dsaDetail? getCasses('DISBURSED') : 0}</h2>  
                            </div> 
                            </div> 
                        </div>
                        <div className="col-sm-12 col-md-6 col-xl-3"> 
                            <div className="card"> 
                            <div className="card-body"> 				
                                <p className=" mb-1 text-muted fs-14">Disbursed Amount</p>
                                <h2 className="mb-0 font-weight-bold text-primary">₹ {dsaDetail? getCasses('TOTAL_BUSINESSVOLUME') : 0}</h2> 
                            </div> 
                            </div> 
                        </div>
                        
                    </div>
                    
                    
                    <div className="row">
                        <div className="col-lg-12 col-xl-12">
                        <div className="">
                            <div className="main-content-body main-content-body-contacts">
                                <h6>Partner Information</h6>
                                <div className="main-contact-info-header bg-contacthead">
                                    <div className="media">
                                    <div className="main-img-user brround"> <img alt="" src={dsaDetail &&  dsaDetail.userDetail ? dsaDetail.userDetail.doc : ''} className="w-100 h-100 br-7" /> 
                                    <Link to=""><i className="fa fa-camera"></i></Link> </div>
                                    <div className="media-body text-white">
                                        <h4 className="text-white">Company Name: {dsaDetail &&  dsaDetail.userDetail ? dsaDetail.userDetail.company_name : ''}</h4>
                                        <p className="mb-1">Trade Name: {dsaDetail &&  dsaDetail.userDetail ? dsaDetail.userDetail.user_name : ''}</p>
                                        <p className="">Person Name: {dsaDetail &&  dsaDetail.userDetail ? dsaDetail.userDetail.full_name : ''}</p>
                                    </div>
                                    </div>
                                    <div className="main-contact-action"> <Link data-bs-dismiss="modal"  onClick={() => hideModel(dsaDetail)} className="btn btn-primary"> Edit</Link></div>
                                </div>
                                <div className="main-contact-info-body">
                                    <div className="media-list p-0">
                                    <div className="media py-4 mt-0">
                                        <div className="media-body">
                                            <div className="d-flex">
                                                <div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa fa-phone"></i> </div>
                                                <div className="w-70"> <label>Mobile no</label> <span className="font-weight-normal1 fs-14">{dsaDetail &&  dsaDetail.userDetail ? dsaDetail.userDetail.mobile_number : ''}</span> </div>
                                            </div>
                                            <div className="d-flex">
                                                <div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa fa-envelope"></i> </div>
                                                <div className="w-70"> <label>Email</label> <span className="font-weight-normal1 fs-14">{dsaDetail &&  dsaDetail.userDetail ? dsaDetail.userDetail.email : ''}</span> </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="media py-4 border-top mt-0">
                                        <div className="media-body">
                                            <div className="d-flex">
                                                <div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa-solid fa-globe fa-fw"></i> </div>
                                                <div className="w-70"> <label>Website:</label> <span className="font-weight-normal1 fs-14">{dsaDetail &&  dsaDetail.userDetail ? dsaDetail.userDetail.website : ''}</span> </div>
                                            </div>
                                            <div className="d-flex">
                                                <div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa-regular fa-address-card fa-fw"></i> </div>
                                                <div className="w-70"> <label>Pan/GST no:</label> <span className="font-weight-normal1 fs-14">{dsaDetail &&  dsaDetail.userDetail  && dsaDetail.userDetail.pan_number &&  dsaDetail.userDetail.gst_number? dsaDetail.userDetail.pan_number+"/"+dsaDetail.userDetail.pan_number : dsaDetail  &&  dsaDetail.userDetail  && dsaDetail.userDetail.pan_number? dsaDetail && dsaDetail.userDetail.pan_number : dsaDetail  &&  dsaDetail.userDetail  && dsaDetail.userDetail.gst_number?dsaDetail.userDetail.gst_number:''}</span> </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="media py-4 border-top mt-0">
                                        <div className="media-body">
                                            <div className="d-flex">
                                                <div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa fa-map-marker"></i> </div>
                                                <div className="w-70"> <label>Address:</label> <span className="font-weight-normal1 fs-14">{dsaDetail &&  dsaDetail.userDetail ? dsaDetail.userDetail.address : ''}</span> </div>
                                            </div>
                                            <div className="d-flex">
                                                <div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa-solid fa-globe fa-fw"></i> </div>
                                                <div className="w-70"> <label>Public Url:</label> <a className="font-weight-normal1 fs-14" href={dsaDetail  &&  dsaDetail.userDetail && props.config.PRODUCTION_MODE==1?'https://'+props.config.WEB_LIVE_DOMAIN+'/'+dsaDetail.userDetail.user_name: dsaDetail  &&  dsaDetail.userDetail  && props.config.PRODUCTION_MODE==0?'https://'+props.config.WEB_STAGING_DOMAIN+'/'+dsaDetail.userDetail.user_name:''}  target="_blank">
                                                    {dsaDetail  &&  dsaDetail.userDetail  && props.config.PRODUCTION_MODE==1?'https://'+props.config.WEB_LIVE_DOMAIN+'/'+dsaDetail.userDetail.user_name: dsaDetail  &&  dsaDetail.userDetail  && props.config.PRODUCTION_MODE==0?'https://'+props.config.WEB_STAGING_DOMAIN+'/'+dsaDetail.userDetail.user_name:''}
                                                    </a> </div>
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

            <div className="modal fade effect-scale show" id="assign-rm" aria-modal="true" role="dialog"> 
                <div className="modal-dialog" role="document"> 
                <div className="modal-content modal-content-demo"> 
                    <div className="modal-header"> <h6 className="modal-title">Assign RM</h6>
                    <button aria-label="Close" className="btn-close" data-bs-dismiss="modal" type="button"><span aria-hidden="true">×</span></button> </div> 
                    
                        <div className="modal-body application-modal"> 
                            <div className="row">
                                <div className="col-md-12">
                                <div className="form-group m-0"> 
                                    <label className="form-label">Sale</label> 
                                    <div className="row g-xs"> 
                                        <div className="col-12"> 
                                        <select className="form-control custom-select">
                                            <option value="">Select Sale</option> 
                                        </select>
                                        </div> 
                                    </div> 
                                    </div>
                                </div>
                                <div className="col-md-12">
                                <div className="form-group m-0"> 
                                    <label className="form-label">Operation</label> 
                                    <div className="row g-xs"> 
                                        <div className="col-12"> 
                                        <select className="form-control custom-select">
                                            <option value="">Select Operation Member</option> 
                                        </select>
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
        </>
    )

}

export default User;