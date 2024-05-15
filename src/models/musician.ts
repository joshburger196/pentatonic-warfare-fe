import { genreId } from "./genreEnum";
import { Instrument } from "./instrument";
import { Power } from "./power";
import { Stats } from "./stats";

export class Musician
{
    id:string;
    name:string;
    genre:genreId;
    secondGenre:genreId|undefined;
    instrument:Instrument;
    secondInstrument:Instrument|undefined;
    possiblePowers:Power[];
    knownPowers:Power[];
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
        genre:genreId,
        secondGenre:genreId|undefined,
        instrument:Instrument,
        secondInstrument:Instrument|undefined,
        possiblePowers:Power[],
        knownPowers:Power[],
        exp:number,
        lvl:number,
        baseStats:Stats,
        battleStats:Stats,
    )
    {
        this.id=id;
        this.name=name;
        this.genre=genre;
        this.secondGenre=secondGenre;
        this.instrument=instrument;
        this.secondInstrument=secondInstrument;
        this.possiblePowers=possiblePowers;
        this.knownPowers=knownPowers;
        this.exp=exp;
        this.lvl=lvl;
        this.baseStats=baseStats;
        this.battleStats=battleStats;
    }
}