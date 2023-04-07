import './App.css';
import { Navigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Login from './admin/login'
import Index from './admin/index'

import LenderLogin from './lender/auth/login'
import LenderIndex from './lender/index'
import LenderRegistration from './lender/auth/registration'


import EmployerLogin from './employer/auth/login'
import EmployerIndex from './employer/index'
import EmployerRegistration from './employer/auth/registration'

import MerchantLogin from './merchant/auth/login'
import MerchantIndex from './merchant/index'
import MerchantRegistration from './merchant/auth/registration'




import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  console.log(process.env.REACT_APP_ADMIN_PRIFIX);
  return (
    <BrowserRouter basename="/thirdroc">
      {/* <ScrollToTop> */}
      <Toaster position="top-right" reverseOrder={false} />
      <Routes >

        {/* ADMIN ROUTE */}
        <Route path={process.env.REACT_APP_ADMIN_PRIFIX} element={<AdminRequireWithOutAuth> <Login /> </AdminRequireWithOutAuth>} />

        <Route path={process.env.REACT_APP_ADMIN_PRIFIX + "/login"} element={<AdminRequireWithOutAuth> <Login /> </AdminRequireWithOutAuth>} />
        {["/dashboard", "/dsa", "/edit_dsa/:user_id", "/employer","/settlement","/pendingSettlement","/addSettle/:id", "/merchant", "/employee_detail/:id", "/lender", "/edit_lender/:user_id", "/cases", "/cases/:loan_id/:customer_id/:loan_type/:dsa_id/:file_id", "/cases-:caseStatus", "/cases-dsa/:dsa_id", "/cases-lender/:lender_id", "/profile", "/add-profile", "/edit-profile/:profile_id", "/user", "/add-user", "/edit-user/:user_id", "/users", "/loanPoint", "/query-builder", "/setting", "/login-log", "/notification", "/state", "/city", "/editCity/:id", "/pincode", "/status", "/adminprofile", "/changepassword", "/add_cases", , "/cases-:caseStatus"].map((path, index) =>
          <Route path={'admin' + path} element={<AdminRequireAuth><Index routePath={'admin' + path} /></AdminRequireAuth>} key={'oute' + index} />
        )}

        <Route path={process.env.REACT_APP_ADMIN_PRIFIX} element={<AdminRequireWithOutAuth> <Login /> </AdminRequireWithOutAuth>} />
        <Route path={process.env.REACT_APP_ADMIN_PRIFIX + "/login"} element={<AdminRequireWithOutAuth> <Login /> </AdminRequireWithOutAuth>} />
        {["/dashboard", "/dsa", "/edit_dsa/:user_id", "/lender","/settlement", "/edit_lender/:user_id", "/cases", "/cases/:loan_id/:customer_id/:loan_type/:dsa_id/:file_id", "/cases-:caseStatus", "/cases-dsa/:dsa_id", "/cases-lender/:lender_id", "/profile", "/add-profile", "/edit-profile/:profile_id", "/user", "/add-user", "/edit-user/:user_id", "/query-builder", "/setting", "/login-log", "/notification", "/state", "/city", "/editCity/:id", "/pincode", "/status", "/adminprofile", "/changepassword", "/add_cases", , "/cases-:caseStatus"].map((path, index) =>
          <Route path={'users' + path} element={<AdminRequireAuth><Index routePath={'users' + path} /></AdminRequireAuth>} key={'oute' + index} />
        )}

        {/* LENDER ROUTE */}
        <Route path={process.env.REACT_APP_LENDER_PRIFIX} element={<LenderRequireWithOutAuth> <LenderLogin /> </LenderRequireWithOutAuth>} />
        <Route path={process.env.REACT_APP_LENDER_PRIFIX + "/login"} element={<LenderRequireWithOutAuth> <LenderLogin /> </LenderRequireWithOutAuth>} />
        <Route path={process.env.REACT_APP_LENDER_PRIFIX + "/registration"} element={<LenderRequireWithOutAuth> <LenderRegistration /> </LenderRequireWithOutAuth>} />
        {["/dashboard", "/profile","/emi","/emi_paid", "/dues_list","/changePassword/:id", "/publicurl", "/transactions", "/employee_detail/:id", "/employee_setlimit/:id/:status", "/employee_edit/:id", "/case", "/report", "/users", "/add_users", "/edit_user/:user_id", "/api", "/add_cases", "/roles_permission", "/add_role", "/edit_role/:profile_id", "/case/:loan_id/:customer_id/:loan_type/:lender_id/:file_id", "/case/:file_id", "/case-:caseStatus", "/editProfile", "/editProfile/:user_id", "/employer", "/employee"].map((path, index) =>
          <Route path={'lender' + path} element={<LenderRequireAuth><LenderIndex routePath={'lender' + path} /></LenderRequireAuth>} key={'oute' + index} />
        )}

        {/* EMPLOYER ROUTE */}
        <Route path={process.env.REACT_APP_EMPLOYER_PRIFIX} element={<EmployerRequireWithOutAuth> <EmployerLogin /> </EmployerRequireWithOutAuth>} />
        <Route path={process.env.REACT_APP_EMPLOYER_PRIFIX + "/login"} element={<EmployerRequireWithOutAuth> <EmployerLogin /> </EmployerRequireWithOutAuth>} />
        <Route path={process.env.REACT_APP_EMPLOYER_PRIFIX + "/registration"} element={<EmployerRequireWithOutAuth> <EmployerRegistration /> </EmployerRequireWithOutAuth>} />
        {["/dashboard", "/profile", "/changePassword/:id", "/publicurl", "/case", "/employees", "/reports", "/settings","/upload_employees", "/add_employer", "/employee_detail/:id", "/employee_edit/:id", "/add_users", "/editProfile/:id"].map((path, index) =>
          <Route path={process.env.REACT_APP_EMPLOYER_PRIFIX + path} element={<EmployerRequireAuth><EmployerIndex routePath={'employer' + path} /></EmployerRequireAuth>} key={'oute' + index} />
        )}
        {/* {["/dashboard", "/profile", "/publicurl", "/case", "/report", "/users", "/add_users", "/edit_user/:user_id", "/api", "/add_cases", "/roles_permission", "/add_role", "/edit_role/:profile_id", "/case/:loan_id/:customer_id/:loan_type/:lender_id/:file_id", "/case/:file_id", "/case-:caseStatus", "/editProfile", "/editProfile/:user_id", "/changePassword/:user_id"].map((path, index) =>
          <Route path={'employer' + path} element={<EmployerRequireAuth><EmployerIndex routePath={'employer' + path} /></EmployerRequireAuth>} key={'oute' + index} />
        )} */}

        {/* MERCHANT ROUTE */}
        <Route path={process.env.REACT_APP_MARCHNT_PRIFIX} element={<MerchantRequireWithOutAuth> <MerchantLogin /> </MerchantRequireWithOutAuth>} />
        <Route path={process.env.REACT_APP_MARCHNT_PRIFIX + "/login"} element={<MerchantRequireWithOutAuth> <MerchantLogin /> </MerchantRequireWithOutAuth>} />
        <Route path={process.env.REACT_APP_MARCHNT_PRIFIX + "/registration"} element={<MerchantRequireWithOutAuth> <MerchantRegistration /> </MerchantRequireWithOutAuth>} />
        {["/dashboard", "/profile", "/transctions","/settlement","/store_list","/add_store" ,"/qr_code", "/publicurl", "/case", "/report", "/users", "/add_users", "/edit_user/:user_id", "/api", "/add_cases", "/roles_permission", "/add_role", "/edit_role/:profile_id", "/case/:loan_id/:customer_id/:loan_type/:lender_id/:file_id", "/case/:file_id", "/case-:caseStatus", "/editProfile", "/editProfile/:user_id", "/changePassword/:user_id"].map((path, index) =>
          <Route path={process.env.REACT_APP_MARCHNT_PRIFIX + path} element={<MerchantRequireAuth><MerchantIndex routePath={'merchant' + path} /></MerchantRequireAuth>} key={'oute' + index} />
        )}

        {/* DSA ROUTE */}
        {/* <Route path='/dsa' element={<DsaRequireWithOutAuth> <DsaLogin /> </DsaRequireWithOutAuth>} />
        <Route path='/dsa/login' element={<DsaRequireWithOutAuth> <DsaLogin /> </DsaRequireWithOutAuth>} />
        <Route path='/dsa/register' element={<DsaRequireWithOutAuth> <DsaRegister /> </DsaRequireWithOutAuth>} />

        {["/dashboard", "/report", "/qr_code", "/api", "/users", "/loanPoint", "/add_users", "/edit_user/:user_id", "/add_loanPoint", "/upload_cases", "/edit_loanPoint/:user_id", "/roles_permission", "/add_role", "/edit_role/:profile_id", "/profile", "/editProfile", "/editProfile/:user_id", "/changePassword/:user_id", "/cases", "/cases/:loan_id/:customer_id/:loan_type/:dsa_id/:file_id", "/cases/:file_id", "/cases", "/cases-:caseStatus", "/add_cases", "/partner", "/publicCasesUrl"].map((path, index) =>

          <Route path={'dsa' + path} element={<DsaRequireAuth><DsaIndex routePath={'dsa' + path} /></DsaRequireAuth>} key={'oute' + index} />
        )}

        <Route path='/dsa' element={<DsaRequireWithOutAuth> <DsaLogin /> </DsaRequireWithOutAuth>} />
        <Route path='/dsa/login' element={<DsaRequireWithOutAuth> <DsaLogin /> </DsaRequireWithOutAuth>} />
        <Route path='/dsa/register' element={<DsaRequireWithOutAuth> <DsaRegister /> </DsaRequireWithOutAuth>} />

        {["/dashboard", "/report", "/qr_code", "/api", "/users", "/add_users", "/upload_cases", "/edit_user/:user_id", "/roles_permission", "/add_role", "/edit_role/:profile_id", "/profile", "/editProfile", "/editProfile/:user_id", "/changePassword/:user_id", "/cases", "/cases/:loan_id/:customer_id/:loan_type/:dsa_id/:file_id", "/cases/:file_id", "/cases", "/cases-:caseStatus", "/add_cases", "/partner", "/publicCasesUrl"].map((path, index) =>

          <Route path={'users' + path} element={<DsaRequireAuth><DsaIndex routePath={'users' + path} /></DsaRequireAuth>} key={'oute' + index} />
        )}

        <Route path='/' element={<RequireWithOutAuth> <CustomerLogin /> </RequireWithOutAuth>} />
        <Route path='/:dsa_name/:user_name' element={<RequireWithOutAuth> <CustomerLogin /> </RequireWithOutAuth>} />
        <Route path='/customer' element={<RequireWithOutAuth> <CustomerLogin /> </RequireWithOutAuth>} /> */}

      </Routes>

      {/* </ScrollToTop> */}
    </BrowserRouter>
  );
}

