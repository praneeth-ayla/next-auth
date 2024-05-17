import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "../component/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "TheTJ",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<SessionProvider>
				<body className={inter.className}>{children}</body>
			</SessionProvider>
		</html>
	);
}
