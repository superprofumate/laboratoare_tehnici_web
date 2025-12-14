export const metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Eight Bit World",
  description: "Learn about graphics, music and games in the 8-bit universe!",
  keywords: ["8-bit", "8-bit graphics", "8-bit games", "8-bit graphics", "8-bit music"],
  authors: [{ name: "Predescu Teodor-Ioan" }],

  icons: {
    icon: "/lab2/8bitIcon.avif",
  },
};

export default function EightBitWorldLayout({children}) {
  return (
    <>
      {children}
    </>
  );
}