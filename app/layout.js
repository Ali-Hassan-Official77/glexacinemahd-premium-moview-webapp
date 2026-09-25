import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"] });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body", weight: ["400", "500", "600", "700"] });

export const metadata = {
  title: "GlexaGinema — Cinema, Series & Discovery",
  description: "A premium movie discovery experience powered by The Movie Database.",
  icons: { icon: "/logo.svg", shortcut: "/logo.svg", apple: "/logo.svg" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <body className={`${display.variable} ${body.variable}`}>
        <div className="site-shell">
          <Navbar />
          <main className="site-main">{children}</main>
          <Footer />
          <ToastProvider />
        </div>
      </body>
    </html>
  );
}
