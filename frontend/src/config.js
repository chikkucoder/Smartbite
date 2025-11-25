// Use relative URL for production (same domain as frontend)
// Use localhost for development
const API_URL = process.env.REACT_APP_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname !== 'localhost' 
    ? '' 
    : 'http://localhost:5000');

export default API_URL;
