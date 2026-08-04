# Bootstrap the Super Administrator

When the application is started for the first time, no administrator account exists. A one-time bootstrap endpoint is provided to create the initial **Super Administrator**.

> **Note**
> The bootstrap endpoint can only be used when no Super Administrator account exists.

## Step 1: Generate an API Key

Generate a secure API key using your browser's Developer Console.

```typescript
const bytes = new Uint8Array(32);
crypto.getRandomValues(bytes);

const apiKey = [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");

console.log(apiKey);
```

Copy the generated value.

## Step 2: Configure the API Key

Add the generated API key to your backend environment configuration.

```env
ADMIN_API_KEY=<your-generated-api-key>
```

Restart the backend if it is already running.

## Step 3: Bootstrap the Super Administrator

Send a request to the bootstrap endpoint.

```bash
curl -X POST http://localhost:5000/api/v1/auth/bootstrap \
  -H "Content-Type: application/json" \
  -H "x-admin-api-key: <your-generated-api-key>" \
  -d '{
    "firstName": "<first-name>",
    "lastName": "<last-name>",
    "email": "<email>",
    "password": "<password>"
  }'
```

Example

```bash
curl -X POST http://localhost:5000/api/v1/auth/bootstrap \
  -H "Content-Type: application/json" \
  -H "x-admin-api-key: 5f7d7b9c..." \
  -d '{
    "firstName": "Ajay",
    "lastName": "Mathew",
    "email": "admin@example.com",
    "password": "Password@123"
  }'
```

## Success Response

If the request is successful, the Super Administrator account will be created and can be used to log in to the application.

After the Super Administrator has been created, the bootstrap endpoint should no longer be used.
