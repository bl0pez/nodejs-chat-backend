import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    online: {
        type: Boolean,
        default: false,
    },
}, {
    versionKey: false,
    timestamps: true,
});

UserSchema.method('toJSON', function() {
    const { password, ...object } = this.toObject();
    return object;
});

export const UserModel = model('User', UserSchema);