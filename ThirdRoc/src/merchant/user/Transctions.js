import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { GetTransctions } from '../service/MerchantService';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast, { Toaster } from 'react-hot-toast';
import Moment from 'react-moment';
const Transctions = () => {
    const tableRef = useRef(null);
    const merchant = JSON.parse(localStorage.getItem("merchant"));
    const merchantUserId = merchant.user_id
    const [data, setData] = useState([])
    const [search, setSearch] = useState('');
    const [copied, setCopied] = useState(false);
    const [value, setValue] = useState('');
    const [transactions, setTransactions] = useState([]);
      
    const transction = async (token) => {
        const response = await GetTransctions(token,merchantUserId,'1',search);
        if (response.status) {
            setData(response.data)
        } else {
            console.log(response);
        }
    }

    useEffect(() => {
        transction(merchant.merchant_token)
    }, [search])

    useEffect(()=>{
        if (copied) {
            toast.success('Copied');
        }
        },[copied])

        const selectTransactions = (id) => {
            // settlements.push(id)
            // setSettlements(settlements.idArr.push(id))
            setTransactions(oldArr => [...oldArr, id]);
    
        }

        useEffect(()=>{
            console.log('transactions',transactions);
        },[transactions])

        const addSettlementByIds =()=>{
            // addSettlements(settlements)
        }
    return (
        <>
            <div className="main-container container-fluid px-0">
                <div className="page-header mb-3">
                    <div className="page-leftheader">
                        <h4 className="page-title mb-0 text-primary">Manage Transactions</h4>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12 col-lg-12">
                        <div className="card">
                            <div className="card-header br-0 d-flex justify-content-between">
                                <h3 className="card-title"> Transaction Reports</h3>
                                {/* <button to="" className="btn btn-primary mt-2" onClick={addSettlementByIds} ><i className="fa fa-plus me-2"></i>Add Settlement</button> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                    <div className="form-group">
                        <label className="form-label">Search</label>
                        <div className="row g-xs">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search By Keyword/Name/Transactions ID" value={search} onChange={(e) => setSearch(e.target.value)} />
                                <span className="input-group-append"> <button className="btn btn-primary" type="button"><i className="fa fa-search"></i></button> </span>
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
                                                {/* <th></th> */}
                                                <th className="font-weight-bold">SERAIL NO.</th>
                                                <th className="font-weight-bold">NAME</th>
                                                <th className="font-weight-bold">AMOUNT</th>
                                                <th className="font-weight-bold">TRANSACTION ID</th>
                                                {/* <th className="font-weight-bold">TITLE</th> */}
                                                <th className="font-weight-bold">DATE & TIME</th>
                                                {/* <th className="font-weight-bold">STATUS</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data && data.map((option, index) => (
                                                <tr key={index} >
                                                    {/* <td><input type="checkbox" name="id" value={option.id} onClick={() => selectTransactions(option.id)} /></td> */}

                                                    <td><span className="font-weight-normal1">{index + 1}</span></td>
                                                    <td><span className="font-weight-normal1">{option.full_name}</span></td>
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
        </>
    )
}

export default Transctions