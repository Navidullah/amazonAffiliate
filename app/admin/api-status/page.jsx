// app/admin/api-status/page.jsx
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Activity,
  CheckCircle,
  XCircle,
  TrendingUp,
  Clock,
  Server,
} from "lucide-react";

export default function APIStatusPage() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatus();
    // Refresh every 30 seconds
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchStatus = async () => {
    try {
      const response = await fetch("/api/tiktok/analyze");
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      console.error("Error fetching status:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="animate-pulse">Loading API status...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            TikTok API Status Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor your API keys usage and performance
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Requests
                  </p>
                  <p className="text-2xl font-bold">
                    {status?.summary?.totalRequests || 0}
                  </p>
                </div>
                <Activity className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Successful</p>
                  <p className="text-2xl font-bold text-green-600">
                    {status?.summary?.successfulRequests || 0}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Failed</p>
                  <p className="text-2xl font-bold text-red-600">
                    {status?.summary?.failedRequests || 0}
                  </p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold">
                    {status?.summary?.successRate || "N/A"}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* API Keys Table */}
        <h2 className="text-xl font-semibold mb-4">API Keys Status</h2>
        <div className="bg-card border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4">API</th>
                <th className="text-left p-4">Host</th>
                <th className="text-left p-4">Usage</th>
                <th className="text-left p-4">Success Rate</th>
                <th className="text-left p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {status?.apis?.map((api) => (
                <tr key={api.id} className="border-t">
                  <td className="p-4 font-medium">{api.name}</td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {api.host}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(api.used / api.limit) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm">
                        {api.used}/{api.limit}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={
                        api.successRate !== "N/A" &&
                        parseFloat(api.successRate) > 70
                          ? "text-green-600"
                          : "text-yellow-600"
                      }
                    >
                      {api.successRate}
                    </span>
                  </td>
                  <td className="p-4">
                    {api.available ? (
                      <span className="inline-flex items-center gap-1 text-green-600 text-sm">
                        <CheckCircle className="h-3 w-3" /> Available
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-600 text-sm">
                        <XCircle className="h-3 w-3" /> Rate Limited
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Refresh Button */}
        <div className="mt-6 text-center">
          <button
            onClick={fetchStatus}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Server className="h-4 w-4" />
            Refresh Status
          </button>
        </div>
      </div>
    </div>
  );
}
