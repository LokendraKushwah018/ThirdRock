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
import { DeleteEmployees, GetEmployer, GetEmployees, GetDues } from '../service/lenderService';
import Index from '..';
// import { GetEmployees } from '../../employer/service/employService';
const config = require('../../config.json')
const prefix = process.env.REACT_APP_LENDER_PRIFIX;
const api = new Service();

const DuesList = (props) => {

    const [AddedCases, setAddedCases] = useState([]);
    const [showAddNewCases, setshowAddNewCases] = useState(false);
    const [lenderData, setDsaData] = useState(localStorage.getItem("lender"));
    const [token, setToken] = useState(JSON.parse(lenderData)?.lender_token);
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
        filter: '',
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


    const getDuesList = async (token, pageNumber, pageSize, filterVlu) => {
        const response = await GetDues(token, pageNumber, pageSize, filterVlu, userId);
        console.log("🚀 ~ file: Employee.js:111 ~ getEmployeesData ~ response:", response)
        // const response = await GetEmployer(token, pageNumber, pageSize, filterVlu);
        if (response.status) {
            setDataArray(response.data);
            // setTotalPagesCount(response.data["count"])
            // setDataArray(response.data);
            // setTotalPagesCount(response.AllEmployee);
        } else {
            console.log("get employees data response", response);
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


    const employer_id = JSON.parse(localStorage.getItem("employer"));


    useEffect(() => {
        setpagesCount(1);
        getDuesList(token, pagesCount, 5, search);
    }, [search, pagesCount, queryFilter]);


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
        console.log('name', name);
        console.log('value', value);

        setQueryFilter(prevState => ({
            ...prevState,
            [name]: value.trim()
        }));
    };
    //Lender Case 
    // const getList = (page = 1) => {
    //     setloading(true)
    //     console.log('userId',userId);
    //     api.getApi('lender/lendercaseslist',{page: page-1, size:10, ...queryFilter, dsa_id: userId, search: search.trim(), startDate: startDate, endDate: endDate }).then(response => {
    //         // api.getApi('dsa/dsaCasesList', {dsa_id: userId }).then(response => {

    //         if (response.status === true) {
    //             console.log('inside tanmay', response.data);
    //             setDataArray(response.data.record);
    //             setpagesCount(response.data.totalItems + 1)
    //             settotalItems(response.data.totalItems)
    //             setloading(false)
    //         }
    //     }).catch(error => {
    //         console.log('error', error);
    //         props.toast.error(error.message);
    //     });
    // }


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
    // useEffect(() => {
    //     setloading(true)
    //     if (userId) {
    //         api.getApi('dsa/dsaCasesList', { dsa_id: userId }).then(response => {
    //             console.log('response',response);

    //             if (response.status === true) {
    //                 console.log('inside tanmay', response.data);
    //                 setAddedCases(response.data.record);
    //                 setpagesCount(response.data.totalItems + 1)
    //                 settotalItems(response.data.totalItems)
    //                 setloading(false)
    //             }
    //         }).catch(error => {
    //             console.log('error', error);
    //             props.toast.error(error.message);
    //         });
    //     }
    // }, [userId])


    const showCasesList = () => {
        setshowAddNewCases(false);
    }
    const showAddNewPages = () => {
        // setshowAddNewCases(true);
        // navigate('/dsa/add_cases')
    }

    // useEffect(() => {
    //     getList(1);
    // }, [queryFilter])

    return (
        <>

            {!showAddNewCases &&
                <div>
                    <div className="main-container container-fluid px-0">
                        <div className="page-header mb-3">
                            <div className="page-leftheader">
                                <h4 className="page-title mb-0 text-primary">Dues List</h4>
                            </div>
                            <div className="page-rightheader">
                                <div className="btn-list">
                                    {/* <Link to="" className="btn btn-outline-primary mt-2" ><i className="fa fa-plus me-2"></i> Add Borrower</Link> */}
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

                            <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                                <div className="form-group">
                                    <label className="form-label">Search</label>
                                    <div className="row g-xs">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Search By Keyword" value={search} onChange={(e) => setSearch(e.target.value)} />
                                            {/* <input type="text" className="form-control" placeholder="Search By Keyword" /> */}
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
                                                        <th className="font-weight-bold">DATE</th>
                                                        <th className="font-weight-bold">CUSTOMER NAME</th>
                                                        <th className="font-weight-bold">AMOUNT</th>
                                                        <th className="font-weight-bold">STATUS</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dataArray && dataArray.length > 0 && dataArray.map((option, index) => {
                                                        let serial_num = ((10 * (pagesCount - 1)) + index + 1);
                                                        const { customer_id, created_at,amount, mobile_number, status, company_name, first_name } = option;
                                                        return (
                                                            <tr key={customer_id} >

                                                                <td><span className="font-weight-normal1">{serial_num}</span></td>
                                                                <td><span className="font-weight-normal1"><Moment format="YYYY-MM-DD h:MM A">{created_at}</Moment></span></td>
                                                                <td><span className="font-weight-normal1">{first_name}</span></td>
                                                                <td><span className="font-weight-normal1">{amount}</span></td>
                                                                <td><span className="font-weight-normal1">{status}</span></td>
                                                                <td>
                                                                    <button className='btn btn-primary'>Pay</button>
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
export default DuesList;
