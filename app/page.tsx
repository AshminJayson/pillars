import Image from "next/image";
import { Toaster } from "sonner";
import Link from "next/link"; // Import for interactive button

export default function Component() {
    return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between bg-white">
      {/* Full-width, centered image */}
        <div className="relative w-full h-96 lg:h-screen">
            <Image
            src="/pillars.png"
            alt="Pillars Logo" // Descriptive alt text for accessibility
            layout="fill" // Fills the container while maintaining aspect ratio
            objectFit="cover" // Crops image to fit container, preserving focal point
            className="object-center" // Centers the image within the container
            />
        </div>

      {/* Overlay with centered content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 lg:px-8">
            <h1 className="mt-60 text-5xl font-bold tracking-tight text-red-800 sm:text-7xl text-center">
            Pillars
            </h1>

        {/* Interactive floating login button */}
        <Link href="/login">
            <button className="mt-8 group inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-lg font-semibold text-white hover:bg-black/80 hover:text-slate-100 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black active:bg-slate-800 active:text-slate-300 shadow-md">
                Log in
            </button>
        </Link>

        {/* Optional Toaster component placement (consider below the button) */}
        <Toaster richColors />
        </div>
    </main>
);
}
