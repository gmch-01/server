//import mysql from 'promise-mysql'
import keys from './keys'
import mysql from 'mysql2'

const pool = mysql.createPool(keys.database);

pool.getConnection(function(err,conn){
    console.log('DB is conected')
// Connection is automatically released when query resolves
});
//pool.getConnectcion().then(connection =>{
//    pool.releaseConnection(connection)
//    console.log('db in connected')
//});

export default pool; 