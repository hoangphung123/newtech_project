import axios from "axios";

export const axiosJWT = axios.create()


export const getDetailUser = async (id, access_token) => {
    const res = await axiosJWT.get(`http://localhost:3000/api/user/get-details/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

// export const refreshToken = async () => {
//     console.log('refreshToken', refreshToken)
//     const res = await axios.post(`http://localhost:3000/api/user/refresh-token`)
//     return res.data
// }

// export const refreshToken = async () => {
//     const res = await axios.post(`http://localhost:3000/api/user/refresh-token`, {
//         withCredentials: true
//     })
//     return res.data
// }


export const getAllUser = async (access_token) => {
    const res = await axiosJWT.get(`http://localhost:3000/api/user/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const refreshToken = async (refreshToken) => {
    console.log('refreshToken', refreshToken)
    const res = await axios.post(`http://localhost:3000/api/user/refresh-token`, {} , {
        headers: {
            token: `Bearer ${refreshToken}`,
        }
    })
    return res.data
}

export const logoutUser = async () => {
    const res = await axios.post(`http://localhost:3000/api/user/log-out`)
    return res.data
}


export const updateUser = async (id, data, access_token) => {
    const res = await axiosJWT.put(`http://localhost:3000/api/user/update-user/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}