const URL = '' //running in the cloud, with docker
// const URL = 'http://localhost:8000' //running locally
const API_VERSION = 'v1'

export const API_PATHS = {
  movies: `${URL}/${API_VERSION}/movies/paginated`,
  users: `${URL}/${API_VERSION}/users`,
  userSession: `${URL}/${API_VERSION}/user-session`
}