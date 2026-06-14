import { useState } from 'react';
import { Search, ChevronDown, ChevronRight, Globe } from 'lucide-react';

interface Turret {
  id: string;
  name: string;
  type: string;
  ipAddress: string;
  zone: string;
  traderLoggedIn?: string;
  status: 'online' | 'offline' | 'maintenance';
}

interface Zone {
  name: string;
  turrets: Turret[];
}

interface Country {
  name: string;
  code: string;
  zones: Zone[];
}

interface Region {
  name: string;
  code: 'EMEA' | 'AMER' | 'APAC';
  countries: Country[];
}

export function GlobalTurretDeployment() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRegions, setExpandedRegions] = useState<string[]>(['EMEA']);
  const [expandedCountries, setExpandedCountries] = useState<string[]>(['UK']);
  const [expandedZones, setExpandedZones] = useState<string[]>(['LON-ZONE-1']);

  const regions: Region[] = [
    {
      name: 'Europe, Middle East & Africa',
      code: 'EMEA',
      countries: [
        {
          name: 'United Kingdom',
          code: 'UK',
          zones: [
            {
              name: 'LON-ZONE-1',
              turrets: [
                { id: '1', name: 'TRT-LON-FX-001', type: 'BT T4', ipAddress: '10.1.1.101', zone: 'LON-ZONE-1', traderLoggedIn: 'James Wilson', status: 'online' },
                { id: '2', name: 'TRT-LON-FX-002', type: 'BT Flex', ipAddress: '10.1.1.102', zone: 'LON-ZONE-1', traderLoggedIn: 'Sarah Thompson', status: 'online' },
                { id: '3', name: 'TRT-LON-EQ-001', type: 'BT T4 Mini', ipAddress: '10.1.1.103', zone: 'LON-ZONE-1', traderLoggedIn: 'David Brown', status: 'online' },
                { id: '4', name: 'TRT-LON-EQ-002', type: 'BT SIP Netrix', ipAddress: '10.1.1.104', zone: 'LON-ZONE-1', status: 'offline' },
              ],
            },
            {
              name: 'LON-ZONE-2',
              turrets: [
                { id: '5', name: 'TRT-LON-FI-001', type: 'BT T4', ipAddress: '10.1.2.101', zone: 'LON-ZONE-2', traderLoggedIn: 'Michael Chen', status: 'online' },
                { id: '6', name: 'TRT-LON-FI-002', type: 'BT Flex', ipAddress: '10.1.2.102', zone: 'LON-ZONE-2', traderLoggedIn: 'Emma Davis', status: 'online' },
              ],
            },
          ],
        },
        {
          name: 'Germany',
          code: 'DE',
          zones: [
            {
              name: 'FRA-ZONE-1',
              turrets: [
                { id: '7', name: 'TRT-FRA-FX-001', type: 'BT T4', ipAddress: '10.2.1.101', zone: 'FRA-ZONE-1', traderLoggedIn: 'Hans Mueller', status: 'online' },
                { id: '8', name: 'TRT-FRA-FX-002', type: 'BT T4', ipAddress: '10.2.1.102', zone: 'FRA-ZONE-1', traderLoggedIn: 'Klaus Schmidt', status: 'online' },
                { id: '9', name: 'TRT-FRA-EQ-001', type: 'BT SIP Netrix', ipAddress: '10.2.1.103', zone: 'FRA-ZONE-1', status: 'offline' },
              ],
            },
          ],
        },
        {
          name: 'Luxembourg',
          code: 'LU',
          zones: [
            {
              name: 'LUX-ZONE-1',
              turrets: [
                { id: '10', name: 'TRT-LUX-FX-001', type: 'BT Flex', ipAddress: '10.3.1.101', zone: 'LUX-ZONE-1', traderLoggedIn: 'Pierre Dubois', status: 'online' },
                { id: '11', name: 'TRT-LUX-FI-001', type: 'BT T4 Mini', ipAddress: '10.3.1.102', zone: 'LUX-ZONE-1', traderLoggedIn: 'Marie Laurent', status: 'online' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Americas',
      code: 'AMER',
      countries: [
        {
          name: 'United States',
          code: 'US',
          zones: [
            {
              name: 'NYC-ZONE-1',
              turrets: [
                { id: '12', name: 'TRT-NYC-FX-001', type: 'BT T4', ipAddress: '10.10.1.101', zone: 'NYC-ZONE-1', traderLoggedIn: 'John Anderson', status: 'online' },
                { id: '13', name: 'TRT-NYC-FX-002', type: 'BT T4', ipAddress: '10.10.1.102', zone: 'NYC-ZONE-1', traderLoggedIn: 'Lisa Martinez', status: 'online' },
                { id: '14', name: 'TRT-NYC-EQ-001', type: 'BT Flex', ipAddress: '10.10.1.103', zone: 'NYC-ZONE-1', traderLoggedIn: 'Robert Johnson', status: 'online' },
                { id: '15', name: 'TRT-NYC-EQ-002', type: 'BT SIP Netrix', ipAddress: '10.10.1.104', zone: 'NYC-ZONE-1', status: 'offline' },
              ],
            },
            {
              name: 'NYC-ZONE-2',
              turrets: [
                { id: '16', name: 'TRT-NYC-FI-001', type: 'BT T4 Mini', ipAddress: '10.10.2.101', zone: 'NYC-ZONE-2', traderLoggedIn: 'Jennifer Lee', status: 'online' },
                { id: '17', name: 'TRT-NYC-FI-002', type: 'BT Flex', ipAddress: '10.10.2.102', zone: 'NYC-ZONE-2', traderLoggedIn: 'David Kim', status: 'online' },
              ],
            },
          ],
        },
        {
          name: 'Canada',
          code: 'CA',
          zones: [
            {
              name: 'TOR-ZONE-1',
              turrets: [
                { id: '18', name: 'TRT-TOR-FX-001', type: 'BT T4', ipAddress: '10.11.1.101', zone: 'TOR-ZONE-1', traderLoggedIn: 'Andrew Wilson', status: 'online' },
                { id: '19', name: 'TRT-TOR-EQ-001', type: 'BT Flex', ipAddress: '10.11.1.102', zone: 'TOR-ZONE-1', traderLoggedIn: 'Sophie Martin', status: 'online' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Asia Pacific',
      code: 'APAC',
      countries: [
        {
          name: 'Singapore',
          code: 'SG',
          zones: [
            {
              name: 'SG-ZONE-1',
              turrets: [
                { id: '20', name: 'TRT-SG-FX-001', type: 'BT T4', ipAddress: '10.20.1.101', zone: 'SG-ZONE-1', traderLoggedIn: 'Wei Zhang', status: 'online' },
                { id: '21', name: 'TRT-SG-FX-002', type: 'BT T4', ipAddress: '10.20.1.102', zone: 'SG-ZONE-1', traderLoggedIn: 'Li Ming', status: 'online' },
                { id: '22', name: 'TRT-SG-EQ-001', type: 'BT Flex', ipAddress: '10.20.1.103', zone: 'SG-ZONE-1', traderLoggedIn: 'Raj Kumar', status: 'online' },
              ],
            },
            {
              name: 'SG-ZONE-2',
              turrets: [
                { id: '23', name: 'TRT-SG-FI-001', type: 'BT SIP Netrix', ipAddress: '10.20.2.101', zone: 'SG-ZONE-2', traderLoggedIn: 'Priya Sharma', status: 'online' },
                { id: '24', name: 'TRT-SG-FI-002', type: 'BT T4 Mini', ipAddress: '10.20.2.102', zone: 'SG-ZONE-2', status: 'maintenance' },
              ],
            },
          ],
        },
        {
          name: 'Hong Kong',
          code: 'HK',
          zones: [
            {
              name: 'HK-ZONE-1',
              turrets: [
                { id: '25', name: 'TRT-HK-FX-001', type: 'BT T4', ipAddress: '10.21.1.101', zone: 'HK-ZONE-1', traderLoggedIn: 'Chen Wei', status: 'online' },
                { id: '26', name: 'TRT-HK-FX-002', type: 'BT Flex', ipAddress: '10.21.1.102', zone: 'HK-ZONE-1', traderLoggedIn: 'Amy Wong', status: 'online' },
                { id: '27', name: 'TRT-HK-EQ-001', type: 'BT T4', ipAddress: '10.21.1.103', zone: 'HK-ZONE-1', traderLoggedIn: 'Jack Chan', status: 'online' },
              ],
            },
          ],
        },
        {
          name: 'Japan',
          code: 'JP',
          zones: [
            {
              name: 'TYO-ZONE-1',
              turrets: [
                { id: '28', name: 'TRT-TYO-FX-001', type: 'BT T4', ipAddress: '10.22.1.101', zone: 'TYO-ZONE-1', traderLoggedIn: 'Yuki Tanaka', status: 'online' },
                { id: '29', name: 'TRT-TYO-EQ-001', type: 'BT SIP Netrix', ipAddress: '10.22.1.102', zone: 'TYO-ZONE-1', traderLoggedIn: 'Hiroshi Sato', status: 'online' },
              ],
            },
          ],
        },
      ],
    },
  ];

  const toggleRegion = (code: string) => {
    setExpandedRegions(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  const toggleCountry = (code: string) => {
    setExpandedCountries(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  const toggleZone = (name: string) => {
    setExpandedZones(prev =>
      prev.includes(name) ? prev.filter(z => z !== name) : [...prev, name]
    );
  };

  // Flatten all turrets for searching
  const allTurrets = regions.flatMap(region =>
    region.countries.flatMap(country =>
      country.zones.flatMap(zone => zone.turrets)
    )
  );

  const filteredTurrets = allTurrets.filter(turret =>
    turret.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    turret.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    turret.ipAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
    turret.zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (turret.traderLoggedIn?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-[#6cbc35]';
      case 'offline':
        return 'bg-red-500';
      case 'maintenance':
        return 'bg-[#fd9f3e]';
      default:
        return 'bg-slate-400';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="w-8 h-8 text-[#d52685]" />
          <h1 className="text-3xl font-bold text-slate-900">Global Turret Deployment</h1>
        </div>
        <p className="text-slate-600">View all deployed turrets across regions</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by turret name, type, IP address, zone, or trader..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d52685]"
          />
        </div>
      </div>

      {/* Search Results View */}
      {searchTerm && (
        <div className="mb-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h2 className="font-semibold text-slate-900">
              Search Results ({filteredTurrets.length} turrets found)
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">Status</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">Turret Name</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">Type</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">IP Address</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">Zone</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">Trader Logged In</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredTurrets.map(turret => (
                  <tr key={turret.id} className="hover:bg-slate-50">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor(turret.status)}`} />
                        <span className="text-sm capitalize">{turret.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 font-mono font-semibold text-sm">{turret.name}</td>
                    <td className="px-6 py-3 text-sm">{turret.type}</td>
                    <td className="px-6 py-3 font-mono text-sm">{turret.ipAddress}</td>
                    <td className="px-6 py-3 text-sm">{turret.zone}</td>
                    <td className="px-6 py-3 text-sm">{turret.traderLoggedIn || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Hierarchical View */}
      {!searchTerm && (
        <div className="space-y-4">
          {regions.map(region => (
            <div key={region.code} className="bg-white rounded-lg shadow overflow-hidden">
              {/* Region Header */}
              <button
                onClick={() => toggleRegion(region.code)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-[#d52685] to-[#553a99] text-white hover:from-[#b51f6f] hover:to-[#452e7a] transition-all"
              >
                <div className="flex items-center gap-3">
                  {expandedRegions.includes(region.code) ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                  <span className="font-bold text-lg">{region.name} ({region.code})</span>
                </div>
                <span className="text-sm opacity-90">
                  {region.countries.reduce((sum, country) => 
                    sum + country.zones.reduce((zSum, zone) => zSum + zone.turrets.length, 0), 0
                  )} turrets
                </span>
              </button>

              {/* Countries */}
              {expandedRegions.includes(region.code) && (
                <div className="divide-y divide-slate-200">
                  {region.countries.map(country => (
                    <div key={country.code}>
                      {/* Country Header */}
                      <button
                        onClick={() => toggleCountry(country.code)}
                        className="w-full px-6 py-3 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {expandedCountries.includes(country.code) ? (
                            <ChevronDown className="w-4 h-4 text-slate-600" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-slate-600" />
                          )}
                          <span className="font-semibold text-slate-900">{country.name}</span>
                        </div>
                        <span className="text-sm text-slate-600">
                          {country.zones.reduce((sum, zone) => sum + zone.turrets.length, 0)} turrets
                        </span>
                      </button>

                      {/* Zones */}
                      {expandedCountries.includes(country.code) && (
                        <div className="bg-slate-50">
                          {country.zones.map(zone => (
                            <div key={zone.name} className="border-t border-slate-200">
                              {/* Zone Header */}
                              <button
                                onClick={() => toggleZone(zone.name)}
                                className="w-full px-12 py-3 flex items-center justify-between hover:bg-slate-100 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  {expandedZones.includes(zone.name) ? (
                                    <ChevronDown className="w-4 h-4 text-[#553a99]" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4 text-[#553a99]" />
                                  )}
                                  <span className="font-semibold text-[#553a99]">{zone.name}</span>
                                </div>
                                <span className="text-sm text-slate-600">{zone.turrets.length} turrets</span>
                              </button>

                              {/* Turrets Table */}
                              {expandedZones.includes(zone.name) && (
                                <div className="px-6 pb-4">
                                  <div className="overflow-x-auto rounded-lg border border-slate-200">
                                    <table className="w-full bg-white">
                                      <thead className="bg-slate-100 border-b border-slate-200">
                                        <tr>
                                          <th className="text-left px-4 py-2 text-xs font-semibold text-slate-700">Status</th>
                                          <th className="text-left px-4 py-2 text-xs font-semibold text-slate-700">Turret Name</th>
                                          <th className="text-left px-4 py-2 text-xs font-semibold text-slate-700">Type</th>
                                          <th className="text-left px-4 py-2 text-xs font-semibold text-slate-700">IP Address</th>
                                          <th className="text-left px-4 py-2 text-xs font-semibold text-slate-700">Trader Logged In</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        {zone.turrets.map(turret => (
                                          <tr key={turret.id} className="hover:bg-slate-50">
                                            <td className="px-4 py-2">
                                              <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${getStatusColor(turret.status)}`} />
                                                <span className="text-xs capitalize">{turret.status}</span>
                                              </div>
                                            </td>
                                            <td className="px-4 py-2 font-mono font-semibold text-xs">{turret.name}</td>
                                            <td className="px-4 py-2 text-xs">{turret.type}</td>
                                            <td className="px-4 py-2 font-mono text-xs">{turret.ipAddress}</td>
                                            <td className="px-4 py-2 text-xs">{turret.traderLoggedIn || '—'}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
