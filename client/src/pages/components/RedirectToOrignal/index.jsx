import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const Redirector = () => {
    const { shortUrl } = useParams();
    console.log(shortUrl)
    useEffect(()=>{
        (async () => {
        // Fetch the original URL from your server based on the short URL
        // Replace 'https://your-api-endpoint.com/short-url/' with your actual API endpoint
        try {
            const response = await axios.get(`http://localhost:5000/api/v1/urls/short-url/${shortUrl}`)
            const { redirectUrl } = response?.data?.data
            if(redirectUrl)
            {
                console.log(redirectUrl)
                window.location.href = redirectUrl
            }
       
        } catch (error) {
            console.error('Error fetching data:', error);
        }


    })()
}, []);

    // You can render a loading spinner or message while waiting for the redirect
    return (
        <div className="flex items-center justify-center h-screen text-white">
            Redirecting...
        </div>
    );
};

export default Redirector;