export default App;


function AdminRequireWithOutAuth({ children }) {
  let adminData = localStorage.getItem("admin");
  var authed = JSON.parse(adminData)?.admin_token !== undefined && JSON.parse(adminData)?.admin_token !== null && JSON.parse(adminData)?.admin_token !== '' ? true : false;
  if (authed === true) {
    return <Navigate to={"/" + JSON.parse(adminData)?.user_type + "/dashboard"} replace />
  } else {
    return children
  }


}

// function DsaRequireWithOutAuth({ children }) {
//   let dsaData = localStorage.getItem("dsa");
//   var authed = JSON.parse(dsaData)?.dsa_token !== undefined && JSON.parse(dsaData)?.dsa_token !== null && JSON.parse(dsaData)?.dsa_token !== '' ? true : false;
//   if (authed === true) {
//     return <Navigate to={"/" + JSON.parse(dsaData)?.user_type + "/dashboard"} replace />
//   } else {
//     return children
//   }


// }

function LenderRequireWithOutAuth({ children }) {
  let lenderData = localStorage.getItem("lender");
  var authed = JSON.parse(lenderData)?.lender_token !== undefined && JSON.parse(lenderData)?.lender_token !== null && JSON.parse(lenderData)?.lender_token !== '' ? true : false;
  if (authed === true) {
    return <Navigate to={"/" + JSON.parse(lenderData)?.user_type + "/dashboard"} replace />
  } else {
    return children
  }
}

