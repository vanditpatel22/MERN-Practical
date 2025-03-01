const cryptoLib = require('cryptlib');
const GLOBALS = require('../config/constant.js');
const shaKey = cryptoLib.getHashSha256(GLOBALS.KEY, 32);
const { default: localizify } = require('localizify');
const en = require('../languages/en.js');
const { t } = require('localizify');
const codes = require('../config/status_code.js');
const cryptoJS = require('crypto-js');
const ADMIN_KEY = cryptoJS.enc.Utf8.parse(GLOBALS.ADMIN_KEY);
const ADMIN_IV = cryptoJS.enc.Utf8.parse(GLOBALS.ADMIN_IV);
const { logger } = require('../utilities/logger.js')


let access_level;

const headerValidator = {

    // function for extract accept language from request header and set in req globaly
    async extractHeaderLanguage(req, res, next) {

        try {

            const acceptLanguageHeader = req.headers['accept-language'];
            let language;

            if (acceptLanguageHeader && acceptLanguageHeader !== 'en-GB,en-US;q=0.9,en;q=0.8') {
                language = acceptLanguageHeader;
            } else {
                language = 'en';
            }

            req.lang = language;

            access_level = (req.headers["access-level"] != undefined && req.headers["access-level"] != "") ? req.headers["access-level"] : 0;

            req.access_level = access_level
            localizify.add(language, en).setLocale('en');

            next(); // Use next to end the middleware function

        } catch (error) {
            console.log(error);
        }
    },

    /*
    ** Function to validate API key of header (Note : Header keys are encrypted)
    */
    async validateHeaderApiKey(req, res, next) {
 
        try {

            const apiKey = req.headers['api-key'];

            if (apiKey) {

                const decryptedApiKey = (access_level != '0')
                    ? cryptoJS.AES.decrypt(apiKey, ADMIN_KEY, { iv: ADMIN_IV }).toString(cryptoJS.enc.Utf8)
                    : cryptoLib.decrypt(apiKey, shaKey, GLOBALS.IV);

                if (decryptedApiKey === GLOBALS.API_KEY) {
                    next();
                } else {
                    headerValidator.sendResponse(req, res, codes.UNAUTHORIZED, codes.INVALID_CODE, { keyword: 'rest_keywords_invalid_api_key', components: {} }, null);
                }
            } else {
                headerValidator.sendResponse(req, res, codes.UNAUTHORIZED, codes.INVALID_CODE, { keyword: 'rest_keywords_invalid_api_key', components: {} }, null);
            }
        } catch (error) {
            console.log(error);
            headerValidator.sendResponse(req, res, codes.INTERNAL_ERROR, codes.INVALID_CODE, { keyword: 'rest_keywords_keywords_internal_error', components: {} }, null);
        }
        return false;
    },


    // Decrypt user request
    async decryption(req) {

        try {

            let decryptedBody;

            if (Object.keys(req.body).length !== 0) {
                decryptedBody = (access_level != '0')
                    ? cryptoJS.AES.decrypt(req.body, ADMIN_KEY, { iv: ADMIN_IV }).toString(cryptoJS.enc.Utf8)
                    : cryptoLib.decrypt(req.body, shaKey, GLOBALS.IV);
            }

            const parsedBody = (decryptedBody !== undefined) ? JSON.parse(decryptedBody) : {};

            const request = {
                lang: req.lang,
                access_level: req.access_level,
                login_user_id: req.login_user_id,
                user_type: req.user_type,
                ...parsedBody
            };

            return request;

        } catch (error) {

            return {};
        }
    },

    // Encrypt user request
    async encryption(req) {
        try {

            const response = (access_level != '0')
                ? cryptoJS.AES.encrypt(JSON.stringify(req), ADMIN_KEY, { iv: ADMIN_IV }).toString()
                : cryptoLib.encrypt(JSON.stringify(req), shaKey, GLOBALS.IV);

            return response;

        } catch (error) {

            return {};
        }
    },

    //send response 
    async sendResponse(req, res, statusCode, responseCode, responseMessage, responseData) {
        try {
            const formedMsg = await headerValidator.getMessage(req.lang, responseMessage.keyword, responseMessage.components);

            const resultObj = { code: responseCode, message: formedMsg };

            if (responseData !== null) {
                resultObj.data = responseData;
            }

            const response = await headerValidator.encryption(resultObj);

            res.status(statusCode).json(response);
        } catch (error) {

            res.status(500).json({ code: codes.INTERNAL_ERROR, message: 'An internal error occurred' });
        }
    },

    //get the message
    async getMessage(requestLanguage, keywords, components) {
        try {

            if (requestLanguage === 'ar') {
                localizify.add('ar', ar).setLocale('ar');
            } else {
                localizify.add('en', en).setLocale('en');
            }

            const returnMessage = t(keywords, components);
            return returnMessage;
        } catch (error) {
            logger.error(error);
            throw error; // Handle or log the error appropriately
        }
    },


    // check Validation Rules
    checkValidationRules: async (request, rules) => {
        try {
            const v = require('Validator').make(request, rules);
            const validator = {
                status: true,
            }
            if (v.fails()) {
                const ValidatorErrors = v.getErrors();
                validator.status = false
                for (const key in ValidatorErrors) {
                    validator.error = ValidatorErrors[key][0];
                    break;
                }
            }
            return validator;
        } catch (error) {
            // logger.error(error)
            console.log(error);
            return false;
        }

    },
}

module.exports = headerValidator