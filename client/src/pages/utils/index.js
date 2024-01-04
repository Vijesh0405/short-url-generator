import axios from "axios";

const config = {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json', // Specify the content type
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Include any additional headers, e.g., Authorization
      // Add other headers as needed
    },
  };

  const getCookie = async (name)=> {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/users/get-cookie',config)

      if(response.data.success){
        const {accessToken,refreshToken} = response.data.data
        if(name==="accessToken" && accessToken){
          return true
        }
        if(name==="refreshToken" && refreshToken){
          return true
        }
        return false
      }
    } catch (error) {
      console.log("error occured when fetching cookies from server ",error)
    }
  }
  export {getCookie}