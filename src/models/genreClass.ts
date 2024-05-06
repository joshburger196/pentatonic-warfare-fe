import { genreId } from "./genreEnum";

export class Genre
{
    id:genreId;
    color:string;
    isColorDark:boolean;
    effectiveAgainst:genreId[];
    ineffectiveAgainst:genreId[];

    constructor
    (
        id:genreId,
        color:string,
        isColorDark:boolean,
        effectiveAgainst:genreId[],
        ineffectiveAgainst:genreId[],
    )
    {
        this.id=id;
        this.color=color;
        this.isColorDark=isColorDark;
        this.effectiveAgainst=effectiveAgainst;
        this.ineffectiveAgainst=ineffectiveAgainst;
    }
}