'use client';
import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#fc3296] text-white py-4 md:py-6 w-full">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Main container - stacked vertically with equal spacing */}
                <div className="flex flex-col items-center justify-center space-y-4">
                    {/* Links stacked vertically */}
                    <Link href="/about" className="text-sm md:text-base text-center hover:text-[#e88b22]  transition-colors">
                        About Us
                    </Link>
                    <Link href="/contact" className="text-sm md:text-base text-center hover:text-[#e88b22]  transition-colors">
                        Contact us
                    </Link>
                    
                    {/* Copyright text */}
                    <p className="text-sm md:text-base text-center">
                        © 2025 Rollin' in Dough. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;