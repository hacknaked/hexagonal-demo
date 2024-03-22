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
  -d '{"name": "CompanyA", "cuit": "20-11111111-0", "createdAt": "2024-01-01T00:00:00Z"}' \
  http://localhost:3000/api/company
```
```
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name": "CompanyB", "cuit": "20-22222222-0", "createdAt": "2024-02-01T00:00:00Z"}' \
  http://localhost:3000/api/company
```
```
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name": "CompanyC", "cuit": "20-33333333-0"}' \
  http://localhost:3000/api/company
  
```

Create some transfers:

```
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"amount": 1299.99, "companyId": 1, "debitAccount": "111-111111/1", "creditAccount": "222-222222/2", "createdAt": "2024-02-02T00:00:00Z" }' \
  http://localhost:3000/api/transfer
```

```
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"amount": 1.04, "companyId": 2, "debitAccount": "222-222222/2", "creditAccount": "333-333333/3" }' \
  http://localhost:3000/api/transfer
```

## 5. Make some queries

### Get all companies

```
GET http://localhost:3000/api/company
```

### Get the companies that joined in the last month (Feb 2024)

```
GET http://localhost:3000/api/company?filter=createdAt,gte,2024-02&filter=createdAt,lt,2024-03
```

### Get companies that made transfers in the last month

```
GET http://localhost:3000/api/company?filter=transfer,some,createdAt,gte,2024-02&filter=transfer,some,createdAt,lt,2024-03
```

