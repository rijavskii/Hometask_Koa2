"use strict";

const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const bodyParser = require('koa-bodyparser');
const router = new Router();
const config = require("config");
const memcacheCtr = require("./controllers/memcachedController")(app);
const userCtr = require("./controllers/userController")(app);

/**
 * @example curl -v -X GET "http://127.0.0.1:3000/users"
 * @example curl -v -X GET "http://127.0.0.1:3000/users/1"
 */
router.get('/users', userCtr.get)
      .get('/users/:id', userCtr.getById);

/**
 * @example curl -v -X POST "http://127.0.0.1:3000/users" -d '{"name": "Vasya"}' -H "Content-Type: application/json"
 */
router.post('/users', bodyParser(), userCtr.post);

/**
 * @example curl -v -X PUT "http://127.0.0.1:3000/users/1" -d '{"name":"Petya"}' -H "Content-Type: application/json"
 */
router.put('/users/:id', bodyParser(), userCtr.put);

/**
 * @example curl -v -X DELETE "http://127.0.0.1:3000/users/1"
 */
router.del("/users/:id", userCtr.delete);

/**
 * @example curl -v -X GET "http://127.0.0.1:3000/users/1/purchases"
 */
router.get("/users/:id/purchases", memcacheCtr.getById);

/**
 * @example curl -v -X PUT "http://127.0.0.1:3000/users/1/purchases" -d '{"count": 10}' -H "Content-Type: application/json"
 */
router.put('/users/:id/purchases', bodyParser(), memcacheCtr.add);

/**
 * @example curl -v -X DELETE "http://127.0.0.1:3000/users/1/purchases"
 */
router.del("/users/:id/purchases", memcacheCtr.delete);


app.use(async(ctx, next) => {
    try {
        await next();
    } catch (e) {
        ctx.body = JSON.stringify({message: e.message});
        ctx.status = 500;
    }
});
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.server.port);

