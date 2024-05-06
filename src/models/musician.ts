import { genreId } from "./genreEnum";
import { Instrument } from "./instrument";
import { Power } from "./power";
import { Stats } from "./stats";

export class Musician
{
    name:string;
    genre:genreId;
    secondGenre:genreId|null;
    instrument:Instrument;
    secondInstrument:Instrument|null;
    possiblePowers:Power[];
    knownPowers:Power[];
    exp:number;
    lvl:number;
    baseStats:Stats;
    battleStats:Stats;
    constructor
    (
        name:string,
        genre:genreId,
        secondGenre:genreId|null,
        instrument:Instrument,
        secondInstrument:Instrument|null,
        possiblePowers:Power[],
        knownPowers:Power[],
        exp:number,
        lvl:number,
        baseStats:Stats,
        battleStats:Stats,
    )
    {
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