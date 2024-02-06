import json
from enum import Enum
from hashlib import sha256
from pathlib import Path
from typing import List, Optional

import sideko_py
import uvicorn
from fastapi import Depends, FastAPI, HTTPException, Security
from fastapi.responses import JSONResponse
from fastapi.security.api_key import APIKeyHeader
from pydantic import BaseModel


# ----------- MODELS --------------
class Genre(str, Enum):
    ACADEMIC = "academic"
    FANTASY = "fantasy"
    MEMOIR = "memoir"
    SCI_FI = "science fiction"


class Author(BaseModel):
    first_name: str
    last_name: str
    num_books: Optional[int]


class Book(BaseModel):
    id: int
    isbn: str
    title: str
    authors: List[Author]
    genre: Genre


class NotFound(BaseModel):
    resource: str
    message: str


# Static data
database = [
    Book(
        id=123,
        isbn="0-297-78329-7",
        title="Winter's Tale",
        authors=[Author(first_name="Mark", last_name="Helprin", num_books=10)],
        genre=Genre.FANTASY,
    ),
    Book(
        id=234,
        isbn="978-1524763282",
        title="Ready Player One",
        authors=[Author(first_name="Ernest", last_name="Cline", num_books=4)],
        genre=Genre.SCI_FI,
    ),
    Book(
        id=345,
        isbn="978-1-4711-4672-5",
        title="Shoe Dog",
        authors=[Author(first_name="Phil", last_name="Knight", num_books=None)],
        genre=Genre.MEMOIR,
    ),
    Book(
        id=456,
        isbn="978-0321573513",
        title="Algorithms (4th Ed.)",
        authors=[
            Author(first_name="Robert", last_name="Sedgewick", num_books=None),
            Author(first_name="Kevin", last_name="Wayne", num_books=None),
        ],
        genre=Genre.ACADEMIC,
    ),
]

# ----------- API --------------

PORT = 8000
API_KEY = "super-secret"


def lifespan(app: FastAPI):
    """Automatically generates typescript SDK client on server startup"""
    openapi_spec = json.dumps(app.openapi())

    # load previous openapi spec
    spec_path = Path(__file__).parent / "openapi.json"
    previous_spec_hash = None
    if spec_path.exists():
        previous_spec_hash = sha256(spec_path.read_bytes()).hexdigest()
    current_spec_hash = sha256(openapi_spec.encode()).hexdigest()

    # generate a new typescript client if the openapi spec has changed.
    if current_spec_hash != previous_spec_hash:
        print("generating TS sdk")
        sideko_py.generate_sdk(
            sideko_py.Language.Typescript,
            openapi_spec,
            "./sdk",
            package_name="bookstore",
            base_url=f"http://localhost:{PORT}",
        )
        spec_path.write_text(openapi_spec)
    yield


app = FastAPI(lifespan=lifespan)


async def authenticate(
    key: str = Security(APIKeyHeader(scheme_name="api_key", name="x-api-key"))
):
    if key == API_KEY:
        return key

    raise HTTPException(status_code=403, detail="invalid key")


@app.get("/books", operation_id="list_books")
def list_books(api_key: str = Depends(authenticate)) -> List[Book]:
    return database


@app.get("/books/{id}", operation_id="get_book", responses={"404": {"model": NotFound}})
def get_book(id: int, api_key: str = Depends(authenticate)) -> Book:
    try:
        return next(b for b in database if b.id == id)
    except StopIteration:
        return JSONResponse(
            status_code=404,
            content=NotFound(
                resource="Book", message=f"no resource with id {id} exists"
            ).model_dump(),
        )


if __name__ == "__main__":
    uvicorn.run(app="server:app", host="localhost", port=PORT, reload=True)
