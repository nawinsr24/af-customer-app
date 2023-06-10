export default function validate(values) {
    const errors = {};

    if (!values.truckId)
        errors.truckId = "Truck is required!";

    if (!values.loadStatus)
        errors.loadStatus = "Truck Load Status is required!";

    if (!values.addableCap)
        errors.addableCap = "Addable Capacity is required!";

    if (!values.currLocation)
        errors.currLocation = "Current Location is required!";

    if (!values.estPrice)
        errors.estPrice = "Estimated Price is required!";

        if (values.routesArr?.length < 2)
        errors.routesArr = "At least two Routes are required!";
    else 
       delete errors.routesArr;



    return errors;
};