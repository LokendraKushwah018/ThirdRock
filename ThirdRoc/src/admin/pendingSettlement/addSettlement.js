import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRef } from 'react';
import { GetAllTransactionsByMerchantId, AddSettlement } from '../service/adminService';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Moment from 'react-moment';
import Config from '../../config.json';
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import $ from 'jquery'
import { Modal } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';



const prefix = process.env.REACT_APP_ADMIN_PRIFIX;
const AddSettle = () => {
  const tableRef = useRef(null);
  const merchant = JSON.parse(localStorage.getItem("admin"));
  const [data, setData] = useState([])
  const [merchantData, setMerchantData] = useState([])
  const [settlements, setSettlements] = useState([])
  const [search, setSearch] = useState('');
  const [pagesCount, setpagesCount] = useState(1);
  const [copied, setCopied] = useState(false);
  const [value, setValue] = useState('');
  const { id } = useParams('');
  const [transactionPrimaryId, setTransactionPrimaryId] = useState([]);
  const [transactionAmount, setTransactionAmount] = useState([]);
  const [merchantId, setMerchantId] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [adminId, setAdminId] = useState('');
  const [addsettlementkey , setAddsettlementkey] = useState(false)
  // const [settlementmodel , setSettlementmodel] = useState(false)
  // const [modalclose , setModalclose] = useState(false)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // const getAllPendingSettlement = async (token) => {
  //     const response = await GetAllPendingSettlement(token, '1', search);
  //     if (response.status) {
  //         setData(response.allPendingSettalment)
  //     } else {
  //         console.log(response);
  //     }
  // }

  const getAllPendingSettlement = async (token) => {
    const response = await GetAllTransactionsByMerchantId(token, '1', search, id);
    console.log(response)
    if (response.status) {
      setData(response.PendingSettalmentById)
      setMerchantData(response.merchantData)
    } else {
      console.log(response);
    }
  }

  // const addSettlements = async (data) => {
  //     console.log('data addSettlements', data);
  //     const response = await addSettlement(data);
  //     if (response.status) {
  //         setData(response.data)
  //         transction(merchant.merchant_token)
  //     } else {
  //         console.log(response);
  //     }
  // }
  const selectTransactions = (id, amount) => {
   
    setAddsettlementkey(true)
    // settlements.push(id)
    // setSettlements(settlements.idArr.push(id))
    setTransactionPrimaryId(oldArr => [...oldArr, id]);
    setTransactionAmount(oldArr => [...oldArr, amount]);
    setMerchantId(merchantData.user_id);
    // setPaymentMode('');
    setAdminId(merchant.user_id);
//  getAllPendingSettlement()
  }

  useEffect(() => {
    console.log('transactionPrimaryId', transactionPrimaryId, 'transactionAmount', transactionAmount, 'merchantId', merchantId, 'adminId', adminId);
  }, [transactionPrimaryId, transactionAmount, merchantId, paymentMode])

  useEffect(() => {

    getAllPendingSettlement(merchant.admin_token)

  }, [search])

  const selectSettlement = (id) => {
    // settlements.push(id)
    // setSettlements(settlements.idArr.push(id))
    setSettlements(oldArr => [...oldArr, id]);

  }

  const addSettlementForm = useFormik({
    initialValues: {
      amount: transactionAmount,
      primary_key: transactionPrimaryId,
      merchant_id: merchantId,
      admin_id: adminId,
      payment_mode: '',
      comment: "",
      wrong_message: ""
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      comment: yup.string().required('Please add a comment'),
      payment_mode: yup.string().required('Please add a payment mode '),
    }),
    onSubmit: values => {
      const merchantData = {...values}
      merchantData.merchantTransctionId = merchantData.primary_key
      let data = JSON.stringify(merchantData)
      console.log('data', data);
      AddSettlement(data).then((res) => {
        console.log('res', res);
        handleClose()
        // setModalclose(false)
        
        // if(res.status == true){
        //    myModal.hide()
        //    $('#modal').modal('hide');
        // }
       
        

        // if(res.status == true){
        //    setSettlementmodel(true)
        //    console.log("yessssssss")
        // }
       
       
        
        // if (response.status) {

        // } else {
        //     console.log("get employees data response", response);
        // }
      }).catch((err) => { })


    }
  });


