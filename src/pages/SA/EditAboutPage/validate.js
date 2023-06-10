export default function validate(values) {
    const errors = {};

    if (!values.termsAndCond)
        errors.termsAndCond = "Terms and Policies is required!";

    if (!values.cust_care_no)
        errors.cust_care_no = "Customer Care Number is required!";

    return errors;
};