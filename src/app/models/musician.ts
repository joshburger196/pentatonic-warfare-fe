import { Technique } from "./technique";
import { Stats } from "./stats";

export class Musician
{
    id:string;
    name:string;
    template:string;
    description:string;
    genre:string;
    instrument:string;
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
        name:string,
        template:string,
        description:string,
        genre:string,
        instrument:string,
        knownTechniques:string[],
        exp:number,
        lvl:number,
        baseStats:Stats,
    )
    {
        this.id=id;
        this.name=name;
        this.template=template;
        this.description=description;
        this.genre=genre;
        this.instrument=instrument;
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
                typeof(obj.name)==="string" &&
                typeof(obj.template)==="string" &&
                typeof(obj.description)==="string" &&
                typeof(obj.genre)==="string" &&
                typeof(obj.instrument)==="string" &&
                typeof(obj.exp)==="number" &&
                typeof(obj.lvl)==="number" &&
                typeof(obj.baseStats.hp)==="number" &&
                typeof(obj.baseStats.def)==="number" &&
                typeof(obj.baseStats.atk)==="number" &&
                typeof(obj.baseStats.acc)==="number" &&
                typeof(obj.baseStats.spd)==="number"
    }
}