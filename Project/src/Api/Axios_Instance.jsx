import axios from "axios";

const api = axios.create({
    baseURL:"https://shopease-backend-5gz8.onrender.com",
    headers: {
        "content-type" : "application/json",
    }
})
export default api