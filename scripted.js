// ------------------------------------------------------------------------------------------------
        let ImmagineSopra = document.querySelector('.chat-box');
        let ImmagineSotto = document.querySelector('.chat-sotto');
        // VARIABILI GLOBALI E COSTANTI
        // ------------------------------------------------------------------------------------------------

        // VARIABILE JOLLY: Inizializzata a ""
        let jolly = "";
        
        let currentUserPrefix = null;
        let currentUserName = null;
        const USER_PREFIX_KEY = 'gameUserPrefix';
        const USER_NAME_KEY = 'gameUserName';
        const SUBMITTED_CODES_KEY = 'submittedCodes';
        const USER_NOTES_KEY = 'gameUserNotes'; // <--- NUOVA CHIAVE PER LE NOTE

        // I prefissi validi che l'utente può inserire (Nascosti dall'interfaccia)
        const VALID_PREFIXES = ["DETECTIVE", "DOTTORE", "MEDIUM", "BIMBO", "AGENTE", "INFORMATICO", "BUSINESS", "STORICO", "PIZZA"];
        const imagination = ''
        // TABELLA DEI CODICI - Aggiornata con la variabile 'type'
        const CODE_MAP = {
            // Struttura: { subject: "NOME", message: "MESSAGGIO", type: "TIPO" }

            // OGGETTI (Codici X-001 a X-003)
            "DETECTIVE-001": { subject: "OROLOGIO", message: "Il tempo.. di attività è critico. La sequenza ha inizio: ora.", type: "OGGETTO"},
            "DETECTIVE-002": { subject: "ENERGIA", message: "Potenza insufficiente. Ristabilire il flusso agli ingranaggi secondari.", type: "OGGETTO" },
            "DETECTIVE-003": { subject: "MAPPA", message: "Coordinate acquisite. La destinazione è a est, oltre il punto X.", type: "OGGETTO" },
            // RICORDI (Codici rimanenti)
            "DETECTIVE-004": { subject: "CHIMICA", message: "Reazione completata con successo. Il composto è stabile e pronto all'uso.", type: "RICORDO" },
            "DETECTIVE-005": { subject: "ARCHIVIO", message: "Documento 'Project Phoenix' scaricato. Analisi dei dati in corso.", type: "RICORDO" },
            "DETECTIVE-006": { subject: "COMETA", message: "Anomalia rilevata. Un corpo celeste si avvicina alla nostra orbita.", type: "RICORDO" },
            "DETECTIVE-007": { subject: "CRIPTA", message: "Decrittazione completata. Il codice di accesso è stato svelato.", type: "RICORDO" },
            "DETECTIVE-008": { subject: "FOTO", message: "Immagine acquisita. Il soggetto è identificato con alta probabilità.", type: "RICORDO" },
            "DETECTIVE-009": { subject: "FLUIDO", message: "Il sistema idraulico è pressurizzato. Aprire la valvola lentamente.", type: "RICORDO" },
            "DETECTIVE-010": { subject: "PORTALE", message: "Attivazione completata. La transizione dimensionale è imminente.", type: "RICORDO" },

            // OGGETTI (Codici X-001 a X-003)
            "MEDIUM-001": { subject: "CLESSIDRA", message: "Ogni granello di sabbia è un sussurro del passato. Ascolta il ticchettio nascosto.", type: "OGGETTO" },
            "MEDIUM-002": { subject: "SCINTILLA", message: "L'elettricità è la forza vitale, la chiave per risvegliare l'antica macchina.", type: "OGGETTO" },
            "MEDIUM-003": { subject: "LABIRINTO", message: "Ogni svolta ti allontana dalla verità. Devi fidarti del tuo istinto, non della vista.", type: "OGGETTO" },
            // RICORDI (Codici rimanenti)
            "MEDIUM-004": { subject: "ALCHIMIA", message: "La fusione degli elementi rivela la formula segreta per la trasformazione.", type: "RICORDO" },
            "MEDIUM-005": { subject: "PERGAMENA", message: "I segreti sono celati nelle fibre antiche. La verità è scritta in un linguaggio dimenticato.", type: "RICORDO" },
            "MEDIUM-006": { subject: "COSTELAZIONE", message: "Guarda in alto. Le stelle formano un disegno, una guida tracciata dal destino.", type: "RICORDO" },
            "MEDIUM-007": { subject: "ENIGMA", message: "Ciò che è chiuso può essere aperto solo dalla logica e dalla paura. Risolvi l'indovinello.", type: "RICORDO" },
            "MEDIUM-008": { subject: "RIFLESSO", message: "L'immagine che vedi non è te. Guarda oltre il vetro per la vera forma.", type: "RICORDO" },
            "MEDIUM-009": { subject: "LACRIMA", message: "Solo le acque purificate possono scorrere. Il pianto della sorgente è la tua cura.", type: "RICORDO" },
            "MEDIUM-010": { subject: "SOGLIA", message: "Non è la fine, ma un nuovo inizio. Attraversa il velo dell'ignoto.", type: "RICORDO" },
            
            // OGGETTI (Codici X-001 a X-003)
            "BAMBINO-001": { subject: "TIMER", message: "Priorità 1: Punti di controllo. Mancano 60 secondi all'attivazione.", type: "OGGETTO" },
            "BAMBINO-002": { subject: "BATTERIA", message: "Alimenta la tua risorsa più vicina. L'indicatore è rosso.", type: "OGGETTO" },
            "BAMBINO-003": { subject: "PERCORSO", message: "Deviazione necessaria. Segui la linea rossa sul pavimento. Non fermarti.", type: "OGGETTO" },
            // RICORDI (Codici rimanenti)
            "BAMBINO-004": { subject: "MISCELA", message: "Combinare i liquidi A e C. Il risultato deve essere verde brillante.", type: "RICORDO" },
            "BAMBINO-005": { subject: "FASCICOLO", message: "Accesso al livello 3 ottenuto. Il file protetto è stato aperto.", type: "RICORDO" },
            "BAMBINO-006": { subject: "SATELLITE", message: "Connessione persa. Ricalibrare l'antenna parabolica verso il nord.", type: "RICORDO" },
            "BAMBINO-007": { subject: "BLOCCO", message: "Sistema di sicurezza attivato. Inserisci la sequenza numerica per disarmare il lucchetto.", type: "RICORDO" },
            "BAMBINO-008": { subject: "MONITOR", message: "Trasmissione video in arrivo. Concentrati sul dettaglio nell'angolo in alto a destra.", type: "RICORDO" },
            "BAMBINO-009": { subject: "TUBO", message: "C'è una perdita critica nel condotto principale. Ispeziona la giunzione.", type: "RICORDO" },
            "BAMBINO-010": { subject: "USCITA", message: "Hai raggiunto il punto di estrazione. Procedi con cautela. La missione è quasi terminata.", type: "RICORDO" },

            // ESEMPI PER CODICI NON DIPENDENTI DALL'UTENTE (generici)
            "FINALE": { subject: "COMPLETATO", message: "Complimenti a tutti! Avete completato l'Escape Game! Un'ottima performance. Il viaggio si conclude qui.", type: "RICORDO" },
        };

        // Riferimenti agli elementi HTML
        const userIdInput = document.getElementById('userIdInput');
        const nameInput = document.getElementById('nameInput');
        const codeInput = document.getElementById('codeInput');
        const resultMessage = document.getElementById('resultMessage');
        const resultBox = document.getElementById('resultBox');
        const userIdView = document.getElementById('userIdView');
        const nameInputView = document.getElementById('nameInputView');
        const gameCodeView = document.getElementById('gameCodeView');
        const welcomeMessage = document.getElementById('welcomeMessage');
        const errorMsgUser = document.getElementById('errorMsgUser');
        const codeListContent = document.getElementById('codeListContent');
        const namePrompt = document.getElementById('namePrompt');
        const subjectFeedbackBox = document.getElementById('subjectFeedbackBox');
        const subjectFeedbackMessage = document.getElementById('subjectFeedbackMessage');
        const resetModal = document.getElementById('resetModal'); // Riferimento al Modal
        const ShowPModal = document.getElementById('ShowPModal'); // Riferimento al Modal
        const ShowNModal = document.getElementById('ShowNModal'); // Riferimento al Modal
        const recapModal = document.getElementById('recapModal'); // Riferimento al Modal
        const noteInput = document.getElementById('noteInput');
        const noteInputView = document.getElementById('noteInputView');


        // Funzione eseguita al caricamento della pagina
        window.onload = function() {
            loadUser();
            loadCharacterNotes();
        };

        // ----------------------------------------------------------------
        // GESTIONE DEL MODAL DI CONFERMA
        // ----------------------------------------------------------------
        window.showResetConfirmation = function() {
            resetModal.classList.remove('hidden');
        }

        window.ShowPConfirmation = function() {
            ShowPModal.classList.remove('hidden');
        }

        window.ShowNConfirmation = function() {
            ShowNModal.classList.remove('hidden');
        }

        window.hideResetConfirmation = function() {
            resetModal.classList.add('hidden');
        }

        window.hideShowPConfirmation = function() {
            saveCharacterNotes();
            ShowPModal.classList.add('hidden');
        }

        window.hideShowNConfirmation = function() {
            saveCharacterNotes();
            ShowNModal.classList.add('hidden');
        }

        // ----------------------------------------------------------------
        // ****GESTIONE DEL MODAL DI CONFERMA
        // ----------------------------------------------------------------
        window.showRecapConfirmation = function() {
            recapModal.classList.remove('hidden');
        }

        window.hideRecapConfirmation = function() {
            recapModal.classList.add('hidden');
        } // --*** -- //

        // ----------------------------------------------------------------
        // GESTIONE DEI CODICI SALVATI E DISPLAY DEI SOGGETTI
        // ----------------------------------------------------------------

        function getSubmittedCodes() {
            const codesJson = localStorage.getItem(SUBMITTED_CODES_KEY);
            return codesJson ? JSON.parse(codesJson) : [];
        }

        function setSubmittedCodes(codes) {
            localStorage.setItem(SUBMITTED_CODES_KEY, JSON.stringify(codes));
        }

        // Aggiunge un codice alla lista se non è già presente
        function addSubmittedCode(code) {
            let codes = getSubmittedCodes();
            if (!codes.includes(code)) {
                codes.push(code);
                setSubmittedCodes(codes);
                updateSubmittedCodesDisplay(codes); // Aggiorna la visualizzazione
                return true; // Codice NUOVO
            }
            return false; // Codice DUPLICATO
        }

        // AGGIORNATA: Aggiunge la visualizzazione del 'tipo' (OGGETTO/RICORDO)
        function updateSubmittedCodesDisplay(codes = null) {
            codes = codes || getSubmittedCodes();

            if (codes.length === 0) {
                codeListContent.textContent = "Nessun soggetto ancora sbloccato.";
            } else {
                let listHtml = '';
                codes.forEach(rawCode => {
                    const searchKey = `${currentUserPrefix}-${rawCode}`;
                    // Cerca il soggetto con chiave personalizzata o generica
                    let codeInfo = CODE_MAP[searchKey] || CODE_MAP[rawCode];
                    
                    const subject = codeInfo ? codeInfo.subject : `[Soggetto Sconosciuto]`;
                    const type = codeInfo ? codeInfo.type : `[TIPO SCONOSCIUTO]`; // Prende il tipo
                    
                    // Crea l'elemento con il prefisso di tipo
                    const prefixedSubject = `<span class="tipo-${type}">${type}</span>: ${subject}`;

                    // L'elemento <li> è reso cliccabile e chiama reSubmitCode con il codice grezzo (rawCode)
                    listHtml += `
                        <li class="cliccabile-subject"
                            onclick="reSubmitCode('${rawCode}')">
                            ${prefixedSubject} 
                        </li> <br>
                    `;
                });
            
                codeListContent.innerHTML = `<ul class="list-disc pl-5 mt-1">${listHtml}</ul>`;
            }
        }
        
        // Simula l'inserimento del codice cliccato dal registro
        window.reSubmitCode = function(rawCode) {
            // Imposta e immediatamente esegue la verifica
            codeInput.value = rawCode;
            checkCode();
        }

        // ----------------------------------------------------------------
        // GESTIONE AUTENTICAZIONE E SALVATAGGIO (FASE 1 & 2)
        // ----------------------------------------------------------------

        function loadUser() {
            const savedPrefix = localStorage.getItem(USER_PREFIX_KEY);
            const savedName = localStorage.getItem(USER_NAME_KEY);
            if (savedPrefix) {
            // Usa savedPrefix al posto di currentUserPrefix all'avvio
            currentUserPrefix = savedPrefix; 
            coccole(); // Chiama la funzione per applicare la classe salvata
            };
        
            
            if (savedPrefix && savedName) {
                currentUserPrefix = savedPrefix;
                currentUserName = savedName;
                showGameView(savedName);
                
            } else if (savedPrefix) {
                currentUserPrefix = savedPrefix;
                showNameInputView();
            } else {
                showUserIdView();
            
            }
        }

        // Verifica l'ID del Gruppo (FASE 1)
        window.checkUserId = function() {
            let inputPrefix = userIdInput.value.trim().toUpperCase();

            if (inputPrefix.length < 1) {
                displayError(errorMsgUser, "Inserisci il codice del tuo gruppo.");
                return;
            }

            inputPrefix = inputPrefix.replace(/[^A-Z0-9]/g, '');

            if (VALID_PREFIXES.includes(inputPrefix)) {
                const ruolo = inputPrefix;
                localStorage.setItem(USER_PREFIX_KEY, inputPrefix);
                currentUserPrefix = inputPrefix;
                displayError(errorMsgUser, "", true);
                // NOTA: I codici vengono resettati solo se si cambia gruppo, non ad ogni accesso.
                // Per un reset completo, l'utente deve usare il pulsante 'Reset Totale'.
                
                // Rimuovi l'eventuale nome salvato se si cambia gruppo
                localStorage.removeItem(USER_NAME_KEY);
                currentUserName = null; 

                updateSubmittedCodesDisplay([]);
                
                // Aggiorna il testo per la fase successiva
             coccole();
                namePrompt.textContent = `Perfetto! Ora, inserisci il tuo nome per personalizzare l'esperienza.`; 
                showNameInputView();
            
            } else {
                // Messaggio di errore generico AGGIORNATO
                displayError(errorMsgUser, `Il codice inserito non esiste. Riprova.`);
            }
        }
        
        // Salva il Nome (FASE 2)
        window.saveUserName = function() {
            const inputName = nameInput.value.trim();

            if (inputName.length < 2) {
                alertUser("Per favore, inserisci un nome valido.");
                return;
            }

            localStorage.setItem(USER_NAME_KEY, inputName);
            currentUserName = inputName;
            showGameView(inputName);
        }
