"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.LoginForm = void 0;
var react_1 = require("@ionic/react");
var react_2 = require("react");
var userContext_1 = require("../userContext");
exports.LoginForm = function () {
    var userContext = react_2.useContext(userContext_1.UserContext);
    if (!userContext) {
        throw new Error("UserContext must be used within a UserProvider");
    }
    var handleLogin = userContext.handleLogin, flashMessage = userContext.flashMessage;
    var _a = react_2.useState(""), email = _a[0], setEmail = _a[1];
    var _b = react_2.useState(""), password = _b[0], setPassword = _b[1];
    var _c = react_2.useState(false), loading = _c[0], setLoading = _c[1];
    var onSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    return [4 /*yield*/, handleLogin(email, password)];
                case 1:
                    _a.sent();
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_2["default"].createElement(react_1.IonPage, null,
        react_2["default"].createElement(react_1.IonHeader, null,
            react_2["default"].createElement(react_1.IonToolbar, null,
                react_2["default"].createElement(react_1.IonTitle, null, "Login"))),
        react_2["default"].createElement(react_1.IonContent, { className: "ion-padding" },
            react_2["default"].createElement(react_1.IonItem, null,
                react_2["default"].createElement(react_1.IonLabel, { position: "stacked" }, "Email"),
                react_2["default"].createElement(react_1.IonInput, { type: "email", value: email, onIonChange: function (e) { return setEmail(e.detail.value); }, required: true })),
            react_2["default"].createElement(react_1.IonItem, null,
                react_2["default"].createElement(react_1.IonLabel, { position: "stacked" }, "Password"),
                react_2["default"].createElement(react_1.IonInput, { type: "password", value: password, onIonChange: function (e) { return setPassword(e.detail.value); }, required: true })),
            flashMessage && (react_2["default"].createElement(react_1.IonText, { color: flashMessage.type === "error" ? "danger" : "success" },
                react_2["default"].createElement("p", null, flashMessage.message))),
            react_2["default"].createElement(react_1.IonButton, { expand: "block", onClick: onSubmit, className: "ion-margin-top" }, "Login"),
            react_2["default"].createElement(react_1.IonLoading, { isOpen: loading, message: "Logging in..." }))));
};
