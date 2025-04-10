import React, { useState, useEffect } from 'react';
import {
  X,
  UserPlus,
  Settings,
  Users,
  Trophy,
  Star,
  Search,
  Check,
  Trash,
  Save,
  Shield,
  AlertTriangle,
  Loader2,
  Award,
  BarChart2,
  Users2,
  Target,
  Clock,
  Medal,
  ChevronRight,
  Calendar,
  MessageCircle,
  Bell,
  ArrowRight,
} from 'lucide-react';
import { useToast } from '@/app/components/toast/ToastProviderContext';
import FloatingLabelTextArea from '@/app/components/FloatingTextArea';
import FloatingLabelInput from '@/app/components/input/FloatingInput';
import FloatingSelectField from '../../components/FloatingSelectField';

// Enhanced StatCard with animations and better visual effects
const StatCard = ({ icon: Icon, value, label, trend, gradient }) => (
  <div
    className={`${gradient} relative overflow-hidden group angular-cut p-6 transition-all duration-300 hover:scale-105 shadow-lg`}
  >
    <div className="relative flex flex-col items-center">
      <div className="p-4 bg-white/10 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-500 shadow-inner">
        <Icon className="text-white" size={28} />
      </div>
      <span className="text-3xl font-bold text-white transition-all duration-300 group-hover:text-4xl">{value}</span>
      <span className="text-sm font-valorant text-gray-300 mt-1">{label}</span>
      {trend !== undefined && (
        <span
          className={`absolute top-4 right-4 text-sm font-medium ${
            trend >= 0 ? 'text-green-400' : 'text-red-400'
          } backdrop-blur-sm px-2 py-1 rounded-full bg-white/5`}
        >
          {trend > 0 && '+'}
          {trend}%
        </span>
      )}
    </div>
    {/* Decorative elements */}
    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
    <div className="absolute -top-6 -left-6 w-16 h-16 bg-white/5 rounded-full blur-xl"></div>
  </div>
);

// Enhanced default avatar with better styling
const defaultAvatarSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1F2937;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#111827;stop-opacity:1" />
    </linearGradient>
  </defs>
  <circle cx="64" cy="64" r="64" fill="url(#grad)"/>
  <path d="M108 128C108 103.699 88.3005 84 64 84C39.6995 84 20 103.699 20 128" fill="#374151"/>
  <circle cx="64" cy="50" r="24" fill="#4B5563"/>
</svg>
`;

// Enhanced MemberCard with better visual hierarchy and micro-interactions
const MemberCard = ({ member, isOwner }) => {
  return (
    <div className="group relative bg-secondary/40 hover:bg-secondary/60 backdrop-blur-sm p-3 sm:p-4 transition-all duration-300 rounded-xl border border-gray-700/30 hover:border-primary/30 shadow-md hover:shadow-xl hover:shadow-primary/5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Avatar with glow effect */}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 overflow-hidden rounded-xl ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300 flex-shrink-0">
          <img
            src={member.avatar ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${member.avatar}` : `data:image/svg+xml,${encodeURIComponent(defaultAvatarSvg)}`}
            alt={member.name}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          />
          {isOwner && (
            <div className="absolute bottom-0 left-0 right-0 bg-yellow-500/80 text-xs font-bold text-center py-0.5 text-yellow-900">
              OWNER
            </div>
          )}
        </div>

        {/* Member Info with better typography */}
        <div className="flex-1 min-w-0">
          <div className="font-valorant text-base sm:text-lg text-white truncate group-hover:text-primary transition-colors duration-300">
            {member.name}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-gray-700/50 group-hover:bg-gray-700/70 text-xs sm:text-sm font-medium text-gray-300 rounded-lg transition-colors duration-300">
              {member.role}
            </span>
            <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-primary/10 group-hover:bg-primary/20 text-xs sm:text-sm font-medium text-primary rounded-lg transition-colors duration-300">
              {member.rank}
            </span>
            {isOwner && (
              <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-yellow-500/10 group-hover:bg-yellow-500/20 text-xs sm:text-sm font-medium text-yellow-400 rounded-lg transition-colors duration-300">
                <Crown size={12} className="mr-1" />
                Team Owner
              </span>
            )}
          </div>
        </div>
        
        {/* Action button */}
        <button className="hidden group-hover:flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 hover:bg-primary/40 text-primary transition-all duration-300 absolute top-3 right-3">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

