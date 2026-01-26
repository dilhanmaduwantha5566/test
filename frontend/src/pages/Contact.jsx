import React from "react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-8 flex flex-col items-center">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Contact Us</h2>
      <p className="text-gray-700 text-center max-w-2xl mb-8">
        Have questions or want to join Supreme Fitness? Reach out to us and we’ll get back to you as soon as possible.
      </p>

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full max-w-4xl">
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-green-600 mb-2">Email</h3>
          <p className="text-gray-600">contact@supremefitness.com</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-green-600 mb-2">Phone</h3>
          <p className="text-gray-600">+94 77 123 4567</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-green-600 mb-2">Address</h3>
          <p className="text-gray-600">Ambalangoda Road, Kurundugahahetekma, Elpitiya, Sri Lanka</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Send Us a Message</h3>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition font-medium"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
