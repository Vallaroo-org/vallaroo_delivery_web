# Vallaroo Delivery Web

The web application for Vallaroo delivery partners. This application allows delivery personnel to manage their profile, view delivery history, and handle order logistics.

## 🚀 Technologies

Built with a modern, performance-focused stack:

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Backend & Auth**: [Supabase](https://supabase.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **UI Utilities**: `clsx`, `tailwind-merge`, `sonner` (Toasts)

## 📂 Project Structure

```
src/
├── app/                  # App Router pages and layouts
│   ├── (auth)/           # Authentication routes (Login, Signup)
│   ├── dashboard/        # Protected dashboard routes
│   │   ├── history/      # Delivery history
│   │   └── profile/      # User profile management
│   └── ...
├── lib/                  # Shared utilities
│   ├── supabase/         # Supabase client configurations (SSR/Client)
│   └── utils.ts          # Helper functions
└── ...
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Vallaroo-org/vallaroo_delivery_web.git
   cd vallaroo_delivery_web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Building for Production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📄 License

Private - Vallaroo
