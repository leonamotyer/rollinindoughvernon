'use client';
import React from 'react';

const ContactPage = () => {
    return (
        <div className="container mx-auto px-4 py-8 mt-24 mb-16">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
                
                <p className="text-center mb-8">
                    We'd love to hear from you! Please fill out the form below or reach out to us directly.
                </p>
                
                <form className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block font-medium">Name:</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            placeholder="Your Name" 
                            required 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc3296] focus:border-[#fc3296]"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label htmlFor="email" className="block font-medium">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Your Email" 
                            required 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc3296] focus:border-[#fc3296]"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label htmlFor="message" className="block font-medium">Message:</label>
                        <textarea 
                            id="message" 
                            name="message" 
                            placeholder="Your Message" 
                            rows={5} 
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc3296] focus:border-[#fc3296]"
                        ></textarea>
                    </div>
                    
                    <button 
                        type="submit" 
                        className="w-full py-3 px-6 bg-[#fc3296] text-white font-medium rounded-lg shadow-md hover:bg-[#e02882] transition-colors duration-300 transform hover:-translate-y-1"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;