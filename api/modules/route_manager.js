const express = require('express');
const router = express.Router();

const authRoutes  = require('./routes/auth_route');

router.use('/auth/', authRoutes);


module.exports = router;