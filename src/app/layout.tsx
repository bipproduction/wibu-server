// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import { toastConfig } from "react-simple-toasts";
import "react-simple-toasts/dist/style.css";
import "react-simple-toasts/dist/theme/dark.css";
import "@mantine/code-highlight/styles.css";

toastConfig({ theme: "dark" });

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import { UserProvider } from "@/components/user/UserProvider";

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark">
          <UserProvider />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
