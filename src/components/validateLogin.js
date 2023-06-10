export default function validate(values) {
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  // if (!values.username) {
  //     errors.username = "Username is required!";
  // }
  if (!values.email) {
      errors.email = "Email is required!";
  } else if (!regex.test(values.email)) {
      // errors.email = "This is not a valid email format!";
  }
  if (!values.password) {
      errors.password = "Password is required";
  } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
  } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
  }
  return errors;
};












// export default function validateLogin(values) {
//     let errors = {};
  
//     if (!values.username.trim()) {
//       errors.username = 'Username required';
//     }
//     // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
//     //   errors.name = 'Enter a valid name';
//     // }
  
//     if (!values.email) {
//       errors.email = 'Email required';
//     } else if (!/\S+@\S+\.\S+/.test(values.email)) {
//       errors.email = 'Email address is invalid';
//     }
//     if (!values.password) {
//       errors.password = 'Password is required';
//     } else if (values.password.length < 6) {
//       errors.password = 'Password needs to be 6 characters or more';
//     }
  
//     if (!values.password2) {
//       errors.password2 = 'Password is required';
//     } else if (values.password2 !== values.password) {
//       errors.password2 = 'Passwords do not match';
//     }
//     return errors;
//   }