'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

// Force dynamic rendering to prevent build errors
export const dynamic = 'force-dynamic'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Home() {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    service: 'General Checkup',
    preferred_date: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const { error } = await supabase
        .from('leads')
        .insert([
          {
            full_name: formData.full_name,
            phone: formData.phone,
            email: formData.email,
            service: formData.service,
            preferred_date: formData.preferred_date
          }
        ])

      if (error) throw error

      setMessage('✅ Appointment request submitted! We\'ll contact you within 2 hours.')
      setFormData({
        full_name: '',
        phone: '',
        email: '',
        service: 'General Checkup',
        preferred_date: ''
      })
    } catch (error) {
      console.error('Error:', error)
      setMessage('❌ Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-4xl mr-2">🦷🌿</div>
            <div>
              <div className="text-2xl font-bold text-teal-700">Green Leaf Dental Clinic</div>
              <div className="text-xs text-teal-600 italic">For a beautiful healthy smile</div>
            </div>
          </div>
          <button
            onClick={scrollToBooking}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
          >
            Book Now
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to Green Leaf Dental Clinic
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              For a beautiful healthy smile. Quality dental care in Eldoret - from routine checkups to braces.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToBooking}
                className="bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-teal-700 transition-colors shadow-lg"
              >
                Book Appointment
              </button>
              <a
                href="tel:+254722538113"
                className="bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg border-2 border-teal-600"
              >
                Call Us: 0722 538 113
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Our Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Braces & Orthodontics',
                description: 'Transform your smile with modern orthodontic solutions. Expert braces installation and monitoring.',
                icon: '🦷'
              },
              {
                title: 'General Dentistry',
                description: 'Comprehensive dental care including checkups, fillings, and preventive treatments.',
                icon: '✨'
              },
              {
                title: 'Teeth Cleaning',
                description: 'Professional cleaning to keep your teeth healthy and your smile bright.',
                icon: '🪥'
              },
              {
                title: 'Root Canal',
                description: 'Expert root canal treatment to save your natural teeth and eliminate pain.',
                icon: '🏥'
              },
              {
                title: 'Teeth Whitening',
                description: 'Professional whitening treatments for a brighter, more confident smile.',
                icon: '💎'
              },
              {
                title: 'Emergency Care',
                description: 'Fast, professional care when you need it most. We handle dental emergencies promptly.',
                icon: '🚨'
              }
            ].map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Meet Dr. Mugo
          </h2>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Dr. Mugo brings years of experience and expertise in dental care to the Eldoret community. 
              Specializing in orthodontics and general dentistry, Dr. Mugo is committed to providing 
              exceptional care with a gentle, patient-centered approach.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Whether you need routine care or advanced orthodontic treatment, Dr. Mugo and the team 
              at Green Leaf Dental Clinic are here to help you achieve and maintain your best smile.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Book Your Appointment
              </h2>
              <p className="text-gray-600">
                Fill out the form below and we'll contact you within 2 hours
              </p>
            </div>

            {message && (
              <div className={`mb-6 p-4 rounded-lg ${
                message.includes('✅') 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+254 712 345 678"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Needed *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option>General Checkup</option>
                  <option>Teeth Cleaning</option>
                  <option>Filling</option>
                  <option>Root Canal</option>
                  <option>Teeth Whitening</option>
                  <option>Braces Consultation</option>
                  <option>Emergency Care</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="preferred_date"
                  value={formData.preferred_date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-teal-600 text-white py-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Book Appointment'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact/Footer Section */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p className="text-gray-300 mb-2">📞 Phone: 0722 538 113</p>
              <p className="text-gray-300 mb-2">📧 Email: info@greenleafdentalclinic.com</p>
              <p className="text-gray-300">📍 Eldoret, Kenya</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Office Hours</h3>
              <p className="text-gray-300 mb-2">Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p className="text-gray-300 mb-2">Saturday: 9:00 AM - 2:00 PM</p>
              <p className="text-gray-300">Sunday: Closed</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <Link href="/dashboard" className="block text-gray-300 hover:text-white mb-2">
                Admin Dashboard
              </Link>
              <button onClick={scrollToBooking} className="block text-gray-300 hover:text-white">
                Book Appointment
              </button>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Green Leaf Dental Clinic. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}