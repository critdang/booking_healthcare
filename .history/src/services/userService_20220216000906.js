import db from "../models/index";
import bcycrpt from 'bcryptjs';
let handleUserLogin = (email,password) => {
    return new Promise(async(resolve, reject) => {
        try{
            let userData = {};
            let isExist = await checkUserEmail(email);
            if(isExist) {
                let user = await db.User.findOne({
                    where: {email: email}
                });
                if(user) {  
                    // compare pass
                    // bcycrpt.compareSync("not_bacon",hash);
                }
                resolve()
            }else {
                // return error
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in our system.Try again.`
                resolve(userData); 
            }
        }catch(e){
            reject(e);
        }
    })
}

let compareUserPassword = () => {
    return new Promise(async(resolve, reject) => {
        try {
            
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