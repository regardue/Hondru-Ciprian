const NAMES_PATTERN = new RegExp(/^[^\d\s]+$/);
const EMAIL_REGEX = new RegExp
const PASSWORD_REGEX = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
const MIN_AGE = 18;
const MAX_AGE = 100;

const validateEmail = (inputValue) => {
    let validationResponse = {
        succes:null,
        message:null
    }
    if(!inputValue){
        validationResponse.message = "Email is required"
        validationResponse.success = false;
    }
    else if(!EMAIL_REGEX.test(inputValue)){
        validationResponse.message = "Email is in the wrong format"
        validationResponse.success = false;
    }
    else{
        validationResponse.message = ""
        validationResponse.success = true;
    }
}


export const validationRules;