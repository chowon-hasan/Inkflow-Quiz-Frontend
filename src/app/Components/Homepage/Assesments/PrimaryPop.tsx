"use client";

import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/app/Redux_Store/store/store';
import { useAuthVerify } from '@/app/Hooks/useAuthVerify';
import LevelCards from './LevelCards';

const PrimaryPop = () => {
    const { userData, verifyAuth } = useAuthVerify();
    const [isOpen, setIsOpen] = useState(false);
    const user = useAppSelector((state) => state.auth.user);
      const [userCurrentLevel, setUserCurrentLevel] = useState<string>("");


      useEffect(() => {
        verifyAuth();
        setUserCurrentLevel(userData?.level || "");
    return () => {
      void verifyAuth();
    }
        // eslint-disable-next-line
      }, []);

    const openPopup = () => {
        if (user?.token) {
            setIsOpen(true);
        } else {
            // Or trigger the login modal directly if you have a function for it
            alert("Please log in to start the assessment.");
        }
    };
    const closePopup = () => setIsOpen(false);

    return (
      <div>
        <button
          onClick={openPopup}
          className="bg-white/70 hover:bg-white text-black px-6 py-3 rounded-lg text-lg font-medium shadow-md transition"
        >
          Start Assessment
        </button>

        <div className="sr-only">{userCurrentLevel}</div>

        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
            <div className="bg-white dark:bg-neutral-900 p-10 rounded-3xl shadow-2xl max-w-7xl w-full">
              <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white mb-6 text-center">
                Your Assessment Levels
              </h2>
              <LevelCards />
              <p className="text-neutral-500 dark:text-neutral-400 mt-8 text-center">
                You are about to begin the assessment. Please ensure you have a
                stable internet connection.
              </p>
              <div className="flex justify-center mt-6">
                <button
                  onClick={closePopup}
                  className="px-6 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-white rounded-xl font-medium shadow hover:bg-neutral-300 dark:hover:bg-neutral-800 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
};

export default PrimaryPop;