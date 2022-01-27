// import { useState } from "react";

// const useFormSubmit = (userInput, url) => {
//     const [error, setError] = useState(false);

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         submitLoginAndRegistrationEndpoint(userInput, url)
//             .then((response) => {

//                 // if (response.ok) {
//                 //     location.replace("/");
//                 // } else {
//                 //     setError(true);
//                 // }
//             })
//             .catch((err) => {
//                 console.log(`err in fetch ${url}, ${err}`);
//                 setError(true);
//             });
//     };

//     return [handleSubmit, error];
// };

// export default useFormSubmit;
