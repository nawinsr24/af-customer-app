import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function customAlert(statusCode) {
    if (statusCode === 401)
        notify("error", "Not Authorized");
    else if (statusCode === 402)
        notify("error", "Backoffice disabled Contact admin to reactivate");
    else if (statusCode === 403)
        notify("error", "Account Disabled, Please Contact Back office"); 
    else
        notify("error", "Something went wrong");
}

export function notify(type, msg) {
    switch (type) {
        case "success": toast.success(msg, {
            theme: "colored"
        }); break;
        case "error": toast.error(msg, {
            theme: "colored"
        }); break;
        default: toast.info(msg, {
            theme: "colored"
        });
    }
}