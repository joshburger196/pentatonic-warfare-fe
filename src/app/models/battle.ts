import { LocalStorageService } from "../services/local-storage.service";
import { Musician } from "./musician";
import { Band } from "./band";

interface turnObj
{
    musician:Musician,
    band:string
}

export class Battle
{
    atkBand:Band;
    defBand:Band;

    roundIndex=0; //number of times that all musicians in all bands took a turn
    turnIndex=0;  //index of the current turn taker (cycles through turnArray)
    turnArray:turnObj[]=[];

    constructor(atkBand:Band,defBand:Band)
    {
        this.atkBand=atkBand;
        atkBand.musicianIds.forEach(musicianId => {
            let musicianToPush=LocalStorageService.getMusician(musicianId)
            let objectToPush={"musician":musicianToPush,"band":atkBand.id}
            this.turnArray.push(objectToPush)
        });

        this.defBand=defBand;
        defBand.musicianIds.forEach(musicianId => {
            let musicianToPush=LocalStorageService.getMusician(musicianId)
            let objectToPush={"musician":musicianToPush,"band":defBand.id}
            this.turnArray.push(objectToPush)
        });

        this.sortMusicianTurns();

        /*console.log(`Creating battle object.
            atkBand:${JSON.stringify(this.atkBand)}
            defBand:${JSON.stringify(this.defBand)}
            turnArray:${JSON.stringify(this.turnArray)}`)*/
    }

    private sortMusicianTurns()
    {
        //this.turnArray=this.mergesortMusicianTurns(this.turnArray)

        this.turnArray=this.turnArray.sort((turnObj1,turnObj2)=>
        {
            //sort by spd
            if(turnObj1.musician.battleStats.spd>turnObj2.musician.battleStats.spd)
                return -1
            else if(turnObj1.musician.battleStats.spd<turnObj2.musician.battleStats.spd)
                return 1

            //if spd is equal then sort by id
            else if(turnObj1.musician.id<turnObj2.musician.id)
                return -1
            else (turnObj1.musician.id>turnObj2.musician.id)
                return 1
        })

        /*for(let i=0;i<this.turnArray.length;i++)
            console.log(`Musician #${i} : ${this.turnArray[i]}`)*/
    }

    public getMusiciansByBand(bandId:string):Musician[]
    {
        var band:Band;
        var musicianArray:Musician[]=[];

        if(bandId===this.atkBand.id)
            band=this.atkBand;
        else if(bandId===this.defBand.id)
            band=this.defBand;
        else
            throw new Error(`Cannot find band with id ${bandId}`);

        for(var i=0; i<band.musicianIds.length; i++)
        {
            let j=0;
            let musicianFound=false;
            while(!musicianFound && j<this.turnArray.length)
            {
                if(this.turnArray[j].musician.id===band.musicianIds[i])
                {
                    musicianFound=true;
                    musicianArray.push(this.turnArray[j].musician);
                }
                j++;
            }
        }
        return musicianArray;
    }

    public getMusiciansByOwner(accountId:string):Musician[]
    {
        var band:Band;
        var musicianArray:Musician[]=[];

        if(accountId===this.atkBand.ownerId)
            band=this.atkBand;
        else if(accountId===this.defBand.ownerId)
            band=this.defBand;
        else
            throw new Error(`Cannot find band owned by account with id ${accountId}`);

        for(var i=0; i<band.musicianIds.length; i++)
        {
            let j=0;
            let musicianFound=false;
            while(!musicianFound && j<this.turnArray.length)
            {
                if(this.turnArray[j].musician.id===band.musicianIds[i])
                {
                    musicianFound=true;
                    musicianArray.push(this.turnArray[j].musician);
                }
                j++;
            }
        }
        return musicianArray;
    }

    public getOpponentsOfOwner(accountId:string):Musician[]
    {
        //identical to getMusiciansByOwner except the opponent band is returned.
        var band:Band;
        var musicianArray:Musician[]=[];

        if(accountId===this.atkBand.ownerId)
            band=this.defBand; //only change
        else if(accountId===this.defBand.ownerId)
            band=this.atkBand; //only change
        else
            throw new Error(`Cannot find band owned by account with id ${accountId}`);

        for(var i=0; i<band.musicianIds.length; i++)
        {
            let j=0;
            let musicianFound=false;
            while(!musicianFound && j<this.turnArray.length)
            {
                if(this.turnArray[j].musician.id===band.musicianIds[i])
                {
                    musicianFound=true;
                    musicianArray.push(this.turnArray[j].musician);
                }
                j++;
            }
        }
        return musicianArray;
    }

    /*executeTech(
        battle:Battle,
        idSelectedMusician:string,
        idTech:string,
        idSelectedTarget:string
    ):{battle:Battle,messages:string[]}
    {

        let attacker:Musician=battle.band1[iSelectedMusician];
        let tech:Technique=this.lsService.getTechnique(techID);
        let defender:Musician=battle.band2[iSelectedMusician];

        let resultMsgs:string[]=[];

        //if inflicts damage
        if(tech.damage!=null)
        {
            //damage calculation variables
            let isCritical=false;
            let isEffective=false;
            let isIneffective=false;

            //check if critical or fail
            //probability variables
            let successRoll=Math.random()*100;
            let successThreshold=100/attacker.battleStats.acc;
            let criticalThreshold=100-attacker.battleStats.acc;

            if(successRoll<successThreshold)
            {
            console.log("Failure! o.o")
            return {"battle":battle,"messages":["Failure!"]};
            }

            console.log("Success");
            if(successRoll>=criticalThreshold)
            {
            isCritical=true;
            console.log("Critical success!")
            resultMsgs.push("Critical performance!")
            }

            //check genre effectiveness
            isEffective=this.isGenreEffective(tech.genre,defender.genre);
            isIneffective=this.isGenreIneffective(tech.genre,defender.genre);

            if(isEffective)
            {
            resultMsgs.push("It's super effective!")
            }
            else if(isIneffective)
            {
            resultMsgs.push("It's not very effective...")
            }

            //check atk vs def
            let advantageRatio=attacker.battleStats.atk/defender.battleStats.def

            //spark of randomness
            //(yet to be implemented)
            let accuracyModifier=attacker.battleStats.acc*Math.random()
            
            //inflict damage
            let damageToInflict=tech.damage*advantageRatio
            battle.band2[iSelectedTarget].battleStats.hp-=damageToInflict;
            console.log(`${defender.name} takes ${damageToInflict} damage!`);

            resultMsgs.push(`${defender.name} takes ${damageToInflict} damage!`)
        }

        //Whatever has happened, the attacker has consumed his turn
        battle.band1[iSelectedMusician].hasAlreadyTakenTurn=true;

        return {"battle":battle,"messages":resultMsgs};
    }

    isGenreEffective(atkGenreId:string,defGenreId:string):boolean
    {
    let atkGenre=getGenre(atkGenreId);
    let effectiveAgainst=atkGenre.effectiveAgainst;
    let isEffective=effectiveAgainst.find(genre=>genre===defGenreId)!=undefined;
    return isEffective;
    }
    isGenreIneffective(atkGenreId:string,defGenreId:string)
    {
    let atkGenre=getGenre(atkGenreId);
    let ineffectiveAgainst=atkGenre.ineffectiveAgainst;
    let isIneffective=ineffectiveAgainst.find(genre=>genre===defGenreId)!=undefined;
    return isIneffective;
    }*/
}