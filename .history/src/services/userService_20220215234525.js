import db from "../models/index";
let handleUserLogin = (email,password) => {
    return new Promise(async(resolve, reject) => {
        try{
            let userData = {};
            let isExist = await checkUserEmail(email);
            if(isExist) {
                // compare pass
                resolve()
            }else {
                // return error
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in our system.Try again.`
                resolve() 
            }
        }catch(e){
            reject(e);
        }
    })
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