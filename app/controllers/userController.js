/**
 * Created by aryzhavskij on 1/31/17.
 */
"use strict";
module.exports = function(app){

    let usersModel = require('../models/users');

    return {
        get: async(ctx, next) => {
            try {
                console.log("In get");
                ctx.body = await usersModel.getAll();
                ctx.status = 200;
            }catch(e){
                ctx.status = 400;
            }
        },

        getById: async(ctx, next) => {
            try {
                console.log("In get id");
                ctx.body = await usersModel.getById(ctx.params.id)
            }catch(e){
                ctx.status = 400;
            }
        },

        post: async(ctx, next) => {
            let userId = await usersModel.add(ctx.request.body);
            if (typeof userId === 'number') {
                ctx.status = 201;
                ctx.body = {"id": userId};
            } else {
                ctx.status = 400;
            }
        },

        put: async(ctx, next) => {
            try {
                await usersModel.update(ctx.params.id, ctx.request.body);
                ctx.status = 200;
            } catch (e) {
                ctx.status = 400;
            }
        },

        delete: async(ctx, next) => {
            try {
                await usersModel.remove(ctx.params.id)
                ctx.status = 204;
            } catch (e) {
                ctx.status = 400
            }
        }
    }
};