import Image from "next/image";
import CommodityDashboard from "@/component/Dashboard";
import UsersTable from "@/component/Userstable";

export default function Home() {
  return (
    <div className="flex flex-col items-center pb-10">
      <CommodityDashboard></CommodityDashboard>
      <UsersTable />
    </div>
  );
}
