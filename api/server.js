require("dotenv").config();
const express = require('express');
const GLOBALS = require("./config/constant");
const cors = require('cors')
const routes = require('./modules/route_manager');
const { logger } = require("./utilities/logger");

const PORT = process.env.PORT

const app = express();
app.use(express.text());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


//Routes
app.use('/api/', routes);


try {
	app.listen(PORT);
	logger.info(GLOBALS.APP_NAME + " - Project Run on PORT : " + PORT)

} catch (err) {
    logger.error("Failed to connect")
}