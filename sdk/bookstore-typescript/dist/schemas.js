"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreEnum = exports.BinaryResponse = void 0;
class BinaryResponse {
    constructor(content, headers) {
        this.content = content;
        this.headers = headers;
    }
}
exports.BinaryResponse = BinaryResponse;
var GenreEnum;
(function (GenreEnum) {
    GenreEnum["Academic"] = "academic";
    GenreEnum["Fantasy"] = "fantasy";
    GenreEnum["Memoir"] = "memoir";
    GenreEnum["ScienceFiction"] = "science fiction";
})(GenreEnum || (exports.GenreEnum = GenreEnum = {}));
