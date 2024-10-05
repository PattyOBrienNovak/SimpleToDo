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
        <header className="bg-navy py-4">
          <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold">
              <span className="text-pink">MY TO-DO</span> LIST APP
            </h1>
            <ul className="flex space-x-6">
              <li><a href="#" className="hover:text-pink transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-pink transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-pink transition-colors">About</a></li>
              <li><a href="#" className="hover:text-pink transition-colors">Contact</a></li>
            </ul>
          </nav>
        </header>

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
