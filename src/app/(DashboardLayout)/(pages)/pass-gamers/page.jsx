'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const TournamentModal = ({ isOpen, onClose, tournament }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 sm:p-6 backdrop-blur-sm">
      <div 
        className="bg-[#0f1923] border border-[#1f2731] max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header with close button */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#1f2731]">
          <h3 className="text-xl sm:text-2xl font-valorant text-white">{tournament.title || 'Tournament Details'}</h3>
          <button 
            onClick={onClose}
            className="text-[#647693] hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal content */}
        <div className="p-4 sm:p-6">
          {/* Hero image */}
          <div className="w-full h-48 sm:h-64 relative overflow-hidden mb-6">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url('${tournament.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            {/* Badge */}
            <div className="absolute top-0 right-0">
              <span className={`${tournament.badgeColor || 'bg-primary'} text-xs py-1.5 px-2 font-valorant text-white w-fit flex items-center gap-1`}>
                <span>{tournament.badgeIcon || '⭐'}</span> {tournament.badge || 'Tournament'}
              </span>
            </div>
          </div>

          {/* Tournament info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-[#647693] text-xs mb-2 font-valorant">DESCRIPTION</h4>
              <p className="text-white text-sm">
                {tournament.description}
              </p>
            </div>
            
            <div>
              <h4 className="text-[#647693] text-xs mb-2 font-valorant">DETAILS</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[#647693] text-xs mb-1">DATE</div>
                  <div className="text-white text-sm">{tournament.date}</div>
                </div>
                <div>
                  <div className="text-[#647693] text-xs mb-1">TIME</div>
                  <div className="text-white text-sm">{tournament.time}</div>
                </div>
                <div>
                  <div className="text-[#647693] text-xs mb-1">PLAYERS</div>
                  <div className="text-white text-sm">{tournament.players}</div>
                </div>
                <div>
                  <div className="text-[#647693] text-xs mb-1">PRIZE POOL</div>
                  <div className="text-white text-sm">{tournament.prizePool}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Creator info */}
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-[#647693]">
              <img src={tournament.avatar} alt="Creator" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-[#647693] text-xs mb-0.5 font-valorant">TOURNAMENT CREATOR</div>
              <div className="text-white text-sm">{tournament.creator}</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button className="group relative bg-primary/90 text-white flex items-center h-12 w-full">
              <div className="absolute left-0 top-0 bg-primary/60 h-full w-0 transition-all duration-300 ease-out group-hover:w-12"></div>
              <div className="h-12 w-full flex items-center justify-between">
                <span className="relative px-4 z-10 font-custom font-normal tracking-wider text-white uppercase">
                  {tournament.buttonText || "Join Tournament"}
                </span>
                <span className="text-white font-custom transition-all duration-300 transform translate-x-0 group-hover:translate-x-1 mr-4">
                  →
                </span>
              </div>
            </button>
            
            <button 
              onClick={onClose} 
              className="group relative bg-[#1f2731] text-white flex items-center h-12 w-full"
            >
              <div className="h-12 w-full flex items-center justify-center">
                <span className="font-custom font-normal tracking-wider text-white uppercase">
                  Close
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TournamentCard = ({ 
  badgeText = "Tournament", 
  badgeColor = "bg-primary", 
  badgeIcon = "⭐",
  avatarSrc = "https://i.pravatar.cc/100", 
  creatorName = "Tournament Creator",
  tournament = {} 
}) => {
  const [showModal, setShowModal] = useState(false);
  
  const handleMoreDetails = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      <div className="block w-full font-pilot">
        <div className="w-full h-28 sm:h-72 md:h-64 relative overflow-hidden bg-[#040714]">
          {/* Background image without grayscale hover effect */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('${tournament.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Consistent overlay instead of fades */}
          <div className="absolute inset-0 bg-black/50 z-10"></div>

          {/* Content */}
          <div className="relative h-full p-4 sm:p-5 md:p-6 flex flex-col justify-between z-20">
            {/* Badge positioned at top right */}
            <div className="absolute top-0 right-0 z-30">
              <span className={`${badgeColor} text-xs py-1.5 px-2 font-valorant text-white w-fit flex items-center gap-1`}>
                <span>{badgeIcon}</span> {badgeText}
              </span>
            </div>
            
            {/* Top section */}
            <div>
              <div className="flex flex-col gap-2 sm:gap-3 mb-2">
                <h2 className="text-white font-valorant text-lg sm:text-xl font-light line-clamp-2 sm:line-clamp-2">
                {tournament.title}
                </h2>
              </div>
            </div>

            {/* Bottom section with stats and button */}
            <div className="flex flex-col sm:flex-row sm:items-center text-sm -mx-4 sm:-mx-5 md:-mx-6 -mb-4 sm:-mb-5 md:-mb-6 font-semibold">
              {/* Stats section */}
              <div className="grid grid-cols-3 sm:flex sm:items-center px-4 sm:px-0 mb-4 sm:mb-0 transform -translate-y-2">
                {/* Avatar and creator name - Improved avatar display */}
                <div className="flex items-center sm:pl-6 sm:mr-8 md:mr-11">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-3 border-2 border-white shadow-lg bg-white flex-shrink-0">
                    <img src={avatarSrc} alt={creatorName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    {/* <div className="text-white text-xs font-bold uppercase tracking-wider">Creator</div> */}
                    <div className="text-white text-sm font-medium line-clamp-2">{creatorName}</div>
                  </div>
                </div>

                <div className="sm:mr-8 md:mr-11">
                  <div className="text-[#647693] text-xs mb-1 font-valorant"></div>
                  <div className="text-white text-sm"></div>
                </div>
              </div>

              {/* Button */}
              <button
                onClick={handleMoreDetails}
                className="group relative bg-primary/90 my-2 text-white sm:ml-auto flex items-center h-12 w-full sm:w-auto"
              >
                <div className="h-12 w-full flex items-center justify-between">
                  <span className="relative px-4 z-10 font-custom font-normal tracking-wider text-white uppercase">
                    More Details
                  </span>
                  <span
                    className="text-white font-custom mr-4"
                  >
                    →
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal */}
      <TournamentModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        tournament={{
          title: tournament.title,
          badge: badgeText,
          badgeColor: badgeColor,
          badgeIcon: badgeIcon,
          creator: creatorName,
          avatar: avatarSrc,
          description: tournament.description,
          date: tournament.date,
          time: tournament.time,
          players: tournament.players,
          prizePool: tournament.prizePool,
          buttonText: tournament.buttonText,
          ...tournament
        }}
      />
    </>
  );
};

const ImageCardGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Improved filters matching the categories in the mobile app image
  const filters = [
    { id: 'all', label: 'Tous', icon: '⭐' },
    { id: 'sport', label: 'Sport', color: 'bg-red-500', icon: '🏆' },
    { id: 'hebergement', label: 'Hebergement', color: 'bg-orange-500', icon: '🏠' },
    { id: 'sante', label: 'Sante', color: 'bg-blue-500', icon: '🩺' },
    { id: 'loisir', label: 'Loisir', color: 'bg-yellow-500', icon: '🎮' }
  ];

  // Original items based on the youth services app image
  const originalItems = [
    {
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      title: 'Pass Jeunes Sante Tournament',
      description: 'Rejoignez le tournoi organisé par Omnidoc qui réunit des jeunes passionnés par les questions de santé. Vous avez entre 18 et 30 ans? Participez à notre compétition pour gagner une couverture santé complète pour une année entière. Les équipes s\'affronteront dans des défis d\'innovation en matière de santé numérique.',
      link: '/tournaments/pass-jeunes',
      badge: 'Sante',
      badgeColor: 'bg-blue-500',
      badgeIcon: '🩺',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      creator: ' Universite Mohammed VI Polytechnique',
      date: 'Juin 15, 2025',
      time: '15:00 GMT',
      players: '48/64',
      prizePool: '25,000 MAD',
      buttonText: 'S\'inscrire maintenant',
      category: 'sante'
    },
    {
      image: 'https://images.unsplash.com/photo-1568952433726-3896e3881c65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      title: 'Morocco Digital Academy Challenge',
      description: 'L\'Académie Numérique du Maroc vous invite à participer à son tournoi de programmation. Rejoignez la 3ème cohorte et démontrez vos compétences en développement, intelligence artificielle et cybersécurité. Les finalistes pourront intégrer notre programme de formation d\'élite et les gagnants recevront des bourses complètes.',
      link: '/tournaments/digital-academy',
      badge: 'Loisir',
      badgeColor: 'bg-yellow-500',
      badgeIcon: '🎮',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      creator: 'Universite Mohammed VI Polytechnique',
      date: 'Mars 31, 2025',
      time: '09:00 GMT',
      players: '126/200',
      prizePool: 'Bourses d\'études',
      buttonText: 'Postuler',
      category: 'loisir'
    },
    {
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      title: 'Prix Maroc Jeunesse Championship',
      description: 'Le prestigieux tournoi annuel du Prix Maroc Jeunesse réunissant les talents marocains dans diverses disciplines: arts, sciences, entrepreneuriat et innovation sociale. Les participants auront l\'occasion de présenter leurs projets devant un jury de renommée nationale et internationale, avec à la clé des financements importants.',
      link: '/tournaments/prix-jeunesse',
      badge: 'Sport',
      badgeColor: 'bg-red-500',
      badgeIcon: '🏆',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      creator: 'Fondation Prix Maroc Jeunesse',
      date: 'Mai 20, 2025',
      time: '14:00 GMT',
      players: '78/150',
      prizePool: '100,000 MAD',
      buttonText: 'Soumettre un projet',
      category: 'sport'
    },
    {
      image: 'https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1173&q=80',
      title: 'Al Omrane Gaming Challenge',
      description: 'Une offre exclusive pour les jeunes gamers! Al Omrane et le Pass jeunes s\'unissent pour vous proposer un tournoi exceptionnel avec des prix immobiliers à la clé. Gagnez des réductions sur l\'achat de votre premier logement ou même un appartement pour le grand vainqueur. Ouvert aux joueurs de 21 à 35 ans.',
      link: '/tournaments/al-omrane',
      badge: 'Hebergement',
      badgeColor: 'bg-orange-500',
      badgeIcon: '🏠',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      creator: 'Groupe Al Omrane',
      date: 'Février 28, 2025',
      time: '18:00 GMT',
      players: '500/500',
      prizePool: 'Appartement + Réductions',
      buttonText: 'Voir les résultats',
      category: 'hebergement'
    },
  ];

  // Additional items
  const additionalItems = [
    // Sport category items
    {
      image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      title: 'Championnat National des Jeunes Footballeurs',
      description: 'Le plus grand tournoi de football pour les jeunes au Maroc. Organisé par la Fédération Royale Marocaine de Football, ce championnat offre aux talents de 15 à 18 ans l\'opportunité d\'être repérés par des recruteurs professionnels. Les matchs se dérouleront dans plusieurs villes du royaume.',
      link: '/tournaments/football-jeunes',
      badge: 'Sport',
      badgeColor: 'bg-red-500',
      badgeIcon: '🏆',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      creator: 'Fédération Royale Marocaine de Football',
      date: 'Juillet 10-25, 2025',
      time: 'Divers horaires',
      players: '320/400',
      prizePool: 'Contrats professionnels + 50,000 MAD',
      buttonText: 'Inscrire mon équipe',
      category: 'sport'
    },
    {
      image: 'https://images.unsplash.com/photo-1551280857-2b9bbe52acf4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      title: 'Marathon de Casablanca Jeunes',
      description: 'Édition spéciale pour les jeunes de 16 à 25 ans du célèbre Marathon de Casablanca. Parcours de 10km à travers les quartiers emblématiques de la ville. Un excellent moyen de découvrir la métropole tout en pratiquant une activité sportive. Des bourses sportives seront offertes aux meilleurs coureurs.',
      link: '/tournaments/marathon-casa',
      badge: 'Sport',
      badgeColor: 'bg-red-500',
      badgeIcon: '🏆',
      avatar: 'https://images.unsplash.com/photo-1618082382324-e29ec1e6d784?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80',
      creator: 'Casablanca Events & Animation',
      date: 'Septembre 5, 2025',
      time: '07:00 GMT',
      players: '578/1500',
      prizePool: 'Bourses sportives + Équipements',
      buttonText: 'Réserver ma place',
      category: 'sport'
    },

    // Sante category items
    {
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      title: 'Hackathon Sante Digitale',
      description: 'Un weekend d\'innovation pour réinventer la santé numérique au Maroc. Organisé par le Ministère de la Santé en partenariat avec des startups e-santé, ce hackathon invite les jeunes développeurs, designers et professionnels de santé à créer des solutions innovantes pour améliorer l\'accès aux soins.',
      link: '/tournaments/hackathon-sante',
      badge: 'Sante',
      badgeColor: 'bg-blue-500',
      badgeIcon: '🩺',
      avatar: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80',
      creator: 'Ministère de la Sante',
      date: 'Août 12-14, 2025',
      time: '09:00 GMT',
      players: '156/200',
      prizePool: 'Financement de 250,000 MAD',
      buttonText: 'Inscrire mon équipe',
      category: 'sante'
    },
    {
      image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      title: 'Tournoi des Futurs Medecins',
      description: 'Compétition académique destinée aux étudiants en médecine de tout le royaume. Organisée par l\'Association des Étudiants en Médecine du Maroc, ce tournoi teste les connaissances médicales et les compétences pratiques des participants à travers plusieurs épreuves théoriques et mises en situation cliniques.',
      link: '/tournaments/futurs-medecins',
      badge: 'Sante',
      badgeColor: 'bg-blue-500',
      badgeIcon: '🩺',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1464&q=80',
      creator: 'Association des Étudiants en Medecine',
      date: 'Octobre 22-24, 2025',
      time: '10:00 GMT',
      players: '240/300',
      prizePool: 'Stages internationaux + Équipements médicaux',
      buttonText: 'Vérifier mon éligibilité',
      category: 'sante'
    },

    // Hebergement category items
    {
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      title: 'Concours d\'Architecture Durable',
      description: 'Imaginez l\'habitat étudiant de demain! Le Groupe Al Omrane lance un concours d\'architecture destiné aux étudiants et jeunes diplômés pour concevoir des logements étudiants écologiques et abordables. Les projets devront intégrer des solutions innovantes tout en respectant le patrimoine architectural marocain.',
      link: '/tournaments/architecture-durable',
      badge: 'Hebergement',
      badgeColor: 'bg-orange-500',
      badgeIcon: '🏠',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      creator: 'Groupe Al Omrane & École d\'Architecture',
      date: 'Avril 15 - Juillet 30, 2025',
      time: 'Soumission en ligne',
      players: '182/250',
      prizePool: 'Réalisation du projet + 200,000 MAD',
      buttonText: 'Soumettre mon projet',
      category: 'hebergement'
    },
    {
      image: 'https://images.unsplash.com/photo-1542629458-eaa56d608062?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      title: 'Camp Immobilier Jeunesse',
      description: 'Premier salon immobilier dédié exclusivement aux jeunes de 25 à 35 ans. Visitez les stands des promoteurs proposant des offres spéciales pour l\'acquisition d\'un premier logement. Bénéficiez de conseils personnalisés, d\'ateliers sur le financement et participez à la loterie pour gagner l\'acompte de votre futur appartement!',
      link: '/tournaments/camp-immobilier',
      badge: 'Hebergement',
      badgeColor: 'bg-orange-500',
      badgeIcon: '🏠',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80',
      creator: 'Fédération des Promoteurs Immobiliers',
      date: 'Mai 5-8, 2025',
      time: '10:00-19:00 GMT',
      players: '720/1000',
      prizePool: 'Acompte immobilier + Réductions exclusives',
      buttonText: 'Réserver mon badge',
      category: 'hebergement'
    },

    // Loisir category items
    {
      image: 'https://images.unsplash.com/photo-1511882150382-421056c89033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80',
      title: 'Festival du Film Jeunesse Marocain',
      description: 'Le plus grand concours de courts-métrages réalisés par les jeunes talents marocains de moins de 30 ans. Présentez votre œuvre dans l\'une des catégories: fiction, documentaire, animation ou téléphone portable. Les films sélectionnés seront projetés lors d\'un festival à Marrakech en présence de grands noms du cinéma.',
      link: '/tournaments/festival-film',
      badge: 'Loisir',
      badgeColor: 'bg-yellow-500',
      badgeIcon: '🎮',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      creator: 'Centre Cinématographique Marocain',
      date: 'Novembre 10-15, 2025',
      time: 'Projections diverses',
      players: '289/400',
      prizePool: 'Production professionnelle + 150,000 MAD',
      buttonText: 'Soumettre mon film',
      category: 'loisir'
    },
    {
      image: 'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80',
      title: 'E-Sports Morocco Cup',
      description: 'Le plus grand tournoi d\'e-sports du royaume organisé en partenariat avec la Fédération Royale Marocaine des Jeux Électroniques. Compétitions sur plusieurs jeux populaires: FIFA, Fortnite, League of Legends et Valorant. Les finales se tiendront en présentiel à Casablanca avec retransmission en direct sur les chaînes nationales.',
      link: '/tournaments/esports-cup',
      badge: 'Loisir',
      badgeColor: 'bg-yellow-500',
      badgeIcon: '🎮',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      creator: 'Fédération Royale Marocaine des Jeux Électroniques',
      date: 'Décembre 3-5, 2025',
      time: 'Horaires variés',
      players: '2560/3000',
      prizePool: '500,000 MAD + Équipements Gaming',
      buttonText: 'Rejoindre la compétition',
      category: 'loisir'
    }
  ];

  // Combine original and additional items
  const items = [...originalItems, ...additionalItems];

  // Updated filter function to use the category field
  const filteredItems = items.filter(item => {
    const matchesFilter = activeFilter === 'all' || item.category === activeFilter.toLowerCase();
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container-fluid text-white min-h-screen pb-12 px-0">
    {/* Gaming-focused title with "pass gamers" reference */}
<h3
  className="text-4xl p-6 pb-4 sm:text-5xl lg:text-6xl text-white tracking-wider font-custom 
            text-left sm:text-left leading-tight"
>
  Pass Gamers
  <br />
  <span className="text-primary">SURPASS & TRIUMPH</span>
</h3>
      {/* Search and Filter section */}
      <div className="mx-16 mb-8">
        {/* Search bar */}
        <div className="relative mb-6">
          <input
           type="text"
           placeholder="Rechercher par mot-clé..."
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
           className="w-full bg-[#0f1923] angular-cut border border-[#1f2731] text-white py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
         />
         <svg 
           className="absolute right-3 top-3.5 w-5 h-5 text-[#647693]" 
           fill="none" 
           stroke="currentColor" 
           viewBox="0 0 24 24" 
           xmlns="http://www.w3.org/2000/svg"
         >
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
         </svg>
       </div>

       {/* Filter badges */}
       <div className="flex flex-wrap gap-3 mb-6">
         {filters.map((filter) => (
           <button
             key={filter.id}
             onClick={() => setActiveFilter(filter.id)}
             className={`px-4 py-2 font-valorant text-sm angular-cut transition-all flex items-center gap-2 ${
               activeFilter === filter.id
                 ? filter.color || 'bg-primary'
                 : 'bg-[#0f1923] border border-[#1f2731]'
             }`}
           >
             <span>{filter.icon}</span> {filter.label}
           </button>
         ))}
       </div>
     </div>

     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-16">
       {filteredItems.map((item, index) => (
         <TournamentCard 
           key={index} 
           badgeText={item.badge} 
           badgeColor={item.badgeColor}
           badgeIcon={item.badgeIcon}
           avatarSrc={item.avatar}
           creatorName={item.creator}
           tournament={item}
         />
       ))}
     </div>
   </div>
 );
};

export default ImageCardGrid;