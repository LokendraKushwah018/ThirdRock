
import axios from "axios";

const config = require('./config.json');
// const axios = require('axios')
const api_base_url =config.API_URL;

class LenderService {   
    getApi(path,parameter = '',object = {}) {
        return new Promise(function(resolve, reject) {
            let lenderData = localStorage.getItem("lender")
            let headers = {'Authorization': JSON.parse(lenderData)?.lender_token}
                headers = {...headers, 'Accept': 'application/json','Content-Type': 'application/json'}
                if(object) {
                    headers = {...headers, ...object}
                }
            fetch(api_base_url+''+path+'?' + new URLSearchParams(parameter),{
                 method: 'GET',
                 headers: headers
            })
            .then((response) => {
                if (!response.ok) {
                    response.json().then(json => { 
                        reject(json)
                    })
                } else {
                    response.json().then(json => { 
                        resolve(json)
                    })
                }
            }).catch((response) => {
                
            });
        });
    }

    postApi(path,body={}, is_formData = false,object= {'Authorization': JSON.parse(localStorage.getItem("lender"))?.lender_token} ) {
        return new Promise(function(resolve, reject) {
            let headers = {}
            if(is_formData==false) {
                headers = {...headers, 'Accept': 'application/json','Content-Type': 'application/json'}
            } else {
                headers = {...headers,'Content-Type': 'multipart/form-data'}
            }
            if(object) {
                headers = {...headers, ...object}
            } 
            // else {
            //     headers = {...headers,'Authorization': localStorage.getItem("token")}
            // }
            fetch(api_base_url+''+path,{
                method: 'POST',
                headers: headers,
                body: is_formData ? body : JSON.stringify(body)
            })
            .then((response) => {
                if (!response.ok) {
                    response.json().then(json => { 
                        resolve(json)
                    })
                } else {
                    response.json().then(json => { 
                        resolve(json)
                    })
                }
            }).catch((response) => {
                console.log(response)
            });
        });
    }

    uploadPostApi(path,body,header={},setProgress='') {
        return new Promise(function(resolve, reject) {
            axios.request({
                method: "post", 
                url: api_base_url+''+path, 
                data: body, 
                headers: header,
                // onUploadProgress: (data) => {
                //     setProgress(Math.round((100 * data.loaded) / data.total))
                // }
            }).then((response) => {
                resolve(response.data)
                // response.json().then(json => { 
                // })
            }).catch((response) => {
                console.error(response)
                if(response.response) {
                    // response.response.data.json().then(json => { 
                        resolve(response.response.data)
                    // })
                }
            });
        });   
    }
     
    uploadPostApiNew(path,body,header={},setProgress='') {
        return new Promise(function(resolve, reject) {
            axios.request({
                method: "post", 
                url: api_base_url+''+path, 
                data: body, 
                headers: header,
                onUploadProgress: (data) => {
                    setProgress(Math.round((100 * data.loaded) / data.total))
                }
            }).then((response) => {
                // response.json().then(json => { 
                    resolve(response.data)
                // })
            }).catch((response) => {
                if(response.response) {
                        resolve(response.response.data)
                }
            });
        });   
    }
    
}
export default LenderService;

