import { hash } from 'bcryptjs';

export class User {
    private _password: string;

    constructor(
        private readonly _email: string,
        private readonly _name: string,
        private readonly _surname: string,
    ) {}

    get name(): string {
        return this._name;
    }

    get surname(): string {
        return this._surname;
    }

    get email(): string {
        return this._email;
    }

    get password() {
        return this._password;
    }

    public async setPassword(value: string, salt: number): Promise<void> {
        this._password = await hash(value, Number(salt));
        console.log(this._password);
    }
}