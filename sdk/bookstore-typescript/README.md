# bookstore typescript 

  

 # Authentication 
  
 ```typescript
import { Client } from 'bookstore';

const client = new Client({apiKey: process.env.API_KEY!!});
```

# list_books

```typescript
import { Client } from "bookstore";

const client = new Client({ apiKey: process.env.API_KEY!! });

const response = await client.listBooks();

```
# get_book

```typescript
import { Client } from "bookstore";

const client = new Client({ apiKey: process.env.API_KEY!! });

const response = await client.getBook({ id: 123 });

```
