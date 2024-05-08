import { Effect } from "./effect";
import { genreId } from "./genreEnum";

export class Power
{
    name:string;
    genre:genreId;
    description:string;
    damage:number;
    isSingleTarget:boolean;
    effect:Effect|undefined;
    effectChance:number|undefined;
    effectIntensity:number|undefined;
    effectDuration:number|undefined;
    evolutionOf:Power|undefined;
    constructor(
        name:string,
        genre:genreId,
        description:string,
        damage:number,
        isSingleTarget:boolean,
        effect:Effect|undefined,
        effectChance:number|undefined,
        effectIntensity:number|undefined,
        effectDuration:number|undefined,
        evolutionOf:Power|undefined)
    {
        this.name=name;
        this.genre=genre;
        this.description=description;
        this.damage=damage;
        this.isSingleTarget=isSingleTarget;
        this.effect=effect;
        this.effectChance=effectChance;
        this.effectIntensity=effectIntensity;
        this.effectDuration=effectDuration;
        this.evolutionOf=evolutionOf;
    }
}