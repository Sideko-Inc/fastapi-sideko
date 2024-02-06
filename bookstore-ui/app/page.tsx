import { Client } from "bookstore";

export default async function Home() {
  let client = new Client({ apiKey: "super-secret " });
  let books = await client.listBooks();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="mb-4 text-lg font-semibold">Bookstore</h1>
      {books.map((book) => (
        <a
          key={book.id}
          href={`https://www.amazon.com/s?k=${book.isbn}`}
          target="_blank"
          className="h-12 px-8 rounded-md flex items-center hover:bg-gray-800"
        >
          {book.title}
          <span className="ml-2 text-sm text-gray-500">
            by{" "}
            {book.authors
              .map((a) => `${a.first_name} ${a.last_name}`)
              .join(", ")}{" "}
          </span>
        </a>
      ))}
    </main>
  );
}
