const {Thought, User} = require("../models")

const getThoughts = async (req,res)=>{
    try{
    const thoughts = await Thought.find();
     res.status(200).json(thoughts)   
    }catch(err){
        res.status(500).json(err)
    }
}

const getSingleThought = async(req,res)=>{
    try{
        console.log("working")
        const thought = await Thought.findById(req.params.thoughtId).populate("reactions");
        
        if(!thought){
            res.status(404).json({message:"no thought with that id"})
        }
        else res.status(200).json(thought)
    }catch(err){
        res.status(500).json(err)
    }
}

const createThought = async(req,res)=>{
    try{
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            {userName:req.body.username},
            {$addToSet:{thoughts:thought._id}},
            {runValidators:true,new:true}
        )
        res.status(200).json(thought)
    }catch(err){
        res.status(500).json(err)
    }
}

const updateThought = async(req,res)=>{
    try{
        const thought = await Thought.findOneAndUpdate(
            {_id:req.params.thoughtId},
            {$set:req.body},
            {runValidators:true,new:true}
        ).populate("reactions")
        if(!thought){
            res.status(404).json({message:"no thought with that id"})
        }
        else res.status(200).json(thought)
    }catch(err){
        res.status(500).json(err)
    }
}

const deleteThought = async (req,res)=>{
    try{
        const thought = await Thought.findOneAndRemove({
            _id:req.params.thoughtId
        })
        if (!thought){
            res.status(404).json({message:"no thought with this id"})
        }
        else{
            res.status(200).json(thought)
        }
    }catch(err){
        res.status(500).json(err)
    }
}

const createReaction = async(req,res)=>{
    try{
        console.log("working")
        const thought = await Thought.findOneAndUpdate(
            {_id:req.params.thoughtId},
            {$addToSet:{reactions:req.body}},
            {runValidators:true,new:true}
        )
        console.log("passed it")
        if (!thought){
            res.status(404).json({message:"no user with this id"})
        }
        else{
            res.status(200).json(thought)
        }
    }catch(err){
        res.status(500).json(err)
    }
}

const deleteReaction = async(req,res)=>{
    try{
        const thought = await Thought.findOneAndUpdate(
            {_id:req.params.thoughtId},
            {$pull:{reactions:{reactionId:req.body.id}}},
            {runValidators:true,new:true}
        ).populate("reactions")
        if (!thought){
            res.status(404).json({message:"no user with this id"})
        }
        else{
            res.status(200).json(thought)
        }
    }catch(err){
        res.status(500).json(err)
    }
}


module.exports = {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
}