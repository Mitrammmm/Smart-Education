const ResourceModel = require('../models/resource');

const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: 'dmhs50pdp', 
  api_key: '211654577373189', 
  api_secret: 'niITexNrWo1TrPkyJeVpK6wTUJU' 
});

class ResourceController {
    static insertResource = async (req,res)=>{
        try{
            // console.log(req.body)
            // const {id} = req.userData
            const {title,description,link,category} = req.body
            const result = new ResourceModel({
                title: title,
                description: description,
                link: link,
                category: category,
            })
            await result.save();
            res.redirect('/description')
        }catch(err){
            console.log(err)
        }
    }
    // static displayResource = async (req,res)=>{
    //     try{
    //         const resource = await ResourceModel.find();
    //         res.render('/description', {r: resource});
    //     }catch(err){
    //         console.log(err)
    //     }
    // }
}

module.exports = ResourceController