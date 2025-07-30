'use client';

import { useEffect } from 'react';
import { useActionState } from 'react';
import { updateJob } from './action';
import type { Database } from '@/types/database';
import toast from 'react-hot-toast';

import { SubmitButton } from '@/components/submitButton';

type Job = Database['public']['Tables']['jobs']['Row'];

const initialState = { message: '', success: false };

export default function EditJobForm({ job }: { job: Job }) {
  const [state, formAction] = useActionState(updateJob.bind(null, job.id), initialState);

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
                <label htmlFor="title">Job Title</label>
                <input id="title" name="title" defaultValue={job.title || ''} required className='mt-1 block w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white'/>
            </div>
            <div className="space-y-2">
                <label htmlFor="address">Address</label>
                <input id="address" name="address" defaultValue={job.address || ''} className='mt-1 block w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white'/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="city">City</label>
                    <input id="city" name="city" defaultValue={job.city || ''} className='mt-1 block w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white'/>
                </div>
                <div className="space-y-2">
                    <label htmlFor="salary">Salary (optional)</label>
                    <input id="salary" name="salary" type="number" defaultValue={job.salary || ''} className='mt-1 block w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white'/>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="job_type">Job Type</label>
                    <select name="job_type" defaultValue={job.job_type || ''} className="mt-1 pb-3 block w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white">
                        <option className='focus:bg-gray-100/10' value="Full-time">Full-time</option>
                        <option className='focus:bg-gray-100/10' value="Part-time">Part-time</option>
                        <option className='focus:bg-gray-100/10' value="Freelance">Freelance</option>
                        <option className='focus:bg-gray-100/10' value="Internship">Internship</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label htmlFor="experience_level">Experience Level</label>
                    <select name="experience_level" defaultValue={job.experience_level || ''} className="mt-1 pb-3 block w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white">
                        <option className='focus:bg-gray-100/10' value="Fresh Graduate">Fresh Graduate</option>
                        <option className='focus:bg-gray-100/10' value="1-3 Years">1-3 Years</option>
                        <option className='focus:bg-gray-100/10' value="3+ Years">3+ Years</option>
                        <option className='focus:bg-gray-100/10' value="5+ Years">5+ Years</option>               
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="responsibilities">Responsibilities</label>
                <textarea id="responsibilities" name="responsibilities" defaultValue={job.responsibilities || ''} rows={5} className='mt-1 block w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white'/>
                <p className="text-xs text-gray-400">Write each point on a new line to create a bulleted list.</p>
            </div>

            <div className="space-y-2">
                <label htmlFor="qualifications">Qualifications</label>
                <textarea id="qualifications" name="qualifications" defaultValue={job.qualifications || ''} rows={5} className='mt-1 block w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white'/>
                <p className="text-xs text-gray-400">Write each point on a new line to create a bulleted list.</p>
            </div>

            <div className="pt-4">
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