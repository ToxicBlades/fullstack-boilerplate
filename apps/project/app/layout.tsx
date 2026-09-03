import "./globals.css";

import { DesignSystemProvider } from "@project/design-system/provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <DesignSystemProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <div className="flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
          </div>
        </DesignSystemProvider>
      </body>
    </html>
  );
}
