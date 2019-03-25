export class User {

    firstName: string;
    lastName: string;
    avatarSrc: string;

    constructor(obj?: any) {
        this.firstName = obj && obj.firstName || null;
        this.lastName = obj && obj.lastName || null;
        this.avatarSrc = obj && obj.avatarSrc || null;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
