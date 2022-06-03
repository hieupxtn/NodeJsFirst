import db from "../models/index"
import CRUDServices from "../services/CRUDServices"

let getHomePage = async(req, res) =>{
    try{
        let data = await db.User.findAll();
        console.log('----------------------------------')
        console.log(data)
        console.log('----------------------------------')
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        });
        
    }catch{
        console.log(e)
    }
    
}

let getCRUD = async(req, res) =>{
    return res.render('CRUDPage.ejs');
}

let postCRUD = async(req, res) =>{
    let message = await CRUDServices.createNewUser(req.body);
    console.log(message);
    console.log(req.body);
    return res.send('post CRUD from server');
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
}