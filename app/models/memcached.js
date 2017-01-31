/**
 * Created by aryzhavskij on 1/30/17.
 */
"use strict";

const Memcache = require('memcached'),
    memcache = new Memcache('localhost:11211'),
    Q=require('q');

/**
 * Встановлюємо звязок з сервером memcached
 */
// memcache.connect( 'localhost:11211', function( err, conn ){
//     if( err ) {
//         console.log("Error ==> connection");
//     }else {
//         console.log("Connected");
//     }
// });


module.exports = {
    /**
     * @example curl -v -X GET "http://127.0.0.1:3000/users/2/purchases"
     */
    getById:(id)=> {
        return new Promise((resolve, reject)=>{
            let count;
            try {
                memcache.get(id, (error, val) => {
                    if (error) {
                        console.log("my error");
                        // reject("add error: {error}");
                    } else {
                        if (!val) {
                            console.log(val);
                            resolve({});
                        } else {
                            let count = val.toString();
                            console.log(val, "getID");
                            resolve(val);
                        }
                    }
                })
            }catch(e){
                reject(e)
            }
        })

    },
    /**
     * @example curl -v -X POST "http://127.0.0.1:3000/users/2/purchases" -d '{"count":10}'
     * @param id
     * @param params
     */
    add: (id,params)=>{
        return new Promise((resolve, reject)=>{
            try {
                let count = JSON.stringify(params);
                console.log(count, id);
                memcache.add(id, count, 100, function (err) {
                    if (err) {
                        console.log("Error");
                        reject(err);
                    } else {
                        console.log("Add");
                        resolve(count);
                    }
                });
            }catch(e){
                console.log("Catch");
                reject(e);
            }
        })
    },


    /**
    //  * @example curl -v -X DELETE "http://127.0.0.1:3000/users/3"
    //  */

    delete:(id)=>{
        return new Promise((resolve, reject)=>{
                try{
                    memcache.delete(id, function(err){
                        if(err)
                            reject(err);
                        else
                            resolve(`User(${id}) count purchases was deleted`);
                    } )
                }catch(e){
                    reject(e);
                }
            }
        )
    }

};