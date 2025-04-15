const express = require('express');
const router = express.Router();

const authenticateToken = require("../Model/autenticatetoken.js")

const { index } = require("../controller/indexController")

router.get("/",index)


module.exports = router
