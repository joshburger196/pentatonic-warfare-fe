export const instruments:{"id":string,"name":string}[]=
[
    {"id":"I000","name":"Guitar"},
    {"id":"I001","name":"Voice"},
    {"id":"I002","name":"Bass"},
    {"id":"I003","name":"Drums"}
]

export function getInstByID(id:string):string
{
    let length=instruments.length;

    for(let i=0;i<length;i++)
        if(id===instruments[i].id)
            return instruments[i].name
    
    throw new Error(`Instrument with id ${id} not found`)
}