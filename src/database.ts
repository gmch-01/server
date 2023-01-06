//import mysql from 'promise-mysql'
import mysql from 'mysql2'
import keys from './keys'


const pool = mysql.createPool(keys.database);
const promisePool = pool.promise();
pool.getConnection(function (err, conn) {
    console.log('DB is conected')
    // Connection is automatically released when query resolves
});
//pool.getConnectcion().then(connection =>{
//    pool.releaseConnection(connection)
//    console.log('db in connected')
//});

export default pool; promisePool; 