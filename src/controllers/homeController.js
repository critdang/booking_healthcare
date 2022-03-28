import db from '../models/index';
import CRUDService from "../services/CRUDService"
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
    return res.render('test/about.ejs');
}
let getCRUD= (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async(req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('post CRUD from server')
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUser = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs',{
        dataTable: allUser
    })
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if(id) {
        await CRUDService.delete(id);
        return res.send('delete the user succeed!')
    }
    else{
        return res.send("user not found!");
    }
}
//export ra
module.exports = {
    getHomePage: getHomePage,
    getAboutPage:getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
}