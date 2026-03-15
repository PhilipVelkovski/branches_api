# Branches API

Node / Express.js / TypeScript API providing bank branch data.

There is no authentication added in this API.

Code is organized using the Service–Repository pattern to keep business logic separated from data access.

Project includes formatting and linting configuration to maintain consistent code quality.

---

## Tech Stack

* **Node.js 24.14.0** 
* **TypeScript 5.9.3**
* **Express 5.2.1**

---

## Key Libraries

* **Morgan** – HTTP request logging middleware for better visibility.
* **Zod** – Schema validation library used for validating and parsing request inputs
* **Nodemon** – Used for development server
* **ts-node** – Executes TypeScript directly during development
* **tsconfig-paths** – Enables path aliases defined in `tsconfig.json`
* **tsc-alias** - Used for production js builds
* **Prettier + ESLint** – Enforces consistent formatting and code quality
* **Jest** – Testing framework for running unit.

* **Supertest** – HTTP assertions library used for testing API endpoints.

* **ts-jest** – TypeScript preprocessor for Jest, enabling type-safe tests.

---

## Setup

```bash
cd branches_api
nvm use
npm install
npm run build
```

## Running tests
```bash
npm test
```
## Run development server

```bash
npm run dev
```

Server runs on:

http://localhost:3000

---

## Endpoints

### List branches

GET /api/branches

### Get Specific branch

GET /api/branches/:id

### Filtering & Pagination

GET /api/branches?city=Skopje&page=2&limit=10

---

## Data

Branches are stored in a static JSON file located in:

src/data/branches.json
