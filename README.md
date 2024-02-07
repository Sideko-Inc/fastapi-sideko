# FastAPI x Sideko - Generate SDKs as you go

Source code for "How to Supercharge Full Stack Development with FastAPI & SDK Generation" article published on:

- [Sideko](https://www.sideko.dev/blog/posts/sdk-fastapi)
- [Medium](https://medium.com/@posenelias/how-to-supercharge-full-stack-development-with-fastapi-sdk-generation-8b89901f7cd2)

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

3. Install Server & UI Dependencies

```bash
pip install -r requirements.txt
cd sdk/bookstore-typescript && npm i && cd ../..
cd bookstore-ui && npm i && cd ../
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

6. Start the NextJS Dev server

```bash
cd bookstore-ui
npm run dev
```

## Exercise

See how SDK code generation seamlessly builds with FastAPI development by completing the following exercise:

1.  Extend the API by adding a POST /books endpoint that accepts a new pydantic model `NewBook` (contains all the same fields as `Book` without the `id`)
2.  Give the endpoint an `operation_id`, this will become the function name in the generated typescript SDK
    - _feel free to keep this as a snake case name (i.e. `add_book`), Sidkeo will handle making this camel case in typescript_
3.  Implement the endpoint logic:
    - Create a `Book` from the provided `NewBook` body
    - Add the newly created book to the in-memory `database` list
    - _Notice how the `lifespan` method will automatically generate an updated SDK in typescript_
4.  Implement a `New Book` button in `bookstore-ui` that calls the new POST route

## Generate other languages

Use the CLI `sideko generate` command to generate SDKs in other supported languages, for example:

```bash
# while the FastAPI server is running
sideko generate http://localhost:8000/openapi.json python -o ./sdk
```

## Contact

Feel free to reach out with any comments or questions to `team@sideko.dev` or leave a comment on the [Medium article](https://medium.com/@posenelias/how-to-supercharge-full-stack-development-with-fastapi-sdk-generation-8b89901f7cd2)
