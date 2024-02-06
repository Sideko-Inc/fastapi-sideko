import { AxiosResponseHeaders, RawAxiosResponseHeaders } from "axios";
export declare class BinaryResponse {
    content: ArrayBuffer;
    headers: AxiosResponseHeaders | RawAxiosResponseHeaders;
    constructor(content: ArrayBuffer, headers: AxiosResponseHeaders | RawAxiosResponseHeaders);
}
export type Author = {
    "first_name": string;
    "last_name": string;
    "num_books"?: number | null;
};
export type NotFound = {
    "resource": string;
    "message": string;
};
export type ValidationError = {
    "loc": (string | number)[];
    "msg": string;
    "type": string;
};
export type Book = {
    "id": number;
    "isbn": string;
    "title": string;
    "authors": Author[];
    "genre": GenreEnum;
};
export type HttpValidationError = {
    "detail"?: ValidationError[];
};
export declare enum GenreEnum {
    Academic = "academic",
    Fantasy = "fantasy",
    Memoir = "memoir",
    ScienceFiction = "science fiction"
}
