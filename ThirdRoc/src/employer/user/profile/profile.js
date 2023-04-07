import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Service from '../../../lenderService';
import toast, { Toaster } from 'react-hot-toast';
import config from '../../../config.json'
import { GetProfile } from '../../service/employService';

const api = new Service();

const Profile = () => {

  const prefix = process.env.REACT_APP_EMPLOYER_PRIFIX;

  const [profileData, setprofileData] = useState({});
  const employer = JSON.parse(localStorage.getItem("employer"));

  const getProfile = async (token) => {
    const response = await GetProfile(token);
    if (response.status == true) {
      setprofileData(response.data);
    } else {
      console.log("get employees data response", response);
    }
  }
  useEffect(() => {
    getProfile(employer.employer_token)
  }, [])

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="main-container container-fluid px-0">
        <div className="page-header mb-3">
          <div className="page-leftheader">
            <h4 className="page-title mb-0 text-primary">Employer Profile</h4>
          </div>
          <div className="page-rightheader">
            <div className="btn-list">
              <Link to={prefix + '/editProfile/' + profileData.user_id} className="btn btn-outline-primary" ><i className="fa-solid fa-user-pen fa-fw me-2"></i> Edit Profile</Link>
              <Link to={prefix + '/changePassword/' + profileData.user_id} className="btn btn-primary btn-pill" ><i className="fa-regular fa-pen-to-square fa-fw me-2"></i> Change Password</Link>
            </div>

          </div>
        </div>

        <div className="main-proifle">
          <div className="row">
            <div className="col-lg-12 col-xl-12 p-0">
              <div className="box-widget widget-user">
                <div className="widget-user-image1 d-xl-flex d-block flexwrap">
                  <div className="col-md-12">
                    <p class="mb-0"><small class="text-muted">Employer: {profileData?.file_id}</small></p>
                    <h4 className="pro-user-username mb-3 font-weight-bold">{profileData?.full_name}</h4>

                    <h4 className="pro-user-username mb-3 font-weight-bold">{profileData.user_name}</h4>
                    <div className="row">
                      <div className="media mb-5 col-md-4">
                        <div className="media-icon bg-info-transparent text-info me-3"> <i className="fa-regular fa-building fa-fw"></i> </div>
                        <div className="media-body">
                          <small className="text-muted">Company Name:</small>
                          <div className="font-weight-normal1">{profileData.company_name}</div>
                        </div>
                      </div>
                      <div className="media mb-5 col-md-4">
                        <div className="media-icon bg-info-transparent text-info me-3"> <i className="fa-regular fa-building fa-fw"></i> </div>
                        <div className="media-body">
                          <small className="text-muted">Name Of Contact Person:</small>
                          <div className="font-weight-normal1">{profileData.full_name}</div>
                        </div>
                      </div>
                      <div className="media  mb-5 col-md-4">
                        <div className="media-icon bg-success-transparent text-success me-3"> <i className="fa-solid fa-mobile-screen-button fa-fw"></i> </div>
                        <div className="media-body">
                          <small className="text-muted">Mobile No:</small>
                          <div className="font-weight-normal1">{profileData.mobile_number}</div>
                        </div>
                      </div>
                      <div className="media  mb-5 col-md-4">
                        <div className="media-icon bg-primary-transparent text-primary me-3"> <i className="fa-regular fa-envelope fa-fw"></i> </div>
                        <div className="media-body">
                          <small className="text-muted">Country:</small>
                          <div className="font-weight-normal1">{profileData.country}</div>
                        </div>
                      </div>
                      <div className="media  mb-5 col-md-4">
                        <div className="media-icon bg-danger-transparent text-danger me-3"> <i className="fa-solid fa-globe fa-fw"></i> </div>
                        <div className="media-body">
                          <small className="text-muted">Website:</small>
                          <div className="font-weight-normal1">{profileData.website}</div>
                        </div>
                      </div>
                      <div className="media mb-5 col-md-4">
                        <div className="media-icon bg-warning-transparent text-warning me-3"> <i className="fa-regular fa-address-card fa-fw"></i> </div>
                        <div className="media-body">
                          <small className="text-muted">Email:</small>
                          <div className="font-weight-normal1">{profileData.email}</div>
                        </div>
                      </div>
                      <div className="media  mb-5 col-md-4">
                        <div className="media-icon bg-cyan-transparent text-cyan me-3"> <i className="fa-solid fa-location-dot fa-fw"></i> </div>
                        <div className="media-body">
                          <small className="text-muted">Address:</small>
                          <div className="font-weight-normal1">{profileData.address}</div>
                        </div>
                      </div>
                      {/* <div className="media  mb-5 col-md-4">
                          <div class="media-icon bg-cyan-transparent text-cyan me-3"> <i class="fa-solid fa-percent fa-fw"></i> </div>
                          <div class="media-body">
                            <small className="text-muted">Maximum Rate Of Interest:</small>
                            <div className="font-weight-normal1">{profileData?.max_rate_of_intrest} <i class="fa-solid fa-percent fa-fw"></i> </div>
                          </div>
                        </div>
                        <div className="media  mb-5 col-md-4">
                          <div class="media-icon bg-cyan-transparent text-cyan me-3"> <i class="fa-solid fa-percent fa-fw"></i> </div>
                          <div class="media-body">
                            <small className="text-muted">Minimum Rate Of Interest</small>
                            <div className="font-weight-normal1">{profileData?.mini_rate_of_intrest} <i class="fa-solid fa-percent fa-fw"></i> </div>
                          </div>
                        </div>
                        <div className="media  mb-5 col-md-4">
                          <div class="media-icon bg-cyan-transparent text-cyan me-3"> <i class="fa-solid fa-indian-rupee-sign fa-fw"></i> </div>
                          <div class="media-body">
                            <small className="text-muted">Maximum Loan Range</small>
                            <div className="font-weight-normal1">{profileData?.max_loan_range} <i class="fa-solid fa-indian-rupee-sign fa-fw"></i> </div>
                          </div>
                        </div>
                        <div className="media  mb-5 col-md-4">
                          <div class="media-icon bg-cyan-transparent text-cyan me-3"> <i class="fa-solid fa-indian-rupee-sign fa-fw"></i> </div>
                          <div class="media-body">
                            <small className="text-muted">Minimum Loan Range</small>
                            <div className="font-weight-normal1">{profileData?.mini_loan_range} <i class="fa-solid fa-indian-rupee-sign fa-fw"></i> </div>
                          </div>
                        </div>
                        <div className="media  mb-5 col-md-4">
                          <div class="media-icon bg-cyan-transparent text-cyan me-3"> <i class="fa-solid fa-calendar fa-fw"></i> </div>
                          <div class="media-body">
                            <small className="text-muted">Maximum tenure</small>
                            <div className="font-weight-normal1">{profileData?.max_tenure} Month </div>
                          </div>
                        </div>
                        <div className="media  mb-5 col-md-4">
                          <div class="media-icon bg-cyan-transparent text-cyan me-3"> <i class="fa-solid fa-calendar fa-fw"></i> </div>
                          <div class="media-body">
                            <small className="text-muted">Minimum tenure</small>
                            <div className="font-weight-normal1">{profileData?.mini_tenure} Month </div>
                          </div>
                        </div> */}

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-xl-12 p-0">
              <div className="box-widget widget-user">
                <div className="widget-user-image1 d-xl-flex d-block flexwrap">
                  <div className="col-md-12">
                    <h4 className="pro-user-username mb-3 font-weight-bold">Employer Logo</h4>
                    <div className="row">
                      <div className="media col-md-4">
                        <div className="media-body">
                          {profileData.logo ?
                            <img src={'https://thirdroc1.s3.ap-southeast-2.amazonaws.com/employer-logo-'+profileData.logo} style={{ height: "230px", width: "230px", objectFit: "contain" }} />
                            :
                            <img src={process.env.PUBLIC_URL + '/assets/img/upload-logo-lender.png'}  style={{ height: "230px", width: "230px", objectFit: "contain" }} />

                          }
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

    </>
  )
}
export default Profile;
