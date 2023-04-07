import React, { useState, useEffect } from 'react';
import PaginationComponent from '../../PaginationComponent';
import Moment from 'react-moment';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';

const Notification = (props) => {

  const [loading, setloading] = useState(false);
  const [pagesCount, setpagesCount] = useState(0);
  const [dataArray, setDataArray] = useState([]);
  const [detail, setDetail] = useState([]);
  const [totalItems, settotalItems] = useState(0);

  useEffect(() => {
    getList();
  }, [])

  //Get Notification List API
  const getList = (page = 1) => {
    setloading(true)
    props.api.getApi('get-notification-list',{ page:page-1, size:10 }).then(response => {
      setDataArray(response.data.record);
      setpagesCount(response.data.totalItems + 1)
      settotalItems(response.data.totalItems)
      setloading(false)
    }).catch(error => {
      setloading(false)
      props.toast.error(error.message);
    });
  }

  return (
    <>
      <div className="main-container container-fluid px-0">
        {/*Page header*/}
        <div className="page-header">
          <div className="page-leftheader">
            <h4 className="page-title mb-0 text-primary">Case Log List {totalItems ? '(' + totalItems + ')' : ''}</h4>
          </div>
          {/* <div className="page-rightheader">
            <div className="btn-list">
              <Link to="" className="btn btn-primary btn-pill"><i className="fa fa-download me-2" /> Download</Link>
            </div>
          </div> */}
        </div>
        {/*End Page header*/} {/* Row-1 */}
        <div className="row">
          {/* <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
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
          </div> */}
        </div>
        {/* End Row-1 */}
        <div className="container p-0">

          <ul className="notification bg-white ml-0 pd25">
            {dataArray.length > 0 && dataArray.map((option, index) => (
              <li key={index}> 
                
                {/* <div className="notification-icon"> <a href="javascript:void(0);" /> </div>  */}
                {/* <div className="notification-time-date mb-2 d-block d-md-none"> 
          <span className="date">Yesterday</span> <span className="time ms-2">18:47</span> 
        </div>  */}
                <div className="notification-body">
                  <div className="media mt-0">
                    {/* <div className="main-avatar avatar-md offline"> 
              <span className="avatar avatar-md bradius bg-orange me-3">AS</span> 
            </div>  */}
                    <div className="media-body ms-3 d-flex">
                      <div > <p className="fs-15 text-dark fw-bold mb-0">{option.customer.full_name}<span className="badge bg-success ms-3 px-2 pb-0 mb-1">{option.log_text}</span> </p>
                        <p className="mb-0 fs-13 text-dark"><b>Case Id: </b>{option.file_id}</p>
                        <p className="mb-0 fs-13 text-dark"><b>Change By: </b>{option.change_by} |User Type{option.change_by_user_type}</p>
                      </div>

                       <div className="notify-time"> 
                        <div className="notification-time">
                          <span className="date"><Moment format="DD MMMM YYYY">{option.created_at}</Moment></span>
                          <span className="date"><Moment format="hh:mm A">{option.created_at}</Moment></span>
                        </div>
                          <p className="mb-0 text-muted fs-11"><b>Type: </b>{option.log_type}</p>
                       </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/* <div className="text-center mb-4"> <button className="btn ripple btn-primary w-md">Load more</button> </div> */}
          {pagesCount > 0 && dataArray.length > 0 ?
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
            : ''}
        </div>
      </div>


    </>
  )
}

export default Notification