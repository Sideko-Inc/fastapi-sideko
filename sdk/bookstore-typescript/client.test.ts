// Generated by Sideko (sideko.dev)
import * as fs from "fs";
import { AxiosInstance } from "axios";

import { Client } from "./lib";
import { RequestError } from "./lib/error";
import {
	Author,
	NotFound,
	ValidationError,
	Book,
	HttpValidationError,
	GenreEnum,
} from "./lib/schemas";

function assertIsType<T>(value: T) {}

describe("Client", () => {
	it("should instantiate the client", () => {
		const client = new Client({ apiKey: process.env.API_KEY!! });
		assertIsType<AxiosInstance>(client.instance);
	});

	it("test_listBooks__generated", async () => {
		console.log("test_listBooks__generated");
		const client = new Client({ apiKey: process.env.API_KEY!! });

		const apiCall = async () => {
			const response = await client.listBooks();
		};

		const response = await apiCall();
		console.log(response);
	});

	it("test_getBook__generated", async () => {
		console.log("test_getBook__generated");
		const client = new Client({ apiKey: process.env.API_KEY!! });

		const apiCall = async () => {
			const response = await client.getBook({ id: 123 });
		};

		const response = await apiCall();
		console.log(response);
	});
});
