
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
import Transctions from './user/Transctions';
import EditProfile from './user/profile/editProfile';
import ChangePassword from './user/profile/changePassword';
import config from '../config.json';
import QRCode from './user/QRCode';
import Settlement from './user/settlement';
import StoreList from './user/store/storeList';
import AddStore from './user/store/addStore';
import { UseAppContext } from '../Context/AppContext';


const api = new Service();
const Index = (props) => {
    const prefix = process.env.REACT_APP_MARCHNT_PRIFIX;
    // const { role_id,permission_id } = useParams();
    const { profile_id, user_id, file_id, caseStatus, customer_id, loan_id, loan_type, dsa_id, lender_id, id } = useParams();
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
                                <Dashboard api={api} toast={toast} prefix={prefix} />
                                // : locationName == prefix + '/profile' ?
                                //     <Profile api={api} toast={toast} config={config} prefix={prefix} />
                                : locationName == prefix + '/profile' ?
                                    <Profile api={api} toast={toast} config={config} prefix={prefix} />
                                    : locationName == prefix + '/transctions' ?
                                        <Transctions api={api} toast={toast} config={config} prefix={prefix} />
                                        : locationName == prefix + '/settlement' ?
                                            <Settlement api={api} toast={toast} config={config} prefix={prefix} />
                                            : locationName == prefix + '/store_list' ?
                                                <StoreList api={api} toast={toast} config={config} prefix={prefix} />
                                                : locationName == prefix + '/add_store' ?
                                                    <AddStore api={api} toast={toast} config={config} prefix={prefix} />
                                                    : locationName == prefix + '/qr_code' ?
                                                        <QRCode api={api} toast={toast} config={config} prefix={prefix} />
                                                        : locationName == prefix + '/editProfile/' + user_id ?
                                                            <EditProfile api={api} toast={toast} config={config} prefix={prefix} user_id={user_id} />
                                                            : locationName == prefix + '/changePassword/' + user_id ?
                                                                <ChangePassword api={api} toast={toast} config={config} prefix={prefix} />
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