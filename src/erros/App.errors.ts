class AppError extends Error {
    constructor(public message: string, public statusCode: number){
        super(message);
        this.name = this.constructor.name;
    };

    static badRequest(message = "Invalid request"){
        return new AppError(`${message}`, 400);
    }

    static unauthorized(message = "acess not authorized"){
        return new AppError(`${message}`, 401);
    };

    static notFound(entity = "Recurso"){
        return new AppError(`${entity} not found`, 404);
    };

    static conflict(message = "Conflito de dados"){
        return new AppError(`${message}`, 409);
    };
};

export {AppError};