import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import PaginationComponent from '../../PaginationComponent';
import { DeleteEmployees, GetEmployees } from '../service/employService'
import { toast } from 'react-hot-toast';
import Modal from '../user/Model';


const Employee = (props) => {

    const prefix = process.env.REACT_APP_EMPLOYER_PRIFIX;

    const [employee, setEmployee] = useState([]);
    const [pagesCount, setpagesCount] = useState(1);
    const [tolatPagesCount, setTotalPagesCount] = useState("");
    const [dataArray, setDataArray] = useState([]);
    const [search, setSearch] = useState('');
    const [dsaDetail, setdsaDetail] = useState('');
    const [deleteId, setdeleteId] = useState('');
   

    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);

    const handleShow = (customer_id) => {

        console.log('inside show');
        setShow(true);
        setdeleteId(customer_id)
    };


    const employer = JSON.parse(localStorage.getItem("employer"));
    const employerId = employer.user_id;

    const getEmployeesData = async (token, pageNumber, pageSize, filterVlu) => {
        const response = await GetEmployees(token, pageNumber, pageSize, filterVlu,employerId);
        console.log("🚀 ~ file: epmloyer.js:25 ~ getEmployeesData ~ response:", response)
        if (response.status == true) {
            setEmployee(response.data);
            setDataArray(response.data);
            // setTotalPagesCount(response.data["count"])
        } else {
            console.log("get employees data response", response);
        }
    }

    const deleteEmployees = async (id) => {
        console.log('inside delete');
        // let raw = JSON.stringify({ id });
        const res = await DeleteEmployees(employer.employer_token, deleteId);
        console.log('res',res);
        if (res.status) {
            toast.success(res.message);
            getEmployeesData();
        } else {
            toast.error(res.message);
            console.log(res);
        }
    }

    const getEmployeeDetail = (user_id) => {
        // setloading(true)
        // props.api.postApi('admin/dsaDetail',{user_id:user_id}).then(response => {
        //     setDsaDetail(response.data);
        //     setloading(false)
        // }).catch(error => {  
        //     setloading(false)
        //     props.toast.error(error.message);
        // }); 
    }

    const getCasses = (user_id) => {
        // setloading(true)
        // props.api.postApi('admin/dsaDetail',{user_id:user_id}).then(response => {
        //     setDsaDetail(response.data);
        //     setloading(false)
        // }).catch(error => {  
        //     setloading(false)
        //     props.toast.error(error.message);
        // }); 
    }

    const hideModel = (e) => {
        // console.log('e.userDetail.user_id',e.userDetail.user_id);
        // navigate(props.prefix + '/edit_dsa/' + e.userDetail.user_id)
    }

    window.onload = () => {

    }

    useEffect(() => {
        setpagesCount(1);
        getEmployeesData(employer.employer_token, pagesCount, 5, search);
    }, [pagesCount, search]);

    return (
        <>
            <div className="main-container container-fluid px-0">
                <div className="page-header my-3 py-5">
                    <div className="page-leftheader">
                        <h4 className="page-title mb-0 text-primary">Employee Details</h4>
                    </div>
                    <div className="page-rightheader">
                        <div className="btn-list">
                            <Link to={prefix + "/add_employer"} className="btn btn-outline-primary mt-2" ><i className="fa fa-plus me-2"></i> Add Employee</Link>
                        </div>
                    </div>
                </div>
                {/* <Modal show={show} handleClose={handleClose} deleteEmployees={deleteEmployees} id={deleteId} /> */}
                <div className="row">
                    <div className="col-sm-12 col-lg-12">
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
                </div>

                <div className="row">
                    <div className="col-sm-12 col-lg-12">
                        <div className="card">
                            <div className="card-header br-0">
                                <h3 className="card-title"> EMPLOYEE REPORT</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    employee ?
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-body p-0">
                                        <div className="table-responsive">
                                            <table className="table table-hover card-table table-vcenter text-nowrap">
                                                <thead className="border-bottom-0 pt-3 pb-3">
                                                    <tr>
                                                        <th className="font-weight-bold">SERIAL NO.</th>
                                                        <th className="font-weight-bold">COUNTRY NAME</th>
                                                        <th className="font-weight-bold">MOBILE NO.</th>
                                                        <th className="font-weight-bold">ACTION</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        employee.map((e, i) => {
                                                            const { id, customer_id, country_name, mobile_number, name, Email, Mobile, Working_since_date, Salary, House, Gender, Age, Role, Location, Home_address_permanent, Home_address_communication } = e;
                                                            let serial_num = ((5 * (pagesCount - 1)) + i + 1);
                                                            return (
                                                                <tr key={customer_id}>
                                                                    <td>{serial_num}</td>
                                                                    <td>{name}</td>
                                                                    <td>{mobile_number}</td>
                                                                    <td>
                                                                        <Dropdown>
                                                                            <Dropdown.Toggle className='view-pro' id="dropdown-basic">
                                                                                ACTION
                                                                            </Dropdown.Toggle>

                                                                            <Dropdown.Menu>
                                                                                {/* <Dropdown.Item>
                                                                                    <Link to={`${prefix}/employee_detail/${customer_id}`}>View</Link>
                                                                                </Dropdown.Item> */}
                                                                                {/* <Dropdown.Item>
                                                                                    <Link to={`${prefix}/employee_edit/${customer_id}`}>Edit</Link>
                                                                                </Dropdown.Item> */}
                                                                                {/* <Dropdown.Item onClick={() => handleShow(customer_id)} data-bs-target="#applicaiton-report" data-bs-toggle="modal" >Delete</Dropdown.Item> */}
                                                                                <Dropdown.Item data-bs-target="#applicaiton-report" data-bs-toggle="modal" onClick={() => handleShow(customer_id)}>Delete</Dropdown.Item>
                                                                            </Dropdown.Menu>
                                                                        </Dropdown>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
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
                                                totalItems={tolatPagesCount}
                                                pageSize={5}
                                                maxPaginationNumbers={3}
                                                onSelect={(e) => setpagesCount(e)}
                                            />
                                        </div>
                                    </div>
                                </>
                                : ''}

                        </div>
                        : <div className='row pt-5 mt-5 align-items-center text-center'>
                            <span className='col'>Loading...</span>
                        </div>
                }

            </div>
            <div className="modal fade effect-fall show" id="applicaiton-report" aria-modal="true" role="dialog">
                <div className="modal-dialog modal-sm" role="document">
                    <div className="modal-content modal-content-demo">
                        <div className="modal-header"> <h6 className="modal-title">Delete Employee</h6>
                            <button aria-label="Close" className="btn-close" data-bs-dismiss="modal" type="button"><span aria-hidden="true">×</span></button> </div>

                        <div className="modal-body application-modal">

                            <div className="row ">
                                <div className="col-lg-12 col-xl-12 ">
                                    <div className="">
                                        <div className="main-content-body main-content-body-contacts">
                                            
                                            <div className="main-contact-info-body">
                                                <div className="media-list p-0">
                                                    <div>
                                                        <div className="media py-4 mt-0 d-flex justify-content-center">
                                                            <div className="media-body ">
                                                                <div className="d-flex justify-content-center">
                                                                    <div className="w-70"><span className="font-weight-normal1 fs-14">Do you want to delete this employee?</span> </div>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className="media py-4 border-top mt-0">
                                                        <div className="media-body">
                                                            {/* <div className="d-flex">
                                                                <button className='btn btn-primary'>cancel</button>
                                                            </div> */}
                                                            <div className="d-flex">
                                                                <button className='btn btn-primary' onClick={deleteEmployees} >Delete </button>
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

export default Employee