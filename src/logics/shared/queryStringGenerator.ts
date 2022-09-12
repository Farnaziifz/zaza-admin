// const queryStringGenerator = (queryStringObj) => {
//     // define variables for keep queryString and index of item in itrerator
//     let queryString = "";
//     let indexOfQueryString = 0;
//
//     for (let item in queryStringObj) {
//         // check for item exist in queryStringObj
//         if (queryStringObj.hasOwnProperty(item)) {
//             indexOfQueryString += 1;
//
//             // Because first query string is starts with '?' and the rest with '&'
//             if (indexOfQueryString === 1) {
//                 queryString += "?" + item + "=" + queryStringObj[item];
//             } else {
//                 queryString += "&" + item + "=" + queryStringObj[item];
//             }
//         }
//     }
//
//     return queryString;
// }
