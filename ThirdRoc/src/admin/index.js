
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';

import Header from './layout/header'
import Footer from './layout/footer'
import Service from './../adminService';
import Dashboard from './dashboard';
import Lender from './lender';
import EditLender from './lender/editLender';
// import Cases from './cases';
// import CasesDetail from './cases/detail';

import Profile from './profile';
import AddEditProfile from './profile/addEditProfile';
import Users from './users';
import AddEditUser from './users/addEditUser';
import UserReport from './userReport/index';
import AddEditUsersReport from './userReport/editUser';

import QueryBuilder from './querybuilder';
import LoginLog from './common/loginlog';
import Notification from './common/notification';
import State from './setting/state';
import City from './setting/city';
import Pincode from './setting/pincode';
import Status from './setting/status';
import EditCity from './setting/editCity';
import AdminProfile from './setting/adminprofile';
import ChangePassword from './setting/changepassword';

import config from '../config.json';
import Employer from './Employer/Employer';
import EmployeeDetail from '../admin/Employer/EmployerDetail';
import { UseAppContext } from '../Context/AppContext';
import Merchant from './Merchant/Merchant';
import Settlement from './settlement/settlement';
import PendingSettlement from './pendingSettlement/pendingSettlement';
import AddSettlement from './pendingSettlement/addSettlement';


const api = new Service();
const Index = (props) => {
    const prefix = process.env.REACT_APP_ADMIN_PRIFIX;
    const { profile_id, user_id, caseStatus, loan_id, dsa_id, lender_id, id, file_id, customer_id, loan_type } = useParams();
    const navigate = useNavigate();
    const { header } = UseAppContext();

    // const [prfofileData, setprfofileData] = useState('');
    const [locationName, setlocationName] = useState('');
    const location = useLocation();
    useEffect(() => {
        console.log(location.pathname)
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
                    <Header prefix={prefix} locationName={locationName} profile_id={profile_id} caseStatus={caseStatus} dsa_id={dsa_id} lender_id={lender_id} user_id={user_id} />

                    <div className={header ? "app_content_res app-content main-content" : "app-content main-content"}>
                        <div className="side-app">
                            {locationName == prefix + '/dashboard' || locationName == prefix ?
                                <Dashboard api={api} toast={toast} prefix={prefix} />
                                // : locationName == prefix + '/dsa' ?
                                //     <Dsa api={api} toast={toast} config={config} prefix={prefix} user_id={user_id} />
                                //     : locationName == prefix + '/edit_dsa/' + user_id ?
                                // <EditDsa api={api} toast={toast} config={config} prefix={prefix} />
                                : locationName == prefix + '/users' ?
                                    <UserReport api={api} toast={toast} config={config} prefix={prefix} user_id={user_id} />
                                    : locationName == prefix + '/edit_users/' + user_id ?
                                        <AddEditUsersReport api={api} toast={toast} config={config} prefix={prefix} />
                                        : locationName == prefix + '/employer' ?
                                            <Employer api={api} toast={toast} config={config} prefix={prefix} />
                                            : locationName == prefix + '/employee_detail/' + id ?
                                                <EmployeeDetail api={api} toast={toast} config={config} prefix={prefix} />
                                                : locationName == prefix + '/lender' ?
                                                    <Lender api={api} toast={toast} config={config} prefix={prefix} />
                                                    : locationName == prefix + '/merchant' ?
                                                        <Merchant api={api} toast={toast} config={config} prefix={prefix} />
                                                        : locationName == prefix + '/edit_lender/' + user_id ?
                                                            <EditLender api={api} toast={toast} config={config} prefix={prefix} user_id={user_id} />
                                                            : locationName == prefix + '/cases' || locationName == prefix + '/cases-' + caseStatus || locationName == prefix + '/cases-dsa/' + dsa_id || locationName == prefix + '/cases-lender/' + lender_id ?
                                                                <Profile api={api} toast={toast} config={config} prefix={prefix} />
                                                                : locationName == prefix + '/add-profile' || locationName == prefix + '/edit-profile/' + profile_id ?
                                                                    <AddEditProfile api={api} toast={toast} config={config} prefix={prefix} profile_id={profile_id} />
                                                                    : locationName == prefix + '/user' ?
                                                                        <Users api={api} toast={toast} config={config} prefix={prefix} />
                                                                        : locationName == prefix + '/add-user' || locationName == prefix + '/edit-user/' + user_id ?
                                                                            <AddEditUser api={api} toast={toast} config={config} prefix={prefix} user_id={user_id} />
                                                                            : locationName == prefix + '/query-builder' ?
                                                                                <QueryBuilder api={api} toast={toast} config={config} prefix={prefix} />
                                                                                : locationName == prefix + '/login-log' ?
                                                                                    <LoginLog api={api} toast={toast} config={config} prefix={prefix} />
                                                                                    : locationName == prefix + '/notification' ?
                                                                                        <Notification api={api} toast={toast} config={config} prefix={prefix} />
                                                                                        : locationName == prefix + '/state' ?
                                                                                            <State api={api} toast={toast} config={config} prefix={prefix} />
                                                                                            : locationName == prefix + '/city' ?
                                                                                                <City api={api} toast={toast} config={config} prefix={prefix} />
                                                                                                : locationName == prefix + '/pincode' ?
                                                                                                    <Pincode api={api} toast={toast} config={config} prefix={prefix} />
                                                                                                    : locationName == prefix + '/status' ?
                                                                                                        <Status api={api} toast={toast} config={config} prefix={prefix} />
                                                                                                        : locationName == prefix + '/editCity' + id ?
                                                                                                            <EditCity api={api} toast={toast} config={config} prefix={prefix} id={id} />
                                                                                                            : locationName == prefix + '/adminprofile' ?
                                                                                                                <AdminProfile api={api} toast={toast} config={config} prefix={prefix} />
                                                                                                                : locationName == prefix + '/changepassword' ?
                                                                                                                    <ChangePassword api={api} toast={toast} config={config} prefix={prefix} />
                                                                                                                    : locationName == prefix + '/settlement' ?
                                                                                                                        <Settlement api={api} toast={toast} config={config} prefix={prefix} />
                                                                                                                        : locationName == prefix + '/pendingSettlement' ?
                                                                                                                            <PendingSettlement api={api} toast={toast} config={config} prefix={prefix} />
                                                                                                                            : locationName == prefix + '/addSettle/' + id ?
                                                                                                                                <AddSettlement api={api} toast={toast} config={config} prefix={prefix} user_id={user_id} />
                                                                                                                                : ''}

                        </div>
                    </div>


                    <Footer />
                </div>
            </div>
        </>

    )



}

export default Index