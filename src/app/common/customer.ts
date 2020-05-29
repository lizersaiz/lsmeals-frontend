export class Customer {

    private _id: string;
    private _firstName: string;
    private _lastName: string;
    private _email: string;
    private _phone: string;
    private _userPass: string;

    constructor(firstName?: string, lastName?: string, email?: string, phone?: string, userPass?: string){
      this._firstName = firstName;
      this._lastName = lastName;
      this._email = email;
      this._phone = phone;
      this._userPass = userPass;
    }

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get firstName(): string {
        return this._firstName;
    }
    public set firstName(value: string) {
        this._firstName = value;
    }
    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(value: string) {
        this._lastName = value;
    }
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
    public get phone(): string {
        return this._phone;
    }
    public set phone(value: string) {
        this._phone = value;
    }
    public get userPass(): string {
        return this._userPass;
    }
    public set userPass(value: string) {
        this._userPass = value;
    }
}
