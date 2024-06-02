import { Schema, model } from 'mongoose';

const MessageSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});

export const MessageModel = model('Message', MessageSchema);