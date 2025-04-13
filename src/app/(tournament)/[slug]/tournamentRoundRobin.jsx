import React, { useState } from 'react';
import { Trophy, Medal, Target, Shield, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const RoundRobinTournament = () => {
  // Sample teams for the tournament (using 8 teams for a balanced round robin)
  const [teams] = useState([
    { 
      id: 1, 
      name: "WINNERS ESPORTS", 
      played: 7, 
      wins: 6, 
      draws: 1, 
      losses: 0, 
      goalsFor: 18, 
      goalsAgainst: 5,
      form: ['W', 'W', 'D', 'W', 'W', 'W', 'W'] 
    },
    { 
      id: 2, 
      name: "JOKO FORCE", 
      played: 7, 
      wins: 5, 
      draws: 1, 
      losses: 1, 
      goalsFor: 15, 
      goalsAgainst: 7,
      form: ['W', 'W', 'W', 'L', 'W', 'D', 'W'] 
    },
    { 
      id: 3, 
      name: "TOXIC TX", 
      played: 7, 
      wins: 5, 
      draws: 0, 
      losses: 2, 
      goalsFor: 14, 
      goalsAgainst: 8,
      form: ['W', 'W', 'L', 'W', 'W', 'W', 'L'] 
    },
    { 
      id: 4, 
      name: "Tyranids", 
      played: 7, 
      wins: 4, 
      draws: 1, 
      losses: 2, 
      goalsFor: 12, 
      goalsAgainst: 9,
      form: ['W', 'L', 'W', 'D', 'W', 'W', 'L'] 
    },
    { 
      id: 5, 
      name: "Amateras", 
      played: 7, 
      wins: 3, 
      draws: 1, 
      losses: 3, 
      goalsFor: 10, 
      goalsAgainst: 10,
      form: ['D', 'W', 'L', 'W', 'L', 'L', 'W'] 
    },
    { 
      id: 6, 
      name: "FANTASMAjr", 
      played: 7, 
      wins: 2, 
      draws: 1, 
      losses: 4, 
      goalsFor: 8, 
      goalsAgainst: 12,
      form: ['L', 'L', 'W', 'D', 'W', 'L', 'L'] 
    },
    { 
      id: 7, 
      name: "Old School", 
      played: 7, 
      wins: 1, 
      draws: 1, 
      losses: 5, 
      goalsFor: 6, 
      goalsAgainst: 15,
      form: ['L', 'D', 'L', 'L', 'L', 'L', 'W'] 
    },
    { 
      id: 8, 
      name: "TripleX.Team", 
      played: 7, 
      wins: 0, 
      draws: 0, 
      losses: 7, 
      goalsFor: 4, 
      goalsAgainst: 21,
      form: ['L', 'L', 'L', 'L', 'L', 'L', 'L'] 
    }
  ]);

  // Match schedule and results
  const [rounds] = useState([
    {
      name: "Round 1",
      matches: [
        { homeTeam: "WINNERS ESPORTS", homeScore: 3, awayTeam: "TripleX.Team", awayScore: 0, completed: true },
        { homeTeam: "JOKO FORCE", homeScore: 2, awayTeam: "Old School", awayScore: 0, completed: true },
        { homeTeam: "TOXIC TX", homeScore: 2, awayTeam: "FANTASMAjr", awayScore: 1, completed: true },
        { homeTeam: "Tyranids", homeScore: 1, awayTeam: "Amateras", awayScore: 1, completed: true }
      ]
    },
    {
      name: "Round 2",
      matches: [
        { homeTeam: "WINNERS ESPORTS", homeScore: 2, awayTeam: "Old School", awayScore: 0, completed: true },
        { homeTeam: "JOKO FORCE", homeScore: 3, awayTeam: "TripleX.Team", awayScore: 1, completed: true },
        { homeTeam: "TOXIC TX", homeScore: 3, awayTeam: "Tyranids", awayScore: 1, completed: true },
        { homeTeam: "FANTASMAjr", homeScore: 1, awayTeam: "Amateras", awayScore: 2, completed: true }
      ]
    },
    {
      name: "Round 3",
      matches: [
        { homeTeam: "WINNERS ESPORTS", homeScore: 2, awayTeam: "JOKO FORCE", awayScore: 2, completed: true },
        { homeTeam: "TOXIC TX", homeScore: 1, awayTeam: "Amateras", awayScore: 2, completed: true },
        { homeTeam: "Tyranids", homeScore: 2, awayTeam: "TripleX.Team", awayScore: 0, completed: true },
        { homeTeam: "FANTASMAjr", homeScore: 2, awayTeam: "Old School", awayScore: 1, completed: true }
      ]
    },
    {
      name: "Round 4",
      matches: [
        { homeTeam: "WINNERS ESPORTS", homeScore: 3, awayTeam: "FANTASMAjr", awayScore: 1, completed: true },
        { homeTeam: "JOKO FORCE", homeScore: 1, awayTeam: "TOXIC TX", awayScore: 2, completed: true },
        { homeTeam: "Tyranids", homeScore: 1, awayTeam: "Old School", awayScore: 0, completed: true },
        { homeTeam: "Amateras", homeScore: 2, awayTeam: "TripleX.Team", awayScore: 0, completed: true }
      ]
    },
    {
      name: "Round 5",
      matches: [
        { homeTeam: "WINNERS ESPORTS", homeScore: 2, awayTeam: "Tyranids", awayScore: 1, completed: true },
        { homeTeam: "JOKO FORCE", homeScore: 3, awayTeam: "Amateras", awayScore: 1, completed: true },
        { homeTeam: "TOXIC TX", homeScore: 2, awayTeam: "Old School", awayScore: 1, completed: true },
        { homeTeam: "FANTASMAjr", homeScore: 0, awayTeam: "TripleX.Team", awayScore: 0, completed: true }
      ]
    },
    {
      name: "Round 6",
      matches: [
        { homeTeam: "WINNERS ESPORTS", homeScore: 3, awayTeam: "TOXIC TX", awayScore: 1, completed: true },
        { homeTeam: "JOKO FORCE", homeScore: 2, awayTeam: "FANTASMAjr", awayScore: 2, completed: true },
        { homeTeam: "Tyranids", homeScore: 3, awayTeam: "TripleX.Team", awayScore: 1, completed: true },
        { homeTeam: "Amateras", homeScore: 1, awayTeam: "Old School", awayScore: 2, completed: true }
      ]
    },
    {
      name: "Round 7",
      matches: [
        { homeTeam: "WINNERS ESPORTS", homeScore: 3, awayTeam: "Amateras", awayScore: 0, completed: true },
        { homeTeam: "JOKO FORCE", homeScore: 4, awayTeam: "Tyranids", awayScore: 2, completed: true },
        { homeTeam: "TOXIC TX", homeScore: 1, awayTeam: "TripleX.Team", awayScore: 2, completed: true },
        { homeTeam: "FANTASMAjr", homeScore: 0, awayTeam: "Old School", awayScore: 1, completed: true }
      ]
    }
  ]);

  const [activeRound, setActiveRound] = useState(6); // Start with the most recent round

  // Sort teams by points (3 for win, 1 for draw), then goal difference, then goals scored
  const sortedTeams = [...teams].sort((a, b) => {
    const pointsA = a.wins * 3 + a.draws;
    const pointsB = b.wins * 3 + b.draws;
    
    if (pointsB !== pointsA) {
      return pointsB - pointsA;
    }
    
    const goalDiffA = a.goalsFor - a.goalsAgainst;
    const goalDiffB = b.goalsFor - b.goalsAgainst;
    
    if (goalDiffB !== goalDiffA) {
      return goalDiffB - goalDiffA;
    }
    
    return b.goalsFor - a.goalsFor;
  });

  const FormIndicator = ({ result }) => {
    if (result === 'W') {
      return <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center text-xs text-white font-bold">W</div>;
    } else if (result === 'D') {
      return <div className="w-5 h-5 rounded-full bg-gray-500 flex items-center justify-center text-xs text-white font-bold">D</div>;
    } else {
      return <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-xs text-white font-bold">L</div>;
    }
  };

  return (
    <div className="min-h-screen   p-4 md:p-6 text-white">
      <h1 className="text-3xl font-bold mb-8 text-start">Tournament Bracket</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
        {/* Standings Table */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Trophy className="mr-2 text-yellow-500" size={20} />
            Tournament Standings
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-800 text-gray-300">
                  <th className="py-3 px-4 text-left">Pos</th>
                  <th className="py-3 px-4 text-left">Team</th>
                  <th className="py-3 px-4 text-center">P</th>
                  <th className="py-3 px-4 text-center">W</th>
                  <th className="py-3 px-4 text-center">D</th>
                  <th className="py-3 px-4 text-center">L</th>
                  <th className="py-3 px-4 text-center">GF</th>
                  <th className="py-3 px-4 text-center">GA</th>
                  <th className="py-3 px-4 text-center">GD</th>
                  <th className="py-3 px-4 text-center">Pts</th>
                  <th className="py-3 px-4 text-center">Form</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {sortedTeams.map((team, index) => (
                  <tr 
                    key={team.id} 
                    className={`
                      ${index === 0 ? 'bg-blue-900/20' : ''}
                      ${index === 1 ? 'bg-green-900/20' : ''}
                      ${index === 2 ? 'bg-yellow-900/20' : ''}
                      hover:bg-gray-800 transition-colors
                    `}
                  >
                    <td className="py-3 px-4 font-medium">
                      <div className="flex items-center">
                        {index === 0 && <Trophy size={16} className="mr-1 text-yellow-500" />}
                        {index === 1 && <Medal size={16} className="mr-1 text-gray-300" />}
                        {index === 2 && <Medal size={16} className="mr-1 text-yellow-700" />}
                        {index + 1}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-cyan-400">{team.name}</td>
                    <td className="py-3 px-4 text-center">{team.played}</td>
                    <td className="py-3 px-4 text-center text-green-500">{team.wins}</td>
                    <td className="py-3 px-4 text-center text-gray-400">{team.draws}</td>
                    <td className="py-3 px-4 text-center text-red-500">{team.losses}</td>
                    <td className="py-3 px-4 text-center">{team.goalsFor}</td>
                    <td className="py-3 px-4 text-center">{team.goalsAgainst}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center">
                        {team.goalsFor - team.goalsAgainst > 0 ? (
                          <>
                            <span className="text-green-500">+{team.goalsFor - team.goalsAgainst}</span>
                            <ArrowUpRight size={14} className="ml-1 text-green-500" />
                          </>
                        ) : team.goalsFor - team.goalsAgainst < 0 ? (
                          <>
                            <span className="text-red-500">{team.goalsFor - team.goalsAgainst}</span>
                            <ArrowDownRight size={14} className="ml-1 text-red-500" />
                          </>
                        ) : (
                          <>
                            <span>0</span>
                            <Minus size={14} className="ml-1" />
                          </>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center font-bold">{team.wins * 3 + team.draws}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-1">
                        {team.form.slice(-5).map((result, i) => (
                          <FormIndicator key={i} result={result} />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-sm text-gray-400 space-y-1">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-blue-900/40 mr-2"></div>
              <span>Tournament Winner</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-900/40 mr-2"></div>
              <span>Qualification Position</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-yellow-900/40 mr-2"></div>
              <span>Playoff Position</span>
            </div>
          </div>
        </div>
        
      
      </div>
    </div>
  );
};

export default RoundRobinTournament;