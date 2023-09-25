// components/TaskForm.js
import React, { useState } from 'react';

const TaskForm = () => {
  const [selectedCities, setSelectedCities] = useState([]);

  const handleCheckboxChange = (cityName) => {
    const updatedCities = [...selectedCities];

    if (updatedCities.includes(cityName)) {
      updatedCities.splice(updatedCities.indexOf(cityName), 1);
    } else {
      updatedCities.push(cityName);
    }

    setSelectedCities(updatedCities);
  };

  const getCheckboxValue = (cityName) => {
    return selectedCities.includes(cityName) ? cityName : '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let response = await fetch('http://localhost:1500/api/tasks', {
        method: 'POST',
        body: JSON.stringify({ selectedCities }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let result=await await response.json();
  
      if (result) {
        console.log('Selected cities saved:', result);
        setSelectedCities([]);
      } else {
        console.error('Error saving selected cities:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving selected cities:', error);
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="checkbox"
            checked={selectedCities.includes('Shimla')}
            onChange={() => handleCheckboxChange('Shimla')}
            value={getCheckboxValue('Shimla')}  
          />
          Shimla
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedCities.includes('Delhi')}
            onChange={() => handleCheckboxChange('Delhi')}
            value={getCheckboxValue('Delhi')}  
          />
          Delhi
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedCities.includes('Mumbai')}
            onChange={() => handleCheckboxChange('Mumbai')}
            value={getCheckboxValue('Mumbai')}  
          />
          Mumbai
        </label>
        {/* Add more cities as needed */}
        <button type="submit">Save Selected Cities</button>
      </form>

      {/* Display selected cities */}
      <div>
        <h2>Selected Cities:</h2>
        <ul>
          {selectedCities.map((city, index) => (
            <li key={index}>{city}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskForm;
