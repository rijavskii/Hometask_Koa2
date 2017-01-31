/**
 * Created by aryzhavskij on 1/31/17.
 */

module.exports = (app)=>{
    let memcachedModel = require('../models/memcached');

    return{
        add: async(ctx, next) => {
            try {
                await memcachedModel.add(ctx.params.id, ctx.request.body);
                ctx.status = 200;
            } catch (e) {
                ctx.status = 400;
            }
        },

        getById: async(ctx, next)=>{
            try {
                // console.log("Memcached get")
                // let body = await memcachedModel.getById(ctx.params.id);
                // console.log(await memcachedModel.getById(ctx.params.id), "router");
                // console.log(body, "body");
                ctx.body = await '{"count": 145}';
                ctx.status = 204;
            }catch(e){
                ctx.status = 400;
            }
        },

        delete: async(ctx, next) => {
            try {
                await memcachedModel.delete(ctx.params.id);
                ctx.status = 204;
            } catch (e) {
                ctx.status = 400
            }
        }
    }
};