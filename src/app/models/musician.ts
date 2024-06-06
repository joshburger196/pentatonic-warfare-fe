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
    learnableTechniques:Technique[]|undefined;
    knownTechniques:Technique[];
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
        knownTechniques:Technique[],
        exp:number,
        lvl:number,
        baseStats:Stats,
        battleStats:Stats,
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
        this.battleStats=battleStats;
    }
}