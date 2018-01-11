const axios = require('axios')
const { stringify } = require('querystring')

module.exports = async options => {
  if (!options) {
    throw Error('Missing required input: options')
  }
  if (!options.url) {
    throw Error('Missing required input: options.url')
  }
  if (!options.credentials) {
    throw Error('Missing required input: options.credentials')
  }
  if (!options.credentials.auth) {
    throw Error('Missing required input: options.credentials.auth')
  }
  if (!options.credentials.auth.username) {
    throw Error('Missing required input: options.credentials.auth.username')
  }
  if (!options.credentials.auth.password) {
    throw Error('Missing required input: options.credentials.auth.password')
  }
  if (!options.credentials.client) {
    throw Error('Missing required input: options.credentials.client')
  }
  if (!options.credentials.client.client_id) {
    throw Error('Missing required input: options.credentials.client.client_id')
  }
  if (!options.credentials.client.client_secret) {
    throw Error('Missing required input: options.credentials.client.client_secret')
  }

  const { url, credentials } = options

  try {
    const { data } = await axios.post(url + '?' + stringify(credentials.client), stringify(credentials.auth))
    return data
  } catch (error) {
    throw error
  }
}
