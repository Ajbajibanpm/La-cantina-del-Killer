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
        
        // I prefissi validi che l'utente può inserire (Nascosti dall'interfaccia)
        const VALID_PREFIXES = ["DETECTIVE", "DOTTORE", "MEDIUM", "BIMBO", "AGENTE", "INFORMATIC", "BUSINESS", "STORICO", "PIZZA"];
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
        const recapModal = document.getElementById('recapModal'); // Riferimento al Modal

        // Funzione eseguita al caricamento della pagina
        window.onload = function() {
            loadUser();
        };

        // ----------------------------------------------------------------
        // GESTIONE DEL MODAL DI CONFERMA
        // ----------------------------------------------------------------
        window.showResetConfirmation = function() {
            resetModal.classList.remove('hidden');
        }

        window.hideResetConfirmation = function() {
            resetModal.classList.add('hidden');
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
                        <li class="clickable-subject"
                            onclick="reSubmitCode('${rawCode}')">
                            ${prefixedSubject}
                        </li>
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

        // Resetta l'utente (cancella tutto, inclusi i codici)
        window.resetUser = function() {
            // Nasconde il modal prima di resettare
            hideResetConfirmation(); 
            hideRecapConfirmation(); 

            localStorage.removeItem(USER_PREFIX_KEY);
            localStorage.removeItem(USER_NAME_KEY);
            localStorage.removeItem(SUBMITTED_CODES_KEY);
            for (const ruoli of VALID_PREFIXES) {
                // 1. Rimuove tutte le classi valide, pulendo lo stato
                ImmagineSopra.classList.remove(ruoli);
                ImmagineSotto.classList.remove(ruoli);}
            jolly = ""; // Reset della variabile jolly
            currentUserPrefix = null;
            currentUserName = null;
            updateSubmittedCodesDisplay([]);
            displayResult("Il risultato apparirà qui dopo aver inserito un codice.", false, true); // Reset messaggio
            displaySubjectFeedback("", false, true); // Reset feedback soggetto
            showUserIdView();

            // Opzionale: notifica di reset (solo in console, dato che alert è vietato)
            console.log("Gioco resettato completamente.");
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
    for (const ruoli of VALID_PREFIXES) {
        // 1. Rimuove tutte le classi valide, pulendo lo stato
        ImmagineSopra.classList.remove(ruoli);
        ImmagineSotto.classList.remove(ruoli);
        
        
        // 2. Se è il ruolo corretto, lo aggiunge di nuovo (solo uno sarà aggiunto)
        if (currentUserPrefix === ruoli) { 
            ImmagineSopra.classList.add(ruoli);
            ImmagineSotto.classList.add(ruoli);
            localStorage.setItem('prefix_salvato', currentUserPrefix);
        }
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


