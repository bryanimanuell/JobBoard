'use client';

import { useState, useEffect, useActionState } from 'react';
import type { User } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import toast from 'react-hot-toast';

import { submitApplication } from './action';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SubmitButton } from '@/components/submitButton';

type Job = Database['public']['Tables']['jobs']['Row'];
type Company = Database['public']['Tables']['companies']['Row'];
type UserCv = Database['public']['Tables']['user_cvs']['Row'];

const initialState = { message: '', success: false };

export default function ApplyForm({ job, company, savedCvs }: { job: Job; company: Company; savedCvs: UserCv[] }) {
  const [cvSource, setCvSource] = useState('saved');
  const [state, formAction] = useActionState(submitApplication, initialState);
  
  useEffect(() => {
    if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="jobId" value={job.id} />
      <input type="hidden" name="companyId" value={company.id} />

      <div className="space-y-2">
        <Label>Your CV</Label>
        <RadioGroup defaultValue="saved" onValueChange={setCvSource} className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="saved" id="r-saved" required disabled={savedCvs.length === 0} />
            <Label htmlFor="r-saved">Use a saved CV</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem required value="new" id="r-new"/>
            <Label htmlFor="r-new">Upload CV</Label>
          </div>
        </RadioGroup>
      </div>
      
      {cvSource === 'saved' ? (
        <div className="space-y-2">
          <input type="hidden" name="cvSource" value="saved" />
          <Label htmlFor="savedCvPath">Select a CV</Label>
          <Select name="savedCvPath" required>
            <SelectTrigger>
              <SelectValue placeholder="Select one of your saved CVs..." />
            </SelectTrigger>
            <SelectContent className='bg-gray-800'>
              {savedCvs.map(cv => (
                <SelectItem className='hover:bg-blue-400' key={cv.id} value={cv.file_path}>{cv.cv_name || cv.file_path}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        <div className="space-y-2">
          <input type="hidden" name="cvSource" value="new" />
          <Label htmlFor="newCvFile">New CV File (PDF)</Label>
          <Input className='cursor-pointer' id="newCvFile" name="newCvFile" type="file" required accept=".pdf" />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="experience">Total Years of Professional Experience</Label>
        <Input maxLength={2} id="experience" name="experience" type="int" required placeholder="e.g., 5" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="relativesInfo">Do you have any relatives employed here? If so, provide their name and relationship.</Label>
        <Textarea id="relativesInfo" name="relativesInfo" placeholder="e.g., John Doe - Cousin" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverLetter">Cover Letter</Label>
        <Textarea id="coverLetter" name="coverLetter" rows={8} placeholder="Tell us why you're a great fit for this role..." />
      </div>

      <div className="pt-4">
        <SubmitButton
          pendingText="Submitting..."
          className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md disabled:bg-indigo-400"
        >
          Submit Application
        </SubmitButton>
      </div>
    </form>
  );
}