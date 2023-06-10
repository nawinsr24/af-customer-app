export default function validate(values) {
    const errors = {};

    if (!values.regNo)
        errors.regNo = "Register Number is required!";

    // if (!values.ins_expDate)
    //     errors.ins_expDate = "Insurance expiry date is required!";

    if (!values.fc_expDate)
        errors.fc_expDate = "FC expiry date is required!";

    // if (!values.permit_type)
    //     errors.permit_type = "Permit Type is required!";

    if (!values.maxCap)
        errors.maxCap = "Max Capacity is required!";


    if (!values.type)
        errors.trkType = "Truck Type is required!";

    return errors;
};