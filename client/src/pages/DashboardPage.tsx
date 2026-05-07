import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";
import { 
  Users, 
  UserPlus, 
  CheckCircle, 
  Trophy, 
  XCircle, 
  DollarSign, 
  TrendingUp,
  RefreshCw,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const DashboardPage = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      const response = await getDashboard();
      setStats(response.data);
      setLastRefresh(new Date());
    } catch (err) {
      console.error("Failed to fetch stats", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 animate-pulse"></div>
            </div>
          </div>
          <p className="mt-4 text-sm font-medium text-slate-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Users className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No Data Available</h3>
          <p className="text-slate-500 mb-6">Unable to load dashboard data. Please try again later.</p>
          <button
            onClick={loadStats}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Calculate trends (example logic - adjust based on your actual data)
  const getTrend = (current: number, previous: number) => {
    if (current > previous) return { direction: 'up', percentage: '+23%' };
    if (current < previous) return { direction: 'down', percentage: '-12%' };
    return { direction: 'neutral', percentage: '0%' };
  };

  const cards = [
    { 
      label: "Total Leads", 
      value: stats.totalLeads, 
      icon: Users, 
      color: "text-blue-600", 
      bg: "bg-blue-50",
      gradient: "from-blue-500 to-blue-600",
      trend: getTrend(stats.totalLeads, stats.totalLeads * 0.88)
    },
    { 
      label: "New Leads", 
      value: stats.newLeads, 
      icon: UserPlus, 
      color: "text-indigo-600", 
      bg: "bg-indigo-50",
      gradient: "from-indigo-500 to-indigo-600",
      trend: getTrend(stats.newLeads, stats.newLeads * 0.92)
    },
    { 
      label: "Qualified Leads", 
      value: stats.qualifiedLeads, 
      icon: CheckCircle, 
      color: "text-emerald-600", 
      bg: "bg-emerald-50",
      gradient: "from-emerald-500 to-emerald-600",
      trend: getTrend(stats.qualifiedLeads, stats.qualifiedLeads * 0.85)
    },
    { 
      label: "Won Leads", 
      value: stats.wonLeads, 
      icon: Trophy, 
      color: "text-amber-600", 
      bg: "bg-amber-50",
      gradient: "from-amber-500 to-amber-600",
      trend: getTrend(stats.wonLeads, stats.wonLeads * 0.78)
    },
    { 
      label: "Lost Leads", 
      value: stats.lostLeads, 
      icon: XCircle, 
      color: "text-rose-600", 
      bg: "bg-rose-50",
      gradient: "from-rose-500 to-rose-600",
      trend: getTrend(stats.lostLeads, stats.lostLeads * 1.15)
    },
    { 
      label: "Total Deal Value", 
      value: `$${stats.totalDealValue.toLocaleString()}`, 
      icon: DollarSign, 
      color: "text-slate-700", 
      bg: "bg-slate-100",
      gradient: "from-slate-600 to-slate-700",
      trend: getTrend(stats.totalDealValue, stats.totalDealValue * 0.77)
    },
    { 
      label: "Total Won Value", 
      value: `$${stats.totalWonValue.toLocaleString()}`, 
      icon: TrendingUp, 
      color: "text-green-600", 
      bg: "bg-green-50",
      gradient: "from-green-500 to-green-600",
      trend: getTrend(stats.totalWonValue, stats.totalWonValue * 0.82)
    },
  ];

  // Calculate conversion rate
  const conversionRate = stats.totalLeads > 0 
    ? ((stats.wonLeads / stats.totalLeads) * 100).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  Analytics Overview
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                Dashboard
              </h1>
              <p className="text-slate-500 mt-1">
                Welcome back! Here's what's happening with your leads today.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-slate-200">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600">
                  Last updated: {lastRefresh.toLocaleTimeString()}
                </span>
              </div>
              <button
                onClick={loadStats}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            const TrendIcon = card.trend.direction === 'up' ? ArrowUpRight : ArrowDownRight;
            const trendColor = card.trend.direction === 'up' ? 'text-emerald-600' : 'text-rose-600';
            const trendBg = card.trend.direction === 'up' ? 'bg-emerald-50' : 'bg-rose-50';
            
            return (
              <div 
                key={card.label} 
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`rounded-xl p-3 ${card.bg} transition-transform group-hover:scale-110 duration-300`}>
                      <Icon size={24} strokeWidth={2} className={card.color} />
                    </div>
                    
                    {/* Trend Badge */}
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${trendBg} ${trendColor}`}>
                      <TrendIcon size={12} />
                      <span>{card.trend.percentage}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">{card.label}</p>
                    <p className="text-2xl font-bold text-slate-900 tracking-tight">
                      {card.value}
                    </p>
                  </div>

                  {/* Progress Indicator for Percentage-based metrics */}
                  {card.label.includes("Rate") && (
                    <div className="mt-4">
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full bg-gradient-to-r ${card.gradient} transition-all duration-500`}
                          style={{ width: `${card.value}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Bottom Accent Bar */}
                <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${card.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
              </div>
            );
          })}
        </div>

        {/* Secondary Metrics Row */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {/* Conversion Rate Card */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 rounded-xl p-2.5 backdrop-blur-sm">
                <TrendingUp size={24} />
              </div>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                Conversion Rate
              </span>
            </div>
            <p className="text-4xl font-bold mb-1">{conversionRate}%</p>
            <p className="text-blue-100 text-sm">
              of total leads converted to won
            </p>
            <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${conversionRate}%` }}
              />
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-50 rounded-xl p-2.5">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Win Rate</p>
                <p className="text-2xl font-bold text-slate-900">
                  {stats.totalLeads > 0 ? ((stats.wonLeads / stats.totalLeads) * 100).toFixed(1) : 0}%
                </p>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Won: {stats.wonLeads}</span>
              <span className="text-slate-500">Lost: {stats.lostLeads}</span>
            </div>
          </div>

          {/* Average Value Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-50 rounded-xl p-2.5">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Average Deal Value</p>
                <p className="text-2xl font-bold text-slate-900">
                  ${stats.totalDealValue > 0 ? Math.round(stats.totalDealValue / stats.totalLeads).toLocaleString() : 0}
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-500">
              Based on {stats.totalLeads} total deals
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs text-slate-400 pt-4 border-t border-slate-200">
          Data refreshes every time you refresh the page • Last updated: {lastRefresh.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;