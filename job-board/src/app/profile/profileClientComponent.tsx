'use client';

import type { User } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';
import { useActionState, useState, useEffect } from 'react';
import {
  updateBasicProfile,
  updateUserPassword,
  uploadNewCv,
  deleteCv,
  switchEdit,
} from './actions';
import { SubmitButton } from '@/components/submitButton'; 
import { FaLinkedin, FaGithub } from 'react-icons/fa'; 
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import toast from 'react-hot-toast';

type Profile = Database['public']['Tables']['profiles']['Row'];
type UserCv = Database['public']['Tables']['user_cvs']['Row'];


const initialState = {
  message: '',
  success: false,
};

export default function ProfileClientComponent({
  user,
  profile,
  savedCvs,
}: {
  user: User;
  profile: Profile;
  savedCvs: UserCv[];
}) {
  const [formData, setFormData] = useState({
    fullName: profile.full_name || '',
    phone: profile.phone || '',
    linkedin: profile.linkedin_url || '',
    github: profile.github_url || '',
  });
  const [isDirty, setIsDirty] = useState(false);
  const [basicProfileState, basicProfileAction] = useActionState(updateBasicProfile, initialState);
  const [isEditCv, setIsEditCv] = useState(false);
  const [passwordState, passwordAction] = useActionState(updateUserPassword, initialState);
  const [uploadCvState, uploadCvAction] = useActionState(uploadNewCv, initialState);
  const status = profile?.role; 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const hasChanged = formData.fullName !== (profile.full_name || '') ||
                       formData.phone !== (profile.phone || '') ||
                       formData.linkedin !== (profile.linkedin_url || '') ||
                       formData.github !== (profile.github_url || '');
    setIsDirty(hasChanged);
  }, [formData, profile]);

  useEffect(() => {
    if (basicProfileState.message) {
      if (basicProfileState.success) {
        toast.success(basicProfileState.message);
      } else {
        toast.error(basicProfileState.message);
      }
    }
  }, [basicProfileState]);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-4">
      {/* Form Informasi Profil */}
      <div className="p-6 bg-gray-800 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-4">{status} Information</h2>
        <form action={basicProfileAction} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-400">Name</label>
            <input type="text" id="fullName" name="fullName" defaultValue={profile.full_name || ''} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md p-2 ps-4 text-white"/>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-400">Phone Number</label>
            <input placeholder="Number (ex. 628123xxxxxxx)" type="tel" minLength={11} maxLength={13} id="phone" name="phone" defaultValue={profile.phone || ''} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md p-2 ps-4 text-white"/>
          </div>
          <div className={status === 'Personal' ? 'columns-2' : ''}>
            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-400">LinkedIn</label>
              {profile.linkedin_url ? (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#0077B5] text-white rounded-md hover:bg-opacity-90 transition-opacity"
                >
                  <FaLinkedin size={20} />
                  <span>LinkedIn</span>
                  <input type="hidden" name="linkedin" value={profile.linkedin_url} onChange={handleChange} />
                </a>
              ): (
                <a className="flex items-center text-gray-400">
                  <FaLinkedin size={20} className="absolute ms-2"/> 
                  <input placeholder="LinkedIn URL" type="text" id="linkedin" name="linkedin" defaultValue={profile?.linkedin_url || ''} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md p-2 ps-9 text-white"/>
                </a>
              )}
            </div>
            <div>
            {status === 'Personal' && (<label htmlFor="github" className="block text-sm font-medium text-gray-400">GitHub</label>)}
            {status === 'Personal' ? profile?.github_url ? (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                <FaGithub size={20} />
                <span>GitHub</span>
                <input type="hidden" name="github" value={profile.github_url} onChange={handleChange} />
              </a>
            ) : (
              <a className="flex items-center text-gray-400">
                <FaGithub size={20} className="absolute ms-2"/> 
                <input placeholder="GitHub URL" type="text" id="github" name="github" defaultValue={profile?.github_url || ''} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md p-2 ps-9 text-white" />
              </a>
            ) : ''}
            </div>
          </div>
          <div className="flex items-center justify-end gap-4">
            <SubmitButton
              pendingText="Saving..."
              disabled={!isDirty}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Save Profile
            </SubmitButton>
          </div>
        </form>
      </div>

      {/* Form Ganti Password */}
      <div className="p-6 bg-gray-800 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-4">Change Password</h2>
        <form action={passwordAction} className="space-y-4">
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-400">New Password</label>
            <input type="password" id="newPassword" name="newPassword" required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white"/>
          </div>
          <div className="flex items-center gap-4 justify-end">
            <SubmitButton
              pendingText="Updating..."
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md disabled:bg-indigo-400"
            >
              Update Password
            </SubmitButton>
            {passwordState.message && (
              <p className={passwordState.success ? 'text-green-400' : 'text-red-400'}>
                {passwordState.message}
              </p>
            )}
          </div>
        </form>
      </div>

      {/* Kelola CV */}
      {status === 'Personal' && (
      <div className="p-6 bg-gray-800 rounded-lg">
        <div className='columns-2'>
          <h2 className="text-xl font-bold text-white mb-4">Manage Saved CVs ({savedCvs.length}/2)</h2>
          <div className='flex flex-row items-center justify-end rounded-lg p-3 shadow-sm"'>
            <Switch
              id="edit-cv-mode"
              checked={isEditCv}
              onCheckedChange={setIsEditCv}
              className="cursor-pointer border border-white bg-white me-2"
            />
            <Label htmlFor="edit-cv-mode" className="text-white">Edit Mode</Label>
          </div>
        </div>
        <div className="space-y-3">
          {savedCvs.map((cv) => (
            <div key={cv.id} className="...">
              <span className="text-white truncate">{cv.cv_name || cv.file_path}</span>
              {isEditCv && (
                <form action={deleteCv}>
                  <input type="hidden" name="cvPath" value={cv.file_path} />
                  <SubmitButton 
                    pendingText="..."
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md disabled:bg-red-400"
                    >
                    Delete
                  </SubmitButton>
                </form>
              )}
            </div>
          ))}
        </div>
        {savedCvs.length < 2 && isEditCv && (
          <form action={uploadCvAction} className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-2">Upload New CV</h3>
            <input type="file" name="cvFile" required accept=".pdf" className="bg-gray-600 w-60 cursor-pointer rounded-md px-4 py-2"/>
            <div className="flex items-center gap-4 mt-4">
              <SubmitButton
                pendingText="Uploading..."
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md disabled:bg-gray-500"
              >
                Upload & Save
              </SubmitButton>
              {uploadCvState.message && (
                <p className={uploadCvState.success ? 'text-green-400' : 'text-red-400'}>
                  {uploadCvState.message}
                </p>
              )}
            </div>
          </form>
        )}
      </div>)}
    </div>
  );
}