import moment from 'moment';

export function formatDateTime(dateTime) {
   return moment(dateTime).format('lll');
}

export function capFirstLetter(string) {
   if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
   }
   return ""
}

export function convPayType(string) {
   if (!string)
      return ""
   else if (string === 'full')
      return "Full Payment"
   else if (string === 'advance')
      return "Advance"
   else if (string === 'topay')
      return "To Pay"
   else
      return string
}

export function formatDate(dateTime) {
   // return moment(dateTime).format('ll');
   // const monthNames = ["January", "February", "March", "April", "May", "June",
   //    "July", "August", "September", "October", "November", "December"
   // ];
   const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

   const date = new Date(dateTime);
   return monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
}


export function makeTxtOverFLow(str, len) {
   if (str?.length <= len)
      return str;

   return str?.slice(0, len) + "....";
}


export function formatDateWithJs(dateTime) {
   if (!dateTime)
      return null

   //18/9/2022
   var date = new Date(dateTime);
   let month = date.getMonth() + 1;

   return (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + '-'
      + (month < 10 ? "0" + month : month) + "-"
      + date.getFullYear()
}

export function datePickerformat(dateTime) {
   if (!dateTime)
      return null

   //18/9/2022  yyyy-MM-dd
   var date = new Date(dateTime);
   let month = date.getMonth() + 1;

   return date.getFullYear() + "-" +
      (month < 10 ? "0" + month : month) + "-" +
      (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
}



export function genFileName({ strg, ext }) {

   var date = new Date();
   let month = date.getMonth() + 1;

   return strg + "_" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + '_'
      + (month < 10 ? "0" + month : month) + "_"
      + date.getFullYear() + ext
}

export function isEmail(input) {
   // Email pattern regular expression
   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   // Check if the input matches the email pattern
   return emailPattern.test(input);
}