class AppError extends Error {
    constructor(public message: string, public statusCode: number = 400){
        super(message);
        this.name = this.constructor.name;
    };

    static notFound(entity = "Recurso"){
        return new AppError(`${entity} not found`, 404);
    };

    static conflict(message = "Conflito de dados"){
        return new AppError(`${message}`, 409);
    };

    static unauthorized(message = "acess not authorized"){
        return new AppError(`${message}`, 401);
    };
};

export {AppError};