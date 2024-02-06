"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnexpectedStatusError = exports.RequestError = void 0;
class RequestError extends Error {
    constructor({ response, method, url, }) {
        const msg = `received ${response.status} from ${method.toUpperCase()} ${url}`;
        super(msg);
        this.method = method;
        this.url = url;
        this.response = response;
        this.status = response.status;
        this.data = response.data;
    }
}
exports.RequestError = RequestError;
class UnexpectedStatusError extends Error {
    constructor({ response, method, url, expectedStatuses, }) {
        const msg = `received unexpected status code ${response.status} from ${url}, handlers set up for ${expectedStatuses}`;
        super(msg);
        this.method = method;
        this.url = url;
        this.response = response;
        this.status = response.status;
        this.data = response.data;
        this.expectedStatuses = expectedStatuses;
    }
}
exports.UnexpectedStatusError = UnexpectedStatusError;
