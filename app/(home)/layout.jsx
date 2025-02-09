import localFont from "next/font/local";
import "../globals.css";
import NavBar from "@/components/NavBar";

const poppinsBlack = localFont({
  weight: "100 200 300 400 500 600 700 800 900",
  src: "../fonts/Poppins-Black.ttf",
  variable: "--font-poppins-black",
});
const poppinsLight = localFont({
  weight: "100 200 300 400 500 600 700 800 900",
  src: "../fonts/Poppins-Light.ttf",
  variable: "--font-poppins-light",
});
const poppinsMedium = localFont({
  weight: "100 200 300 400 500 600 700 800 900",
  src: "../fonts/Poppins-Medium.ttf",
  variable: "--font-poppins-medium",
});
const poppinsRegular = localFont({
  weight: "100 200 300 400 500 600 700 800 900",
  src: "../fonts/Poppins-Regular.ttf",
  variable: "--font-poppins-regular",
});
const poppinsBold = localFont({
  weight: "100 200 300 400 500 600 700 800 900",
  src: "../fonts/Poppins-Bold.ttf",
  variable: "--font-poppins-bold",
});

export const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={`${poppinsBlack.variable} ${poppinsBold.variable} ${poppinsLight.variable} ${poppinsMedium.variable} ${poppinsRegular.variable} antialiased`}
      >
        <div className="flex h-screen flex-col bg-white">
          <NavBar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
