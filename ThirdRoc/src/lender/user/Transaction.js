import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { GetTransctions } from '../service/lenderService';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Moment from 'react-moment';
import toast, { Toaster } from 'react-hot-toast';
const Transaction = () => {

    const tableRef = useRef(null);
    const lender = JSON.parse(localStorage.getItem("lender"));
    const lenderId = lender.user_id
    const [data, setData] = useState([])
    const [search, setSearch] = useState('');
    const [copied, setCopied] = useState(false);
    const [value, setValue] = useState('');

    const transction = async (token) => {
        const response = await GetTransctions(token, lenderId);
        if (response.status) {
           setData(response.data)
        } else {
            console.log(response);
        }
    }

    useEffect(() => {
        transction(lender.lender_token)
    }, [])

useEffect(()=>{
if (copied) {
    toast.success('Copied');
}
},[copied])
    return (
        <>
            <div className="main-container container-fluid px-0">
                <div className="page-header mb-3">
                    <div className="page-leftheader">
                        <h4 className="page-title mb-0 text-primary">Manage Transaction</h4>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12 col-lg-12">
                        <div className="card">
                            <div className="card-header br-0">
                                <h3 className="card-title"> Transactions Reports</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                    <div className="form-group">
                        <label className="form-label">Search</label>
                        <div className="row g-xs">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search By Keyword/Name/Transactions Id" value={search} onChange={(e) => setSearch(e.target.value)} />
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
                                                <th className="font-weight-bold">SERIAL NO.</th>
                                                <th className="font-weight-bold">DATE & TIME</th>
                                                <th className="font-weight-bold">TRANSACTION ID</th>
                                                <th className="font-weight-bold">TRANSACTION AMOUNT</th>
                                                <th className="font-weight-bold">cUSTOMER</th>
                                                <th className="font-weight-bold">CUSTOMER NO.</th>
                                                <th className="font-weight-bold">STATUS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* {data && data.length ?
                                                {/* <div>  */}
                                            {data && data.length ? data.map((option, index) => (
                                                <tr key={index} >
                                                    <td><span className="font-weight-normal1">{index + 1}</span></td>
                                                    <td><span className="font-weight-normal1"><Moment format="YYYY-MM-DD h:MM A">{option.created_at}</Moment></span></td>

                                                    <td><span className="font-weight-normal1">{option.txn_id}</span>
                                                    <span>
                                                            <CopyToClipboard text={option.txn_id} onCopy={() => setCopied(true)}>
                                                                <button className='btn btn-primary btn-sm ms-3'><i class="fa-solid fa-copy"></i></button>
                                                            </CopyToClipboard>
                                                        </span>
                                                    </td>
                                                    <td><span className="font-weight-normal1">{option.paid_amount}</span></td>
                                                    <td><span className="font-weight-normal1">{option.full_name}</span></td>
                                                    <td><span className="font-weight-normal1">{option.mobile_number}</span></td>
                                                    <td><span className="font-weight-normal1">{option.status}</span></td>

                                                </tr>
                                            ))
                                                :
                                                <div>
                                                    <p className='font-weight'>No Transaction Found</p>
                                                </div>}
                                            {/* </div>
                                                : <div className="row">
                                                    <div className="col-md-12 d-flex justify-content-center">
                                                        <div className="card ">
                                                            no record found
                                                        </div>
                                                    </div>
                                                </div>

                                            // } */}

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

export default Transaction