window.saveCharacterNotes = function() {
            if (noteInput) {
        const notes = noteInput.value.trim();
        localStorage.setItem(USER_NOTES_KEY, notes);
        console.log("Note del personaggio salvate.");
        }}

        window.loadCharacterNotes = function() {
    if (noteInput) {
        const savedNotes = localStorage.getItem(USER_NOTES_KEY);
        if (savedNotes) {
            noteInput.value = savedNotes;
            console.log("Note del personaggio caricate.");
        } else {
             noteInput.value = ""; // Assicura che sia vuoto se non c'è nulla
        }
    } else {
        // Se non trovi la textarea, prova a cercarla dopo un piccolo ritardo
        // (utile se l'HTML viene caricato dopo)
        setTimeout(() => {
             const element = document.getElementById('noteInput');
             if (element) {
                 element.value = localStorage.getItem(USER_NOTES_KEY) || "";
             }
        }, 100);
    }
}

        // Resetta l'utente (cancella tutto, inclusi i codici)
        window.resetUser = function() {
            // Nasconde i vari modal
            hideResetConfirmation(); 
            hideRecapConfirmation();
            hideShowPConfirmation();
            hideShowNConfirmation(); 

            // 1. Pulizia LocalStorage
            localStorage.removeItem(USER_PREFIX_KEY);
            localStorage.removeItem(USER_NAME_KEY);
            localStorage.removeItem(SUBMITTED_CODES_KEY);
            localStorage.removeItem(USER_NOTES_KEY);
            localStorage.removeItem('prefix_salvato'); // Rimuoviamo anche questa chiave

            // 2. Pulizia Classi Numeriche (ruolo-0, ruolo-1, ecc.)
            // Usiamo l'array VALID_PREFIXES per sapere quanti numeri dobbiamo ciclare
            VALID_PREFIXES.forEach((_, i) => {
                ImmagineSopra.classList.remove(`ruolo-${i}`);
                ImmagineSotto.classList.remove(`ruolo-${i}`);
            });

            // 3. Reset variabili globali
            jolly = ""; 
            currentUserPrefix = null;
            currentUserName = null;

            // 4. Reset Interfaccia
            updateSubmittedCodesDisplay([]);
            displayResult("Il risultato apparirà qui dopo aver inserito un codice.", false, true);
            displaySubjectFeedback("", false, true);
            
            // Svuota le note se presenti
            if (noteInput) noteInput.value = "";

            // 5. Ritorno alla vista iniziale
            showUserIdView();

            // 6. Reset dei brillantini al colore originale (CSS)
            if (typeof init === 'function') init();

            console.log("Gioco resettato e immagini ripristinate.");
        }

        // ----------------------------------------------------------------
        // CAMBIO DI VISTA
        // ----------------------------------------------------------------

        function hideAllViews() {
            userIdView.classList.add('hidden');
            nameInputView.classList.add('hidden');
            gameCodeView.classList.add('hidden');
        }

