import { Rarity } from "src/app/models/rarity";

export const rarities:Rarity[]=
[
    new Rarity("R000","Beginner","#ff5100",false),
    new Rarity("R001","Hobbyist","#9e0008",true),
    new Rarity("R002","Jammer","#002b8f",true),
    new Rarity("R003","Pro","#d6d6d6",false),
    new Rarity("R004","Virtuoso","#ff5100",false),
    new Rarity("R005","Legend","#ff51ff",false)
]