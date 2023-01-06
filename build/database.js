"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import mysql from 'promise-mysql'
const mysql2_1 = __importDefault(require("mysql2"));
const keys_1 = __importDefault(require("./keys"));
const pool = mysql2_1.default.createPool(keys_1.default.database);
const promisePool = pool.promise();
pool.getConnection(function (err, conn) {
    console.log('DB is conected');
    // Connection is automatically released when query resolves
});
//pool.getConnectcion().then(connection =>{
//    pool.releaseConnection(connection)
//    console.log('db in connected')
//});
exports.default = pool;
promisePool;
