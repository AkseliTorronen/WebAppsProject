const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let postSchema = new Schema ({
    title:{type: String, required: true},
    description:{type: String, required: true},
    snippet:{type: String},
    user:{type: String, required: true},
    comments:{type: Array},
    datetime:{type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model("posts", postSchema);