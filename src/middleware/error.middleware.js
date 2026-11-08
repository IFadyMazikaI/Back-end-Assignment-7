export const globalErrorHandler = (err, req, res, next) => {
    return res.status(err.cause?.status ?? 500).json({ 
        err,
        stack: err.stack,
    });
}