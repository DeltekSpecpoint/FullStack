import axios from 'axios'

const webApi = axios.create({
  baseURL: "https://localhost:44305/api/Contact"
})

export default webApi