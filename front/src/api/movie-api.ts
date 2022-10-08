import axios from 'axios'

import { API_PATHS } from '@/constants/api-paths'
import type { Movie } from '@/models/movie'

import productList from './productList.json'

const fetchPaginated = async (token: string): Promise<any> => {
  return axios
    .get(`${API_PATHS.movies}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => res.data)
    .catch(e => {
      console.log(e)
      return productList;      
    })
}

export const movieApi = {
  fetchPaginated
}