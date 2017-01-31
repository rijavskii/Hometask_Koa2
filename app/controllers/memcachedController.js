/**
 * Created by aryzhavskij on 1/31/17.
 */
"use strict";

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
                console.log(ctx.params.id);
                ctx.body = await memcachedModel.getById(ctx.params.id);
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