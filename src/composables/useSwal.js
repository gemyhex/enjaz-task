import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import axios from "../utils/axios.js";

const showAlert = (message = '', type = 'success') => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: type,
        title: message
    })
}

const confirmDelete = (message = '', url) => {
    return Swal.fire({
        title: 'Are you sure?',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'rgba(var(--v-theme-primary))',
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
            Swal.showLoading();
            return new Promise(async (resolve, reject) => {
                try {
                    await axios.delete(url);
                    resolve();
                } catch (error) {
                    reject('Error deleting item');
                }
            });
        },

    }).then((result) => {
        return result.isConfirmed
    })
}

export { showAlert, confirmDelete }