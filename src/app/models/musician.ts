import { Stats } from "./stats";

export class Musician
{
    id:string;
    template:string;
    owner:string;
    genre:string;
    instrument:string;
    rarity:string;
    name:string;
    description:string;
    learnableTechniques:string[]|undefined;
    knownTechniques:string[];
    exp:number;
    lvl:number;
    baseStats:Stats;
    battleStats:Stats;

    hasAlreadyTakenTurn:boolean=false;
    targetable:boolean=true;
    constructor
    (
        id:string,
        genre:string,
        instrument:string,
        rarity:string,
        template:string,
        owner:string,
        name:string,
        description:string,
        knownTechniques:string[],
        exp:number,
        lvl:number,
        baseStats:Stats,
    )
    {
        this.id=id;
        this.genre=genre;
        this.instrument=instrument;
        this.rarity=rarity;
        this.template=template;
        this.owner=owner;
        this.name=name;
        this.description=description;
        this.knownTechniques=knownTechniques;
        this.exp=exp;
        this.lvl=lvl;
        this.baseStats=baseStats;
        this.battleStats=baseStats;
    }

    static isValidMusicianObj(obj:any)
    {
        //if it's an array, check each element individually
        if(Array.isArray(obj))
        {
            for(let i=0; i<obj.length; i++)
            {
                if(!this.isValidMusicianObj(obj[i]))
                    return false; //if one single invalid element is found
            }
            return true; //if all elements are valid
        }
        else
        //if it's not an array, check if it has the musician fields
            return typeof(obj.id)==="string" &&
                typeof(obj.genre)==="string" &&
                typeof(obj.instrument)==="string" &&
                typeof(obj.rarity)==="string" &&
                typeof(obj.template)==="string" &&
                typeof(obj.owner)==="string" &&
                typeof(obj.name)==="string" &&
                typeof(obj.description)==="string" &&
                typeof(obj.exp)==="number" &&
                typeof(obj.lvl)==="number" &&
                typeof(obj.baseStats.hp)==="number" &&
                typeof(obj.baseStats.def)==="number" &&
                typeof(obj.baseStats.atk)==="number" &&
                typeof(obj.baseStats.acc)==="number" &&
                typeof(obj.baseStats.spd)==="number"
    }
}