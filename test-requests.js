// Run with: node test-requests.js
// Make sure the server is already running in another terminal (npm start)

const BASE_URL = 'http://localhost:3000';

async function testGeneralLimiter() {
  console.log('Testing general limiter on /api/data (expect 200 x100, then 429 x5)...');
  for (let i = 1; i <= 105; i++) {
    const res = await fetch(`${BASE_URL}/api/data`);
    console.log(`${i}: ${res.status}`);
  }
}

async function testLoginLimiter() {
  console.log('\nTesting login limiter on /api/login (expect 200 x5, then 429 x2)...');
  for (let i = 1; i <= 7; i++) {
    const res = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com' })
    });
    const body = await res.json();
    console.log(`${i}: ${res.status} - ${JSON.stringify(body)}`);
  }
}

(async () => {
  await testGeneralLimiter();
  await testLoginLimiter();
})();
