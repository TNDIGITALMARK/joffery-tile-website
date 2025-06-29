# Recording Studio Frontend

A modern web application for a recording studio built with Next.js, TypeScript, and Tailwind CSS.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for server-rendered applications
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Heroicons](https://heroicons.com/) - Beautiful hand-crafted SVG icons
- [React Icons](https://react-icons.github.io/react-icons/) - Popular icon libraries
- [Headless UI](https://headlessui.dev/) - Unstyled accessible UI components
- [Next Themes](https://github.com/pacocoursey/next-themes) - Dark mode support

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/` - Next.js app directory
  - `page.tsx` - Home page component
  - `layout.tsx` - Root layout with providers
  - `globals.css` - Global styles and Tailwind directives
  - `contact/` - Contact page
- `components/` - Reusable UI components
  - `ui/` - Basic UI components
  - `contact/` - Contact form components
- `lib/` - Utility functions and custom hooks
  - `schemas/` - Zod validation schemas

## Features

- ✅ Modern UI with Tailwind CSS
- ✅ Dark mode support
- ✅ Fully responsive design
- ✅ Type-safe with TypeScript
- ✅ Animations with Framer Motion
- ✅ Beautiful contact form with validation
- ✅ Backend API integration
- ✅ Enhanced ESLint configuration with powerful plugins

## Enhanced Lint System

This template includes an optimized ESLint configuration with the essential `unused-imports` plugin for automatic code cleanup:

### Available Commands
```bash
# Standard Next.js lint
npm run lint

# Enhanced lint with auto-fix (removes unused imports automatically)
npm run lint:fix

# Strict mode (no warnings allowed)
npm run lint:enhanced
```

### Key Features
- **Automatic unused import removal** with `eslint-plugin-unused-imports` (eliminates #1 build failure cause)
- **Built-in Next.js TypeScript linting** (already included with Next.js)
- **Built-in React best practices** (via Next.js ESLint config)
- **Allows `any` usage** (no TypeScript warnings for faster development)
- **Minimal overhead** (only essential plugins installed)

### Phoenix Repair Integration
This enhanced lint system is automatically used by Phoenix repair services to:
- Clean up unused imports and dead code
- Fix common TypeScript/React issues
- Improve code quality before main repairs
- Reduce build errors and repair complexity

For detailed information, see [ENHANCED_LINT_SYSTEM.md](./ENHANCED_LINT_SYSTEM.md).

## Contact Form

This project includes a reusable contact form component with the following features:

- Form validation using React Hook Form and Zod
- Responsive design with mobile-first approach
- Success and error state handling
- Integration with backend API
- Animated feedback messages

To use the contact form, simply import it:

```tsx
import { ContactForm } from '@/components/contact';

export default function MyPage() {
  return <ContactForm />;
}
```

The form requires a backend API endpoint and supports multi-tenant configuration. Set the following environment variables:

```
# Required: Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3001

# Optional: Tenant ID for multi-tenant systems
NEXT_PUBLIC_TENANT_ID=your_firebase_auth_uid_here
```

**Environment Variable Details:**

- `NEXT_PUBLIC_API_URL`: The base URL of your tenant API (defaults to `http://localhost:3001`)
- `NEXT_PUBLIC_TENANT_ID`: Your Firebase Auth UID for multi-tenant isolation (optional)

**Multi-Tenant Behavior:**
- **With Tenant ID**: Uses `/api/tenant/contact/submit` endpoint with `X-Tenant-ID` header
- **Without Tenant ID**: Uses legacy `/api/contact/submit` endpoint for backward compatibility

For deployment:
1. Create a `.env.local` file with your production API URL
2. When deploying to Vercel, add the environment variable in your project settings

See the component documentation in `components/contact/README.md` for more details.

## Learn More

To learn more about the technologies used in this project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

This project is configured for deployment on [Vercel](https://vercel.com). Follow these steps to deploy:

1. Create a Vercel account if you don't have one already
2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Login to Vercel:
   ```bash
   vercel login
   ```
4. Deploy from the project root:
   ```bash
   vercel
   ```

Alternatively, you can connect your GitHub repository to Vercel for continuous deployment:

1. Push this project to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/new)
3. Import your GitHub repository
4. Configure project settings (the defaults should work fine)
5. Deploy

The project includes a `vercel.json` configuration file that sets up:
- Build and install commands
- Output directory
- Region deployment preferences
- GitHub integration settings

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