// var myModalEl = document.querySelector('#modalclose');
// var myModal = bootstrap.Modal.getOrCreateInstance(myModalEl);
// myModal.hide();

  return (
    <>
      <div className="main-container container-fluid px-0">
        <div className="page-header mb-3">
          <div className="page-leftheader">
            <h4 className="page-title mb-0 text-primary">Merchant Name: <span className=''>{merchantData.company_name}</span>  </h4>
            <img className='ms-5' style={{ width: 80, height: 80, borderRadius: '8px' }} src={process.env.PUBLIC_URL + '/assets/img/defaultMerchant.png'}
            /* src={Config.s3_url + 'merchant-logo-' + merchantData.logo} */ />
          </div>
          <div className='page-rightheader'>
            {addsettlementkey ? <button className='btn btn-primary' /* data-bs-target="#add_settlement" data-bs-toggle="modal"  onClick={() => setModalclose(true)} */ 
           onClick={handleShow} >+ Add Settlement</button>
            :           
            <button className='btn btn-default '>+ Add Settlement</button>
            }
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
                        <th></th>
                        <th className="font-weight-bold">Sr No.</th>
                        <th className="font-weight-bold">Name</th>
                        <th className="font-weight-bold">Amount</th>
                        <th className="font-weight-bold">TXN ID</th>
                        {/* <th className="font-weight-bold">TITLE</th> */}
                        <th className="font-weight-bold">TXN Date</th>
                        {/* <th className="font-weight-bold">STATUS</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {data && data.map((option, index) => (
                        <tr key={index} >
                          <td><input type="checkbox" name="id" value={option.id} onClick={() => selectTransactions(option.id, option.paid_amount)} /></td>

                          <td><span className="font-weight-normal1">{index + 1}</span></td>
                          <td><span className="font-weight-normal1">{merchantData.company_name}</span></td>
                          <td><span className="font-weight-normal1">{option.paid_amount}</span>
                          </td>
                          <td><span className="font-weight-normal1">{option.txn_id}</span>
                            <span>
                              <CopyToClipboard text={option.txn_id} onCopy={() => setCopied(true)}>
                                <button className='btn btn-primary btn-sm ms-3'><i class="fa-solid fa-copy"></i></button>
                              </CopyToClipboard>
                            </span>
                          </td>
                          {/* <td><span className="font-weight-normal1">{option.title}</span></td> */}
                          <td><span className="font-weight-normal1"><Moment format="YYYY-MM-DD h:MM A">{option.created_at}</Moment></span></td>
                          {/* <td><span className="font-weight-normal1">{option.status}</span></td> */}
                          {/* <td><span className="font-weight-normal1">
                            <Link to={prefix + '/addSettle/' + option.merchant_id} className='btn btn-primary btn-md ms-3'>Settle</Link>

                          </span>  </td> */}
                        </tr>
                      ))}
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
                                                totalItems={pagesCount}
                                                pageSize={10}
                                                maxPaginationNumbers={3}
                                                onSelect={(e) => getList(e)}
                                            />
                                        </div>
                                    </div>
                                </>
                                : ''} */}

        </div>
      </div>
      {/* {modalclose == true && } */}
      <Modal show={show} onHide={handleClose}>
      {/* <div class="modal fade effect-scale show" id="add_settlement" aria-modal="true" role="dialog">
        <div class="modal-dialog" role="document"> */}
          <div class="modal-content modal-content-demo">
            {/* <div class="modal-header">
              <h3 class="modal-title">Settlement</h3>
              <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button" ><span 
                aria-hidden="true">×</span></button>
            </div> */}
             <Modal.Header     >            
          <Modal.Title>Settlement</Modal.Title>
          <button  class="btn-close"  type="button" onClick={handleClose} ><span 
                aria-hidden="true">×</span></button>
          {/* <div className=" ">
      <CloseButton variant="black" />
    </div> */}
        </Modal.Header>

            {/* <div class="modal-body application-modal"> */}
              <form className="mt-5 row" onSubmit={addSettlementForm.handleSubmit} >
                {addSettlementForm.values.wrong_message ?
                  <div className="invalid-feedback mb-3" style={{ display: "block", textAlign: "center" }}>{addSettlementForm.values.wrong_message}</div>
                  : ''}
                <div class="row">
                  <div class="row g-xs">
                  <div class="col-12 m-3">
                      <select className="form-control" name="payment_mode" {...addSettlementForm.getFieldProps("payment_mode")}
                        placeholder="Enter Payment Mode"  >
                        <option value="null">Select One</option>
                        <option value="cash" >Cash</option>
                        <option value="cheque">Cheque</option>
                        <option value="bank transfer">Bank Transfer</option>
                      </select>
                      {addSettlementForm.touched.payment_mode && addSettlementForm.errors.payment_mode ?
                        <div className="invalid-feedback" style={{ display: "block" }}>{addSettlementForm.errors.payment_mode}</div> : ''}
                    </div>
                    <div class="col-12 m-3">
                      <input type="text" placeholder='comment' {...addSettlementForm.getFieldProps("comment")} class="form-control" />
                      {addSettlementForm.touched.comment && addSettlementForm.errors.comment ?
                        <div className="invalid-feedback" style={{ display: "block" }}>{addSettlementForm.errors.comment}</div> : ''}
                    </div>                    
                  </div>
                </div>
                <div class="form-footer mt-2 m-2">                             
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
             </div> 
          {/* </div>
        </div>
      </div> */}
      </Modal>

    </>
  )
}

export default AddSettle