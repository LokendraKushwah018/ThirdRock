import React, { useEffect, useState } from 'react'
import QRCode from "react-qr-code";
import Service from '../../lenderService';
const saveSvgAsPng = require('save-svg-as-png')


const MerchantQRCode = () => {
    const api = new Service();

    const [profileData, setprofileData] = useState({});
    console.log("🚀 ~ file: QRCode.js:11 ~ MerchantQRCode ~ profileData:", profileData)

    useEffect(() => {
        api.getApi('lender/profile').then(response => {

            if (response.status === true) {
                console.log('inside tanmay', response.data);
                setprofileData(response.data);
            }
        }).catch(error => {
            console.log('error', error);
        });
    }, [])

    const imageOptions = {
        scale: 5,
        encoderOptions: 1,
        backgroundColor: 'white',
    }

    const downloadQR = async () => {
        var canvas = document.getElementById('myCanvasId');
        saveSvgAsPng.saveSvgAsPng(canvas, 'qr_code.png', imageOptions);
    };

    const value = {
        Mobile_Number: profileData.mobile_number
    }

    return (
        <>
            <div className="main-container container-fluid px-0">
                <div className="page-header my-3 py-5">
                    <div className="page-leftheader">
                        <h4 className="page-title mb-0 text-primary">QR Code</h4>
                    </div>
                </div>

                <div className='d-flex align-items-center justify-content-center'>
                    <div className='text-center'>
                        <div style={{ height: "auto", margin: "0 auto", maxWidth: "15rem", width: "100%" }}>
                            <QRCode
                                id="myCanvasId"
                                size={256}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                value={JSON.stringify(value)}
                                viewBox={`0 0 256 256`}
                            />
                        </div>
                        <a className='btn btn-primary mt-5'
                            onClick={() => downloadQR()}
                        > Download QR</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MerchantQRCode;