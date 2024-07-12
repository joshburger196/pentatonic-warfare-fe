import { Musician } from "./musician";

export class Battle
{
    band1:Musician[];
    band2:Musician[];
    roundNumber=0;
    constructor(band1:Musician[],band2:Musician[])
    {
        this.band1=band1;
        this.band2=band2;
    }
}