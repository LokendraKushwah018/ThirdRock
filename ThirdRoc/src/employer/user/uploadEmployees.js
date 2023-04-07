import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';

import React, { useState, useEffect, useRef } from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import toast, { Toaster } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Moment from 'react-moment';
import { EXCEL_EMPLOYEE_TEMPLATE } from '../../constant';
import { FileSaver } from "file-saver";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { uploadEmployees } from '../service/employService';




const UploadCases = () => {
    const navigate = useNavigate();
    const tableRef = useRef(null);
    const tableRef2 = useRef(null);
    const [salariedTable, setSalariedTable] = useState(false);
    const [excelData, setExcelData] = useState(null);
    const [excelFile, setExcelFile] = useState(null);
    const [excelFileError, setExcelFileError] = useState(null);
    const [partnerList, setPartnerList] = useState([]);
    const [fileToupload, setFileToUpload] = useState('');
    const [pagesCount, setpagesCount] = useState(1);



    const readExcel = (file) => {
        // let selectedFile = e.target.files[0];
        console.log('file', file);
        if (file) {

            setFileToUpload(file)
            uploadExcelForm.setFieldValue('isExcelFile', true)

            // uploadEmployees
            const promise = new Promise((resolve, reject) => {
                console.log('file.type', file.type);
                if (file) {
                    let reader = new FileReader();
                    reader.readAsArrayBuffer(file);


                    reader.onload = (e) => {
                        const bufferArray = e.target.result;
                        // setExcelFileError(null);
                        const workBook = XLSX.read(bufferArray, { type: 'buffer' });
                        const workSheetName = workBook.SheetNames[0];
                        const workSheet = workBook.Sheets[workSheetName];
                        const data = XLSX.utils.sheet_to_json(workSheet);
                        // const data2 = XLSX.utils.s
                        // setExcelFile(e.target.result)
                        resolve(data)

                    }
                    reader.onerror = (error) => {
                        reject(error)
                    }

                }
            })
            promise.then((d) => {
               setExcelFile(d)
                console.log('json data tanmay', d);

            })

        } else {
            console.log('please select your file');
            // setExcelFileError('please select only excelfile')
        }


    }

    const downloadTemplate = (fileN) => {

        
            const template = EXCEL_EMPLOYEE_TEMPLATE;
            let sliceSize = 1024;
            let byteCharacters = atob(template);
            let bytesLength = byteCharacters.length;
            let slicesCount = Math.ceil(bytesLength / sliceSize);
            let byteArrays = new Array(slicesCount);
            for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
                let begin = sliceIndex * sliceSize;
                let end = Math.min(begin + sliceSize, bytesLength);
                let bytes = new Array(end - begin);
                for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                    bytes[i] = byteCharacters[offset].charCodeAt(0);
                }
                byteArrays[sliceIndex] = new Uint8Array(bytes);
            }
            saveAs(
                new Blob(byteArrays, { type: "application/vnd.ms-excel" }),
                fileN
            );

        

    }


    const uploadExcelForm = useFormik({
        initialValues: {
            // employer_id: '',
            isExcelFile: false,
            wrong_message: ""
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            // employer_id: yup.string().required('Please enter Amount'),
            isExcelFile: yup.boolean().oneOf([true], ""),

        }),

        onSubmit: async (values) => {
            console.log('fileToupload', fileToupload);
            console.log('values', values);
            if (fileToupload) {
                const formData = new FormData();
                formData.append("excel_file", fileToupload);
                // formData.append("employer_id", values.partner_id);
                console.log('formData', formData);
                const employer_id = JSON.parse(localStorage.getItem("employer"))

                const response = await uploadEmployees(formData, employer_id.employer_token);
                if (response.status) {
                    console.log('inside abhi', response);
                    toast.success(response.message);
                    navigate(process.env.REACT_APP_EMPLOYER_PRIFIX + '/employees');
                } else {
                    console.log('inside abhi', response);
                    toast.error(response.message);
                }
            }

        },


    })

    return (
        <>
            <div class="main-container container-fluid px-0">
                <div class="page-header">
                    <div class="page-leftheader">
                        <h4 class="page-title mb-0 text-primary">Upload Bulk Employees</h4>
                    </div>
                    <div class="page-rightheader">
                  <div class="btn-list">
                     <button onClick={() => downloadTemplate('employee-template.xlsx')} class="btn btn-outline-primary"><i class="fa fa-download me-2"></i>Download Employee
                        Template</button>


                    


                  </div>

               </div>

                </div>
                <form className="mt-5 row" onSubmit={uploadExcelForm.handleSubmit} >
                    {uploadExcelForm.values.wrong_message ?
                        <div className="invalid-feedback mb-3 mt-2" style={{ display: "block", textAlign: "center" }}>{uploadExcelForm.values.wrong_message}</div>
                        : ''}
                    <div class="row">

                        <div class="col-12">
                            <div class="uploader">


                                <label htmlFor="file-upload" id="file-drag" >
                                    {/*  <img id="file-image"  alt="Preview" class="hidden" /> 
                        <div id="start"> */}
                                    <i class="fa fa-download" aria-hidden="true"></i>
                                    <div>Select a file</div>

                                    <div id="notimage" class="hidden">Please select an image</div>
                                    <input type="file" placeholder="tanmay" className='form-control' onChange={(e) => {
                                        const file = e.target.files[0]; readExcel(file);
                                    }} />

                                    {/* </div>
                       
                        <div id="response" class="hidden">
                           <div id="messages"></div>
                           <progress class="progress" id="file-progress" value="0">
                              <span>0</span>%
                           </progress>
                        </div> */}
                                </label>


                            </div>
                            <input type="file" placeholder="tanmay" className='form-control' onChange={(e) => {
                                const file = e.target.files[0]; readExcel(file);
                            }} />
                        </div>



                        <div class="col-md-12">
                            <button type="submit" class="btn btn-primary mb-6 w-md mb-1 mt-1" > Save and Update</button>
                        </div>
                    </div>
                </form>


            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover card-table table-vcenter text-nowrap" ref={tableRef}>
                                    <thead className="border-bottom-0 pt-3 pb-3">
                                        <tr>
                                            <th className="font-weight-bold">SERIAL NO.</th>
                                            <th className="font-weight-bold">COUNTRY</th>
                                            <th className="font-weight-bold">MOBILE NUMBER</th>
                                          
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {excelFile && excelFile.length > 0 && excelFile.map((option, index) => {
                                            let serial_num = ((5 * (pagesCount - 1)) + index + 1);
                                            return (
                                                <tr key={option.S_No} >
                                                
                                                    <td><span className="font-weight-normal1">{serial_num}</span></td>
                                                    <td><span className="font-weight-normal1">{option.Country}</span></td>
                                                    <td><span className="font-weight-normal1">{option.Mobile}
                                                    </span></td>
                                                    {/* <td>
                                                                    <Dropdown>
                                                                        <Dropdown.Toggle className='view-pro' id="dropdown-basic">
                                                                            ACTION
                                                                        </Dropdown.Toggle>

                                                                        <Dropdown.Menu>
                                                                            <Dropdown.Item>
                                                                                <Link to={prefix + `/employee_detail/${option.user_id}`}>View Details</Link>
                                                                            </Dropdown.Item> */}
                                                    {/* <Dropdown.Item>
                                                                                <Link to="" onClick={handleShow}>Assign To Lender</Link>
                                                                            </Dropdown.Item>
                                                                            <Dropdown.Item>
                                                                                <Link to="">Delete Case</Link>
                                                                            </Dropdown.Item> */}
                                                    {/* <Dropdown.Item>
                                                                                <Link to={prefix + `/employee_detail/${option.employeeID}`}>View Case</Link>
                                                                            </Dropdown.Item> */}
                                                    {/* <Dropdown.Item>
                                                                                <Link to={prefix + `/employee_setlimit/${option.employeeID}`}>Manage Limit</Link>
                                                                            </Dropdown.Item> */}
                                                    {/* <Dropdown.Item>
                                                                                <Link to={prefix + `/employee_edit/${option.employeeID}`}>Edit Case</Link>
                                                                            </Dropdown.Item> */}
                                                    {/* <Dropdown.Item onClick={() => deleteEmployees(option.employeeID)}>Delete</Dropdown.Item> */}
                                                    {/* </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </td> */}
                                                </tr>
                                            )
                                        }
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>

    )
}
export default UploadCases;