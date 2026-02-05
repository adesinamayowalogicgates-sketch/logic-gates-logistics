import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { profileSchema } from "@/lib/validation";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        firstName: true,
        lastName: true,
        gender: true,
        dateOfBirth: true,
        email: true,
        phone: true,
        nationality: true,
        nextOfKinName: true,
        nextOfKinGender: true,
        nextOfKinPhone: true,
        company: true
      }
    });

    return NextResponse.json(user);
  } catch (dbError: any) {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        company: true
      }
    });

    return NextResponse.json({
      ...user,
      firstName: null,
      lastName: null,
      gender: null,
      dateOfBirth: null,
      nationality: null,
      nextOfKinName: null,
      nextOfKinGender: null,
      nextOfKinPhone: null
    });
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const data = profileSchema.parse(payload);

    try {
      const user = await prisma.user.update({
        where: { id: session.user.id },
        data: {
          name: data.name,
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          dateOfBirth: data.dateOfBirth,
          phone: data.phone,
          nationality: data.nationality,
          nextOfKinName: data.nextOfKinName,
          nextOfKinGender: data.nextOfKinGender,
          nextOfKinPhone: data.nextOfKinPhone,
          company: data.company || null
        }
      });

      return NextResponse.json({ id: user.id });
    } catch (dbError: any) {
      const message = dbError?.message || "Profile fields not available.";
      return NextResponse.json({
        error: "Profile fields are not available in the database yet. Run the Supabase SQL snippet to add columns.",
        detail: message
      }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message ?? "Invalid request" }, { status: 400 });
  }
}
