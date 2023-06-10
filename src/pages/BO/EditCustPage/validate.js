export default function validate(values) {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.fName)
        errors.fName = "Customer Name is required!";

    // if (!values.mobile1)
    //     errors.mobile1 = "Mobile Number 1 is required!";

    // if (!values.type)
    //     errors.type = "Customer Type is required!";

    if (!values.email)
        errors.email = "Email is required!";
    else if (!regex.test(values.email)) {
        // errors.email = "This is not a valid email format!";
    }

    // if (values.type === 'individual' && !values.aadhar_no && !values.pan_no) {
    //     errors.aadhar_no = "Aadhaar Number is required!";
    // }


    // if (values.type === 'individual' && !values.aadhar_no && !values.pan_no)
    //     errors.pan_no = "PAN Number is required!";

    // if (values.type === 'company' && !values.gst_no)
    //     errors.gst_no = "GST Number is required!";

    if (values.type === 'company' && !values.comName)
        errors.comName = "Company Name is required!";


    // if (!values.password)
    //     errors.password = "Password is required";
    // else if (values.password.length < 4)
    //     errors.password = "Password must be more than 4 characters";
    // else if (values.password.length > 10)
    //     errors.password = "Password cannot exceed more than 10 characters";

    // if (!values.c_password)
    //     errors.c_password = "Password is required";
    // else if (values.c_password.length < 4)
    //     errors.c_password = "Password must be more than 4 characters";
    // else if (values.c_password.length > 10)
    //     errors.c_password = "Password cannot exceed more than 10 characters";
    // else if (values.c_password !== values.password)
    //     errors.c_password = 'Passwords do not match';

    return errors;
};