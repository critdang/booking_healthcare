import db from '../models/index';
var bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

let createNewUser = async(data) => {
    return new Promise(async(resolve, reject) => {
        try{
            let hashPasswordFromnbcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromnbcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true: false,
                roleId: data.roleId,
            })
            resolve('ok create')
        }catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try{
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        }catch(e){
            reject(e);
        }
    })
}
// let updateUserData = (data) => {
//     return new Promise((resolve, reject) => {
//         try {
//             let user = await db.User.findOne({
//                 where: {id: data.id}
//             })
//             if(user) {
//                 user.firstName = data.firstName;
//                 user.lastName = data.lastName;
//                 user.address = data.address;
                
//                 await user.save();
//                 let allUser = await db.User.findAll();
//                 resolve(allUser);
//             }else{
//                 resolve();
//             }
//         }catch(e){
//             console.log(e);
//         }
//     })
// }

// let deleteUserById = (userId) => {
//     return new Promise((resolve, reject) => {
//         try {
//             let user = await db.User.findOne({
//                 where: {id: userId}
//             })
//             if(user) {
//                 await user.destroy();
//             }
//             resolve();//return
//         }catch(e) {{
//             reject(e);
//         }}
//     })
// }

module.exports = {
    createNewUser: createNewUser,
    // deleteUserById: deleteUserById,
    // updateUserData:updateUserData
}
