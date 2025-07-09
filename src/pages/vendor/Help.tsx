'use client';

import React, { useState } from 'react';
import { FiSearch, FiChevronRight, FiChevronDown } from 'react-icons/fi';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  isOpen?: boolean;
}

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      id: 1,
      question: 'How do I create an event?',
      answer: 'To create an event, navigate to the Events page and click on the "Create Event" button. Fill in the required details and submit the form.',
      isOpen: false
    },
    {
      id: 2,
      question: 'How do I manage ticket sales?',
      answer: 'You can manage your ticket sales through the Tickets section in your dashboard. Here you can view sales reports, issue refunds, and update ticket availability.',
      isOpen: false
    },
    {
      id: 3,
      question: 'What payment methods do you support?',
      answer: 'We support various payment methods including credit/debit cards, PayPal, and bank transfers. You can manage your payment settings in the Payment section of your account.',
      isOpen: false
    },
    {
      id: 4,
      question: 'How do I contact customer support?',
      answer: 'You can reach our customer support team 24/7 through the contact form at the bottom of this page or by emailing support@ivent.com.',
      isOpen: false
    }
  ]);

  const toggleFaq = (id: number) => {
    setFaqs(faqs.map(faq => 
      faq.id === id ? { ...faq, isOpen: !faq.isOpen } : faq
    ));
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Help Desk</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Find answers to common questions or get in touch with our support team.
      </p>

      {/* Search Bar */}
      <div className="relative mb-12">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="What do you need help with?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* FAQ Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Frequently asked questions</h2>
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <div 
              key={faq.id} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-6 py-4 text-left focus:outline-none"
                aria-expanded={faq.isOpen}
                aria-controls={`faq-${faq.id}`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                  <span className={`transform transition-transform duration-200 ${faq.isOpen ? 'rotate-180' : ''}`}>
                    <FiChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </span>
                </div>
              </button>
              
              <div 
                id={`faq-${faq.id}`}
                className={`px-6 pb-4 pt-0 transition-all duration-200 ease-in-out ${faq.isOpen ? 'block' : 'hidden'}`}
                aria-hidden={!faq.isOpen}
              >
                <p className="text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Didn't find answers to your questions?</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Our support team is here to help you with any questions or issues you might have.
        </p>
        <button className="bg-[#884cff] hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200">
          Contact Us
        </button>
      </div>
    </div>
  );
}
