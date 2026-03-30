"use client";

import Link from "next/link";

interface QuickAction {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: 'indigo' | 'slate' | 'emerald' | 'slateDark';
}

interface QuickActionsProps {
  userRole: string;
}

export function QuickActions({ userRole }: QuickActionsProps) {
  const customerActions: QuickAction[] = [
    {
      title: "Find a Role",
      description: "Apply for top software engineering jobs",
      icon: "🔍",
      href: "/services",
      color: "indigo"
    },
    {
      title: "My Applications",
      description: "Track application status",
      icon: "📅",
      href: "/my-bookings",
      color: "slate"
    },
    {
      title: "Profile Settings",
      description: "Manage account & resume",
      icon: "⚙️",
      href: "/profile",
      color: "slateDark"
    }
  ];

  const partnerActions: QuickAction[] = [
    {
      title: "Post a Job",
      description: "Recruit brand new tech talent",
      icon: "➕",
      href: "/partner/services/create",
      color: "indigo"
    },
    {
      title: "Manage Postings",
      description: "Monitor active job listings",
      icon: "📋",
      href: "/partner/services",
      color: "slate"
    },
    {
      title: "Profile Settings",
      description: "Manage company account",
      icon: "⚙️",
      href: "/profile",
      color: "slateDark"
    }
  ];

  const actions = userRole === 'partner' ? partnerActions : customerActions;

  const colorClasses = {
    indigo: 'bg-indigo-50 border-indigo-200 hover:border-indigo-500 hover:bg-indigo-100',
    slate: 'bg-slate-50 border-slate-200 hover:border-slate-400 hover:bg-slate-100',
    emerald: 'bg-emerald-50 border-emerald-200 hover:border-emerald-500 hover:bg-emerald-100',
    slateDark: 'bg-slate-800 border-slate-700 hover:border-indigo-500 hover:bg-slate-900 text-white'
  };

  const textClasses = {
    indigo: 'text-indigo-900',
    slate: 'text-slate-900',
    emerald: 'text-emerald-900',
    slateDark: 'text-white'
  };

  const descClasses = {
    indigo: 'text-indigo-700',
    slate: 'text-slate-600',
    emerald: 'text-emerald-700',
    slateDark: 'text-slate-400'
  };

  return (
    <div className="bg-white rounded-none p-6 border border-slate-200 shadow-sm">
      <h3 className="text-xl font-bold font-serif text-slate-900 mb-6">Quick Actions</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action) => (
          <Link key={action.title} href={action.href}>
            <div className={`border rounded-none p-6 transition-all duration-300 hover:-translate-y-1 block h-full cursor-pointer ${colorClasses[action.color]}`}>
              <div className="text-3xl mb-4">{action.icon}</div>
              <h4 className={`font-bold mb-2 ${textClasses[action.color]}`}>{action.title}</h4>
              <p className={`text-sm ${descClasses[action.color]}`}>{action.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
