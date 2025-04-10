import React, { useState, useEffect } from 'react';
import {
  PlusCircle,
  Upload,
  X,
  Shield,
  Users,
  Star,
  Lock,
  AlertCircle,
  ArrowLeft,
  Trophy,
  Award,
  Tag,
  Mail,
  Briefcase,
  Twitter,
  MessageSquare
} from 'lucide-react';
import { useToast } from '@/app/components/toast/ToastProviderContext';
import FloatingLabelInput from '@/app/components/input/FloatingInput';
import FloatingLabelTextArea from '@/app/components/FloatingTextArea';
import FloatingSelectField from '../../components/FloatingSelectField';

const INPUT_BASE_CLASSES =
  'w-full bg-gray-900/50 px-4 py-2.5 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500';

// Updated initial state to match the exact fields from teams table
const FORM_INITIAL_STATE = {
  name: '',
  tag: '',        // Team short code/tag, max 10 chars
  description: '', // In teams table
  game_id: 2,     // Default to Valorant (ID 2)
  logo: null,     // File upload for logo
  banner: null,   // File upload for banner
  division: 'silver', // Default division
  tier: 'amateur', // From enum('amateur','semi-pro','professional')
  discord: '',    // Discord server link
  twitter: '',    // Twitter/X handle
  contact_email: '', // Team contact email
  // We don't need to collect captain info in the form as it will be set automatically
  captain: {
    name: '',
  }
};

// Options updated to reflect database values
const OPTIONS = {
  games: [
    { value: 1, label: 'Free Fire' },
    { value: 2, label: 'Valorant' },
    { value: 3, label: 'Fc Football' },
    { value: 4, label: 'Street Fighter' }
  ],
  divisions: [
    { value: 'iron', label: 'Iron' },
    { value: 'bronze', label: 'Bronze' },
    { value: 'silver', label: 'Silver' },
    { value: 'gold', label: 'Gold' },
    { value: 'platinum', label: 'Platinum' },
    { value: 'diamond', label: 'Diamond' },
    { value: 'master', label: 'Master' }
  ],
  tiers: [
    { value: 'amateur', label: 'Amateur' },
    { value: 'semi-pro', label: 'Semi-Professional' },
    { value: 'professional', label: 'Professional' }
  ]
};

const FormSection = ({ title, icon: Icon, children }) => (
  <div className="p-6 border-b border-white/5 text-primary">
    <h3 className="flex items-center text-lg font-semibold font-valorant mb-6">
      <Icon className="mr-2" size={20} />
      {title}
    </h3>
    {children}
  </div>
);

const ImageUpload = ({ preview, onImageChange, label, description, name }) => (
  <div className="relative group mb-4">
    <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
    <div className="w-full h-48 bg-dark border-2 border-dashed border-gray-700 rounded-xl overflow-hidden group-hover:border-primary/50 transition-colors">
      {preview ? (
        <img src={preview} alt={`${label} preview`} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
          <Upload size={32} className="mb-2" />
          <span className="text-sm">Drop your {label.toLowerCase()} here</span>
          <span className="text-xs text-gray-500 mt-1">{description}</span>
        </div>
      )}
    </div>
    <input
      type="file"
      name={name}
      accept="image/png,image/jpeg,image/gif"
      onChange={onImageChange}
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
    />
  </div>
);

