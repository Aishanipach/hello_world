import { useEffect, useState } from 'react';

type Card = {
  title?: string;
  description: string;
  repo?: string;
  // add other properties as needed
};

type Repo = {
  name: string;
  updated_at: string;
  description : string;
  // add other fields if needed
};

const PolaroidCards = ({ cards = [] }) => {
  const [selectedCard, setSelectedCard] = useState<Card & { index: number } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (card: Card, index: number) => {
    setSelectedCard({ ...card, index });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };
 
  const [defaultCards, setDefaultCards] = useState<Card[]>([]);

  useEffect(() => {
    // Step 1: Fetch all repos for the user
    fetch(`https://api.github.com/users/Aishanipach/repos`)
      .then(res => res.json())
      .then(async (repos: Repo[]) => {
        // Step 2: Filter repos with '-proj' in the name
        // const projRepos = repos.filter(repo => repo.name.includes('-proj'));
          const sortedRepos = repos.sort(
            (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );


          // Filter out the repo named "Aishanipach"
          const filteredRepos = sortedRepos.filter(repo => repo.name !== "Aishanipach");
          console.log("__", filteredRepos)
         
          const projRepos = filteredRepos.filter(repo => repo.name.includes('-xg'));

        // Step 3: Fetch README first line for each repo
          const cards: Card[] = await Promise.all(
          projRepos.map(async (repo) => {
            try {
              const res = await fetch(`https://api.github.com/repos/Aishanipach/${repo.name}/readme`);
              const data = await res.json();

              let title = repo.name; // default fallback

              if (data && data.content) {
                const readme = atob(data.content.replace(/\s/g, ''));
                const firstLine = readme.split('\n').find(line => line.trim().length > 0);
                if (firstLine) {
                  title = firstLine;
                }
              }

              return {
                title,
                description: repo.description || 'No description',
                repo: repo.name,
              };

            } catch {
              return {
                title: repo.name,
                description: repo.description || 'No description',
                repo: repo.name,
              };
            }
          })
        );

        console.log(cards.filter(Boolean))
        setDefaultCards(cards.filter(Boolean));
      });
  }, []);
const designCards = [
    { description: "ocean waves kissing the shore" },
    { description: "autumn leaves painting the ground" },
    { description: "fresh flowers blooming in spring" },
    { description: "web: simple auth flow & database mgmt" },
  ];

  const cardsToRender = cards.length > 0 ? cards : defaultCards;
  const designToRender = cards.length > 0 ? cards : designCards;

  if(defaultCards.length===0) return <div>Loading...</div>;

  
  return (
    <>
      {/* Google Font Import */}
      <link
        href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap"
        rel="stylesheet"
      />
      
      <div className="min-h-screenp-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-10 text-left">
            tech & ai <span className="inline-block w-2 h-2 bg-gray-800 rounded-full ml-1" style={{verticalAlign: 'middle'}}></span>
          </h1>
          
          <div className="grid grid-cols-4 gap-6">
            {cardsToRender.map((card, index) => (
              <div
                key={index}
                className={`
                  bg-white shadow-lg hover:shadow-xl transition-all duration-300
                  transform hover:scale-105 cursor-pointer relative
                  ${index % 2 === 0 ? 'rotate-2' : '-rotate-2'}
                  hover:rotate-0
                `}
                style={{
                  filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15))',
                  width: '240px',
                  height: '320px',
                  padding: '12px 12px 48px 12px'
                }}
                onClick={() => openModal(card, index)}
              >
                {/* Image area */}
                <div className="w-full h-60 bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Subtle photo effects */}
                  <div className="absolute top-2 left-2 w-4 h-4 bg-white opacity-20 rounded-full"></div>
                  <div className="absolute bottom-2 right-2 w-2 h-2 bg-white opacity-10 rounded-full"></div>
                </div>
                
                {/* Description text - positioned at bottom like real polaroid */}
                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <p 
                    className="text-gray-700 text-base leading-tight"
                    style={{ 
                      fontFamily: "'Shadows Into Light', cursive",
                      textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                    }}
                  >
                    {card.repo}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
        </div>

        <div className="mb-15"></div>
        <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-left">
            design <span className="inline-block w-2 h-2 bg-gray-800 rounded-full ml-1" style={{verticalAlign: 'middle'}}></span>
          </h1>

          </div>
          <div className="grid grid-cols-4 gap-6">
            {designToRender.map((card, index) => (
              <div
                key={index}
                className={`
                  bg-white shadow-lg hover:shadow-xl transition-all duration-300
                  transform hover:scale-105 cursor-pointer relative
                  ${index % 2 === 0 ? 'rotate-2' : '-rotate-2'}
                  hover:rotate-0
                `}
                style={{
                  filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15))',
                  width: '240px',
                  height: '320px',
                  padding: '12px 12px 48px 12px'
                }}
                onClick={() => openModal(card, index)}
              >
                {/* Image area */}
                <div className="w-full h-60 bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Subtle photo effects */}
                  <div className="absolute top-2 left-2 w-4 h-4 bg-white opacity-20 rounded-full"></div>
                  <div className="absolute bottom-2 right-2 w-2 h-2 bg-white opacity-10 rounded-full"></div>
                </div>
                
                {/* Description text - positioned at bottom like real polaroid */}
                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <p 
                    className="text-gray-700 text-base leading-tight"
                    style={{ 
                      fontFamily: "'Shadows Into Light', cursive",
                      textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                    }}
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        {/* Modal */}
        {isModalOpen && selectedCard && (
          <div 
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
             style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
            onClick={closeModal}
          >
            <div 
              className="bg-white p-6 pb-16 shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
              style={{
                filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.3))'
              }}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
              >
                ×
              </button>

              {/* Large image area */}
              <div className="w-full h-80 bg-gradient-to-br from-gray-200 to-gray-300 mb-6 relative overflow-hidden">
                {/* <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-gray-400 rounded-full flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div> */}
                
                {/* Subtle photo effects */}
                {/* <div className="absolute top-3 left-3 w-6 h-6 bg-white opacity-20 rounded-full"></div>
                <div className="absolute bottom-3 right-3 w-3 h-3 bg-white opacity-10 rounded-full"></div> */}
              </div>
              
              {/* Description text */}
              <div className="text-center">
                <p 
                  className="text-gray-700 text-xl leading-relaxed"
                  style={{ 
                    fontFamily: "'Shadows Into Light', cursive",
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                  }}
                >
                  {selectedCard.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PolaroidCards;