import bcrypt from 'bcrypt';

export class CustomError extends Error {
    constructor(path) {
        super("Custom error");
        this.name = "CustomError";
        this.path = path;
    }
}

export const hashPW = async(password) => {
    const saltRound = 10
    const hash = await bcrypt.hash(password, saltRound)
    return hash
}

export const checkPW = async (password, hash) => {
    const saltRound = 10
    return await bcrypt.compare(password, hash);
}



