export default function validate(values) {
    const errors = {};

    if (!values.type)
        errors.type = "Customer Type is required!";

    if (!values.cnorName)
        errors.cnorName = "Consignor Name is required!";

    if (!values.picLocation)
        errors.picLocation = "Pickup Location is required!";

    if (!values.picAddress)
        errors.picAddress = "Pickup Address is required!";

    if (!values.cneeName)
        errors.cneeName = "Consignee Name is required!";

    if (!values.delLocation)
        errors.delLocation = "Delivery Location is required!";

    if (!values.delAddress)
        errors.delAddress = "Delivery Address is required!";

    if (!values.picDate)
        errors.picDate = "Pickup Date is required!";

    if (!values.delDate)
        errors.delDate = "Delivery Date is required!";

    if (!values.matType)
        errors.matType = "Material Type is required!";

    if (!values.matLength)
        errors.matLength = "Length is required!";

    if (!values.matWidth)
        errors.matWidth = "Width is required!";

    if (!values.matHeight)
        errors.matHeight = "Height is required!";

    if (!values.matDimsUnit)
        errors.matDimsUnit = "Dimension Unit is required!";

    if (!values.matNature)
        errors.matNature = "Load Type is required!";

    if (!values.quantity)
        errors.quantity = "Quantity is required!";

    if (!values.weight)
        errors.weight = "Weigtht is required!";

    if (!values.preTruckTypes)
        errors.preTruckTypes = "Truck Type is required!";

    if (!values.loadType)
        errors.loadType = "Truck Load Type is required!";

    if (!values.payType)
        errors.payType = "Payment Type is required!";


    return errors;
};