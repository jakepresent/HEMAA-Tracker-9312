import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api"
});

export const createMember = payload => api.post(`/member/create`, payload);
export const getMemberByEmail = email => api.get(`/member/find/${email}`);
<<<<<<< HEAD
export const loginAdmin = () => api.get(`admin/login`);

=======
export const loginAdmin = payload => api.post(`admin/login`, payload);
>>>>>>> c44d3259f15a6e67d9bd6297800045a56925a689

const apis = {
  createMember,
  getMemberByEmail,
  loginAdmin
};

export default apis;
