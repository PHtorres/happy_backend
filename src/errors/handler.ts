import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface IValidationErrors {
    [key: string]: string[]
}

const errorHander: ErrorRequestHandler = (error, request, response, next) => {
    if (error instanceof ValidationError) {
        let errors: IValidationErrors = {};
        error.inner.forEach(item => {
            errors[item.path] = item.errors
        });

        return response.status(400).json({message:'Validation fails', errors});
    }
    console.error(error);
    return response.status(500).json({ message: 'Erro interno no servidor' })
}

export default errorHander;