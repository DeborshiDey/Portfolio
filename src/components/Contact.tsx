import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Download } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { siteConfig } from '@/lib/siteConfig';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Hiring',
    message: '',
    attachResume: false,
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      attachResume: e.target.checked,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;
    if (!serviceId || !templateId || !publicKey) {
      setStatus('Email service is not configured.');
      setSending(false);
      return;
    }
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          attach_resume: formData.attachResume ? 'Yes' : 'No',
          phone: siteConfig.phone,
          location: siteConfig.location,
          github: siteConfig.social.github,
          linkedin: siteConfig.social.linkedin,
        },
        { publicKey }
      );
      setStatus('Message sent successfully.');
      setFormData({ name: '', email: '', subject: 'Hiring', message: '', attachResume: false });
    } catch (err) {
      setStatus('Failed to send message.');
    } finally {
      setSending(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`
    },
    {
      icon: Phone,
      title: 'Phone',
      value: siteConfig.phone,
      href: `tel:${siteConfig.phone.replace(/[^+\d]/g, '')}`
    },
    {
      icon: MapPin,
      title: 'Location',
      value: siteConfig.location,
      href: `https://maps.google.com/?q=${encodeURIComponent(siteConfig.location)}`
    }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      href: siteConfig.social.github,
      icon: Github
    },
    {
      name: 'LinkedIn',
      href: siteConfig.social.linkedin,
      icon: Linkedin
    }
  ];

  return (
    <>
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <div className="w-24 h-1 bg-cyan-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to collaborate? Email me directly or use the contact form.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <a href={`mailto:${siteConfig.email}?subject=Hello%20Deborshi`} className="inline-flex items-center px-6 py-3 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-colors shadow-lg">Email Me Directly</a>
              <button onClick={() => navigator.clipboard.writeText(siteConfig.email)} className="inline-flex items-center px-6 py-3 bg-white text-cyan-600 font-semibold rounded-lg border border-cyan-600 hover:bg-cyan-50 transition-colors">Copy Email</button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{info.title}</h4>
                      <a
                        href={info.href}
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        {info.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Connect With Me</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                      aria-label={social.name}
                      title={social.name}
                    >
                      {social.name === 'GitHub' ? (
                        <Github className="h-6 w-6 text-[#181717]" />
                      ) : (
                        <Linkedin className="h-6 w-6 text-[#0A66C2]" />
                      )}
                    </a>
                  ))}
                </div>
              </div>

              {/* Resume download moved to Resume section to avoid duplication */}
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Me a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                  >
                    <option>Hiring</option>
                    <option>Consulting</option>
                    <option>Collaboration</option>
                    <option>Speaking</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell me about your project or how I can help you..."
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="attachResume"
                    name="attachResume"
                    checked={formData.attachResume}
                    onChange={handleCheckbox}
                    className="h-4 w-4 text-cyan-600 border-gray-300 rounded"
                  />
                  <label htmlFor="attachResume" className="ml-2 text-sm text-gray-700">
                    Attach résumé with inquiry
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 focus:ring-2 focus:ring-cyan-500 transition-colors shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="mr-2 h-5 w-5" />
                  {sending ? 'Sending...' : 'Send Message'}
                </button>
                {status && (
                  <div className="mt-3 text-sm text-gray-600">{status}</div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* About */}
            <div>
              <h3 className="text-xl font-bold mb-4">{siteConfig.name}</h3>
              <p className="text-gray-300 mb-4">
                Data Scientist passionate about transforming complex data into actionable insights through advanced analytics and machine learning.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    title={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#skills" className="hover:text-white transition-colors">Skills</a></li>
                <li><a href="#projects" className="hover:text-white transition-colors">Projects</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  {siteConfig.email}
                </li>
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  {siteConfig.phone}
                </li>
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {siteConfig.location}
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
            <p className="mt-2">
              Built with React, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;