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
import { DeleteEmployees, GetEmployees, GetEmployers, GetEmployerDetail } from '../service/lenderService';
import Index from '..';
const config = require('../../config.json')
const prefix = process.env.REACT_APP_LENDER_PRIFIX;
const api = new Service();

const Employer = (props) => {

    const [AddedCases, setAddedCases] = useState([]);
    const [showAddNewCases, setshowAddNewCases] = useState(false);
    const [lenderData, setDsaData] = useState(localStorage.getItem("lender"));
    const [userId, setUserId] = useState(JSON.parse(lenderData)?.user_id);
    const [referenceType, setReferenceType] = useState(JSON.parse(lenderData)?.user_id);
    const [loading, setloading] = useState(false);
    const [profileData, setprofileData] = useState({});
    const [pagesCount, setpagesCount] = useState('');
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

    const lender = JSON.parse(localStorage.getItem("lender"));


    const getEmployeesData = async (token, pageNumber, filterVlu) => {
        const response = await GetEmployers(token, pageNumber, filterVlu);
        if (response.status) {
            setDataArray(response.data);
            setTotalPagesCount(response.AllEmployer);
        } else {
            console.log("get employees data response", response);
        }
    }

    const getDetail = async (token, id) => {
        const response = await GetEmployerDetail(token, id);
        console.log("🚀 ~ file: Merchant.js:124 ~ getDetail ~ response:", response)
        if (response.status) {
            setDetail(response.data);
        } else {
            console.log("get merchant data response", response);
        }
    }

    const deleteEmployees = async (id) => {
        let raw = JSON.stringify({ id });
        const res = await DeleteEmployees(lender.lender_token, raw);
        if (res.status) {
            toast.success(res.message);
        } else {
            toast.error(res.message);
            console.log(res);
        }
    }



    useEffect(() => {
        setpagesCount(1);
        getEmployeesData(lender.lender_token, pagesCount, search);
    }, [search, pagesCount]);


    useEffect(() => {
        api.getApi('lender/profile').then(response => {
            console.log('response.data.user_id', response.data.user_id);

            if (response.status === true) {
                setprofileData(response.data);
                setUserId(response.data.user_id)

            }
        }).catch(error => {
            console.log('error', error);
        });

        console.log('referenceType', referenceType);

    }, [])

    // useEffect(() => {
    //     getList();
    // }, [])


    // useEffect(() => {
    //     getList(1);
    // }, [endDate,startDate])
    // useEffect(() => {
    //     getList(1);
    // }, [queryFilter, search])

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

    const showCasesList = () => {
        setshowAddNewCases(false);
    }
    const showAddNewPages = () => {
        // setshowAddNewCases(true);
        // navigate('/dsa/add_cases')
    }

   
    return (
        <>

            {!showAddNewCases &&
                <div>
                    <div className="main-container container-fluid px-0">
                        <div className="page-header mb-3">
                            <div className="page-leftheader">
                                <h4 className="page-title mb-0 text-primary">Employer Details</h4>
                            </div>
                            <div className="page-rightheader">
                                <div className="btn-list">
                                    {/* <Link to="" className="btn btn-outline-primary mt-2" ><i className="fa fa-plus me-2"></i> Add Employer</Link> */}
                                    <DownloadTableExcel
                                        filename="users table"
                                        sheet="users"
                                        currentTableRef={tableRef.current}>
                                        <Link to="" className="btn btn-primary btn-pill"><i className="fa fa-download me-2"></i> Download Details</Link>
                                    </DownloadTableExcel>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {/* <div className="col-xl-3 col-lg-6 col-md-6 col-xm-12">
                                <div className="form-group">
                                    <label className="form-label">All Status</label>
                                    <div className="row g-xs">
                                        <div className="wd-200 mg-b-30">
                                            <div className="input-group">
                                                <select className="form-control mb-0" name="status" value={queryFilter.status} onChange={(e) => handleChangeQueryBuilder(e)}>
                                                    <option>Select Status</option>
                                                    <option value="incomplete">Active Employer</option>
                                                    <option value="shortClose">Inactive Employer</option>
                                                 
                                                </select>
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
                                            <div className="input-group"> */}
                                            {/* <select className="form-control mb-0" name="loan_type" value={queryFilter.loan_type} onChange={(e) => handleChangeQueryBuilder(e)}> */}
                                                {/* <select className="form-control mb-0" name="loan_type" >
                                                    <option>Select Loan</option>
                                                    <option value="1">BNPL</option> */}
                                                    {/* <option value="2">BN</option> */}

                                                {/* </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {/* <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
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
                            </div> */}
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
                                                        <th className="font-weight-bold">ACTION</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dataArray.length > 0 && dataArray.map((option, index) => {
                                                        let serial_num = ((5 * (pagesCount - 1)) + index + 1);
                                                        return (
                                                            <tr key={option.user_id} >

                                                                <td><span className="font-weight-normal1">{serial_num}</span></td>
                                                                <td><span className="font-weight-normal1">{option.company_name}</span></td>
                                                                <td><span className="font-weight-normal1">
                                                                    <Link to={prefix + `/employee_detail/${option.employeeID}`}>{option.full_name}</Link>
                                                                </span></td>
                                                                <td><span className="font-weight-normal1">{option.email}</span></td>
                                                                <td><span className="font-weight-normal1">{option.mobile_number}</span></td>
                                                                <td><Link to="" onClick={() => getDetail(lender.lender_token, option.user_id)} data-bs-target="#applicaiton-report" data-bs-toggle="modal" className="view-pro"><i className="far fa-eye"></i> View Profile</Link></td>

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

                    <div className="modal fade effect-fall show" id="applicaiton-report" aria-modal="true" role="dialog">
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content modal-content-demo">
                                <div className="modal-header"> <h6 className="modal-title">Applicants Report</h6>
                                    <button aria-label="Close" className="btn-close" data-bs-dismiss="modal" type="button"><span aria-hidden="true">×</span></button> </div>

                                <div className="modal-body application-modal">

                                    <div className="row">
                                        <div className="col-lg-12 col-xl-12">
                                            <div className="">
                                                <div className="main-content-body main-content-body-contacts">
                                                    <h6>Marchant Information</h6>
                                                    <div className="main-contact-info-header bg-contacthead pb15">
                                                        <div className="media">
                                                            <div className="media-body text-white ml-0">
                                                                <h4 className="text-white">Company Name: {detail && detail.company_name ? detail.company_name : ''}</h4>
                                                                <p className="mb-1">Person Name: {detail && detail ? detail.full_name : ''}</p>
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
                                                                        <div className="w-70"> <label>Phone</label> <span className="font-weight-normal1 fs-14">{detail && detail ? detail.mobile_number : ''}</span> </div>
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        <div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa fa-envelope"></i> </div>
                                                                        <div className="w-70"> <label>Email</label> <span className="font-weight-normal1 fs-14">{detail && detail ? detail.email : ''}</span> </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="media py-4 border-top mt-0">
                                                                <div className="media-body">
                                                                    <div className="d-flex">
                                                                        <div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa-regular fa-address-card fa-fw"></i> </div>
                                                                        <div className="w-70"> <label>GST no:</label> <span className="font-weight-normal1 fs-14">{detail && detail ? detail.gst_number : ''}</span> </div>
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        <div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa fa-map-marker"></i> </div>
                                                                        <div className="w-70"> <label>Address:</label> <span className="font-weight-normal1 fs-14">{detail && detail ? detail.address : ''}</span> </div>
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
                </div>

            }

        </>
    )
}
export default Employer;
