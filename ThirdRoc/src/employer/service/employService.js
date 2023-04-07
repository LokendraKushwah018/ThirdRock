
const EmployerRegistration = async (data) => {
    try {
        let requestOptions = {
            method: 'POST',
            body: data,
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_EMPLOYER_PRIFIX + "/employer-registration", requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ EmployerRegistration ~ error:", error)
    }
}

const EmployerLoign = async (data) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_EMPLOYER_PRIFIX + "/login", requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ EmployerRegistration ~ error:", error)
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

        // const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_EMPLOYER_PRIFIX + "/add-employee", requestOptions);
        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_EMPLOYER_PRIFIX + "/add-employee-number", requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ EmployerRegistration ~ error:", error)
    }

}

const GetEmployees = async (token = "", pageNumber = 1, pageSize = 5, searchVlu = "",empId) => {
    try {

        let requestOptions = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            redirect: 'follow'
        };

        // const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_EMPLOYER_PRIFIX + `/get-employee/?pageNumber=${pageNumber}&search=${searchVlu}&pageSize=${pageSize}`, requestOptions);
        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_EMPLOYER_PRIFIX + `/get-employee/${empId}?pageNumber=${pageNumber}&search=${searchVlu}&pageSize=${pageSize}`, requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ EmployerRegistration ~ error:", error)
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

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_EMPLOYER_PRIFIX + `/get-employeebyid/${id}`, requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ EmployerRegistration ~ error:", error)
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

        const res = await fetch(process.env.REACT_APP_API_URL  + "/get-country", requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ EmployerRegistration ~ error:", error)
    }
}

const EditEmployees = async (data, token = "") => {
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

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_EMPLOYER_PRIFIX + "/update-employee", requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ EmployerRegistration ~ error:", error)
    }

}

const DeleteEmployees = async (token = "", customer_id) => {
    try {
        console.log('customer_id',);
let raw = JSON.stringify({ customer_id });
console.log('raw',raw);
        let requestOptions = {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: raw,
            redirect: 'follow'
        };

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_EMPLOYER_PRIFIX + "/deleteEmployee", requestOptions);
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

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_EMPLOYER_PRIFIX + "/get-profile", requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ EmployerRegistration ~ error:", error)
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

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_EMPLOYER_PRIFIX + "/edit_profile", requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ EmployerRegistration ~ error:", error)
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

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_EMPLOYER_PRIFIX + "/changePassword", requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ EmployerRegistration ~ error:", error)
    }
}

const uploadEmployees = async (data, token = "") => {
    console.log('data uploadEmployees',data);
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

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_EMPLOYER_PRIFIX + "/uploadEmployess", requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ EmployerRegistration ~ error:", error)
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

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_EMPLOYER_PRIFIX + `/dashboard-employer/${id}`, requestOptions);
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

        const res = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_EMPLOYER_PRIFIX + "/upload-logo", requestOptions);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("🚀 ~ file: employService.js:31 ~ EmployerRegistration ~ error:", error)
    }
}

export { EmployerRegistration, EmployerLoign, AddEmployees,GetDashboard, GetEmployees,UploadLogo, GetEmployee, GetCountry, EditEmployees, DeleteEmployees, GetProfile, UpdateProfile, ChangeUserPassword ,uploadEmployees};

