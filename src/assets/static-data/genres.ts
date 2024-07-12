import { Genre } from "src/app/models/genreClass";

export const genres:Genre[]=
[
    new Genre("G000","Rock","#ff5100",false,[],[]),
    new Genre("G001","Metal","#9e0008",true,[],[]),
    new Genre("G002","Blues","#002b8f",true,[],[]),
    new Genre("G003","Pop","#d6d6d6",false,[],[]),
    new Genre("G004","Jazz","#ff5100",false,[],[]),
    new Genre("G005","Prog","#ff5100",false,[],[]),
    new Genre("G006","Psych","#ff5100",false,[],[]),
    new Genre("G007","Funk","#ff5100",false,[],[]),
    new Genre("G008","Wild","#ff5100",false,[],[])
]

export function getGenre(id:string)
{
  //console.log(`Debugging Runtime Assets:${JSON.stringify(LocalStorageService.runtimeAssets)}`)
  //to implement: [if id is valid tech ID]
  const genreToGet=genres.find(genre=>genre.id===id)
  if(genreToGet!=undefined)
    return genreToGet;
  else
    throw new Error(`Genre with id ${id} not found in static assets.`);
}