import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadProfile, updateAvatar, updatePersonalInfo, setUploading, changePassword, deleteAccount } from '../Store/slices/profileSlice';
import { uploadImageToCloudinary } from '../lib/cloudinary';

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, uploading } = useSelector((state) => state.profile || { user: { fullName: '', email: '', avatarUrl: '' }, uploading: false });

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user.fullName || '');
  const [email, setEmail] = useState(user.email || '');
  const [error, setError] = useState('');
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(loadProfile());
  }, [dispatch]);

  useEffect(() => {
    setFullName(user.fullName || '');
    setEmail(user.email || '');
  }, [user.fullName, user.email]);

  function onChoosePhoto() {
    if (fileInputRef.current) fileInputRef.current.click();
  }

  async function onFileChange(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB.');
      return;
    }

    try {
      dispatch(setUploading(true));
      setError('');
      
      const cloudinaryUrl = await uploadImageToCloudinary(file, 'classpilot-avatars');
      dispatch(updateAvatar({ avatarUrl: cloudinaryUrl }));
    } catch (error) {
      console.error('Upload error:', error);
      setError(error?.message || 'Failed to upload image. Please try again.');
    } finally {
      dispatch(setUploading(false));
    }
  }

  function onEditToggle() {
    setIsEditing(true);
    setError('');
  }

  function onCancelEdit() {
    setIsEditing(false);
    setFullName(user.fullName || '');
    setEmail(user.email || '');
    setError('');
  }

  function validate() {
    if (!fullName.trim()) {
      setError('Full name is required.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    setError('');
    return true;
  }

  function onSave() {
    if (!validate()) return;
    dispatch(updatePersonalInfo({ fullName: fullName.trim(), email: email.trim() }));
    setIsEditing(false);
  }

  function onTogglePassword() {
    setPasswordOpen((p) => !p);
    setPasswordError('');
    setPasswordSuccess('');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  }

  function validateNewPassword() {
    if (!newPassword || newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return false;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return false;
    }
    setPasswordError('');
    return true;
  }

  function onSubmitPassword() {
    if (!validateNewPassword()) return;
    try {
      dispatch(changePassword({ currentPassword, newPassword }));
      setPasswordSuccess('Password changed successfully.');
      setPasswordError('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordOpen(false);
    } catch (e) {
      setPasswordError(e?.message || 'Failed to change password.');
      setPasswordSuccess('');
    }
  }

  function onDeleteAccountClick() {
    setDeleteConfirmOpen(true);
    setDeleteConfirmText('');
  }

  function onCancelDelete() {
    setDeleteConfirmOpen(false);
    setDeleteConfirmText('');
  }

  function onConfirmDelete() {
    if (deleteConfirmText !== 'DELETE') return;
    dispatch(deleteAccount());
    navigate('/login');
  }
  return (
    <div className="flex-1 bg-gray-50 min-h-screen">

      {/* Main Content */}
      <div className="px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Profile Settings</h2>
          <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
        </div>
        

        {/* Content Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                    </svg>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{user.fullName || 'Your Name'}</h3>
                <p className="text-gray-600 mb-6">{user.email || 'your@email.com'}</p>
                <button 
                  onClick={onChoosePhoto} 
                  disabled={uploading}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
                      </svg>
                      <span>Change Photo</span>
                    </>
                  )}
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
                {error && (
                  <p className="text-sm text-red-600 mt-3">{error}</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
                {!isEditing ? (
                  <button onClick={onEditToggle} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button onClick={onSave} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Save</button>
                    <button onClick={onCancelEdit} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    {!isEditing ? (
                      <input
                        type="text"
                        value={fullName || ''}
                        readOnly
                        className="w-full pl-10 pr-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    ) : (
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter full name"
                      />
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                    </div>
                    {!isEditing ? (
                      <input
                        type="email"
                        value={email || ''}
                        readOnly
                        className="w-full pl-10 pr-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    ) : (
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter email address"
                      />
                    )}
                  </div>
                </div>
                {error && (
                  <p className="text-sm text-red-600">{error}</p>
                )}
              </div>
            </div>

            {/* Security Settings Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Security Settings</h3>
              
              <div className="space-y-6">
                {/* Password Section */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Password</h4>
                      <p className="text-sm text-gray-600">Change your account password</p>
                    </div>
                  </div>
                  <button onClick={onTogglePassword} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    {passwordOpen ? 'Close' : 'Change Password'}
                  </button>
                </div>

                {passwordOpen && (
                  <div className="mt-4 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter current password" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter new password" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Re-enter new password" />
                    </div>
                    {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
                    {passwordSuccess && <p className="text-sm text-green-600">{passwordSuccess}</p>}
                    <div className="flex items-center gap-2">
                      <button onClick={onSubmitPassword} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Save Password</button>
                      <button onClick={onTogglePassword} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
                    </div>
                  </div>
                )}

                {/* Two-Factor Authentication Section */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600">Add an extra layer of security</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>

            {/* Account Management Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Account Management</h3>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd"/>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Delete Account</h4>
                    <p className="text-sm text-red-600">Permanently delete your account and all associated data. This action cannot be undone.</p>
                  </div>
                </div>
                {!deleteConfirmOpen ? (
                  <button onClick={onDeleteAccountClick} className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium">
                    Delete Account
                  </button>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-700">Type <span className="font-semibold">DELETE</span> to confirm.</p>
                    <input value={deleteConfirmText} onChange={(e) => setDeleteConfirmText(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="DELETE" />
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={onConfirmDelete} disabled={deleteConfirmText !== 'DELETE'} className="px-6 py-3 bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg hover:bg-red-600 transition-colors font-medium">Confirm Delete</button>
                      <button onClick={onCancelDelete} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
