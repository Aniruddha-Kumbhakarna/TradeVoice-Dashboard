import {
  Users,
  Phone,
  Server,
  Activity,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

interface SystemHealth {
  callServers: {
    total: number;
    online: number;
    offline: number;
  };
  gateways: { total: number; online: number; offline: number };
  recording: {
    status: "operational" | "degraded" | "offline";
    uptime_since: string;
  };
  phones: {
    total: number;
    active: number;
    idle: number;
    offline: number;
  };
}

export function Dashboard() {
  const [systemHealth, setSystemHealth] =
    useState<SystemHealth>({
      callServers: { total: 8, online: 7, offline: 1 },
      gateways: { total: 4, online: 4, offline: 0 },
     recording: {
        status: "operational",
       uptime_since: "10 days",
      },
      phones: { total: 156, active: 89, idle: 62, offline: 5 },
    });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemHealth((prev) => ({
        ...prev,
        phones: {
          ...prev.phones,
          active: Math.max(
            0,
            prev.phones.active +
              Math.floor(Math.random() * 11) -
              5,
          ),
          idle: Math.max(
            0,
            prev.phones.idle +
              Math.floor(Math.random() * 11) -
              5,
          ),
        },
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      label: "Total Users",
      value: "248",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      label: "Total Lines",
      value: "1,234",
      icon: Phone,
      color: "bg-green-500",
    },
    {
      label: "Turrets",
      value: "42",
      icon: Server,
      color: "bg-purple-500",
    },
    {
      label: "Active Calls",
      value: systemHealth.phones.active.toString(),
      icon: Activity,
      color: "bg-orange-500",
    },
    {
      label: "Provision Servers",
      value: "6",
      icon: Server,
      color: "bg-cyan-500",
      subtitle: "6 online",
      status: "Database: Good",
    },
  ];

  const getStatusIcon = (
    status: "operational" | "degraded" | "offline" | "online",
  ) => {
    switch (status) {
      case "operational":
      case "online":
        return (
          <CheckCircle className="w-5 h-5 text-green-500" />
        );
      case "degraded":
        return (
          <AlertCircle className="w-5 h-5 text-yellow-500" />
        );
      case "offline":
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Dashboard
        </h1>
        <p className="text-slate-600 mt-2">
          Trading voice system overview and health monitoring
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              {stat.subtitle && (
                <div className="mt-4">
                  <p className="text-sm text-slate-500">
                    {stat.subtitle}
                  </p>
                  <p className="text-sm text-slate-500">
                    {stat.status}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Call Servers */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Call Servers
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">
                Total Servers
              </span>
              <span className="font-semibold">
                {systemHealth.callServers.total}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Online</span>
              <div className="flex items-center gap-2">
                {getStatusIcon("online")}
                <span className="font-semibold">
                  {systemHealth.callServers.online}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Offline</span>
              <div className="flex items-center gap-2">
                {systemHealth.callServers.offline > 0 &&
                  getStatusIcon("offline")}
                <span className="font-semibold">
                  {systemHealth.callServers.offline}
                </span>
              </div>
            </div>
            <div className="mt-4 bg-slate-100 rounded-full h-2">
              <div
                className="bg-[#6cbc35] h-2 rounded-full transition-all"
                style={{
                  width: `${(systemHealth.callServers.online / systemHealth.callServers.total) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Gateways */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Gateways
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">
                Total Gateways
              </span>
              <span className="font-semibold">
                {systemHealth.gateways.total}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Online</span>
              <div className="flex items-center gap-2">
                {getStatusIcon("online")}
                <span className="font-semibold">
                  {systemHealth.gateways.online}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Offline</span>
              <div className="flex items-center gap-2">
                {systemHealth.gateways.offline > 0 &&
                  getStatusIcon("offline")}
                <span className="font-semibold">
                  {systemHealth.gateways.offline}
                </span>
              </div>
            </div>
            <div className="mt-4 bg-slate-100 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{
                  width: `${(systemHealth.gateways.online / systemHealth.gateways.total) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Recording Service */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Recording Service
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Status</span>
              <div className="flex items-center gap-2">
                {getStatusIcon(systemHealth.recording.status)}
                <span className="font-semibold capitalize">
                  {systemHealth.recording.status}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Uptime</span>
              <span className="font-semibold">
                {systemHealth.recording.uptime_since}
              </span>
            </div>
            <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-800">
                All recording channels operational
              </p>
            </div>
          </div>
        </div>

        {/* Desk Phones */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Desk Phones
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">
                Total Phones
              </span>
              <span className="font-semibold">
                {systemHealth.phones.total}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Active</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-semibold">
                  {systemHealth.phones.active}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Idle</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="font-semibold">
                  {systemHealth.phones.idle}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Offline</span>
              <div className="flex items-center gap-2">
                {systemHealth.phones.offline > 0 && (
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                )}
                <span className="font-semibold">
                  {systemHealth.phones.offline}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}