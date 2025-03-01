const con = require('./database');
const GLOBALS = require('./constant');
const nodemailer = require('nodemailer');
const { logger } = require('../utilities/logger');

const common = {

    /*
    ** Common Single select table details
    */
    async getCommonSingleQuery(query) {
        try {

            const result = await new Promise((resolve, reject) => {
                con.query(query, (err, result) => {

                    if (!err && result.length > 0) {
                        resolve(result[0]);
                    } else {
                        console.log("Common Single Select Error :- ", err);
                        resolve(null);
                    }
                });
            });
            return result;

        } catch (error) {
            console.error("Error in getCommonSingleData:", error);
            logger.error(logger)
            return null; // Return null in case of an error
        }
    },

    async getCommonSingleRecord(tablename, condition) {
        try {

            const result = await new Promise((resolve, reject) => {
                con.query("SELECT * FROM " + tablename + " WHERE " + condition + " ", (err, result) => {
                    if (err) {
                        logger.error("Common Single Select Error :- ", err)
                        return resolve(null);
                    }
                    if (result.length > 0) {
                        resolve(result[0]);
                    } else {
                        resolve(null);
                    }
                });
            });
            return result;

        } catch (error) {
            logger.error("Error in getCommonSingleData:", error)
            logger.error(logger)
            return null; // Return null in case of an error
        }
    },

    async singleInsert(tablename, params) {
        try {

            const result = await new Promise((resolve, reject) => {
                con.query('INSERT INTO ' + tablename + ' SET ?', params, (err, result) => {
                    if (err) {
                        logger.error("Common Single insert Error :- ", err)
                        return resolve(null);
                    }
                    resolve(result.insertId);
                });
            });
            return result;

        } catch (error) {
            logger.error("Error in singleInsert:", error)
            logger.error(logger)
            return null; // Return null in case of an error
        }
    },

    async singleUpdate(tablename, params, condition) {
        try {

            const result = await new Promise((resolve, reject) => {
                con.query('UPDATE ' + tablename + ' SET ? WHERE ' + condition + '', params, (err, result) => {
                    if (err) {
                        console.log("Common Single update Error :- ", err);
                        return resolve(null);
                    }
                    resolve(result);
                });
            });
            return result;

        } catch (error) {
            console.error("Error in getCommonSingleData:", error);
            logger.error(logger)
            return null; // Return null in case of an error
        }
    },

    async singleDelete(tablename, condition) {
        try {
            const result = await new Promise((resolve, reject) => {
                const query = `DELETE FROM ${tablename} WHERE ${condition}`;
                con.query(query, (err, result) => {
                    if (err) {
                        console.log("Common Single Delete Error :- ", err);
                        return resolve(null); // Resolve with null if there's an error
                    }
                    resolve(result.affectedRows); // Return the number of affected rows
                });
            });
            return result;
        } catch (error) {
            console.error("Error in singleDelete:", error);
            logger.error(logger)
            return null; // Return null in case of an error
        }
    },

    async getcommonMultipleQuery(query) {
        try {

            const result = await new Promise((resolve, reject) => {
                con.query(query, (err, result) => {

                    if (!err && result.length > 0) {
                        resolve(result);
                    } else {
                        if (err) {
                            logger.error(`getcommonMultipleQuery Error :-`, err)
                        }
                        resolve(null);
                    }
                });
            });
            return result;

        } catch (error) {
            logger.error("Error in getCommonSingleData:", error)
            logger.error(`getcommonMultipleQuery Error Query :-`, error.sql)
            return null; // Return null in case of an error
        }
    },

    async getCommonMultipleRecord(tablename, condition) {
        try {

            const result = await new Promise((resolve, reject) => {
                con.query("SELECT * FROM " + tablename + " WHERE " + condition + " ", (err, result) => {
                    if (!err && result.length > 0) {
                        resolve(result);
                    } else {
                        console.log("getCommonMultipleRecord Error :- ", err);
                        resolve(null);
                    }
                });
            });
            return result;

        } catch (error) {
            console.error("Error in getCommonSingleData:", error);
            logger.error(logger)
            return null; // Return null in case of an error
        }
    },

    async sendEmail(subject, to_email, message) {
        try {

            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: GLOBALS.EMAIL_ID,
                    pass: GLOBALS.EMAIL_PASSWORD
                }
            });

            let mailOptions = {
                from: `${GLOBALS.EMAIL_ID} ${GLOBALS.APP_NAME}`,
                to: to_email,
                subject: subject,
                html: message
            };

            return await transporter.sendMail(mailOptions);

        } catch (error) {
            logger.error("Error in sendEmail:", error)
            return false;
        }
    },

}

module.exports = common;