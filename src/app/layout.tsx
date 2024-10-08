import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My To-Do List App",
  description: "A simple and efficient to-do list application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-navy text-white">
        <main className="container mx-auto mt-8">
          {children}
        </main>

        <footer className="bg-navy text-white py-8 mt-16">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 My To-Do List App. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