// Definizione della funzione (come l'hai fornita)
function coccole() {
    // 1. Trova l'indice del ruolo attuale nell'array
    const indiceRuolo = VALID_PREFIXES.indexOf(currentUserPrefix);

    // 2. Pulizia: rimuoviamo tutte le possibili classi "ruolo-X"
    for (let i = 0; i < VALID_PREFIXES.length; i++) {
        ImmagineSopra.classList.remove(`ruolo-${i}`);
        ImmagineSotto.classList.remove(`ruolo-${i}`);
    }

    // 3. Se il ruolo è valido (indice trovato), aggiungiamo la classe numerica
    if (indiceRuolo !== -1) {
        const classeDinamica = `ruolo-${indiceRuolo}`;
        ImmagineSopra.classList.add(classeDinamica);
        ImmagineSotto.classList.add(classeDinamica);
        
        localStorage.setItem('prefix_salvato', currentUserPrefix);
        
        // Aggiorna anche i brillantini!
        if (typeof init === 'function') init(); 
    }
}
    // Rimuovi SEMPRE la classe per pulire lo stato precedente
    //ImmagineSopra.classList.remove("detective");
    //ImmagineSopra.classList.remove("medium"); 

    // Applica la classe SOLO se il prefisso corrisponde
    //if (currentUserPrefix === "DETECTIVE") { 
    //    ImmagineSopra.classList.add("detective");
    //};
    //if (currentUserPrefix === "MEDIUM") { 
      //      ImmagineSopra.classList.add("medium");
        //}}

        function showUserIdView() {
            hideAllViews();
            userIdView.classList.remove('hidden');
            userIdInput.value = "";
            userIdInput.focus();
        }

        function showNameInputView() {
            hideAllViews();
            nameInputView.classList.remove('hidden');
            nameInput.value = "";
            nameInput.focus();
        }



        function showGameView(name) {
            hideAllViews();
            // Mostra solo il nome nel messaggio di benvenuto
            welcomeMessage.textContent = `Benvenuto, ${name}!`;
            gameCodeView.classList.remove('hidden');
            codeInput.focus();
            updateSubmittedCodesDisplay();
        }


        // ----------------------------------------------------------------
        // GESTIONE RISULTATI E FEEDBACK
        // ----------------------------------------------------------------
        
        function displayError(element, message, hide = false) {
            if (hide || message === "") {
                element.classList.add('hidden');
            } else {
                element.textContent = message;
                element.classList.remove('hidden');
            }
        }

        // Funzione per mostrare il messaggio di risultato (successo o errore)
        function displayResult(message, isSuccess = true, isReset = false) {
            resultBox.classList.remove('border-gray-300', 'border-red-500', 'bg-red-100', 'border-green-500', 'bg-green-100', 'border-yellow-500', 'bg-yellow-100');
            resultMessage.classList.remove('text-gray-500', 'text-red-700', 'italic', 'text-green-800', 'font-semibold', 'text-yellow-800');
            
            if (isReset) {
                resultBox.classList.add('border-gray-300');
                resultMessage.textContent = message;
                resultMessage.classList.add('text-gray-500', 'italic');
            } else if (isSuccess) {
                // Successo (NUOVO CODICE o RIPETIZIONE)
                resultBox.classList.add('border-green-500', 'bg-green-100');
                resultMessage.textContent = message;
                resultMessage.classList.add('text-green-800', 'font-semibold');
            } else {
                // Errore (Codice NON valido)
                resultBox.classList.add('border-red-500', 'bg-red-100');
                resultMessage.textContent = message;
                resultMessage.classList.add('text-red-700');
            }
        }

        // Funzione per mostrare il feedback del soggetto (Nuovo/Duplicato/Errore)
        function displaySubjectFeedback(message, isNewSubject = true, isReset = false) {
            subjectFeedbackBox.classList.remove('hidden', 'border-red-400', 'bg-red-50', 'border-indigo-400', 'bg-indigo-100', 'border-gray-300', 'bg-gray-100');
            subjectFeedbackMessage.classList.remove('text-indigo-800', 'text-red-700', 'text-gray-700');
            
            if (isReset) {
                subjectFeedbackBox.classList.add('hidden');
                return;
            } else if (isNewSubject) {
                // Nuovo Soggetto (Feedback Positivo)
                subjectFeedbackBox.classList.add('border-indigo-400', 'bg-indigo-100');
                subjectFeedbackMessage.textContent = message;
                subjectFeedbackMessage.classList.add('text-indigo-800', 'font-semibold');
            } else {
                // Soggetto Già Noto (Feedback Neutro/Avviso)
                subjectFeedbackBox.classList.add('border-gray-300', 'bg-gray-100');
                subjectFeedbackMessage.textContent = message;
                subjectFeedbackMessage.classList.add('text-gray-700');
            }
            subjectFeedbackBox.classList.remove('hidden');
        }
        
        function alertUser(message) {
            console.error("ERRORE UTENTE:", message);
            displayResult(message, false);
            displaySubjectFeedback("Errore durante l'operazione.", false);
        }

        // Funzione principale di controllo del codice
        window.checkCode = function() {
            if (!currentUserPrefix || !currentUserName) {
                alertUser("ERRORE: I dati utente sono incompleti. Riavvia l'app e rifai l'accesso.");
                resetUser();
                return;
            }

            const inputGameCode = codeInput.value.trim().toUpperCase();
            // Pulisce l'input dopo l'uso, indipendentemente dalla fonte
            codeInput.value = '';

            if (inputGameCode === "") {
                displayResult("Per favore, inserisci un codice di gioco.", false);
                displaySubjectFeedback("", false, true);
                return;
            }

            // ==========================================================
            // LOGICA SPECIALE PER IL CODICE "001"
            // ==========================================================
            if (inputGameCode === "001") {
                jolly = "eh eh eh"; // Aggiorna la variabile jolly come richiesto
            }
            // ==========================================================
            
            let resultData = null; // Sarà l'oggetto { subject, message, type }
            let foundKey = null;
            const searchKey = `${currentUserPrefix}-${inputGameCode}`;

            // 1. Eseguo la ricerca con la chiave personalizzata o generica
            if (CODE_MAP.hasOwnProperty(searchKey)) {
                // Faccio una copia dell'oggetto per poter modificare il messaggio senza alterare la mappa originale
                resultData = {...CODE_MAP[searchKey]};
                foundKey = inputGameCode;
            } else if (CODE_MAP.hasOwnProperty(inputGameCode)) {
                // Faccio una copia
                resultData = {...CODE_MAP[inputGameCode]};
                foundKey = inputGameCode;
            } else {
                // Codice NON trovato
                displayResult(`"${inputGameCode}" non è un codice valido in questo momento. Riprova!`, false);
                displaySubjectFeedback("", false, true); // Nascondi il box feedback soggetto
                return;
            }

            // ==========================================================
            // AGGIUNTA DINAMICA DELLA VARIABILE JOLLY AL MESSAGGIO
            // ==========================================================
            // Applica la variabile 'jolly' al codice DETECTIVE-001 e DETECTIVE-002 come richiesto
            if (searchKey === "DETECTIVE-001" || searchKey === "DETECTIVE-002") {
                resultData.message += " " + jolly;
            }
            // ------------------------------------------------------------
            // LOGICA DI CONTROLLO DUPLICATO E FEEDBACK SOGGETTO
            // ------------------------------------------------------------
            
            const isNew = addSubmittedCode(foundKey); // Tenta di aggiungere il codice e verifica se è nuovo
            
            if (isNew) {
                // Codice NUOVO trovato
                displayResult(resultData.message, true);
                // Aggiorno il feedback con il TIPO
                displaySubjectFeedback(`Nuovo ${resultData.type}: ${resultData.subject}`, true);
            } else {
                // Codice DUPLICATO - RIPETI il messaggio e indica che è già noto
                displayResult(resultData.message, true); // Ripete il messaggio con lo stile di successo (verde)
                // Aggiorno il feedback con il TIPO
                displaySubjectFeedback(`${resultData.type}: ${resultData.subject} (già noto).`, false);
            }
        }
