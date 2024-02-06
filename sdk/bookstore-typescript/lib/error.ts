import { AxiosResponse } from "axios";

export class RequestError<T> extends Error {
	status: number;
	method: string;
	url: string;
	response: AxiosResponse<T>;
	data: T;

	constructor({
		response,
		method,
		url,
	}: { response: AxiosResponse<T>; method: string; url: string }) {
		const msg = `received ${
			response.status
		} from ${method.toUpperCase()} ${url}`;
		super(msg);

		this.method = method;
		this.url = url;
		this.response = response;
		this.status = response.status;
		this.data = response.data as T;
	}
}

export class UnexpectedStatusError extends Error {
	status: number;
	method: string;
	url: string;
	response: AxiosResponse;
	data: any;
	expectedStatuses: string[];

	constructor({
		response,
		method,
		url,
		expectedStatuses,
	}: {
		response: AxiosResponse;
		method: string;
		url: string;
		expectedStatuses: string[];
	}) {
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
