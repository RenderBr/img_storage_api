var express = require('express');
var router = express.Router();
require('dotenv').config();

/* GET an image */
router.get('/:imageId', function(req, res, next) {
  const imageId = req.params.imageId;
  
  if (!imageId){
    return res.status(400).json({ error: 'Missing imageId' });
  }
  
});

router.post('/', function(req, res, next) {
    const { base64, auth_token } = req.body;
    
    if (!base64){
        return res.status(400).json({ error: 'Missing base64' });
    }
    
    if (!auth_token){
        return res.status(400).json({ error: 'Missing auth_token' });
    }
    
    if (auth_token !== process.env.AUTH_TOKEN){
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Save the image to a file, it's literally just a base64 string
    const fs = require('fs');
    
    const base64Data = Buffer.from(base64, 'base64');
    
    const fileName = `image-${Date.now()}.png`;
    
    fs.writeFile(`public/images/${fileName}`, base64Data, (err) => {
        if (err){
            console.error(err);
            return res.status(500).json({ error: 'Error saving image' });
        }
        
        res.json({ message: 'Image saved', fileName });
    });
});

module.exports = router;
