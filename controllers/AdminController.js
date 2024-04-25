class AdminController{

    static dashboard = async (req, res) => {
        try {
            res.render('admin/dashboard',{message:req.flash('success'),msg:req.flash('error')})
        }catch(err){
            console.log(err);
        }
    }
}
module.exports = AdminController;