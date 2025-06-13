# Contact Form Component

A reusable, responsive contact form component for Next.js applications.

## Features

- Fully responsive design
- Form validation using React Hook Form and Zod
- Elegant error handling
- Success animations
- Dark mode support
- Accessible form fields

## Usage

```tsx
import { ContactForm } from '@/components/contact';

export default function ContactPage() {
  return (
    <div>
      <h1>Contact Us</h1>
      <ContactForm />
    </div>
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | Optional CSS class to apply to the component |
| `onSuccess` | `() => void` | Optional callback function called after successful form submission |

## Environment Variables

The component supports the following environment variables:

```
# Required: Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Optional: Tenant ID for multi-tenant systems
NEXT_PUBLIC_TENANT_ID=your_firebase_auth_uid_here
```

**Variable Details:**
- `NEXT_PUBLIC_API_URL`: Backend API base URL (defaults to `http://localhost:3001/api`)
- `NEXT_PUBLIC_TENANT_ID`: Firebase Auth UID for multi-tenant isolation (optional)

### Setting the environment variables

For local development:
1. Create a `.env.local` file in the root of your Next.js project
2. Add the required variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   NEXT_PUBLIC_TENANT_ID=your_firebase_auth_uid_here
   ```

For production:
1. When deploying to Vercel, add both environment variables in your project settings
2. For other hosting providers, follow their instructions for setting environment variables
3. The tenant ID should be your Firebase Auth UID for proper multi-tenant isolation

## API Endpoints

The form automatically selects the appropriate endpoint based on tenant configuration:

**Multi-Tenant Mode** (when `NEXT_PUBLIC_TENANT_ID` is set):
- Endpoint: `${NEXT_PUBLIC_API_URL}/tenant/contact/submit`
- Headers: Includes `X-Tenant-ID` header with the tenant ID
- Payload: Same as below

**Legacy Mode** (when `NEXT_PUBLIC_TENANT_ID` is not set):
- Endpoint: `${NEXT_PUBLIC_API_URL}/contact/submit`
- Headers: Standard headers only
- Payload: Same as below

**Request Payload:**
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "subject": "Subject Line",
  "message": "Message content"
}
```

The backend API should validate this data and respond with appropriate status codes.

## Backend API Requirements

The backend API should support both endpoints:

**Multi-Tenant Endpoint** (`/tenant/contact/submit`):
1. Accept POST requests with `X-Tenant-ID` header
2. Use tenant-specific configuration for email sending
3. Validate the incoming data
4. Return appropriate HTTP status codes

**Legacy Endpoint** (`/contact/submit`):
1. Accept POST requests without tenant context
2. Use default/environment-based configuration
3. Validate the incoming data
4. Return appropriate HTTP status codes

**Response Format:**
- For errors: Return JSON with an `error` field
- For success: Return JSON with a `success` field 