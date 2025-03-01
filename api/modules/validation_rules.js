const checkValidatorRules = {


    signUplValidation: {
        first_name: 'required',
        last_name: 'required',
        role: 'required|in:Customer,Admin',
        email: 'required|email',
        password: 'required'
    },

    loginValidation: {
        email: 'required|email',
        password: 'required',
        role: 'required'
    },

    verifyEmailValidation: {
        user_id: 'required',
    }


}

module.exports = checkValidatorRules;