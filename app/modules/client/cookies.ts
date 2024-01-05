/**
 * Позволяет получить cookie
 * @param name Имя cookie
 * @returns {any}
 */
export const getCookie = (name: string): string | undefined => {
  const matches = window.document.cookie.match(new RegExp(
    '(?:^|; )' + name.replace(/([.$?*|{}()[]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    // '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
  ))
  return matches ? decodeURIComponent(matches[1]) : undefined
}

type DefaultOptions = {
  path: string,
  expires?: Date | string | boolean
  'max-age'?: number
}

/**
 * Устанавливает cookie
 * @param name Имя cookie
 * @param value Значение cookie
 * @param options Объект опций
 */
export const setCookie = (name: string, value: number | string, options = {}): void => {
  const defaultOptions: DefaultOptions = {
    path: '/',
    // при необходимости добавьте другие значения по умолчанию
    ...options
  }

  if (defaultOptions.expires instanceof Date) {
    defaultOptions.expires = defaultOptions.expires.toUTCString()
  }

  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + (location.hostname === 'rg.ru' ? '; SameSite=None; Secure' : '')

  for (const optionKey in defaultOptions) {
    updatedCookie += '; ' + optionKey
    const optionValue = defaultOptions[optionKey as keyof typeof defaultOptions]
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue
    }
  }

  window.document.cookie = updatedCookie
}

/**
 * Удаляет cookie по имени
 * @param name Имя cookie
 */
export const deleteCookie = (name: string): void => {
  setCookie(name, '', {
    'max-age': -1
  })
}
