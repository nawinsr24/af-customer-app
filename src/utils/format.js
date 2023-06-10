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

export function formatRoutes(arr) {
   let str = "";
   for (let i = 0; i < arr.length; i++) {
      const e = arr[i];

      if (i === 0 || i === arr.length - 1) {
         continue;
      } else {
         if (str)
            str = str + " | " + e.place
         else
            str = e.place
      }

   }
   return str;
}

export function makeTxtOverFLow(str, len) {

   if (str?.length <= len)
      return str;

   return str?.slice(0, len) + "....";
}

export function shipmtStClrs(status, len) {
   // ENUM('pending', 'cancel', 'confirm', 'transportation', 'unloaded', 'completed')
   const statusArr = [
      {
         status: "pending",
         label: "Pending",
         txtColor: "rgba(227, 156, 2, 1)",
         bgColor: "rgba(227, 156, 2, 0.1)"
      }, {
         status: "cancel",
         label: "Cancel",
         txtColor: "rgba(255, 60, 0, 1)",
         bgColor: "rgba(255, 60, 0, 0.1)"
      }, {
         status: "confirm",
         label: "Confirm",
         txtColor: "rgba(0, 102, 255, 1)",
         bgColor: "rgba(0, 102, 255, 0.1)"
      }, {
         status: "transportation",
         label: "Transportation",
         txtColor: "rgba(162, 0, 255, 1)",
         bgColor: "rgba(162, 0, 255, 0.1)"
      }, {
         status: "unloaded",
         label: "Unloaded",
         txtColor: "rgba(150, 184, 0, 1)",
         bgColor: "rgba(150, 184, 0, 0.1)"
      }, {
         status: "completed",
         label: "Completed",
         txtColor: "rgba(2, 158, 25, 1)",
         bgColor: "rgba(2, 158, 25, 0.1)"
      }]

   let res = statusArr.filter((i) => i.status === status)

   return res[0];
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

export function getFormatedUnit(unit) {
   if (unit === "feet")
      return " Feet"
   else if (unit === "m")
      return " meter"
   else if (unit === "cm")
      return " cm"
   else if (unit === "ton")
      return " Ton(s)"
   else if (unit === "kilolitre")
      return " KL"
   else if (unit === "full")
      return "Full Payment"
   else if (unit === "advance")
      return "Advance"
   else if (unit === "topay")
      return "To Pay"
   else if (unit === "partLoad")
      return "Part Load"
   else if (unit === "fullLoad")
      return "Full Load"
}

export function getTruckName(obj) {
   // obj = JSON.parse(obj);
   let strg = "";
   for (var key in obj) {
      if (key.startsWith("c_") || key.startsWith("b_"))
         continue;
      strg += obj[key] + ",  "
   }
   return strg;
}

export function formatSess(sess) {
   if (sess === "morning")
      return "6am-10am"
   else if (sess === "noon")
      return "10am-2pm"
   else if (sess === "evening")
      return "2pm-6pm"
   else if (sess === "night")
      return "after 6pm"
   else
      return ""
}

export function getLocalStrg(value) {
   value = parseFloat(value)
   return value.toLocaleString('en-IN')
}

export function formatReptConfigJson(jsonArr) {
   let jsArr = JSON.parse(jsonArr);

   let strg = ""
   for (let i = 0; i < jsArr.length; i++) {
      const e = jsArr[i];

      if (i === 0)
         strg = e.label
      else
         strg = strg + ", " + e.label
   }
   return strg
}

export function genFileName({ strg, ext }) {

   var date = new Date();
   let month = date.getMonth() + 1;

   return strg + "_" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + '_'
      + (month < 10 ? "0" + month : month) + "_"
      + date.getFullYear() + ext
}

export function formatPymtType(type) {
   switch (type) {
       case "cheque": return "Cheque"
       case "cash": return "Cash";
       case "upi": return "UPI";
       case "neft": return "NEFT";
       case "portal": return "Portal";
       default: return ""
   }
}