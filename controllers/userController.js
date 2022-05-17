const {User, Thought} = require("../models");

const getUsers = async (req,res)=>{
    try{
        const users = await User.find().populate("friends").populate("thoughts") ;
        res.status(200).json(users)
    }catch(err){
        res.status(500).json(err)
    }
}

const createUser = async (req,res)=>{
    try{
        const newUser = await User.create(req.body);
        res.status(200).json(newUser)
    }catch(err){
        res.status(500).json(err)
    }
}

const getSingleUser = async (req,res)=>{
    try{
        const user = await User.findById(req.params.userId).populate("friends");
        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
}

const updateUser = async (req,res)=>{
    try{

        const user = await User.findOneAndUpdate(
            {_id:req.params.userId},
            {$set:req.body},
            {runValidators:true,new:true}
        ).populate("friends")
        if (!user){
            res.status(404).json({message:"no user with this id"})
        }
        else{
            res.json(user)
        }
    }catch(err){
        res.status(500).json(err)
    }
}

const deleteUser = async (req,res)=>{
    try{
        const user = await User.findById(req.params.userId)
        await User.findOneAndRemove({_id:req.params.userId})
        const username = user.userName;
        console.log(`deleted the following user: ${username}`)
        if (!user){
            res.status(404).json({message:"no user with this id"})
        }
        else{
            console.log("in user")
            const removeThoughts = await Thought.deleteMany({username})
        res.status(200).json(user)
        }
    }catch(err){
        res.status(500).json(err)
    }
}

const addFriend = async (req,res)=>{
    try{
        const user = await User.findOneAndUpdate(
            {_id:req.params.userId},
            {$addToSet:{friends:req.params.friendId}},
            {runValidators:true,new:true}
        ).populate("friends") 
        if (!user){
            res.status(404).json({message:"no user with this id"})
        }
        else{
            res.status(200).json(user)
        }
    }catch(err){
        res.status(500).json(err)
    }
}

const deleteFriend = async (req,res)=>{
    try{
        console.log("removing friend")
        const user = await User.findOneAndUpdate(
            {_id:req.params.userId},
            {$pull:{friends:req.params.friendId}},
            {runValidators:true,new:true}
        ).populate("friends")
        if (!user){
            res.status(404).json({message:"no user with this id"})
        }
        else{
            res.status(200).json(user)
        }
    }catch(err){
        res.status(500).json(err)
    }
}

module.exports = {
    getUsers,
    createUser,
    getSingleUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend

}