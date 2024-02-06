import { AxiosInstance, AxiosRequestConfig } from "axios";
import { Book } from "./schemas";
import { GetBookRequest } from "./request_types";
export default class Client {
    instance: AxiosInstance;
    private auth;
    constructor(config?: {
        apiKey?: string | null;
        baseUrl?: string;
        timeout?: number;
    });
    authedAxiosConfig(authNames: string[], axiosConfig: AxiosRequestConfig): AxiosRequestConfig;
    listBooks(): Promise<Book[]>;
    getBook(request: GetBookRequest): Promise<Book>;
}
