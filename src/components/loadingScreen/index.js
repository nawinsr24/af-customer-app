import React from 'react';
import HashLoader from "react-spinners/HashLoader";

function LoadingScreen({ size, width, height }) {
    const loadingBackground = {
        width: width || '100%',
        height: height || '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        background: ' rgba(0, 0, 0, 0.564)',
        zIndex: 1000000
    }

    return (
        <div style={loadingBackground}>
            <HashLoader
                size={size ? size : 60}
                color="#fff"
                loading
                speedMultiplier={2}
            />
        </div>
    )
}

export default LoadingScreen;


// import './loadingScreen.css'
// <div className="loader-container">
//             <HashLoader
//                 color="#777bff"
//                 loading
//                 speedMultiplier={2}
//             />
//         </div>