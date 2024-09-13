import { Account } from "./account";

export class Band
{
    id:string;
    name:string;
    ownerId:string;
    musicianIds:string[]

    constructor
    (
        id:string,
        name:string,
        owner:string,
        musicians:string[]
    )
    {
        this.id=id;
        this.name=name;
        this.ownerId=owner;
        this.musicianIds=musicians;
    }
}