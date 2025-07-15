'use client';

import type { User } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';
import { useActionState, useState } from 'react';
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
  const [isEditCv, setIsEditCv] = useState(false);
  const [basicProfileState, basicProfileAction] = useActionState(updateBasicProfile, initialState);
  const [passwordState, passwordAction] = useActionState(updateUserPassword, initialState);
  const [uploadCvState, uploadCvAction] = useActionState(uploadNewCv, initialState);
  const status = profile?.role;
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-4">
      {/* Form Informasi Profil */}
      <div className="p-6 bg-gray-800 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-4">{status} Information</h2>
        <form action={basicProfileAction} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-400">Name</label>
            <input type="text" id="fullName" name="fullName" defaultValue={profile.full_name || ''} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md p-2 ps-4 text-white"/>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-400">Phone Number</label>
            <input placeholder="Number (ex. 628123xxxxxxx)" type="number" id="phone" name="phone" defaultValue={profile.phone || ''} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md p-2 ps-4 text-white"/>
          </div>
          <div className={status === 'Personal' ? 'columns-2' : ''}>
            <div>
              {profile.linkedin_url ? (
                <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-[#0077B5] text-white rounded-md hover:bg-opacity-90 transition-opacity"
                >
                  <FaLinkedin size={20} />
                  <span>LinkedIn</span>
                </a>
              ): (
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-600 text-gray-400 rounded-md hover:border-white hover:text-white transition"
                >
                  <FaLinkedin size={20} />
                  <span>Add LinkedIn</span>
                </a>
              )}
            </div>
            <div>
            {status === 'Personal' ? profile.github_url ? (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                <FaGithub size={20} />
                <span>GitHub</span>
              </a>
            ) : (
              <a
                href="https://www.github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-600 text-gray-400 rounded-md hover:border-white hover:text-white transition"
              >
                <FaGithub size={20} />
                <span>Add GitHub</span>
              </a>
            ): ''}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <SubmitButton
              pendingText="Saving..."
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md disabled:bg-indigo-400"
            >
              Save Profile
            </SubmitButton>
            {basicProfileState.message && (
              <p className={basicProfileState.success ? 'text-green-400' : 'text-red-400'}>
                {basicProfileState.message}
              </p>
            )}
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
          <div className="flex items-center gap-4">
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