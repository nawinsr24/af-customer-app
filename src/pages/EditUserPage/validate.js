export default function validate(values) {
    const errors = {};

    if (!values.staff_name)
        errors.staff_name = "Admin Name is required!";

    if (!values.mobile1)
        errors.mobile1 = "Mobile Number 1 is required!";

    return errors;
};