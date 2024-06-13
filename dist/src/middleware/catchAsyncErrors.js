const catchAsyncErrors = (callback) => (req, res, next) => {
    Promise.resolve(callback(req, res, next)).catch(next);
};
export default catchAsyncErrors;
