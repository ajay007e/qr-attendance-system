## Generate an API Key

Run the following in your browser's Developer Console to generate a secure API key:

```typescript
const bytes = new Uint8Array(32);
crypto.getRandomValues(bytes);

const apiKey = [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");

console.log(apiKey);
```

Copy the generated key and use it as the value for the `x-admin-api-key` header in the bootstrap request.

## Bootstrap the Super Admin

Replace `your-generated-api-key` with the API key you generated above.

```bash
curl -X POST http://localhost:5000/api/v1/auth/bootstrap \
  -H "Content-Type: application/json" \
  -H "x-admin-api-key: {{API_KEY}}" \
  -d '{
    "firstName": "{{FIRST_NAME}}",
    "lastName": "{{LAST_NAME}}",
    "email": "{{EMAIL}}",
    "password": "{{PASSWORD}}"
  }'
```
