// CreatePage.js
import React, { useState } from 'react';
import Logo from '../Logo'; // Assuming you have a Logo component
import axios from 'axios';
import { Link } from 'react-router-dom';
const CreateFeed = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [serverOutput, setServerOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [shortUrl, setShortUrl] = useState('')

  const redirectToExternalWebsite = async () => {
    window.open(`http://localhost:5173/${shortUrl}`, '_blank');
  };


  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      // Replace the URL with your backend API endpoint for short URL generation
      const config = {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json', // Specify the content type
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Include any additional headers, e.g., Authorization
          // Add other headers as needed
        },
      };
      const response = await axios.post('http://localhost:5000/api/v1/urls/generate-url', { url: originalUrl }, config)
      console.log(response.data)
      const { data } = response.data
      console.log(response.data.message)
      // Assuming the server returns the short URL or an error message
      if (response.data.success) {
        setServerOutput(`Generated Short Url: http://localhost:5173/${data.shortUrl}`);
        setShortUrl(data.shortUrl)
        console.log(shortUrl)

      }

    } catch (error) {
      console.error('Error:', error.message);
      setServerOutput('An error occurred while generating the short URL.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center pt-[10%] h-screen p-6 bg-gray-200" >
      <div className='relative'>
      <div className='w-[50%] fixed right-80'>
        <div className="flex items-center justify-center mb-8">
          <Logo />
        </div>

        <div className="mb-4">
          <label className="text-gray-600 font-semibold mb-2" htmlFor="originalUrl">
            Original URL:
          </label>
          <input
            type="text"
            id="originalUrl"
            className="border rounded mt-2 px-3 py-2 w-full bg-gray-700 text-white"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
        </div>

        <div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate'}
          </button>
        </div>

        {serverOutput && (
          <div className="mt-8">

            <p className="text-green-600 font-semibold">
              <span style={{ cursor: 'pointer' }} onClick={redirectToExternalWebsite}>{serverOutput}</span>
            </p>


          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default CreateFeed;
