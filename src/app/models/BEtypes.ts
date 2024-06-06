export interface musicianBEType
{
    id:string,
    template:string,
    genre:string,
    instrument:string,
    found_by:string,
    name:string,
    description:string,
    lvl:number,
    exp:number,
    hp:number,
    def:number,
    atk:number,
    acc:number,
    spd:number,
    tech_1:string,
    tech_2:string,
    tech_3:string|undefined,
    tech_4:string|undefined
}

export function isValidMusicianData(musician:any): musician is musicianBEType
{
  return typeof musician.id === "string" &&
    typeof musician.template === "string" &&
    typeof musician.genre === "string" &&
    typeof musician.instrument === "string" &&
    typeof musician.found_by === "string" &&
    typeof musician.name === "string" &&
    typeof musician.description === "string" &&
    typeof musician.lvl === "number" &&
    typeof musician.exp === "number" &&
    typeof musician.hp === "number" &&
    typeof musician.def === "number" &&
    typeof musician.atk === "number" &&
    typeof musician.acc === "number" &&
    typeof musician.spd === "number" &&
    typeof musician.tech_1 === "string" &&
    typeof musician.tech_2 === "string" &&
    (typeof musician.tech_3 === "string" || musician.tech_3 === null)&&
    (typeof musician.tech_4 === "string" || musician.tech_4 === null)
}

export interface techniqueBEType
{
    id:string,
    name:string,
    genre:string,
    instrument:string,
    description:string,
    is_single_target:number,
    damage:number|null,
    effect:string|null,
    evolution_of:string|null,
}

export function isValidTechniqueData(technique:any): technique is techniqueBEType
{
  return typeof technique.id === "string" &&
    typeof technique.name === "string" &&
    typeof technique.genre === "string" &&
    typeof technique.instrument === "string" &&
    typeof technique.description === "string" &&
    typeof technique.is_single_target === "number" &&
    (typeof technique.damage === "number" || technique.damage===null)  &&
    (typeof technique.effect === "string" || technique.effect===null) &&
    (typeof technique.evolution_of === "string" || technique.evolution_of===null)   
}

export interface accountBEType
{
    id:string,
    name:string,
    exp:number,
    lvl:number
}

export function isValidAccountData(account:any): account is accountBEType
{
  return typeof account.id === "string" &&
    typeof account.name === "string" &&
    typeof account.exp === "number" &&
    typeof account.lvl === "number"
}