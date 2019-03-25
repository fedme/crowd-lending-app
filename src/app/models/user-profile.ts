export class UserProfile {

    id: string;
    firstName: string;
    lastName: string;
    email: string;
    picture: string;

    constructor(obj?: any) {
        this.id = obj && obj.sub || null;
        this.firstName = obj && obj.given_name || null;
        this.lastName = obj && obj.family_name || null;
        this.email = obj && obj.email || null;
        this.picture = obj && obj.picture || null;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
