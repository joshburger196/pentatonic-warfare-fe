import { Rarity } from "src/app/models/rarity";

export const rarities:Rarity[]=
[
    new Rarity("R000","Beginner","#b8b8b8",false),
    new Rarity("R001","Hobbyist","#ffffff",false),
    new Rarity("R002","Jammer","#278021",true),
    new Rarity("R003","Pro","#072b73",true),
    new Rarity("R004","Virtuoso","#de46e3",true),
    new Rarity("R005","Legend","#e6b52e",true)
]

export function getRarity(id:string):Rarity
{
    let length=rarities.length;

    for(let i=0;i<length;i++)
        if(id===rarities[i].id)
            return rarities[i]
    
    throw new Error(`Rarity with id ${id} not found`)

}