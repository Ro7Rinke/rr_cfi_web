export const HTTP_METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
    OPTIONS: 'OPTIONS'
}

export const VERSION = 'v0.5.3'
export const BUILD_NUMBER = Number(process.env.REACT_APP_BUILD_NUMBER)
export const IS_DEBUG = process.env.REACT_APP_DEBUG === 'true'