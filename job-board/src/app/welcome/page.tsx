'use client';

import { completeProfile } from './action';
import { useState } from 'react';

export default function WelcomePage() {
  const [selectedRole, setSelectedRole] = useState('');
  return (
    <div className="max-w-lg mx-auto p-8 my-20 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-2 text-white">
        One Last Step!
      </h1>
      <p className="text-lg text-gray-400 text-center mb-10">
        Complete your profile to continue.
      </p>

      <form action={completeProfile} className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            required
            className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm p-2 text-white focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., Budi Doremi"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-300">
            I am a...
          </label>
          <select
            name="role"
            required
            className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm p-2 text-white focus:ring-indigo-500 focus:border-indigo-500"
            defaultValue=""
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="" disabled>Select your role</option>
            <option value="Personal">Job Seeker (I want to apply)</option>
            <option value="Company">Company (I want to post jobs)</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          > 
            {selectedRole === 'Company' ? 'Continue to Fill Company Details' : 'Save and Continue'}
          </button>
        </div>
      </form>
    </div>
  );
}