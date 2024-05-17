"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
	const { data: session } = useSession();
	console.log({ session });
	return (
		<div>
			{JSON.stringify({ session })}
			<div
				onClick={() => {
					signIn();
				}}>
				signin
			</div>
			<button onClick={() => signOut()}>Sign out</button>
		</div>
	);
}
