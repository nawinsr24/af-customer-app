import React from 'react';

function IcBackBtn({ fill, onClick }) {
    return (
        <svg width="26" height="20" viewBox="0 0 26 20" xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
            <path d="M6.39766 8.41667L12.066 2.7325L9.8335 0.5L0.333496 10L9.8335 19.5L12.066 17.2675L6.39766 11.5833H25.6668V8.41667H6.39766Z" fill={fill} />
        </svg>

    )
}

export default IcBackBtn;