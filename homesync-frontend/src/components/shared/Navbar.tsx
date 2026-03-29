// Enhanced navigation bar with modern design and animations

"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/92 backdrop-blur-md shadow-sm border-b border-slate-200' 
        : 'bg-white/70 backdrop-blur-sm'
    }`}>
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link 
          href='/' 
          className="text-2xl font-bold text-slate-900 hover:text-[color:var(--brand-700)] transition-colors duration-200 flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-[color:var(--brand-700)] to-[color:var(--brand-600)] rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          HomeSync
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className={`w-5 h-0.5 bg-slate-700 transition-all duration-300 ${
            isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
          }`} />
          <div className={`w-5 h-0.5 bg-slate-700 transition-all duration-300 ${
            isMobileMenuOpen ? 'opacity-0' : ''
          }`} />
          <div className={`w-5 h-0.5 bg-slate-700 transition-all duration-300 ${
            isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
          }`} />
        </button>
      </nav>
    </header>
  );
}