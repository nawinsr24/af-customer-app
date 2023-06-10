export default function validate(values) {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.fName)
        errors.fName = "First Name is required!";

    // if (!values.comName)
    //     errors.comName = "Company Name is required!";

    if (!values.trucks_owned)
        errors.trucks_owned = "Trucks Owned is required!";

    if (!values.email)
        errors.email = "Email is required!";
    else if (!regex.test(values.email)) {
        // errors.email = "This is not a valid email format!";
    }

    

    return errors;
};