import { useState } from "react";
import {
  Server,
  Disc,
  Globe,
  Phone,
  CheckCircle,
  AlertCircle,
  XCircle,
  Database,
  Info,
} from "lucide-react";

interface ServerStatus {
  id: string;
  name: string;
  type: "call" | "recording" | "gateway" | "provisioning";
  status: "online" | "offline" | "degraded";
  uptime: string;
  region?: string;
  dbConnection?: "good" | "slow" | "error";
  dbConnectionError?: string;
  sipTrunk?: string;
  callsFlowing?: number;
  backupStatus?: "up" | "down";
  backupError?: string;
  recordingPair?: string;
  recording2n?: "active" | "degraded" | "offline";
  recording2nError?: string;
  replicationStatus?: "working" | "syncing" | "error";
  replicationError?: string;
  tpoErrors?: string[];
  errorDetails?: string;
}

interface DeskPhone {
  id: string;
  desk: string;
  extension: string;
  status: "active" | "idle" | "offline";
  currentCall?: string;
  errorDetails?: string;
}

export function SystemStatus() {
  const [servers] = useState<ServerStatus[]>([
    {
      id: "1",
      name: "CallServer-01",
      type: "call",
      status: "online",
      uptime: "2024-01-15 08:30:00",
    },
    {
      id: "2",
      name: "CallServer-02",
      type: "call",
      status: "online",
      uptime: "2024-01-20 14:15:00",
    },
    {
      id: "3",
      name: "CallServer-03",
      type: "call",
      status: "degraded",
      uptime: "2024-02-10 09:45:00",
      tpoErrors: ["TPO-HK-CS03-01", "TPO-HK-CS03-05"],
      errorDetails: "2 TPOs not responding: TPO-HK-CS03-01, TPO-HK-CS03-05",
    },

    {
      id: "4",
      name: "RecSrv-HK-01",
      type: "recording",
      status: "online",
      uptime: "2024-01-10 12:00:00",
      region: "Hong Kong",
      recordingPair: "Pair 1",
      recording2n: "offline",
      recording2nError: "Pair 1 - RecSrv-HK-02 is offline. Only RecSrv-HK-01 is recording. No redundancy available.",
    },
    {
      id: "5",
      name: "RecSrv-HK-02",
      type: "recording",
      status: "offline",
      uptime: "2024-01-10 12:00:00",
      region: "Hong Kong",
      recordingPair: "Pair 1",
      recording2n: "offline",
      errorDetails: "Server unreachable. Last seen: 2024-03-05 18:45:00",
    },
    {
      id: "6",
      name: "RecSrv-SG-01",
      type: "recording",
      status: "online",
      uptime: "2024-01-12 10:30:00",
      region: "Singapore",
      recordingPair: "Pair 2",
      recording2n: "active",
    },
    {
      id: "7",
      name: "RecSrv-SG-02",
      type: "recording",
      status: "online",
      uptime: "2024-01-12 10:30:00",
      region: "Singapore",
      recordingPair: "Pair 2",
      recording2n: "active",
    },

    {
      id: "8",
      name: "Gateway-HK-01",
      type: "gateway",
      status: "online",
      uptime: "2024-01-05 07:00:00",
      region: "Hong Kong",
      sipTrunk: "SIP-HK-TRUNK-01",
      callsFlowing: 45,
      backupStatus: "up",
    },
    {
      id: "9",
      name: "Gateway-HK-02",
      type: "gateway",
      status: "online",
      uptime: "2024-01-08 09:30:00",
      region: "Hong Kong",
      sipTrunk: "SIP-HK-TRUNK-02",
      callsFlowing: 38,
      backupStatus: "up",
    },
    {
      id: "10",
      name: "Gateway-SG-01",
      type: "gateway",
      status: "online",
      uptime: "2024-01-06 11:20:00",
      region: "Singapore",
      sipTrunk: "SIP-SG-TRUNK-01",
      callsFlowing: 52,
      backupStatus: "up",
    },
    {
      id: "11",
      name: "Gateway-SG-02",
      type: "gateway",
      status: "online",
      uptime: "2024-01-09 08:45:00",
      region: "Singapore",
      sipTrunk: "SIP-SG-TRUNK-02",
      callsFlowing: 41,
      backupStatus: "down",
      backupError: "Backup gateway Gateway-SG-02-BK is offline. No failover available.",
    },

    {
      id: "12",
      name: "ProvSrv-HK-01",
      type: "provisioning",
      status: "online",
      uptime: "2024-01-03 06:15:00",
      region: "Hong Kong",
      dbConnection: "good",
      backupStatus: "up",
      replicationStatus: "working",
    },
    {
      id: "13",
      name: "ProvSrv-HK-02",
      type: "provisioning",
      status: "online",
      uptime: "2024-01-04 07:30:00",
      region: "Hong Kong",
      dbConnection: "good",
      backupStatus: "up",
      replicationStatus: "working",
    },
    {
      id: "14",
      name: "ProvSrv-SG-01",
      type: "provisioning",
      status: "online",
      uptime: "2024-01-02 05:00:00",
      region: "Singapore",
      dbConnection: "good",
      backupStatus: "up",
      replicationStatus: "working",
    },
    {
      id: "15",
      name: "ProvSrv-SG-02",
      type: "provisioning",
      status: "online",
      uptime: "2024-01-07 10:15:00",
      region: "Singapore",
      dbConnection: "good",
      backupStatus: "up",
      replicationStatus: "syncing",
      replicationError: "Database replication is catching up. Currently 45 seconds behind primary.",
    },
    {
      id: "16",
      name: "ProvSrv-LON-01",
      type: "provisioning",
      status: "online",
      uptime: "2024-01-11 13:45:00",
      region: "London",
      dbConnection: "slow",
      dbConnectionError: "Database connection latency is high (>500ms). Network path to DB cluster may be congested.",
      backupStatus: "up",
      replicationStatus: "working",
    },
    {
      id: "17",
      name: "ProvSrv-LON-02",
      type: "provisioning",
      status: "online",
      uptime: "2024-01-14 16:20:00",
      region: "London",
      dbConnection: "good",
      backupStatus: "up",
      replicationStatus: "working",
    },
  ]);

  const [deskPhones] = useState<DeskPhone[]>([
    {
      id: "1",
      desk: "Desk A1",
      extension: "101",
      status: "active",
      currentCall: "Ext 205",
    },
    {
      id: "2",
      desk: "Desk A2",
      extension: "102",
      status: "idle",
    },
    {
      id: "3",
      desk: "Desk A3",
      extension: "103",
      status: "active",
      currentCall: "+1-212-555-0199",
    },
    {
      id: "4",
      desk: "Desk B1",
      extension: "201",
      status: "idle",
    },
    {
      id: "5",
      desk: "Desk B2",
      extension: "202",
      status: "offline",
      errorDetails: "Phone not registered. Device may be unplugged or network connectivity issue.",
    },
    {
      id: "6",
      desk: "Desk C1",
      extension: "301",
      status: "active",
      currentCall: "Ext 102",
    },
  ]);

  const getStatusIcon = (status: "online" | "offline" | "degraded") => {
    switch (status) {
      case "online":
        return <CheckCircle className="w-5 h-5 text-[#6cbc35]" />;
      case "degraded":
        return <AlertCircle className="w-5 h-5 text-[#fd9f3e]" />;
      case "offline":
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getDbConnectionStatus = (status?: "good" | "slow" | "error") => {
    switch (status) {
      case "good":
        return {
          icon: <CheckCircle className="w-4 h-4 text-[#6cbc35]" />,
          text: "Good",
          color: "text-[#6cbc35]",
        };
      case "slow":
        return {
          icon: <AlertCircle className="w-4 h-4 text-[#fd9f3e]" />,
          text: "Slow",
          color: "text-[#fd9f3e]",
        };
      case "error":
        return {
          icon: <XCircle className="w-4 h-4 text-red-500" />,
          text: "Error",
          color: "text-red-600",
        };
      default:
        return null;
    }
  };

  const getReplicationStatus = (status?: "working" | "syncing" | "error") => {
    switch (status) {
      case "working":
        return {
          icon: <CheckCircle className="w-4 h-4 text-[#6cbc35]" />,
          text: "Working",
          color: "text-[#6cbc35]",
        };
      case "syncing":
        return {
          icon: <AlertCircle className="w-4 h-4 text-[#fd9f3e]" />,
          text: "Syncing",
          color: "text-[#fd9f3e]",
        };
      case "error":
        return {
          icon: <XCircle className="w-4 h-4 text-red-500" />,
          text: "Error",
          color: "text-red-600",
        };
      default:
        return null;
    }
  };

  const getRecording2nStatus = (status?: "active" | "degraded" | "offline") => {
    switch (status) {
      case "active":
        return {
          icon: <CheckCircle className="w-4 h-4 text-[#6cbc35]" />,
          text: "2N Active",
          color: "text-[#6cbc35]",
        };
      case "degraded":
        return {
          icon: <AlertCircle className="w-4 h-4 text-[#fd9f3e]" />,
          text: "2N Degraded",
          color: "text-[#fd9f3e]",
        };
      case "offline":
        return {
          icon: <XCircle className="w-4 h-4 text-red-500" />,
          text: "2N Offline",
          color: "text-red-600",
        };
      default:
        return null;
    }
  };

  const callServers = servers.filter((s) => s.type === "call");
  const recordingServers = servers.filter((s) => s.type === "recording");
  const gateways = servers.filter((s) => s.type === "gateway");
  const provisioningServers = servers.filter((s) => s.type === "provisioning");

  // Group by region
  const recordingByRegion = recordingServers.reduce((acc, server) => {
    const region = server.region || "Unknown";
    if (!acc[region]) acc[region] = [];
    acc[region].push(server);
    return acc;
  }, {} as Record<string, ServerStatus[]>);

  const gatewaysByRegion = gateways.reduce((acc, server) => {
    const region = server.region || "Unknown";
    if (!acc[region]) acc[region] = [];
    acc[region].push(server);
    return acc;
  }, {} as Record<string, ServerStatus[]>);

  const provisioningByRegion = provisioningServers.reduce((acc, server) => {
    const region = server.region || "Unknown";
    if (!acc[region]) acc[region] = [];
    acc[region].push(server);
    return acc;
  }, {} as Record<string, ServerStatus[]>);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">System Health</h1>
        <p className="text-slate-600 mt-2">
          Real-time monitoring of all system components
        </p>
      </div>

      {/* Call Servers */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Server className="w-6 h-6 text-slate-700" />
          <h2 className="text-2xl font-semibold text-slate-900">
            Call Servers
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {callServers.map((server) => (
            <div
              key={server.id}
              className="bg-white rounded-lg shadow p-6 relative group"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900">{server.name}</h3>
                <div className="flex items-center gap-2">
                  {getStatusIcon(server.status)}
                  {server.errorDetails && (
                    <div className="relative">
                      <Info className="w-4 h-4 text-[#fd9f3e] cursor-help" />
                      <div className="absolute right-0 top-6 w-64 bg-slate-900 text-white text-xs rounded-lg p-3 shadow-lg invisible group-hover:visible z-10">
                        {server.errorDetails}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Status</span>
                  <span className="font-semibold capitalize">{server.status}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Uptime Since</span>
                  <span className="font-semibold text-xs">{server.uptime}</span>
                </div>
                {server.tpoErrors && server.tpoErrors.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">TPO Errors</span>
                      <span className="text-red-600 font-semibold">{server.tpoErrors.length}</span>
                    </div>
                    <div className="mt-2 text-xs text-red-600">
                      {server.tpoErrors.map(tpo => (
                        <div key={tpo}>• {tpo}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recording Servers */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Disc className="w-6 h-6 text-slate-700" />
          <h2 className="text-2xl font-semibold text-slate-900">
            Recording Servers
          </h2>
        </div>
        {Object.entries(recordingByRegion).map(([region, regionServers]) => (
          <div key={region} className="mb-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              {region}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {regionServers.map((server) => {
                const recording2n = getRecording2nStatus(server.recording2n);
                return (
                  <div
                    key={server.id}
                    className="bg-white rounded-lg shadow p-6 relative group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {server.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          {server.recordingPair}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(server.status)}
                        {server.errorDetails && (
                          <div className="relative">
                            <Info className="w-4 h-4 text-red-500 cursor-help" />
                            <div className="absolute right-0 top-6 w-64 bg-slate-900 text-white text-xs rounded-lg p-3 shadow-lg invisible group-hover:visible z-10">
                              {server.errorDetails}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Status</span>
                        <span className="font-semibold capitalize">
                          {server.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Uptime Since</span>
                        <span className="font-semibold text-xs">
                          {server.uptime}
                        </span>
                      </div>
                      {recording2n && (
                        <div className="flex items-center justify-between pt-2 border-t border-slate-200 mt-3">
                          <span className="text-slate-600">Recording Status</span>
                          <div className="flex items-center gap-2 relative">
                            {recording2n.icon}
                            <span className={`font-semibold ${recording2n.color}`}>
                              {recording2n.text}
                            </span>
                            {server.recording2nError && (
                              <div className="relative">
                                <Info className="w-4 h-4 text-red-500 cursor-help ml-1" />
                                <div className="absolute right-0 top-6 w-80 bg-slate-900 text-white text-xs rounded-lg p-3 shadow-lg invisible group-hover:visible z-10 whitespace-normal">
                                  {server.recording2nError}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Gateways */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-6 h-6 text-slate-700" />
          <h2 className="text-2xl font-semibold text-slate-900">Gateways</h2>
        </div>
        {Object.entries(gatewaysByRegion).map(([region, regionServers]) => (
          <div key={region} className="mb-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              {region}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {regionServers.map((server) => (
                <div
                  key={server.id}
                  className="bg-white rounded-lg shadow p-6 relative group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900">
                      {server.name}
                    </h3>
                    {getStatusIcon(server.status)}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">SIP Trunk</span>
                      <span className="font-mono font-semibold text-xs">
                        {server.sipTrunk}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Calls Flowing</span>
                      <span className="font-semibold">{server.callsFlowing}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Uptime Since</span>
                      <span className="font-semibold text-xs">
                        {server.uptime}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200 mt-3">
                      <span className="text-slate-600">Backup Gateway</span>
                      <div className="flex items-center gap-2">
                        {server.backupStatus === "up" ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-[#6cbc35]" />
                            <span className="font-semibold text-[#6cbc35]">Up</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-red-500" />
                            <span className="font-semibold text-red-600">Down</span>
                            {server.backupError && (
                              <div className="relative">
                                <Info className="w-4 h-4 text-red-500 cursor-help ml-1" />
                                <div className="absolute right-0 top-6 w-72 bg-slate-900 text-white text-xs rounded-lg p-3 shadow-lg invisible group-hover:visible z-10">
                                  {server.backupError}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Provisioning Servers */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-6 h-6 text-slate-700" />
          <h2 className="text-2xl font-semibold text-slate-900">
            Provisioning Servers
          </h2>
        </div>
        {Object.entries(provisioningByRegion).map(([region, regionServers]) => (
          <div key={region} className="mb-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              {region}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {regionServers.map((server) => {
                const dbStatus = getDbConnectionStatus(server.dbConnection);
                const replicationStatus = getReplicationStatus(
                  server.replicationStatus
                );
                return (
                  <div
                    key={server.id}
                    className="bg-white rounded-lg shadow p-6 relative group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-slate-900">
                        {server.name}
                      </h3>
                      {getStatusIcon(server.status)}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Uptime Since</span>
                        <span className="font-semibold text-xs">
                          {server.uptime}
                        </span>
                      </div>
                      {dbStatus && (
                        <div className="flex items-center justify-between pt-2 border-t border-slate-200 mt-3">
                          <span className="text-slate-600">DB Connection</span>
                          <div className="flex items-center gap-2">
                            {dbStatus.icon}
                            <span className={`font-semibold ${dbStatus.color}`}>
                              {dbStatus.text}
                            </span>
                            {server.dbConnectionError && (
                              <div className="relative">
                                <Info className="w-4 h-4 text-[#fd9f3e] cursor-help ml-1" />
                                <div className="absolute right-0 top-6 w-72 bg-slate-900 text-white text-xs rounded-lg p-3 shadow-lg invisible group-hover:visible z-10">
                                  {server.dbConnectionError}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {replicationStatus && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">Replication</span>
                          <div className="flex items-center gap-2">
                            {replicationStatus.icon}
                            <span
                              className={`font-semibold ${replicationStatus.color}`}
                            >
                              {replicationStatus.text}
                            </span>
                            {server.replicationError && (
                              <div className="relative">
                                <Info className="w-4 h-4 text-[#fd9f3e] cursor-help ml-1" />
                                <div className="absolute right-0 top-6 w-72 bg-slate-900 text-white text-xs rounded-lg p-3 shadow-lg invisible group-hover:visible z-10">
                                  {server.replicationError}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Backup Server</span>
                        <div className="flex items-center gap-2">
                          {server.backupStatus === "up" ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-[#6cbc35]" />
                              <span className="font-semibold text-[#6cbc35]">
                                Up
                              </span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-red-500" />
                              <span className="font-semibold text-red-600">
                                Down
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Desk Phones */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Phone className="w-6 h-6 text-slate-700" />
          <h2 className="text-2xl font-semibold text-slate-900">
            Desk Phones Status
          </h2>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                  Desk
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                  Extension
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                  Current Call
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {deskPhones.map((phone) => (
                <tr key={phone.id} className="hover:bg-slate-50 group">
                  <td className="px-6 py-4 font-semibold">{phone.desk}</td>
                  <td className="px-6 py-4 font-mono">{phone.extension}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 relative">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          phone.status === "active"
                            ? "bg-[#6cbc35] animate-pulse"
                            : phone.status === "idle"
                            ? "bg-blue-500"
                            : "bg-red-500"
                        }`}
                      />
                      <span className="capitalize">{phone.status}</span>
                      {phone.errorDetails && (
                        <>
                          <Info className="w-4 h-4 text-red-500 cursor-help ml-1" />
                          <div className="absolute left-0 top-8 w-72 bg-slate-900 text-white text-xs rounded-lg p-3 shadow-lg invisible group-hover:visible z-10">
                            {phone.errorDetails}
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {phone.currentCall || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
