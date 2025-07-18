'use client';

import { useEffect } from 'react';
import { useActionState } from 'react';
import { updateCompanyProfile } from './action';
import type { Database } from '@/types/supabase';
import toast from 'react-hot-toast';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '@/components/submitButton';

type Company = Database['public']['Tables']['companies']['Row'];

const initialState = {
  message: '',
  success: false,
};

export default function CompanyProfileForm({ company }: { company: Company }) {
  const [state, formAction] = useActionState(updateCompanyProfile, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name">Company Name</label>
        <input id="name" name="name" defaultValue={company.name} required className='mt-1 block w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white'/>
      </div>

      <div className="space-y-2">
        <label htmlFor="company_description">Company Description</label>
        <textarea
          id="company_description"
          name="company_description"
          defaultValue={company.company_description || ''}
          rows={5}
          className='mt-1 block w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white'
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="company_fields">Company Fields</label>
          <input
            id="company_fields"
            name="company_fields"
            defaultValue={company.company_fields || ''}
            placeholder="e.g., IT, Finance, Marketing"
            className='mt-1 block w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white'
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="total_employees">Number of Employees</label>
          <select name="total_employees" defaultValue={company.total_employees || ''} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white">
            <option value="1-50">1 - 50</option>
            <option value="51-100">51 - 100</option>
            <option value="101-500">101 - 500</option>
            <option value="501-1000">501 - 1000</option>
            <option value="1001-5000">1001 - 5000</option>
            <option value="5000+">5000+</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="website_url">Website URL</label>
        <input
          id="website_url"
          name="website_url"
          type="url"
          defaultValue={company.website_url || ''}
          placeholder="https://example.com"
          className='mt-1 block w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white'
        />
      </div>

      <div className="flex justify-end pt-4">
        <SubmitButton
          pendingText="Saving..."
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md disabled:bg-indigo-400"
        >
          Save Changes
        </SubmitButton>
      </div>
    </form>
  );
}