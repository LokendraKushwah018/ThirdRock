import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment'
import Service from '../adminService';
import {GetDashboard} from './service/adminService';



const api = new Service();

const Dashboard = (props) => {
	const [dashboard, setDashboard] = useState([]);
	const [endDate, setendDate] = useState('');
	const [startDate, setstartDate] = useState('');
	const [adminData, setAdminData] = useState(localStorage.getItem("admin"));
	const [totalEmployer, setTotalEmployer] = useState('');
	const [totalLender, setTotalLender] = useState('');
	const [totalMerchant, setTotalMerchant] = useState('');
	const [totalSettlement, setTotalSettlement] = useState('');
	


	const getDashBoard = async () => {
        const response = await GetDashboard();
		console.log(response)
        if (response.status) {
            setTotalEmployer(response.totalEmployers)
            setTotalLender(response.totalLenders)
            setTotalMerchant(response.totalMerchants)
            setTotalSettlement(response.unsettalTransctions)

        } else {
            console.log("get employees data response", response);
        }
    }
	useEffect(() => {

		getDashBoard()
	}, [])
	// useEffect(() => {
	// 	api.getApi('admin/getSubPermissionList').then(response => {
	// 		if (response.status === true) {
	// 			setAllSubPermissions(response.data)
	// 		}
	// 	}).catch(error => {
	// 	});



	// }, [])

	// useEffect(() => {
	// 	if (sub_permission) {
	// 		let splitSPer = JSON.parse(sub_permission).split(',');
	// 		const userSubPerm = allSubPermissions.filter((item) => {
	// 			return splitSPer.includes(item.sub_id.toString())
	// 		})
	// 		setDashboardPerm(userSubPerm)
	// 	}

	// }, [allSubPermissions])

	// useEffect(() => {
	// 	console.log('dashboardPerm in dashboard', dashboardPerm);

	// 	for (let i = 0; i < dashboardPerm.length; i++) {
	// 		const element = dashboardPerm[i];
	// 		if (element.keyword == 'TOTAL_CASES') {
	// 			setTotalCases(true)
	// 		}
	// 		if (element.keyword == 'INCOMPLETE') {
	// 			setIncompleteCases(true)
	// 		}
	// 		if (element.keyword == 'SHORTCLOSE') {
	// 			setShortCloseCase(true)
	// 		}
	// 		if (element.keyword == 'RECEIVED') {
	// 			setCaseRecieved(true)
	// 		}
	// 		if (element.keyword == 'ASSIGNED') {
	// 			setCasesAssigned(true)
	// 		}
	// 		if (element.keyword == 'LOGGED') {
	// 			setCaseLogged(true)
	// 		}
	// 		if (element.keyword == 'PENDING') {
	// 			setPendingCases(true)
	// 		}
	// 		if (element.keyword == 'APPROVED') {
	// 			setCaseApproved(true)
	// 		}
	// 		if (element.keyword == 'REJECTED') {
	// 			setCaseReject(true)
	// 		}
	// 		if (element.keyword == 'DISBURSED') {
	// 			setCaseDisbursed(true)
	// 		}
	// 		if (element.keyword == 'BUSINESS_VOLUME') {
	// 			setBusinessVolume(true)
	// 		}


	// 	}
	// }, [dashboardPerm])

	

	// useEffect(() => {
	// 	getDashBoard();
	// }, [startDate, endDate])

	// const getDashBoard = () => {
	// 	props.api.getApi('admin/dashboard', { startDate: startDate, endDate: endDate }).then(response => {
	// 		if (response.status === true) {
	// 			setDashboard(response.results)
	// 		}

	// 	}).catch(error => {

	// 	});
	// }

	// const getCasses = (status) => {
	// 	if (dashboard.length) {
	// 		let found = dashboard.find(obj => {
	// 			return obj.status === status;
	// 		});

	// 		if (found && found.value != undefined) {
	// 			return found.value;
	// 		} else {
	// 			return 0;
	// 		}
	// 	} else {
	// 		return 0
	// 	}
	// }

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

	return (
		<>
			<div className="main-container container-fluid px-0">
				<div className="page-header">
					<div className="page-leftheader">
						<h4 className="page-title mb-0 text-primary">Dashboard</h4>
					</div>
				</div>
				{/* <div className="row">
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
				</div> */}


				<div className="row">
					<div className="col-xl-3 col-lg-6 col-md-12">
						<div className="card">
							<div className="card-body">
								<svg className="card-custom-icon header-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"> <path d="M0 0h24v24H0V0z" fill="none"></path> <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16zm0-11.47L17.74 9 12 13.47 6.26 9 12 4.53z"></path> </svg>
								<p className="fs-13 mb-1">Total Employers</p>
								<h2 className="mb-1 font-weight-bold">{totalEmployer?totalEmployer:0}</h2>
								<span className="mb-1"><Link to={'/admin/employer'} className="text-azure"><i className="fa fa-eye  me-1"></i> View Detail</Link></span>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-6 col-md-12">
						<div className="card">
							<div className="card-body">
								<svg className="card-custom-icon header-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"> <path d="M0 0h24v24H0V0z" fill="none"></path> <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16zm0-11.47L17.74 9 12 13.47 6.26 9 12 4.53z"></path> </svg>
								<p className="fs-13 mb-1">Total Lenders</p>
								<h2 className="mb-1 font-weight-bold">{totalLender?totalLender:0}</h2>
								<span className="mb-1"><Link to={'/admin/lender'} className="text-azure"><i className="fa fa-eye  me-1"></i> View Detail</Link></span>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-6 col-md-12">
						<div className="card">
							<div className="card-body">
								<svg className="card-custom-icon header-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"> <path d="M0 0h24v24H0V0z" fill="none"></path> <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16zm0-11.47L17.74 9 12 13.47 6.26 9 12 4.53z"></path> </svg>
								<p className="fs-13 mb-1">Total Merchants</p>
								<h2 className="mb-1 font-weight-bold">{totalMerchant?totalMerchant:0}</h2>
								<span className="mb-1"><Link to={'/admin/merchant'} className="text-azure"><i className="fa fa-eye  me-1"></i> View Detail</Link></span>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-6 col-md-12">
						<div className="card">
							<div className="card-body">
								<svg className="card-custom-icon header-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"> <path d="M0 0h24v24H0V0z" fill="none"></path> <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16zm0-11.47L17.74 9 12 13.47 6.26 9 12 4.53z"></path> </svg>
								<p className="fs-13 mb-1">Total Settlements</p>
								<h2 className="mb-1 font-weight-bold">{totalSettlement?totalSettlement:0}</h2>
								<span className="mb-1"><Link to={'/admin/settlement'} className="text-azure"><i className="fa fa-eye  me-1"></i> View Detail</Link></span>
							</div>
						</div>
					</div>
				</div>
	
			</div>
		</>
	)
}

export default Dashboard;