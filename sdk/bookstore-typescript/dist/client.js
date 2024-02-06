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
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const qs_1 = require("qs");
const error_1 = require("./error");
class Client {
    constructor(config) {
        var _a, _b;
        this.instance = axios_1.default.create({
            baseURL: (_a = config === null || config === void 0 ? void 0 : config.baseUrl) !== null && _a !== void 0 ? _a : "http://127.0.0.1:8000",
            timeout: (_b = config === null || config === void 0 ? void 0 : config.timeout) !== null && _b !== void 0 ? _b : 1000,
        });
        this.auth = {};
        this.auth["api_key"] = (axCfg) => {
            var _a;
            if (config === null || config === void 0 ? void 0 : config.apiKey) {
                axCfg = Object.assign(Object.assign({}, axCfg), { headers: Object.assign(Object.assign({}, ((_a = axCfg.headers) !== null && _a !== void 0 ? _a : {})), { "x-api-key": config.apiKey }) });
            }
            return axCfg;
        };
    }
    authedAxiosConfig(authNames, axiosConfig) {
        for (const authName of authNames) {
            const provider = this.auth[authName];
            if (provider) {
                axiosConfig = provider(axiosConfig);
            }
        }
        return axiosConfig;
    }
    listBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `/books`;
            const method = "GET";
            const axiosConfig = {
                validateStatus: () => true,
                method,
                url,
                params: {},
                paramsSerializer: function (params) {
                    return (0, qs_1.stringify)(params, { arrayFormat: "comma" });
                },
                headers: {},
            };
            const authedConfig = this.authedAxiosConfig(["api_key"], axiosConfig);
            const response = yield this.instance.request(authedConfig);
            const responseHandlers = [
                {
                    isMatch: (status) => status === 200,
                    matches: "200",
                    handle: (res) => {
                        return res.data;
                    },
                    isError: false,
                },
            ];
            const handler = responseHandlers.find((h) => h.isMatch(response.status));
            if (!handler) {
                throw new error_1.UnexpectedStatusError({
                    response,
                    method,
                    url,
                    expectedStatuses: responseHandlers.map((h) => h.matches),
                });
            }
            const responseData = handler.handle(response);
            if (handler.isError) {
                throw new error_1.RequestError({ response, method, url });
            }
            return responseData;
        });
    }
    getBook(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `/books/${request.id}`;
            const method = "GET";
            const axiosConfig = {
                validateStatus: () => true,
                method,
                url,
                params: {},
                paramsSerializer: function (params) {
                    return (0, qs_1.stringify)(params, { arrayFormat: "comma" });
                },
                headers: {},
            };
            const authedConfig = this.authedAxiosConfig(["api_key"], axiosConfig);
            const response = yield this.instance.request(authedConfig);
            const responseHandlers = [
                {
                    isMatch: (status) => status === 200,
                    matches: "200",
                    handle: (res) => {
                        return res.data;
                    },
                    isError: false,
                },
                {
                    isMatch: (status) => status === 404,
                    matches: "404",
                    handle: (res) => {
                        return res.data;
                    },
                    isError: true,
                },
                {
                    isMatch: (status) => status === 422,
                    matches: "422",
                    handle: (res) => {
                        return res.data;
                    },
                    isError: true,
                },
            ];
            const handler = responseHandlers.find((h) => h.isMatch(response.status));
            if (!handler) {
                throw new error_1.UnexpectedStatusError({
                    response,
                    method,
                    url,
                    expectedStatuses: responseHandlers.map((h) => h.matches),
                });
            }
            const responseData = handler.handle(response);
            if (handler.isError) {
                throw new error_1.RequestError({ response, method, url });
            }
            return responseData;
        });
    }
}
exports.default = Client;
