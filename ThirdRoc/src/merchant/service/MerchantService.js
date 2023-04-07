
const MerchantRegistration = async (data) => {
    try {
        let requestOptions = {
            method: 'POST',
            body: data,
            redirect: 'follow'
        };
        // const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_MARCHNT_PRIFIX + "/lender-registration", requestOptions);
        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_MARCHNT_PRIFIX  +  "/merchant-registration", requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error);
    }
}

const MerchantLoign = async (data) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL  + process.env.REACT_APP_MARCHNT_PRIFIX  +  "/login", requestOptions);
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

const GetEmployer = async (token = "", pageNumber = 1, pageSize = 5, searchVlu = "") => {
    try {

        let requestOptions = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_MARCHNT_PRIFIX + `/all-employees?page_number=${pageNumber}&search=${searchVlu}`, requestOptions);
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

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_MARCHNT_PRIFIX + "/add-employee", requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
    }

}
const AddStores = async (data) => {
    try {

        let requestOptions = {
            method: 'POST',
            body: data,
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_MARCHNT_PRIFIX + "/add-store", requestOptions);
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

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_MARCHNT_PRIFIX + `/get-employeebyid/${id}`, requestOptions);
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

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_MARCHNT_PRIFIX + "/deleteEmployee", requestOptions);
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

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_MARCHNT_PRIFIX + "/get-profile", requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
    }

}

const UpdateProfile = async (token = "",data) => {
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

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_MARCHNT_PRIFIX + "/edit_profile", requestOptions);
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

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_MARCHNT_PRIFIX + "/change-password", requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ EmployerRegistration ~ error:", error)
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

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_MARCHNT_PRIFIX + "/upload-logo", requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ EmployerRegistration ~ error:", error)
    }
}



const GetTransctions = async (token = "",merchantUserId,page_number,search) => {
    try {

        let requestOptions = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_MARCHNT_PRIFIX + `/merchant-transctions/${merchantUserId}?page_number=${page_number}&search=${search}`, requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
    }

}
const GetSettlement = async (token = "",merchantUserId,page_number,search) => {
    try {

        let requestOptions = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_MARCHNT_PRIFIX + `/merchant-settlement/${merchantUserId}?page_number=${page_number}&search=${search}`, requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
    }

}
const GetStore = async (token,merchantUserId,page_number,search) => {
    try {

        let requestOptions = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_MARCHNT_PRIFIX + `/get-allStores?page_number=${page_number}&search=${search}`, requestOptions);
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

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_MARCHNT_PRIFIX + `/dashboard-merchant/${id}`, requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ LenderRegistration ~ error:", error)
    }

}


export { MerchantRegistration, MerchantLoign, GetSettlement,GetStore,AddStores,UploadLogo,GetDashboard,AddEmployees,GetCountry, GetEmployer, GetEmployee, DeleteEmployees, GetProfile, UpdateProfile, ChangeUserPassword, GetTransctions };

