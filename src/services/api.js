const API_URL = "http://localhost:8000/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    "x-role": "admin", // required by backend
  };
};

export const authAPI = {
  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },
};

export const bookAPI = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/books/bookLists`, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    return res.json();
  },

  create: async (bookData) => {
    const res = await fetch(`${API_URL}/books/add-book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(bookData),
    });
    return res.json();
  },
  update: async (id, bookData) => {
  const res = await fetch(`${API_URL}/books/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(bookData),
  });
  return res.json();
},

  delete: async (id) => {
  const res = await fetch(`${API_URL}/books/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeader(),
    },
  });
  return res.json();
},

};

