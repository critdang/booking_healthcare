import db from "../models/index";
// import bcycrpt from 'bcryptjs';
var bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

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

let handleUserLogin = (email,password) => {
    return new Promise(async(resolve, reject) => {
        try{
            let userData = {};
            let isExist = await checkUserEmail(email);
            if(isExist) {
                let user = await db.User.findOne({
                    //lấy thông tin nào sau khi log in
                    attributes: ['email','roleId','password', 'firstName','lastName'],
                    where: {email: email},
                    raw: true,
                });
                if(user) {  
                    // compare pass
                    let check = await bcycrpt.compareSync(password,user.password);
                    console.log(user.password)
                    if(check) {
                        userData.errCode = 0;
                        userData.errMessage = 'ok';
                        delete user.password; //xóa pass trong API object
                        userData.user = user;
                    }else {
                        userData.errCode = 3;
                        userData.errMessage = 'wrong password';
                    }
                }else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`
                }
            } else {
                // return error
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in our system.Try again.`
            }
            resolve(userData); 
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

let getAllUsers = (userId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let users = '';
            if(userId === 'ALL'){
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                });
            }if(userId && userId !== 'ALL'){
                users = await db.User.findOne({
                    where: {id: userId},
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users);
        }catch (e) {
            reject(e);
        }
    })
}

let createNewUser = async (data) => {
    console.log('create New User', data);
    return new Promise(async (resolve, reject) => {
        try {
            //check email is exist ??
            let check = await checkUserEmail(data.email);
            if (check===true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email address is already in used. Please try another email address'
                })
            }
            let hashPasswordFromnbcrypt = await hashUserPassword(data.password);
            await db.User.create({
                // email: data.email,
                // password: hashPasswordFromnbcrypt,
                // firstName: data.firstName,
                // lastName: data.lastName,
                // address: data.address,
                // phoneNumber: data.phoneNumber,
                // gender: data.gender,
                // roleId: data.role,
                // positionId: data.position
                email: data.email,
                password: hashPasswordFromnbcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true: false,
                roleId: data.roleId,
                positionId: data.position, //tại sao không là data.positionId
                image: data.avatar
            })
            resolve({
                errCode: 0,
                message: 'OK'
            })
        } catch (e) {
            
            reject(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let foundUser = await db.User.findOne({
            where: {id: userId},
        })
        if(!foundUser) {
            resolve({
                errCode: 2,
                errMessage:`The user isn't exist`
            })
        }
        // if(foundUser) {
        //     //method trong sequelize
        //     await foundUser.destroy();
        // }
        await db.User.destroy({
            where: {id: userId}
        });
        resolve({
            errCode: 0,
            message: 'The user is deleted'
        })
    })
}
let updateUserData = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            console.log('check data from nodejs',data)
            if(!data.id || !data.roleId || !data.positionId || !data.gender) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter'
                })
            }
            let user = await db.User.findOne({
                where: {id: data.id},
                raw: false
            })
            if(user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.gender = data.gender;
                user.phoneNumber = data.phoneNumber;
                if(data.avatar) {
                    user.image = data.avatar; //lấy từ phần Create với trường image:data.avatar
                }

                await user.save();
                // await db.User.save({
                //     firstName: data.firstName,
                //     lastName: data.lastName,
                //     address: data.address
                // })

                resolve({
                    errCode: 0,
                    message: 'Update the user succeeds!'
                });
            }else{
                resolve({
                    errCode: 1,
                    errMessage: 'User not found!'
                });
            }
        }catch (e) {
            reject(e);
        }
    })
}
let getAllCodeService = (typeInput) => {
    return new Promise(async(resolve, reject) => {
        try{
            if(!typeInput) {
                resolve({
                    errCode: 1,
                    erMessage: 'Missing required parameter'
                })
            }else{
                let res = {};
                let addcode = await db.Allcode.findAll({
                where: {type: typeInput}
                });
                res.errCode = 0;
                res.data = addcode;
                resolve(res);
            }
            
        }catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers:getAllUsers,
    createNewUser: createNewUser,
    deleteUser:deleteUser,
    updateUserData:updateUserData,
    getAllCodeService:getAllCodeService
}