const moddal=document.querySelector('.cartaGiornale')
moddal.scrollTop = moddal.scrollHeight


// BRILLANTINI

const canvas = document.getElementById('canvasBrillantini');
const ctx = canvas.getContext('2d');
let particlesArray = [];

// Funzione per leggere le variabili CSS aggiornate
const getCSSVar = (prop) => getComputedStyle(canvas).getPropertyValue(prop).trim();

window.addEventListener('mousedown', (e) => esplosione(e.clientX, e.clientY));
window.addEventListener('touchstart', (e) => {
    esplosione(e.touches[0].clientX, e.touches[0].clientY);
});

function esplosione(x, y) {
    const stile = getComputedStyle(canvas);
    
    // Leggiamo sia la potenza che il raggio dal CSS
    const potenza = parseFloat(getCSSVar('--potenza-urto')) || 40;
    const raggioUrto = parseFloat(getCSSVar('--raggio-urto')) || 300;
    
    particlesArray.forEach(p => {
        const dx = p.x - x;
        const dy = p.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Usiamo la variabile raggioUrto invece del numero fisso 600
        if (distance < raggioUrto) {
            // La forza diminuisce man mano che ci si allontana dal centro del tocco
            const force = potenza / (distance / 20 + 1);
            const dirX = dx / distance;
            const dirY = dy / distance;

            p.vx += dirX * force;
            p.vy += dirY * force;
        }
    });
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init(); 
}

