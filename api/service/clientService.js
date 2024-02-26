const db = require("../utils/database")

exports.findAll = async () => {
    try{
        const result = await db.execute("SELECT * FROM clients");
        return result[0]
    }
    catch(error){
        return {
            sqlError: error.message
        }
    }
}

