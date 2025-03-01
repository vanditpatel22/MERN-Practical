/* eslint-disable eqeqeq */
import axios from "axios";
import CryptoJS from 'crypto-js';
import { removeSessionStorageData } from "../common/common";


let key = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_KEY);
let iv = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_IV);

let encrypted_apikey = bodyEncryption(process.env.REACT_APP_API_KEY)

const showMessage = (msg) => {
    console.log("Message : ", msg)
}

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'api-key': encrypted_apikey,
        'accept-language': 'en',
        'Content-Type': 'text/plain',
        'access-level': 1,
    }
});

// Body Encryption Request
axiosClient.interceptors.request.use(function (request) {

    if (request.data instanceof FormData) {
        request.headers['Content-Type'] = 'ultipart/form-data';
    } else {

        request.data = bodyEncryption(request.data, true)
        if (localStorage.getItem("AdminToken") !== undefined || localStorage.getItem("AdminToken") !== null) {
            request.headers['token'] = bodyEncryption(localStorage.getItem("AdminToken"))
        }
    }
    console.log("Final Config", request.data)
    return request;
});

axiosClient.interceptors.response.use(
    function (response) {
        response = JSON.parse(bodyDecryption(response.data));

        if (response.code === -1) {
            removeSessionStorageData()
            const event = new CustomEvent('unauthorizedEvent');
            window.dispatchEvent(event);
        } else if (response.code === 0) {
            showMessage(response.message)
            return response;
        }
        return response;
    },
    function (error) {
        let res = error.response;

        console.log("Decrypt Data else response", res)
        if (res != undefined && res.status == 401) {
            removeSessionStorageData()
            const event = new CustomEvent('unauthorizedEvent');
            window.dispatchEvent(event);
            return null
        } else if (res != undefined && res.status == 400) {
            const response = bodyDecryption(res.data);
            return response
        } else if (res !== undefined && res.status == 500) {

            let response = { message: res?.statusText }
            console.log(response)
            return response

        }
        else {
            console.error("Looks like there was a problem Here. Status Code: " + error);
            return Promise.reject(error);
        }

    }
);

function bodyEncryption(request, isStringify) {
    request = (isStringify) ? JSON.stringify(request) : request;
    let encrypted = CryptoJS.AES.encrypt(request, key, { iv: iv });
    return encrypted.toString();
}


function bodyDecryption(request) {
    let decrypted = CryptoJS.AES.decrypt(request, key, { iv: iv });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

export { axiosClient };