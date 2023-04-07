import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Service from '../../lenderService';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment'
import {GetDashboard} from '../service/employService';

// const api = new Service();
const Dashboard = (props) => {
	const [dashboard, setDashboard] = useState([]);
	const [endDate, setendDate] = useState('');
	const [startDate, setstartDate] = useState('');
	const employer = JSON.parse(localStorage.getItem("employer"));
	const [totalEmployee, setTotalEmployee] = useState('');
	
	


	const getDashBoard = async (id) => {
        const response = await GetDashboard(id);
        if (response.status) {
            setTotalEmployee(response.TotalEmployees)
          
        } else {
            console.log("get employees data response", response);
        }
    }
	useEffect(() => {

		getDashBoard(employer.user_id)
	}, [])
	// useEffect(() => {

	// 	getDashBoard()
	// }, [])

	// useEffect(() => {
	// 	getDashBoard();
	// }, [startDate, endDate])
	// const getDashBoard = () => {
	// 	api.getApi('lender/dashboard', { startDate: startDate, endDate: endDate }).then(response => {
	// 		if (response.status === true) {
	// 			setDashboard(response.results)
	// 		}

	// 	}).catch(error => {

	// 	}, [])
	// }
	// useEffect(() => {
	// 	console.log('inside 2');

	// 	getDashBoard();
	// }, [startDate, endDate])




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

	//    const handleCallback = (event, picker) => {
	// 	getDashBoard(moment(picker.startDate).format(),moment(picker.endDate).format())
	//   }
	//   const handleCallbackOnCancel = (event, picker) => {
	// 	getDashBoard('','')
	//   }
	return (
		<>
			<div className="main-container container-fluid px-0">
				<div className="page-header pt-5">
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
											<input placeholder= "Search By Date" className="form-control fc-datepicker hasDatepicker" type="text" defaultValue="" />
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
								<p className="fs-13 mb-1">Total Employees</p>
								<h2 className="mb-1 font-weight-bold">{totalEmployee ? totalEmployee : 0}</h2>
								<span className="mb-1"><Link to={'/employer/employees'} className="text-azure"><i className="fa fa-eye  me-1"></i> View Detail</Link></span>
							</div>
						</div>
					</div>

				

				</div>
			</div>
		</>
	)
}

export default Dashboard;