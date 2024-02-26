const invoiceService = require("../service/invoiceService");

exports.fetchAll = async (req, res) => {
    try{
        const invoices = await invoiceService.findAll();

        if(invoices.sqlError){
            throw  {
                status: "error",
                errors: {
                    status: 500,
                    message: invoices.sqlError
                }  
            }
        }

        const response = {
            status: "success",
            data: invoices
        }
    
        res.status(200).json(response)
    }
    catch(error){
        res.status(500).json(error)
    }
}

exports.fetchById = async (req, res) => {
    try{
        const {id} = req.params
        const invoice = await invoiceService.findById(id);

        if(invoice.sqlError){
            throw  { 
                status: "error",
                errors: {
                    status: 500,
                    message: invoice.sqlError
                }  
            }
        }

        if(invoice.length < 1){
            throw  { 
                status: "error",
                errors: {
                    status: 404,
                    message: "La ressource est introuvable"
                }  
            }
        }

        const response = {
            status: "success",
            data: invoice
        }
    
        res.status(200).json(response)
    }
    catch(error){
        const {status} = error.errors
        res.status(status).json(error)
    }
}

exports.createInvoice = async (req, res) => {
    try{
        const invoice = req.body;
        const result = await invoiceService.create(invoice);

        if(result.sqlError){
            throw  { 
                status: "error",
                errors: {
                    status: 500,
                    message: result.sqlError
                }  
            }
        }

        const response = {
            status: "success",
            message: "Facture ajoutée avec succès"
        }
    
        res.status(201).json(response)
    }
    catch(error){
        res.status(500).json(error)
    }
}

exports.editInvoice = async (req, res) => {
    try{
        const {id} = req.params;
        const invoice = req.body;
        const result = await invoiceService.update(id, invoice);

        if(result.sqlError){
            throw  { 
                status: "error",
                errors: {
                    status: 500,
                    message: result.sqlError
                }  
            }
        }

        const response = {
            status: "success",
            message: "Facture modifiée avec succès"
        }
    
        res.status(200).json(response)
    }
    catch(error){
        res.status(500).json(error)
    }
}

exports.removeInvoice = async (req, res) => {
    try{
        const {id} = req.params
        const result = await invoiceService.remove(id);

        if(result.sqlError){
            throw  { 
                status: "error",
                errors: {
                    status: 500,
                    message: result.sqlError
                }  
            }
        }

        const response = {
            status: "success",
            message: "Facture supprimée avec succès"
        }
    
        res.status(200).json(response)
    }
    catch(error){
        res.status(500).json(error)
    }
}