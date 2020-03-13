import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api"
});

export const createMember = payload => api.post(`/member/create`, payload);
export const getMemberByEmail = email => api.get(`/member/find/${email}`);
export const loginAdmin = payload => api.post(`admin/login`, payload);

const apis = {
  createMember,
  getMemberByEmail,
  loginAdmin
};

export default apis;
