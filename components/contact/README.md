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

The component requires the following environment variable:

```
NEXT_PUBLIC_API_URL=http://your-backend-api-url
```

If not provided, it will default to `http://localhost:4000/api`.

### Setting the environment variable

For local development:
1. Create a `.env.local` file in the root of your Next.js project
2. Add `NEXT_PUBLIC_API_URL=http://localhost:4000/api` or your custom API URL

For production:
1. When deploying to Vercel, add the environment variable in your project settings
2. For other hosting providers, follow their instructions for setting environment variables

## API Endpoint

The form will send POST requests to `${NEXT_PUBLIC_API_URL}/contact` with the following payload:

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

The backend API should:

1. Accept POST requests to `/contact`
2. Validate the incoming data
3. Return appropriate HTTP status codes
4. For errors, return JSON with an `error` field
5. For success, return JSON with a `success` field 