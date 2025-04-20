"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareStrings = exports.hashString = void 0;
const config_1 = __importDefault(require("config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const logger_js_1 = __importDefault(require("./logger.js"));
const errors_js_1 = require("./errors.js");
const saltGen = config_1.default.get("dbConfig.saltWorkFactor");
const hashString = (string) => new Promise((resolve, reject) => {
    bcryptjs_1.default.genSalt(saltGen, (err, salt) => {
        bcryptjs_1.default.hash(string, salt, (error, hash) => {
            if (error) {
                logger_js_1.default.error(error.message);
                throw new errors_js_1.ServerErrorException();
            }
            resolve(hash);
        });
    });
});
exports.hashString = hashString;
const compareStrings = (string, hashedString) => new Promise((resolve, reject) => {
    bcryptjs_1.default.compare(string, hashedString, (err, res) => {
        if (err) {
            logger_js_1.default.error(err.message);
            throw new errors_js_1.ServerErrorException();
        }
        resolve(res);
    });
});
exports.compareStrings = compareStrings;
