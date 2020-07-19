const moongoose = require ('mongoose')

const PostSchema = new moongoose.Schema({

    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    text : {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    likes : [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        text: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: date.now
        }
    }],
    date: {
        type: Date,
        default: date.now
    }
});

module.exports = Post = moongoose.model('post', PostSchema)