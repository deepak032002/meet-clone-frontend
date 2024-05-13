import { getMe } from "@/api/services/auth";
import HomeTemplate from "@/design-system/templates/HomeTemplate";

export default async function Home() {
  const user = await getMe();

  return (
    <main className="">
      <HomeTemplate data={user && user.data.data.user} />
    </main>
  );
}
