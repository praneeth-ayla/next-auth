import { NextRequest, NextResponse } from "next/server";
import db from "../../../../prisma/index";
import bcrypt from "bcryptjs";
export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { name, email, password } = reqBody;
		const existingUser = await db.user.findFirst({
			where: {
				email,
			},
		});
		if (existingUser) {
			return NextResponse.json(
				{ message: "Email already taken" },
				{ status: 400 }
			);
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const user = await db.user.create({
			data: {
				email,
				password: hashedPassword,
				name,
			},
		});

		console.log(user);
		return NextResponse.json({
			message: "User created successfully",
			success: true,
			user,
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
