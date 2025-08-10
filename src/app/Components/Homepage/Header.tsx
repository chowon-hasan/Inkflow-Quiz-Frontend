"use client";
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLogout } from '@/app/Hooks/useLogout';
import { RootState } from '@/app/Redux_Store/store/store';

const Header = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const { logoutUser } = useLogout();

    return (
      <div>
        <header className="border-b border-neutral-700 p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-white">Inkflow Quiz</h1>
            </Link>
            <nav className="space-x-6 hidden sm:flex items-center">
              <Link href="/" className="hover:text-indigo-400 transition">
                Dashboard
              </Link>
              {user && (
                <>
                  <span className="text-white">{user.email}</span>
                  <button
                    onClick={logoutUser}
                    className="hover:text-indigo-400 transition"
                  >
                    Logout
                  </button>
                </>
              )}
            </nav>
          </div>
        </header>
      </div>
    );
};

export default Header;