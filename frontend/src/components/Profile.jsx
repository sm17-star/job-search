import React, { useState } from 'react';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';

import { useSelector } from 'react-redux';
import EditProfileDialog from './EditProfileDialog';

import { Avatar, AvatarImage } from './ui/avatar';
import Applied from './Applied';
import useGetAppliedJobs from '../hooks/useGetAppliedJobs';
import Navbar from './common/Navbar';

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);

  return (
    <div>
      <Navbar />

      <div className='max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl my-5 p-8 shadow-lg'>
        {/* Profile Header */}
        <div className='flex justify-between'>
          <div className='flex items-center gap-4'>
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className='font-bold text-2xl text-slate-900'>{user?.fullname || "NA"}</h1> 
              <p className="text-slate-600">{user?.profile?.intro || "No intro provided"}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-indigo-600 hover:bg-indigo-50" variant="ghost">
            <Pen />
          </Button>
        </div>

        {/* Contact Info */}
        <div className='my-6 border-t border-slate-200 pt-6'> 
          <div className='flex items-center gap-3 my-2 text-slate-700'> 
            <Mail />
            <span>{user?.email || "NA"}</span>
          </div>
          <div className='flex items-center gap-3 my-2 text-slate-700'>
            <Contact />
            <span>{user?.phone || "NA"}</span>
          </div>
        </div>

        {/* Skills */}
        <div className='my-6'> 
          <h1 className='font-bold text-xl text-slate-900 mb-3'>Skills</h1>
          <div className='flex flex-wrap items-center gap-2'>
            {user?.profile?.skills?.length
              ? user.profile.skills.map((skill, idx) => <Badge key={idx} className="bg-indigo-50 text-indigo-600 font-medium">{skill}</Badge>)
              : <span className="text-slate-500">No skills listed</span>}
          </div>
        </div>

        {/* Resume */}
        <div className='grid w-full max-w-sm items-center gap-1.5 my-6'>
          <Label className="text-xl font-bold text-slate-900 mb-3">Resume</Label>
          {user?.profile?.resume
            ? (
              <a
                target='_blank'
                href={user.profile.resume}
                className='text-indigo-600 w-full hover:underline cursor-pointer'
                rel="noopener noreferrer"
              >
                {user.profile.resumeName || "Resume"}
              </a>
            )
            : <span className="text-slate-500">No resume uploaded</span>
          }
        </div>
      </div>

      {/* Applied Jobs */}
      <div className='max-w-4xl mx-auto bg-white rounded-2xl my-5 p-8 shadow-lg border border-slate-200'> 
        <h1 className='font-bold text-2xl text-slate-900 mb-6'>Applied Jobs</h1> 
        <Applied />
      </div>

      {/* Edit Profile Dialog */}
      <EditProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;