/* Prefisso di un percorso calcolato, che cambierà in base alla pagina in cui mi trovo, in modo da avere percorsi relativi ovunque.
   Se mi trovo in una pagina diversa dalla radice, allora il prefisso sarà dato dal basePath, altrimenti se sono sulla radice dal "" */
const base=window.basePath || "";   

/* Si  mette una variabile globale, salvata in locale in modo che si aggiorni senza reinizializzarsi, che rappresenta il bottone selezionato; per default è il primo,
   La localStorage serve a salvare dati in modo persistente nel browser, anche dopo che la pagina viene chiusa o ricaricata */
let selezione=Number(localStorage.getItem("selezione")) || 1;

// Stato del menu a tendina, inizialmente chiuso
let menuAperto=false;

/* Funzione che inserisce nella barra inziale il logo ridimensionato in base alle dimensioni dello schermo in cui si apre il sito.
   Inoltre, vengono inseriti anche i tasti di selezione (sempre in base alla dimensione dello schermo) */
function aggiornaImmagineBarra() {
    const barra=document.getElementById("barra-titolo");
    const barraNavigazione=document.getElementById("barra-navigazione");
    // Ripuliamo eventuali contenuti precedenti
    barra.innerHTML="";
    barraNavigazione.innerHTML=""; 
    const immagine=document.createElement("img");
    const contenuto=document.getElementById("contenuto");
    // Controllo della dimensione dello schermo
    if(window.innerWidth<=1125){ 
        immagine.id="logo_ridotto";
        immagine.src=base+"img/Immagine_ridotta.png";   // Da notare il percorso come cambia a proposito del prefisso dato
        // Ripuliamo eventuali contenuti precedenti
        creaBarraRidotta(barraNavigazione);
    } 
    else{ 
        immagine.id="logo";
        immagine.src=base+"img/Immagine_estesa.png";
        creaBarraOriginale(barraNavigazione); 
    }
    immagine.addEventListener("click", ()=>{ 
        localStorage.setItem("selezione", 1);   // Se si clicca sull'immagine è come se si cliccasse sulla pagina principale, quindi sul primo bottone
        window.location.href=base+"index.html"; 
    });
    barra.appendChild(immagine);
    // Creazione di una classe CSS per avere un effetto di transizione sull'immagine del logo e sul contenuto della pagina
    setTimeout(()=>{ 
        contenuto.classList.add("visible");
        immagine.classList.add("visible"); 
    }, 10);  
}

// Funzione che crea la barra di navigazione con gli eventi associati, al momento di creazione della pagina, per display di grandi dimensioni
function creaBarraOriginale(barraNavigazione){
    // Appena apro la barra originale, nel caso fosse aperto il menu a tendina faccio partire una funzione che chiude il menu (in modo preventivo)
    chiudiTendina();
    // Creazione pulsanti barra navigazione
    const bottoneNAV1=document.createElement("button");
    const bottoneNAV2=document.createElement("button");
    const bottoneNAV3=document.createElement("button");
    const bottoneNAV4=document.createElement("button");
    const bottoneNAV5=document.createElement("button");
    // Si da un attributo a tutti i bottoni che rappresenta la loro posizione dalla 1° alla 5° 
    bottoneNAV1.setAttribute("data-ATT",1);
    bottoneNAV2.setAttribute("data-ATT",2);
    bottoneNAV3.setAttribute("data-ATT",3);
    bottoneNAV4.setAttribute("data-ATT",4);
    bottoneNAV5.setAttribute("data-ATT",5);
    bottoneNAV1.innerHTML="Chi siamo";
    bottoneNAV2.innerHTML="Cosa facciamo";
    bottoneNAV3.innerHTML="Dove trovarci";
    bottoneNAV4.innerHTML="Contattaci";
    bottoneNAV5.innerHTML="Area Riservata";
    barraNavigazione.appendChild(bottoneNAV1);
    barraNavigazione.appendChild(bottoneNAV2);
    barraNavigazione.appendChild(bottoneNAV3);
    barraNavigazione.appendChild(bottoneNAV4);
    barraNavigazione.appendChild(bottoneNAV5);
    // Ciclo che scorre tutti gli attributi dei bottoni e controlla quello che è uguale al valore di selezionato (cioè il bottone che viene selezionato) e lo colora di conseguenza
    const bottoni=document.querySelectorAll("[data-ATT]");
    for(let i=0; i<5; i++){
        if(bottoni[i].getAttribute("data-ATT")==selezione){ bottoni[i].id="selezionato"; }
        else{ bottoni[i].id="bottoneSelezione"; }
    }
    reindirizzamentoEsteso(bottoneNAV1, bottoneNAV2, bottoneNAV3, bottoneNAV4, bottoneNAV5);
}

