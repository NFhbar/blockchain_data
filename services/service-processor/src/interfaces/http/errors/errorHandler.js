/* eslint-disable */
import Status from 'http-status'

export default (err, req, res, next) => {
    res.status(Status.INTERNAL_SERVER_ERROR).json({
        type: 'InternalServerError',
        message: 'The server failed to handle this request'
    })
}