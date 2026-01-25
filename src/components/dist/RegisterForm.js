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
exports.RegisterForm = void 0;
var react_1 = require("react");
var react_2 = require("@ionic/react");
var material_1 = require("@mui/material");
var axios_1 = require("../lib/axios");
exports.RegisterForm = function () {
    var ionRouter = react_2.useIonRouter();
    var _a = react_1.useState(""), username = _a[0], setUsername = _a[1];
    var _b = react_1.useState(""), email = _b[0], setEmail = _b[1];
    var _c = react_1.useState(""), password = _c[0], setPassword = _c[1];
    var _d = react_1.useState(""), confirmPassword = _d[0], setConfirmPassword = _d[1];
    var _e = react_1.useState(""), referralCode = _e[0], setReferralCode = _e[1];
    var _f = react_1.useState(false), loading = _f[0], setLoading = _f[1];
    var _g = react_1.useState(false), success = _g[0], setSuccess = _g[1];
    var _h = react_1.useState(null), error = _h[0], setError = _h[1];
    react_1.useEffect(function () {
        if (success) {
            var timer_1 = setTimeout(function () {
                ionRouter.push("/login", "root", "replace");
            }, 2000);
            return function () { return clearTimeout(timer_1); };
        }
    }, [success, ionRouter]);
    var onSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var err_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    setLoading(true);
                    setError(null);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, axios_1["default"].post("https://gamerz-lemon.vercel.app/api/v1/auth/register", {
                            username: username,
                            email: email,
                            password: password,
                            confirmPassword: confirmPassword,
                            referredBy: referralCode || undefined
                        })];
                case 2:
                    _c.sent();
                    setSuccess(true);
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _c.sent();
                    setError(((_b = (_a = err_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) ||
                        "Registration failed. Please try again.");
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "w-full flex justify-center px-3 py-6" },
        react_1["default"].createElement("div", { className: "w-full max-w-[320px]" },
            react_1["default"].createElement("div", { className: "mb-6" },
                react_1["default"].createElement("h1", { className: "text-[20px] font-semibold text-gray-900" }, "Create account"),
                react_1["default"].createElement("p", { className: "mt-1 text-sm text-gray-500" }, "Sign up in under a minute")),
            react_1["default"].createElement("div", { className: "space-y-4" },
                react_1["default"].createElement(Field, { label: "Username" },
                    react_1["default"].createElement(react_2.IonInput, { value: username, onIonChange: function (e) { return setUsername(e.detail.value); } })),
                react_1["default"].createElement(Field, { label: "Email" },
                    react_1["default"].createElement(react_2.IonInput, { type: "email", value: email, onIonChange: function (e) { return setEmail(e.detail.value); } })),
                react_1["default"].createElement(Field, { label: "Password" },
                    react_1["default"].createElement(react_2.IonInput, { type: "password", value: password, onIonChange: function (e) { return setPassword(e.detail.value); } })),
                react_1["default"].createElement(Field, { label: "Confirm password" },
                    react_1["default"].createElement(react_2.IonInput, { type: "password", value: confirmPassword, onIonChange: function (e) {
                            return setConfirmPassword(e.detail.value);
                        } })),
                react_1["default"].createElement(Field, { label: "Referral code (optional)", subtle: true },
                    react_1["default"].createElement(react_2.IonInput, { value: referralCode, onIonChange: function (e) {
                            return setReferralCode(e.detail.value);
                        } }))),
            error && (react_1["default"].createElement(react_2.IonText, { color: "danger" },
                react_1["default"].createElement("p", { className: "mt-4 text-sm text-center" }, error))),
            success && (react_1["default"].createElement(react_2.IonText, { color: "success" },
                react_1["default"].createElement("p", { className: "mt-4 text-sm text-center" },
                    "Account created successfully \uD83C\uDF89",
                    react_1["default"].createElement("br", null),
                    "Redirecting to login\u2026"))),
            react_1["default"].createElement(material_1.Button, { fullWidth: true, variant: "contained", disableElevation: true, disabled: loading || success, onClick: onSubmit, className: "\r\n            mt-6\r\n            !rounded-xl\r\n            !py-2.5\r\n            !text-sm\r\n            !font-semibold\r\n          " }, loading ? "Creating account…" : "Create account"),
            react_1["default"].createElement(react_2.IonLoading, { isOpen: loading, message: "Creating account..." }))));
};
/* ---------- Reusable Field ---------- */
var Field = function (_a) {
    var label = _a.label, subtle = _a.subtle, children = _a.children;
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("label", { className: "block mb-1 text-xs font-medium " + (subtle ? "text-gray-400" : "text-gray-600") }, label),
        react_1["default"].createElement("div", { className: "\r\n        rounded-xl\r\n        border border-gray-300\r\n        px-3 py-2.5\r\n        text-sm\r\n        focus-within:border-gray-900\r\n      " }, children)));
};
