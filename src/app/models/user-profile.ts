export class UserProfile {

    id: string;
    firstName: string;
    lastName: string;
    email: string;

    constructor(obj?: any) {
        this.id = obj && obj.sub || null;
        this.firstName = obj && obj.given_name || null;
        this.lastName = obj && obj.family_name || null;
        this.email = obj && obj.email || null;
    }
}
