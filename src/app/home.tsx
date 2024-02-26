import React, { useState, useEffect } from 'react';
import { MyTabs } from '@/components/Tabs';

interface Location {
  id: number;
  name: string;
  type: string;
  residents: string[];
}

interface Resident {
  id: number;
  name: string;
  status: string;
}

const Home: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/location');
      const data = await response.json();
      setLocations(data.results);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-8">Rick and Morty Locations</h1>
      <MyTabs />
      <input
        type="text"
        placeholder="Search locations..."
        value={searchQuery}
        onChange={handleSearchInputChange}
        className="w-full p-2 border rounded-md mb-4"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredLocations.map(location => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
    </div>
  );
};

interface LocationCardProps {
  location: Location;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  // Slice the first 5 residents
  const firstFiveResidents = location.residents.slice(0, 5);

  return (
    <div className="bg-white rounded-md shadow-md hover:shadow-lg transition duration-300">
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{location.name}</h2>
        <p className="text-gray-600">Type: {location.type}</p>
        <h3 className="font-bold mt-2">Residents:</h3>
        <ul>
          {firstFiveResidents.map(residentUrl => (
            <Resident key={residentUrl} residentUrl={residentUrl} />
          ))}
        </ul>
      </div>
    </div>
  );
};

interface ResidentProps {
  residentUrl: string;
}

const Resident: React.FC<ResidentProps> = ({ residentUrl }) => {
  const [resident, setResident] = useState<Resident | null>(null);

  useEffect(() => {
    const fetchResident = async () => {
      try {
        const response = await fetch(residentUrl);
        const data = await response.json();
        setResident(data);
      } catch (error) {
        console.error('Error fetching resident:', error);
      }
    };

    fetchResident();
  }, [residentUrl]);

  if (!resident) return null;

  return (
    <li>
      {resident.name} - Status: {resident.status}
    </li>
  );
};

export default Home;
