import "./globals.css";

export default function RootLayout({ children }) {
  return children;
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};