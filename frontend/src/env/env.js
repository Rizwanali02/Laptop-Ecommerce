export const serverUrl = "https://laptop-ecommerce-0czh.onrender.com"
export const axiosConfig = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json"
    }
}