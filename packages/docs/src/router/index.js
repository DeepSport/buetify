"use strict";
exports.__esModule = true;
var vue_router_1 = require("vue-router");
var documentation_1 = require("../views/documentation");
var route_1 = require("../views/home/route");
var router = vue_router_1.createRouter({
    history: vue_router_1.createWebHistory(process.env.BASE_URL),
    routes: [route_1.route, documentation_1.route]
});
exports["default"] = router;
