# hexagonal-demo

Example of a microservice in TypeScript using hexagonal architecture.

## Requirements

* **node**: "=20.x"
* **npm**: ">=10.2.4"

## Installation & starting

```
$ git clone git@github.com:hacknaked/hexagonal-demo.git hexagonal
$ cd hexagonal
$ npm install
$ npm run build
$ npm run tests
```

 ## Start server

Start the server by running:

```
$ npm run build
$ npm run dev

Web api listening on port 3000 ...
```

## Populate DB with some data

Create a few companies:

```
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name": "CompanyA", "cuit": "20-11111111-1"}' \
  http://localhost:3000/api/company
```
```
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name": "CompanyB", "cuit": "20-22222222-1"}' \
  http://localhost:3000/api/company
  
```