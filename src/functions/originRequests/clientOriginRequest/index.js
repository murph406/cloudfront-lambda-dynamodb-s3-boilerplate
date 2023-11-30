'use strict'

exports.handler = (event, context, callback) => {
  const request = event.Records[0].cf.request

  if (request.uri.indexOf('.') === -1) {
    request.uri = '/index.html'
  }

  callback(null, request)
}