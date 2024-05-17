import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import db from "../../../../prisma/index";

interface CredentialInput {
	email: string;
	password: string;
}
export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: {
					label: "email",
					type: "text",
					placeholder: "praneeth@gmail.com",
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "praneeth",
				},
			},
			async authorize(credentials: any): Promise<any> {
				try {
					const user = await db.user.findFirst({
						where: { email: credentials.email },
					});
					if (!user) {
						throw new Error("user not found");
					}
					console.log("userpassword", user.password);
					const passwordValidation = await bcrypt.compare(
						credentials.password,
						user.password
					);
					if (passwordValidation) {
						return user;
					} else {
						throw new Error("Invalid credentials");
					}
				} catch (err: any) {
					throw new Error(err);
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user, session }) {
			console.log("jwt callback", { token, user, session });
			if (user) {
				return {
					...token,
					id: user.id,
				};
			}
			return token;
		},
		async session({ session, token, user }) {
			console.log("session  callback", { token, user, session });
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
				},
			};
		},
	},
	secret: process.env.TOKEN_SECRET,
};
