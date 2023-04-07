
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { useFormik } from 'formik';
import * as yup from 'yup';
const AddEditUser = (props) => {

	useEffect(() => {
		getProfileList();
	}, [])
	const navigate = useNavigate();
	const [loading, setloading] = useState(false);
	const [dataArray, setDataArray] = useState([]);
	const [profileArray, setProfileArray] = useState([]);
	const [permission, setPermission] = useState([]);
	const [emailError, setEmailError] = useState([]);
	const [mobileNumberError, setMobileNumber] = useState([]);

	let arrayData = [];

	// const getList = () => {
	// 	setloading(true)
	// 	props.api.getApi('admin/dsaAll', {}).then(response => {
	// 		setDataArray(response.data);
	// 		setloading(false)
	// 		getProfileList()
	// 	}).catch(error => {
	// 		setloading(false)
	// 		props.toast.error(error.message);
	// 	});
	// }

	const getProfileList = () => {
		setloading(true)
		props.api.getApi('lender/profileAll', {}).then(response => {
			setProfileArray(response.data);
			setloading(false)
		}).catch(error => {
			setloading(false)
			props.toast.error(error.message);
		});
	}

   const regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
   const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

	const form = useFormik({
		initialValues: {
			full_name: "",
			email: "",
			mobile_number: "",
			address: "",
			pan_number: "",
			password: "",
			profile_id: "",
			is_email_validate: false,
			is_mobile_number_validate: false,
		},
		enableReinitialize: true,
		validationSchema: yup.object({
			full_name: yup.string().required('Please enter name').matches(/^[aA-zZ\s]+$/, "Please enter valid name"),
			email: yup.string().email('Please enter a valid email address').required('Please enter email address'),
			password: props.user_id > 0 ? '' : yup.string().required('Please enter password'),
			//mobile_number: yup.number().typeError('you must specify a number').required('Please enter mobile number').min(10,'Mobile number must contain 10 digit value'),
			mobile_number: yup.string().required('Please enter mobile number').min(10, "Mobile number must contain 10 number").max(10, "Mobile number must contain 10 number").matches(phoneRegExp, 'Please enter only number values'),
			address: yup.string().required('Please enter address'),
			pan_number: yup.string().required('Please enter PAN number').matches(regex ,'Please enter valid pan number'),
			profile_id: yup.string().required('Please select profile'),
			is_email_validate: yup.boolean().oneOf([true], ""),
			is_mobile_number_validate: yup.boolean().oneOf([true], "")

		}),
		onSubmit: values => {
			// console.log(values)
			values = {...values,user_id:props.user_id>0?props.user_id:''}
			props.api.postApi('lender/addEditUser', values).then(response => {
				if (response.status === true) {
					props.toast.success(response.message);
					navigate(props.prefix + '/users')
				}
			}).catch(error => {
				props.toast.error(error.message);
			});
		}
	});
	useEffect(() => {
		if (props.user_id != undefined && props.user_id > 0) {
			getDetail(props.user_id)
		}
	}, [])

	
	
	const getDetail = (user_id) => {
        setloading(true)
		setPermission([])
        props.api.postApi('lender/getUserDetail',{user_id:user_id}).then(response => {
            form.setFieldValue('full_name',response.data.full_name)
			form.setFieldValue('email',response.data.email)
			form.setFieldValue('is_email_validate',true)
			
			form.setFieldValue('mobile_number',response.data.mobile_number)
			form.setFieldValue('is_mobile_number_validate',true)
			form.setFieldValue('address',response.data.address)
			form.setFieldValue('pan_number',response.data.pan_number)
			form.setFieldValue('profile_id',response.data.profile_id)
			if(response.partner_list) {
				setPermission(result => [...result, ...response.partner_list]);
		    }
			setloading(false)
        }).catch(error => {   
            setloading(false)
            props.toast.error(error.message);
        }); 
    }  
	const updateNumber = (value, path, digit) => {
		if (value.length > digit)
			value = value.substring(0, digit);
		form.setFieldValue(path, value)
		if (path == 'mobile_number') {
			checkMobileNumber(value)
		}
	}

	const isChecked = (option) => {
		if (permission.length) {
			let secondIndex = permission.findIndex((item) => item == option.user_id);
			if (secondIndex != -1 || secondIndex == 0) {
				return true;
			} else {
				return false;
			}
		}
	}

	const checkEmail = (email) => {
		form.setFieldValue('email', email)
		props.api.postApi('lender/checkEmail', { email: email, user_id: props.user_id > 0 ? props.user_id : '' }).then(response => {
			if (response.status === true) {
				setEmailError('')
				form.setFieldValue('is_email_validate', true)

			}
		}).catch(error => {
			form.setFieldValue('is_email_validate', false)
			setEmailError(error.message);
		});
	}
	const checkMobileNumber = (mobile_number) => {
		props.api.postApi('lender/checkMobileNumber', { mobile_number: mobile_number, user_id: props.user_id > 0 ? props.user_id : '' }).then(response => {
			if (response.status === true) {
				setMobileNumber('')
				form.setFieldValue('is_mobile_number_validate', true)

			}
		}).catch(error => {
			setMobileNumber(error.message);
			form.setFieldValue('is_mobile_number_validate', false)

		});
	}
	return (
		<>
			{dataArray ?
				<div className="main-container container-fluid px-0">
					<div className="page-header">
						<div className="page-leftheader">
							<h4 className="page-title mb-0 text-primary">User Information Edit</h4>
						</div>

					</div>
					<form onSubmit={form.handleSubmit}>

						<div className="row">
							<div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
								<div className="form-group">
									<label className="form-label">Contact person name</label>
									<div className="row g-xs">
										<div className="input-group">
											<input type="text"  {...form.getFieldProps("full_name")} className="form-control" placeholder="Enter Name" />
											{form.touched.full_name && form.errors.full_name ?
												<div className="invalid-feedback" style={{ display: "block" }}>{form.errors.full_name}</div> : ''}
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
								<div className="form-group">
									<label className="form-label">Mobile number</label>
									<div className="row g-xs">
										<div className="input-group">
											<input type="text" value={form.values.mobile_number} onChange={(e) => updateNumber(e.target.value, 'mobile_number', 10)} className="form-control" placeholder="Enter Mobile number" />
											{mobileNumberError == '' && form.touched.mobile_number && form.errors.mobile_number ?
												<div className="invalid-feedback" style={{ display: "block" }}>{form.errors.mobile_number}</div> : ''}
											{mobileNumberError != '' ? <div className="invalid-feedback" style={{ display: "block" }}>{mobileNumberError}</div> : ''}
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
								<div className="form-group">
									<label className="form-label">Email</label>
									<div className="row g-xs">
										<div className="input-group">
											<input type="email" value={form.values.email} className="form-control" placeholder="Enter Email" onChange={(e) => checkEmail(e.target.value)} />
											{form.touched.email && form.errors.email ?
												<div className="invalid-feedback" style={{ display: "block" }}>{form.errors.email}</div> : ''}
											{emailError != '' ? <div className="invalid-feedback" style={{ display: "block" }}>{emailError}</div> : ''}

										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
								<div className="form-group">
									<label className="form-label">PAN number</label>
									<div className="row g-xs">
										<div className="input-group">
											<input type="text" value={form.values.pan_number} onChange={(e) => updateNumber(e.target.value, 'pan_number', 10)} className="form-control" placeholder="Enter Pan no" />
											{form.touched.pan_number && form.errors.pan_number ?
												<div className="invalid-feedback" style={{ display: "block" }}>{form.errors.pan_number}</div> : ''}
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
								<div className="form-group">
									<label className="form-label">Address</label>
									<div className="row g-xs">
										<div className="input-group">
											<input type="text"  {...form.getFieldProps("address")} className="form-control" placeholder="Enter Address" />
											{form.touched.address && form.errors.address ?
												<div className="invalid-feedback" style={{ display: "block" }}>{form.errors.address}</div> : ''}
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
								<div className="form-group">
									<label className="form-label">Permission</label>
									<div className="row g-xs">
										<div className="input-group">
											<select className="form-control" onChange={(e) => form.setFieldValue('profile_id', e.target.value)} value={form.values.profile_id}>
												<option value="">Select Permission</option>
												{profileArray.length > 0 && profileArray.map((option, index) => (
													<option key={index} value={option.id}>{option.title}</option>
												))}
											</select>
											{form.touched.profile_id && form.errors.profile_id ?
												<div className="invalid-feedback" style={{ display: "block" }}>{form.errors.profile_id}</div> : ''}
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
								<div className="form-group">
									<label className="form-label">{props.user_id > 0 ? 'Change Password (Optional)' : 'Password'}</label>
									<div className="row g-xs">
										<div className="input-group">
											<input type="text"  {...form.getFieldProps("password")} className="form-control" placeholder="Enter Password" />
											{form.touched.password && form.errors.password ?
												<div className="invalid-feedback" style={{ display: "block" }}>{form.errors.password}</div> : ''}
										</div>
									</div>
								</div>
							</div>

							{/* <div className="col-lg-12">
								<h6>Partner List</h6>
								<div className="custom-controls-stacked">
									<label className="custom-control custom-checkbox custom-control-md">
										<input type="checkbox" className="custom-control-input" name="selectAllPartner" onChange={(e) => selectAllPartner(e)} />
										<span className="custom-control-label custom-control-label-md">Select All Partners</span>
									</label>
								</div>
							</div>
							<div className="col-lg-12">
								<div className="custom-controls-stacked">
									{dataArray.length > 0 && dataArray.map((option, index) => (
										<label key={index} className="custom-control custom-checkbox d-inline-block me-sm-4" forhtml={'lender' + option.user_id}>
											<input type="checkbox" name="dsaList[]" className="custom-control-input" id={'lender' + option.user_id} value={option.user_id} onChange={(e) => updatePartner(e)} defaultChecked={isChecked(option)} />
											<span className="custom-control-label">{option.company_name}</span>
										</label>
									))}
								</div>
							</div> */}


							<div className="col-md-12">
								<button type="submit" className="btn btn-primary mb-6 w-md mb-1 mt-1"> Save and Update</button>
							</div>


						</div>

					</form>


				</div>
				: ' '}
		</>
	)
}

export default AddEditUser;