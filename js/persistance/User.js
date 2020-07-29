"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.length > 0 && /^[a-zA-Z]*$/.test(value);
            },
            message: 'name may only contain letters'
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.length > 0 && /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(value);
            },
            message: 'email should contain @ and .'
        }
    },
    message: {
        type: String,
        required: true,
    },
});
exports.User = mongoose_1.model('user', userSchema);
