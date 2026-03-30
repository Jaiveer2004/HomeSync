"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { PartnerStatusToggle } from "@/components/partner/PartnerStatusToggle";
import { getDashboardStats } from "@/services/apiService";
import { Button } from "@/components/ui/button";
import Skeleton from "react-loading-skeleton";

interface DashboardStats {
  // Customer stats
  totalBookings?: number;
  pendingBookings?: number;
  completedBookings?: number;
  totalSpent?: number;
  
  // Partner stats
  totalServices?: number;
  activeServices?: number;
  totalEarnings?: number;
  totalReviews?: number;
  averageRating?: number;
  isOnline?: boolean;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Mock activity data for now - would normally come from backend
  const recentActivity = [
    {
      id: '1',
      type: 'booking' as const,
      title: 'Senior Frontend Engineer Application',
      description: 'Your application has been received and is under review.',
      time: '2 hours ago',
      icon: '🚀',
      status: 'pending' as const
    },
    {
      id: '2',
      type: 'review' as const,
      title: 'Company Profile Updated',
      description: 'You successfully updated your recruitment bio.',
      time: '1 day ago',
      icon: '🏢',
      status: 'completed' as const
    }
  ];

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <WelcomeBanner stats={stats || undefined} />

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-none p-6 border border-slate-200">
                  <Skeleton count={2} />
                  <Skeleton className="mt-4" height={32} width={80} />
                </div>
              ))
            ) : stats ? (
              user?.role === 'customer' ? (
                // Candidate stats
                <>
                  <StatsCard
                    title="Active Applications"
                    value={stats.totalBookings || 0}
                    icon="📋"
                    description="Total submitted apps"
                    color="blue"
                  />
                  <StatsCard
                    title="In Review"
                    value={stats.pendingBookings || 0}
                    icon="⏳"
                    description="Awaiting feedback"
                    color="orange"
                  />
                  <StatsCard
                    title="Offers Received"
                    value={stats.completedBookings || 0}
                    icon="✅"
                    description="Successful placements"
                    color="green"
                  />
                  <StatsCard
                    title="Target Salary Expected"
                    value={formatCurrency(stats.totalSpent || 120000)}
                    icon="💰"
                    description="Average job board value"
                    color="purple"
                  />
                </>
              ) : (
                // Company / Partner stats
                <>
                  <StatsCard
                    title="Total Job Postings"
                    value={stats.totalServices || 0}
                    icon="📋"
                    description={`${stats.activeServices || 0} active roles`}
                    color="blue"
                  />
                  <StatsCard
                    title="Total Applicants"
                    value={stats.totalBookings || 0}
                    icon="👥"
                    description={`${stats.completedBookings || 0} screened`}
                    color="green"
                  />
                  <StatsCard
                    title="Total Hiring Budget"
                    value={formatCurrency(stats.totalEarnings || 500000)}
                    icon="💰"
                    description="Allocated compensation"
                    color="purple"
                  />
                  <StatsCard
                    title="Response Rating"
                    value={stats.averageRating ? `${stats.averageRating.toFixed(1)} ⭐` : 'No ratings'}
                    icon="⭐"
                    description="Candidate feedback"
                    color="orange"
                  />
                </>
              )
            ) : null}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <ActivityFeed activities={recentActivity} />
            </div>
            <div className="space-y-8">
              {user?.role === 'partner' && (
                <div className="bg-white rounded-none p-6 border border-slate-200">
                  <h3 className="text-xl font-bold font-serif text-slate-900 mb-6">Recruitment Status</h3>
                  <PartnerStatusToggle />
                  <p className="text-sm text-slate-500 mt-4 leading-relaxed">
                    Toggle your status to online so candidates know you are actively hiring and conducting interviews.
                  </p>
                </div>
              )}
              <QuickActions userRole={user?.role || 'customer'} />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
