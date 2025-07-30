/* Prefisso di un percorso calcolato, che cambierà in base alla pagina in cui mi trovo, in modo da avere percorsi relativi ovunque.
   Se mi trovo in una pagina diversa dalla radice, allora il prefisso sarà dato dal basePath, altrimenti se sono sulla radice dal "" */
const base=window.basePath || "";   

/* Si  mette una variabile di sessione, in modo che si aggiorni via via che si fa una selezione tra i bottoni del menu.
   Per defaul è imposta sul primo elemento */
let selezione=Number(sessionStorage.getItem("selezione")) || 1;

/* Verifica se è una nuova sessione del browser, cioè se sessionStorage è false, e nel caso lo fosse si inizializza.
   Questo, per non avere la stessa icona cliccata nel menu di selezione alla riapertura del browser o di un tab */
if(!sessionStorage.getItem("inizializzato")){ sessionStorage.setItem("inizializzato", "true"); }

// Stato del menu a tendina, inizialmente chiuso
let menuAperto=false;

/* Funzione che inserisce nella barra inziale il logo ridimensionato in base alle dimensioni dello schermo in cui si apre il sito.
   Inoltre, vengono inseriti anche i tasti di selezione (sempre in base alla dimensione dello schermo) */
function aggiornaImmagineBarra() {
    const barra=document.getElementById("barra-titolo");
    const barraNavigazione=document.getElementById("barra-navigazione");
    barraNavigazione.classList.add("visible"); 
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
        sessionStorage.setItem("selezione", 1);   // Se si clicca sull'immagine è come se si cliccasse sulla pagina principale, quindi sul primo bottone
        window.location.href=base+"index.html"; 
    });
    barra.appendChild(immagine);
    // Creazione di una classe CSS per avere un effetto di transizione sul contenuto della pagina
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
    // Si da un attributo a tutti i bottoni che rappresenta la loro posizione dalla 1° alla 4° 
    bottoneNAV1.setAttribute("data-ATT",1);
    bottoneNAV2.setAttribute("data-ATT",2);
    bottoneNAV3.setAttribute("data-ATT",3);
    bottoneNAV4.setAttribute("data-ATT",4);
    bottoneNAV1.innerHTML="Chi siamo";
    bottoneNAV2.innerHTML="Cosa facciamo";
    bottoneNAV3.innerHTML="Dove trovarci";
    bottoneNAV4.innerHTML="Contattaci";
    barraNavigazione.appendChild(bottoneNAV1);
    barraNavigazione.appendChild(bottoneNAV2);
    barraNavigazione.appendChild(bottoneNAV3);
    barraNavigazione.appendChild(bottoneNAV4);
    // Ciclo che scorre tutti gli attributi dei bottoni e controlla quello che è uguale al valore di selezionato (cioè il bottone che viene selezionato) e lo colora di conseguenza
    const bottoni=document.querySelectorAll("[data-ATT]");
    for(let i=0; i<4; i++){
        if(bottoni[i].getAttribute("data-ATT")==selezione){ bottoni[i].id="selezionato"; }
        else{ bottoni[i].id="bottoneSelezione"; }
    }
    reindirizzamentoEsteso(bottoneNAV1, bottoneNAV2, bottoneNAV3, bottoneNAV4);
}

