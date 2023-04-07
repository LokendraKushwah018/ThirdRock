
const LenderRegistration = async (data) => {
    try {
        let requestOptions = {
            method: 'POST',
            body: data,
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_LENDER_PRIFIX + "/lender-registration", requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
    }
}

const LenderLoign = async (data) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_LENDER_PRIFIX + "/login", requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
    }

}

const GetEmployees = async (token = "", pageNumber = 1, pageSize = 5,queryFilter, searchVlu = "",lenderId) => {
    try {
        console.log('queryFilter',queryFilter);

        let requestOptions = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_LENDER_PRIFIX + `/all-submit-form-employee/${lenderId}?page_number=${pageNumber}&search=${searchVlu}&filter=${queryFilter.status}`, requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
    }

}

const AddEmployees = async (data, token = "") => {
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

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_LENDER_PRIFIX + "/add-employee", requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
    }

}

const GetEmployee = async (token = "", id) => {
    try {

        let requestOptions = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_LENDER_PRIFIX + `/get-employeebyid/${id}`, requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
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

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_LENDER_PRIFIX + "/deleteEmployee", requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
    }

}

const GetProfile = async (token = "") => {
    try {

        let requestOptions = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_LENDER_PRIFIX + "/get-profile", requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
    }

}

const UpdateProfile = async (data, token = "") => {
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

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_LENDER_PRIFIX + "/edit_profile", requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
    }
}

const GetCountry = async (token = "") => {
    try {

        let requestOptions = {
            method: 'GET',
            headers: {
                
            },
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL +  "/get-country", requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
    }

}

const ChangeUserPassword = async (data, token = "") => {
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

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_LENDER_PRIFIX + "/change-password", requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ EmployerRegistration ~ error:", error)
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

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_LENDER_PRIFIX + `/get-employer?page_number=${pageNumber}&search=${searchVlu}`, requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
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

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_LENDER_PRIFIX + `/get-employer-byId/` + id, requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
    }

}

const ManageEmployeeLimit = async (token = "", data) => {
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

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_LENDER_PRIFIX + `/manage-employee-limit`, requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
    }

}


const GetLimit = async (token = "", id) => {
    try {

        let requestOptions = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL+ process.env.REACT_APP_LENDER_PRIFIX + "/limit-list/" + id, requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
    }

}
const GetTransctions = async (token = "",lenderId) => {
    try {

        let requestOptions = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + `/lender/lender-transctions/${lenderId}`, requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
    }

}

const GetEmi = async (token = "",pageNumber, pageSize, filterVlu, id) => {
    try {

        let requestOptions = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_LENDER_PRIFIX + `/emi-list/${id}`, requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
    }

}
const GetDues = async (token = "",pageNumber, pageSize, filterVlu, id) => {
    try {

        let requestOptions = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_LENDER_PRIFIX + `/due-list/${id}`, requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
    }

}

const GetEmiPaidList = async (token = "",pageNumber, pageSize, filterVlu, id) => {
    try {

        let requestOptions = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_LENDER_PRIFIX + `/Paid-emi-list/${id}`, requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
    }

}
const GetDashboard = async (id) => {
    try {

        let requestOptions = {
            method: 'GET',
            headers: {
                // "Authorization": `Bearer ${token}`
            },
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_LENDER_PRIFIX + `/lender-dashboard/${id}`, requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
    }

}

const payEmis = async (token = "",data) => {
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

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_LENDER_PRIFIX + "/pay-emi", requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
    }

}

const UploadLogo = async (data) => {
    try {
        let requestOptions = {
            method: 'POST',
            headers: {
                // "Authorization": `Bearer ${token}`,
                // "Content-Type": "application/json"
            },
            body: data,
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_LENDER_PRIFIX + "/upload-logo", requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ EmployerRegistration ~ error:", error)
    }
}
export { LenderRegistration, LenderLoign,GetDues,GetEmiPaidList,GetDashboard,payEmis,UploadLogo, AddEmployees,GetEmi, GetEmployees,GetCountry, GetEmployee, DeleteEmployees, GetProfile, UpdateProfile, ChangeUserPassword, GetTransctions, GetEmployers, GetEmployerDetail, ManageEmployeeLimit, GetLimit };

