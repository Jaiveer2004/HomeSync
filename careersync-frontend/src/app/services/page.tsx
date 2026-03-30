"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getAllServices } from '@/services/apiService';
import { ServiceCard } from '@/components/services/ServiceCard';
import { ServiceCardSkeleton } from '@/components/services/ServiceCardSkeleton';
import { Navbar } from '@/components/shared/Navbar';
import { Search, SlidersHorizontal, MapPin, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Service {
  _id: string;
  name: string;
  category: string;
  price: number;
  duration?: number;
  providerCount?: number;
  reviewCount?: number;
  averageRating?: number;
  sampleProvider?: {
    name: string;
    rating: number;
  };
}

export default function ServicesPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    if (!authLoading && user?.role === 'partner') {
      router.push('/partner/services');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!authLoading && user?.role !== 'partner') {
      const fetchAllServices = async () => {
        try {
          const response = await getAllServices();
          setServices(response.data);
        } catch (error) {
          console.error("Failed to fetch services:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchAllServices();
    }
  }, [authLoading, user]);

  if (authLoading || (user?.role === 'partner')) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-700 mx-auto mb-4"></div>
          <div className="text-slate-900 font-medium">Validating credentials...</div>
        </div>
      </div>
    );
  }

  const categories = ['All', ...new Set(services.map(service => service.category))];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Premium Header Section */}
      <div className="bg-slate-900 pt-32 pb-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="inline-block py-1 px-3 rounded text-indigo-400 bg-indigo-900/40 text-xs font-bold tracking-widest uppercase mb-4 border border-indigo-800/50">
                Live Job Board
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif leading-tight">
                Find your next <span className="text-indigo-400 italic">breakthrough</span>
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed">
                Browse through high-quality technical roles from verified top-tier companies. Filter by stack, focus, and salary to match your exact career trajectory.
              </p>
            </div>
            
            {/* Quick Stats in Header */}
            <div className="flex gap-6 lg:pb-2">
              <div className="bg-slate-800/80 rounded-none p-4 border border-slate-700 min-w-[120px]">
                <div className="text-3xl font-serif font-bold text-white">{services.length}</div>
                <div className="text-slate-400 text-sm mt-1 uppercase tracking-wide text-xs">Open Roles</div>
              </div>
              <div className="bg-slate-800/80 rounded-none p-4 border border-slate-700 min-w-[120px]">
                <div className="text-3xl font-serif font-bold text-indigo-400">
                  {services.reduce((sum, service) => sum + (service.providerCount || 1), 0)}
                </div>
                <div className="text-slate-400 text-sm mt-1 uppercase tracking-wide text-xs">Hiring Teams</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Advanced Filter Bar */}
        <div className="bg-white p-4 shadow-sm border border-slate-200 rounded-none mb-10 -mt-20 relative z-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search job titles, keywords, or stacks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-none border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-colors"
              />
            </div>
            <div className="md:w-64 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Briefcase className="h-5 w-5 text-slate-400" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-none border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none font-medium cursor-pointer"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <SlidersHorizontal className="h-4 w-4 text-slate-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => <ServiceCardSkeleton key={i} />)
          ) : filteredServices.length > 0 ? (
            filteredServices.map(service => (
              <ServiceCard key={service._id} service={service} />
            ))
          ) : (
            <div className="md:col-span-2 lg:col-span-3 text-center py-20 bg-white border border-slate-200 border-dashed">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">No roles found</h3>
              <p className="text-slate-500 max-w-md mx-auto mb-6">
                We couldn't find any positions matching your specific criteria. Try adjusting your search or category filters.
              </p>
              {(searchTerm || selectedCategory !== 'All') && (
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="bg-indigo-700 hover:bg-slate-900 text-white rounded-none px-8"
                >
                  Clear all filters
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
