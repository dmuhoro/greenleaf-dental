'use client';

import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';

// 1. Tell Next.js 16 to skip static pre-rendering for this page
export const dynamic = 'force-dynamic';

export default function Home() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 2. Initialize Supabase SAFELY inside a function 
  // This prevents the "Invalid URL" crash during Vercel's build process.
  const getSupabase = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Fallback for build-time check only
    if (!url || !key || url === "undefined") {
      console.warn("Supabase credentials not found. Using dummy client for build.");
      return createClient('https://placeholder-url.supabase.co', 'placeholder-key');
    }

    return createClient(url, key);
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const supabase = getSupabase();
      const { error } = await supabase
        .from('bookings')
        .insert([{ email, status: 'pending', created_at: new Date() }]);

      if (error) throw error;
      setMessage('Booking request sent successfully!');
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Greenleaf Dental Clinic</h1>
      <p>Book your appointment today</p>
      
      <form onSubmit={handleBooking} style={{ marginTop: '2rem' }}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ marginLeft: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
        >
          {loading ? 'Processing...' : 'Book Now'}
        </button>
      </form>
      
      {message && <p style={{ marginTop: '1rem', color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
    </main>
  );
}