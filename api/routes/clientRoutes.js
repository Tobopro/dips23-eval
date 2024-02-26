const express = require("express");
const router = express.Router();
const clientController = require("../controller/clientController");


router.get("/clients", clientController.fetchAll)


module.exports = router;