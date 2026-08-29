import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("lsw_admin")?.value === "true";
}

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("lsw_admin")?.value;
  return session === "true";
}
