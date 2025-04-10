/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';

const BattleRoyale = () => {
  // Sample data for the tournament with realistic stats
  const [teams, setTeams] = useState([
    { id: 1, name: "WINNERS ESPORTS", kills: 32, classPoints: 45, total: 77 },
    { id: 2, name: "JOKO FORCE", kills: 28, classPoints: 52, total: 80 },
    { id: 3, name: "Old School", kills: 24, classPoints: 38, total: 62 },
    { id: 4, name: "Amateras", kills: 35, classPoints: 30, total: 65 },
    { id: 5, name: "Tyranids", kills: 42, classPoints: 41, total: 83 },
    { id: 6, name: "FANTASMAjr", kills: 19, classPoints: 47, total: 66 },
    { id: 7, name: "TOXIC TX", kills: 38, classPoints: 49, total: 87 },
    { id: 8, name: "TripleX.Team", kills: 21, classPoints: 35, total: 56 },
    { id: 9, name: "EQUIPE 808", kills: 26, classPoints: 33, total: 59 },
    { id: 10, name: "CSS AFRICA", kills: 31, classPoints: 40, total: 71 }
  ]);

  // Sort teams by total points (could be expanded with more complex sorting logic)
  const sortedTeams = [...teams].sort((a, b) => b.total - a.total);

  return (
    <div className="min-h-screen w-full text-white p-6">
      {/* Tournament Bracket Header */}
      <h1 className="text-4xl tracking-wider font-custom mb-6 text-start"> Tournament Bracket </h1>
      
      {/* Tournament Table */}
      <div className="overflow-x-auto ">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-700 text-center ">
              {/* Rank Column with Icon */}
              <th className="py-4 px-2">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-500 ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <span>Rank</span>
                </div>
              </th>
              
              {/* Competitors Column with Icon */}
              <th className="py-4 px-2">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <span>Competitors</span>
                </div>
              </th>
              
              {/* Kills Points Column with Icon */}
              <th className="py-4 px-2">
                <div className="flex items-center space-x-2">
                  <span className="text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </span>
                  <span>Kills Pts</span>
                </div>
              </th>
              
              {/* Class Points Column with Icon */}
              <th className="py-4 px-2">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </span>
                  <span>Class Pts</span>
                </div>
              </th>
              
              {/* Total Column with Icon */}
              <th className="py-4 px-2">
                <div className="flex items-center space-x-2">
                  <span className="text-purple-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </span>
                  <span>Total</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-4 divide-secondary">
            {sortedTeams.map((team, index) => (
              <tr 
                key={team.id} 
                className="transform transition-all duration-300 hover:bg-gray-800 angular-cut hover:shadow-lg hover:shadow-cyan-500/20 cursor-pointer"
              >
                {/* Rank */}
                <td className="py-4 px-2 text-lg font-bold">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black transition-transform duration-300 hover:scale-110 hover:rotate-12">
                    {index + 1}
                  </div>
                </td>
                
                {/* Team Name */}
                <td className="py-4 px-2">
                  <span className="text-cyan-400 font-valorant hover:text-cyan-300 transition-all duration-300 font-medium relative group">
                    {team.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </td>
                
                {/* Kill Points */}
                <td className="py-4 px-2">
                  <div className="transition-all duration-300 hover:text-red-400 hover:font-bold">
                    {team.kills}
                  </div>
                </td>
                
                {/* Class Points */}
                <td className="py-4 px-2">
                  <div className="transition-all duration-300 hover:text-blue-400 hover:font-bold">
                    {team.classPoints}
                  </div>
                </td>
                
                {/* Total Points */}
                <td className="py-4 px-2">
                  <div className="transition-all duration-300 hover:text-purple-400 hover:font-bold">
                    {team.total}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Legend or additional information can be added here */}
      <div className="mt-6 text-gray-400 text-sm">
        <p>* Points are updated after each match</p>
        <p>* Top 3 teams qualify for the finals</p>
      </div>
    </div>
  );
};

export default BattleRoyale;