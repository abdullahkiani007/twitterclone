import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "../components/Provider";
import Sidebar from "../components/Sidebar";
import Newsfeed from "../components/Newsfeed";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter",
  description: "Generated by create next app",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>
        <Provider>
          <div className="flex flex-row justify-between w-full h-full ">
            <aside className="h-screen sticky top-0 ">
              <Sidebar />
            </aside>

            {props.children}

            <aside className=" h-screen sticky top-0">
              <Newsfeed />
            </aside>
          </div>
        </Provider>
      </body>
    </html>
  );
}
