import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { GetLimit, ManageEmployeeLimit } from '../service/lenderService';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Moment from 'react-moment';


const EmployeeSetLimit = () => {

    const lender = JSON.parse(localStorage.getItem("lender"));
    const [dataArray, setDataArray] = useState([]);
    const [open, setOpen] = useState(false);
    const [openDec, setopenDec] = useState(false);
    const [openInc, setopenInc] = useState(false);
    const [limit, setLimit] = useState("");
    const [totalLimit, setTotalLimit] = useState("");
    const navigate = useNavigate();
    const tableRef = useRef(null);

    const { id, status } = useParams();

    const form = useFormik({
        initialValues: {
            limit: "",
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            limit: yup.number().required('Please enter limit'),
        }),
        onSubmit: async values => {
            const response = await ManageEmployeeLimit(lender.lender_token, JSON.stringify({
                customer_id: id,
                lender_id: lender.user_id,
                amount: values.limit,
                txn_type: "credit"
            }));

            if (response.status == true) {
                toast.success(response.message);
                setLimit("")
                setOpen(false)
                setopenInc(false)
                setopenDec(false)
                getLimit(lender.lender_token, id)
            } else {
                toast.error(response.message);
            }
        }
    });

    const debitform = useFormik({
        initialValues: {
            limit: "",
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            limit: yup.number().required('Please enter limit'),
        }),
        onSubmit: async values => {
            const response = await ManageEmployeeLimit(lender.lender_token, JSON.stringify({
                customer_id: id,
                lender_id: lender.user_id,
                amount: values.limit,
                txn_type: "debit"
            }));

            if (response.status == true) {
                toast.success(response.message);
                setLimit("")
                setOpen(false)
                setopenInc(false)
                setopenDec(false)
                getLimit(lender.lender_token, id)
            } else {
                toast.error(response.message);
            }
        }
    });


    const addform = useFormik({
        initialValues: {
            limit: "",
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            limit: yup.number().required('Please enter limit'),
        }),
        onSubmit: async values => {
            const response = await ManageEmployeeLimit(lender.lender_token, JSON.stringify({
                customer_id: id,
                lender_id: lender.user_id,
                amount: values.limit,
                txn_type: "credit"
            }));

            if (response.status == true) {
                toast.success(response.message);
                setLimit("")
                setOpen(false)
                setopenInc(false)
                setopenDec(false)
                getLimit(lender.lender_token, id)
            } else {
                toast.error(response.message);
            }
        }
    });

    const getLimit = async (token, id) => {
        const response = await GetLimit(token, id);
        console.log("🚀 ~ file: EmployeeSetLimit.js:81 ~ getLimit ~ response:", response)
        if (response.status == true) {
            // toast.success(response.message);
            debitform.resetForm();
            form.resetForm();
            setDataArray(response.data);
            setTotalLimit(response.totle_limit)
        } else {
            // toast.error(response.message);
            console.log("🚀 ~ file: EmployeeSetLimit.js:89 ~ getLimit ~ response.message:", response.message)
        }
    }

    useEffect(() => {
        getLimit(lender.lender_token, id)
    }, [id]);

 

    return (
        <>
            <div className="main-container container-fluid px-0">
                <div className="page-header mb-3">
                    <div className="page-leftheader">
                        <h4 className="page-title mb-0 text-primary">Manage Limit</h4>
                    </div>
                    <div className="page-rightheader">
                        <h4 className="page-title mb-0 text-primary">Total Balance : {totalLimit} </h4>
                    </div>
                </div>
                {status == 'Unassigned' ?
                    <div className="my-5">
                        <button type="button" onClick={() => setOpen(true)} className="btn btn-primary ms-5 me-3"> Add </button>
                    </div>
                    :
                    <div className="my-5">
                        <button type="button" onClick={() => setOpen(true)} className="btn btn-primary ms-5 me-3"> Increase </button>
                        <button type="button" onClick={() => setopenDec(true)} className="btn btn-primary ms-5 "> Decrease </button>
                    </div>
                }


                {/* <h6>Employee Limit</h6>
                <div className="main-contact-info-header bg-contacthead">
                    <div className="media">
                        <div className="media-body text-white">
                            <h4 className="text-white pt-1">Total Limit : {'Abhi'}</h4>
                        </div>
                    </div>
                    <div className="main-contact-action">
                        <button type="button" onClick={() => setOpen(true)} className="btn btn-primary me-3"> Increase </button>
                        <button type="button" onClick={() => setopenDec(true)} className="btn btn-primary"> Decrease </button>
                    </div>
                </div> */}


                <div className="row">
                    <div className="col-sm-12 col-lg-12">
                        <div className="card">
                            <div className="card-header br-0">
                                <h3 className="card-title">history</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {dataArray.length > 0 ? <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table table-hover card-table table-vcenter text-nowrap" ref={tableRef}>
                                        <thead className="border-bottom-0 pt-3 pb-3">
                                            <tr>
                                                <th className="font-weight-bold">#</th>
                                                <th className="font-weight-bold">Transaction Type</th>
                                                <th className="font-weight-bold">Amount</th>
                                                <th className="font-weight-bold">Created At</th>
                                                <th className="font-weight-bold">Updated At</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataArray.length > 0 && dataArray.map((option, index) => {
                                                // let serial_num = ((5 * (pagesCount - 1)) + index + 1);
                                                return (
                                                    <tr key={option.user_id} >
                                                        <td><span className="font-weight-normal1">{index + 1}</span></td>
                                                        <td><span className="font-weight-normal1">{option.txn_type}</span></td>
                                                        <td><span className={option.txn_type == "credit" ? "text-success font-weight-normal1" : "text-danger font-weight-normal1"}>{option.amount}</span></td>
                                                        <td><span className="font-weight-normal1"><Moment format="YYYY-MM-DD h:MM A">{option.created_at}</Moment></span></td>
                                                        <td><span className="font-weight-normal1"><Moment format="YYYY-MM-DD h:MM A">{option.updated_at}</Moment></span></td>

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

                    {/* {pagesCount > 0 && dataArray.length > 0 ?
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
                                : ''} */}

                </div> :
                    <p>History not available</p>
                }

            </div>


            <Modal show={openInc} onHide={() => setopenInc(false)}>
                <Modal.Header>
                    <Modal.Title>Increase Limit</Modal.Title>
                    <i className="fa fa-close" style={{ cursor: "pointer" }} onClick={() => setopenInc(false)}></i>
                </Modal.Header>
                <Modal.Body>
                    <form action='' onSubmit={form.handleSubmit}>
                        <div className="formbox row">
                            <div className="form-group form-group-mtb col-md-12">
                                <input type="number" name='limit' {...form.getFieldProps("limit")} min={2} placeholder="Enter Limit" className="form-control" />
                                {form.touched.limit && form.errors.limit ?
                                    <div className="invalid-feedback" style={{ display: "block" }}>{form.errors.limit}</div> : ''}
                            </div>
                            <div className="col-md-12 mt-2">
                                <button type="submit" className="btn btn-primary">Set Limit</button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>


            <Modal show={openDec} onHide={() => setopenDec(false)}>
                <Modal.Header>
                    <Modal.Title>Decrease Limit</Modal.Title>
                    <i className="fa fa-close" style={{ cursor: "pointer" }} onClick={() => setopenDec(false)}></i>
                </Modal.Header>
                <Modal.Body>
                    <form action='' onSubmit={debitform.handleSubmit}>
                        <div className="formbox row">
                            <div className="form-group form-group-mtb col-md-12">
                                <input type="number" name='limit' {...debitform.getFieldProps("limit")} min={2} placeholder="Enter Limit" className="form-control" />
                                {debitform.touched.limit && debitform.errors.limit ?
                                    <div className="invalid-feedback" style={{ display: "block" }}>{debitform.errors.limit}</div> : ''}
                            </div>
                            <div className="col-md-12 mt-2">
                                <button type="submit" className="btn btn-primary">Set Limit</button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>

            </Modal>

            <Modal show={open} onHide={() => setOpen(false)}>
                <Modal.Header>
                    <Modal.Title>Decrease Limit</Modal.Title>
                    <i className="fa fa-close" style={{ cursor: "pointer" }} onClick={() => setOpen(false)}></i>
                </Modal.Header>
                <Modal.Body>
                    <form action='' onSubmit={addform.handleSubmit}>
                        <div className="formbox row">
                            <div className="form-group form-group-mtb col-md-12">
                                <input type="number" name='limit' {...addform.getFieldProps("limit")} min={2} placeholder="Enter Limit" className="form-control" />
                                {addform.touched.limit && addform.errors.limit ?
                                    <div className="invalid-feedback" style={{ display: "block" }}>{addform.errors.limit}</div> : ''}
                            </div>
                            <div className="col-md-12 mt-2">
                                <button type="submit" className="btn btn-primary">Set Limit</button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default EmployeeSetLimit;