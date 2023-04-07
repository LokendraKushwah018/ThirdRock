
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';

import Header from './layout/header'
import Footer from './layout/footer'
import Service from './../lenderService';
import Dashboard from './user/dashboard';
import Profile from './user/profile/profile';
import EditProfile from './user/profile/editProfile';
import ChangePassword from './user/profile/changePassword';
import Report from './user/report';
import config from '../config.json';
import Roles from './user/rolesAndPermission.js/roles'
import Employer from './user/Employer';
import EmployeeDetail from './user//employee/employeeDetail';
import EmployeeSetLimit from './user/EmployeeSetLimit';
import EditEmployer from './user/EditEmployer';
import Employee from './user/employee/Employee';
import Transaction from './user/Transaction';
import Emi from './user/Emi';
import EmiPaid from './user/EmiPaid';
import DuesList from './user/DuesList';
import { UseAppContext } from '../Context/AppContext';


const api = new Service();
const Index = (props) => {

    const prefix = process.env.REACT_APP_LENDER_PRIFIX;
    const { profile_id, user_id, file_id, caseStatus, customer_id, loan_id, loan_type, dsa_id, lender_id, id ,status} = useParams();
    const navigate = useNavigate();
    const { header } = UseAppContext();

    // const [prfofileData, setprfofileData] = useState('');
    const [locationName, setlocationName] = useState(prefix + '/dashboard');
    const location = useLocation();
    useEffect(() => {
        // console.log(location.pathname)
        setlocationName(location.pathname)
    }, [location.pathname])


    useEffect(() => {
        getUserDetail()
    }, [])

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


    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div className="page">
                <div className="page-main">
                    <Header prefix={prefix} profile_id={profile_id} caseStatus={caseStatus} dsa_id={dsa_id} lender_id={lender_id} user_id={user_id} />
                    <div className={header ? "app_content_res app-content main-content" : "app-content main-content"}>
                        <div className="side-app">
                            {locationName == prefix + '/dashboard' || locationName == prefix ?
                                <Dashboard api={api} toast={toast} />
                                // : locationName == prefix + '/profile' ?
                                //     <Profile api={api} toast={toast} config={config} prefix={prefix} />
                                : locationName == prefix + '/profile' ?
                                    <Profile api={api} toast={toast} config={config} prefix={prefix} />
                                    : locationName == prefix + '/editProfile/' + user_id ?
                                        <EditProfile api={api} toast={toast} config={config} prefix={prefix} user_id={user_id} />
                                        : locationName == prefix + '/changePassword/' + id ?
                                            <ChangePassword api={api} toast={toast} config={config} prefix={prefix} />
                                            : locationName == prefix + '/employer' ?
                                                <Employer api={api} toast={toast} config={config} prefix={prefix} caseStatus={caseStatus} lender_id={lender_id} />
                                                : locationName == prefix + '/employee' ?
                                                    <Employee api={api} toast={toast} config={config} prefix={prefix} caseStatus={caseStatus} lender_id={lender_id} />
                                                    : locationName == prefix + '/employee_detail/' + id ?
                                                        <EmployeeDetail api={api} toast={toast} config={config} prefix={prefix} caseStatus={caseStatus} lender_id={lender_id} />
                                                        : locationName == prefix + '/employee_setlimit/' + id +'/'+ status?
                                                            <EmployeeSetLimit api={api} toast={toast} config={config} prefix={prefix} caseStatus={caseStatus} lender_id={lender_id} />
                                                            : locationName == prefix + '/employee_edit/' + id ?
                                                                <EditEmployer api={api} toast={toast} config={config} prefix={prefix} caseStatus={caseStatus} lender_id={lender_id} />
                                                                : locationName == prefix + '/transactions' ?
                                                                    <Transaction />
                                                                    : locationName == prefix + '/emi' ?
                                                                        <Emi api={api} toast={toast} config={config} prefix={prefix} />
                                                                        : locationName == prefix + '/emi_paid' ?
                                                                            <EmiPaid api={api} toast={toast} config={config} prefix={prefix} />
                                                                            : locationName == prefix + '/dues_list' ?
                                                                                <DuesList api={api} toast={toast} config={config} prefix={prefix} />
                                                                                // : locationName == prefix + '/add_role' || locationName == prefix + '/edit_role/' + profile_id ?
                                                                                //     <AddEditPermission api={api} toast={toast} config={config} prefix={prefix} profile_id={profile_id} />
                                                                                : ''
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