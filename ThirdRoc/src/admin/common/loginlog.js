import React, { useState, useEffect } from 'react';
import PaginationComponent from '../../PaginationComponent';
import Moment from 'react-moment';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';

const Loginlog = (props) => {

    const [loading, setloading] = useState(false);
    const [pagesCount, setpagesCount] = useState(0);
    const [dataArray, setDataArray] = useState([]);
    const [detail, setDetail] = useState([]);
    const [totalItems, settotalItems] = useState(0);
    useEffect(() => {
        getList();
    }, [])

    //Get Log List API
    const getList = (page=1) => {
        setloading(true)
        props.api.getApi('get-log-list',{page:page-1,size:10}).then(response => {
            setDataArray(response.data.record);
            setpagesCount(response.data.totalItems+1)
            settotalItems(response.data.totalItems)
            setloading(false)
        }).catch(error => {  
            setloading(false)
            props.toast.error(error.message);
        }); 
    }   
    
  return (
   <div className="main-container container-fluid px-0">
  {/*Page header*/} 
  <div className="page-header">
    <div className="page-leftheader">
      <h4 className="page-title mb-0 text-primary">Login Report {totalItems ? '(' + totalItems + ')' : ''}</h4>
    </div>
    {/* <div className="page-rightheader"> 
      <div className="btn-list"> 
        <Link to=""   className="btn btn-primary btn-pill"><i className="fa fa-download me-2" /> Download</Link> 
      </div> 
    </div> */}
  </div>
  {/*End Page header*/} {/* Row-1 */} 
  {/* <div className="row">
    <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
      <div className="form-group"> 
        <label className="form-label">Select Date</label> 
        <div className="row g-xs"> 
          <div className="wd-200 mg-b-30"> 
            <div className="input-group"> 
              <input className="form-control fc-datepicker hasDatepicker" placeholder="MM/DD/YYYY" type="date" /> 
            </div>
          </div>
        </div> 
      </div>
    </div>
  </div> */}
  {/* End Row-1 */} 
  <div className="row">
    <div className="col-md-12">
      <div className="card">
        <div className="card-body p-0"> 
          <div className="table-responsive"> 
            <table className="table table-hover card-table table-vcenter text-nowrap"> 
              <thead className="border-bottom-0 pt-3 pb-3">
                <tr>
                  <th className="font-weight-bold">Name</th>
                  <th className="font-weight-bold">Company</th>
                  <th className="font-weight-bold">Login IP</th>
                  <th className="font-weight-bold">Login Time</th>
                </tr> 
              </thead> 
              <tbody>
                {dataArray.length > 0 && dataArray.map((option, index) => (
                    <tr  key={index} >
                    <td><span className="font-weight-normal1">{option.full_name}</span></td>
                    <td><span className="font-weight-normal1">{option.company_name}</span></td>
                    <td><span className="font-weight-normal1">{option.ip_address}</span></td>
                    <td><span className="font-weight-normal1"><Moment format="DD-MM-YYYY hh:mm A">{option.login_time}</Moment></span></td>
                    </tr>
                ))} 
              </tbody>
            </table> 
          </div> 
        </div>
      </div>
    </div>

     {pagesCount>0 && dataArray.length>0? 
                 <>
                <div className="col-md-12">
                   <div className="card-body">
                    <PaginationComponent className="justify-content-center"
                        totalItems={pagesCount}
                        pageSize={10}
                        maxPaginationNumbers={3}
                        onSelect={(e) => getList(e) }
                    />
                    </div>
                </div>
                </>
                : '' }

  </div>
</div>

  )
}

export default Loginlog