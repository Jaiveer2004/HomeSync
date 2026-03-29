"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/shared/Navbar";
import { Loader } from "@/components/shared/Loader";
import { PageTransition } from "@/components/shared/PageTransition";
import { useState } from "react";

interface Service {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  duration: number;
  partner: {
    user: {
      fullName: string;
      profilePicture: string;
    };
    bio: string;
    averageRating: number;
  };
  reviewCount: number;
  averageRating: number;
}

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);

  const handleLoadingComplete = () => {
    setShowLoader(false);
  };

  // Show loader while initial loading
  if (showLoader) {
    return <Loader onLoadingComplete={handleLoadingComplete} />;
  }

  const serviceCategories = [
    {
      id: 1,
      title: "Cleaning & Pest Control",
      icon: "CP",
      services: ["Home Cleaning", "Bathroom Cleaning", "Kitchen Cleaning", "Pest Control"]
    },
    {
      id: 2,
      title: "Appliance Repair",
      icon: "AR",
      services: ["AC Service", "Washing Machine", "TV Repair", "Refrigerator"]
    },
    {
      id: 3,
      title: "Home Repair & Installation",
      icon: "RI",
      services: ["Plumber", "Electrician", "Carpenter", "Painter"]
    },
    {
      id: 4,
      title: "Beauty & Wellness",
      icon: "BW",
      services: ["Salon for Women", "Spa Services", "Men's Grooming", "Massage"]
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-transparent text-slate-900">
      <Navbar />
      
      {/* Hero Section with Search */}
      <section className="relative overflow-hidden pt-28 pb-14 px-4">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(41,72,126,0.15),transparent_38%),radial-gradient(circle_at_85%_15%,rgba(17,94,89,0.12),transparent_32%)]" />
        <div className="container mx-auto text-center">
          <p className="text-sm md:text-base tracking-[0.14em] uppercase text-slate-600 mb-5">
            Reliable household professionals
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold text-slate-900 mb-5 leading-tight">
            Premium home services,
            <span className="text-[color:var(--brand-700)] block">
              scheduled in minutes
            </span>
          </h1>
          <p className="text-lg text-slate-600 mb-9 max-w-2xl mx-auto">
            From emergency repairs to recurring maintenance, HomeSync connects you with verified experts and transparent pricing.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-11">
            <Button className="h-11 px-7">Book a Service</Button>
            <Button variant="outline" className="h-11 px-7">Explore Categories</Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center max-w-3xl mx-auto">
            <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur px-6 py-5 shadow-sm">
              <div className="text-3xl font-semibold text-[color:var(--brand-700)]">4.8</div>
              <div className="text-slate-600">Average Service Rating</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur px-6 py-5 shadow-sm">
              <div className="text-3xl font-semibold text-[color:var(--brand-700)]">50K+</div>
              <div className="text-slate-600">Satisfied Customers</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur px-6 py-5 shadow-sm">
              <div className="text-3xl font-semibold text-[color:var(--brand-700)]">1,200+</div>
              <div className="text-slate-600">Verified Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-slate-900 mb-3 text-center">Choose a Service Category</h2>
          <p className="text-slate-600 text-center mb-10 max-w-2xl mx-auto">
            Find curated services designed for homes, apartments, and offices with vetted professionals.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {serviceCategories.map((category) => (
              <Link key={category.id} href="/services" className="group">
                <div className="rounded-2xl p-6 text-center transition-all duration-300 border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1">
                  <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-slate-100 text-slate-700 text-sm font-semibold tracking-wide flex items-center justify-center">
                    {category.icon}
                  </div>
                  <h3 className="text-slate-900 font-semibold mb-2 group-hover:text-[color:var(--brand-700)] transition-colors">
                    {category.title}
                  </h3>
                  <div className="text-sm text-slate-600">
                    {category.services.slice(0, 2).join(", ")}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-10 border-t border-slate-200 bg-white/80 backdrop-blur py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[color:var(--brand-700)] to-[color:var(--brand-600)] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">H</span>
                </div>
                <span className="text-xl font-bold text-slate-900">HomeSync</span>
              </div>
              <p className="text-slate-600 mb-4">
                Your trusted platform for professional home services. Quality guaranteed.
              </p>
            </div>
            
            <div>
              <h3 className="text-slate-900 font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-600">
                <li><Link href="/about" className="hover:text-slate-900 transition-colors">About us</Link></li>
                <li><Link href="/careers" className="hover:text-slate-900 transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-slate-900 transition-colors">Contact us</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-slate-900 font-semibold mb-4">For Customers</h3>
              <ul className="space-y-2 text-slate-600">
                <li><Link href="/services" className="hover:text-slate-900 transition-colors">All Services</Link></li>
                <li><Link href="/reviews" className="hover:text-slate-900 transition-colors">Reviews</Link></li>
                <li><Link href="/help" className="hover:text-slate-900 transition-colors">Help Center</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-slate-900 font-semibold mb-4">For Partners</h3>
              <ul className="space-y-2 text-slate-600">
                <li><Link href="/partner/onboard" className="hover:text-slate-900 transition-colors">Join as Partner</Link></li>
                <li><Link href="/partner/support" className="hover:text-slate-900 transition-colors">Partner Support</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-200 mt-8 pt-8 text-center text-slate-600">
            <p>&copy; 2026 HomeSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    </PageTransition>
  );
}
