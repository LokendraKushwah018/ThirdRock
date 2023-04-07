import { Link, useLocation, useParams, useNavigate, Navigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import Dropdown from 'react-bootstrap/Dropdown';
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import Service from '../../lenderService';
import $ from 'jquery';
import PaginationComponent from '../../PaginationComponent';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment'
import Moment from 'react-moment';
import { GetEmployers, DeleteEmployees } from '../service/adminService';
import Index from '..';
import AssignToLender from '../layout/Model';
import { Modal } from 'reactstrap';
import { Button } from 'react-bootstrap';
const config = require('../../config.json')
const prefix = process.env.REACT_APP_ADMIN_PRIFIX;
const api = new Service();

const Employer = (props) => {

    const [AddedCases, setAddedCases] = useState([]);
    const [showAddNewCases, setshowAddNewCases] = useState(false);
    const [lenderData, setDsaData] = useState(localStorage.getItem("admin"));
    const [userId, setUserId] = useState(JSON.parse(lenderData)?.user_id);
    const [referenceType, setReferenceType] = useState(JSON.parse(lenderData)?.user_id);
    const [loading, setloading] = useState(false);
    const [profileData, setprofileData] = useState({});
    const [pagesCount, setpagesCount] = useState(1);
    const [totalPagesCount, setTotalPagesCount] = useState(10);
    const [totalItems, settotalItems] = useState(0);
    const [dataArray, setDataArray] = useState([]);
    const [detail, setDetail] = useState([]);
    const [search, setSearch] = useState('');
    const [endDate, setendDate] = useState('');
    const [startDate, setstartDate] = useState('');
    const tableRef = useRef(null);
    // const [salaryModeList, setSalaryModeList] = useState([]);

    const [queryFilter, setQueryFilter] = useState({
        status: props.caseStatus ? props.caseStatus : '',
        search: '',
        lender_id: props.lender_id ? props.lender_id : '',
        lender_id_op: "eq",
        dsa_id: props.dsa_id ? props.dsa_id : '',
        dsa_id_op: "eq",
        file_id: '',
        file_id_op: "eq",
        loan_type: '',
        loan_type_op: "eq",
        full_name: "",
        full_name_op: "eq",
        company_name: "",
        company_name_op: "eq",
        email: "",
        email_op: "eq",
        mobile_number: "",
        mobile_number_op: "",
        age: '',
        age_op: "eq",
        created_at: '',
        created_at_op: "eq",
        received_time: '',
        received_time_op: "eq",
        short_close_time: '',
        short_close_time_op: "eq",
        comment_time: '',
        comment_time_op: "eq",
        remark_time: '',
        remark_time_op: "eq",
        assigned_time: '',
        assigned_time_op: "eq",
        logged_time: '',
        logged_time_op: "eq",
        pending_time: '',
        pending_time_op: "eq",
        approved_time: '',
        approved_time_op: "eq",
        reject_time: '',
        reject_time_op: "eq",
        disbursed_time: '',
        disbursed_tim_op: '=',
        city: '',
        city_op: "eq",
        pincode: '',
        pincode_op: "eq",
        state: '',
        state_op: "eq",
        organization_type: '',
        organization_type_op: "eq",
        father_name: '',
        father_name_op: "eq",
        qualification: "",
        qualification_op: "eq",
        marital_status: "",
        marital_status_op: "eq",
        employer_name: "",
        employer_name_op: "eq",
        orderBy: "",
        orderBy_op: "",

    });

    const employer = JSON.parse(localStorage.getItem("admin"));
    const token = employer.admin_token;


    const getEmployeesData = async (token, pageNumber, filterVlu) => {
        const response = await GetEmployers(token, pageNumber, filterVlu);
        if (response.status) {
            setDataArray(response.data);
            setTotalPagesCount(response.AllEmployer);
            settotalItems(response.AllEmployer)
        } else {
            console.log("get employees data response", response);
        }
    }

    const deleteEmployees = async (id) => {
        let raw = JSON.stringify({ id });
        const res = await DeleteEmployees(token, raw);
        if (res.status) {
            toast.success(res.message);
        } else {
            toast.error(res.message);
            console.log(res);
        }
    }



    useEffect(() => {
        // setpagesCount(1);
        getEmployeesData(token, pagesCount, search);
    }, [search, pagesCount]);


    // useEffect(() => {
    //     api.getApi('lender/profile').then(response => {
    //         console.log('response.data.user_id', response.data.user_id);

    //         if (response.status === true) {
    //             setprofileData(response.data);
    //             setUserId(response.data.user_id)

    //         }
    //     }).catch(error => {
    //         console.log('error', error);
    //     });

    //     console.log('referenceType', referenceType);

    // }, [])



    const handleChange = e => {
        const { name, value } = e.target;
        setQueryFilter(prevState => ({
            ...prevState,
            [name]: value.trim()
        }));
    };

    const handleChangeQueryBuilder = e => {
        const { name, value } = e.target;
        setQueryFilter(prevState => ({
            ...prevState,
            [name]: value.trim()
        }));
    };


    //Profile

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
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>

            {!showAddNewCases &&
                <div>
                    <div className="main-container container-fluid px-0">
                        <div className="page-header mb-3">
                            <div className="page-leftheader">
                                <h4 className="page-title mb-0 text-primary">Employer Reports {totalItems ? '(' + totalItems + ')' : ''}</h4>
                            </div>

                            <AssignToLender show={show} handleShow={handleShow} handleClose={handleClose} />

                            {/* <div className="page-rightheader">
                                <div className="btn-list"> */}
                                    {/* <Link to="/lender/add_cases" className="btn btn-outline-primary mt-2" ><i className="fa fa-plus me-2"></i> Add Employer's</Link> */}

                                    {/* <DownloadTableExcel
                                        filename="users table"
                                        sheet="users"
                                        currentTableRef={tableRef.current}>
                                        <Link to="" className="btn btn-primary btn-pill"><i className="fa fa-download me-2"></i> Download Cases</Link>
                                    </DownloadTableExcel> */}
                                {/* </div>
                            </div> */}
                        </div>
                        <div className="row">
                            <div className="col-xl-3 col-lg-6 col-md-6 col-xm-12">
                                <div className="form-group">
                                    <label className="form-label">All Status</label>
                                    <div className="row g-xs">
                                        <div className="wd-200 mg-b-30">
                                            <div className="input-group">
                                                <select className="form-control mb-0" name="status" value={queryFilter.status} onChange={(e) => handleChangeQueryBuilder(e)}>
                                                    <option>Select Status</option>
                                                    <option value="Active Employer">Active Employer</option>
                                                    <option value="InActive Employer">InActive Employer</option>
                                                    {/* <option value="received">CLOSED</option> */}
                                                    {/* <option value="shortClose">SHORT CLOSE</option>
                                                    <option value="assigned">ASSIGNED</option>
                                                    <option value="logged">LOGGED</option>
                                                    <option value="pending">PENDING</option>
                                                    <option value="approved">APPROVED</option>
                                                    <option value="rejected">REJECTED</option>
                                                    <option value="disbursed">DISBURSED</option> */}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-xl-3 col-lg-6 col-md-6 col-xm-12">
                                <div className="form-group">
                                    <label className="form-label">Incomplete Status</label>
                                    <div className="row g-xs">
                                        <div className="wd-200 mg-b-30">
                                            <div className="input-group">
                                                <select className="form-control mb-0"><option>Select Status</option></select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {/* <div className="col-xl-3 col-lg-6 col-md-6 col-xm-12">
                                <div className="form-group">
                                    <label className="form-label">Loan Type</label>
                                    <div className="row g-xs">
                                        <div className="wd-200 mg-b-30">
                                            <div className="input-group">
                                                <select className="form-control mb-0" name="loan_type" value={queryFilter.loan_type} onChange={(e) => handleChangeQueryBuilder(e)}>
                                                    <option>Select Loan</option>
                                                    <option value="1">Personal</option>
                                                    <option value="2">Business</option>

                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                                <div className="form-group">
                                    <label className="form-label">Select Date</label>
                                    <div className="row g-xs">
                                        <div className="wd-200 mg-b-30">
                                            <div className="input-group">
                                                <DateRangePicker onApply={handleCallback} onCancel={handleCallbackOnCancel} initialSettings={{ autoUpdateInput: false, locale: { cancelLabel: 'Clear' } }}>
                                                    <input placeholder="Search By Date" className="form-control fc-datepicker hasDatepicker" type="text" defaultValue="" />
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
                                            <input type="text" className="form-control" placeholder="Search By Keyword" value={search} onChange={(e) => setSearch(e.target.value)} />
                                            <span className="input-group-append"> <button className="btn btn-primary" type="button"><i className="fa fa-search"></i></button> </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div className="row">
                            <div className="col-sm-12 col-lg-12">
                                <div className="card">
                                    <div className="card-header br-0">
                                        <h3 className="card-title"> Cases Report {totalItems ? '(' + totalItems + ')' : ''} </h3> */}
                                        {/* <div className="card-options"> 
							    <Link to="" className="btn btn-sm btn-outline-primary mx-sm-2"><i className="fa fa-file-upload"></i> Upload Cases</Link> 
								<Link to="" className="btn btn-sm btn-primary "><i className="fa fa-file-upload"></i> Update Cases</Link> 
							</div>  */}
                                    {/* </div>
                                </div>
                            </div>
                        </div> */}

                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-body p-0">
                                        <div className="table-responsive">
                                            <table className="table table-hover card-table table-vcenter text-nowrap" ref={tableRef}>
                                                <thead className="border-bottom-0 pt-3 pb-3">
                                                    <tr>
                                                        <th className="font-weight-bold">SERIAL NO.</th>
                                                        <th className="font-weight-bold">COMPANY NAME</th>
                                                        <th className="font-weight-bold">NAME</th>
                                                        <th className="font-weight-bold">Email</th>
                                                        <th className="font-weight-bold">MOBILE NO.</th>
                                                        {/* <th className="font-weight-bold">GENDER</th> */}
                                                        {/* <th className="font-weight-bold">SALARY</th> */}
                                                        {/* <th className="font-weight-bold">CREATED AT</th>
                                                        <th className="font-weight-bold">UPDATED AT</th> */}
                                                        <th className="font-weight-bold">ACTION</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dataArray.length > 0 && dataArray.map((option, index) => {
                                                        let serial_num = ((5 * (pagesCount - 1)) + index + 1);
                                                        return (
                                                            <tr key={option.user_id} >
                                                                {/* <td><Link to={props.prefix + '/case/' + option?.loan_id+ '/' + option?.customer?.customer_id +'/' + option?.loan_type + '/' + option?.customer_lender_assign?.lender?.user_id + '/' + option?.customer_lender_assign?.file_id}>{option.customer_lender_assign ? option.customer_lender_assign.file_id : ''}<br /><span className="font-weight-normal1">{option.customer ? option.customer.full_name : ''}</span></Link></td>
                                                            <td>
                                                                <span className="font-weight-normal1">{option.customer_lender_assign ? option.customer_lender_assign.lender?.file_id : ''}</span>
                                                                <br />
                                                                <span className="font-weight-normal1">{option.customer_lender_assign ? option.customer_lender_assign.lender?.company_name : ''}</span>
                                                            </td> */}


                                                                <td><span className="font-weight-normal1">{serial_num}</span></td>
                                                                <td><span className="font-weight-normal1">{option.company_name}</span></td>
                                                                <td><span className="font-weight-normal1">
                                                                    <Link to={prefix + `/employee_detail/${option.user_id}`}>{option.full_name}</Link>
                                                                </span></td>
                                                                <td><span className="font-weight-normal1">{option.email}</span></td>
                                                                <td><span className="font-weight-normal1">{option.mobile_number}</span></td>
                                                                {/* <td><span className="font-weight-normal1">{option.Gender}</span></td> */}
                                                                {/* <td><span className="font-weight-normal1">{option.Salary}</span></td> */}
                                                                {/* <td>{option.created_at ? <><span className="font-weight-normal1"><Moment format="YYYY-MM-DD hh:mm A">{option.created_at}</Moment></span><br /></> : ''}</td> */}

                                                                {/* <td>{option.updated_at ? <><span className="font-weight-normal1"><Moment format="YYYY-MM-DD hh:mm A">{option.updated_at}</Moment></span></> : ''}</td> */}


                                                                {/* <td><span className="font-weight-normal1">{option.status == 'INCOMPLETE' ? option.status : option.customer_lender_assign?.status ? option.customer_lender_assign.status : ''}</span></td> */}
                                                                {/* <td>
                                                                    <Link to={props.prefix + '/case/' + option?.loan_id + '/' + option?.customer?.customer_id + '/' + option?.loan_type + '/' + option?.customer_lender_assign?.lender?.user_id + '/' + option?.customer_lender_assign?.file_id} className="view-case btn btn-primary"><i className="fas fa-file-alt"></i> View Case</Link>
                                                                    </td> */}

                                                                <td>
                                                                    <Dropdown>
                                                                        <Dropdown.Toggle className='view-pro' id="dropdown-basic">
                                                                            ACTION
                                                                        </Dropdown.Toggle>

                                                                        <Dropdown.Menu>
                                                                            <Dropdown.Item>
                                                                                <Link to={prefix + `/employee_detail/${option.user_id}`}>View Details</Link>
                                                                            </Dropdown.Item>
                                                                            {/* <Dropdown.Item>
                                                                                <Link to="" onClick={handleShow}>Assign To Lender</Link>
                                                                            </Dropdown.Item>
                                                                            <Dropdown.Item>
                                                                                <Link to="">Delete Case</Link>
                                                                            </Dropdown.Item> */}
                                                                            {/* <Dropdown.Item>
                                                                                <Link to={prefix + `/employee_detail/${option.employeeID}`}>View Case</Link>
                                                                            </Dropdown.Item> */}
                                                                            {/* <Dropdown.Item>
                                                                                <Link to={prefix + `/employee_setlimit/${option.employeeID}`}>Manage Limit</Link>
                                                                            </Dropdown.Item> */}
                                                                            {/* <Dropdown.Item>
                                                                                <Link to={prefix + `/employee_edit/${option.employeeID}`}>Edit Case</Link>
                                                                            </Dropdown.Item> */}
                                                                            {/* <Dropdown.Item onClick={() => deleteEmployees(option.employeeID)}>Delete</Dropdown.Item> */}
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                    )}
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
                </div>

            }
        </>
    )
}


export default Employer;
