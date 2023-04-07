import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import PaginationComponent from '../../PaginationComponent';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import Moment from 'react-moment';
import { GetLenderDetail, GetLenders } from '../service/adminService';

const Lender = (props) => {
	const [loading, setloading] = useState(false);
	const [pagesCount, setpagesCount] = useState(1);
	const [totalPagesCount, setTotalPagesCount] = useState(10);
	const [dataArray, setDataArray] = useState([]);
	const [totalItems, settotalItems] = useState(0);
	const [startDate, setstartDate] = useState('');
	const [endDate, setendDate] = useState('');
	const [search, setSearch] = useState('');
	const [detail, setDetail] = useState([]);
	const navigate = useNavigate();
	const lender = JSON.parse(localStorage.getItem("admin"));
	const token = lender.admin_token;


	const getList = async (token, pageNumber, filterVlu) => {
		setloading(true)
		const response = await GetLenders(token, pageNumber, filterVlu)
		if (response.status) {
			setDataArray(response.data);
			setTotalPagesCount(response.AllLender);
			settotalItems(response.AllLender)
			setloading(false)
		}
		// props.api.getApi('admin/lenderList', { page: page - 1, size: 10, startDate: startDate, endDate: endDate, search: search.trim() }).then(response => {
		// 	setDataArray(response.data.record);
		// 	setpagesCount(response.data.totalItems + 1)
		// 	settotalItems(response.data.totalItems)
		// 	setloading(false)
		// }).catch(error => {
		// 	setloading(false)
		// 	props.toast.error(error.message);
		// });
	}
	useEffect(() => {
		// setpagesCount(1);
		getList(token, pagesCount, search);
	}, [search, pagesCount])

	// useEffect(() => {
	// 	getList();
	// }, [startDate, endDate, search])



	const getDetail = async (user_id) => {
		setloading(true)
		const response = await GetLenderDetail(token, user_id)
		console.log('response getDetail',response);
		if (response.data) {
			setDetail(response.data);
			setloading(false)
		} else {
			setloading(false)
			props.toast.error(response.message);
		}
		// props.api.postApi('admin/lenderDetail', { user_id: user_id }).then(response => {
		// 	setDetail(response.data);
		// 	setloading(false)
		// }).catch(error => {
		// 	setloading(false)
		// 	props.toast.error(error.message);
		// });
	}

	const getCasses = (status) => {
		if (detail && detail.cases && detail.cases.length) {
			let found = detail.cases.find(obj => {
				return obj.status === status;
			});
			return found?.value ? found.value : 0;
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
		console.log('e.userDetail.user_id', e.userDetail.user_id);
		navigate(props.prefix + '/edit_lender/' + e.userDetail.user_id)
	}
	return (
		<>
			<div className="main-container container-fluid px-0">
				<div className="page-header">
					<div className="page-leftheader">
						<h4 className="page-title mb-0 text-primary">Lender Reports {totalItems ? '(' + totalItems + ')' : ''}</h4>
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
										<DateRangePicker onApply={handleCallback} onCancel={handleCallbackOnCancel} initialSettings={{ autoUpdateInput: false, locale: { cancelLabel: 'Clear' } }}>
											<input className="form-control fc-datepicker hasDatepicker" type="text" defaultValue="" placeholder='Search By Date' />
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
												<th className="font-weight-bold">SERIAL NO.</th>
												<th className="w-470 font-weight-bold">Company name</th>
												<th className="font-weight-bold">Name</th>
												<th className="font-weight-bold">Mobile</th>
												<th className="font-weight-bold">Created At</th>
												<th className="font-weight-bold">Updated At</th>
												<th></th>
												<th></th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											{dataArray.length > 0 && dataArray.map((option, index) => {
												let serial_num = ((5 * (pagesCount - 1)) + index + 1);
												return (
												<tr key={index} >
													<td>{serial_num}</td>
													<td><span className="font-weight-normal1">{option.company_name}</span></td>
													<td><span className="font-weight-normal1">{option.full_name}</span></td>
													<td><span className="font-weight-normal1">{option.mobile_number}</span></td>
													<td><span className="font-weight-normal1"><Moment format="YYYY-MM-DD h:MM A">{option.created_at}</Moment></span></td>
													<td><span className="font-weight-normal1"><Moment format="YYYY-MM-DD h:MM A">{option.updated_at}</Moment></span></td>
													<td><Link to="" onClick={() => getDetail(option.user_id)} data-bs-target="#applicaiton-report" data-bs-toggle="modal" className="view-pro"><i className="far fa-eye"></i> View Profile</Link></td>
													{/* <td><Link to="" data-bs-target="#assign-rm" data-bs-toggle="modal" className="view-rm"><i className="fa fa-user-plus"></i> RM</Link></td> */}
													{/* <td><Link to={props.prefix + '/cases-lender/' + option.user_id} className="view-case"><i className="fas fa-file-alt"></i> View Case</Link></td> */}
												</tr>
											)})}
										</tbody>
									</table>
								</div>
							</div>

						</div>
					</div>

					{pagesCount > 0 && dataArray.length > 0 ?
						<>
							<div className="col-md-12">
								<div className="card-body">
									<PaginationComponent className="justify-content-center"
										totalItems={totalPagesCount}
										pageSize={5}
										maxPaginationNumbers={3}
										onSelect={(e) => setpagesCount(e)}
									/>
								</div>
							</div>
						</>
						: ''}

				</div>
			</div>

			<div className="modal fade effect-fall show" id="applicaiton-report" aria-modal="true" role="dialog">
				<div className="modal-dialog modal-lg" role="document">
					<div className="modal-content modal-content-demo">
						<div className="modal-header"> <h6 className="modal-title">Applicants Report</h6>
							<button aria-label="Close" className="btn-close" data-bs-dismiss="modal" type="button"><span aria-hidden="true">×</span></button> </div>

						<div className="modal-body application-modal">
							{/* <div className="row">
			  <div className="col-sm-12 col-md-6 col-xl-3"> 
			     <div className="card"> 
			      <div className="card-body"> 					
				    <p className=" mb-1 text-muted fs-14">Total Cases</p>
				    <h2 className="mb-0 font-weight-bold text-success">{detail? getCasses('TOTAL') : 0}</h2>  
				   </div> 
				  </div> 
			   </div>
			   <div className="col-sm-12 col-md-6 col-xl-3"> 
			     <div className="card"> 
			      <div className="card-body"> 				
				    <p className=" mb-1 text-muted fs-14">Assigned Cases</p>
				    <h2 className="mb-0 font-weight-bold text-primary">{detail? getCasses('ASSIGNED') : 0}</h2>  
				   </div> 
				  </div> 
			   </div>
			  
			   
			   <div className="col-sm-12 col-md-6 col-xl-3"> 
			     <div className="card"> 
			      <div className="card-body"> 				
				    <p className=" mb-1 text-muted fs-14">Logged Cases</p>
				    <h2 className="mb-0 font-weight-bold text-danger">{detail? getCasses('LOGGED') : 0}</h2> 
				   </div> 
				  </div> 
			   </div>
			  <div className="col-sm-12 col-md-6 col-xl-3"> 
			     <div className="card"> 
			      <div className="card-body"> 					
				    <p className=" mb-1 text-muted fs-14">Pending Cases</p>
				    <h2 className="mb-0 font-weight-bold text-warning">{detail? getCasses('PENDING') : 0}</h2>  
				   </div> 
				  </div> 
			   </div>
			   <div className="col-sm-12 col-md-6 col-xl-3"> 
			     <div className="card"> 
			      <div className="card-body"> 				
				    <p className=" mb-1 text-muted fs-14">Approved Cases</p>
				    <h2 className="mb-0 font-weight-bold text-success">{detail? getCasses('APPROVED') : 0}</h2> 
				   </div> 
				  </div> 
			   </div>
			   			   
			  <div className="col-sm-12 col-md-6 col-xl-3"> 
			     <div className="card"> 
			      <div className="card-body"> 					
				    <p className=" mb-1 text-muted fs-14">Disbursed Cases</p>
				    <h2 className="mb-0 font-weight-bold text-primary">{detail? getCasses('DISBURSED') : 0}</h2>  
				   </div> 
				  </div> 
			   </div>

               <div className="col-sm-12 col-md-6 col-xl-3"> 
			     <div className="card"> 
			      <div className="card-body"> 				
				    <p className=" mb-1 text-muted fs-14">Rejected Cases</p>
				    <h2 className="mb-0 font-weight-bold text-danger">{detail? getCasses('REJECTED') : 0}</h2> 
				   </div> 
				  </div> 
			   </div>
			   <div className="col-sm-12 col-md-6 col-xl-3"> 
			     <div className="card"> 
			      <div className="card-body"> 				
				    <p className=" mb-1 text-muted fs-14">Disbursed Amount</p>
				    <h2 className="mb-0 font-weight-bold text-primary">₹ {detail? getCasses('TOTAL_BUSINESSVOLUME') : 0}</h2> 
				   </div> 
				  </div> 
			   </div>
		     
		  </div> */}

							<div className="row">
								<div className="col-lg-12 col-xl-12">
									<div className="">
										<div className="main-content-body main-content-body-contacts">
											<h6>Lender Information</h6>
											<div className="main-contact-info-header bg-contacthead pb15">
												<div className="media">
													<div className="media-body text-white ml-0">
														<h4 className="text-white">Company Name: {detail ? detail.company_name : ''}</h4>
														<p className="mb-1">Person Name: {detail ? detail.full_name : ''}</p>
													</div>
												</div>
												{/* <div className="main-contact-action"> <Link data-bs-dismiss="modal" onClick={() => hideModel(detail)} className="btn btn-primary"> Edit</Link></div> */}
											</div>
											<div className="main-contact-info-body">
												<div className="media-list p-0">
													<div className="media py-4 mt-0">
														<div className="media-body">
															<div className="d-flex">
																<div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa fa-phone"></i> </div>
																<div className="w-70"> <label>Phone</label> <span className="font-weight-normal1 fs-14">{detail ? detail.mobile_number : ''}</span> </div>
															</div>
															<div className="d-flex">
																<div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa fa-envelope"></i> </div>
																<div className="w-70"> <label>Email</label> <span className="font-weight-normal1 fs-14">{detail  ? detail.email : ''}</span> </div>
															</div>
														</div>
													</div>
													<div className="media py-4 border-top mt-0">
														<div className="media-body">
															<div className="d-flex">
																<div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa-regular fa-address-card fa-fw"></i> </div>
																<div className="w-70"> <label>GST no:</label> <span className="font-weight-normal1 fs-14">{detail  ? detail.gst_number : ''}</span> </div>
															</div>
															<div className="d-flex">
																<div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa fa-map-marker"></i> </div>
																<div className="w-70"> <label>Address:</label> <span className="font-weight-normal1 fs-14">{detail ? detail.address : ''}</span> </div>
															</div>
														</div>
													</div>
													<div className="media py-4 border-top mt-0">
														<div className="media-body">
															<div className="d-flex">
																<div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa-solid fa-percent fa-fw"></i> </div>
																<div className="w-70"> <label>Minimum Rate of Interest Per annum:</label> <span className="font-weight-normal1 fs-14">{detail ? detail.mini_rate_of_intrest : ''} %</span> </div>
															</div>
															<div className="d-flex">
																<div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa-solid fa-percent fa-fw"></i> </div>
																<div className="w-70"> <label>Maximum Rate of Interest Per annum:</label> <span className="font-weight-normal1 fs-14">{detail ? detail.max_rate_of_intrest : ''} %</span> </div>
															</div>
														</div>
													</div>
													<div className="media py-4 border-top mt-0">
														<div className="media-body">
															<div className="d-flex">
																<div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa-solid fa-landmark fa-fw"></i> </div>
																<div className="w-70"> <label>Minimum Loan Range:</label> <span className="font-weight-normal1 fs-14">₹ {detail ? detail.mini_loan_range : ''}</span> </div>
															</div>
															<div className="d-flex">
																<div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa-solid fa-landmark fa-fw"></i> </div>
																<div className="w-70"> <label>Maximum Loan Range:</label> <span className="font-weight-normal1 fs-14">₹ {detail ? detail.max_loan_range : ''}</span> </div>
															</div>
														</div>
													</div>
													<div className="media py-4 border-top mt-0">
														<div className="media-body">
															<div className="d-flex">
																<div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa-regular fa-calendar fa-fw"></i> </div>
																<div className="w-70"> <label>Minimum Tenure:</label> <span className="font-weight-normal1 fs-14">{detail ? detail.mini_tenure : ''} Months</span> </div>
															</div>
															<div className="d-flex">
																<div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa-regular fa-calendar fa-fw"></i> </div>
																<div className="w-70"> <label>Maximum Tenure:</label> <span className="font-weight-normal1 fs-14">{detail ? detail.max_tenure : ''} Months</span> </div>
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
export default Lender;