// Funzione che crea la barra di navigazione con gli eventi associati, al momento di creazione della pagina, per display di piccole dimensioni
function creaBarraRidotta(barraNavigazioneRidotta){
    // Si fa un menu a tendina, sotto al quale appariranno i tasti associati di navigazione
    const menuTendina=document.createElement("button");
    menuTendina.type="button";   // Forzatura a bottone per tenerlo fermo in caso di refresh
    menuTendina.id="tendina";
    menuTendina.innerHTML="&#9776;";
    barraNavigazioneRidotta.appendChild(menuTendina);

    // Si creano 5 variabili per creare 5 div che conterranno i 5 bottoni
    let div1, div2, div3, div4, div5;
    menuTendina.addEventListener("click", ()=>{
        // Caso in cui il menu a tendina è aperto, allora lo chiudiamo tramite la medesima funzione
        if(menuAperto){ chiudiTendina(); }
        // Caso in cui il menu a tendina è chiuso
        else{
            // Creazione dei 5 div
            div1=document.createElement("div");
            div2=document.createElement("div");
            div3=document.createElement("div");
            div4=document.createElement("div");
            div5=document.createElement("div");
            // Caratteristiche dei 5 div
            div1.id="tendina1";
            div2.id="tendina2";
            div3.id="tendina3";
            div4.id="tendina4";
            div5.id="tendina5";
            // Creazione pulsanti barra navigazione
            const bottoneNAV1=document.createElement("button");
            const bottoneNAV2=document.createElement("button");
            const bottoneNAV3=document.createElement("button");
            const bottoneNAV4=document.createElement("button");
            const bottoneNAV5=document.createElement("button");
            // Si da un attributo a tutti i bottoni che rappresenta la loro posizione dalla 1° alla 5° 
            bottoneNAV1.setAttribute("data-ATT",1);
            bottoneNAV2.setAttribute("data-ATT",2);
            bottoneNAV3.setAttribute("data-ATT",3);
            bottoneNAV4.setAttribute("data-ATT",4);
            bottoneNAV5.setAttribute("data-ATT",5);
            bottoneNAV1.innerHTML="Chi siamo";
            bottoneNAV2.innerHTML="Cosa facciamo";
            bottoneNAV3.innerHTML="Dove trovarci";
            bottoneNAV4.innerHTML="Contattaci";
            bottoneNAV5.innerHTML="Area Riservata";
            // Si mettono i pulsanti nelle relative barre
            div1.appendChild(bottoneNAV1);
            div2.appendChild(bottoneNAV2);
            div3.appendChild(bottoneNAV3);
            div4.appendChild(bottoneNAV4);
            div5.appendChild(bottoneNAV5);
            document.body.appendChild(div1);
            document.body.appendChild(div2);
            document.body.appendChild(div3);
            document.body.appendChild(div4);
            document.body.appendChild(div5);
            // Ciclo che scorre tutti gli attributi dei bottoni e controlla quello che è uguale al valore di selezionato (cioè il bottone che viene selezionato) e lo colora di conseguenza
            const bottoni=document.querySelectorAll("[data-ATT]");
            for(let i=0; i<5; i++){
                if(bottoni[i].getAttribute("data-ATT")==selezione){ bottoni[i].id="selezionato"; }
                else{ bottoni[i].id="bottoneSelezione"; }
            }
            // Creazione di una classe CSS per avere un effetto di transizione sul menu a tendina in discesa
            setTimeout(()=>{ 
                div1.classList.add("visible");
                div2.classList.add("visible"); 
                div3.classList.add("visible");
                div4.classList.add("visible");
                div5.classList.add("visible");
            }, 10);  
            reindirizzamentoEsteso(bottoneNAV1, bottoneNAV2, bottoneNAV3, bottoneNAV4, bottoneNAV5);
            menuAperto=true;
        }
    });
}

// Funzione che chiude il menu hamburger
function chiudiTendina(){
    menuAperto=false;
    // Si prendono i div, e si chiudono
    let div1=document.getElementById("tendina1");
    let div2=document.getElementById("tendina2");
    let div3=document.getElementById("tendina3");
    let div4=document.getElementById("tendina4");
    let div5=document.getElementById("tendina5");
    // Dopo la durata della transizione CSS (400ms), rimuoviamo la classe "visible" per far partire l'effetto di scomparsa
    setTimeout(()=>{
        div1.classList.remove("visible"); 
        div2.classList.remove("visible"); 
        div3.classList.remove("visible"); 
        div4.classList.remove("visible");
        div5.classList.remove("visible"); 
    }, 10); 
    // Dopo la transizione (400ms), rimuovi i div dal DOM
    setTimeout(()=>{
        // Si controlla se i div effettivamente ci sono, altrimenti produce errore
        if(div1) div1.remove("visible");
        if(div2) div2.remove("visible");
        if(div3) div3.remove("visible");
        if(div4) div4.remove("visible");
        if(div5) div5.remove("visible");
    }, 410); 
}

// In base al click di uno dei bottoni sulla barra di navigazione verremo reindirizzati alla pagina specifica
function reindirizzamentoEsteso(bottoneNAV1, bottoneNAV2, bottoneNAV3, bottoneNAV4, bottoneNAV5){
    // In base al bottone cliccato, oltre al reindirizzamneto, si inserisce nella variabile di salvataggio locale il valore di ordinamento relativo al bottone cliccato
    bottoneNAV1.addEventListener("click", ()=>{
        localStorage.setItem("selezione", 1);
        window.location.href=base+"index.html"; 
    });
    bottoneNAV2.addEventListener("click", ()=>{
        localStorage.setItem("selezione", 2);
        window.location.href=base+"pages/cosa-facciamo.html"; });
    bottoneNAV3.addEventListener("click", ()=>{
        localStorage.setItem("selezione", 3);
        window.location.href=base+"pages/dove-trovarci.html"; 
    });
    bottoneNAV4.addEventListener("click", ()=>{ 
        localStorage.setItem("selezione", 4);
        window.location.href=base+"pages/contattaci.html"; 
    });
    bottoneNAV5.addEventListener("click", ()=>{ 
        localStorage.setItem("selezione", 5);
        window.location.href=base+"pages/area-riservata.php"; 
    });
} 
  
// Il logo e tutto ciò che segue (barra sotto) vengono aggiornati al ridimensionamento della finestra
window.addEventListener('resize', aggiornaImmagineBarra);

// Al caricamento della pagina in base allo schermo si ridimensiona il logo e si inserisce tutto il resto per la barra sottostante
window.addEventListener("load", ()=>{ aggiornaImmagineBarra(); });