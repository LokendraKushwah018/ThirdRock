import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import PaginationComponent from '../../../PaginationComponent';

import Moment from 'react-moment';

const Roles = (props) => {
    const [loading, setloading] = useState(false);
    const [pagesCount, setpagesCount] = useState(0);
    const [dataArray, setDataArray] = useState([]);
    const [detail, setDetail] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getList();
    }, [])

    const getList = (page = 1) => {
        setloading(true)
        props.api.getApi('dsa/getProfileList', { page: page - 1, size: 10 }).then(response => {
            setDataArray(response.data.record);
            setpagesCount(response.data.totalItems + 1)
            setloading(false)
        }).catch(error => {
            setloading(false)
            props.toast.error(error.message);
        });
    }

    // const getDetail = (file_id) => {
    //     setloading(true)
    //     props.api.postApi('admin/casesDetail',{file_id:file_id}).then(response => {
    //         setDetail(response.data);
    //         setloading(false)
    //     }).catch(error => {  
    //         setloading(false)
    //         props.toast.error(error.message);
    //     }); 
    // }  


    return (
        <>
            <div className="main-container container-fluid px-0">
                <div className="page-header">
                    <div className="page-leftheader">
                        <h4 className="page-title mb-0 text-primary">Profile Detail</h4>
                    </div>
                    <div className="page-rightheader">
                        <div className="btn-list">
                            <Link to={props.prefix + '/add_role'} className="btn btn-outline-primary"><i className="fa fa-plus me-2"></i> Add Profile</Link>
                            {/* <Link to={props.prefix+'/user'} className="btn btn-primary btn-pill"><i className="fa fa-users me-2"></i> Users</Link>  */}
                        </div>

                    </div>
                </div>


                <div className="row">
                    {dataArray.length > 0 && dataArray.map((option, index) => (

                        <div className="col-xl-4 col-md-12 col-lg-12" key={index} >
                            <div className="card  mb-3">
                                <div className="card-body">
                                    <div className="media mt-0">
                                        <div className="media-body time-title1 ">
                                            <h5 className="time-title p-0 mb-0 font-weight-semibold leading-normal">{option.title}</h5>
                                        </div>
                                        <Link to={props.prefix + '/edit_role/' + option.id} className="btn btn-primary d-none d-sm-block me-2"><i className="fa fa-edit"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>



                <div className="row">
                    {pagesCount > 0 && dataArray.length > 0 ?
                        <>
                            <div className="col-md-12">
                                <div className="card-body">
                                    <PaginationComponent className="justify-content-center"
                                        totalItems={pagesCount}
                                        pageSize={20}
                                        maxPaginationNumbers={3}
                                        onSelect={(e) => getList(e)}
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
                                <div className="col-sm-12 col-md-6 col-xl-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <p className=" mb-1 text-muted fs-14">Total Cases</p>
                                            <h2 className="mb-0 font-weight-bold text-success">357</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-xl-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <p className=" mb-1 text-muted fs-14">Incomplete Cases</p>
                                            <h2 className="mb-0 font-weight-bold text-primary">35</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-xl-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <p className=" mb-1 text-muted fs-14">Short Close Cases</p>
                                            <h2 className="mb-0 font-weight-bold text-teal">07</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-xl-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <p className=" mb-1 text-muted fs-14">Received Cases</p>
                                            <h2 className="mb-0 font-weight-bold text-success">03</h2>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-6 col-xl-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <p className=" mb-1 text-muted fs-14">Assigned Cases</p>
                                            <h2 className="mb-0 font-weight-bold text-teal">00</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-xl-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <p className=" mb-1 text-muted fs-14">Logged Cases</p>
                                            <h2 className="mb-0 font-weight-bold text-danger">15</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-xl-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <p className=" mb-1 text-muted fs-14">Pending Cases</p>
                                            <h2 className="mb-0 font-weight-bold text-warning">107</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-xl-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <p className=" mb-1 text-muted fs-14">Approved Cases</p>
                                            <h2 className="mb-0 font-weight-bold text-success">67</h2>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-6 col-xl-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <p className=" mb-1 text-muted fs-14">Rejected Cases</p>
                                            <h2 className="mb-0 font-weight-bold text-danger">15</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-xl-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <p className=" mb-1 text-muted fs-14">Disbursed Cases</p>
                                            <h2 className="mb-0 font-weight-bold text-primary">17</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-xl-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <p className=" mb-1 text-muted fs-14">Disbursed Amount</p>
                                            <h2 className="mb-0 font-weight-bold text-primary">₹ 67589.00</h2>
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
                                                    <div className="main-img-user brround"> <img alt="" src="/assets/img/1024-size.png" className="w-100 h-100 br-7" />
                                                        <Link to=""><i className="fa fa-camera"></i></Link> </div>
                                                    <div className="media-body text-white">
                                                        <h4 className="text-white">Company Name: SMT PVT LTD</h4>
                                                        <p className="mb-1">Trade Name: Fintranxect</p>
                                                        <p className="">Person Name: Ritesh</p>
                                                    </div>
                                                </div>
                                                <div className="main-contact-action"> <Link to="" className="btn btn-primary"> Edit</Link></div>
                                            </div>
                                            <div className="main-contact-info-body">
                                                <div className="media-list p-0">
                                                    <div className="media py-4 mt-0">
                                                        <div className="media-body">
                                                            <div className="d-flex">
                                                                <div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa fa-phone"></i> </div>
                                                                <div className="w-70"> <label>Phone</label> <span className="font-weight-normal1 fs-14">+91 981107114600</span> </div>
                                                            </div>
                                                            <div className="d-flex">
                                                                <div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa fa-envelope"></i> </div>
                                                                <div className="w-70"> <label>Email</label> <span className="font-weight-normal1 fs-14">ritesh@fintranxect.com</span> </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="media py-4 border-top mt-0">
                                                        <div className="media-body">
                                                            <div className="d-flex">
                                                                <div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa-solid fa-globe fa-fw"></i> </div>
                                                                <div className="w-70"> <label>Website:</label> <span className="font-weight-normal1 fs-14">www.smtlabs.com</span> </div>
                                                            </div>
                                                            <div className="d-flex">
                                                                <div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa-regular fa-address-card fa-fw"></i> </div>
                                                                <div className="w-70"> <label>Pan/GST no:</label> <span className="font-weight-normal1 fs-14">CDDPK4564S</span> </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="media py-4 border-top mt-0">
                                                        <div className="media-body">
                                                            <div className="d-flex">
                                                                <div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa fa-map-marker"></i> </div>
                                                                <div className="w-70"> <label>Address:</label> <span className="font-weight-normal1 fs-14">012 San Francisco, California 13245</span> </div>
                                                            </div>
                                                            <div className="d-flex">
                                                                <div className="media-icon bg-primary-transparent border-primary me-3 mt-1"> <i className="fa-solid fa-globe fa-fw"></i> </div>
                                                                <div className="w-70"> <label>Public Url:</label> <Link className="font-weight-normal1 fs-14" to="">https://staging.finitt.com/riteshnain/loan</Link> </div>
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
export default Roles;