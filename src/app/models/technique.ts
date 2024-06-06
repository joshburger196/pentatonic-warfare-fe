import { Effect } from "./effect";
import { genreId } from "./genreEnum";

export class Technique
{
    id:string;
    name:string;
    genre:string;
    instrument:string;
    description:string;
    damage:number|null;
    isSingleTarget:boolean;
    effect:string|null;
    evolutionOf:string|null;
    constructor(
        id:string,
        name:string,
        genre:string,
        instrument:string,
        description:string,
        damage:number|null,
        isSingleTarget:boolean,
        effect:string|null,
        evolutionOf:string|null)
    {
        this.id=id;
        this.name=name;
        this.genre=genre;
        this.instrument=instrument;
        this.description=description;
        this.damage=damage;
        this.isSingleTarget=isSingleTarget;
        this.effect=effect;
        this.evolutionOf=evolutionOf;
    }
}