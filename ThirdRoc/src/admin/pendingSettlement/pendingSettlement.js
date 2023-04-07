import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { GetSettlement, addSettlement, GetAllPendingSettlement } from '../service/adminService';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Moment from 'react-moment';
import Config from '../../config.json';
const prefix = process.env.REACT_APP_ADMIN_PRIFIX;
const PendingSettlement = () => {
    const tableRef = useRef(null);
    const merchant = JSON.parse(localStorage.getItem("admin"));
    const [data, setData] = useState([])
    const [settlements, setSettlements] = useState([])
    const [search, setSearch] = useState('');
    const [pagesCount, setpagesCount] = useState(1);
    const [copied, setCopied] = useState(false);
    const [value, setValue] = useState('');
    const getAllPendingSettlement = async (token) => {
        const response = await GetAllPendingSettlement(token, '1', search);
        if (response.status) {
            setData(response.allPendingSettalment)
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

    useEffect(() => {
        getAllPendingSettlement(merchant.admin_token, pagesCount, search)

    }, [search])

    const selectSettlement = (id) => {
        // settlements.push(id)
        // setSettlements(settlements.idArr.push(id))
        setSettlements(oldArr => [...oldArr, id]);

    }
    // useEffect(()=>{

    //     console.log('settlements',settlements);
    // },[settlements])
    // const addSettlementByIds = () => {
    //     addSettlements(settlements)
    // }
    return (
        <>
            <div className="main-container container-fluid px-0">
                <div className="page-header mb-3">
                    <div className="page-leftheader">
                        <h4 className="page-title mb-0 text-primary">Pending Settlements</h4>
                    </div>
                </div>

                <div className="row">

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

                {/* <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
                    <div className="form-group">
                        <label className="form-label">Search</label>
                        <div className="row g-xs">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search By Keyword/Name/Transactions ID" value={search} onChange={(e) => setSearch(e.target.value)} />
                                <span className="input-group-append"> <button className="btn btn-primary" type="button"><i className="fa fa-search"></i></button> </span>
                            </div>
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
                                                {/* <th></th> */}
                                                <th className="font-weight-bold">Logo</th>
                                                <th className="font-weight-bold">Merchant Name</th>
                                                <th className="font-weight-bold">Amount</th>
                                                <th className="font-weight-bold">Merchant Number</th>
                                                <th className="font-weight-bold">Txn Date</th>
                                                <th className="font-weight-bold">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data && data.map((option, index) => (
                                                <tr key={index} >
                                                    {/* <td><input type="checkbox" name="id" value={option.id} onClick={() => selectSettlement(option.id)} /></td> */}

                                                    {option.logo != null ?
                                                        <td><span className="font-weight-normal1">
                                                            <img style={{ width: 50, height: 50, borderRadius: '8px' }} src={Config.s3_url + 'merchant-logo-' + option.logo} /></span></td>
                                                        :
                                                        <td><span className="font-weight-normal1" >

                                                            <img style={{ width: 50, height: 50, borderRadius: '8px' }} src={process.env.PUBLIC_URL + '/assets/img/defaultMerchant.png'} /></span></td>
                                                    }





                                                    <td><span className="font-weight-normal1">{option.merchant_name}</span></td>
                                                    <td><span className="font-weight-normal1">{option.balance}</span></td>
                                                    <td><span className="font-weight-normal1">{option.mobile_number}</span></td>

                                                    <td><span className="font-weight-normal1"><Moment format="YYYY-MM-DD h:MM A">{option.created_at}</Moment></span></td>

                                                    <td><span className="font-weight-normal1">
                                                        <Link to={prefix +'/addSettle/' + option.merchant_id} className='btn btn-primary btn-md ms-3'>View Transactions</Link>

                                                    </span>  </td>
                                                    {/* <td><span className="font-weight-normal1">{option.title}</span></td> */}
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

export default PendingSettlement