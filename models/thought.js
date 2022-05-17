const { Schema, model } = require('mongoose');
const reactionsSchema = require('./reaction');

// Schema to create thought model
const thoughtSchema = new Schema(
    {
        thoughtText:{
            type:String,
            required:true,
            maxlength:280,
            minlength:1
        },
        createdAt:{
            type:Date,
            default: new Date(),
            
        },
        username:{
            type:String,
        required:true
        },
        reactions:[reactionsSchema]
    },
    {
        toJSON:{
            virtuals:true
        },
        id:false
    }
)

thoughtSchema.virtual("getDate").get(function(){
    return this.createdAt.toDateString;
})

thoughtSchema.virtual("numReactions").get(function(){
    return this.reactions.length
})


const Thought = model('thought', thoughtSchema);

module.exports = Thought;
