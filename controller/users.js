const UserModel = require('../models/users');

const getAllUsers = async (req, res) => {
    try {
        const [data]= await UserModel.getAllUsers();
        res.json({
            message: 'get all users success',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: 'get all users failed',
            error: error
        })
    }

}

const createNewUser = async (req, res) => {
    console.log(req.body);

    if (!req.body.name || !req.body.email) {
        res.status(400).json({
            message: 'name and email is required'
        })
    }
    try{
        await UserModel.createNewUser(req.body);
        res.status(201).json({
            message: 'create users success',
            data: req.body
        })
    } catch (error) {
        res.status(500).json({
            message: 'create users failed',
            error: error
        })
    }
}
const updateUserById = async (req, res) => { 
    console.log(req.body);
    try {
        await UserModel.updateUserById(req.params.id, req.body);
        res.json({
            message: 'update users success',
            data: req.body
        })
    } catch (error) {
        res.status(500).json({
            message: 'update users failed',
            error: error
        })
    }
}

const deleteUserById = (req, res) => {
    console.log(req.body);
    try {
        UserModel.deleteUserById(req.params.id);
        res.json({
            message: 'delete users success',
            data: req.params.id
        })
    } catch (error) {
        res.status(500).json({
            message: 'delete users failed',
            error: error
        })
    }
}

module.exports = { getAllUsers, createNewUser , updateUserById , deleteUserById}