import db from '../models/index';
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        
        return res.render('homepage.ejs',{
            data: JSON.stringify(data)
        });
    }catch (e) {
        console.log(e);
    }

    // vì ở view engine đã cài đặt là nằm ở src/views nên không cần đường dẫn
    // render ra view
}
let getAboutPage = (req, res) => {
    return res.render('test/about.ejs')
}
let getCRUD= (req, res) => {
    return res.render('crud.ejs')
}
//export ra
module.exports = {
    getHomePage: getHomePage,
    getAboutPage:getAboutPage,
    getCRUD: getCRUD,
}