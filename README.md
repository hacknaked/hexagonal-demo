# hexagonal-demo

Example of a microservice in TypeScript using hexagonal architecture.

## 1. Check requirements

* **node**: "=20.x"
* **npm**: ">=10.2.4"

## 2. Installation & starting

```
$ git clone git@github.com:hacknaked/hexagonal-demo.git hexagonal
$ cd hexagonal
$ npm install
$ npm run build
$ npm run syncdb
$ npm run tests
```

 ## 3. Start server

Start the server by running:

```
$ npm run dev

Web api listening on port 3000 ...
```

## 4. Populate DB with some data

Create a few companies:

```
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name": "CompanyA", "cuit": "20-11111111-0", "createdAt": "2024-02-01T00:00:00Z"}' \
  http://localhost:3000/api/company
```
```
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name": "CompanyB", "cuit": "20-22222222-0"}' \
  http://localhost:3000/api/company
  
```

Create a transfer:

```
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"amount": 1299.99, "companyId": 1, "debitAccount": "111-111111/1", "creditAccount": "222-222222/2", "createdAt": "2024-02-02T00:00:00Z" }' \
  http://localhost:3000/api/transfer
```

## 5. Make some queries

### Get all companies

```
GET http://localhost:3000/api/company
```