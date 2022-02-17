import db from "../models/index";
let handleUserLogin = (email,password) => {

}

let checkUserEmail = (userEmail) => {
    return new Promise(async(resolve, reject) => { //bất đồng bộ
        try {
            let user = await db.User.findOne({ 
                where: {email: userEmail}
            })//bảng trong models(nên cần viết hoa)
            if(user) {
                resolve(true);
            }else {
                resolve(false);
            }
        }catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin
}