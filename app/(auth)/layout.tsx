import { Poppins } from "next/font/google";

interface AuthLayoutProps {
    children: React.ReactNode;
}

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className={`min-h-screen ${poppins.className}`}>{children}</div>
    );
}
