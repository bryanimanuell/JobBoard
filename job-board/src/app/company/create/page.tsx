'use client';

import { useActionState } from 'react';
import { createCompanyProfile } from './action';
import { SubmitButton } from '@/components/submitButton';

const initialState = {
  message: '',
  success: false,
};

export default function CreateCompanyPage() {
  const [state, formAction] = useActionState(createCompanyProfile, initialState);

  return (
    <div className="max-w-2xl mx-auto p-8 my-10 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2 text-white">Company Details</h1>
      <p className="text-gray-400 mb-6">
        Please provide your company&apos;s information to get started.
      </p>

      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-300">Company Name</label>
          <input type="text" name="companyName" id="companyName" required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white" />
        </div>
        <div>
          <label htmlFor="companyDescription" className="block text-sm font-medium text-gray-300">Company Description</label>
          <textarea name="companyDescription" id="companyDescription" rows={4} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white"></textarea>
        </div>
        <div>
          <label htmlFor="companyFields" className="block text-sm font-medium text-gray-300">Company Fields</label>
          <input type="text" name="companyFields" id="companyFields" placeholder="e.g., IT, Finance, Marketing" required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white" />
        </div>
        <div>
          <label htmlFor="totalEmployees" className="block text-sm font-medium text-gray-300">Number of Employees</label>
          <select name="totalEmployees" id="totalEmployees" required defaultValue="" className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white">
            <option value="" disabled>Select a range</option>
            <option value="1-50">1 - 50</option>
            <option value="51-100">51 - 100</option>
            <option value="101-500">101 - 500</option>
            <option value="501-1000">501 - 1000</option>
            <option value="1001-5000">1001 - 5000</option>
            <option value="5000+">5000+</option>
          </select>
        </div>
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-300">Company Website (optional)</label>
          <input type="text" name="website" id="website" className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white" />
        </div>
        
        <div className="flex items-center gap-4 pt-4">
          <SubmitButton
            pendingText="Saving..."
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md disabled:bg-indigo-400"
          >
            Save Company Details
          </SubmitButton>
          {state.message && (
            <p className={state.success ? 'text-green-400' : 'text-red-400'}>
              {state.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}