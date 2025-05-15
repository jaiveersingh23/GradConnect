
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AlumniDirectory from '@/components/alumni/AlumniDirectory';

const Alumni = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 container">
        <h1 className="text-3xl font-bold mb-8">Alumni Directory</h1>
        <p className="text-gray-600 mb-8">Connect with former students who have graduated from our institution. You can search and filter alumni by name, program, branch or batch.</p>
        <AlumniDirectory />
      </main>
      <Footer />
    </div>
  );
};

export default Alumni;
