// Landing page - redirect to demo user page
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/anesh");
}
