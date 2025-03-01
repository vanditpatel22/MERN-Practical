const authModel = require('../models/auth_model');
const CODES = require('../../config/status_code');
const middleware = require('../../middleware/header_validator.js');
const validationRules = require('../validation_rules.js');


/*=============================================================================================================================
      Sign Up For User/Admin
=============================================================================================================================*/
const signUp = async (req, res) => {

    const request = await middleware.decryption(req);
    const valid = await middleware.checkValidationRules(request, validationRules.signUplValidation);

    if (valid.status) {
        return authModel.signUp(request, res);
    }

    return middleware.sendResponse(req, res, CODES.SUCCESS_STATUS, CODES.ERROR_CODE, {
        keyword: 'rest_keywords_validation_error',
        components: { error: valid.error }
    }, null);
};



/*=============================================================================================================================
        Login User For Admin
=============================================================================================================================*/
const login = async (req, res) => {

    const request = await middleware.decryption(req);
    const valid = await middleware.checkValidationRules(request, validationRules.loginlValidation);

    if (valid.status) {
        return authModel.login(request, res);
    }

    return middleware.sendResponse(req, res, CODES.SUCCESS_STATUS, CODES.ERROR_CODE, {
        keyword: 'rest_keywords_validation_error',
        components: { error: valid.error }
    }, null);
};

/*=============================================================================================================================
        Verify Email for the User/Admin
=============================================================================================================================*/
const verifyEmail = async (req, res) => {

    const request = await middleware.decryption(req);
    const valid = await middleware.checkValidationRules(request, validationRules.verifyEmailValidation);

    if (valid.status) {
        return authModel.verifyEmail(request, res);
    }

    return middleware.sendResponse(req, res, CODES.SUCCESS_STATUS, CODES.ERROR_CODE, {
        keyword: 'rest_keywords_validation_error',
        components: { error: valid.error }
    }, null);
};



module.exports = {
    signUp,
    login,
    verifyEmail
}