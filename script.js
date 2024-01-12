let storyBox = document.getElementById('story-section');
let imageBox = document.getElementById('image-section');
let choiceSection = document.getElementById('choices');
let chapter=0;
let certainChoices = {};
let images = {
    intro: 'start/intro.jpg',
    cabin: 'outside/cabin.jpg',
    door: 'outside/door.jpg',
    kitchen:{
        allBowls:               'kitchen/kitchen-allBowls.jpg',
        noBowls:                'kitchen/kitchen-noBowls.jpg',
        smallBowl:              'kitchen/kitchen-smallBowl.jpg',
        mediumBowl:             'kitchen/kitchen-mediumBowl.jpg',
        largeBowl:              'kitchen/kitchen-largeBowl.jpg',
        smallAndMediumBowls:    'kitchen/kitchen-smallAndMediumBowls.jpg',
        smallAndLargeBowls:     'kitchen/kitchen-smallAndLargeBowls.jpg',
        mediumAndlargeBowls:    'kitchen/kitchen-mediumAndLargeBowls.jpg'
    },
    livingroom:{
        allChairs:               'livingroom/livingroom-allChairs.jpg',
        noChairs:                'livingroom/livingroom-noChairs.jpg',
        smallChair:              'livingroom/livingroom-smallChair.jpg',
        mediumChair:             'livingroom/livingroom-mediumChair.jpg',
        largeChair:              'livingroom/livingroom-largeChair.jpg',
        smallAndMediumChairs:    'livingroom/livingroom-smallAndMediumChairs.jpg',
        smallAndLargeChairs:     'livingroom/livingroom-smallAndLargeChairs.jpg',
        mediumAndlargeChairs:    'livingroom/livingroom-mediumAndLargeChairs.jpg'
    },
    bedroom:{
        allBeds:               'bedroom/bedroom-allBeds.jpg',
        noBeds:                'bedroom/bedroom-noBeds.jpg',
        smallBed:              'bedroom/bedroom-smallBed.jpg',
        mediumBed:             'bedroom/bedroom-mediumBed.jpg',
        largeBed:              'bedroom/bedroom-largeBed.jpg',
        smallAndMediumBeds:    'bedroom/bedroom-smallAndMediumBeds.jpg',
        smallAndLargeBeds:     'bedroom/bedroom-smallAndLargeBeds.jpg',
        mediumAndlargeBeds:    'bedroom/bedroom-mediumAndLargeBeds.jpg'
    },
    pond:{
        bearsFishing: 'pond/pond-with-bears.jpg'
    }

}
const setUpStartVariables = () =>{
    certainChoices = {
        hasKnockedOnTheDoor:false,
        eatenFirstBowl:false,
        eatenSecondBowl:false,
        eatenThirdBowl:false,
        amountOfBowlsEaten:0,
        largeChairBroken:false,
        mediumChairBroken:false,
        smallChairBroken:false,
        chairsBroken:0,
        damageControl:0,
        ending: ''
        
    }
}

/**
 * 
 * @param {*} choices - antingen en lista med objekt, eller ett objekt, innehållande:{bName(namn på switch case värdet), bContent (texten till knappen)}
 * @returns 
 */
const createChoices = (choices) =>{
    let result = '';
    let defaultValue = 'default';
    if(choices !== null){
        for(let i=0; i < choices.length; i++){
            result +=`<button class="option" name="${choices[i].name === undefined ? defaultValue : choices[i].name}" onclick="choicePressed(event)">${choices[i].content}</button>`;
        }

    }
    return result;
}
const updateImage = (imageName = null) =>{

    imageBox.innerHTML = imageName === null ? '' : `<img src="./img/${imageName}" alt="illustrering av vad som händer på skärmen"/>`;
}
/**
 * 
 * @param {string} storyContent 
 * @param {{string, string}} buttonContents - en lista med objekt, innehållande: {content = (texten till knappen),name = (namn på switch case värdet)}. Skickar man inget så får den värdet 'null'
 * @param {*} isAddon True om texten ska klistras på det som redan står.
 */
const updateStory = (storyContent, buttonContent = null, isAddon = false) => {
    storyBox.innerText = isAddon ? storyBox.innerText+storyContent : storyContent;
    choiceSection.innerHTML = createChoices(buttonContent);
}

//createChoices([{bContent:'Vad det ska stå i knappen',bName:'hur man kollar efter knappen i switch case för kapitlet'}]);


