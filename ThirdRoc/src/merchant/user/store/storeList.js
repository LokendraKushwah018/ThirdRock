import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { GetSettlement ,GetStore} from '../../service/MerchantService';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Moment from 'react-moment';
import { Link } from 'react-router-dom'
import ImageViewer from 'react-simple-image-viewer';
const config = require('../../../config.json');




const StoreList = (props) => {
    const tableRef = useRef(null);
    const prefix = process.env.REACT_APP_MARCHNT_PRIFIX;
    const merchant = JSON.parse(localStorage.getItem("merchant"));
    const merchantUserId = merchant.user_id
    const [data, setData] = useState([])
    const [search, setSearch] = useState('');
    const [copied, setCopied] = useState(false);
    const [value, setValue] = useState('');

    const getStore = async (token) => {
        const response = await GetStore(token,merchantUserId,'1',search);
        if (response.status) {
            setData(response.AllStores)
        } else {
            console.log(response);
        }
    }

    useEffect(() => {
        getStore(merchant.merchant_token)
    }, [])

    const [images, setimages] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const checkURL = (url) => {
        return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }
    const openImageViewer = (index, field_path, image_path) => {
      let data = [];
      let url = field_path.split(',');
      if (checkURL(config.s3_url + '' + image_path + '' + url[index])) {
        data.push(config.s3_url + '' + image_path + '' + url[index])
      }
      if (data.length) {
        setimages(data, setCurrentImage(0, setIsViewerOpen(true)))
      }
    }
    const closeImageViewer = () => {
      setCurrentImage(0);
      setIsViewerOpen(false);
    };
    return (
        <>
            <div className="main-container container-fluid px-0">
                <div className="page-header mb-3">
                    <div className="page-leftheader">
                        <h4 className="page-title mb-0 text-primary">Stores</h4>
                    </div>
                    <div className="page-rightheader">
                        <div className="btn-list">
                            <Link to={props.prefix +"/add_store"} className="btn btn-outline-primary mt-2" ><i className="fa fa-plus me-2"></i> Add Store</Link>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12 col-lg-12">
                        <div className="card">
                            <div className="card-header br-0">
                                <h3 className="card-title">Store List</h3>
                            </div>
                        </div>
                    </div>
                </div>

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

                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table table-hover card-table table-vcenter text-nowrap" ref={tableRef}>
                                        <thead className="border-bottom-0 pt-3 pb-3">
                                            <tr>
                                                <th className="font-weight-bold">SERAIL NO.</th>
                                                <th className="font-weight-bold">NAME</th>
                                                <th className="font-weight-bold">ADDRESS</th>
                                                <th className="font-weight-bold">LOGO</th>
                                                <th className="font-weight-bold">QR CODE</th>
                                                <th className="font-weight-bold">NUMBER</th>
                                                <th className="font-weight-bold">CREATION DATE</th>
                                                <th className="font-weight-bold">STATUS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                                    {data && data.map((option, index) => (
                                                        <tr key={index} >
                                                            <td><span className="font-weight-normal1">{index + 1}</span></td>
                                                            <td><span className="font-weight-normal1">{option.company_name}</span></td>
                                                            <td><span className="font-weight-normal1">{option.address}</span></td>
                                                            <td><span className="font-weight-normal1"><button className='btn btn-primary' onClick={() => openImageViewer(index, option.logo, 'uploads/merchant/pancard/')}>view</button></span></td>
                                                            <td><span className="font-weight-normal1"><button className='btn btn-primary'>view</button></span></td>
                                                            <td><span className="font-weight-normal1">{option.mobile_number}</span></td>
                                                            <td><span className="font-weight-normal1"><Moment format="YYYY-MM-DD h:MM A">{option.created_at}</Moment></span></td>
                                                            <td><span className="font-weight-normal1">{option.status}</span></td>
                                                           
                                                           
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
            {isViewerOpen && images && (
                                    <ImageViewer
                                        src={images}
                                        currentIndex={currentImage}
                                        disableScroll={false}
                                        closeOnClickOutside={true}
                                        onClose={closeImageViewer}
                                    />
                                )}
        </>
    )
}

export default StoreList;