// Funzione che crea la barra di navigazione con gli eventi associati, al momento di creazione della pagina, per display di piccole dimensioni
function creaBarraRidotta(barraNavigazioneRidotta){
    // Si fa un menu a tendina, sotto al quale appariranno i tasti associati di navigazione
    const menuTendina=document.createElement("button");
    menuTendina.type="button";   // Forzatura a bottone per tenerlo fermo in caso di refresh
    menuTendina.id="tendina";
    menuTendina.innerHTML="&#9776;";
    barraNavigazioneRidotta.appendChild(menuTendina);

    // Si creano 4 variabili per creare 4 div che conterranno i 4 bottoni
    let div1, div2, div3, div4
    menuTendina.addEventListener("click", ()=>{
        // Caso in cui il menu a tendina è aperto, allora lo chiudiamo tramite la medesima funzione
        if(menuAperto){ chiudiTendina(); }
        // Caso in cui il menu a tendina è chiuso
        else{
            // Creazione dei 4 div
            div1=document.createElement("div");
            div2=document.createElement("div");
            div3=document.createElement("div");
            div4=document.createElement("div");
            // Caratteristiche dei 4 div
            div1.id="tendina1";
            div2.id="tendina2";
            div3.id="tendina3";
            div4.id="tendina4";
            // Creazione pulsanti barra navigazione
            const bottoneNAV1=document.createElement("button");
            const bottoneNAV2=document.createElement("button");
            const bottoneNAV3=document.createElement("button");
            const bottoneNAV4=document.createElement("button");
            // Si da un attributo a tutti i bottoni che rappresenta la loro posizione dalla 1° alla 4° 
            bottoneNAV1.setAttribute("data-ATT",1);
            bottoneNAV2.setAttribute("data-ATT",2);
            bottoneNAV3.setAttribute("data-ATT",3);
            bottoneNAV4.setAttribute("data-ATT",4);
            bottoneNAV1.innerHTML="Chi siamo";
            bottoneNAV2.innerHTML="Cosa facciamo";
            bottoneNAV3.innerHTML="Dove trovarci";
            bottoneNAV4.innerHTML="Contattaci";
            // Si mettono i pulsanti nelle relative barre
            div1.appendChild(bottoneNAV1);
            div2.appendChild(bottoneNAV2);
            div3.appendChild(bottoneNAV3);
            div4.appendChild(bottoneNAV4);
            document.body.appendChild(div1);
            document.body.appendChild(div2);
            document.body.appendChild(div3);
            document.body.appendChild(div4);
            // Ciclo che scorre tutti gli attributi dei bottoni e controlla quello che è uguale al valore di selezionato (cioè il bottone che viene selezionato) e lo colora di conseguenza
            const bottoni=document.querySelectorAll("[data-ATT]");
            for(let i=0; i<4; i++){
                if(bottoni[i].getAttribute("data-ATT")==selezione){ bottoni[i].id="selezionato"; }
                else{ bottoni[i].id="bottoneSelezione"; }
            }
            // Creazione di una classe CSS per avere un effetto di transizione sul menu a tendina in discesa
            setTimeout(()=>{ 
                div1.classList.add("visible");
                div2.classList.add("visible"); 
                div3.classList.add("visible");
                div4.classList.add("visible");
            }, 10);  
            reindirizzamentoEsteso(bottoneNAV1, bottoneNAV2, bottoneNAV3, bottoneNAV4);
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
    // Dopo la durata della transizione CSS (400ms), rimuoviamo la classe "visible" per far partire l'effetto di scomparsa
    setTimeout(()=>{
        div1.classList.remove("visible"); 
        div2.classList.remove("visible"); 
        div3.classList.remove("visible"); 
        div4.classList.remove("visible");
    }, 10); 
    // Dopo la transizione (400ms), rimuovi i div dal DOM
    setTimeout(()=>{
        // Si controlla se i div effettivamente ci sono, altrimenti produce errore
        if(div1) div1.remove("visible");
        if(div2) div2.remove("visible");
        if(div3) div3.remove("visible");
        if(div4) div4.remove("visible");
    }, 410); 
}

// In base al click di uno dei bottoni sulla barra di navigazione verremo reindirizzati alla pagina specifica
function reindirizzamentoEsteso(bottoneNAV1, bottoneNAV2, bottoneNAV3, bottoneNAV4){
    // In base al bottone cliccato, oltre al reindirizzamneto, si inserisce nella variabile di sessione il valore di ordinamento relativo al bottone cliccato
    bottoneNAV1.addEventListener("click", ()=>{
        sessionStorage.setItem("selezione", 1);
        window.location.href=base+"index.html"; 
    });
    bottoneNAV2.addEventListener("click", ()=>{
        sessionStorage.setItem("selezione", 2);
        window.location.href=base+"pages/cosa-facciamo.html"; });
    bottoneNAV3.addEventListener("click", ()=>{
        sessionStorage.setItem("selezione", 3);
        window.location.href=base+"pages/dove-trovarci.html"; 
    });
    bottoneNAV4.addEventListener("click", ()=>{ 
        sessionStorage.setItem("selezione", 4);
        window.location.href=base+"pages/contattaci.html"; 
    });
} 

// ----- INIZIO: Gestione consenso cookie e privacy popup -----
(function() {
    // Crea il modal se non esiste
    const modalHtml=`
        <div id="consent-modal" class="consent-hidden">
        <div class="consent-backdrop"></div>
        <div class="consent-box">
            <h2>Uso dei Cookie & Privacy</h2>
            <p>
                Per fornire le migliori esperienze, utilizziamo tecnologie come i cookie per memorizzare e/o accedere alle informazioni del dispositivo. Il consenso a queste tecnologie ci permetterà di elaborare dati come il comportamento di navigazione o ID unici su questo sito. Non acconsentire o ritirare il consenso può influire negativamente su alcune caratteristiche e funzioni.
            </p>
            <p >
            <a href="${base}pages/cookie-policy.html" target="_blank" style="text-decoration: underline;">Cookie Policy</a>&nbsp;&nbsp;&nbsp;
            <a href="${base}pages/privacy-policy.html" target="_blank" style="text-decoration: underline;">Privacy Policy</a>
            </p>
            <div class="consent-actions">
            <button id="consent-accept">Accetta</button>
            <button id="consent-decline">Rifiuta</button>
            </div>
        </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const modal=document.getElementById('consent-modal');
    const btnAccept=document.getElementById('consent-accept');
    const btnDecline=document.getElementById('consent-decline');
    const box = modal.querySelector('.consent-box'); 

    // Mostra il modal se non esiste consenso salvato
    if(!localStorage.getItem('cookies-consent')){ modal.classList.remove('consent-hidden'); }

    // Gestione pulsanti
    btnAccept.addEventListener('click', ()=>{
        localStorage.setItem('cookies-consent', 'accepted');
        // Aggiunge la transizione in uscita
        box.classList.remove('appear');
        box.classList.add('disappear');

        // Dopo la transizione, nasconde il modal
        setTimeout(() => {
            modal.classList.add('consent-hidden');
            box.classList.remove('disappear'); // Pulizia
        }, 500);
    });

    btnDecline.addEventListener('click', ()=>{
        localStorage.setItem('cookies-consent', 'declined');
        box.classList.remove('appear');
        box.classList.add('disappear');

        setTimeout(() => {
            modal.classList.add('consent-hidden');
            box.classList.remove('disappear');
        }, 500);
    });

    document.addEventListener("DOMContentLoaded", ()=>{
        const modal=document.getElementById('consent-modal');
        const banner=document.querySelector('.consent-box');
        if(!localStorage.getItem('cookies-consent')){
            modal.classList.remove('consent-hidden'); // Mostra il backdrop
            setTimeout( ()=>{
            banner.classList.add('appear'); // Attiva l'effetto zoom/fade
            }, 10); // Ritardo per triggerare la transizione
        }
    });
})();
// ----- FINE: Gestione consenso cookie e privacy popup -----
  
// Il logo e tutto ciò che segue (barra sotto) vengono aggiornati al ridimensionamento della finestra
window.addEventListener('resize', aggiornaImmagineBarra);

// Al caricamento della pagina in base allo schermo si ridimensiona il logo e si inserisce tutto il resto per la barra sottostante
window.addEventListener("load", ()=>{ aggiornaImmagineBarra(); });