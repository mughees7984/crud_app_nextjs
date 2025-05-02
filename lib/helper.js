const BASE_URL = "https://crud-app-nextjs-ten.vercel.app";

export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/api/users`);
  const json = await response.json();
  return json;
};

// Single User
export const getUser = async (userId) => {
  const response = await fetch(`${BASE_URL}/api/users/${userId}`);
  const json = await response.json();
  return json ?? {};
};

//posting a  new user
export const addUser = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

// updating a user
export const updateUser = async (userId, formData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};


// deleting a user
export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};
