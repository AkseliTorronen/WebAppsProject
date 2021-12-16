const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let commentSchema = new Schema ({
    postedUnder:{type: String, required: true},
    content:{type: String, required: true},
    user:{type: String, required: true},
    datetime:{type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model("comment", commentSchema);