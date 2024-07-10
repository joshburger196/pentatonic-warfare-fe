export interface musicianBEType
{
    id:string,
    template:string,
    genre:string,
    instrument:string,
    rarity:string,
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
    typeof musician.rarity === "string" &&
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
    ally_effect:string|null,
    ally_effect_intensity:number|null,
    is_ally_single_target:number|null,
    damage:number|null,
    opponent_effect:string|null,
    opponent_effect_intensity:number|null,
    opponent_effect_probability:number|null,
    is_opponent_single_target:number|null,
    evolution_of:string|null,
}

export function isValidTechniqueData(technique:any): technique is techniqueBEType
{
  return typeof technique.id === "string" &&
    typeof technique.name === "string" &&
    typeof technique.genre === "string" &&
    typeof technique.instrument === "string" &&
    typeof technique.description === "string" &&
    (typeof technique.ally_effect === "string" || technique.ally_effect===null)  &&
    (typeof technique.ally_effect_intensity === "number" || technique.ally_effect_intensity===null) &&
    (typeof technique.damage === "number" || technique.damage===null)  &&
    (typeof technique.opponent_effect === "string" || technique.opponent_effect===null) &&
    (typeof technique.opponent_effect_intensity === "number" || technique.opponent_effect_intensity===null) &&
    (typeof technique.opponent_effect_probability === "number" || technique.opponent_effect_probability===null) &&
    (typeof technique.is_opponent_single_target === "number" || technique.is_opponent_single_target===null) &&
    (typeof technique.evolution_of === "string" || technique.evolution_of===null)   
}

export interface accountBEType
{
    id:string,
    name:string,
    exp:number,
    lvl:number
}

export function isValidAccountInfoData(data:any): data is accountBEType
{
  return typeof data.id === "string" &&
    typeof data.name === "string" &&
    typeof data.exp === "number" &&
    typeof data.lvl === "number"
}

export interface templateBEType
{
  id:string;
  name:string;
  description:string
  rarity:string;
  genre:string;
  instrument:string;
  base_hp:number;
  base_def:number;
  base_atk:number;
  base_acc:number;
  base_spd:number;
}

export function isValidTemplateData(data:any): data is templateBEType
{
  return typeof data.id==="string" &&
    typeof data.name==="string" &&
    typeof data.description==="string" &&
    typeof data.rarity==="string" &&
    typeof data.genre==="string" &&
    typeof data.instrument==="string" &&
    typeof data.base_hp==="number" &&
    typeof data.base_def==="number" &&
    typeof data.base_atk==="number"&&
    typeof data.base_acc==="number"&&
    typeof data.base_spd==="number";
}

export interface learnableTechniqueBEType
{
  musician_template_id:string;
  technique_id:string;
}

export function isValidLearnableTechData(data:any):data is learnableTechniqueBEType
{
  return typeof data.musician_template_id==="string" &&
    typeof data.technique_id === "string";
}

export interface effectsBEType
{
  id:string;
  name:string;
  description:string;
  intensity:string;
}

export interface gameAssetsBEType
{
  techniques:techniqueBEType[];
  musician_templates:templateBEType[];
  learnable_techniques:learnableTechniqueBEType[];
  effects:effectsBEType[];
}

export function isValidGameAssetsData(gameAssets:any): gameAssets is gameAssetsBEType
{
  //To implement
  return true;
}
