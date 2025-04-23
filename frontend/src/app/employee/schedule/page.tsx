import Navbar from "@/components/navbar";
import "../../globals.css";
import Clock from "@/components/Clock";

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main>
        <h1>Welcome to the Employee Dashboard</h1>
        <div className="flex items-center justify-center h-screen">
          <Clock />
        </div>
      </main>
    </>
  );
}