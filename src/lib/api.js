import axios from 'axios'

export const fetchUsers = () =>
  axios.get('https://dummyjson.com/users?limit=20').then(res => res.data.users)

export const fetchUserById = id =>
  axios.get(`https://dummyjson.com/users/${id}`).then(res => res.data)
