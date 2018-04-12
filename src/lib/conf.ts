const Conf = require('conf')

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

export function saveAuthToken(token: string) {
  config.set('token', token)
}

export function getAuthToken() {
  return config.get('token')
}

export function resetAuthToken() {
  return config.delete('token')
}
