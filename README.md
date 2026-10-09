# Rate Limit Demo

A simple Express.js project demonstrating API rate limiting using `express-rate-limit`.

## Features

* General API rate limiting (100 requests per 15 minutes)
* Login rate limiting (5 attempts per 10 minutes)
* Returns `429 Too Many Requests` when limits are exceeded

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Shruti0195/rate-limit-demo.git
   cd rate-limit-demo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   node app.js
   ```

4. Test the endpoints using Postman:

   * `GET http://localhost:3000/api/data`
   * `POST http://localhost:3000/api/login`

   For login, send an email in the JSON request body.

## Testing

Run the request testing script, if included:

```bash
node test-requests.js
```

Repeated requests beyond the configured limits will return `429 Too Many Requests`.
