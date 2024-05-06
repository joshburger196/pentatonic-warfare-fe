import { Effect } from "./effect";
import { genreId } from "./genreEnum";

export class Power
{
    name:string;
    type:genreId;
    description:string;
    damage:number;
    isSingleTarget:boolean;
    effect:Effect|null;
    effectChance:number|null;
    effectIntensity:number|null;
    effectDuration:number|null;
    evolutionOf:Power|null;
    constructor(
        name:string,
        type:genreId,
        description:string,
        damage:number,
        isSingleTarget:boolean,
        effect:Effect|null,
        effectChance:number|null,
        effectIntensity:number|null,
        effectDuration:number|null,
        evolutionOf:Power|null)
    {
        this.name=name;
        this.type=type;
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