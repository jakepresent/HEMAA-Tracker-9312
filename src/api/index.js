import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api"
});

export const createMember = payload => api.post(`/member/create`, payload);
export const getMemberByEmail = email => api.get(`/member/find/${email}`);

const apis = {
  createMember,
  getMemberByEmail
};

export default apis;
