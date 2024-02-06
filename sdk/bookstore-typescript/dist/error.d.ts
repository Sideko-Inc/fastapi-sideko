import { AxiosResponse } from "axios";
export declare class RequestError<T> extends Error {
    status: number;
    method: string;
    url: string;
    response: AxiosResponse<T>;
    data: T;
    constructor({ response, method, url, }: {
        response: AxiosResponse<T>;
        method: string;
        url: string;
    });
}
export declare class UnexpectedStatusError extends Error {
    status: number;
    method: string;
    url: string;
    response: AxiosResponse;
    data: any;
    expectedStatuses: string[];
    constructor({ response, method, url, expectedStatuses, }: {
        response: AxiosResponse;
        method: string;
        url: string;
        expectedStatuses: string[];
    });
}
