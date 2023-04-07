import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { UseAppContext } from '../../Context/AppContext';
import { GetProfile } from '../service/lenderService';


export const Header = (props) => {
   const navigate = useNavigate();
   const { header, ToggleHeader } = UseAppContext();
   const [profileData, setprofileData] = useState({});
   const prefix = process.env.REACT_APP_LENDER_PRIFIX;

   const logOut = () => {
      // console.log(1)
      // localStorage.clear();
      // navigate(props.prefix)
      localStorage.removeItem("lender");
      // localStorage.clear();
      navigate('/lender/login')
   }
   const lender = JSON.parse(localStorage.getItem("lender"));

   const getProfile = async (token) => {
      const response = await GetProfile(token);
      if (response.status == true) {
         setprofileData(response.data);
      } else {
         console.log("get employees data response", response);
      }
   }
   useEffect(() => {
      getProfile(lender.lender_token)
   }, [])
   return (
      <>
         <div className={header ? "app-header header sticky app_header_res" : "app-header header sticky"}>
            <div className="container-fluid main-container">
               <div className="d-flex">
                  <div className="app-sidebar__toggle d-flex align-items-center" data-bs-toggle="sidebar">
                     <Link className="open-toggle" to="" onClick={() => ToggleHeader()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="feather feather-align-left header-icon" width="24" height="24" viewBox="0 0 24 24">
                           <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
                        </svg>
                     </Link>
                  </div>
                  <Link className="logo-horizontal " to={props.prefix}>
                     <img src={process.env.PUBLIC_URL + "/assets/img/logo-thirdroc.png"} className="header-brand-img desktop-lgo" alt="logo" />
                     <img src={process.env.PUBLIC_URL + "/assets/img/logo-thirdroc.png"} className="header-brand-img dark-logo" alt="logo" />
                  </Link>
                  <div className="d-flex order-lg-2 ms-auto main-header-end">
                     <div className="navbar navbar-expand-lg navbar-collapse responsive-navbar p-0">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent-4"> <div className="d-flex order-lg-2">
                           {/* <div className="dropdown header-notify d-flex">
                              <Link className="nav-link icon" data-bs-toggle="dropdown"> <svg xmlns="http://www.w3.org/2000/svg" className="header-icon" width="24" height="24" viewBox="0 0 24 24"> <path d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z"> </path> </svg>
                                 <span className="badge bg-orange side-badge">5</span> </Link>
                           </div> */}
                           <div className="dropdown profile-dropdown d-flex">
                              <Link to={props.prefix} className="nav-link pe-0 leading-none" data-bs-toggle="dropdown">
                              <span className="header-avatar1">
                              {profileData.logo ?
                                       <img className="avatar avatar-md brround"  src={'https://thirdroc1.s3.ap-southeast-2.amazonaws.com/lender-logo-' + profileData.logo}  />
                                       :
                                       <img src={process.env.PUBLIC_URL + '/assets/img/images.png'} alt="img" className="avatar avatar-md brround" />


                                    }
                                  </span> </Link>

                              <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow animated">
                                 {/* <div className="text-left"><div className="text-left user font-weight-bold ps-sm-4">SMT Lab </div> 
				        <div className="dropdown-divider"></div> 
				      </div>  */}
                                 {/* <Link className="dropdown-item d-flex" to={props.prefix}>
                                    <svg className="header-icon me-2" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"> <path d="M0 0h24v24H0V0z" fill="none"></path> <path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"> </path> </svg>
                                    <div className="fs-13">Setting</div>
                                 </Link> */}
                                 <Link className="dropdown-item d-flex" to={props.prefix} onClick={() => logOut()}>
                                    <svg className="header-icon me-2" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"> <g> <rect fill="none" height="24" width="24"></rect> </g> <g> <path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z"> </path> </g> </svg> <div className="fs-13">Sign Out</div>
                                 </Link> </div>
                           </div>
                        </div>
                        </div>
                     </div>

                  </div>
               </div>
            </div>
         </div>

         <div className="sticky is-expanded">
            <div className="app-sidebar__overlay active" data-bs-toggle="sidebar"></div>
            <aside className={header ? "app-sidebar open ps ps--active-y res_aside" : "app-sidebar open ps ps--active-y"}>
               <div className={header ? "app-sidebar__logo res_aside" : "app-sidebar__logo"}>
                  <Link className="header-brand" to={props.prefix}>
                     <img src={process.env.PUBLIC_URL + "/assets/img/logo-thirdroc.png"} className="header-brand-img desktop-lgo" alt="logo" />
                     <img src={process.env.PUBLIC_URL + "/assets/img/logo-thirdroc.png"} className="header-brand-img mobile-logo" alt="Azea logo" />
                  </Link>
               </div>
               <div className="main-sidemenu is-expanded">
                  <div className="slide-left disabled active is-expanded" id="slide-left">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
                     </svg>
                  </div>
                  <ul className="side-menu app-sidebar3 open" style={{ marginRight: "0px" }}>
                     {/* <li className="side-item side-item-category">Main</li> */}
                     <li className="slide is-expanded">
                        <Link className={props.locationName == props.prefix + '/dashboard' ? "side-menu__item active" : "side-menu__item"} to={props.prefix + '/dashboard'}>
                           <svg xmlns="http://www.w3.org/2000/svg" className={header ? "side-menu__icon res_icon" : "side-menu__icon"} width="24" height="24" viewBox="0 0 24 24">
                              <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z"></path>
                           </svg>
                           <span className={header ? "side-menu__label d-none mt-1" : "side-menu__label mt-1"}>Dashboard</span>
                        </Link>
                     </li>
                     {/* <li className="slide is-expanded">
                        <Link className="side-menu__item" to={props.prefix + '/publicurl'}>
                           <i className="fa-solid fa-link fa-fw side-menu__icon fs-18"></i>
                           <span className={header?"side-menu__label d-none":"side-menu__label"}>Public Cases URL</span>
                        </Link>
                     </li> */}
                     <li className="slide is-expanded">
                        <Link className={props.locationName == prefix + '/employee' ? "side-menu__item active" : "side-menu__item"} to={prefix + '/employee'}>
                           <i className={header ? "fa-regular fas fa-users fa-fw side-menu__icon fs-18 res_icon" : "fa-regular fas fa-users fa-fw side-menu__icon fs-18"}></i>
                           <span className={header ? "side-menu__label d-none mt-1" : "side-menu__label mt-1"}>Borrower</span>
                        </Link>
                     </li>
                 
                     <li className="slide is-expanded">
                        <Link className={props.locationName == prefix + '/dues_list' ? "side-menu__item active" : "side-menu__item"} to={prefix + '/dues_list'}>
                           <i className={header ? "fa-solid fa-arrow-down-short-wide fa-fw side-menu__icon fs-18 res_icon" : "fa-solid fa-arrow-down-short-wide fa-fw side-menu__icon fs-18"}></i>
                           <span className={header ? "side-menu__label d-none mt-1" : "side-menu__label mt-1"}>Dues List </span>
                        </Link>
                     </li>
                   
                     <li className="slide is-expanded">
                        <Link className={props.locationName == prefix + '/emi_paid' ? "side-menu__item active" : "side-menu__item"} to={prefix + '/emi_paid'}>
                           <i className={header ? "fa-regular fa-solid fa-square-plus fa-fw side-menu__icon fs-18 res_icon" : "fa-regular fa-solid fa-square-plus fa-fw side-menu__icon fs-18"}></i>
                           <span className={header ? "side-menu__label d-none mt-1" : "side-menu__label mt-1"}>EMI Paid</span>
                        </Link>
                     </li>
                     <li className="slide is-expanded">
                        <Link className={props.locationName == prefix + '/emi' ? "side-menu__item active" : "side-menu__item"} to={prefix + '/emi'}>
                           <i className={header ? "fa-regular fa-brands fa-etsy fa-fw side-menu__icon fs-18 res_icon" : "fa-regular fa-brands fa-etsy fa-fw side-menu__icon fs-18"}></i>
                           <span className={header ? "side-menu__label d-none mt-1" : "side-menu__label mt-1"}>EMI</span>
                        </Link>
                     </li>
                     {/* <li className="slide is-expanded">
                        <Link className={props.locationName == prefix + '/employer' ? "side-menu__item active" : "side-menu__item"} to={prefix + '/employer'}>
                           <i className={header ? "fa-regular fas fa-user-plus fa-fw side-menu__icon fs-18 res_icon" : "fa-regular fas fa-user-plus fa-fw side-menu__icon fs-18"}></i>
                           <span className={header ? "side-menu__label d-none mt-1" : "side-menu__label mt-1"}>Employer</span>
                        </Link>
                     </li> */}
                     <li className="slide is-expanded">
                        <Link className={props.locationName == props.prefix + '/profile' ? "side-menu__item active" : "side-menu__item"} to={props.prefix + '/profile'}>
                           <i className={header ? "fa-regular fa-address-card fa-fw side-menu__icon fs-18 res_icon" : "fa-regular fa-address-card fa-fw side-menu__icon fs-18"}></i>
                           <span className={header ? "side-menu__label d-none mt-1" : "side-menu__label mt-1"}>Profile</span>
                        </Link>
                     </li>


                     <li className="slide is-expanded">
                        <Link className={props.locationName == prefix + '/transactions' ? "side-menu__item active" : "side-menu__item"} to={prefix + '/transactions'}>
                           <i className={header ? "fa-regular fa-solid fa-comments-dollar fa-fw side-menu__icon fs-18 res_icon" : "fa-regular fa-solid fa-comments-dollar fa-fw side-menu__icon fs-18"}></i>
                           <span className={header ? "side-menu__label d-none mt-1" : "side-menu__label mt-1"}>Transaction </span>
                        </Link>
                     </li>
                     {/* <li className="slide is-expanded">
                        <Link className={props.locationName == props.prefix + '/case' ? "side-menu__item active" : "side-menu__item"} to={props.prefix + '/case'}>
                           <i className="fa-regular fa-address-card fa-fw side-menu__icon fs-18"></i>
                           <span className={header?"side-menu__label d-none":"side-menu__label"}>Case</span>
                        </Link>
                     </li> */}
                     {/* <li className="slide">
                        <Link className="side-menu__item" to={props.prefix + '/report'}>
                           <i className="fa-solid fa-database fa-fw side-menu__icon fs-18"></i>
                           <span className={header?"side-menu__label d-none":"side-menu__label"}>Report</span>
                        </Link>
                     </li> */}
                     {/* <li className="slide">
                           <Link className={props.locationName == props.prefix + '/roles_permission' || props.locationName == props.prefix + '/add_role' || props.locationName == props.prefix + '/edit_role' ? "side-menu__item active" : "side-menu__item"} to={props.prefix + '/roles_permission'}>
                              <i className="fa-solid fa-database fa-fw side-menu__icon fs-18"></i>
                              <span className={header?"side-menu__label d-none":"side-menu__label"}>Roles And Permission</span>
                           </Link>
                        </li> */}
                     {/* <li className="slide is-expanded">
                        <Link className={props.locationName == props.prefix + '/users' ? "side-menu__item active" : "side-menu__item"} to={props.prefix + '/users'}>
                           <i className="fa-solid fa-users fa-fw side-menu__icon fs-18"></i>
                           <span className={header?"side-menu__label d-none":"side-menu__label"}>Users</span>
                        </Link>
                     </li> */}

                     {/* <li className="slide is-expanded">
                        <Link className="side-menu__item" >
                           <i className="fa-solid fa-gauge fa-fw side-menu__icon fs-18"></i>
                           <span className={header?"side-menu__label d-none":"side-menu__label"}>Your RM</span>
                        </Link>
                     </li> */}
                     {/* <li className="slide is-expanded">
                        <Link className={props.locationName == props.prefix + '/api' ? "side-menu__item active" : "side-menu__item"} to={props.prefix + '/api'}>
                           <i className="fa-solid fa-key fa-fw fa-fw side-menu__icon fs-18"></i>
                           <span className={header?"side-menu__label d-none":"side-menu__label"}>Api</span>
                        </Link>
                     </li> */}
                     {/* <li className="slide is-expanded">
                     <Link className="side-menu__item" to={props.prefix}>
                        <i className="fa-regular fa-thumbs-up fa-fw side-menu__icon fs-18"></i>
                        <span className={header?"side-menu__label d-none":"side-menu__label"}>Follow Up</span>
                     </Link>
                  </li> */}
                     {/* <li className="slide">
                     <Link className="side-menu__item" data-bs-toggle="slide" to="/">
                       <svg xmlns="http://www.w3.org/2000/svg" className={header?"side-menu__icon res_icon":"side-menu__icon"} width="24" height="24" viewBox="0 0 24 24"> <path d="M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.084 0 2 .916 2 2s-.916 2-2 2-2-.916-2-2 .916-2 2-2z"> </path> <path d="m2.845 16.136 1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8.1 8.1 0 0 0 9 19.402V20c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-.598a8.132 8.132 0 0 0 1.896-1.111l.529.306c.923.53 2.198.188 2.731-.731l.999-1.729a2.001 2.001 0 0 0-.731-2.732l-.505-.292a7.718 7.718 0 0 0 0-2.224l.505-.292a2.002 2.002 0 0 0 .731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8.1 8.1 0 0 0 15 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8.132 8.132 0 0 0-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2.001 2.001 0 0 0 .731 2.732l.505.292a7.683 7.683 0 0 0 0 2.223l-.505.292a2.003 2.003 0 0 0-.731 2.733zm3.326-2.758A5.703 5.703 0 0 1 6 12c0-.462.058-.926.17-1.378a.999.999 0 0 0-.47-1.108l-1.123-.65.998-1.729 1.145.662a.997.997 0 0 0 1.188-.142 6.071 6.071 0 0 1 2.384-1.399A1 1 0 0 0 11 5.3V4h2v1.3a1 1 0 0 0 .708.956 6.083 6.083 0 0 1 2.384 1.399.999.999 0 0 0 1.188.142l1.144-.661 1 1.729-1.124.649a1 1 0 0 0-.47 1.108c.112.452.17.916.17 1.378 0 .461-.058.925-.171 1.378a1 1 0 0 0 .471 1.108l1.123.649-.998 1.729-1.145-.661a.996.996 0 0 0-1.188.142 6.071 6.071 0 0 1-2.384 1.399A1 1 0 0 0 13 18.7l.002 1.3H11v-1.3a1 1 0 0 0-.708-.956 6.083 6.083 0 0 1-2.384-1.399.992.992 0 0 0-1.188-.141l-1.144.662-1-1.729 1.124-.651a1 1 0 0 0 .471-1.108z"> </path> </svg>
                        <span className={header?"side-menu__label d-none":"side-menu__label"}>Setting</span><i className="angle fa fa-chevron-right"></i>
                     </Link>
                     <ul className="slide-menu">
                        <li className="side-menu-label1"><Link to={props.prefix}>Setting</Link></li>
                        <li><Link to={props.prefix} className="slide-item"> State</Link></li>
                        <li><Link to={props.prefix} className="slide-item"> City</Link></li>
                        <li><Link to={props.prefix} className="slide-item"> Pincode</Link></li>
                        <li><Link to={props.prefix} className="slide-item"> Incomplete Status</Link></li>
                     </ul>
                  </li> */}

                  </ul>
                  <div className="slide-right" id="slide-right">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                     </svg>
                  </div>
               </div>
               <div className="ps__rail-x" style={{ left: "0px", bottom: "-300px" }}>
                  <div className="ps__thumb-x" tabIndex="0" style={{ left: "0px", width: "0px" }}></div>
               </div>
               <div className="ps__rail-y" style={{ top: "300px", height: "657px", right: "0px" }}>
                  <div className="ps__thumb-y" tabIndex="0" style={{ top: "204px", height: "446px" }}></div>
               </div>
            </aside>
         </div>

      </>
   )
}

export default Header;