function RequireWithOutAuth({ children }) {
  var authed = localStorage.getItem("token") !== undefined && localStorage.getItem("token") !== null && localStorage.getItem("token") !== '' ? true : false;
  if (authed === true) {
    return <Navigate to={"/" + localStorage.getItem("user_type") + "/dashboard"} replace />
  } else {
    return children
  }
}

function AdminRequireAuth({ children }) {
  let adminData = localStorage.getItem("admin");
  var authed = JSON.parse(adminData)?.admin_token !== undefined && JSON.parse(adminData)?.admin_token !== null && JSON.parse(adminData)?.admin_token !== '' ? true : false;
  return authed === true ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
}

// function DsaRequireAuth({ children }) {
//   let dsaData = localStorage.getItem("dsa");
//   var authed = JSON.parse(dsaData)?.dsa_token !== undefined && JSON.parse(dsaData)?.dsa_token !== null && JSON.parse(dsaData)?.dsa_token !== '' ? true : false;
//   return authed === true ? (
//     children
//   ) : (
//     <Navigate to="/" replace />
//   );
// }

function LenderRequireAuth({ children }) {
  let lenderData = localStorage.getItem("lender");
  var authed = JSON.parse(lenderData)?.lender_token !== undefined && JSON.parse(lenderData)?.lender_token !== null && JSON.parse(lenderData)?.lender_token !== '' ? true : false;
  return authed === true ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
}

