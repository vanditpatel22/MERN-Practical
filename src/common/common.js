import Swal from "sweetalert2";

export function ErrorAlert(data, msg) {
    Swal.fire({
        position: "top-end",
        icon: "error",
        title: data || msg,
        toast: true,
        showConfirmButton: false,
        timer: 1500,
    });
}

export function SuccessAlert(data, msg) {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: data || msg,
        toast: true,
        showConfirmButton: false,
        timer: 1500,
    });
}

export function SimpleAlert(data, msg) {
    Swal.fire({
        position: "top-end",
        icon: "alert",
        title: data || msg,
        toast: true,
        showConfirmButton: false,
        timer: 1500,
    });
}


export function removeSessionStorageData() {

    localStorage.removeItem("UserTimezone");
    localStorage.removeItem("UserLogin");
    localStorage.removeItem("UserToken");
    localStorage.removeItem("UserID");
    localStorage.removeItem("UserName");
    localStorage.removeItem("UserEmail");

}

export function setSessionStorageData(data) {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    localStorage.setItem("UserTimezone", timeZone);
    localStorage.setItem("UserLogin", true);
    localStorage.setItem("UserToken", data.token);
    localStorage.setItem("UserID", data.id);
    localStorage.setItem("UserName", data.first_name + data.last_name);
    localStorage.setItem("UserEmail", data.email);

}
