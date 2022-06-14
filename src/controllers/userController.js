import userServices from '../services/userServices'

let handleLogin = async (req, res) => {
    let email = req.body.email;
    console.log('your email: ' + email)
    let password = req.body.password;
    
    if(!email || !password){
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }

    let userData = await userServices.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        userData,
    })
}

module.exports = {
    handleLogin: handleLogin,
}