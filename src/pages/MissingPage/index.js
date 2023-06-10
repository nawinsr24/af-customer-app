import React from 'react';
import img from '../../assets/svg/404.svg';


function MissingPage() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <img src={img} alt="loginPageBg_1" style={{ width: "50vw" }} />
    </div>
  )
}

export default MissingPage