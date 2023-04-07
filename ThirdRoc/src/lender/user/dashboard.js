import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Service from '../../lenderService';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment'
import {GetDashboard} from '../service/lenderService';

const api = new Service();
const Dashboard = (props) => {
	const [dashboard, setDashboard] = useState([]);
	const [endDate, setendDate] = useState('');
	const [startDate, setstartDate] = useState('');


	const lender = JSON.parse(localStorage.getItem("lender"));
	const [totalBorrowers, setTotalBorrowers] = useState('');
	const [totalDues, setTotalDues] = useState('');
	const [totalEmisPaid, setTotalEmisPaid] = useState('');
	const [totalEmis, setTotalEmis] = useState('');
	const [totalTransactions, setTotalTransactions] = useState('');
	
	


	const getDashBoard = async (id) => {
        const response = await GetDashboard(id);
        if (response.status) {
            setTotalBorrowers(response.AllEmployes)
            setTotalDues(response.TotalDues)
            setTotalEmisPaid(response.TotalPaidEMI)
            setTotalEmis(response.EmiListsCount)
            setTotalTransactions(response.lenderTransctions)
          
        } else {
            console.log("get employees data response", response);
        }
    }
	useEffect(() => {

		getDashBoard(lender.user_id)
	}, [])


	




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
				<div className="row">
					{/* <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
						<div className="form-group">
							<label className="form-label">Select Date</label>
							<div className="row g-xs">
								<div className="wd-200 mg-b-30">
									<div className="input-group">
										<DateRangePicker onApply={handleCallback} onCancel={handleCallbackOnCancel} initialSettings={{ autoUpdateInput: false, locale: { cancelLabel: 'Clear' } }}>
											<input placeholder= "Search By Date" className="form-control fc-datepicker hasDatepicker" type="text" defaultValue="" />
										</DateRangePicker>
									</div>
								</div>
							</div>
						</div>
					</div> */}
					{/* <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
						<div className="form-group">
							<label className="form-label">Select To Date</label>
							<div className="row g-xs">
								<div className="wd-200 mg-b-30">
									<div className="input-group">
										<input className="form-control fc-datepicker hasDatepicker" placeholder="MM/DD/YYYY" type="date" />
									</div>
								</div>
							</div>
						</div>
					</div> */}
				</div>


				<div className="row">
					<div className="col-xl-3 col-lg-6 col-md-12">
						<div className="card">
							<div className="card-body">
								<svg className="card-custom-icon header-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"> <path d="M0 0h24v24H0V0z" fill="none"></path> <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16zm0-11.47L17.74 9 12 13.47 6.26 9 12 4.53z"></path> </svg>
								<p className="fs-13 mb-1">Total Borrowers</p>
								<h2 className="mb-1 font-weight-bold">{totalBorrowers?totalBorrowers:0}</h2>
								<span className="mb-1"><Link to={'/lender/employee'} className="text-azure"><i className="fa fa-eye  me-1"></i> View Detail</Link></span>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-6 col-md-12">
						<div className="card">
							<div className="card-body">
								<svg className="card-custom-icon header-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"> <path d="M0 0h24v24H0V0z" fill="none"></path> <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16zm0-11.47L17.74 9 12 13.47 6.26 9 12 4.53z"></path> </svg>
								<p className="fs-13 mb-1">Total Dues</p>
								<h2 className="mb-1 font-weight-bold">{totalDues?totalDues:0}</h2>
								<span className="mb-1"><Link to={'/lender/dues_list'} className="text-azure"><i className="fa fa-eye  me-1"></i> View Detail</Link></span>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-6 col-md-12">
						<div className="card">
							<div className="card-body">
								<svg className="card-custom-icon header-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"> <path d="M0 0h24v24H0V0z" fill="none"></path> <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16zm0-11.47L17.74 9 12 13.47 6.26 9 12 4.53z"></path> </svg>
								<p className="fs-13 mb-1">Total EMIs paid</p>
								<h2 className="mb-1 font-weight-bold">{totalEmisPaid?totalEmisPaid:0}</h2>
								<span className="mb-1"><Link to={'/lender/emi_paid'} className="text-azure"><i className="fa fa-eye  me-1"></i> View Detail</Link></span>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-6 col-md-12">
						<div className="card">
							<div className="card-body">
								<svg className="card-custom-icon header-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"> <path d="M0 0h24v24H0V0z" fill="none"></path> <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16zm0-11.47L17.74 9 12 13.47 6.26 9 12 4.53z"></path> </svg>
								<p className="fs-13 mb-1">Total EMIs</p>
								<h2 className="mb-1 font-weight-bold">{totalEmis?totalEmis:0}</h2>
								<span className="mb-1"><Link to={'/lender/emi'} className="text-azure"><i className="fa fa-eye  me-1"></i> View Detail</Link></span>
							</div>
						</div>
					</div>
				
					<div className="col-xl-3 col-lg-6 col-md-12">
						<div className="card">
							<div className="card-body">
								<svg className="card-custom-icon header-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"> <path d="M0 0h24v24H0V0z" fill="none"></path> <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16zm0-11.47L17.74 9 12 13.47 6.26 9 12 4.53z"></path> </svg>
								<p className="fs-13 mb-1">Total Transactions</p>
								<h2 className="mb-1 font-weight-bold">{totalTransactions?totalTransactions:0}</h2>
								<span className="mb-1"><Link to={'/lender/transactions'} className="text-azure"><i className="fa fa-eye  me-1"></i> View Detail</Link></span>
							</div>
						</div>
					</div>

			

				</div>
			</div>
		</>
	)
}

export default Dashboard;