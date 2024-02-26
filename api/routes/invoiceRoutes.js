const express = require("express");
const router = express.Router();
const invoiceController = require("../controller/invoiceController");

const {
    fetchAll,
    fetchById,
    createInvoice,
    editInvoice,
    removeInvoice,
} = invoiceController;

router.get("/invoices", fetchAll)
router.get("/invoices/:id", fetchById)
router.post("/invoices", createInvoice)
router.patch("/invoices/:id", editInvoice)
router.delete("/invoices/:id", removeInvoice)

module.exports = router;