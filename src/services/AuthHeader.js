export default function authHeader() {
    const token = JSON.parse(localStorage.getItem('token'));
  
    if (token) {
      return {
        Authorization: "Bearer " + token,
        'Content-Type': 'text/plain;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      };
    } else {
      return {
        'Content-Type': 'text/plain;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      };
    }
  }