import React from 'react';
import { Form, Input, Typography } from 'antd';
import { customAlert, notify } from '../notify';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { putCustomerService } from '../../services/customer-service';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';


const FormChangeUserInformation = ({ custData, userId, updateIsEdit }) => {
    const [isSubmitClick, setIsSubmitClick] = useState(false);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    async function handleSubmit(values) {
        setIsSubmitClick(true);
        try {
            await putCustomerService({ ...values, userId });
            notify("success", "Edited Successfully");
            queryClient.invalidateQueries();
            updateIsEdit(false);
        } catch (err) {
            customAlert(err);
        }
        setIsSubmitClick(false);
    }

    return (
        // <form className="ps-form--account-setting" onSubmit={handleSubmit}>
        //     <div className="ps-form__header">
        //         <h3>Edit Account Information</h3>
        //     </div>
        //     <div className="ps-form__content">
        //         <div className="form-group">
        //             <label htmlFor="name" style={{ marginBottom: 0 }}>Name:</label>
        //             <input
        //                 name='name'
        //                 className="form-control"
        //                 type="text"
        //                 placeholder="Name"
        //                 readOnly="true"
        //                 value={custData?.name}
        //             />
        //         </div>


        //         <div className="form-group submit">
        //             <button className="ps-btn">Submit</button>
        //         </div>
        //     </div>
        // </form>

        custData ? <Form className="ps-form--account-setting" onFinish={handleSubmit}>
            <div className="ps-form__header">
                <h3>Edit Account Information</h3>
            </div>

            <div className="ps-form__content">
                <div className="form-group" >
                    <label htmlFor="custName" style={{ marginBottom: 0 }}>Name:</label>
                    <Form.Item
                        name="custName"
                        initialValue={custData?.name}
                        rules={[
                            {
                                required: true,
                                message:
                                    'Please input your email or mobile !',
                            },
                        ]}
                        style={{

                            opacity: isSubmitClick ? 0.5 : 1
                        }}>
                        <Input
                            disabled={isSubmitClick}
                            className="form-control"
                            type="text"
                            placeholder="Name"
                        />
                    </Form.Item>
                </div>

                <div className="form-group submit" >
                    <button
                        disabled={isSubmitClick}
                        className="ps-btn"
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            opacity: isSubmitClick ? 0.5 : 1
                        }}>
                        {isSubmitClick && <CircularProgress color='inherit' size={20} sx={{ mr: 1 }} />}
                        Submit
                    </button>
                </div>
            </div>
        </Form> : <Typography component={'h1'}>Something went wrong</Typography>
    );
};

export default FormChangeUserInformation;
