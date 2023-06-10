export default function validate(values) {
    const errors = {};

    if (!values.factor)
        errors.factor = "Factor Name is required!";

    if (!values.percent)
        errors.percent = "Percentage is required!";


    return errors;
};