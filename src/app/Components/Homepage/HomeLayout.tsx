
import React from 'react';
import Header from './Header';
import PrimaryPop from './Assesments/PrimaryPop';


const HomeLayout = () => {
    return (
      <div className="bg-neutral-800 min-h-screen text-gray-100 flex flex-col">
<Header />

        {/* Hero Section */}
        <section className="flex-grow flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Assess Your Digital Competency
          </h2>
          <p className="text-gray-300 max-w-2xl mb-8">
            Take our secure, 3-step assessment and earn your certification.
            Built for accuracy, security, and trust.
          </p>
          <PrimaryPop />
        </section>


        {/* Footer */}
        <footer className="border-t border-neutral-700 p-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Test_School – All Rights Reserved
        </footer>
      </div>
    );
};

export default HomeLayout;