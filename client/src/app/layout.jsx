import { Archivo, Inter, Space_Grotesk } from "next/font/google";
import "./globals.scss";

export const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  display: "swap",
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  display: "swap",
});

export const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
  display: "swap",
});

export const metadata = {
  title: "Tehnici Web",
  description: "Laboratoare Tehnici Web",
  icons: {
    icon: "/icon/tehnici-web.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ro"
      className={`${archivo.variable} ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
