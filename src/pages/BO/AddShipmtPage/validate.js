export default function validate(values) {
    const errors = {};

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

    if (!values.estPicDate)
        errors.estPicDate = "Pickup Date is required!";

    if (!values.estDelDate)
        errors.estDelDate = "Delivery Date is required!";

    if (!values.estPicSession)
        errors.estPicSession = "Pickup Session is required!";

    if (!values.estDelSession)
        errors.estDelSession = "Delivery Session is required!";

    if (!values.matType)
        errors.matType = "Material Type is required!";

    if (!values.loadType)
        errors.matType = "Load Type is required!";

    if (!values.matNature)
        errors.matNature = "Load Type is required!";

    if (!values.matDimsUnit)
        errors.matDimsUnit = "Dimension Unit is required!";

    if (!values.matLength)
        errors.matLength = "Length is required!";

    if (!values.matWidth)
        errors.matWidth = "Width is required!";

    if (!values.matHeight)
        errors.matHeight = "Height is required!";

    if (!values.quantity)
        errors.quantity = "Quantity is required!";

    if (!values.weight)
        errors.weight = "Weigtht is required!";

    if (!values.loadDesc)
        errors.loadDesc = "Load Description is required!";

    if (!values.truckId)
        errors.truckId = "Truck is required!";

    // if (!values.drivName)
    //     errors.drivName = "Driver Name is required!";

    // if (!values.drivMobile1)
    //     errors.drivMobile1 = "Driver Mobile 1 is required!";

    // if (!values.trackingGPSLink)
    //     errors.trackingGPSLink = "GPS Link is required!";

    // if (!values.picIncName)
    //     errors.picIncName = "Pickup Incharge Name is required!";

    // if (!values.picInchMobile1)
    //     errors.picInchMobile1 = "Pickup Incharge Mobile 1 is required!";

    // if (!values.delInchName)
    //     errors.delInchName = "Delivery Incharge Name is required!";

    // if (!values.delInchMobile1)
    //     errors.delInchMobile1 = "Delivery Incharge Mobile 1 is required!";

    if (!values.cnorGST)
        errors.cnorGST = "Consignor GST is required!";

    if (!values.cneeGST)
        errors.cneeGST = "Consignee GST is required!";

    if (!values.cust_finalPrc)
        errors.cust_finalPrc = "Price(Customer) is required!";

    if (!values.custPayType)
        errors.custPayType = "Customer Pay Type is required!";

    if (!values.custId)
        errors.custId = "custId is required!";

    if (!values.truckOpId)
        errors.truckOpId = "truckOpId is required!";

    if (!values.custReqId)
        errors.custReqId = "custReqId is required!";

    if (!values.truckOpReqId)
        errors.truckOpReqId = "truckOpReqId is required!";

    if (!values.billCopy)
        errors.billCopy = "Bill Copy is required!";

    if (!values.ewayA)
        errors.ewayA = "Eway Bill A is required!";

    if (!values.ewayA_no)
        errors.ewayA_no = "Eway Bill A Number is required!";

    return errors;
};