const choicePressed = (event = {target:{name:'default'}}) => {
    updateImage();
    switch(chapter){
        //OM SPELET LEDER MOT ETT SLUT
        case -1:
            switch(event.target.name){
                case 'yes':
                    setUpStartVariables();
                    chapter = 1;
                    choicePressed();
                break;
                case 'no':
                    chapter = 0;
                    choicePressed();
                break;
                default:
                    updateStory(`Du valde att avbryta äventyret innan det hände massa mer spännande saker.\n\nVill du köra igen?`, [{content:'Ja',name:'yes'}, {content:'Nej',name:'no'} ]);
                break;   
            }    
        break;
        //INTRO-TEXT
        case 0:
            switch(event.target.name){
                case 'start':
                    chapter++;
                    //GÅR VIDARE
                    choicePressed();
                break;
                default:
                    updateStory(`THE END\n\n hoppas det var kul!`);
                break;
            }
        break;
        //SPELET STARTAR
        case 1:
            switch(event.target.name){
                case 'knock':
                    updateImage(images.door);
                    updateStory(
                        certainChoices.hasKnockedOnTheDoor ? `Du undviker att knacka på dörren igen, känns lite onödigt när du redan prövat det.` : `Du valde att knacka på dörren, men ingen svarade.`, 
                        [{content:'Gå tillbaka'}]);
                    certainChoices.hasKnockedOnTheDoor = true;

                break;
                case 'goIn':
                    updateImage(images.door);
                    updateStory(
                        `Du valde att gå in i huset..`, 
                        [{content:'Gå vidare'} ]);
                    chapter++;
                        
                break;
                case 'goAway':

                    chapter = -1;
                    choicePressed();
                break;
                default:
                    updateImage(images.cabin);
                    updateStory(
                        `Du stöter på ett hus mitt ute i skogen. Det finns inga vägar dit, och inga spår på att någon varit utanför på länge. Vad väljer du att göra?`, 
                        [{content:'Gå in',name:'goIn'}, {content:'Gå iväg',name:'goAway'},{content:'Knacka',name:'knock'} ]);
                    
                break;
            }

            break;
        //GÅR IN I HUSET, VAL ATT ÄTA GRÖT ELLER INTE
        case 2: 
        console.log('case 2')
            switch(event.target.name){
                case 'yes':
                    chapter++;
                    choicePressed();
                break;
                case 'no':
                    chapter+=2;
                    updateImage(images.kitchen.allBowls);
                    updateStory(
                        `Du tänker att det är inte så snällt att äta upp andras mat, speciellt när de förmodligen lagt i ordning det på matbordet. Vem vet, de kanske bara är ute på en promenad?`,
                        [{content:'Gå vidare'}]
                    );    
                break;
                default:
                    updateImage(images.kitchen.allBowls);
                    updateStory(
                        `Du kommer in i en fint dekorerad hall. Över hela väggarna finns det inramade bilder på björnar. Tre av dem verkar vara med på de flesta bilderna man ser. Synd bara att det inte syns på bilden.\n\nDu sneglar in i huset och ser tre skålar med gröt på ett stort matbord. Din mage kurrar.. Du funderar även på om du ska äta lite gröt när den ändå bara står och blir dålig. Hur ska du göra?`,
                        [{content:'Äta',name:'yes'}, {content:'Inte äta',name:'no'}]
                    );
                    break;
        }
        break;
        //DAGS ATT ÄTA GRÖÖÖÖT
        case 3:
            switch(event.target.name){
                case 'firstBowl':
                    updateStory(
                        certainChoices.eatenFirstBowl ? `Gröten i stora skålen har du redan ätit upp tyvärr.` : `OJ va varm gröten var!! du brände dig på tungan.`,
                        [{content:'Gå tillbaka'}]);
                    certainChoices.amountOfBowlsEaten += certainChoices.eatenFirstBowl ? 0 : 1; 
                    certainChoices.damageControl += certainChoices.eatenFirstBowl ? 0: 1;

                    certainChoices.eatenFirstBowl = true;
                break;
                case 'secondBowl':
                    updateStory(
                        certainChoices.eatenSecondBowl ? `Gröten i mellanstora skålen har du redan ätit upp tyvärr.` : `OJ va kall gröten var!! du började genast frysa väldigt mycket.`,
                        [{content:'Gå tillbaka'}]
                    );
                    certainChoices.amountOfBowlsEaten += certainChoices.eatenSecondBowl ? 0 : 1;
                    certainChoices.damageControl += certainChoices.eatenSecondBowl ? 0: 1;

                    certainChoices.eatenSecondBowl = true;
                break;
                case 'thirdBowl':
                    updateStory(
                        `Åh va god gröten var, precis lagom!`,
                        [{content:'Gå vidare'}]
                    );
                    certainChoices.damageControl +=  1;
                    certainChoices.amountOfBowlsEaten += 1 ;
                    certainChoices.eatenThirdBowl = true;
                    chapter++;
                break;
                default:
                    if(certainChoices.eatenFirstBowl && certainChoices.eatenSecondBowl){
                        updateImage(images.kitchen.smallBowl);   
                    }
                    else if(!certainChoices.eatenFirstBowl && certainChoices.eatenSecondBowl){
                        updateImage(images.kitchen.smallAndLargeBowls);   
                    }
                    else if(certainChoices.eatenFirstBowl && !certainChoices.eatenSecondBowl){
                        updateImage(images.kitchen.smallAndMediumBowls);   
                    }else{
                        updateImage(images.kitchen.allBowls);   
                    }
                    // let kitchenImage = 
                    updateStory(
                        `Vilken skål vill du äta från?`,
                        [{content:'Största skålen',name:'firstBowl'},{content:'Mellanstora skålen',name:'secondBowl'}, {content:'Lilla skålen',name:'thirdBowl'}]
                    );
                break;
        }
        break;
        //GÅR IN I VARDAGSRUMMET DÄR STOLEN ÄR
        case 4:
            
            switch(event.target.name){
                case 'yes':
                    chapter++;
                    choicePressed();
                break;
                case 'no':
                    chapter+=2;
                    choicePressed();
                break;
                default:
                    let hunger = certainChoices.amountOfBowlsEaten === 3? 'På grund av att du åt så mycket gröt så började du må väldigt illa. Men efter detta ' : certainChoices.amountOfBowlsEaten === 2 ? 'På grund av att du åt 2 skålar gröt så känner du dig lite dåsig och övermätt. Men efter detta ' : certainChoices.amountOfBowlsEaten === 1 ? 'Du känner dig lagom mätt efter gröten. Efter detta ' : 'Efter detta ' ;
                    updateImage(images.livingroom.allChairs);
                    updateStory(
                        `${hunger} kommer du in till vardagsrummet. Där ser du tre olika stolar av olika kvalité. \n\nDu är ju lite trött i ryggen. Vill du sätta dig?`, 
                        [{content:'Ja', name:'yes'},{content:'Nej',name:'no'}]);

                break;
        }
        break;
        //DAGS ATT SÄTTA SIG PÅ STOLARNA
        case 5:
            
            switch(event.target.name){
                case 'largeChair':
                    let extraInfo = certainChoices.amountOfBowlsEaten >0 ? '\nDet måste ha varit gröten som gjort dig superstark' : '\nHur i hela lyckades du egentligen med detta???';
                    updateStory(
                        certainChoices.largeChairBroken ? `Stolen är slungad in i ett träd och lyckats stanna kvar i trädtoppen. ${extraInfo}` : 'När du sätter dig på den stora stolen så känner du att den är fruktansvärt hård, obekväm och allmänt ful.\n\nAv ren aggressivitet tar du tag i stolen och slungar ut den, rent utav övermänskligt, rakt ut genom det öppna fönstret i vardagsrummet.',
                        [{content:'Gå tillbaka'}]);
                    certainChoices.damageControl += !certainChoices.largeChairBroken ? 1: 0;
                    certainChoices.largeChairBroken = true;
                
                break;
                case 'mediumChair':
                    updateStory(
                        'När du sätter dig på den mellanstora stolen så känner du att den är på tok för mjuk.\n\nDu kämpar febrilt att försöka ta dig ur stolens viskösa grepp, och efter en solid kvarts ansträngningar så lyckas du, men tar sönder den i processen!',
                        [{content:'Gå tillbaka'}]
                        );
                    certainChoices.damageControl += !certainChoices.mediumChairBroken ? 1: 0;
                    certainChoices.mediumChairBroken = true;

                break;
                case 'smallChair':
                    chapter++;
                    updateStory(
                        `När du sätter dig på den lilla stolen så känner du att den är alldeles perfekt.${certainChoices.largeChairBroken || certainChoices.mediumChairBroken ? ' På grund av vad du upplevt så har du tyvärr inte möjlighet att fullt njuta av situationen, utan det kokar en hel del inombords.' : ' Du tittar dig runt omkring och ser mer inredningsdetaljer som verkar väldigt ologiska. En dekorativ fisk har hängts upp på väggen, men sektionen i mitten ser ut att vara avbitet.'} När du reser dig igen så faller stolen sönder i bitar.\n\nNåväl, du tar dig vidare genom huset...`,
                        [{content:'Gå vidare'}]
                        );
                    certainChoices.damageControl += 1;
                    certainChoices.smallChairBroken = true;

                break;
                default:
                    if(certainChoices.largeChairBroken && certainChoices.mediumChairBroken){
                        updateImage(images.livingroom.smallChair);   
                    }
                    else if(!certainChoices.largeChairBroken && certainChoices.mediumChairBroken){
                        updateImage(images.livingroom.smallAndLargeChairs);   
                    }
                    else if(certainChoices.largeChairBroken && !certainChoices.mediumChairBroken){
                        updateImage(images.livingroom.smallAndMediumChairs);   
                    }else{
                        updateImage(images.livingroom.allChairs);   
                    }
                    updateStory(`Det finns en större stol, en mellanstor stol och en liten stol. Vilken vill du sitta på? `, 
                    [{content:'Den största stolen',name:'largeChair'},{content:' Den mellanstora stolen',name:'mediumChair'}, {content:'Den lilla stolen',name:'smallChair'}]
                    );


                break;
        }
        break;
        //EFTER STOLARNA, SOVRUMMET HÄRNÄST
        case 6:
            
            switch(event.target.name){
                case 'yes':
                    chapter +=2;
                    updateImage(images.bedroom.allBeds);
                    updateStory(
                        `Jaa, va skönt!`, 
                        [{content:'Gå vidare'}]);
                break;
                case 'no':
                    updateImage(images.bedroom.allBeds);

                    chapter++;
                    if(certainChoices.amountOfBowlsEaten===0 && certainChoices.chairsBroken === 0){
                        updateStory(
                            `Nej, varför skulle du göra det, när du nu varit så snäll hela denna saga?`, 
                            [{content:'...Tack?'}]);
                    }

                    updateStory(
                        `Nej, du känner att DÄR går gränsen ändå för vad man får och inte får göra.`, 
                        [{content:'Gå vidare'}]);
                break;
                default:
                    updateImage(images.bedroom.allBeds);

                    let angry = 'Du tänker att du inte vill att andra sitter på dina stolar hemma utan att du vet, så du väljer att visa respekt i denna situationen.\n\nEfter detta';
                    if(certainChoices.smallChairBroken){
                        angry = certainChoices.largeChairBroken && certainChoices.mediumChairBroken  ? 'Av ren ilska och utmatthet' : 
                        certainChoices.largeChairBroken && !certainChoices.mediumChairBroken ? 'Av ren ilska' : 
                        !certainChoices.largeChairBroken && certainChoices.mediumChairBroken ? 'Av utmatthet' : 'Efter detta' ;
            
                    }
                    updateStory(`${angry} så ${certainChoices.largeChairBroken ? 'stampar':'går'} du vidare in i sovrummet. Där finns tre separata sängar bredvid varandra.\n\nDet hade varit skönt o lägga sig en stund i någon av sängarna. Vad tänker du göra?`, 
                    [{content:'Sova', name:'yes'},{content:'Inte sova',name:'no'}]);

                break;
        }
        break;
        //OM MAN VÄLJER NEJ PÅ FÖRRA SITUATIONEN
        case 7:
            
            switch(event.target.name){
                case 'go':
                    updateImage(images.pond.bearsFishing);
                    updateStory(
                        `En bit på vägen så möter du tre björnar som står och fiskar, vilket i sig är en helt sjuk bild att måla upp i huvudet så om jag har hittat en bild som kan visualisera detta scenario så säger jag bara: varsågod, njut!.\n\nDu håller avstånd och går därifrån, samtidigt som du ser att de avslutar sin fiskeverksamhet för dagen och traskar vidare mot det hus du precis har vandaliserat!!`, 
                        [{content:'Läs mer', name:'goPageTwo'}]);
                break;
                case 'goPageTwo':
                    updateImage(images.pond.bearsFishing);

                    updateStory(
                        `I ren panik så börjar du fundera på vad du egentligen gjorde där inne.`, 
                        [{content:'Fundera klart', name:'goPageThree'}]);
                break;
                case 'goPageThree':
                    updateImage(images.intro);

                    updateStory(
                        `Du:\n\nÅt ${certainChoices.amountOfBowlsEaten >1 ? `${certainChoices.amountOfBowlsEaten} portioner` : certainChoices.amountOfBowlsEaten === 0 ? 'ingen' : '1 portion'} gröt, ${certainChoices.chairsBroken < 1 ? 'inga stolar' : certainChoices.chairsBroken === 1 ? '1 stol' : `${certainChoices.chairsBroken} stolar`} gick sönder och du sov inte över.\n\nPoäng: Hade jag haft ett poängsystem så hade du antingen fått full pott eller noll!`, 
                        [{content:'Slutliga poäng', name:'goPageThree'}]);                
                break;
                case 'what':
                    updateImage(images.intro);

                    updateStory(
                        `Asså, det här är ju en saga. Jag trodde vi var på samma blad när det gällde den biten, men vi har ju olika grad av inlevelse...\n\nFörresten, har du fått det där sjuka slutet på spelet när 'The Millennium Falcon' anländer, spränger stugan och inte nog med det: Hans Olof hoppar ut och drop-kickar dig i ansiktet? Kan vara så att jag inte orkade fixa det, men man vet ju aldrig.. \n`, 
                        [{content:'Slutliga poäng', name:'whatPageTwo'}]);    
                break;
                case 'whatPageTwo':
                    updateImage(images.intro);
                    updateStory(``);
                break;
                default:
                    updateImage(images.intro);
                    let emotion = 'promenerar ut';
                    if(certainChoices.smallChairBroken){
                        emotion = certainChoices.largeChairBroken && certainChoices.mediumChairBroken  ? 'stormar apatiskt ut' : 
                        certainChoices.largeChairBroken && !certainChoices.mediumChairBroken ? 'stormar ut' : 
                        !certainChoices.largeChairBroken && certainChoices.mediumChairBroken ? 'släpar dig själv ut gråtandes' : 'går ut' ;
                    }
                    updateStory(`Du ${emotion} och funderar på vad detta hade för mening egentligen.\n\nDet är kanske så du känner om detta, du som spelar spelet nu? Vem vet...`, 
                    [{content:'Börja gå', name:'go'},{content:'Nu hänger jag inte med här riktigt..?',name:'what'}]);

                break;
        }
        break;
        //TESTA SÄNGAR, OCH SISTA DELEN
        case 8: 
            certainChoices.ending = certainChoices.ending === '' || event.target.name === 'default' ? event.target.name : certainChoices.ending ;
            switch(event.target.name){
                //STORA SÄNGEN OCH DESS OLIKA ALTERNATIV
                case 'largeBed': //för hård, men om suttit på alla stolar och ätit all mat så somnar du ändå, vaknar upp för stel för att ta dig från björnarna och blir uppäten. Annars somnar du inte, och lyckas fly när björnarna närmar sig stugan 
                if(certainChoices.amountOfBowlsEaten === 3 && certainChoices.chairsBroken === 3){
                    chapter = 0; 
                    updateStory(`Oj, den här sängen var verkligen hård! hur kan man sova så här?? Uppenbarligen så kunde du det, på grund av all gröt du tryckt i dig, och den hemska upplevelsen med stolarna, så somnar du tvärt.\n\nNär du vaknar står tre björnar och inspekterar dig. Av ren panik springer du upp, men på grund av hur hård sängen är så kan du inte ta dig ut ur stugan innan de får tag i dig.\n\nMen man kan ju inte skylla för mycket på de, du åt ju deras frukost! Så nu fick de göra ny..`,
                    [{content:'Gå vidare'}]);

                }if(certainChoices.amountOfBowlsEaten <= 2 && certainChoices.chairsBroken === 3){ //TAGIT SÖNDER ALLA STOLAR, MEN INTE ÄTIT ALL GRÖT
                    chapter = 0; 
                    updateStory(`Oj, den här sängen var verkligen hård! hur kan man sova så här?? Du må vara trött efter all kaos med stolarna, men du lyckas inte somna.\n\nEfter en liten stund så hör du tunga steg mot stugan.Du hoppar upp ur sängen - som säkert är gjord av stenblock - och tittar ut genom fönstret. Där går tre massiva björnar på sina bakben mot stugan som ännu inte sett dig. Den ena sneglar mot trädet där du kastade ut stolen och ser lite arg ut!\n\n Du tar chansen och rusar ut. Förhoppningsvis så såg de dig inte. Tänk vad de skulle göra om de skulle se resten av stolarna i hemmet!`,
                    [{content:'Gå vidare'}]);

                }if(certainChoices.amountOfBowlsEaten === 3 && certainChoices.chairsBroken <= 2){ //ÄTIT MASSA GRÖT, INTE TAGIT SÖNDER ALLA STOLAR
                    chapter = 0; 
                    updateStory(`Oj, den här sängen var verkligen hård! hur kan man sova så här?? Du lyckas, i och med att du tryckt i dig gröt för mer än 3 fullvuxna människor. Men du vaknar lite senare av att dörren öppnas till stugan. När du snabbt hoppar ur sängen och gömmer dig under, så hör du vrål och rytanden. De börjar leta sig genom hemmet, och till slut finner de dig under sängen. Tyvärr så blev du deras nya frukost, med tanke på att du åt upp deras gröt!`,
                    [{content:'Gå vidare'}]);

                }if(certainChoices.amountOfBowlsEaten === 1 && certainChoices.chairsBroken === 1){ //BARA ÄTIT EN GRÖT OCH TAGIT SÖNDER EN STOL
                    chapter++;
                    updateStory(`Oj, den här sängen var verkligen hård! hur kan man sova så här?? Nej, säger du. Du går upp, tänker att det räcker för idag med vandalisering av andras ägodelar och traskar mot dörren. Men då möts du av tre stora björnar som är på väg till huset.\n\nLivrädd springer du, med björnarna hack i häl. När du lyckas komma upp i ett träd så märker du att de inte kan komma åt dig och du pustar ut.`,
                    [{content:'Gå vidare'}]);

                }if(certainChoices.amountOfBowlsEaten === 0 && certainChoices.chairsBroken === 0){ //INTE GJORT NÅGOT
                    chapter = 0; 
                    updateStory(`Oj, den här sängen var verkligen hård! hur kan man sova så här?? Nej, jag har ju ändå inte förstört något eller vandaliserat något idag så jag behöver inte börja nu, säg!\n\nDu bäddar om sängen, viker en varsin handduk i form av en rektangel på sängen och går ut från stugan.\n\nNär du passerat en bra bit, ser du tillbaka och märker att tre björnar närmar sig stugan. De ser ut att vara en trevlig familj. Den mindre björnen sneglar mot ditt håll och viftar med sin tass. Du viftar tillbaka och fortsätter på din väg hem.\n\Nu är du hungrig, trött och rik av upplevelser. Men mest av allt: kriminell som bryter sig in i andras hus. Tur att du inte gjorde något dumt!`,
                    [{content:'Gå vidare'}]);
                }
                break;

                //MELLANSTORA SÄNGEN OCH DESS OLIKA ALTERNATIV
                case 'mediumBed': //för mjuk, men om du ätit 1 skål gröt och inte slängt ut den hårda stolen så lyckas du ta dig ur sängen och fly
                    if(certainChoices.amountOfBowlsEaten === 3 && certainChoices.chairsBroken === 3){
                        chapter = 0; 
                        updateStory(`Oj va mjuk sängen var! Likt kvicksandens effekt så sjunker du sakta ner i sängen och blir mer och mer immobil. Du försöker klamra dig upp, men på grund av all gröt du ätit, och hur mycket energi du tog ut på stolarna, så ger din kropp upp. Till slut hör du hur dörren öppnas till stugan. Du ser inget, men hör en massa vrål och ryt.\n\nDe hittar dig inte, som tur är, men när ena björnen ska ta en vilopaus så kläms du ihop.`,
                        [{content:'Gå vidare'}]);

                    }if(certainChoices.amountOfBowlsEaten <= 2 && certainChoices.chairsBroken === 3){ //TAGIT SÖNDER ALLA STOLAR, MEN INTE ÄTIT ALL GRÖT
                        chapter = 0; 
                        updateStory(`Oj va mjuk sängen var! Likt kvicksandens effekt så sjunker du sakta ner i sängen och blir mer och mer immobil. Du försöker klamra dig upp, och efter en del kämpande så är du uppe ur sängen. Men när du väl ställer dig upp på trötta ben så ser du tre björnar i rummet som iakttagit dig en längre stund. Hur lång tid tog det egentligen att ta sig ur sängen? Det är till och med redan mörkt ute!\n\nPå grund av att du förstört alla stolar och ätit upp en viss mängd gröt så väljer de att göra en gryta av dig.`,
                        [{content:'Gå vidare'}]);

                    }if(certainChoices.amountOfBowlsEaten === 3 && certainChoices.chairsBroken <= 2){ //ÄTIT MASSA GRÖT, INTE TAGIT SÖNDER ALLA STOLAR
                        chapter = 0; 
                        updateStory(`Oj va mjuk sängen var! Likt kvicksandens effekt så sjunker du sakta ner i sängen och blir mer och mer immobil. Du försöker klamra dig upp, och efter en hel del kämpande så är du uppe ur sängen. Men när du väl ställer dig upp på trötta ben så ser du tre björnar i rummet som iakttagit dig en längre stund. Hur lång tid tog det egentligen att ta sig ur sängen? Det är till och med redan mörkt ute!\n\nPå grund av att du förstört alla stolar och ätit upp all gröt så väljer de att göra en kvällsmacka av dig.`,
                        [{content:'Gå vidare'}]);

                    }if(certainChoices.amountOfBowlsEaten === 1 && certainChoices.chairsBroken === 1){ //BARA ÄTIT EN GRÖT OCH TAGIT SÖNDER EN STOL
                        chapter = 0;
                        updateStory(`Oj va mjuk sängen var! Likt kvicksandens effekt så sjunker du sakta ner i sängen och blir mer och mer immobil. Du försöker klamra dig upp, och med tanke på att du inte frossat gröt och suttit sönder så många stolar, så har du tålamod och energi nog att snabbt ta dig ur den. Men när du väl står redo så hör du hur några närmar sig dörren till stugan. Du gömmer dig snabbt i en vrå och iakttar tre björnar som går in. De verkar väldigt arga över att en skål gröt är uppäten, och även att en stol är sönder.\n\n Björnarna letar, men hittar dig inte. När de väl somnat så smyger du ut, springer hem och väljer att aldrig gå till den stugan igen.`,
                        [{content:'Gå vidare'}]);

                    }if(certainChoices.amountOfBowlsEaten === 0 && certainChoices.chairsBroken === 0){ //INTE GJORT NÅGOT
                        chapter++;
                        updateStory(`Du känner lätt på sängen först. Oj va mjuk den var!\n\nNej, där kommer jag nog fastna, säger du. Du börjar gå mot dörren, och precis i samma stund så står det 3 björnar framför dig. Du blir skräckslagen och springer längre in i huset och försöker gömma dig. Björnarna ryter och vrålar medans de sakta närmar sig dig. Vad väljer du att göra?`,
                        [{content:'Gömma mig under sängen', name:'underBed'},{content:'Hoppa ut genom fönstret', name:'window'}]);
                    }
                break;

                case 'smallBed': //Om du ätit all mat och suttit på alla stolar så somnar du tvärt, märker inte ens när björnarna går in och de äter upp dig. Men har du ätit 1 skål gröt, och inte suttit på någon stol så lyckas du fly 
                    if(certainChoices.amountOfBowlsEaten === 3 && certainChoices.chairsBroken === 3){
                        chapter = 0; 
                        updateStory(`Oj va mjuk sängen var! Likt kvicksandens effekt så sjunker du sakta ner i sängen och blir mer och mer immobil. Du försöker klamra dig upp, men på grund av all gröt du ätit, och hur mycket energi du tog ut på stolarna, så ger din kropp upp. Till slut hör du hur dörren öppnas till stugan. Du ser inget, men hör en massa vrål och ryt.\n\nDe hittar dig inte, som tur är, men när ena björnen ska ta en vilopaus så kläms du ihop.`,
                        [{content:'Gå vidare'}]);

                    }if(certainChoices.amountOfBowlsEaten <= 2 && certainChoices.chairsBroken === 3 || certainChoices.amountOfBowlsEaten === 3 && certainChoices.chairsBroken <= 2){ //TAGIT SÖNDER ALLA STOLAR, MEN INTE ÄTIT ALL GRÖT
                        chapter = 0; 
                        updateStory(`Åh, sängen är helt perfekt! Här kommer du kunna sova som en utslagen alkoholist!\n\nNär du senare vaknar så står det tre björnar och stirrar på dig. På grund av att du delvis har vandaliserat deras hem så väljer de att göra en calzone av dig.`,
                        [{content:'Gå vidare'}]);

                    }if(certainChoices.amountOfBowlsEaten === 1 && certainChoices.chairsBroken === 1){ //BARA ÄTIT EN GRÖT OCH TAGIT SÖNDER EN STOL
                        chapter = 0;
                        updateStory(`Åh, sängen är helt perfekt! Här kommer du kunna sova som en utslagen alkoholist!\n\nNär du senare vaknar så står det tre björnar och stirrar på dig. På grund av att du inte förstört så mycketså ger de dig ett försprång på 20 sekunder. Du tar vara på det och springer allt vad du kan och lyckas ta dig hem, där du funderar över dina val i livet.`,
                        [{content:'Gå vidare'}]);

                    }if(certainChoices.amountOfBowlsEaten === 0 && certainChoices.chairsBroken === 0){ //INTE GJORT NÅGOT
                        chapter = 0;
                        updateStory(`Åh, sängen är helt perfekt! Här kommer du kunna sova som en utslagen alkoholist!\n\nNär du senare vaknar så står det tre björnar och stirrar på dig. De kollar fundersamt på dig och undrar vad du egentligen gör här. Skräckslagen springer du ut, medans bjönarna inte riktigt vet vad de ska göra.`,
                        [{content:'Gå vidare'}]);
    
                    }
                break;
                default:
                    updateImage(images.bedroom.allBeds);
                    updateStory(`Det finns en stor säng, en mellanstor säng och en liten säng. Vilken vill du lägga dig i och vila?`, 
                    [{content:'Den största sängen',name:'largeBed'},{content:' Den mellanstora sängen',name:'mediumBed'}, {content:'Den lilla sängen',name:'smallBed'}]
                    );

                break;
        }
        break;
        //EXTRA TILLÄGG FÖR ENDINGS
        case 9:
            switch(certainChoices.ending){
                case 'largeBed':
                    chapter = 0;
                    updateStory(`Men sen ser du ena björnen vänder sig om, springer och hämtar en motorsåg och kapar trädet. Tyvärr så kom du inte längre än så.`,
                    [{content:'Gå vidare'}]);
                break;
                case 'mediumBed':
                    switch(event.target.name){
                        case 'underBed':
                            chapter = 0;
                            updateStory(`Alla björnarna tittat förvirrat på varandra. De ser uppenbarligen att du gömmer dig. Så de lyckas få tag på dig, och där tar sagan slut.`,
                            [{content:'Gå vidare'}]);
                        break;
                        case 'window':
                            updateStory(`Du hoppar snabbt ut genom fönstret i sovrummet. Björnarna springer efter, men två av de råkar fastna i fönsterkarmen! Den tredje är på väg genom vardagsrummet och tänker springa ut efter dig. Plötsligt händer något helt oväntat, och surrealistiskt`,
                            [{content:'Coolt, vad händer?', name:'windowPageTwo'}]);
                        break;
                        case 'windowPageTwo':
                            chapter = 0;    
                            updateStory(`Medan du står skräckslagen så kommer "The Millennium Falcon" från "Star Wars" och fullständigt spränger huset i bitar, med björnarna kvar i det. När skeppet sen landar så kliver en mer rakad man och en mindre rakad man ut. Den mer rakade mannen deklarerar sig som Hans-Olof, drop-kickar dig i ansiktet och springer sedan iväg till resterna av stugan för att se om det finns något tillagat kött att ta med den fortsatta resan genom galaxen.`,
                                [{content:'Helt sjukt, men okej'}]);
                        break;
                        default:
                        break;
                    }
                break;              
                default:
                break;
            }

        break;

        default:
            updateStory('');
        break;
    }
}

const playGame = () => {
    setUpStartVariables();
    updateImage(images.intro);
    updateStory(
        `Välkommen till Guldlock\n\nThe interactive (sort of) story!!`, 
        [{content:'Starta',name:'start'},{content:'Avsluta',name:'quit'}]);

}




playGame();