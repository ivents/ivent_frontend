import React, { useState, useEffect } from 'react';
import {
  Person as User,
  Email as Mail,
  Phone as PhoneIcon,
  Business as Building,
  LocationOn as MapPinIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Close as XIcon,
  Event as CalendarIcon,
  Language as GlobeIcon,
  Star as StarIcon
} from '@mui/icons-material';

// Sample data - replace with actual API calls
const fetchVendorProfile = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 'vendor123',
        firstName: 'John',
        lastName: 'Smith',
        username: 'johnsmith_events',
        pronouns: 'He/Him',
        bio: 'Professional event management company specializing in corporate events, weddings, and private parties.',
        password: '••••••••',
        address: '123 Event Street, San Francisco, CA 94103',
        dateOfBirth: '1985-05-15',
        country: 'Nigeria',
        language: 'English',
        email: 'john@eventmasters.com',
        phone: '+234 80 234 5678',
        facebook: 'john.smithevents',
        instagram: 'john_smithevents',
        twitter: 'johnsmith_events',
        linkedin: 'john-smith-events',
        youtube: 'johnsmith_events',
        tiktok: 'john_smithevents',
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        rating: 4.8,
        totalEvents: 47,
        memberSince: '2020-05-15',
      });
    }, 500);
  });
};

const VendorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchVendorProfile();
        setProfile(data);
        setFormData(data);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProfile(formData);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const InputField = ({ label, field, type = 'text', placeholder = '', required = false }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {isEditing ? (
        type === 'textarea' ? (
          <textarea
            value={formData[field] || ''}
            onChange={(e) => handleInputChange(field, e.target.value)}
            placeholder={placeholder}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
        ) : type === 'date' ? (
          <input
            type="date"
            value={formData[field] || ''}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        ) : (
          <input
            type={type}
            value={formData[field] || ''}
            onChange={(e) => handleInputChange(field, e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        )
      ) : (
        <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300">
          {field === 'password' ? '••••••••' : (profile[field] || 'Not provided')}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-black min-h-screen">
      {/* Header with Profile Picture */}
      <div className="text-center mb-8">
        <div className="relative inline-block">
          <img
            src={profile.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          />
          {isEditing && (
            <button className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-700">
              <EditIcon fontSize="small" />
            </button>
          )}
        </div>
      </div>

      {/* Basic Info Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Basic Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="First Name" field="firstName" required />
          <InputField label="Last Name" field="lastName" required />
          <InputField label="Username" field="username" />
          <InputField label="Pronouns (Optional)" field="pronouns" placeholder="She/Her" />
          <div className="md:col-span-2">
            <InputField 
              label="Bio" 
              field="bio" 
              type="textarea" 
              placeholder="Provide a brief description about yourself or your organization" 
            />
          </div>
          <InputField label="Password" field="password" type="password" />
          <div></div> {/* Empty div for spacing */}
          <InputField 
            label="Address" 
            field="address" 
            placeholder="No. 1 Lagos Island" 
          />
          <div></div> {/* Empty div for spacing */}
          <InputField label="Date of Birth" field="dateOfBirth" type="date" />
          <div></div> {/* Empty div for spacing */}
          <InputField label="Country" field="country" placeholder="Nigeria" />
          <InputField label="Language" field="language" placeholder="English" />
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Contact Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Email" field="email" type="email" placeholder="name@email.com" />
          <InputField label="Phone number" field="phone" type="tel" placeholder="+234 80 234 5678" />
          <InputField label="Facebook" field="facebook" placeholder="john.smithevents" />
          <InputField label="Instagram" field="instagram" placeholder="john_smithevents" />
          <InputField label="Twitter" field="twitter" placeholder="john_smithevents" />
          <InputField label="LinkedIn" field="linkedin" placeholder="john-smith-events" />
          <InputField label="Youtube" field="youtube" placeholder="john_smithevents" />
          <InputField label="Tiktok" field="tiktok" placeholder="john_smithevents" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 pt-6 border-t border-gray-200">
        {isEditing ? (
          <>
            <button
              onClick={handleCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Save
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
          >
            <EditIcon fontSize="small" />
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      {/* Stats Section (Optional - can be hidden if not needed) */}
      {!isEditing && (
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Business Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{profile.totalEvents}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Events</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{profile.rating}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Average Rating</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {new Date(profile.memberSince).getFullYear()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Member Since</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorProfile;