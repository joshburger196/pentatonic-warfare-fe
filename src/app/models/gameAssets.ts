import { Effect } from "./effect";
import { MusicianTemplate } from "./musicianTemplate";
import { Technique } from "./technique";

export class GameAssets
{
    techinques:Technique[];
    musicianTemplates:MusicianTemplate[];
    constructor(
        techniques:Technique[],
        musicianTemplates:MusicianTemplate[],
    )
    {
        this.techinques=techniques;
        this.musicianTemplates=musicianTemplates;
    }
}