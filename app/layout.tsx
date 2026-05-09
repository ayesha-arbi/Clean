import "./globals.css";
import { FocusProvider } from "@/components/shared/focus-toggle";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <FocusProvider>
          {children}
        </FocusProvider>
      </body>
    </html>
  );
}