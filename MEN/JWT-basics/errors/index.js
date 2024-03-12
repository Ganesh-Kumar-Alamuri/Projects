const BadRequestError = require('./badRequest')
const UnauthenticatedError = require('./unauthorizederror')
const customAPIError = require('./custom-error')

module.exports = {
    BadRequestError,
    UnauthenticatedError,
    customAPIError
}