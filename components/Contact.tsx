import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const validate = () => {
    if (!name.trim()) return 'Please enter your name.';
    if (!email.trim()) return 'Please enter your email.';
    // simple email check
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return 'Please enter a valid email address.';
    if (!message.trim()) return 'Please enter a message.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    setIsSending(true);
    try {
      // Replace this endpoint with your real contact API
      const resp = await axios.post('https://favebackend.onrender.com/api/contact', {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });

      toast.success(resp?.data?.message || 'Message sent — we will get back to you soon!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      console.error('Contact form error', err);
      toast.error(
        err?.response?.data?.message || 'Could not send your message. Please try again later.'
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto p-6 bg-gray-900/60 rounded-2xl border border-gray-700">
      <Toaster position="top-right" />
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-white">Contact Us</h2>
        <p className="mt-2 text-gray-400">Have a question or need help? Send us a message and we'll reply shortly.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-gray-300">
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Jane Doe"
            required
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium text-gray-300">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="How can we help you?"
            required
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSending}
            className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-medium shadow-md hover:scale-105 transition-transform duration-150 disabled:opacity-60 disabled:cursor-wait"
          >
            {isSending ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
            ) : null}
            {isSending ? 'Sending...' : 'Send message'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Contact;
