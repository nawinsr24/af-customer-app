export default function validate(values) {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.bo_name)
        errors.bo_name = "Back Office Name is required!";

    if (!values.bo_city)
        errors.bo_city = "City is required!";

    if (!values.staff_name)
        errors.staff_name = "Admin Name is required!";

    if (!values.mobile1)
        errors.mobile1 = "Mobile Number 1 is required!";

    if (!values.username)
        errors.username = "Email is required!";
    else if (!regex.test(values.username)) {
        // errors.email = "This is not a valid email format!";
    }

    if (!values.password)
        errors.password = "Password is required";
    else if (values.password.length < 4)
        errors.password = "Password must be more than 4 characters";
    else if (values.password.length > 10)
        errors.password = "Password cannot exceed more than 10 characters";

    if (!values.c_password)
        errors.c_password = "Password is required";
    else if (values.c_password.length < 4)
        errors.c_password = "Password must be more than 4 characters";
    else if (values.c_password.length > 10)
        errors.c_password = "Password cannot exceed more than 10 characters";
    else if (values.c_password !== values.password)
        errors.c_password = 'Passwords do not match';

    return errors;
};