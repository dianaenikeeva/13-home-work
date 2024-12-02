export async function fetchUsers() {
  try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const users = await response.json();
      return users;
      console.error('There has been a problem with your fetch operation:', error);
      throw error; 
  }
}