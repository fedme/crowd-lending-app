import { User } from './user';

export class Project {
    collectedAmount: number;
    coverImageSrc: string;
    createdAt: Date;
    description: string;
    id: string;
    interestRate: number;
    name: string;
    owner: User;
    requestedAmount: number;

    get fundedPercentage() {
        if (this.collectedAmount === 0) {
            return 0;
        }
        return Math.round(this.collectedAmount * 100 / this.requestedAmount);

    }

    constructor(obj?: any) {
        this.collectedAmount = obj && obj.collectedAmount || null;
        this.coverImageSrc = obj && obj.coverImageSrc || null;
        this.createdAt = obj && new Date(obj.createdAt) || null;
        this.description  = obj && obj.description || null;
        this.id = obj && obj.id || null;
        this.interestRate = obj && obj.interestRate || null;
        this.name = obj && obj.name || null;
        this.requestedAmount = obj && obj.requestedAmount || null;
        this.owner = obj && new User(obj.owner) || null;
    }
}
