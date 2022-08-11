class Game{
    constructor(){
        this.precedente = -1;
        this.img;
        this.imgp;
        this.attente = 0;
        return this;
    }
    initGame = function(){
        console.log('--START--');
        for(let i=0;i<100;i++){
            //Math.random() donne une variable aleatoire entre 0 et 1 sortant *16   
            //Math ceil -> arrondi entier sup 
            const N1 = Math.ceil(16*Math.random());
            const N2 = Math.ceil(16*Math.random());
            // console.log(i,N1,N2)
            // Recupère enfant
            let img1 = document.querySelector("div#n"+N1+" img");
            let img2 = document.querySelector("div#n"+N2+" img");
            //INVERSION DE img 1 vers img 2
            const SRC1 = img1.src;
            const SRC2 = img2.src;
            img1.src = SRC2;
            img2.src = SRC1;
        }
        console.log(this);
        return this;
    }

    cachePhotos(){
        console.log(this);
        this.img.style.display = "none";
        this.imgp.style.display = "none";
        this.attente = 0;
    }

    resolution(){
        //GARDER UNE REFERENCE DE THIS COMME OBJET GAME
        const THAT = this;
        document.querySelectorAll("div.cellule").forEach(function(elm,index){
        elm.addEventListener('click',function(e){
            //THIS = ELM EN COURS (CELUI QUE L'ON CLIQUE)
            if(THAT.attente !=1 && this.firstElementChild.dataset.affichage !="true" && this!=document.querySelector("div#n" + THAT.precedente)){
                //this = la cellule en cours ; firstelementchild c'est l'image
                console.log(this);
                THAT.img = this.firstElementChild;
                THAT.img.style.display = "block";
                if(THAT.precedente<0){
                    //SLICE PERMET DE SEGMENTER UNE CHAINE
                    THAT.precedente = (this.id).slice(1,3);
                    console.log("Valeur précedente : " + THAT.precedente);
                }else{
                    //PERMET DE RECUPERER L'IMAGE PRECEDENTE
                    THAT.imgp = document.querySelector("div#n"+THAT.precedente+" img");
                    console.log(THAT.imgp.src,THAT.img.src);
                    
                    if(THAT.imgp.src == THAT.img.src){
                        //LES DEUX IMAGES SONT IDENTIQUES
                        console.log("image trouvé");
                        THAT.img.dataset.affichage = true;
                        THAT.imgp.dataset.affichage = true;
                    } else{
                        THAT.attente = 1;
                        // IMAGE NON IDENTIQUE
                        //SETTIMEOUT execute son callback (cachephoto) dans le contexte de window car window.setTimeout du coup this = window et window.img ca n'existe pas c'est game.img qui existe
                        // on utilise bind pour changer la valeur de this pour que this= game et non this = window.
                        setTimeout(THAT.cachePhotos.bind(THAT),1500);
                        //setTimeout(()=>THAT.cachePhotos(),1500);
                        console.log('salut');

                    }
                    //REMETTRE PRECEDENTE A -1 ME PERMET DE RE-INITIALISER LE COUPLE IMGP IMG CAR SINON
                    //IL CONSIDERE QUE IMGP C'EST TOUJOURS LA 1er IMAGE
                    THAT.precedente = -1;
                }
            } else {
                console.log("ATTENTE = 1 ou image déjà trouvée ou meme case cliquée");
            }
        })
    
    })
    return this;
  }
}
