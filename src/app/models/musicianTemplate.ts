import { Stats } from "./stats";

export class MusicianTemplate
{
    id:string;
    name:string;
    description:string;
    rarity:string;
    genre:string;
    instrument:string;
    baseStats:Stats;
    learnableTechniques:string[]=[]
    constructor(
        id:string,
        name:string,
        description:string,
        rarity:string,
        genre:string,
        instrument:string,
        baseStats:Stats,
    )
    {
        this.id=id;
        this.name=name;
        this.description=description;
        this.rarity=rarity;
        this.genre=genre;
        this.instrument=instrument;
        this.baseStats=baseStats;
    }
}