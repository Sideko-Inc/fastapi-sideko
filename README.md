# FastAPI x Sideko - Generate SDKs as you go

Source code for "Generating SDK Clients with FastAPI" article published on:

- [Sideko]() # TODO: link
- [Medium]() # TODO: link

## Setup

1. Clone repository

```bash
git clone git@github.com:Sideko-Inc/fastapi-sideko.git
```

2. Create & activate virtual python environment

```bash
# Python >= 3.8
python3 -m venv .venv
source .venv/bin/activate
```

3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

4. Configure Sideko SDK generator key

```bash
sideko login
# login via browser pop-up
```

5. Start FastAPI server

```bash
python server.py
```

## Using the Generated SDK

A Typescript SDK will automatically be generated when you start or alter the server, try it out with:

```bash
cd sdk/bookstore-typescript
npm install

node
```

In `node` interactive shell:

```javascript
const { Client } = require("./dist");

const client = new Client({ apiKey: "super-secret" });
client.listBooks().then((b) => console.log(JSON.stringify(b, null, 2)));
```

## Exercise

See how SDK code generation seamlessly builds with FastAPI development by completing the following exercise:

1.  Extend the API by adding a POST /books endpoint that accepts a new pydantic model `NewBook` (contains all the same fields as `Book` without the `id`)
2.  Give the endpoint an `operation_id`, this will become the function name in the generated typescript SDK
    - _feel free to keep this as a snake case name (i.e. `add_book`), Sidkeo will handle making this camel case in typescript_
3.  Implement the endpoint logic:
    - Create a `Book` from the provided `NewBook` body
    - Add the newly created book to the in-memory `database` list
4.  Notice how the `lifespan` method will automatically generate an updated SDK in typescript, install it (`cd sdk/bookstore-typescript && npm i`) and try out your new generated method!

Bonus points: create a basic webapp using NextJS or create-react-app that uses the generated SDK as a dependency!

## Generate other languages

Use the CLI `sideko generate` command to generate SDKs in other supported languages, for example:

```bash
# while the FastAPI server is running
sideko generate http://localhost:8000/openapi.json python -o ./sdk
```

## Contact

Feel free to reach out with any comments or questions to `team@sideko.dev` or leave a comment on the [Medium article]() #TODO: link
