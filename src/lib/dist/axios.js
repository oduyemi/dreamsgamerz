"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var api = axios_1["default"].create({
    baseURL: "https://gamerz-lemon.vercel.app/api/v1"
});
api.interceptors.request.use(function (config) {
    var token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = "Bearer " + token;
    }
    return config;
});
exports["default"] = api;
