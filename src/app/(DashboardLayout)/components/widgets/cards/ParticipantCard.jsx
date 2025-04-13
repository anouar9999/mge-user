import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HelpCircle, Trophy, Shield, UserCircle, Users, PlusCircle } from 'lucide-react';
import Image from 'next/image';

const DefaultAvatar = ({ isTeam }) => (
  <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-100 via-gray-900 to-gray-900" />
    {isTeam ? (
      <Shield
        className="w-6 h-6 xs:w-8 xs:h-8 md:w-10 md:h-10 text-gray-400 relative z-10"
        strokeWidth={1.5}
      />
    ) : (
      <UserCircle
        className="w-6 h-6 xs:w-8 xs:h-8 md:w-10 md:h-10 text-gray-400 relative z-10"
        strokeWidth={1.5}
      />
    )}
    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-gray-800 via-gray-800/50 to-transparent" />
  </div>
);

const ParticipantOrTeamCard = ({ item }) => {
  const isTeam = item.type === 'team';
  const isCurrentUser = !isTeam && localStorage.getItem('username') === item.username;
  const avatarSrc = isTeam
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${item.team_avatar}`
    : item.avatar;

  return (
    <div
      className="group relative bg-dark/80 angular-cut shadow-lg overflow-hidden
      backdrop-blur-sm duration-300 h-full"
    >
      <div className="relative h-14 xs:h-16 sm:h-20">
        {avatarSrc ? (
          <img
            className="w-full h-full object-cover"
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${avatarSrc}`}
            alt={`${process.env.NEXT_PUBLIC_BACKEND_URL}${isTeam ? item.team_name : item.username}'s avatar`}
            width={192}
            height={128}
          />
        ) : (
          <DefaultAvatar isTeam={isTeam} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
      </div>

      <div className="p-2 xs:p-2.5 sm:p-3">
        <div className="flex items-center justify-between">
          <h5 className="text-xs xs:text-sm sm:text-base font-semibold text-white truncate">
            {isTeam ? item.team_name : item.username}
            {isCurrentUser && <span className="ml-1 text-xs text-primary">(You)</span>}
          </h5>
        </div>

        <div className="mt-0.5 xs:mt-1 flex items-center text-xs text-gray-400">
          {isTeam ? (
            <>
              <Users className="w-3 h-3 mr-1" />
              <span className="text-xs">{item.member_count || '0'} members</span>
            </>
          ) : (
            <>
              
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const ParticipantCardGrid = ({ tournamentId }) => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tournamentType, setTournamentType] = useState(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get_accepted_participants.php?tournament_id=${tournamentId}`,
        );
        if (response.data.success) {
          setParticipants(response.data.participants);
          setTournamentType(response.data.tournament_type);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Failed to fetch participants. Please try again later.');
        console.error('Error fetching participants:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [tournamentId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32 xs:h-40 sm:h-48">
        <div className="animate-spin rounded-full h-5 w-5 xs:h-6 xs:w-6 sm:h-8 sm:w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center text-xs xs:text-sm sm:text-base p-4">{error}</div>
    );
  }

  if (participants.length === 0) {
    return (
      <div className="text-center my-8 p-6   max-w-md mx-auto">
        <div className="relative">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <Users className="text-primary w-8 h-8" />
          </div>
        </div>

        <h3 className="text-lg font-valorant text-white mb-2">No Participants Registered</h3>

        <p className="text-gray-400 mb-6 font-mono">
          Join the competition and showcase your skills!
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto px-2 xs:px-3 sm:px-4">
      <div
        className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 
        gap-2 xs:gap-3 sm:gap-4"
      >
        {participants.map((item) => (
          <ParticipantOrTeamCard key={`participant-${item.registration_id}`} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ParticipantCardGrid;
