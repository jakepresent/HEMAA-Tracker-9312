import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const getMemberByEmail = (email) => api.get(`/member/find/${email}`);
export const updateMembers = (token) =>
  api.post(`member/update`, null, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
export const loginAdmin = (payload) => api.post(`admin/login`, payload);

const apis = {
  getMemberByEmail,
  updateMembers,
  loginAdmin,
};

export default apis;
