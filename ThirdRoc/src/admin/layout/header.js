import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import Service from '../../adminService';
import { UseAppContext } from '../../Context/AppContext';
// Bootstrap CSS
const api = new Service();
// Bootstrap CSS
// import {sideMenuSet} from '../../assets/js/sidemenu';
export const Header = (props) => {
   const [adminData, setAdminData] = useState(localStorage.getItem("admin"));
   const [sub_permission, setSub_permission] = useState(JSON.parse(adminData)?.sub_permission);
   const [main_permission, setMainPermission] = useState(JSON.parse(adminData)?.main_permission);
   const [userType, setUserType] = useState(JSON.parse(adminData)?.user_type);
   const [userId, setUserId] = useState(JSON.parse(adminData)?.user_id);
   const [allMainPermissions, setAllMainPermissions] = useState([]);
   const [userSideMenu, setUserSideMenu] = useState([]);

   const [dashMenu, setDashMenu] = useState(false);
   const [partnerMenu, setPartnerMenu] = useState(false);
   const [lenderMenu, setLenderMenu] = useState(false);
   const [caseMenu, setCaseMenu] = useState(false);
   const [queryBuilderMenu, setQueryBuilderMenu] = useState(false);
   const [profileMenu, setProfileMenu] = useState(false);
   const [logMenu, setLogMenu] = useState(false);
   const [notificationMenu, setNotificationMenu] = useState(false);
   const [followUpMenu, setFollowUpMenu] = useState(false);
   const [settingMenu, setSettingMenu] = useState(false);
   const [caseDetailMenu, setCaseDetailsMenu] = useState(false);

   const navigate = useNavigate();
   const { header, ToggleHeader } = UseAppContext();


   useEffect(() => {

      console.log('userId admin', userId);

   }, [userId])

   const logOut = (e) => {
      e.preventDefault();
      localStorage.removeItem("admin");
      // localStorage.clear();
      navigate('/admin/login')
   }



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
                              <Link to={props.prefix + '/adminprofie'} className="nav-link pe-0 leading-none" data-bs-toggle="dropdown">
                                 <span className="header-avatar1"> <img src={process.env.PUBLIC_URL + "/assets/img/images.png"} alt="img" className="avatar avatar-md brround" /> </span> </Link>
                              <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow animated">
                                 {/* <div className="text-left"><div className="text-left user font-weight-bold ps-sm-4">SMT Lab </div> 
				        <div className="dropdown-divider"></div> 
				      </div>  */}
                                 <li className="slide">
                                    <Link to={props.prefix + "/adminprofile"} className="dropdown-item d-flex" >
                                       <div className="fs-13"> <i className="fa-solid fa-user fa-fw header-icon me-2"></i> Profile</div>
                                    </Link>
                                 </li>
                                 <li className="slide">
                                    <Link to={props.prefix + "/changepassword"} className="dropdown-item d-flex">
                                       <div className="fs-13"> <i className="fa-solid fa-key fa-fw header-icon me-2"></i>Changepassword</div>
                                    </Link>
                                 </li>
                                 <Link className="dropdown-item d-flex" to="/admin/login" onClick={(e) => logOut(e)}>
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





         <div className="sticky is-expanded  ">
            <div className="app-sidebar__overlay active" data-bs-toggle="sidebar"></div>
            {/* <aside  className="app-sidebar  open ps ps--active-y " style={{overflowY : 'scroll'}}> */}
            <aside className={header ? "app-sidebar open ps ps--active-y res_aside" : "app-sidebar open ps ps--active-y"}  >
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
                  {/* {userType == 'SUPER-ADMIN' || userType == 'admin' ? */}
                  {userId == '1' ?
                     <ul className="side-menu app-sidebar3 open" style={{ marginRight: "0px" }}>
                        {/* <li className="side-item side-item-category">Main</li> */}
                        <li className="slide is-expanded">
                           <Link className={props.locationName == (props.prefix + '/dashboard' || props.prefix) ? "side-menu__item active" : "side-menu__item"} to={props.prefix + '/dashboard'}>
                              <svg xmlns="http://www.w3.org/2000/svg" className={header ? "side-menu__icon res_icon" : "side-menu__icon"} width="24" height="24" viewBox="0 0 24 24">
                                 <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z"></path>
                              </svg>
                              <span className={header ? "side-menu__label d-none" : "side-menu__label"}>Dashboard</span>
                           </Link>
                        </li>
                        {/* <li className="slide is-expanded">
                           <Link className={props.locationName == props.prefix + '/dsa' ? "side-menu__item active" : "side-menu__item"} to={props.prefix + '/dsa'}>
                              <svg xmlns="http://www.w3.org/2000/svg" className={header?"side-menu__icon res_icon":"side-menu__icon"} width="24" height="24" viewBox="0 0 24 24">
                                 <path d="M19.937 8.68c-.011-.032-.02-.063-.033-.094a.997.997 0 0 0-.196-.293l-6-6a.997.997 0 0 0-.293-.196c-.03-.014-.062-.022-.094-.033a.991.991 0 0 0-.259-.051C13.04 2.011 13.021 2 13 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V9c0-.021-.011-.04-.013-.062a.99.99 0 0 0-.05-.258zM16.586 8H14V5.414L16.586 8zM6 20V4h6v5a1 1 0 0 0 1 1h5l.002 10H6z"></path>
                              </svg>
                              <span className={header ? "side-menu__label d-none" : "side-menu__label"}>Partner Report</span>
                           </Link>
                        </li> */}
                        {/* <li className="slide is-expanded">
                           <Link className={props.locationName == props.prefix + '/loanPoint' ? "side-menu__item active" : "side-menu__item"} to={props.prefix + '/loanPoint'}>
                              <svg xmlns="http://www.w3.org/2000/svg" className={header?"side-menu__icon res_icon":"side-menu__icon"} width="24" height="24" viewBox="0 0 24 24">
                                 <path d="M19.937 8.68c-.011-.032-.02-.063-.033-.094a.997.997 0 0 0-.196-.293l-6-6a.997.997 0 0 0-.293-.196c-.03-.014-.062-.022-.094-.033a.991.991 0 0 0-.259-.051C13.04 2.011 13.021 2 13 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V9c0-.021-.011-.04-.013-.062a.99.99 0 0 0-.05-.258zM16.586 8H14V5.414L16.586 8zM6 20V4h6v5a1 1 0 0 0 1 1h5l.002 10H6z"></path>
                              </svg>
                              <span className={header ? "side-menu__label d-none" : "side-menu__label"}>Loan Point Report</span>
                           </Link>
                        </li>
                        <li className="slide is-expanded">
                           <Link className={props.locationName == props.prefix + '/users' ? "side-menu__item active" : "side-menu__item"} to={props.prefix + '/users'}>
                              <svg xmlns="http://www.w3.org/2000/svg" className={header?"side-menu__icon res_icon":"side-menu__icon"} width="24" height="24" viewBox="0 0 24 24">
                                 <path d="M19.937 8.68c-.011-.032-.02-.063-.033-.094a.997.997 0 0 0-.196-.293l-6-6a.997.997 0 0 0-.293-.196c-.03-.014-.062-.022-.094-.033a.991.991 0 0 0-.259-.051C13.04 2.011 13.021 2 13 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V9c0-.021-.011-.04-.013-.062a.99.99 0 0 0-.05-.258zM16.586 8H14V5.414L16.586 8zM6 20V4h6v5a1 1 0 0 0 1 1h5l.002 10H6z"></path>
                              </svg>
                              <span className={header ? "side-menu__label d-none" : "side-menu__label"}>User Report</span>
                           </Link>
                        </li> */}
                        <li className="slide is-expanded">
                           <Link className={props.locationName == props.prefix + '/employer' ? "side-menu__item active" : "side-menu__item"} to={props.prefix + '/employer'}>
                              <svg xmlns="http://www.w3.org/2000/svg" className={header ? "side-menu__icon res_icon" : "side-menu__icon"} width="24" height="24" viewBox="0 0 24 24">
                                 <path d="M19.937 8.68c-.011-.032-.02-.063-.033-.094a.997.997 0 0 0-.196-.293l-6-6a.997.997 0 0 0-.293-.196c-.03-.014-.062-.022-.094-.033a.991.991 0 0 0-.259-.051C13.04 2.011 13.021 2 13 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V9c0-.021-.011-.04-.013-.062a.99.99 0 0 0-.05-.258zM16.586 8H14V5.414L16.586 8zM6 20V4h6v5a1 1 0 0 0 1 1h5l.002 10H6z"></path>
                              </svg>
                              <span className={header ? "side-menu__label d-none" : "side-menu__label"}>Employer Report</span>
                           </Link>
                        </li>
                        <li className="slide is-expanded">
                           <Link className={props.locationName == props.prefix + '/lender' ? "side-menu__item active" : "side-menu__item"} to={props.prefix + '/lender'}>
                              <svg xmlns="http://www.w3.org/2000/svg" className={header ? "side-menu__icon res_icon" : "side-menu__icon"} width="24" height="24" viewBox="0 0 24 24">
                                 <path d="M19.937 8.68c-.011-.032-.02-.063-.033-.094a.997.997 0 0 0-.196-.293l-6-6a.997.997 0 0 0-.293-.196c-.03-.014-.062-.022-.094-.033a.991.991 0 0 0-.259-.051C13.04 2.011 13.021 2 13 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V9c0-.021-.011-.04-.013-.062a.99.99 0 0 0-.05-.258zM16.586 8H14V5.414L16.586 8zM6 20V4h6v5a1 1 0 0 0 1 1h5l.002 10H6z"></path>
                              </svg>
                              <span className={header ? "side-menu__label d-none" : "side-menu__label"}>Lenders Report</span>
                           </Link>
                        </li>
                        <li className="slide is-expanded">
                           <Link className={props.locationName == props.prefix + '/merchant' ? "side-menu__item active" : "side-menu__item"} to={props.prefix + '/merchant'}>
                              <svg xmlns="http://www.w3.org/2000/svg" className={header ? "side-menu__icon res_icon" : "side-menu__icon"} width="24" height="24" viewBox="0 0 24 24">
                                 <path d="M19.937 8.68c-.011-.032-.02-.063-.033-.094a.997.997 0 0 0-.196-.293l-6-6a.997.997 0 0 0-.293-.196c-.03-.014-.062-.022-.094-.033a.991.991 0 0 0-.259-.051C13.04 2.011 13.021 2 13 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V9c0-.021-.011-.04-.013-.062a.99.99 0 0 0-.05-.258zM16.586 8H14V5.414L16.586 8zM6 20V4h6v5a1 1 0 0 0 1 1h5l.002 10H6z"></path>
                              </svg>
                              <span className={header ? "side-menu__label d-none" : "side-menu__label"}>Merchants Report</span>
                           </Link>
                        </li>
                        <li className="slide is-expanded">
                           <Link className={props.locationName == props.prefix + '/settlement' ? "side-menu__item active" : "side-menu__item"} to={props.prefix + '/settlement'}>
                              <svg xmlns="http://www.w3.org/2000/svg" className={header ? "side-menu__icon res_icon" : "side-menu__icon"} width="24" height="24" viewBox="0 0 24 24">
                                 <path d="M19.937 8.68c-.011-.032-.02-.063-.033-.094a.997.997 0 0 0-.196-.293l-6-6a.997.997 0 0 0-.293-.196c-.03-.014-.062-.022-.094-.033a.991.991 0 0 0-.259-.051C13.04 2.011 13.021 2 13 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V9c0-.021-.011-.04-.013-.062a.99.99 0 0 0-.05-.258zM16.586 8H14V5.414L16.586 8zM6 20V4h6v5a1 1 0 0 0 1 1h5l.002 10H6z"></path>
                              </svg>
                              <span className={header ? "side-menu__label d-none" : "side-menu__label"}>Settlement Report</span>
                           </Link>
                        </li>
                        <li className="slide is-expanded">
                           <Link className={props.locationName == props.prefix + '/pendingSettlement' ? "side-menu__item active" : "side-menu__item"} to={props.prefix + '/pendingSettlement'}>
                              <svg xmlns="http://www.w3.org/2000/svg" className={header ? "side-menu__icon res_icon" : "side-menu__icon"} width="24" height="24" viewBox="0 0 24 24">
                                 <path d="M19.937 8.68c-.011-.032-.02-.063-.033-.094a.997.997 0 0 0-.196-.293l-6-6a.997.997 0 0 0-.293-.196c-.03-.014-.062-.022-.094-.033a.991.991 0 0 0-.259-.051C13.04 2.011 13.021 2 13 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V9c0-.021-.011-.04-.013-.062a.99.99 0 0 0-.05-.258zM16.586 8H14V5.414L16.586 8zM6 20V4h6v5a1 1 0 0 0 1 1h5l.002 10H6z"></path>
                              </svg>
                              <span className={header ? "side-menu__label d-none" : "side-menu__label"}>Pending Settlement</span>
                           </Link>
                        </li>
                        {/* <li className="slide is-expanded">
                           <Link className={props.locationName == props.prefix + '/cases' || props.locationName == props.prefix + '/cases-' + props.caseStatus || props.locationName == props.prefix + '/cases-dsa/' + props.dsa_id || props.locationName == props.prefix + '/cases-lender/' + props.lender_id ? "side-menu__item active" : "side-menu__item"} to={props.prefix + '/cases'}>
                              <svg xmlns="http://www.w3.org/2000/svg" className={header?"side-menu__icon res_icon":"side-menu__icon"} width="24" height="24" viewBox="0 0 24 24"> <path d="M0 0h24v24H0V0z" fill="none"></path> <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z"> </path> </svg>
                              <span className={header ? "side-menu__label d-none" : "side-menu__label"}>Cases Report</span>
                           </Link>
                        </li> */}


                        {/* <li className="slide">
                     <Link to="" className="side-menu__item" data-bs-toggle="slide" >
                       <i className="fa-solid fa-database fa-fw side-menu__icon fs-18"></i>
                        <span className={header?"side-menu__label d-none":"side-menu__label"}>Report</span><i className="angle fa fa-chevron-right"></i>
                     </Link>
                     <ul className="slide-menu">
                        <li className="side-menu-label1"><Link to={props.prefix}>Report</Link></li>
                        <li><Link to={props.prefix} className="slide-item"> Cases Report</Link></li>
                        <li><Link to={props.prefix} className="slide-item"> Partner Wise Report</Link></li>
                        <li><Link to={props.prefix} className="slide-item"> Lender Wise Report</Link></li>
                        <li><Link to={props.prefix} className="slide-item"> Disbursed Report</Link></li>
                     </ul>
                  </li> */}
                        {/* <li className="slide is-expanded">
                     <Link className="side-menu__item" to={props.prefix+'/query-builder'}>
                        <i className="fa-regular fa-user fa-fw side-menu__icon fs-18"></i>
                        <span className={header?"side-menu__label d-none":"side-menu__label"}>Query Builder</span>
                     </Link>
                  </li> */}


                        {/* <li className="slide is-expanded">
                           <Link className={props.locationName == props.prefix + '/profile' || props.locationName == props.prefix + '/add-profile' || props.locationName == props.prefix + '/edit-profile/' + props.profile_id ? "side-menu__item active" : "side-menu__item"} to={props.prefix + '/profile'}>
                              <i className={header ? "res_icon fa-regular fa-address-card fa-fw side-menu__icon fs-18" : "fa-regular fa-address-card fa-fw side-menu__icon fs-18"}></i>
                              <span className={header ? "side-menu__label d-none" : "side-menu__label"}>Profile</span>
                           </Link>
                        </li> */}

                        
                        {/* <li className="slide is-expanded">
                           <Link className={props.locationName == props.prefix + '/user' || props.locationName == props.prefix + '/add-user' || props.locationName == props.prefix + '/edit-user/' + props.user_id ? "side-menu__item active" : "side-menu__item"} to={props.prefix + '/user'}>
                              <i className={header?"res_icon fa fa-users side-menu__icon fs-18":"fa fa-users side-menu__icon fs-18"}></i>
                              <span className={header ? "side-menu__label d-none" : "side-menu__label"}>Users</span>
                           </Link>
                        </li> */}
                        {/* <li className="slide is-expanded">
                           <Link className={props.locationName == props.prefix + '/login-log' ? "side-menu__item active" : "side-menu__item"} to={props.prefix + '/login-log'}>
                              <svg xmlns="http://www.w3.org/2000/svg" className={header?"side-menu__icon res_icon":"side-menu__icon"} width="24" height="24" viewBox="0 0 24 24"> <path d="M0 0h24v24H0V0z" fill="none"></path> <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z"> </path> </svg>
                              <span className={header ? "side-menu__label d-none" : "side-menu__label"}>Login Log</span>
                           </Link>
                        </li> */}
                        {/* <li className="slide is-expanded">
                           <Link className={props.locationName == props.prefix + '/notification' ? "side-menu__item active" : "side-menu__item"} to={props.prefix + '/notification'}>
                              <svg xmlns="http://www.w3.org/2000/svg" className={header?"side-menu__icon res_icon":"side-menu__icon"} width="24" height="24" viewBox="0 0 24 24"> <path d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z"> </path> </svg>
                              <span className={header ? "side-menu__label d-none" : "side-menu__label"}>Notification</span>
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
                              <i className={header?"fa-solid fa-gear fa-fw side-menu__icon fs-18 res_icon":"fa-solid fa-gear fa-fw side-menu__icon fs-18"}></i>
                              <span className={header ? "side-menu__label d-none" : "side-menu__label"}>Setting</span><i className="angle fa fa-chevron-right"></i>
                           </Link>
                           <ul className="slide-menu">
                              <li className="side-menu-label1"><Link to={props.prefix}>Setting</Link></li>
                              <li><Link to={props.prefix + '/state'} className="slide-item"> State</Link></li>
                              <li><Link to={props.prefix + '/city'} className="slide-item"> City</Link></li>
                              <li><Link to={props.prefix + '/pincode'} className="slide-item"> Pincode</Link></li>
                              <li><Link to={props.prefix + '/status'} className="slide-item"> Incomplete Status</Link></li>
                           </ul>
                        </li> */}

                     </ul>
                     :

                     <div>

                        <ul className="side-menu app-sidebar3 open" style={{ marginRight: "0px" }}>
                           {/* <li className="side-item side-item-category">Main</li> */}
                           <li className="slide is-expanded" style={dashMenu ? { display: "block" } : { display: "none" }}>
                              <Link className={props.locationName == (props.prefix + '/dashboard' || props.prefix) ? "side-menu__item active" : "side-menu__item"} to={props.prefix + '/dashboard'}>
                                 <svg xmlns="http://www.w3.org/2000/svg" className="side-menu__icon" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z"></path>
                                 </svg>
                                 <span className={header ? "side-menu__label d-none" : "side-menu__label"}>Dashboard</span>
                              </Link>
                           </li>
                           <li className="slide is-expanded" style={partnerMenu ? { display: "block" } : { display: "none" }}>
                              <Link className={props.locationName == props.prefix + '/dsa' ? "side-menu__item active" : "side-menu__item"} to={props.prefix + '/dsa'}>
                                 <svg xmlns="http://www.w3.org/2000/svg" className="side-menu__icon" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M19.937 8.68c-.011-.032-.02-.063-.033-.094a.997.997 0 0 0-.196-.293l-6-6a.997.997 0 0 0-.293-.196c-.03-.014-.062-.022-.094-.033a.991.991 0 0 0-.259-.051C13.04 2.011 13.021 2 13 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V9c0-.021-.011-.04-.013-.062a.99.99 0 0 0-.05-.258zM16.586 8H14V5.414L16.586 8zM6 20V4h6v5a1 1 0 0 0 1 1h5l.002 10H6z"></path>
                                 </svg>
                                 <span className={header ? "side-menu__label d-none" : "side-menu__label"}>Partner Report</span>
                              </Link>
                           </li>
                           <li className="slide is-expanded" style={lenderMenu ? { display: "block" } : { display: "none" }}>
                              <Link className={props.locationName == props.prefix + '/lender' ? "side-menu__item active" : "side-menu__item"} to={props.prefix + '/lender'}>
                                 <svg xmlns="http://www.w3.org/2000/svg" className="side-menu__icon" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M19.937 8.68c-.011-.032-.02-.063-.033-.094a.997.997 0 0 0-.196-.293l-6-6a.997.997 0 0 0-.293-.196c-.03-.014-.062-.022-.094-.033a.991.991 0 0 0-.259-.051C13.04 2.011 13.021 2 13 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V9c0-.021-.011-.04-.013-.062a.99.99 0 0 0-.05-.258zM16.586 8H14V5.414L16.586 8zM6 20V4h6v5a1 1 0 0 0 1 1h5l.002 10H6z"></path>
                                 </svg>
                                 <span className={header ? "side-menu__label d-none" : "side-menu__label"}>Lenders Report</span>
                              </Link>
                           </li>
                           <li className="slide is-expanded" style={lenderMenu ? { display: "block" } : { display: "none" }}>
                              <Link className={props.locationName == props.prefix + '/merchant' ? "side-menu__item active" : "side-menu__item"} to={props.prefix + '/merchant'}>
                                 <svg xmlns="http://www.w3.org/2000/svg" className="side-menu__icon" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M19.937 8.68c-.011-.032-.02-.063-.033-.094a.997.997 0 0 0-.196-.293l-6-6a.997.997 0 0 0-.293-.196c-.03-.014-.062-.022-.094-.033a.991.991 0 0 0-.259-.051C13.04 2.011 13.021 2 13 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V9c0-.021-.011-.04-.013-.062a.99.99 0 0 0-.05-.258zM16.586 8H14V5.414L16.586 8zM6 20V4h6v5a1 1 0 0 0 1 1h5l.002 10H6z"></path>
                                 </svg>
                                 <span className={header ? "side-menu__label d-none" : "side-menu__label"}>Merchant Report</span>
                              </Link>
                           </li>
                           <li className="slide is-expanded" style={caseMenu ? { display: "block" } : { display: "none" }}>
                              <Link className={props.locationName == props.prefix + '/cases' || props.locationName == props.prefix + '/cases-' + props.caseStatus || props.locationName == props.prefix + '/cases-dsa/' + props.dsa_id || props.locationName == props.prefix + '/cases-lender/' + props.lender_id ? "side-menu__item active" : "side-menu__item"} to={props.prefix + '/cases'}>
                                 <svg xmlns="http://www.w3.org/2000/svg" className="side-menu__icon" width="24" height="24" viewBox="0 0 24 24"> <path d="M0 0h24v24H0V0z" fill="none"></path> <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z"> </path> </svg>
                                 <span className={header ? "side-menu__label d-none" : "side-menu__label"}>Cases Report</span>
                              </Link>
                           </li>

                           {/* <li className="slide">
                     <Link to="" className="side-menu__item" data-bs-toggle="slide" >
                       <i className="fa-solid fa-database fa-fw side-menu__icon fs-18"></i>
                        <span className={header?"side-menu__label d-none":"side-menu__label"}>Report</span><i className="angle fa fa-chevron-right"></i>
                     </Link>
                     <ul className="slide-menu">
                        <li className="side-menu-label1"><Link to={props.prefix}>Report</Link></li>
                        <li><Link to={props.prefix} className="slide-item"> Cases Report</Link></li>
                        <li><Link to={props.prefix} className="slide-item"> Partner Wise Report</Link></li>
                        <li><Link to={props.prefix} className="slide-item"> Lender Wise Report</Link></li>
                        <li><Link to={props.prefix} className="slide-item"> Disbursed Report</Link></li>
                     </ul>
                  </li> */}
                           {/* <li className="slide is-expanded">
                     <Link className="side-menu__item" to={props.prefix+'/query-builder'}>
                        <i className="fa-regular fa-user fa-fw side-menu__icon fs-18"></i>
                        <span className={header?"side-menu__label d-none":"side-menu__label"}>Query Builder</span>
                     </Link>
                  </li> */}
                           <li className="slide is-expanded" style={profileMenu ? { display: "block" } : { display: "none" }}>
                              <Link className={props.locationName == props.prefix + '/profile' || props.locationName == props.prefix + '/add-profile' || props.locationName == props.prefix + '/edit-profile/' + props.profile_id ? "side-menu__item active" : "side-menu__item"} to={props.prefix + '/profile'}>
                                 <i className="fa-regular fa-address-card fa-fw side-menu__icon fs-18"></i>
                                 <span className={header ? "side-menu__label d-none" : "side-menu__label"}>Profile</span>
                              </Link>
                           </li>
                           <li className="slide is-expanded" style={profileMenu ? { display: "block" } : { display: "none" }}>
                              <Link className={props.locationName == props.prefix + '/user' || props.locationName == props.prefix + '/add-user' || props.locationName == props.prefix + '/edit-user/' + props.user_id ? "side-menu__item active" : "side-menu__item"} to={props.prefix + '/user'}>
                                 <i className=" fa fa-users side-menu__icon fs-18"></i>
                                 <span className={header ? "side-menu__label d-none" : "side-menu__label"}>Users</span>
                              </Link>
                           </li>
                           <li className="slide is-expanded" style={logMenu ? { display: "block" } : { display: "none" }}>
                              <Link className={props.locationName == props.prefix + '/login-log' ? "side-menu__item active" : "side-menu__item"} to={props.prefix + '/login-log'}>
                                 <svg xmlns="http://www.w3.org/2000/svg" className="side-menu__icon" width="24" height="24" viewBox="0 0 24 24"> <path d="M0 0h24v24H0V0z" fill="none"></path> <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z"> </path> </svg>
                                 <span className={header ? "side-menu__label d-none" : "side-menu__label"}>Login Log</span>
                              </Link>
                           </li>
                           <li className="slide is-expanded" style={notificationMenu ? { display: "block" } : { display: "none" }}>
                              <Link className={props.locationName == props.prefix + '/notification' ? "side-menu__item active" : "side-menu__item"} to={props.prefix + '/notification'}>
                                 <svg xmlns="http://www.w3.org/2000/svg" className="side-menu__icon" width="24" height="24" viewBox="0 0 24 24"> <path d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z"> </path> </svg>
                                 <span className={header ? "side-menu__label d-none" : "side-menu__label"}>Notification</span>
                              </Link>
                           </li>
                           {/* <li className="slide is-expanded">
                     <Link className="side-menu__item" to={props.prefix}>
                        <i className="fa-regular fa-thumbs-up fa-fw side-menu__icon fs-18"></i>
                        <span className={header?"side-menu__label d-none":"side-menu__label"}>Follow Up</span>
                     </Link>
                  </li> */}
                           <li className="slide" style={settingMenu ? { display: "block" } : { display: "none" }}>
                              <Link className="side-menu__item" data-bs-toggle="slide" to="/">
                                 <i className="fa-solid fa-gear fa-fw side-menu__icon fs-18"></i>
                                 <span className={header ? "side-menu__label d-none" : "side-menu__label"}>Setting</span><i className="angle fa fa-chevron-right"></i>
                              </Link>
                              <ul className="slide-menu" style={settingMenu ? { display: "block" } : { display: "none" }}>
                                 <li className="side-menu-label1"><Link to={props.prefix}>Setting</Link></li>
                                 <li><Link to={props.prefix + '/state'} className="slide-item"> State</Link></li>
                                 <li><Link to={props.prefix + '/city'} className="slide-item"> City</Link></li>
                                 <li><Link to={props.prefix + '/pincode'} className="slide-item"> Pincode</Link></li>
                                 <li><Link to={props.prefix + '/status'} className="slide-item"> Incomplete Status</Link></li>
                              </ul>
                           </li>

                        </ul>

                     </div>


                  }
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