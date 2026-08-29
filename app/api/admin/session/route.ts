import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const cookie = request.headers.get("cookie") ?? "";
  const isAdmin = cookie.split(";").some((pair) => pair.trim().startsWith("lsw_admin=true"));

  if (!isAdmin) {
    return NextResponse.json({ authenticated: false });
  }

  try {
    const prisma = getPrisma();
    const email = process.env.ADMIN_EMAIL;
    let user = null;
    if (email) {
      user = await prisma.adminUser.findUnique({ where: { email } });
    }

    if (!user) {
      user = await prisma.adminUser.findFirst();
    }

    if (!user) {
      return NextResponse.json({ authenticated: true });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (e) {
    return NextResponse.json({ authenticated: true });
  }
}
