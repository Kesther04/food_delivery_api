// logger Middleware
const logger = async (req,res,next) => {
    const start = Date.now();
    
    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms) `)
    });

    next();
}

export default logger;