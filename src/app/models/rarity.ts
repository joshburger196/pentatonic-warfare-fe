export class Rarity
{
    id:string;
    name:string;
    color:string;
    isColorDark:boolean;

    constructor
    (
        id:string,
        name:string,
        color:string,
        isColorDark:boolean,
    )
    {
        this.id=id;
        this.name=name;
        this.color=color;
        this.isColorDark=isColorDark;
    }
}