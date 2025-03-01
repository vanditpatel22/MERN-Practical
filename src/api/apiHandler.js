import { axiosClient } from "./apiClient";


export function userSignUp(data) {
    return axiosClient.post('auth/signup', data);
}

export function userLogin(data) {
    return axiosClient.post('auth/login', data);
}


export function userEmailVerify(data) {
    return axiosClient.post('auth/verify_email', data);
}
