const router = require('express').Router();
const menu = require('../model/menu')
const item = require('../model/menu')

router.post('/items', async (req, res) => {
    await item.items().then( result => {
      return res.json(result);
    }).catch( error => {
        return res.json(false);
    })   
  });

  router.post('/get-cart-items', async (req, res) => {
    const { itemIds } = req.body;
    
    if (!itemIds || itemIds.length === 0) {
        return res.json(false);
    }

    try {
        const items = await item.getItemsByIds(itemIds);
        res.json(items);
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ error: "An error occurred while fetching items." });
    }
});
module.exports = router;