'use client'
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { postJobAction } from './action';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SubmitButton } from '@/components/submitButton';
import { MultiSelect, OptionType } from '@/components/ui/multiSelect';

type Company = { id: string; name: string; is_verified: boolean | null; };

export default function PostJobPage() {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [experienceLevels, setExperienceLevels] = useState<string[]>([]);
  const experienceOptions: OptionType[] = [
    { value: 'Fresh Graduate', label: 'Fresh Graduate' },
    { value: '1-3 Years', label: '1-3 Years' },
    { value: '3+ Years', label: '3+ Years' },
    { value: '5+ Years', label: '5+ Years' },
  ];
  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const { data: company } = await supabase
        .from('companies')
        .select('id, name, is_verified')
        .eq('owned_by', user.id)
        .single();
      
      if (!company) {
        router.push('/company/create');
        return;
      }
      if (!company.is_verified) {
        router.push('/?error=unverified_company');
        return;
      }
      setCompany(company);
      setLoading(false);
    };
    fetchData();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-8 my-10 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-white">Post a New Job</h1>
      <form action={postJobAction} className="space-y-6">
        <input type="hidden" name="experience_level" value={experienceLevels.join(', ')} />
        <div className="space-y-2">
          <Label htmlFor="company_name">Company Name</Label>
          <Input value={company?.name} disabled type="text" id="company_name" name="company_name"/>
        </div>
        
        {/* Job Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Job Title</Label>
          <Input type="text" name="title" id="title" required />
        </div>
        
        {/* Job Type & Experience Level (Side-by-side) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="job_type">Job Type</Label>
            <Select name="job_type" required>
              <SelectTrigger className='w-full'><SelectValue placeholder="Select a type" /></SelectTrigger>
              <SelectContent className='bg-black'>
                <SelectItem className='focus:bg-gray-100/10' value="Full-time">Full-time</SelectItem>
                <SelectItem className='focus:bg-gray-100/10' value="Part-time">Part-time</SelectItem>
                <SelectItem className='focus:bg-gray-100/10' value="Freelance">Freelance</SelectItem>
                <SelectItem className='focus:bg-gray-100/10' value="Internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="experience_level">Experience Level</Label>
            <MultiSelect
              options={experienceOptions}
              selected={experienceLevels}
              onChange={setExperienceLevels}
              maxSelections={2}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input type="text" name="address" id="address" required placeholder="e.g., Jakarta, Indonesia"/>
        </div>
        {/* Location & Salary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input type="text" name="city" id="city" required placeholder="e.g., Jakarta, Indonesia"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="salary">Salary (optional)</Label>
            <Input type="number" name="salary" id="salary" placeholder="e.g., 10000000" />
          </div>
        </div>

        {/* Responsibilities */}
        <div className="space-y-2">
            <Label htmlFor="responsibilities">Responsibilities</Label>
            <Textarea name="responsibilities" id="responsibilities" rows={6} required />
            <p className="text-xs text-gray-400">Write each point on a new line to create a bulleted list.</p>
        </div>

        {/* Qualifications */}
        <div className="space-y-2">
            <Label htmlFor="qualifications">Qualifications</Label>
            <Textarea name="qualifications" id="qualifications" rows={6} required />
            <p className="text-xs text-gray-400">Write each point on a new line to create a bulleted list.</p>
        </div>
        
        <div className="pt-4">
          <SubmitButton 
            pendingText="Posting..." 
            className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md disabled:bg-indigo-400"
          >
            Post Job
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}