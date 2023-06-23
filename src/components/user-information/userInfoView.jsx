import React from 'react';
import { DatePicker, Form, Input, Radio } from 'antd';

const UserInfoView = ({ custData, updateIsEdit }) => {
    return (
        <form className="ps-form--account-setting">
            <div className="ps-form__header">
                <h3>Account Information</h3>
            </div>
            <div className="ps-form__content">
                <div className="form-group">
                    <label htmlFor="name" style={{ marginBottom: 0 }}>Name:</label>
                    <input
                        name='name'
                        className="form-control"
                        type="text"
                        placeholder="Name"
                        readOnly="true"
                        value={custData?.name}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email" style={{ marginBottom: 0 }}>Email Address:</label>
                    <input
                        name='email'
                        className="form-control"
                        type="email"
                        placeholder="Email Address"
                        readOnly="true"
                        value={custData?.email}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mobile" style={{ marginBottom: 0 }}>Mobile Number:</label>
                    <input
                        name='mobile'
                        className="form-control"
                        type="text"
                        placeholder="Mobile Number"
                        readOnly="true"
                        value={custData?.mobile}
                    />
                </div>


                <div className="form-group submit" onClick={() => { updateIsEdit(true) }}>
                    <button className="ps-btn">Update profile</button>
                </div>
            </div>
        </form>
    );
};

export default UserInfoView;
