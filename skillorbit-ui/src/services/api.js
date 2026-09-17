// ✅ Get token helper
const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
};

// ✅ Create User
export const createUser = async (user) => {
  const response = await fetch('/api/users', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader()
    },
    body: JSON.stringify(user)
  });

  return handleResponse(response);
};

// ✅ Get Users
export const getUsers = async () => {
  const response = await fetch('/api/users', {
    headers: {
      ...getAuthHeader()
    }
  });

  return handleResponse(response);
};

// ✅ Delete User
export const deleteUser = async (id) => {
  const response = await fetch(`/api/users/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeader()
    }
  });

  return handleResponse(response);
};

// ✅ COMMON RESPONSE HANDLER
const handleResponse = async (response) => {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API Error: ${response.status} - ${text}`);
  }
  return response.json();
};