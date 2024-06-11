import { Technique } from "./technique";

export class GameAssets
{
    techinques:Technique[];
    constructor(
        techniques:Technique[]
    )
    {
        this.techinques=techniques;
    }
}