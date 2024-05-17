"use client";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function page() {
	const [user, setUser] = useState({
		email: "",
		password: "",
		name: "",
	});
	const onSignup = async () => {
		try {
			const res = await axios.post("/api/user/signup", user);
		} catch (error: any) {
			console.log("errror:", error);
		}
	};
	return (
		<div>
			{JSON.stringify(user)}
			<br />
			<input
				type="text"
				onChange={(e) => {
					setUser({ ...user, email: e.target.value });
				}}
			/>

			<br />
			<input
				type="text"
				onChange={(e) => {
					setUser({ ...user, password: e.target.value });
				}}
			/>
			<br />
			<input
				type="text"
				onChange={(e) => {
					setUser({ ...user, name: e.target.value });
				}}
			/>
			<br />
			<button
				onClick={() => {
					onSignup();
				}}>
				Signup
			</button>
		</div>
	);
}
