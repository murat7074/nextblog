
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";
import bcrypt from "bcrypt";

// http://localhost:3000/api/register 

export async function POST(req) {
  const _req = await req.json() // bu kod u "req.body" olarak düşünebiliriz
  // console.log(_req);
  await dbConnect()

  try {
    const { name, email, password } = _req
    // check if user with email already exist
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return NextResponse.json({ err: 'Email already exist' }, { status: 409 })
    } else {
      await new User({
        email,
        name,
        password: await bcrypt.hash(password, 10),
      }).save() // yeni user ı kaydet
    }
  } catch (error) {
    return NextResponse.json(
      { err: 'Server error. Try again' },
      { status: 500 }
    )
  }

  return NextResponse.json({
    success: 'Registration successful',
  })
}