window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor(color, speedMult, glow) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.color = color;
        this.glow = glow;
        this.opacity = Math.random() * 0.5 + 0.2;
        
        // Velocità di crociera letta dal CSS
        this.baseVx = (Math.random() - 0.5) * speedMult;
        this.baseVy = (Math.random() - 0.5) * speedMult;
        
        this.vx = this.baseVx;
        this.vy = this.baseVy;
        this.friction = 0.94; 
    }

    update() {
        this.vx = this.baseVx + (this.vx - this.baseVx) * this.friction;
        this.vy = this.baseVy + (this.vy - this.baseVy) * this.friction;

        this.x += this.vx;
        this.y += this.vy;

        // Reset velocità al teletrasporto
        if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {
            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;
            
            this.vx = this.baseVx;
            this.vy = this.baseVy;
        }
    }

    draw() {
        ctx.shadowBlur = this.glow;
        ctx.shadowColor = `rgba(${this.color}, 0.8)`;
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

function init() {
    particlesArray = [];
    const stile = getComputedStyle(canvas);
    
    const quantita = parseInt(getCSSVar('--quantita-particelle')) || 100;
    const velocita = parseFloat(getCSSVar('--velocita-particelle')) || 0.2;
    const bagliore = parseFloat(getCSSVar('--bagliore-particelle')) || 10;
    
    // Recuperiamo il ruolo attuale dal localStorage
    const savedRole = localStorage.getItem('gameUserPrefix'); 

    let colore;
    
    // CONFRONTO DINAMICO: Verifica se il ruolo salvato è uguale al terzo elemento della lista (indice 2)
    if (savedRole === VALID_PREFIXES[1]) {
        colore = "0, 255, 0;";} // Verde (Dottore)
    else if (savedRole === VALID_PREFIXES[2]) {
        colore = "147, 112, 219";} // Viola (Medium)
    else if (savedRole === VALID_PREFIXES[3]) {
        colore = "0, 200, 200";} // Azzurro (Bimbo)
    else if (savedRole === VALID_PREFIXES[4]) {
        colore = "255, 155, 50";} // Arancione (Agente)
    else if (savedRole === VALID_PREFIXES[5]) {
        colore = "0, 82, 89";} // Blu (Informatico)
    else if (savedRole === VALID_PREFIXES[6]) {
        colore = "150, 152, 159";} // Grigio (Business)
    else if (savedRole === VALID_PREFIXES[7]) {
        colore = "255, 200, 100";} // Oro (Storico)
    else if (savedRole === VALID_PREFIXES[8]) {
        colore = "255, 255, 0";} // Giallo (Pizza)
    
    
    else {
        colore = getCSSVar('--colore-particelle') || "255, 255, 255"; 
    }

    for (let i = 0; i < quantita; i++) {
        particlesArray.push(new Particle(colore, velocita, bagliore));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

resizeCanvas(); 
animate();