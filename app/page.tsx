import { ButtonWithLink } from "@/components/button";
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
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 lg:px-8">
                <h1 className="mt-60 text-5xl font-bold tracking-tight text-red-800 sm:text-7xl text-center">
                    Pillars
                </h1>

                {/* Interactive floating login button */}
                <div className="mt-4">
                    <ButtonWithLink href="/login" text={"Login"} />
                </div>

                {/* Optional Toaster component placement (consider below the button) */}
                <Toaster richColors />
            </div>
        </main>
    );
}
