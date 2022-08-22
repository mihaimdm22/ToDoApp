import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        address: {
            street: String,
            city: String,
            postalCode: String,
        },
    },
    { timestamps: true }
);

userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
});

const User = mongoose.model("user", userSchema);
export default User;
