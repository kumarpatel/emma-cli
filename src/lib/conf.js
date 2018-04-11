import Conf from 'conf'

const defaults = {
  token: null,
}

const config = new Conf({
  projectName: 'emmapkg',
  configName: 'emmacli',
  encryptionKey: 'v19j8',
  defaults,
})

// Helpers

export function saveAuthToken(token) {
  config.set('token', token)
}

export function getAuthToken() {
  return config.get('token')
}

export function resetAuthToken() {
  return config.delete('token')
}
