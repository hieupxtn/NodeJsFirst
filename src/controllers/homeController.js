import res from "express/lib/response";
import db from "../models/index"
import CRUDServices from "../services/CRUDServices"

let getHomePage = async(req, res) =>{
    try{
        let data = await db.User.findAll();
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

let displayGetCRUD = async(req, res) => {
    let data = await CRUDServices.getAllUser();
    return res.render('displayCRUD.ejs',{
        dataTable: data
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if(userId){
        let userData = await CRUDServices.getUserInfoById(userId);
        return res.render('editCRUD.ejs', {
            user: userData
        });
    }
    else{
        return res.send('User not found!');
    } 
}

let putCRUD = async(req, res) => {
    let data = req.body;
    let allUser = await CRUDServices.updateUserData(data);
    return res.render('displayCRUD.ejs',{
        dataTable: allUser
    })
}

let deleteCRUD = async(req, res) =>{
    let id  = req.query.id;
    if(id){
        await CRUDServices.deleteUserById(id);
        return res.send("delete user")
    }else
    {
        return res.send('User not found!')
    }
    
    
}
module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}