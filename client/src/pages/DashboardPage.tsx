import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";

const DashboardPage = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await getDashboard();
        setStats(response.data);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (!stats) return <p>No dashboard data.</p>;

  const cards = [
    { label: "Total Leads", value: stats.totalLeads },
    { label: "New Leads", value: stats.newLeads },
    { label: "Qualified Leads", value: stats.qualifiedLeads },
    { label: "Won Leads", value: stats.wonLeads },
    { label: "Lost Leads", value: stats.lostLeads },
    { label: "Total Deal Value", value: `$${stats.totalDealValue.toLocaleString()}` },
    { label: "Total Won Value", value: `$${stats.totalWonValue.toLocaleString()}` },
  ];

  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold text-slate-800">Dashboard</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="rounded-lg bg-white p-4 shadow">
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="mt-2 text-2xl font-bold text-slate-800">{card.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DashboardPage;
