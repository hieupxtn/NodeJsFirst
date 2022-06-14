import db from "../models/index";
import bcrypt from 'bcryptjs';

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email)
            if(isExist){
                let user =  await db.User.findOne({
                    where: {email: email}
                });
                if(user){
                    // bcrypt.compareSync("B4c0/\/", hash); // true
                    // bcrypt.compareSync("not_bacon", hash); // false
                    let check = await bcrypt.compareSync( password, user.password);
                    if(check){
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';
                        userData.user = user;
                    }else{
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password!'
                    }
                }else{
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`;
                }
                
            }else{
                userData.errCode = 1;
                userData.errMessage = 'Yours Email isnt exist in your system. Plz try other email';
                resolve(userData)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if(user)
            {
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
}