import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Truck } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6 md:p-12">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-3 text-2xl font-bold text-indigo-600">
          <Truck className="h-10 w-10" />
          <span>Vallaroo Driver</span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Manage Your Deliveries & Earnings
        </h1>

        <p className="max-w-xl text-lg text-gray-600">
          The verified portal for Vallaroo Drivers. Track your verification status, view your earnings history, and manage your vehicle profile all in one place.
        </p>

        <div className="mt-4 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Driver Login
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/signup"
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-8 py-3 text-lg font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            Register
          </Link>
        </div>
      </div>

      <div className="mt-16 text-sm text-gray-500 flex flex-col items-center gap-4">
        <div className="relative h-8 w-32 opacity-75">
          <Image src="/logo-dark.png" alt="Vallaroo" fill className="object-contain" />
        </div>
        © {new Date().getFullYear()} Vallaroo Delivery
      </div>
    </div>
  );
}
