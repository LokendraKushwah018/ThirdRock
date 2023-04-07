

import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import $ from 'jquery';

const AddEditPermission = (props) => {

  const [title, settitle] = useState('');
  const [loading, setloading] = useState(false);
  const [dataArray, setDataArray] = useState([]);
  const [permission, setPermission] = useState([]);
  const [subPermission, setSubPermission] = useState([]);
  const [errorTitleMessage, setErrorTitleMessage] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getList();
  }, [])

  const getList = (page = 1) => {
    setloading(true)
    props.api.getApi('dsa/getProfilePermissionList', { page: page - 1, size: 10 }).then(response => {
      setDataArray(response.data);
      setloading(false)
    }).catch(error => {
      setloading(false)
      props.toast.error(error.message);
    });
  }

  useEffect(() => {
    console.log("inside useEffect props.profile_id", props.profile_id);
    if (props.profile_id != undefined && props.profile_id > 0) {
      getProfileDetail(props.profile_id)
    }
  }, [])


  const getProfileDetail = (profile_id) => {
    console.log("inside getProfileDetail");
    console.log("inside getProfileDetail profile_id", profile_id);
    setloading(true)
    props.api.postApi('dsa/getProfile', { profile_id: profile_id }).then(response => {
      settitle(response.data.title)
      if (response.data.permission) {
        JSON.parse(response.data.permission).map(async (item) => {
          await setPermission(result => [...result, item.toString()]);
        })
      }
    
      if (response.data.sub_permission) {
        JSON.parse(response.data.sub_permission).map(async (item) => {
          await setSubPermission(result => [...result, item.toString()]);
        })
      }
      // if (response.data.sub_permission) {
      //   console.log("response.data.sub_permission",response.data.sub_permission);
      //   setSubPermission(result => [...result, ...response?.data?.sub_permission]);
      // }
      setloading(false)
    }).catch(error => {
      setloading(false)
      console.log('error tanmay per');
      props.toast.error(error.message);
    });
  }


  const changeTitle = (value) => {
    settitle(value)
    if (value) {
      if (props.profile_id > 0) {
        props.api.postApi('dsa/editUniqueTitle', { profile_id: props.profile_id, title: value }).then(response => {
          setErrorTitleMessage('')
          settitle(value)
        }).catch(error => {
          setErrorTitleMessage(error.message);
        });
      } else {
        props.api.postApi('dsa/uniqueTitle', { title: value }).then(response => {
         
          if (response.status == true) {
            setErrorTitleMessage('')
            settitle(value)
          } else {
            console.log('response.message',response.message);
          setErrorTitleMessage(response.message);
          }
        }).catch(error => {
          console.log('error.message',error.message);
          setErrorTitleMessage(error.message);
        });
      }
    } else {
      setErrorTitleMessage('Title is required')
    }
  }

  const permissionSet = async () => {
    setPermission([])
    let array = [];
    await $('input[name="permission[]"]').each(function () {
      if ($(this).is(':checked')) {
        console.log('$(this).val()',$(this).val());
        array.push($(this).val())
      }
    });
    setPermission(array)
  }

  const isChecked = (option) => {
    if (permission.length) {
      let secondIndex = permission.findIndex((item) => item.toString() == option.id.toString());
      if (secondIndex != -1 || secondIndex == 0) {
        return true;
      } else {
        return false;
      }
    }
  }

  const isCheckedSubPermission = (option) => {
    if (subPermission.length) {
      let secondIndex = subPermission.findIndex((item) => item.toString() == option.id.toString());
      if (secondIndex != -1 || secondIndex == 0) {
        return true;
      } else {
        return false;
      }
    }
  }
  const subPermissionSet = async () => {
    setSubPermission([])
    let array = [];
    await $('input[name="subpermission[]"]').each(function () {
      if ($(this).is(':checked')) {
        console.log('$(this).val()',$(this).val());
        array.push($(this).val())
      }
    });
    setSubPermission(array)
  }

  const saveProfile = () => {
    if (title && errorTitleMessage == '') {
      if (props.profile_id > 0) {
        props.api.postApi('dsa/updateProfile', { profile_id: props.profile_id, title: title, permission: permission, sub_permission: subPermission }).then(response => {
          navigate(props.prefix + '/roles_permission')
        })
      } else {
        props.api.postApi('dsa/addProfile', { title: title, permission: permission, sub_permission: subPermission }).then(response => {
          navigate(props.prefix + '/roles_permission')
        })
      }
    } else if (errorTitleMessage == '') {
      setErrorTitleMessage('Title is required')
    }
  }

  return (
    <>
      <div className="main-container container-fluid px-0">
        <div className="page-header">
          <div className="page-leftheader">
            <h4 className="page-title mb-0 text-primary">{props.profile_id > 0 ? 'Edit' : 'Add'} Profile</h4>
          </div>

        </div>
        <div className="row">

          <div className="col-xl-6 col-lg-6 col-md-6 col-xm-12">
            <div className="form-group">
              <label className="form-label">Title</label>
              <div className="row g-xs">
                <div className="input-group">
                  <input type="text" onChange={(event) => changeTitle(event.target.value)} className="form-control" placeholder="Profile Title" value={title} />
                  {errorTitleMessage != '' ? <div className="invalid-feedback mb-3" style={{ display: "block", textAlign: "center" }}>{errorTitleMessage}</div>
                    : ''}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover card-table table-vcenter text-nowrap">
                    <thead className="border-bottom-0 pt-3 pb-3">
                      <tr>
                        <th className="font-weight-bold">Permission</th>
                        <th className="w-470 font-weight-bold">Sub Permission</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataArray.length > 0 && dataArray.map((option, index) => (

                        <tr key={index}>

                          <td>
                            <div className="custom-controls-stacked">

                              <label className="custom-control custom-checkbox custom-control-md" forhtml={option.keyword} >
                                <input type="checkbox" className="custom-control-input" name="permission[]" id={option.keyword} value={option.id} onClick={() => permissionSet()} defaultChecked={props.profile_id > 0 ? isChecked(option) : option.is_checked} />
                                <span className="custom-control-label custom-control-label-md">{option.title}</span>
                              </label>
                            </div>
                          </td>
                          <td>
                            <div className="custom-controls-stacked">
                              {option.sub_permission.length > 0 && option.sub_permission.map((option_1, index_1) => (
                                <label className="custom-control custom-checkbox d-inline-block me-sm-4" key={index_1} forhtml={option_1.keyword}>
                                  <input type="checkbox" className="custom-control-input" name="subpermission[]" id={option.keyword} value={option_1.id} onChange={(e) => subPermissionSet()} defaultChecked={props.profile_id > 0 ? isCheckedSubPermission(option_1) : option_1.is_checked} />
                                  <span className="custom-control-label">{option_1.title}</span>
                                </label>

                              ))}
                            </div>
                          </td>
                        </tr>

                      ))}


                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>

          <div className="col-md-12">
            <button type="button" onClick={saveProfile} className="btn btn-primary mb-6 w-md mb-1" ><i className="fa fa-users me-2"></i> Save Profile</button>
          </div>

        </div>
      </div>
    </>
  )
}
export default AddEditPermission;