import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'The Commitment Reality Check',
  description: 'Find out why you are self-sabotaging your relationships.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-zinc-100 antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}