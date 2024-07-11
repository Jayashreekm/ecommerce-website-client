// utility function to authenticate user
export function isAuthenticated() {
  return !!localStorage.getItem('userId');
}

// common header properties for async requests
export function getHeader() {
  return ({
    "Content-Type": "application/json",
    user_id: localStorage.getItem('userId'),
  });
}

// Fetching user name from local storage
export function getUserName() {
  return localStorage.getItem('name');
}

// Statically stored categories list
export function getCategories() {
  return ([
    'chairs','tables','dining-tops'
  ]);
}

// First letter capitalizing
export function capitalize(word) {
  if (word.length === 0) { return word; }
  return word.charAt(0).toUpperCase()
  + word.slice(1);
}