// EMPLOYER
function EmployerRequireWithOutAuth({ children }) {
  let employerData = localStorage.getItem("employer");
  var authed = JSON.parse(employerData)?.employer_token !== undefined && JSON.parse(employerData)?.employer_token !== null && JSON.parse(employerData)?.employer_token !== '' ? true : false;
  console.log("🚀 ~ file: App.js:190 ~ EmployerRequireWithOutAuth ~ authed:", authed)
  if (authed === true) {
    return <Navigate to={"/" + JSON.parse(employerData)?.user_type + "/dashboard"} replace />
  } else {
    return children
  }
}

function EmployerRequireAuth({ children }) {
  let employerData = localStorage.getItem("employer");
  var authed = JSON.parse(employerData)?.employer_token !== undefined && JSON.parse(employerData)?.employer_token !== null && JSON.parse(employerData)?.employer_token !== '' ? true : false;
  return authed === true ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
}

// MERCHANT
function MerchantRequireWithOutAuth({ children }) {
  let merchantData = localStorage.getItem("merchant");
  var authed = JSON.parse(merchantData)?.merchant_token !== undefined && JSON.parse(merchantData)?.merchant_token !== null && JSON.parse(merchantData)?.merchant_token !== '' ? true : false;
  if (authed === true) {
    return <Navigate to={"/" + JSON.parse(merchantData)?.user_type + "/dashboard"} replace />
  } else {
    return children
  }
}

function MerchantRequireAuth({ children }) {
  let merchantData = localStorage.getItem("merchant");
  var authed = JSON.parse(merchantData)?.merchant_token !== undefined && JSON.parse(merchantData)?.merchant_token !== null && JSON.parse(merchantData)?.merchant_token !== '' ? true : false;
  return authed === true ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
}

