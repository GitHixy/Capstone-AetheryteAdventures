const XIVAPI = require('@xivapi/js')
const xiv = new XIVAPI()


const searchFC = async (req, res) => {
   const { name, server } = req.query;
   const private_key = process.env.FFXIV_API_KEY
   try {
    const response = await xiv.freecompany.search(name, {server, private_key})
    res.send(response);
   } catch (e) {
    console.log(e)
   }
   
};

module.exports = { searchFC };