// Added Crown icon component
const Crown = ({ size = 24, className = "" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M2 17l10-10 10 10-2 4H4l-2-4z"/>
      <path d="M12 7V4"/>
    </svg>
  );
};

// Enhanced RequestCard component to improve the requests section
const RequestCard = ({ request, handleRequestAction, actionLoading, defaultAvatarSvg }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div
      className="bg-secondary/40 hover:bg-secondary/60 backdrop-blur-sm p-4 md:p-5 rounded-xl border border-gray-700/30 hover:border-primary/30 transition-all duration-300 shadow-md hover:shadow-xl"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Avatar with improved styling */}
          <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0 rounded-xl overflow-hidden ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-300">
            <img
              src={
                request.avatar
                  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${request.avatar}`
                  : `data:image/svg+xml,${encodeURIComponent(defaultAvatarSvg)}`
              }
              alt={request.name}
              className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* User Info with improved typography */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <h4 className="text-base md:text-lg font-semibold text-white hover:text-primary transition-colors duration-300">
                {request.name}
              </h4>
              <span className="px-2 md:px-3 py-1 bg-primary/10 text-xs font-medium text-primary/90 rounded-full border border-primary/20 animate-pulse">
                New Request
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="inline-flex items-center px-2 md:px-3 py-1 md:py-1.5 bg-gray-700/50 hover:bg-gray-700/70 text-xs font-medium text-gray-300 rounded-lg transition-colors duration-300">
                <Trophy size={12} className="mr-1" />
                {request.rank || 'Unranked'}
              </span>
              <span className="inline-flex items-center px-2 md:px-3 py-1 md:py-1.5 bg-gray-700/50 hover:bg-gray-700/70 text-xs font-medium text-gray-300 rounded-lg transition-colors duration-300">
                <Shield size={12} className="mr-1" />
                {request.region || 'Region Unknown'}
              </span>
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center px-2 md:px-3 py-1 md:py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-xs font-medium text-blue-400 rounded-lg transition-colors duration-300"
              >
                <MessageCircle size={12} className="mr-1" />
                {isExpanded ? 'Hide Message' : 'View Message'}
              </button>
            </div>

            {/* Expandable message section */}
            {isExpanded && (
              <div className="mt-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 text-gray-300 text-sm">
                {request.message || "No message provided."}
              </div>
            )}
          </div>

          {/* Action Buttons with animation */}
          <div className="flex gap-2 md:gap-3 w-full sm:w-auto mt-3 sm:mt-0">
            <button
              onClick={() => handleRequestAction(request.id, 'reject')}
              disabled={actionLoading}
              className="flex-1 sm:flex-initial px-3 md:px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {actionLoading ? <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" /> : <X className="w-4 h-4 md:w-5 md:h-5" />}
              <span className="text-sm md:text-base">Decline</span>
            </button>
            <button
              onClick={() => handleRequestAction(request.id, 'accept')}
              disabled={actionLoading}
              className="flex-1 sm:flex-initial px-3 md:px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/20"
            >
              {actionLoading ? <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" /> : <Check className="w-4 h-4 md:w-5 md:h-5" />}
              <span className="text-sm md:text-base">Accept</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamSidebar = ({ isOpen, onClose, team, onTeamUpdate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teamStats, setTeamStats] = useState(null);
  const [members, setMembers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [teamSettings, setTeamSettings] = useState(null);
  const [requestsLoading, setRequestsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [settingsForm, setSettingsForm] = useState({
    name: '',
    description: '',
    privacy_level: 'Public',
    team_game: 'Valorant',
    division: 'any',
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { addToast } = useToast();
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [sidebarAnimation, setSidebarAnimation] = useState(false);

  useEffect(() => {
    if (team) {
      setSettingsForm({
        name: team.name || '',
        description: team.description || '',
        privacy_level: team.privacy_level || 'Public',
        team_game: team.team_game || 'Valorant',
        division: team.division || 'any',
      });
    }
  }, [team]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Animation delay
      setTimeout(() => setSidebarAnimation(true), 50);
    } else {
      document.body.style.overflow = 'unset';
      setSidebarAnimation(false);
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && team?.id) {
      fetchTeamData();
    }
  }, [isOpen, team?.id]);

  const fetchTeamData = async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchConfig = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      };

      const [statsRes, membersRes, requestsRes, settingsRes] = await Promise.all([
        fetch(`${API_URL}/api/team_api.php?endpoint=team-stats&team_id=${team.id}`, fetchConfig),
        fetch(`${API_URL}/api/team_api.php?endpoint=team-members&team_id=${team.id}`, fetchConfig),
        fetch(`${API_URL}/api/team_api.php?endpoint=team-requests&team_id=${team.id}`, fetchConfig),
        fetch(`${API_URL}/api/team_api.php?endpoint=team-settings&team_id=${team.id}`, fetchConfig),
      ]);

      const [statsData, membersData, requestsData, settingsData] = await Promise.all([
        statsRes.json(),
        membersRes.json(),
        requestsRes.json(),
        settingsRes.json(),
      ]);
      console.log(statsData, membersData, requestsData, settingsData);

      if (!statsRes.ok || !membersRes.ok || !requestsRes.ok || !settingsRes.ok) {
        throw new Error('Failed to fetch team data');
      }

      setTeamStats(statsData.data);
      setMembers(membersData.data.members);
      setRequests(requestsData.data);
      setTeamSettings(settingsData.data);
      setSettingsForm((prev) => ({
        ...prev,
        ...settingsData.data,
      }));
    } catch (err) {
      setError('Failed to load team data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAction = async (requestId, action) => {
    setActionLoading(true);
    try {
      // Map the action to the correct status expected by the API
      const apiAction = action === 'accept' ? 'accepted' : 'rejected';

      const response = await fetch(`${API_URL}/api/team_api.php?endpoint=team-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          team_id: team.id,
          request_id: requestId,
          action: apiAction, // Use the mapped action value
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} the request`);
      }

      const data = await response.json();

      if (data.success) {
        addToast({
          type: 'success',
          message: `Request ${action}ed successfully`, // Fixed grammar
          duration: 5000,
          position: 'bottom-right',
        });
        fetchTeamData();
      } else {
        throw new Error(data.message || `Failed to ${action} request`);
      }
    } catch (error) {
      console.error(`Error ${action}ing request:`, error);
      addToast({
        type: 'error',
        message: `Failed to ${action} request: ${error.message}`,
        duration: 5000,
        position: 'bottom-right',
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/team_api.php?endpoint=team-settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          team_id: team?.id,
          ...settingsForm,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update settings');
      }

      const result = await response.json();

      if (result.success) {
        addToast({
          type: 'success',
          message: 'Team settings updated successfully',
          duration: 5000,
          position: 'bottom-right',
        });
        // Refresh local data
        await fetchTeamData();
        // Refresh parent component data
        if (onTeamUpdate) {
          onTeamUpdate();
        }
      } else {
        throw new Error(result.message || 'Failed to update settings');
      }
    } catch (err) {
      setError('Failed to update settings. Please try again.');

      addToast({
        type: 'error',
        message: err.message,
        duration: 5000,
        position: 'bottom-right',
      });
    }
  };

  const handleDeleteTeam = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/team_api.php?endpoint=team-settings&team_id=${team.id}`,
        {
          method: 'DELETE',
        },
      );

      if (!response.ok) {
        throw new Error('Failed to delete team');
      }

      const result = await response.json();

      if (result.success) {
        addToast({
          type: 'success',
          message: 'Team deleted successfully',
          duration: 5000,
          position: 'bottom-right',
        });
        // Close the sidebar
        onClose();
        // Refresh parent component data
        if (onTeamUpdate) {
          onTeamUpdate();
        }
      } else {
        throw new Error(result.message || 'Failed to delete team');
      }
    } catch (err) {
      setError('Failed to delete team. Please try again.');

      addToast({
        type: 'error',
        message: err.message,
        duration: 5000,
        position: 'bottom-right',
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [isOpen]);

  const handleClose = () => {
    setSidebarAnimation(false);
    setTimeout(() => onClose(), 300); // Match transition duration
  };

  if (!isOpen) return null;

  const loadingScreen = (
    <div className="flex flex-col items-center justify-center h-full w-full p-8">
      <div className="relative w-20 h-20">
        <div className="w-full h-full rounded-full border-4 border-primary/20 animate-ping absolute"></div>
        <div className="w-full h-full rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-6 text-lg font-valorant text-white">Loading team data...</p>
    </div>
  );

  const errorScreen = (
    <div className="flex flex-col items-center justify-center h-full w-full p-8">
      <div className="p-6 bg-red-500/10 rounded-full mb-4">
        <AlertTriangle size={48} className="text-red-400" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Something went wrong</h3>
      <p className="text-gray-400 text-center mb-6">{error}</p>
      <button
        onClick={fetchTeamData}
        className="px-6 py-3 bg-primary/60 hover:bg-primary/80 rounded-xl text-white transition-all hover:scale-105 flex items-center gap-2"
      >
        <Loader2 size={20} className="animate-spin" />
        <span>Try Again</span>
      </button>
    </div>
  );

  return (
    <>
      <style jsx>{`
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.3);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.5);
        }
        
        .angular-cut {
          clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%);
        }
        
        .header-fade {
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.6) 100%);
          backdrop-filter: blur(10px);
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        .slide-in {
          animation: slideIn 0.3s ease-out forwards;
        }
        
        .slide-out {
          animation: slideOut 0.3s ease-in forwards;
        }
      `}</style>
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }
        
        .modal-open {
          overflow: hidden !important;
        }
        
        /* Glass morphism effects */
        .glass-effect {
          background: rgba(17, 24, 39, 0.6);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        /* Custom animation for tab transitions */
        .tab-content-enter {
          opacity: 0;
          transform: translateY(8px);
        }
        
        .tab-content-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 300ms, transform 300ms;
        }
        
        .tab-content-exit {
          opacity: 1;
        }
        
        .tab-content-exit-active {
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 300ms, transform 300ms;
        }
      `}</style>

      <div className="fixed inset-0 z-50">
        {/* Backdrop with improved blur */}
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
          style={{ opacity: sidebarAnimation ? 1 : 0 }}
          onClick={handleClose}
        />

        {/* Sidebar container with animation */}
        <div 
          className={`fixed inset-y-0 right-0 w-full max-w-[90%] md:max-w-2xl lg:max-w-4xl xl:max-w-6xl overflow-hidden ${sidebarAnimation ? 'slide-in' : 'slide-out'}`}
        >
          <div className="h-full flex flex-col bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl shadow-xl">
            {/* Header with parallax effect */}
            <div className="sticky top-0 z-10 backdrop-blur-xl header-fade">
              <div className="relative h-auto md:h-36">
                {/* Background Image with parallax */}
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transform scale-105 transition-transform duration-500 ease-out"
                    style={{
                      backgroundImage: team?.banner
                        ? `url(${process.env.NEXT_PUBLIC_BACKEND_URL}/${team.banner})`
                        : 'url(/api/placeholder/1200/300)',
                      filter: 'brightness(0.4)',
                      transform: sidebarAnimation ? 'scale(1.05)' : 'scale(1)',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 via-gray-900/60 to-gray-900" />
                </div>

                {/* Header Content with improved layout */}
                {/* Enhanced Header Content with 3D effects and better responsiveness */}
<div className="relative px-4 md:px-8 py-4 md:py-8">
  {/* Background blurred effect */}
  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-b-xl"></div>
  
  <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8">
    <div className="flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-8">
      {/* Team Logo with 3D hover effect */}
      <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden shadow-2xl group perspective">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 to-blue-500/30 rounded-2xl -m-0.5 animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/20 via-transparent to-blue-500/20 rounded-2xl transform rotate-180 -m-0.5 animate-pulse-slow animation-delay-500"></div>
        <div className="relative w-full h-full rounded-2xl overflow-hidden transform transition-transform duration-500 ease-out group-hover:scale-105 group-hover:rotate-3d ring-4 ring-purple-500/30 group-hover:ring-purple-500/50 shadow-lg">
          <img
            src={team?.logo ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${team.logo}` : '/api/placeholder/112/112'}
            alt={team?.name || 'Team logo'}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-purple-500/50 rounded-full blur-sm animate-pulse"></div>
        <div className="absolute -top-1 -left-1 w-4 h-4 bg-blue-500/50 rounded-full blur-sm animate-pulse animation-delay-700"></div>
      </div>

      {/* Team Info with enhanced typography and visual elements */}
      <div className="space-y-3">
        <h2 className="group text-2xl md:text-4xl tracking-wider font-valorant text-white inline-flex items-center drop-shadow-lg relative">
          {team?.name}
          <span className="ml-3 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg p-1.5 hidden md:flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
            <Trophy size={20} className="text-yellow-900" />
          </span>
          {/* Decorative underline */}
          <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></span>
        </h2>
        
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/5 shadow-inner hover:bg-white/15 transition-all duration-300 group">
            <Users size={16} className="text-primary group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm md:text-base text-gray-200 font-medium">{team?.total_members || 0} Members</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/5 shadow-inner hover:bg-white/15 transition-all duration-300 group">
            <Trophy size={16} className="text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm md:text-base text-gray-200 font-medium">Division {team?.division || 'N/A'}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/5 shadow-inner hover:bg-white/15 transition-all duration-300 group">
            <Star size={16} className="text-blue-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm md:text-base text-gray-200 font-medium">Rank #{teamStats?.regional_rank || '??'}</span>
          </div>
        </div>
        
        
      </div>
    </div>

   

    {/* Close Button with enhanced hover effect */}
    <button
      onClick={handleClose}
      className="absolute top-2 right-2 md:top-4 md:right-4 p-2 md:p-3 bg-black/20 hover:bg-white/10 backdrop-blur-sm rounded-xl transition-all duration-300 hover:scale-110 group border border-white/5"
      aria-label="Close sidebar"
    >
      <X size={20} className="text-gray-400 group-hover:text-white transition-colors" />
    </button>
  </div>
</div>


              </div>
            </div>

            {/* Navigation Tabs with improved active states */}
            <div className="px-4 md:px-8 py-3 md:py-4 border-b border-gray-700/50 backdrop-blur-sm bg-gray-900/50 shadow-md">
              <div className="flex overflow-x-auto scrollbar-hide space-x-2 md:space-x-3 font-pilot">
                {[
                  { id: 'overview', label: 'Overview', icon: BarChart2 },
                  { id: 'members', label: 'Members', icon: Users },
                  { id: 'requests', label: 'Requests', icon: UserPlus, badge: requests?.length },
                  { id: 'settings', label: 'Settings', icon: Settings },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center justify-center gap-2 
                      px-4 py-2.5 rounded-lg transition-all duration-300 whitespace-nowrap
                      ${activeTab === tab.id
                        ? 'bg-gradient-to-r from-primary/70 to-purple-600/70 text-white shadow-lg shadow-purple-500/20 scale-105'
                        : 'text-gray-400 hover:bg-gray-800/70 hover:text-white'
                      }
                    `}
                  >
                    <tab.icon size={18} className="transition-transform duration-300" />
                    <span className="font-medium">{tab.label}</span>
                    {tab.badge > 0 && (
                      <span className="px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full min-w-[20px] text-center">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content with loading and error states */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-hide">
              {loading ? (
                loadingScreen
              ) : error ? (
                errorScreen
              ) : (
                <div className="space-y-6 md:space-y-8 font-pilot">
                  {activeTab === 'overview' && (
                    <div className="space-y-6 md:space-y-8 animate-fadeIn">
                      {/* Stats Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        <StatCard
                          icon={Users2}
                          value={teamStats?.total_members || 0}
                          label="Total Members"
                          trend={12}
                          gradient="bg-gradient-to-br from-purple-600/30 to-blue-600/30"
                        />
                        <StatCard
                          icon={Target}
                          value={`${teamStats?.win_rate || 0}%`}
                          label="Win Rate"
                          trend={teamStats?.win_rate_trend}
                          gradient="bg-gradient-to-br from-green-600/30 to-emerald-600/30"
                        />
                        <StatCard
                          icon={Award}
                          value={teamStats?.regional_rank || '-'}
                          label="Regional Rank"
                          gradient="bg-gradient-to-br from-yellow-600/30 to-orange-600/30"
                        />
                        <StatCard
                          icon={Star}
                          value={teamStats?.mmr || 0}
                          label="Team MMR"
                          gradient="bg-gradient-to-br from-blue-600/30 to-cyan-600/30"
                        />
                      </div>

                      {/* Recent Activity Section */}
                      <div className="bg-secondary/30 rounded-xl p-6 border border-gray-700/30 shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-valorant text-white">Recent Activity</h3>
                          <button className="text-primary text-sm flex items-center hover:underline">
                            View All <ArrowRight size={14} className="ml-1" />
                          </button>
                        </div>
                        <div className="space-y-4">
                          {/* Activity items */}
                          {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                              <div className="p-2 bg-primary/20 rounded-lg flex-shrink-0">
                                {item === 1 ? <Trophy size={18} className="text-yellow-400" /> : 
                                 item === 2 ? <Users size={18} className="text-blue-400" /> : 
                                 <Bell size={18} className="text-green-400" />}
                              </div>
                              <div>
                                <p className="text-sm text-white">
                                  {item === 1 ? "Team won match against WarLords" : 
                                   item === 2 ? "New member joined the team" : 
                                   "Upcoming tournament registration"}
                                </p>
                                <span className="text-xs text-gray-400 flex items-center mt-1">
                                  <Clock size={12} className="mr-1" />
                                  {item === 1 ? "2 hours ago" : item === 2 ? "Yesterday" : "Next week"}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Info Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        <div className="bg-gray-800/40 hover:bg-gray-800/60 rounded-xl p-6 border border-gray-700/30 transition-all duration-300 hover:border-primary/30 group">
                          <div className="flex items-center gap-3">
                            <div className="p-3 bg-purple-500/20 rounded-xl group-hover:bg-purple-500/30 transition-colors duration-300">
                              <Trophy className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-400">Average Rank</div>
                              <div className="text-2xl font-valorant text-white mt-2 group-hover:text-primary transition-colors duration-300">
                                {teamStats?.average_rank || 'N/A'}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-800/40 hover:bg-gray-800/60 rounded-xl p-6 border border-gray-700/30 transition-all duration-300 hover:border-yellow-500/30 group">
                          <div className="flex items-center gap-3">
                            <div className="p-3 bg-yellow-500/20 rounded-xl group-hover:bg-yellow-500/30 transition-colors duration-300">
                              <Medal className="w-5 h-5 text-yellow-400" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-400">Division</div>
                              <div className="text-2xl font-valorant text-white mt-2 group-hover:text-yellow-400 transition-colors duration-300">
                                {teamStats?.division || 'N/A'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'members' && (
                    <div className="space-y-6 md:space-y-8 animate-fadeIn">
                      {/* Search bar with improved styling */}
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="text"
                            placeholder="Search members..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-secondary/50 backdrop-blur-sm rounded-xl pl-12 pr-4 py-3 md:py-4 text-white border border-gray-700/30 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          />
                        </div>
                        
                        {/* Add member button */}
                        <button className="px-5 py-3 md:py-4 bg-primary/80 hover:bg-primary rounded-xl text-white flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-lg shadow-primary/20">
                          <UserPlus size={20} />
                          <span>Add Member</span>
                        </button>
                      </div>

                      {/* Team leaders section */}
                      <div>
                        <h3 className="text-lg font-valorant text-white mb-4 flex items-center">
                          <Crown size={20} className="mr-2 text-yellow-400" /> Team Leadership
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                          {members
                            .filter(member => member.user_id === team?.owner_id || member.role.toLowerCase().includes('leader'))
                            .map((member) => (
                              <MemberCard
                                key={member.id}
                                member={member}
                                isOwner={member.user_id === team?.owner_id}
                              />
                            ))}
                        </div>
                      </div>

                      {/* All members section */}
                      <div>
                        <h3 className="text-lg font-valorant text-white mb-4 flex items-center">
                          <Users size={20} className="mr-2 text-blue-400" /> All Members
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {members
                            .filter(
                              (member) =>
                                (member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                member.role.toLowerCase().includes(searchQuery.toLowerCase())) &&
                                member.user_id !== team?.owner_id && 
                                !member.role.toLowerCase().includes('leader')
                            )
                            .map((member) => (
                              <MemberCard
                                key={member.id}
                                member={member}
                                isOwner={false}
                              />
                            ))}
                        </div>
                      </div>

                      {members.length === 0 && (
                        <div className="text-center py-16 px-4 bg-secondary/20 backdrop-blur-sm rounded-xl border border-gray-700/30">
                          <Users className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                          <p className="text-xl font-valorant text-white mb-2">No members found</p>
                          <p className="text-gray-400 mb-6 max-w-md mx-auto">
                            Add some members to your team to get started
                          </p>
                          <button className="px-6 py-3 bg-primary/70 hover:bg-primary rounded-lg text-white inline-flex items-center justify-center gap-2 transition-all hover:scale-105">
                            <UserPlus size={20} />
                            <span>Add First Member</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'requests' && (
                    <div className="space-y-6 md:space-y-8 animate-fadeIn">
                      {/* Header with Stats */}
                      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-secondary/40 backdrop-blur-sm p-5 md:p-6 rounded-xl border border-gray-700/30 hover:border-primary/30 transition-all duration-300">
                          <div className="flex items-center gap-4 text-primary/90">
                            <div className="p-3 rounded-xl bg-primary/10">
                              <UserPlus className="w-6 h-6 md:w-8 md:h-8" />
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-400">Pending Requests</h3>
                              <p className="text-2xl md:text-3xl font-bold text-white">{requests.length}</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-secondary/40 backdrop-blur-sm p-5 md:p-6 rounded-xl border border-gray-700/30 hover:border-green-500/30 transition-all duration-300">
                          <div className="flex items-center gap-4 text-emerald-500">
                            <div className="p-3 rounded-xl bg-emerald-500/10">
                              <Check className="w-6 h-6 md:w-8 md:h-8" />
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-400">Accepted Today</h3>
                              <p className="text-2xl md:text-3xl font-bold text-white">0</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Requests List */}
                      <div className="flex flex-col gap-4">
                        {requests.map((request) => (
                          <RequestCard
                            key={request.id}
                            request={request}
                            handleRequestAction={handleRequestAction}
                            actionLoading={actionLoading}
                            defaultAvatarSvg={defaultAvatarSvg}
                          />
                        ))}

                        {requests.length === 0 && (
                          <div className="flex flex-col items-center justify-center py-16 px-4 bg-secondary/20 backdrop-blur-sm rounded-xl border border-gray-700/30">
                            <UserPlus className="w-16 h-16 text-gray-500 mb-4" />
                            <h3 className="text-xl font-valorant text-white mb-2">
                              No Pending Requests
                            </h3>
                            <p className="text-gray-400 text-center max-w-md mb-6">
                              When players request to join your team, they will appear here for review.
                            </p>
                            <button className="px-6 py-3 bg-primary/70 hover:bg-primary rounded-lg text-white inline-flex items-center justify-center gap-2 transition-all hover:scale-105">
                              <Users size={20} />
                              <span>View Team Page</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === 'settings' && (
                    <div className="space-y-6 md:space-y-8 animate-fadeIn">
                      <div className="w-full mx-auto">
                        <form onSubmit={handleSettingsSubmit} className="space-y-6 md:space-y-8">
                          {/* Team customization section */}
                          <div className="bg-secondary/30 rounded-xl p-6 border border-gray-700/30 shadow-xl">
                            <h3 className="text-lg font-valorant text-white mb-6 flex items-center">
                              <Settings size={20} className="mr-2 text-primary" /> Team Customization
                            </h3>
                            
                            <div className="space-y-6">
                              <div>
                                <FloatingLabelInput
                                  label={'Team Name'}
                                  name={'team_name'}
                                  value={settingsForm.name}
                                  onChange={(e) =>
                                    setSettingsForm({ ...settingsForm, name: e.target.value })
                                  }
                                  className="bg-gray-800/50 border-gray-700/50 focus:border-primary/70"
                                />
                              </div>

                              <div>
                                <FloatingLabelTextArea
                                  label={'Team Description'}
                                  name={'team_description'}
                                  value={settingsForm.description}
                                  onChange={(e) =>
                                    setSettingsForm({ ...settingsForm, description: e.target.value })
                                  }
                                  className="bg-gray-800/50 border-gray-700/50 focus:border-primary/70"
                                  rows={4}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <FloatingSelectField
                                    label={'Privacy Level'}
                                    value={settingsForm.privacy_level}
                                    onChange={(e) =>
                                      setSettingsForm({
                                        ...settingsForm,
                                        privacy_level: e.target.value,
                                      })
                                    }
                                    options={['Public', 'Private']}
                                    className="bg-gray-800/50 border-gray-700/50 focus:border-primary/70"
                                  />
                                </div>

                                <div>
                                  <FloatingSelectField
                                    label={'Division'}
                                    value={settingsForm.division}
                                    onChange={(e) =>
                                      setSettingsForm({
                                        ...settingsForm,
                                        division: e.target.value,
                                      })
                                    }
                                    options={[
                                      'Iron',
                                      'Bronze',
                                      'Silver',
                                      'Gold',
                                      'Platinum',
                                      'Diamond',
                                      'Master',
                                      'Grandmaster',
                                    ]}
                                    className="bg-gray-800/50 border-gray-700/50 focus:border-primary/70"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Media upload section */}
                          <div className="bg-secondary/30 rounded-xl p-6 border border-gray-700/30 shadow-xl">
                            <h3 className="text-lg font-valorant text-white mb-6 flex items-center">
                              <Image size={20} className="mr-2 text-blue-400" /> Team Media
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Team Logo */}
                              <div className="space-y-4">
                                <label className="block text-sm font-medium text-gray-300">Team Logo</label>
                                <div className="flex items-center justify-center w-full">
                                  <label className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-600 rounded-xl hover:border-primary/60 transition-colors duration-300 cursor-pointer bg-gray-800/30">
                                    <div className="flex flex-col items-center justify-center p-6">
                                      <img
                                        src={team?.image ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${team.logo}` : `data:image/svg+xml,${encodeURIComponent(defaultAvatarSvg)}`}
                                        alt="Team logo preview"
                                        className="w-20 h-20 object-cover mb-4 rounded-xl"
                                      />
                                      <p className="text-sm text-gray-400">Click to upload new logo</p>
                                    </div>
                                    <input type="file" className="hidden" />
                                  </label>
                                </div>
                              </div>
                              
                              {/* Team Banner */}
                              <div className="space-y-4">
                                <label className="block text-sm font-medium text-gray-300">Team Banner</label>
                                <div className="flex items-center justify-center w-full">
                                  <label className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-600 rounded-xl hover:border-primary/60 transition-colors duration-300 cursor-pointer bg-gray-800/30">
                                    <div className="flex flex-col items-center justify-center p-6">
                                      <div 
                                        className="w-full h-20 mb-4 rounded-xl bg-cover bg-center"
                                        style={{
                                          backgroundImage: team?.banner ? `url(${process.env.NEXT_PUBLIC_BACKEND_URL}/${team.banner})` : 'url(/api/placeholder/200/80)'
                                        }}
                                      ></div>
                                      <p className="text-sm text-gray-400">Click to upload new banner</p>
                                    </div>
                                    <input type="file" className="hidden" />
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-800">
                            <button
                              type="button"
                              onClick={() => setShowDeleteConfirm(true)}
                              className="px-5 py-3 bg-red-500/10 hover:bg-red-500/20 angular-cut text-red-400 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                            >
                              <Trash className="w-5 h-5" />
                              <span>Delete Team</span>
                            </button>

                            <button
                              type="submit"
                              className="px-6 py-3 bg-gradient-to-r from-primary/70 to-purple-600/70 hover:from-primary hover:to-purple-600 angular-cut text-white flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/20"
                            >
                              <Save size={20} />
                              <span>Save Changes</span>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal with enhanced styling */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-60 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl p-6 md:p-8 w-full max-w-md border border-gray-700 shadow-2xl shadow-red-500/5">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-red-500/20 rounded-xl">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Delete Team</h3>
                <p className="text-gray-400 mt-1">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-gray-300 mb-8 bg-red-500/5 p-4 rounded-xl border border-red-500/20">
              Are you sure you want to delete{' '}
              <span className="font-semibold text-white">{team?.name}</span>? All team data,
              including members and history, will be permanently removed.
            </p>

            <div className="flex items-center justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-5 py-3 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDeleteTeam();
                  setShowDeleteConfirm(false);
                }}
                className="px-5 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl text-white transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg shadow-red-500/20"
              >
                <Trash className="w-5 h-5" />
                <span>Delete Team</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Added Image icon component
const Image = ({ size = 24, className = "" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
};

export default TeamSidebar;