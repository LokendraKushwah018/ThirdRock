

const AdminLoign = async (data) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_ADMIN_PRIFIX + "/login", requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
    }

}

const AddSettlement = async (data) => {
    try {
        const merchant = JSON.parse(localStorage.getItem("admin"));
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: {
               
                 "Content-Type": "application/json",
                "Authorization": `Bearer ${merchant.admin_token}`
            },
            // headers: myHeaders,
            body: data,
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_ADMIN_PRIFIX + "/add-settlement", requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
    }

}

const GetLenders = async (token = "", pageNumber = 1, searchVlu = "") => {
    try {

        let requestOptions = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_ADMIN_PRIFIX + `/get-lender-list?page_number=${pageNumber}&search=${searchVlu}`, requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: adminService.js:39 ~ GetEmployers ~ error:", error)
    }
}

const GetLenderDetail = async (token = "", id) => {
    try {

        let requestOptions = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_ADMIN_PRIFIX + "/get-lender/" + id, requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: adminService.js:39 ~ GetEmployers ~ error:", error)
    }
}

const GetMerchants = async (token = "", pageNumber = 1, searchVlu = "") => {
    try {

        let requestOptions = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_ADMIN_PRIFIX + `/get-merchant-list?page_number=${pageNumber}&search=${searchVlu}`, requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: adminService.js:39 ~ GetEmployers ~ error:", error)
    }

}

const GetMerchantrDetail = async (token = "", id) => {
    try {

        let requestOptions = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_ADMIN_PRIFIX + "/get-merchant/" + id, requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: adminService.js:39 ~ GetEmployers ~ error:", error)
    }

}

const GetEmployers = async (token = "", pageNumber = 1, searchVlu = "") => {
    try {

        let requestOptions = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_ADMIN_PRIFIX + `/get-employer-list?page_number=${pageNumber}&search=${searchVlu}`, requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: adminService.js:39 ~ GetEmployers ~ error:", error)
    }

}

const GetEmployerDetail = async (token = "", id) => {
    try {

        let requestOptions = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_ADMIN_PRIFIX + "/get-employer/" + id, requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: adminService.js:39 ~ GetEmployers ~ error:", error)
    }

}

const DeleteEmployees = async (token = "", data) => {
    try {

        let requestOptions = {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: data,
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_EMPLOYER_PRIFIX + "/deleteEmployee", requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
    }

}
const GetSettlement = async (token = "", page_number, search) => {
    try {

        let requestOptions = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_ADMIN_PRIFIX + `/get-settlements`, requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
    }

}
const addSettlement = async (idArr) => {
    try {
       

        let requestOptions = {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({merchatTransctionId:idArr}), 
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_ADMIN_PRIFIX + "/add-settlment", requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
    }

}
const GetDashboard = async () => {
    try {
        const merchant = JSON.parse(localStorage.getItem("admin"));
        let requestOptions = {
            method: 'GET',
            headers: {
                 "Authorization": `Bearer ${merchant.admin_token}`
            },
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_ADMIN_PRIFIX + `/dashboard-admin`, requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
    }

}
const GetAllPendingSettlement = async (token,pageNumber,searchVlu) => {
    try {

        let requestOptions = {
            method: 'GET',
            headers: {
                 "Authorization": `Bearer ${token}`
            },
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_ADMIN_PRIFIX + `/pending-settlement?page_number=${pageNumber}&search=${searchVlu}`, requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
    }

}
const GetAllTransactionsByMerchantId = async (token,pageNumber,searchVlu, merchantId) => {
    try {
        const merchant = JSON.parse(localStorage.getItem("admin"));
        let requestOptions = {
            method: 'GET',
            headers: {
                 "Authorization": `Bearer ${merchant.admin_token}`
            },
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_ADMIN_PRIFIX + `/Pending-settalemntBy-merchantId/${merchantId}?page_number=${pageNumber}&search=${searchVlu}`, requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
    }

}



export { AdminLoign, GetLenders, GetLenderDetail,GetAllTransactionsByMerchantId,AddSettlement, GetSettlement,GetAllPendingSettlement, addSettlement,GetDashboard, DeleteEmployees, GetEmployers, GetEmployerDetail, GetMerchants, GetMerchantrDetail };

