const cryptoLib = require('cryptlib');
const common = require('../../config/common');
const CODE = require('../../config/status_code');
const middleware = require('../../middleware/header_validator');
const GLOBALS = require('../../config/constant');
const template = require('../../config/template');
const shaKey = cryptoLib.getHashSha256(GLOBALS.KEY, 32);
const moment = require('moment')
const { logger } = require('../../utilities/logger');

const userModel = {

    /*
    ** Function for check unique field
    */
    async checkUniqueFields(user_id, request) {
        try {
            const emailResult = await userModel.checkUniqueEmail(user_id, request);
            return emailResult;

        } catch (error) {

            return { code: CODE.ERROR_CODE, message: { keyword: 'rest_keywords_somethingwrong_check_uniquefields', components: {}, }, unique: false };
        }
    },



    /*
    ** Function to check email uniqueness
    */
    async checkUniqueEmail(user_id, request) {
        try {
            if (request.email !== undefined && request.email !== '') {

                let uniqueEmail = "SELECT * FROM tbl_user WHERE email = '" + request.email + "'  AND is_deleted = '0'";

                if (user_id != undefined && user_id != '') {
                    uniqueEmail += " AND id != '" + user_id + "'";
                }

                // Check database for this email registered
                const userProfile = await common.getCommonSingleQuery(uniqueEmail);

                return userProfile !== null
                    ? { code: CODE.ERROR_CODE, message: { keyword: 'rest_keywords_duplicate_email', components: {} }, unique: false }
                    : { code: CODE.SUCCESS_CODE, message: { keyword: 'rest_keywords_success', components: {} }, unique: true };

            } else {
                return { code: CODE.SUCCESS_CODE, message: 'rest_keywords_success', unique: true };
            }
        } catch (error) {
            logger.error(error);
            return { code: CODE.ERROR_CODE, message: { keyword: 'rest_keywords_failed_to_check_duplicate_email', components: {}, }, unique: false };
        }
    },



    /*=============================================================================================================================
          Signup For User
    =============================================================================================================================*/
    async signUp(req, res) {

        try {

            let checkUniqueFields = await userModel.checkUniqueFields('', req);

            if (checkUniqueFields.unique) {

                let userParam = {

                    first_name: req.first_name,
                    last_name: req.last_name,
                    email: req.email,
                    role: req.role,
                    password: (req.password != undefined && req.password != "") ? cryptoLib.encrypt(req.password, shaKey, GLOBALS.IV) : '',
                    email_verify: 'Pending',
                    created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                    updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                }


                const userID = await common.singleInsert(`tbl_user`, userParam);

                if (userID != null) {

                    userParam.url = "http://localhost:3000/verify-email/" + btoa(userID);

                    const verifyTemplate = await template.verify_email(userParam);

                    const subject = 'Verify Email';

                    //Function to send email
                    let emailSend = await common.sendEmail(subject, req.email, verifyTemplate);

                    if (emailSend) {

                        return middleware.sendResponse(req, res, CODE.SUCCESS_STATUS, CODE.SUCCESS_CODE, {
                            keyword: 'rest_keywords_user_signup_success',
                            components: {}
                        }, null);

                    } else {
                        return middleware.sendResponse(req, res, CODE.SUCCESS_STATUS, CODE.ERROR_CODE, {
                            keyword: 'rest_keywords_failed_to_send_verification_email',
                            components: {}
                        }, null);
                    }

                } else {

                    return middleware.sendResponse(req, res, CODE.SUCCESS_STATUS, CODE.ERROR_CODE, {
                        keyword: 'rest_keywords_user_signup_failed',
                        components: {}
                    }, null);

                }


            } else {

                return middleware.sendResponse(req, res, CODE.SUCCESS_STATUS, checkUniqueFields.code,
                    checkUniqueFields.message,
                    null);
            }

        } catch (error) {

            logger.error(error)

            return middleware.sendResponse(req, res, CODE.INTERNAL_ERROR, CODE.ERROR_CODE, {
                keyword: 'rest_keywords_keywords_internal_error',
                components: { error: error.message }
            }, null);

        }

    },


    /*=============================================================================================================================
         Admin Login For User
    =============================================================================================================================*/
    async login(req, res) {

        try {

            let condition = `email='${req.email}' AND is_deleted='0'`;

            const userDetails = await common.getCommonSingleRecord(`tbl_user`, condition);


            if (userDetails != null) {

                const encPass = await cryptoLib.encrypt(req.password, shaKey, GLOBALS.IV);
                if (userDetails.password != encPass) {

                    return middleware.sendResponse(req, res, CODE.SUCCESS_STATUS, CODE.ERROR_CODE, {
                        keyword: 'rest_keywords_invalid_password',
                        components: {}
                    }, null);

                } else if (userDetails.role != 'Admin') {

                    return middleware.sendResponse(req, res, CODE.SUCCESS_STATUS, CODE.ERROR_CODE, {
                        keyword: 'rest_keywords_invalid_role',
                        components: {}
                    }, null);

                } else if (userDetails.is_active == 0) {

                    return middleware.sendResponse(req, res, CODE.SUCCESS_STATUS, CODE.INACTIVE_CODE, {
                        keyword: 'rest_keywords_inactive_accountby_admin',
                        components: {}
                    }, null);

                } else if (userDetails.email_verify === 'Pending') {

                    return middleware.sendResponse(req, res, CODE.SUCCESS_STATUS, CODE.EMAIL_UNVERIFIED, {
                        keyword: 'rest_keywords_email_notverify',
                        components: {}
                    }, null);

                } else {

                    let loginParams = {
                        login_status: "Online",
                        last_login: moment().format('YYYY-MM-DD HH:mm:ss'),
                    }

                    const updateUser = await common.singleUpdate(`tbl_user`, loginParams, `id='${userDetails.id}'`);
                    const loginUserDetails = await common.getCommonSingleRecord(`tbl_user`, `id='${userDetails.id}'`);

                    return middleware.sendResponse(req, res, CODE.SUCCESS_STATUS, CODE.SUCCESS_CODE, {
                        keyword: 'rest_keywords_user_login_success',
                        components: {}
                    }, loginUserDetails);

                }


            } else {

                return middleware.sendResponse(req, res, CODE.SUCCESS_STATUS, CODE.ERROR_CODE, {
                    keyword: 'rest_keywords_invalid_email',
                    components: {}
                }, null);

            }

        } catch (error) {

            logger.error(error)

            return middleware.sendResponse(req, res, CODE.INTERNAL_ERROR, CODE.ERROR_CODE, {
                keyword: 'rest_keywords_keywords_internal_error',
                components: { error: error.message }
            }, null);

        }

    },

    /*=============================================================================================================================
         Verify Email
    =============================================================================================================================*/
    async verifyEmail(req, res) {

        try {

            let params = {
                email_verify: 'Verified',
                verify_time: moment().format('YYYY-MM-DD HH:mm:ss')
            }

            const verifyUser = await common.singleUpdate('tbl_user', params, `id='${req.user_id}'`);

            if (verifyUser != null) {


                return middleware.sendResponse(req, res, CODE.SUCCESS_STATUS, CODE.SUCCESS_CODE, {
                    keyword: 'rest_keywords_email_verify',
                    components: {}
                }, null);

            } else {

                return middleware.sendResponse(req, res, CODE.SUCCESS_STATUS, CODE.ERROR_CODE, {
                    keyword: 'rest_keywords_verify_fail',
                    components: {}
                }, null);

            }


        } catch (error) {

            logger.error(error)

            return middleware.sendResponse(req, res, CODE.INTERNAL_ERROR, CODE.ERROR_CODE, {
                keyword: 'rest_keywords_keywords_internal_error',
                components: { error: error.message }
            }, null);

        }

    }


}

module.exports = userModel;