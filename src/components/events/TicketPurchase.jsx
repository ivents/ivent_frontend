'use client';

import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FaTicketAlt, FaUser, FaEnvelope, FaPhone, FaTag } from 'react-icons/fa';

// Sample ticket types data
const ticketTypes = [
  {
    id: 'general',
    name: 'General Admission',
    price: 5000,
    description: 'Standard event access',
    available: 200,
    minPerOrder: 1,
    maxPerOrder: 10,
  },
  {
    id: 'vip',
    name: 'VIP Access',
    price: 15000,
    description: 'VIP seating and exclusive lounge access',
    available: 50,
    minPerOrder: 1,
    maxPerOrder: 5,
  },
  {
    id: 'early-bird',
    name: 'Early Bird',
    price: 3000,
    description: 'Limited time offer',
    available: 30,
    minPerOrder: 1,
    maxPerOrder: 2,
  },
];

const TicketPurchase = ({ eventId, eventName }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  // Initialize selected tickets with 0 quantity
  useEffect(() => {
    const initialTickets = {};
    ticketTypes.forEach((ticket) => {
      initialTickets[ticket.id] = 0;
    });
    setSelectedTickets(initialTickets);
  }, []);

  // Calculate total amount when selected tickets change
  useEffect(() => {
    let total = 0;
    Object.entries(selectedTickets).forEach(([ticketId, quantity]) => {
      if (quantity > 0) {
        const ticket = ticketTypes.find((t) => t.id === ticketId);
        if (ticket) {
          total += ticket.price * quantity;
        }
      }
    });
    setTotalAmount(total);
  }, [selectedTickets]);

  // Handle ticket quantity changes
  const handleTicketQuantityChange = (ticketId, newQuantity) => {
    const ticket = ticketTypes.find((t) => t.id === ticketId);
    if (!ticket) return;

    // Validate against min/max per order
    newQuantity = Math.max(ticket.minPerOrder, Math.min(ticket.maxPerOrder, newQuantity));
    
    setSelectedTickets({
      ...selectedTickets,
      [ticketId]: newQuantity,
    });
  };

  // Form validation schema
  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    promoCode: Yup.string(),
  });

  // Form submission
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      promoCode: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      // Check if at least one ticket is selected
      const hasTickets = Object.values(selectedTickets).some(qty => qty > 0);
      if (!hasTickets) {
        toast.error('Please select at least one ticket');
        return;
      }

      setIsProcessing(true);
      
      try {
        // In a real app, you would call your backend to create a payment intent
        // and get a payment reference from Paystack
        const paymentData = {
          email: values.email,
          amount: totalAmount * 100, // Paystack uses kobo (multiply by 100)
          metadata: {
            fullName: values.fullName,
            phone: values.phone,
            eventId,
            eventName,
            tickets: Object.entries(selectedTickets)
              .filter(([_, qty]) => qty > 0)
              .map(([ticketId, quantity]) => ({
                ticketId,
                quantity,
                type: ticketTypes.find(t => t.id === ticketId)?.name || ticketId,
                price: ticketTypes.find(t => t.id === ticketId)?.price || 0,
              })),
            promoCode: values.promoCode || null,
          },
        };

        // Initialize Paystack payment
        const paystackHandler = window.PaystackPop.setup({
          key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY, // Make sure to set this in your .env
          ...paymentData,
          callback: function(response) {
            // Handle successful payment
            toast.success('Payment successful! Your tickets have been booked.');
            // Here you would typically redirect to a success page or show a success message
            console.log('Payment successful:', response);
          },
          onClose: function() {
            // Handle when user closes the payment modal
            toast.info('Payment window was closed');
          },
        });
        
        paystackHandler.openIframe();
      } catch (error) {
        console.error('Payment error:', error);
        toast.error('An error occurred while processing your payment. Please try again.');
      } finally {
        setIsProcessing(false);
      }
    },
  });

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Get Your Tickets
      </h2>
      
      {/* Ticket Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Select Tickets
        </h3>
        <div className="space-y-4">
          {ticketTypes.map((ticket) => (
            <div 
              key={ticket.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow dark:border-gray-700"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{ticket.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {ticket.description}
                  </p>
                  <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mt-2">
                    {formatCurrency(ticket.price)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {ticket.available} tickets left
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => 
                      handleTicketQuantityChange(
                        ticket.id, 
                        Math.max(0, (selectedTickets[ticket.id] || 0) - 1)
                      )
                    }
                    disabled={(selectedTickets[ticket.id] || 0) <= 0}
                    className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-gray-200"
                  >
                    -
                  </button>
                  <span className="mx-3 w-8 text-center">
                    {selectedTickets[ticket.id] || 0}
                  </span>
                  <button
                    onClick={() => 
                      handleTicketQuantityChange(
                        ticket.id, 
                        Math.min(ticket.available, (selectedTickets[ticket.id] || 0) + 1)
                      )
                    }
                    disabled={(selectedTickets[ticket.id] || 0) >= ticket.available}
                    className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg dark:bg-gray-700">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
          Order Summary
        </h3>
        <div className="space-y-2">
          {ticketTypes.map((ticket) => {
            const quantity = selectedTickets[ticket.id] || 0;
            if (quantity === 0) return null;
            
            return (
              <div key={ticket.id} className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  {quantity} × {ticket.name}
                </span>
                <span className="font-medium">
                  {formatCurrency(ticket.price * quantity)}
                </span>
              </div>
            );
          })}
          <div className="border-t border-gray-200 my-2 dark:border-gray-600"></div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{formatCurrency(totalAmount)}</span>
          </div>
        </div>
      </div>

      {/* Customer Information Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Your Information
        </h3>
        
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="fullName"
              name="fullName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="John Doe"
            />
          </div>
          {formik.touched.fullName && formik.errors.fullName ? (
            <p className="mt-1 text-sm text-red-600">{formik.errors.fullName}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="you@example.com"
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaPhone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="phone"
              name="phone"
              type="tel"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="+234 800 000 0000"
            />
          </div>
          {formik.touched.phone && formik.errors.phone ? (
            <p className="mt-1 text-sm text-red-600">{formik.errors.phone}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="promoCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Promo Code (Optional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaTag className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="promoCode"
              name="promoCode"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.promoCode}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter promo code"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isProcessing || totalAmount === 0}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : `Pay ${formatCurrency(totalAmount)}`}
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Secure payment powered by{' '}
            <span className="font-medium">Paystack</span>
          </p>
          <div className="mt-2 flex justify-center space-x-4">
            <img 
              src="https://assets.paystack.com/assets/website/gh-payment-methods.png" 
              alt="Payment Methods" 
              className="h-6"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default TicketPurchase;
