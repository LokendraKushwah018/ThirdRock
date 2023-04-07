import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GetEmployerDetail } from '../service/adminService';

const EmployeeDetail = (props) => {

    const [employeeDetail, setEmployeeDetail] = useState({});
    console.log("🚀 ~ file: EmployerDetail.js:8 ~ EmployeeDetail ~ employeeDetail:", employeeDetail)
    const prefix = process.env.REACT_APP_LENDER_PRIFIX;
    const { id } = useParams();
    // const { Name, Email, Mobile, Working_since_date, Salary, House, Gender, Age, Role, Location, Home_address_permanent, Home_address_communication } = employeeDetail;
    const { company_name,full_name,mobile_number,email,age,website,address,gst_number } = employeeDetail;
    const admin = JSON.parse(localStorage.getItem("admin"));


    const getEmployeesData = async (token, id) => {
        const response = await GetEmployerDetail(token, id);
        if (response.status == true) {
            setEmployeeDetail(response.data);
        } else {
            console.log("get employees data response", response);
        }
    }

    useEffect(() => {
        getEmployeesData(admin.admin_token, id);
    }, [id]);


    const getEmployeeDetail = (user_id) => {
        // setloading(true)
        // props.api.postApi('admin/employeeDetail',{user_id:user_id}).then(response => {
        //     setemployeeDetail(response.data);
        //     setloading(false)
        // }).catch(error => {  
        //     setloading(false)
        //     props.toast.error(error.message);
        // }); 
    }
    const getCasses = (user_id) => {
        // setloading(true)
        // props.api.postApi('admin/employeeDetail',{user_id:user_id}).then(response => {
        //     setemployeeDetail(response.data);
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





    return (
        <>
            <div className="main-container container-fluid px-0">
                <div className="page-header my-3 py-5">
                    <div className="modal-header w-100">
                        <h3 className="modal-title">Employer Detail</h3>
                    </div>

                    <div className="modal-body application-modal">
                        {/* <div className="row">
                            <div className="col-sm-12 col-md-6 col-xl-3">
                                <div className="card">
                                    <div className="card-body">
                                        <p className=" mb-1 text-muted fs-14">Total Cases</p>
                                        <h2 className="mb-0 font-weight-bold text-success">{0}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-xl-3">
                                <div className="card">
                                    <div className="card-body">
                                        <p className=" mb-1 text-muted fs-14">Incomplete Cases</p>
                                        <h2 className="mb-0 font-weight-bold text-primary">{0}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-xl-3">
                                <div className="card">
                                    <div className="card-body">
                                        <p className=" mb-1 text-muted fs-14">Short Close Cases</p>
                                        <h2 className="mb-0 font-weight-bold text-teal">{0}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-xl-3"> 
                            <div className="card"> 
                            <div className="card-body"> 				
                                <p className=" mb-1 text-muted fs-14">Received Cases</p>
                                <h2 className="mb-0 font-weight-bold text-success">{employeeDetail? getCasses('RECEIVED') : 0}</h2> 
                            </div> 
                            </div> 
                        </div>

                            <div className="col-sm-12 col-md-6 col-xl-3">
                                <div className="card">
                                    <div className="card-body">
                                        <p className=" mb-1 text-muted fs-14">Assigned Cases</p>
                                        <h2 className="mb-0 font-weight-bold text-teal">{0}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-xl-3">
                                <div className="card">
                                    <div className="card-body">
                                        <p className=" mb-1 text-muted fs-14">Logged Cases</p>
                                        <h2 className="mb-0 font-weight-bold text-danger">{0}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-xl-3">
                                <div className="card">
                                    <div className="card-body">
                                        <p className=" mb-1 text-muted fs-14">Pending Cases</p>
                                        <h2 className="mb-0 font-weight-bold text-warning">{0}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-xl-3">
                                <div className="card">
                                    <div className="card-body">
                                        <p className=" mb-1 text-muted fs-14">Approved Cases</p>
                                        <h2 className="mb-0 font-weight-bold text-success">{0}</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-6 col-xl-3">
                                <div className="card">
                                    <div className="card-body">
                                        <p className=" mb-1 text-muted fs-14">Rejected Cases</p>
                                        <h2 className="mb-0 font-weight-bold text-danger">{0}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-xl-3">
                                <div className="card">
                                    <div className="card-body">
                                        <p className=" mb-1 text-muted fs-14">Disbursed Cases</p>
                                        <h2 className="mb-0 font-weight-bold text-primary">{0}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-xl-3">
                                <div className="card">
                                    <div className="card-body">
                                        <p className=" mb-1 text-muted fs-14">Disbursed Amount</p>
                                        <h2 className="mb-0 font-weight-bold text-primary">₹ {0}</h2>
                                    </div>
                                </div>
                            </div>

                        </div> */}


                        <div className="row">
                            <div className="col-lg-12 col-xl-12">
                                <div className="">
                                    <div className="main-content-body main-content-body-contacts">
                                        <h6>Employer Information</h6>
                                        <div className="main-contact-info-header bg-contacthead">
                                            <div className="media">
                                                {/* <div className="main-img-user brround"> <img alt="" src={'https://res.cloudinary.com/people-matters/image/upload/fl_immutable_cache,w_624,h_351,q_auto,f_auto/v1663579184/1663579182.jpg'} className="w-100 h-100 br-7" />
                                                    <Link to=""><i className="fa fa-camera"></i></Link> </div> */}
                                                <div className="media-body text-white">
                                                    <h4 className="text-white mb-4">Employer Name: {full_name}</h4>
                                                    <p className="mb-1">Company Name : {company_name}</p>
                                                    <p className="">Mobile no  : {mobile_number}</p>
                                                </div>
                                            </div>
                                            {/* <div className="main-contact-action"><Link className='btn btn-primary' to={prefix + `/employee_edit/${id}`}>Edit</Link></div> */}
                                        </div>
                                        <div className="main-contact-info-body">
                                            <div className="media-list p-0">

                                                <div className="media py-4 mt-0">
                                                    <div className="media-body">
                                                        {/* <div className="d-flex">
                                                            <div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa fa-phone"></i> </div>
                                                            <div className="w-70"> <label>Mobile no :</label> <span className="font-weight-normal1 fs-14">{employeeDetail ? mobile_number : ''}</span> </div>
                                                        </div> */}
                                                        <div className="d-flex">
                                                            <div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa fa-envelope"></i> </div>
                                                            <div className="w-70"> <label>Email :</label> <span className="font-weight-normal1 fs-14">{employeeDetail ? email : ''}</span> </div>
                                                        </div>
                                                        <div className="d-flex">
                                                            <div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa fa-map-marker"></i> </div>
                                                            <div className="w-70"> <label>Location :</label> <span className="font-weight-normal1 fs-14">{employeeDetail ? address : ''}</span> </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* <div className="media py-4 border-top mt-0">
                                                    <div className="media-body">
                                                        <div className="d-flex">
                                                            <div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa-solid fa-male fa-fw"></i> </div>
                                                            <div className="w-70"> <label>Age :</label> <span className="font-weight-normal1 fs-14">{employeeDetail ? age : ''}</span> </div>
                                                        </div>
                                                        <div className="d-flex">
                                                            <div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa-regular fa-address-card fa-fw"></i> </div>
                                                            <div className="w-70"> <label>Salary :</label> <span className="font-weight-normal1 fs-14">{employeeDetail ? "Salary" : ''}</span> </div>
                                                        </div>
                                                    </div>
                                                </div> */}

                                                <div className="media py-4 border-top mt-0">
                                                    <div className="media-body">
                                                        <div className="d-flex">
                                                            <div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa fa-map-marker"></i> </div>
                                                            <div className="w-70"> <label>Gst No. :</label> <span className="font-weight-normal1 fs-14">{employeeDetail ? gst_number : ''}</span> </div>
                                                        </div>
                                                        <div className="d-flex">
                                                            <div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa-solid fa-globe fa-fw" /> </div>
                                                            <div className="w-70"> <label>Website :</label> <span className="font-weight-normal1 fs-14">{employeeDetail ? website : ''}</span> </div>
                                                        </div>
                                                        {/* <div className="d-flex">
                                                            <div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa-solid fa-home fa-fw"></i> </div>
                                                            <div className="w-70">
                                                                <label>House :</label>
                                                                <span className="font-weight-normal1 fs-14">{employeeDetail ? "House" : ''}</span>
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                </div>

                                                {/* <div className="media py-4 border-top mt-0">
                                                    <div className="media-body">
                                                        <div className="d-flex">
                                                            <div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa fa-calendar"></i> </div>
                                                            <div className="w-70"> <label>Working Since Date :</label> <span className="font-weight-normal1 fs-14">{employeeDetail ? Working_since_date : ''}</span> </div>
                                                        </div>
                                                        <div className="d-flex">
                                                            <div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa fa-address-card"></i></div>
                                                            <div className="w-70">
                                                                <label>Permanent Home Address :</label>
                                                                <span className="font-weight-normal1 fs-14">{employeeDetail ? Home_address_permanent : ''}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> */}

                                                {/* <div className="media py-4 border-top mt-0">
                                                    <div className="media-body">
                                                        <div className="d-flex">
                                                            <div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa fa-location-arrow"></i> </div>
                                                            <div className="w-70"> <label>Communication Address :</label> <span className="font-weight-normal1 fs-14">{employeeDetail ? Home_address_communication : ''}</span> </div>
                                                        </div>
                                                    </div>
                                                </div> */}

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

export default EmployeeDetail