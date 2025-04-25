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
- `components/` - Reusable UI components
  - `ui/` - Basic UI components
- `lib/` - Utility functions and custom hooks

## Features

- ✅ Modern UI with Tailwind CSS
- ✅ Dark mode support
- ✅ Fully responsive design
- ✅ Type-safe with TypeScript
- ✅ Animations with Framer Motion

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
