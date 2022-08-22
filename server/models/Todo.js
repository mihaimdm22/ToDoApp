import mongoose from "mongoose";
const Schema = mongoose.Schema;
const todoSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        detail: String,
        date: Date,
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
        },
        time: Number,
    },
    { timestamps: true }
);
const Todo = mongoose.model("todo", todoSchema);
export default Todo;
