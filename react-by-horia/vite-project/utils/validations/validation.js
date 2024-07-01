// const NAMES_REGEX = new RegExp(/^[^\d\s]+$/);
// const EMAIL_REGEX = new RegExp(/\S+@\S+\.\S+/);
// const PASSWORD_REGEX = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
// const MIN_AGE = 18;
// const MAX_AGE = 100;

// let validationResponse = {
//     success:null,
//     message:null
// }

// const validateEmail = (inputValue) => {
    
//     if(!inputValue){
//         validationResponse.message = "Email is required"
//         validationResponse.success = false;
//     }
//     else if(!EMAIL_REGEX.test(inputValue)){
//         validationResponse.message = "Email is in the wrong format"
//         validationResponse.success = false;
//     }
//     else{
//         validationResponse.message = ""
//         validationResponse.success = true;
//     }
//     return validationResponse;
// }

// const validateName = (inputValue) => {
    
//     if(!inputValue){
//         validationResponse.message = "Input is required"
//         validationResponse.success = false;
//     }
//     else if(!NAMES_REGEX.test(inputValue)){
//         validationResponse.message = "Input is in the wrong format"
//         validationResponse.success = false;
//     }
//     else if(inputValue.length<2){
//         validationResponse.message = "Input must have at least 2 characters";
//         validationResponse.success = false;
//     }
//     else{
//         validationResponse.message = ""
//         validationResponse.success = true;
//     }
//     return validationResponse;
// }

// const validateAge = (inputValue) => {
//     if(!inputValue){
//         validationResponse.message = "Age is required"
//         validationResponse.success = false;
//     }
//     else if(isNaN(inputValue)){
//         validationResponse.message = "Age must be a number"
//         validationResponse.success = false;
//     }
//     else if(inputValue.length<MIN_AGE){
//         validationResponse.message = "Must be older than 18";
//         validationResponse.success = false;
//     }
//     else if(inputValue.length>MAX_AGE){
//         validationResponse.message = "Must be younger than 100";
//         validationResponse.success = false;
//     }
//     else{
//         validationResponse.message = ""
//         validationResponse.success = true;
//     }
//     return validationResponse;
// }

// const validatePassword = (inputValue) => {
//     if(!inputValue){
//         validationResponse.message = "Password is required"
//         validationResponse.success = false;
//     }
//     else if(PASSWORD_REGEX.test(inputValue)){
//         validationResponse.message = "Password is in the wrong format"
//         validationResponse.success = false;
//     }
//     else{
//         validationResponse.message = ""
//         validationResponse.success = true;
//     }
//     return validationResponse;
// }

// const validateConfirmPassword = (inputValue) => {
//     if(!inputValue){
//         validationResponse.message = "Password is required"
//         validationResponse.success = false;
//     }
//     else if(passwordValue !== ){
//         validationResponse.message = "Passwords do not match"
//         validationResponse.success = false;
//     }
//     else{
//         validationResponse.message = ""
//         validationResponse.success = true;
//     }
//     return validationResponse;
// }


// export const validationRules = {
//     email: validateEmail,
//     firstName: validateName,
//     lastName: validateName,
//     age: validateAge,
//     password: validatePassword,
//     confirmPassword: validateConfirmPassword
// }