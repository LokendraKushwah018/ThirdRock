
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';

import Header from './layout/header'
import Footer from './layout/footer'
import Service from './../lenderService';
import Dashboard from './user/dashboard';
//import Profile from './user/profile';
import Profile from './user/profile/profile';
import EditProfile from './user/profile/editProfile';
import ChangePassword from './user/profile/changePassword';
import config from '../config.json';
import AddEmployer from './user/addEmployer';
import EmployeeDetail from './user/employeeDetail';
import EditEmployer from './user/editEmployee';
import Employee from './user/epmloyee';
import Settings from './user/Settings';
import Reports from './user/Reports';
import UploadEmployess from './user/uploadEmployees';
import { UseAppContext } from '../Context/AppContext';


const api = new Service();
const Index = (props) => {
    const prefix = process.env.REACT_APP_EMPLOYER_PRIFIX;
    const { id } = useParams();
   const { header } = UseAppContext();

    // const { profile_id, user_id, file_id, caseStatus, customer_id, loan_id, loan_type, dsa_id, lender_id, id } = useParams();
    const navigate = useNavigate();
    // const [prfofileData, setprfofileData] = useState('');
    const [locationName, setlocationName] = useState(prefix + '/dashboard');
    const location = useLocation();
    useEffect(() => {
        setlocationName(location.pathname)
    }, [location.pathname])


    // useEffect(() => {
    //     getUserDetail()
    // }, [])

    const getUserDetail = () => {
        // console.log(role_id)
        // api.postApi('getUserDetail').then(response => {
        //     if (response.status===true) {
        //         setprfofileData(response.data)
        //     }
        // }).catch(error => {

        // });
    }

    const logout = () => {
        navigate('/login')
    }
    console.log(locationName);
    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div className="page">
                <div className="page-main">
                    <Header prefix={prefix} />
                    {/* <Header prefix={prefix} profile_id={profile_id} caseStatus={caseStatus} dsa_id={dsa_id} lender_id={lender_id} user_id={user_id} /> */}
                    <div className={header ?"app_content_res app-content main-content":"app-content main-content"}>
                        <div className="side-app">
                            {
                                locationName == prefix + "/dashboard" ? <Dashboard />
                                    : locationName == prefix + "/profile" ? <Profile />
                                        : locationName == prefix + "/profile" ? <Profile />
                                            : locationName == prefix + `/editProfile/${id}` ? <EditProfile />
                                                : locationName == prefix + `/changePassword/${id}` ? <ChangePassword />
                                                    : locationName == prefix + "/employees" ? <Employee />
                                                        : locationName == prefix + "/reports" ? <Reports />
                                                            : locationName == prefix + "/settings" ? <Settings />
                                                                : locationName == prefix + "/add_employer" ? <AddEmployer />
                                                                    : locationName == prefix + `/employee_detail/${id}` ? <EmployeeDetail />
                                                                        : locationName == prefix + `/employee_edit/${id}` ? <EditEmployer />
                                                                        : locationName == prefix + `/upload_employees` ? <UploadEmployess/>
                                                                        
                                                                            : ""
                            }
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>

    )



}

export default Index