const CreateTeamForm = ({ isOpen, onClose, currentUser, onFinish }) => {
  const [formData, setFormData] = useState({
    ...FORM_INITIAL_STATE,
    captain: { ...FORM_INITIAL_STATE.captain, name: currentUser?.username || '' },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        ...FORM_INITIAL_STATE,
        captain: { ...FORM_INITIAL_STATE.captain, name: currentUser?.username || '' },
      });
      setLogoPreview(null);
      setBannerPreview(null);
      setError(null);
    }
  }, [isOpen, currentUser]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
    
    return () => document.body.classList.remove('sidebar-open');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError('Image must be less than 2MB');
      return;
    }

    if (!file.type.match('image.*')) {
      setError('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'logo') {
        setLogoPreview(reader.result);
        setFormData((prev) => ({ ...prev, logo: reader.result }));
      } else if (type === 'banner') {
        setBannerPreview(reader.result);
        setFormData((prev) => ({ ...prev, banner: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      if (!formData.name.trim()) throw new Error('Team name is required');
      if (formData.name.length > 255) throw new Error('Team name must be less than 255 characters');
      if (formData.tag.length > 10) throw new Error('Team tag must be less than 10 characters');
      if (!formData.tag.trim()) throw new Error('Team tag is required');
      if (formData.logo && formData.logo.length * 0.75 > 2 * 1024 * 1024)
        throw new Error('Logo must be less than 2MB');
      if (formData.banner && formData.banner.length * 0.75 > 2 * 1024 * 1024)
        throw new Error('Banner must be less than 2MB');
      
      // Get the current user ID (owner who's creating the team)
      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error('User not authenticated');
  
      // Structure the data to match teams table
      const teamData = {
        name: formData.name.trim(),
        tag: formData.tag.trim(),
        owner_id: parseInt(userId), // Automatically set the owner_id to the current user ID
        captain_id: parseInt(userId), // Also set the captain_id to the same user
        game_id: formData.game_id,
        description: formData.description.trim(),
        logo: formData.logo,
        banner: formData.banner,
        division: formData.division,
        tier: formData.tier,
        discord: formData.discord,
        twitter: formData.twitter,
        contact_email: formData.contact_email
      };
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create_team.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamData),
      });
  
      const result = await response.json();
      if (!result.success) throw new Error(result.message || 'Failed to create team');
      
      // Also create initial team member entry for the owner/captain
      try {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/add_team_member.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            team_id: result.team_id,
            user_id: parseInt(userId),
            role: 'Captain',
            is_captain: 1
          }),
        });
      } catch (memberErr) {
        console.error('Warning: Could not add owner as team member:', memberErr);
        // Continue anyway since the team was created successfully
      }
  
      addToast({ type: 'success', message: 'Team created successfully!', duration: 5000 });
      onClose();
      onFinish?.();
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
      addToast({ type: 'error', message: err.message, duration: 5000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        body.sidebar-open {
          overflow: hidden;
        }
      `}</style>
      
      {/* Dark overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm mb-0 space-y-reverse z-[99999999] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sidebar container */}
      <div 
        className={`fixed top-0 right-0 bottom-0 z-[9999999999] mb-0 space-y-reverse w-full md:w-3/4 lg:w-3/4 xl:w-3/4 2xl:w-3/4 bg-secondary/90 backdrop-blur-xl border-l border-white/5 z-50 transform transition-transform duration-300 ease-in-out overflow-hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Content container with scroll */}
        <div className="h-full flex flex-col overflow-hidden z-[9999999999]">
          {/* Header with background image and strong left overlay */}
          <div className="sticky top-0 z-10 bg-secondary/90 backdrop-blur-xl">
            <div 
              className="px-6 py-2 bg-cover bg-center relative"
              style={{
                backgroundImage: "url('https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/26e8fff3ab3587144420aaa27b0e85167bb47336-1920x1080.jpg')",
              }}
            >
              {/* Strong left gradient overlay */}
              <div 
                className="absolute inset-0" 
                style={{
                  background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.5) 100%)',
                  mixBlendMode: 'multiply'
                }}
              ></div>
              
              {/* Close button in header */}
              <button 
                onClick={onClose}
                className="absolute top-3 right-3 bg-gray-800/60 hover:bg-gray-700/80 text-white p-2 rounded-full z-20 transition-all duration-200 hover:scale-105 shadow-lg backdrop-blur-sm border border-white/10"
                aria-label="Close sidebar"
              >
                <X size={20} />
              </button>
              
              <div className="flex items-center relative z-10">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <button 
                      onClick={onClose}
                      className="bg-primary/20 hover:bg-primary/30 p-2 rounded-md transition-all mr-3 group"
                    >
                      <ArrowLeft size={16} className="text-primary group-hover:translate-x-[-2px] transition-transform" />
                    </button>
                    <p className="text-xs font-valorant text-primary">Create your esports team</p>
                  </div>
                  <h2 className="text-4xl font-bold font-custom text-transparent bg-clip-text bg-white drop-shadow-lg tracking-widest animate-pulse">
                    Create Your Team
                  </h2>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scrollable form content */}
          <div className="flex-1 overflow-y-auto">
            <form onSubmit={handleSubmit} className="font-pilot">
              {error && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 m-6 rounded-lg">
                  <AlertCircle size={16} />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* Basic Information */}
              <FormSection title="Team Identity" icon={Shield}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <FloatingLabelInput
                    label="Team Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your team name"
                  />
                  <FloatingLabelInput
                    label="Team Tag (max 10 chars)"
                    type="text"
                    name="tag"
                    maxLength={10}
                    value={formData.tag}
                    onChange={(e) => setFormData((prev) => ({ ...prev, tag: e.target.value }))}
                    placeholder="Short team code (e.g. TSM, C9)"
                  />
                </div>
                <FloatingLabelTextArea
                  label="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Tell us about your team..."
                  name="description"
                />
              </FormSection>

              {/* Team Branding */}
              <FormSection title="Team Branding" icon={Upload}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ImageUpload 
                    preview={logoPreview} 
                    onImageChange={(e) => handleImageChange(e, 'logo')} 
                    label="Team Logo" 
                    description="PNG, JPG up to 2MB"
                    name="logo"
                  />
                  <ImageUpload 
                    preview={bannerPreview} 
                    onImageChange={(e) => handleImageChange(e, 'banner')} 
                    label="Team Banner" 
                    description="PNG, JPG up to 2MB (16:9 recommended)"
                    name="banner"
                  />
                </div>
              </FormSection>

              {/* Game Selection */}
              <FormSection title="Game Selection" icon={Trophy}>
                <div className="grid grid-cols-1 gap-6">
                  <FloatingSelectField
                    label="Game"
                    value={formData.game_id}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        game_id: parseInt(e.target.value),
                      }))
                    }
                    options={OPTIONS.games}
                    name="game_id"
                  />
                </div>
              </FormSection>

              {/* Team Competitive Settings */}
              <FormSection title="Team Performance Settings" icon={Award}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FloatingSelectField
                    label="Division"
                    value={formData.division}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        division: e.target.value,
                      }))
                    }
                    options={OPTIONS.divisions}
                    name="division"
                  />
                  <FloatingSelectField
                    label="Team Tier"
                    value={formData.tier}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        tier: e.target.value,
                      }))
                    }
                    options={OPTIONS.tiers}
                    name="tier"
                  />
                </div>
              </FormSection>

              {/* Team Contact Information */}
              <FormSection title="Team Contact Information" icon={MessageSquare}>
                <div className="grid grid-cols-1 gap-4">
                  <FloatingLabelInput
                    label="Discord Server"
                    type="text"
                    name="discord"
                    value={formData.discord}
                    onChange={(e) => setFormData((prev) => ({ ...prev, discord: e.target.value }))}
                    placeholder="Discord server invite link"
                    icon={MessageSquare}
                  />
                  <FloatingLabelInput
                    label="Twitter/X Handle"
                    type="text"
                    name="twitter"
                    value={formData.twitter}
                    onChange={(e) => setFormData((prev) => ({ ...prev, twitter: e.target.value }))}
                    placeholder="@yourteamhandle"
                    icon={Twitter}
                  />
                  <FloatingLabelInput
                    label="Contact Email"
                    type="email"
                    name="contact_email"
                    value={formData.contact_email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contact_email: e.target.value }))}
                    placeholder="team@example.com"
                    icon={Mail}
                  />
                </div>
              </FormSection>

          

              <div className="flex justify-end gap-3 m-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 focus:ring-2 focus:ring-purple-500 transition-all"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle size={18} />
                      <span>Create Team</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTeamForm;