import React from 'react';
import { Phone, MapPin } from 'lucide-react';
import contact from '../../../assets/contact/contact.png';
import { Button } from '@/components/ui/button';

const ContactPage: React.FC = () => {
  return (
    <section className="bg-secondary-100 py-16 text-gray-800">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">CONTACT US</h1>
        <div className="flex flex-col items-center justify-between md:flex-row">
          {/* Form Section */}
          <div className="w-full md:w-1/2 md:pr-8">
            <p className="mb-4 font-semibold text-gray-700">DROP A MESSAGE</p>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name*"
                className="w-full rounded border border-gray-300 bg-white p-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="email"
                placeholder="Email*"
                className="w-full rounded border border-gray-300 bg-white p-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="tel"
                placeholder="Phone*"
                className="w-full rounded border border-gray-300 bg-white p-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder="Subject*"
                className="w-full rounded border border-gray-300 bg-white p-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                placeholder="Message*"
                rows={4}
                className="w-full rounded border border-gray-300 bg-white p-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
              <Button type="submit" className="w-full bg-secondary-500 hover:bg-secondary-600">
                SUBMIT
              </Button>
            </form>
          </div>

          {/* Image and Contact Details */}
          <div className="mt-8 w-full md:mt-0 md:w-1/2">
            <img src={contact} alt="Contact" className="h-auto w-full" />
            <div className="mt-6 space-y-4 text-gray-700">
              <div className="flex items-center">
                <MapPin className="mr-2 text-secondary-600" />
                <p>123 Evergreen Rd, Roseville, CA 95673</p>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 text-secondary-600" />
                <p>+1 234 567 890</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
