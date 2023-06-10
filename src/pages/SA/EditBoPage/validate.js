export default function validate(values) {
    const errors = {};

    if (!values.bo_name)
        errors.bo_name = "Back Office Name is required!";

    if (!values.bo_city)
        errors.bo_city = "City is required!";

    return errors;
};