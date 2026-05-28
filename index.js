// ==========================================================================
// LÓGICA DE LA PRESENTACIÓN E INTERACTIVIDAD (index.js)
// ==========================================================================

const initPresentationApp = () => {

    // --- ESTADO GLOBAL DE LA APLICACIÓN ---
    const state = {
        currentSlideIndex: 0,
        speakers: [
            "Jorge Clreigues Malet (Ponente 1)",
            "Nahuel Chosco Flores (Ponente 2)",
            "Brad Owen Valladares Quispe (Ponente 3)",
            "Jordi Barrachina Méndez (Ponente 4)",
            "Sergio Camacho Roig (Ponente 5)"
        ],
        // Tiempos objetivo por diapositiva en segundos (120s = 2 min, 240s = 4 min para demo)
        slideTargetTimes: [120, 120, 120, 120, 120, 120, 120, 240, 120, 120],
        timerInterval: null,
        timerRunning: false,
        totalTimeRemaining: 20 * 60, // 20 minutos en segundos
        slideTimeElapsed: 0,
        slideTimerInterval: null,
        
        // Datos del simulador UML (Slide 8)
        umlClass: {
            name: "Usuario",
            attributes: [
                { id: 1, vis: "-", name: "id", type: "int" },
                { id: 2, vis: "+", name: "nombre", type: "String" },
                { id: 3, vis: "-", name: "email", type: "String" }
            ],
            methods: [
                { id: 1, vis: "+", name: "autenticar", params: "token: String", ret: "boolean" },
                { id: 2, vis: "+", name: "obtenerPerfil", params: "", ret: "UserProfile" }
            ]
        }
    };

    // --- NOTAS Y DISCURSO DE PONENTE EN ESPAÑOL ---
    const speakerNotes = [
        // Slide 1: Portada
        {
            speakerIndex: 0,
            targetTime: "2:00 min",
            speech: `
                <p><strong>[Inicio y Bienvenida]</strong> Buenos días a todos y al profesorado. Bienvenidos a nuestro seminario sobre la herramienta <strong>StarUML</strong>, analizada bajo la perspectiva de la asignatura <strong>Desarrollo de Software Dirigido por Modelos (DSM)</strong>.</p>
                <p>Mi nombre es <strong>Jorge Clreigues Malet</strong> y, junto con mis compañeros Nahuel, Brad, Jordi y Sergio, daremos un recorrido exhaustivo por la herramienta. No nos limitaremos a verla como un simple programa de dibujo, sino que analizaremos su rigor semántico en MDE, su formato JSON extensible, la ingeniería directa e inversa, y concluiremos con una demo en vivo y una valoración crítica de sus capacidades.</p>
                <p>Empecemos por situar la herramienta a nivel comercial y técnico.</p>
            `,
            tip: "<ul><li>Presenta al grupo con un tono académico formal y pausado.</li><li>Destaca el título del trabajo enfocado en MDE (Model-Driven Engineering).</li></ul>"
        },
        // Slide 2: Resumen e Información Técnica
        {
            speakerIndex: 0,
            targetTime: "2:00 min",
            speech: `
                <p><strong>[Ficha Técnica]</strong> StarUML es un software comercial desarrollado por la compañía coreana <strong>MKLab</strong>. Destaca por ser extremadamente ligero al estar desarrollado sobre <strong>Electron</strong> (una combinación de Node.js, HTML5 y Chromium), lo que lo hace nativo para Windows, macOS y Linux.</p>
                <p><strong>[Licenciamiento y Acceso]</strong> En el ámbito de MDE esto es clave: la herramienta ofrece una <strong>versión de evaluación gratuita sin límite de tiempo</strong> (solo muestra un aviso ocasional al guardar y una marca de agua en las exportaciones). Su licencia personal tiene un pago único muy asequible de 99 dólares, lo que facilita su implantación tanto en proyectos académicos como en startups.</p>
                <p>A continuación, mi compañero Nahuel profundizará en la diferencia entre diagramar y modelar.</p>
            `,
            tip: "<ul><li>Muestra con el ratón la ficha técnica de la derecha.</li><li>Explica que al estar basado en web standards, su rendimiento es ágil en cualquier portátil académico.</li></ul>"
        },
        // Slide 3: Modelo vs Diagrama
        {
            speakerIndex: 1,
            targetTime: "2:00 min",
            speech: `
                <p><strong>[Modelo vs. Diagrama]</strong> Gracias, Jorge. Buenos días. Soy <strong>Nahuel Chosco Flores</strong>. Para entender StarUML en el contexto de MDE, es imperativo asimilar un concepto fundamental de la asignatura: la diferencia entre <em>Modelo</em> y <em>Diagrama</em>.</p>
                <p>Un diagrama es una representación gráfica parcial (coordenadas, cajitas, colores). En cambio, el <strong>modelo</strong> es la base de datos semántica subyacente que almacena los elementos lógicos y sus relaciones. StarUML opera sobre el modelo y soporta múltiples tipos de diagramas, tanto estructurales como de comportamiento: diagramas de clases, de transición de estados, de secuencia o de casos de uso, organizándolos todos bajo la misma jerarquía. Por eso, si eliminamos una clase del diagrama visual, esta sigue viva en la base de datos del modelo, ya que su definición semántica no se ha destruido.</p>
                <p>Además, cuenta con un motor de validación asíncrona que chequea continuamente el metamodelo UML, evitando errores lógicos antes de la fase de generación de código.</p>
            `,
            tip: "<ul><li>Enfatiza fuertemente este slide: la diferencia entre modelo y diagrama es un pilar teórico evaluado en DSM.</li><li>Destaca cómo StarUML puede integrar diagramas de clases y de estados en el mismo modelo semántico.</li></ul>"
        },
        // Slide 4: Jerarquía MOF
        {
            speakerIndex: 1,
            targetTime: "2:00 min",
            speech: `
                <p><strong>[Jerarquía MOF]</strong> Relacionando StarUML con los estándares formales de la OMG, podemos situarlo de forma precisa en la arquitectura de 4 niveles de **MOF (Meta Object Facility)**:</p>
                <ul>
                    <li><strong>Nivel M3:</strong> Es el nivel de MOF (el meta-metamodelo), que define las reglas para construir lenguajes de modelado.</li>
                    <li><strong>Nivel M2:</strong> Es el metamodelo de UML 2.x o SysML. StarUML implementa esta especificación de forma nativa en su lógica interna (sabe qué es una Clase, un Atributo o una Generalización).</li>
                    <li><strong>Nivel M1:</strong> Es el modelo del sistema de software específico que nosotros creamos (ej. el archivo <code>.mdj</code> con nuestro diseño).</li>
                    <li><strong>Nivel M0:</strong> Corresponde a los objetos concretos de ejecución corriendo con valores reales en la memoria de la máquina.</li>
                </ul>
                <p>Esta conformidad estricta garantiza la interoperabilidad conceptual estudiada en clase. Le paso la palabra a Brad.</p>
            `,
            tip: "<ul><li>Sigue visualmente la escalera de niveles M3 -> M2 -> M1 -> M0 de la izquierda.</li><li>Destaca la palabra 'Conformidad' como la relación matemática y formal entre niveles.</li></ul>"
        },
        // Slide 5: El formato .mdj (JSON)
        {
            speakerIndex: 2,
            targetTime: "2:00 min",
            speech: `
                <p><strong>[El formato .mdj]</strong> Hola a todos, soy <strong>Brad Owen Valladares Quispe</strong>. Tradicionalmente, las herramientas CASE exportan en XML Metadata Interchange (XMI) de la OMG, que suele resultar en archivos pesados y difíciles de parsear sin librerías enormes.</p>
                <p>StarUML rompe esto guardando todos sus proyectos en un archivo de texto plano estructurado en **JSON** con extensión <code>.mdj</code>.</p>
                <p>Como pueden ver en el código de la derecha, la estructura es extremadamente limpia y legible. Cada objeto posee un identificador único (<code>_id</code>), un tipo que hace referencia a su elemento en el metamodelo M2 (como <code>UMLClass</code>) y propiedades anidadas. Esto nos otorga el poder de escribir scripts externos en Node.js o Python para procesar el modelo de forma ultra-rápida, facilitando la creación de herramientas MDE personalizadas.</p>
            `,
            tip: "<ul><li>Explica el fragmento de código JSON, detallando el atributo '_type' que referencia al nivel M2 y el '_id' que asegura la trazabilidad.</li></ul>"
        },
        // Slide 6: Transformación M2T (Determinismo)
        {
            speakerIndex: 2,
            targetTime: "2:00 min",
            speech: `
                <p><strong>[Generación de Código (M2T)]</strong> El principal paso práctico de MDD es la ingeniería directa o transformación de modelo a texto (M2T). StarUML delega esto en plugins comunitarios que procesan el archivo JSON del modelo y escriben ficheros de código.</p>
                <p><strong>[Determinismo vs. IA Generativa]</strong> Este es un punto crítico a nivel académico. La generación de código en MDD es <strong>100% determinista y reproducible</strong>: si el modelo y las reglas de plantilla no cambian, el código resultante siempre será exactamente el mismo. Esto contrasta con las herramientas de IA generativa actuales, que son probabilísticas y no deterministas (introduciendo incertidumbre en sistemas críticos).</p>
                <p>StarUML soporta de forma determinista la generación de esqueletos para Java, Python, C++, C# y más. Ahora, Jordi nos hablará de la ingeniería inversa.</p>
            `,
            tip: "<ul><li>Destaca el concepto de determinismo como garantía de calidad del software en ingeniería.</li><li>Señala el flujo directo PIM -> M2T -> Código.</li></ul>"
        },
        // Slide 7: Ingeniería Inversa (T2M)
        {
            speakerIndex: 3,
            targetTime: "2:00 min",
            speech: `
                <p><strong>[Ingeniería Inversa (T2M)]</strong> Hola, soy <strong>Jordi Barrachina Méndez</strong>. Para cerrar el ciclo de vida del desarrollo dirigido por modelos, analizaremos la ingeniería inversa o transformación de Texto a Modelo (T2M).</p>
                <p><strong>[AST Parsers]</strong> Las extensiones de StarUML leen el código fuente escrito en lenguajes como Java o C++, construyen un árbol de sintaxis abstracta (AST) e inyectan los correspondientes objetos semánticos de tipo clase, interfaz, métodos y asociaciones en el metamodelo M2 de la aplicación.</p>
                <p><strong>[Limitaciones de la Vista]</strong> No obstante, existe una limitación intrínseca: el código no almacena las coordenadas visuales del diagrama. Por tanto, el desarrollador debe distribuir y organizar manualmente las cajas en el lienzo visual. Además, la sincronización continua bidireccional (Round-trip) en StarUML requiere atención manual.</p>
            `,
            tip: "<ul><li>Muestra con el cursor el flujo invertido (T2M) de la izquierda.</li><li>Menciona que la ingeniería inversa es útil para documentar sistemas heredados (*legacy code*).</li></ul>"
        },
        // Slide 8: Demo en Vivo
        {
            speakerIndex: 3, // Jordi y Sergio exponen la demo juntos
            targetTime: "4:00 min",
            speech: `
                <p><strong>[Demo Interactiva]</strong> Pasemos a la demostración práctica. Con mi compañero Sergio, hemos integrado este simulador MDD reactivo directamente en la presentación.</p>
                <p><strong>[Funcionamiento]</strong> En el panel izquierdo, podemos editar la clase (por ejemplo, modificando su nombre a 'Cliente' o agregando atributos y métodos con visibilidad pública o privada). El panel central simula el lienzo (*canvas*) de StarUML redibujando el diagrama UML con la notación formal. En el panel derecho, observen cómo se genera de forma reactiva el JSON del modelo <code>.mdj</code> y los correspondientes esqueletos de código fuente en Java, Python y C++.</p>
                <p>Esto ilustra perfectamente cómo los modelos impulsan la generación determinista de código (M2C) que hemos expuesto teóricamente.</p>
            `,
            tip: "<ul><li>¡Interactúa activamente con el simulador! Modifica la clase 'Usuario' a 'Vehiculo' o añade algún atributo como 'color: String'.</li><li>Muestra la pestaña JSON del metamodelo y luego las de Java/Python para que el público vea la generación reactiva en vivo.</li></ul>"
        },
        // Slide 9: Comparativa Técnica
        {
            speakerIndex: 4,
            targetTime: "2:00 min",
            speech: `
                <p><strong>[Comparativa]</strong> Buenos días, soy <strong>Sergio Camacho Roig</strong>. Evaluando StarUML frente a otras herramientas del ecosistema MDE, podemos observar lo siguiente:</p>
                <ul>
                    <li><strong>Eclipse Papyrus:</strong> Es el estándar formal open-source, pero su pesada interfaz basada en Eclipse dificulta la adopción ágil en equipos pequeños.</li>
                    <li><strong>Enterprise Architect y Visual Paradigm:</strong> Son potentes pero sus costes de licencia son sumamente elevados y sus interfaces están saturadas de funcionalidades redundantes.</li>
                    <li><strong>Draw.io:</strong> Es una mera herramienta de dibujo vectorial; carece de semántica de modelo y no valida sintaxis ni genera código.</li>
                </ul>
                <p>StarUML ofrece el mejor equilibrio: ligereza en Electron, un formato JSON abierto de fácil procesamiento y una UX muy moderna.</p>
            `,
            tip: "<ul><li>Comenta la tabla comparativa de la diapositiva, haciendo hincapié en que StarUML es una opción muy equilibrada.</li></ul>"
        },
        // Slide 10: Valoración Personal y Conclusiones
        {
            speakerIndex: 4,
            targetTime: "2:00 min",
            speech: `
                <p><strong>[Valoración y Conclusión]</strong> Para finalizar, compartimos nuestra valoración personal. StarUML es una herramienta excelente para el aprendizaje de la ingeniería del software por su baja curva de aprendizaje y fluidez.</p>
                <p><strong>[Rol de la Asignatura y Recursos]</strong> Los conocimientos teóricos adquiridos en la asignatura (tales como la jerarquía de MOF, la validez del metamodelo M2 y las transformaciones AST) nos han ayudado enormemente a entender el alcance y potencial de la herramienta como modelador semántico y no un mero programa gráfico. Para profundizar en ella, recurrimos a su documentación y guías oficiales en <code>docs.staruml.io</code>, repositorios comunitarios de extensiones en GitHub y las especificaciones formales de la OMG.</p>
                <p><strong>[Crítica Técnica]</strong> Sin embargo, manteniendo una actitud crítica alineada con la asignatura, debemos señalar algunas carencias: no posee soporte nativo para restricciones complejas en OCL, carece de transformaciones M2M (ATL/QVT) directas en el flujo y su persistencia prioriza el JSON propietario frente a XMI, limitando parcialmente la interoperabilidad.</p>
                <p>Con esto cerramos nuestra exposición del seminario. Agradecemos su atención y quedamos abiertos a cualquier pregunta.</p>
            `,
            tip: "<ul><li>Cierra la presentación con seguridad y agradece formalmente a los profesores de la asignatura DSM.</li><li>Destaca la relación entre la práctica de modelado y la teoría explicada en clase.</li></ul>"
        }
    ];

    // --- ELEMENTOS DEL DOM ---
    const dom = {
        slidesContainer: document.getElementById('slides-container'),
        slides: document.querySelectorAll('.slide'),
        prevBtn: document.getElementById('prev-slide-btn'),
        nextBtn: document.getElementById('next-slide-btn'),
        indicatorsContainer: document.getElementById('slide-indicators'),
        speakerNameDisplay: document.getElementById('current-speaker-name'),
        
        // Temporizador
        minutesSpan: document.getElementById('timer-minutes'),
        secondsSpan: document.getElementById('timer-seconds'),
        toggleTimerBtn: document.getElementById('toggle-timer-btn'),
        resetTimerBtn: document.getElementById('reset-timer-btn'),
        
        // Panel Ponente
        presenterToggleBtn: document.getElementById('toggle-presenter-view-btn'),
        appContainer: document.getElementById('app-container'),
        closeNotesBtn: document.getElementById('close-notes-btn'),
        notesSpeakerName: document.getElementById('notes-speaker-name'),
        notesTargetTime: document.getElementById('notes-target-time'),
        speechNotesContent: document.getElementById('speech-notes-content'),
        presentationTipContent: document.getElementById('presentation-tip-content'),
        
        // Modal de Nombres
        configNamesBtn: document.getElementById('config-names-btn'),
        namesModal: document.getElementById('names-modal'),
        closeModalBtn: document.getElementById('close-modal-btn'),
        saveNamesBtn: document.getElementById('save-names-btn'),
        resetNamesBtn: document.getElementById('reset-names-btn'),
        
        // Inputs del simulador (Demo Slide 8)
        inputClassName: document.getElementById('input-class-name'),
        addAttributeBtn: document.getElementById('add-attribute-btn'),
        addMethodBtn: document.getElementById('add-method-btn'),
        attributesList: document.getElementById('attributes-list'),
        methodsList: document.getElementById('methods-list'),
        
        // Canvas del simulador (Demo Slide 8)
        cardClassName: document.getElementById('card-class-name'),
        cardAttributesList: document.getElementById('card-attributes-list'),
        cardMethodsList: document.getElementById('card-methods-list'),
        
        // Tabs e Hitos del simulador
        tabBtns: document.querySelectorAll('.tab-btn'),
        tabPanes: document.querySelectorAll('.tab-pane'),
        outputMdj: document.getElementById('output-mdj'),
        outputJava: document.getElementById('output-java'),
        outputPython: document.getElementById('output-python'),
        outputCpp: document.getElementById('output-cpp'),
        
        // PDF
        exportPdfBtn: document.getElementById('export-pdf-btn')
    };

    // --- CARGAR NOMBRES DE INTEGRANTES DESDE LOCALSTORAGE O VALORES POR DEFECTO ---
    function loadSpeakers() {
        let storedSpeakers = null;
        try {
            storedSpeakers = localStorage.getItem('staruml_seminar_speakers');
        } catch (e) {
            console.warn("localStorage is not accessible:", e);
        }
        if (storedSpeakers) {
            try {
                state.speakers = JSON.parse(storedSpeakers);
            } catch (e) {
                console.error("Error al leer ponentes de localStorage, usando por defecto.", e);
            }
        }
        updateSpeakerUINames();
    }

    function updateSpeakerUINames() {
        // Actualizar inputs del modal
        state.speakers.forEach((name, i) => {
            const input = document.getElementById(`input-member-${i}`);
            if (input) input.value = name;
            
            // Actualizar nombres en la portada
            const coverNameSpan = document.querySelector(`.member-name-${i}`);
            if (coverNameSpan) coverNameSpan.textContent = name;
        });

        // Actualizar el ponente actual visible en cabecera y panel de notas
        updateCurrentSpeakerDisplay();
    }

    function saveSpeakers() {
        state.speakers.forEach((_, i) => {
            const input = document.getElementById(`input-member-${i}`);
            if (input) state.speakers[i] = input.value.trim() || `Integrante ${i + 1}`;
        });
        try {
            localStorage.setItem('staruml_seminar_speakers', JSON.stringify(state.speakers));
        } catch (e) {
            console.warn("Could not save to localStorage:", e);
        }
        updateSpeakerUINames();
        closeModal();
    }

    function resetSpeakersToDefault() {
        state.speakers = [
            "Jorge Clreigues Malet (Ponente 1)",
            "Nahuel Chosco Flores (Ponente 2)",
            "Brad Owen Valladares Quispe (Ponente 3)",
            "Jordi Barrachina Méndez (Ponente 4)",
            "Sergio Camacho Roig (Ponente 5)"
        ];
        updateSpeakerUINames();
    }

    // --- MANEJO DE DIAPOSITIVAS ---
    function initSlides() {
        // Crear indicadores visuales en la parte inferior
        dom.indicatorsContainer.innerHTML = '';
        dom.slides.forEach((_, idx) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (idx === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(idx));
            dom.indicatorsContainer.appendChild(indicator);
        });

        updateSlideStates();
    }

    function updateSlideStates() {
        dom.slides.forEach((slide, idx) => {
            slide.classList.remove('active', 'past');
            if (idx === state.currentSlideIndex) {
                slide.classList.add('active');
            } else if (idx < state.currentSlideIndex) {
                slide.classList.add('past');
            }
        });

        // Actualizar indicadores
        const indicators = dom.indicatorsContainer.querySelectorAll('.indicator');
        indicators.forEach((indicator, idx) => {
            indicator.classList.toggle('active', idx === state.currentSlideIndex);
        });

        // Controlar deshabilitación de botones
        dom.prevBtn.disabled = state.currentSlideIndex === 0;
        dom.nextBtn.disabled = state.currentSlideIndex === dom.slides.length - 1;

        // Actualizar textos y asignaciones del ponente
        updateCurrentSpeakerDisplay();
        updateSpeakerNotes();

        // Reiniciar el cronómetro de la diapositiva específica
        state.slideTimeElapsed = 0;
    }

    function goToSlide(index) {
        if (index >= 0 && index < dom.slides.length) {
            state.currentSlideIndex = index;
            updateSlideStates();
        }
    }

    function nextSlide() {
        if (state.currentSlideIndex < dom.slides.length - 1) {
            goToSlide(state.currentSlideIndex + 1);
        }
    }

    function prevSlide() {
        if (state.currentSlideIndex > 0) {
            goToSlide(state.currentSlideIndex - 1);
        }
    }

    function updateCurrentSpeakerDisplay() {
        const slide = dom.slides[state.currentSlideIndex];
        if (!slide) return;
        const speakerIdx = parseInt(slide.getAttribute('data-speaker-index')) || 0;
        const speakerName = state.speakers[speakerIdx];
        
        dom.speakerNameDisplay.textContent = speakerName;
        
        // Intentar actualizar el nombre del presentador en el panel de notas
        const notesSpeaker = document.getElementById('notes-speaker-name');
        if (notesSpeaker) notesSpeaker.textContent = speakerName;
    }

    function updateSpeakerNotes() {
        const notes = speakerNotes[state.currentSlideIndex];
        if (!notes) return;

        // Reemplazar marcadores dinámicos de nombres de ponentes en el discurso
        let processedSpeech = notes.speech;
        state.speakers.forEach((name, i) => {
            // Limpiar la etiqueta (Ponente X) para el discurso hablado
            const cleanName = name.replace(/\s*\(Ponente\s+\d+\)/i, '');
            processedSpeech = processedSpeech.replace(new RegExp(`\\[Ponente ${i + 1}\\]`, 'g'), cleanName);
            // También reemplazar ocurrencias directas sin corchetes
            processedSpeech = processedSpeech.replace(new RegExp(`Ponente ${i + 1}`, 'g'), cleanName);
        });

        if (dom.notesTargetTime) dom.notesTargetTime.textContent = notes.targetTime;
        if (dom.speechNotesContent) dom.speechNotesContent.innerHTML = processedSpeech;
        if (dom.presentationTipContent) dom.presentationTipContent.innerHTML = `<h4><i class="fa-regular fa-lightbulb"></i> Tips de Exposición:</h4>` + notes.tip;
    }

    // --- TEMPORIZADORES (GLOBAL Y POR DIAPOSITIVA) ---
    function startGlobalTimer() {
        if (state.timerRunning) return;
        state.timerRunning = true;
        dom.toggleTimerBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        
        state.timerInterval = setInterval(() => {
            if (state.totalTimeRemaining > 0) {
                state.totalTimeRemaining--;
                updateTimerDisplay();
                checkTimerAlerts();
            } else {
                clearInterval(state.timerInterval);
                state.timerRunning = false;
                dom.toggleTimerBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            }
        }, 1000);

        // Temporizador de diapositiva individual
        state.slideTimerInterval = setInterval(() => {
            state.slideTimeElapsed++;
            checkSlidePacing();
        }, 1000);
    }

    function pauseGlobalTimer() {
        state.timerRunning = false;
        dom.toggleTimerBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        clearInterval(state.timerInterval);
        clearInterval(state.slideTimerInterval);
    }

    function toggleTimer() {
        if (state.timerRunning) {
            pauseGlobalTimer();
        } else {
            startGlobalTimer();
        }
    }

    function resetTimer() {
        pauseGlobalTimer();
        state.totalTimeRemaining = 20 * 60; // 20 mins
        state.slideTimeElapsed = 0;
        updateTimerDisplay();
        
        // Limpiar estilos de alertas
        const timerBox = document.getElementById('global-timer');
        if (timerBox) timerBox.classList.remove('timer-warning', 'timer-danger');
    }

    function updateTimerDisplay() {
        const mins = Math.floor(state.totalTimeRemaining / 60);
        const secs = state.totalTimeRemaining % 60;
        if (dom.minutesSpan) dom.minutesSpan.textContent = mins.toString().padStart(2, '0');
        if (dom.secondsSpan) dom.secondsSpan.textContent = secs.toString().padStart(2, '0');
    }

    function checkTimerAlerts() {
        const timerBox = document.getElementById('global-timer');
        if (!timerBox) return;
        
        // Alerta naranja si quedan menos de 5 min (300 segs)
        if (state.totalTimeRemaining <= 300 && state.totalTimeRemaining > 60) {
            timerBox.classList.add('timer-warning');
            timerBox.classList.remove('timer-danger');
        } 
        // Alerta roja si queda menos de 1 min (60 segs)
        else if (state.totalTimeRemaining <= 60) {
            timerBox.classList.add('timer-danger');
            timerBox.classList.remove('timer-warning');
        } else {
            timerBox.classList.remove('timer-warning', 'timer-danger');
        }
    }

    function checkSlidePacing() {
        const target = state.slideTargetTimes[state.currentSlideIndex];
        const notesTimeBox = dom.notesTargetTime;
        if (!notesTimeBox) return;
        
        if (state.slideTimeElapsed > target) {
            // Se excedió el tiempo sugerido para esta slide
            notesTimeBox.style.color = 'var(--accent-orange)';
            notesTimeBox.innerHTML = `${Math.floor(target/60)}:00 min <span style="font-size:10px; font-weight:normal;">(¡Excedido por +${state.slideTimeElapsed - target}s!)</span>`;
        } else {
            notesTimeBox.style.color = 'var(--accent-green)';
            notesTimeBox.textContent = `${Math.floor(target/60)}:00 min (A ritmo)`;
        }
    }

    // --- PANEL LATERAL DE NOTAS ---
    function togglePresenterMode() {
        const isPresenter = dom.appContainer.classList.contains('presenter-mode');
        if (isPresenter) {
            dom.appContainer.classList.remove('presenter-mode');
            dom.appContainer.classList.add('presentation-mode');
            dom.presenterToggleBtn.classList.remove('active');
        } else {
            dom.appContainer.classList.remove('presentation-mode');
            dom.appContainer.classList.add('presenter-mode');
            dom.presenterToggleBtn.classList.add('active');
            
            // Iniciar temporizador al abrir por comodidad si no está corriendo
            if (!state.timerRunning) {
                startGlobalTimer();
            }
        }
    }

    function closeNotes() {
        dom.appContainer.classList.remove('presenter-mode');
        dom.appContainer.classList.add('presentation-mode');
        dom.presenterToggleBtn.classList.remove('active');
    }

    // --- MODAL DE INTEGRANTES ---
    function openModal() {
        dom.namesModal.classList.add('open');
    }

    function closeModal() {
        dom.namesModal.classList.remove('open');
    }

    // --- SIMULADOR STARUML (DEMO DIAPOSITIVA 8) ---
    
    // Inicializar e implantar campos en el formulario de la demo
    function initDemoSimulator() {
        renderDemoFormItems();
        updateDemoOutputs();
        
        // Enlazar evento para cambio de nombre de clase
        dom.inputClassName.addEventListener('input', (e) => {
            state.umlClass.name = e.target.value.trim() || "ClaseSinNombre";
            updateDemoOutputs();
        });
        
        // Agregar Atributo
        dom.addAttributeBtn.addEventListener('click', () => {
            const newId = state.umlClass.attributes.length > 0 
                ? Math.max(...state.umlClass.attributes.map(a => a.id)) + 1 
                : 1;
            
            state.umlClass.attributes.push({
                id: newId,
                vis: "-",
                name: `idGrupo`,
                type: "int"
            });
            renderDemoFormItems();
            updateDemoOutputs();
        });
        
        // Agregar Método
        dom.addMethodBtn.addEventListener('click', () => {
            const newId = state.umlClass.methods.length > 0 
                ? Math.max(...state.umlClass.methods.map(m => m.id)) + 1 
                : 1;
            
            state.umlClass.methods.push({
                id: newId,
                vis: "+",
                name: `calcularNota`,
                params: "coef: double",
                ret: "double"
            });
            renderDemoFormItems();
            updateDemoOutputs();
        });

        // Configuración de pestañas de salida
        dom.tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                dom.tabBtns.forEach(b => b.classList.remove('active'));
                dom.tabPanes.forEach(p => p.classList.remove('active'));
                
                btn.classList.add('active');
                const targetPane = document.getElementById(btn.getAttribute('data-tab'));
                if (targetPane) targetPane.classList.add('active');
            });
        });
    }

    // Renderizar las filas de inputs en el panel de control
    function renderDemoFormItems() {
        // Atributos
        dom.attributesList.innerHTML = '';
        state.umlClass.attributes.forEach(attr => {
            const row = document.createElement('div');
            row.classList.add('item-row');
            row.innerHTML = `
                <input type="text" class="item-vis-input" value="${attr.vis}" title="Visibilidad (+ , - , #)" data-id="${attr.id}" data-field="vis">
                <input type="text" class="item-name-input" value="${attr.name}" placeholder="nombre" data-id="${attr.id}" data-field="name">
                <input type="text" class="item-type-input" value="${attr.type}" placeholder="tipo" data-id="${attr.id}" data-field="type">
                <button class="remove-item-btn" data-id="${attr.id}" data-type="attr"><i class="fa-regular fa-trash-can"></i></button>
            `;
            
            // Eventos de entrada
            row.querySelectorAll('input').forEach(input => {
                input.addEventListener('input', (e) => {
                    const id = parseInt(e.target.getAttribute('data-id'));
                    const field = e.target.getAttribute('data-field');
                    const targetAttr = state.umlClass.attributes.find(a => a.id === id);
                    if (targetAttr) {
                        targetAttr[field] = e.target.value;
                        updateDemoOutputs();
                    }
                });
            });

            // Botón eliminar
            row.querySelector('.remove-item-btn').addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                state.umlClass.attributes = state.umlClass.attributes.filter(a => a.id !== id);
                renderDemoFormItems();
                updateDemoOutputs();
            });

            dom.attributesList.appendChild(row);
        });

        // Métodos
        dom.methodsList.innerHTML = '';
        state.umlClass.methods.forEach(method => {
            const row = document.createElement('div');
            row.classList.add('item-row');
            row.innerHTML = `
                <input type="text" class="item-vis-input" value="${method.vis}" title="Visibilidad" data-id="${method.id}" data-field="vis">
                <input type="text" class="item-name-input" value="${method.name}" placeholder="metodo" data-id="${method.id}" data-field="name">
                <input type="text" class="item-type-input" value="${method.ret}" placeholder="retorno" data-id="${method.id}" data-field="ret" title="Tipo Retorno">
                <input type="text" class="item-type-input" value="${method.params}" placeholder="param: tipo" data-id="${method.id}" data-field="params" title="Parámetros (ej: p: int)" style="width: 80px;">
                <button class="remove-item-btn" data-id="${method.id}" data-type="method"><i class="fa-regular fa-trash-can"></i></button>
            `;
            
            // Eventos de entrada
            row.querySelectorAll('input').forEach(input => {
                input.addEventListener('input', (e) => {
                    const id = parseInt(e.target.getAttribute('data-id'));
                    const field = e.target.getAttribute('data-field');
                    const targetMethod = state.umlClass.methods.find(m => m.id === id);
                    if (targetMethod) {
                        targetMethod[field] = e.target.value;
                        updateDemoOutputs();
                    }
                });
            });

            // Botón eliminar
            row.querySelector('.remove-item-btn').addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                state.umlClass.methods = state.umlClass.methods.filter(m => m.id !== id);
                renderDemoFormItems();
                updateDemoOutputs();
            });

            dom.methodsList.appendChild(row);
        });
    }

    // Actualizar salidas de código y el lienzo UML
    function updateDemoOutputs() {
        // 1. Actualizar el Canvas Visual de la Clase
        dom.cardClassName.textContent = state.umlClass.name;
        
        // Renderizar atributos en tarjeta
        dom.cardAttributesList.innerHTML = '';
        if (state.umlClass.attributes.length === 0) {
            dom.cardAttributesList.innerHTML = '<span class="class-card-empty-msg">sin atributos</span>';
        } else {
            state.umlClass.attributes.forEach(attr => {
                const div = document.createElement('div');
                div.textContent = `${attr.vis} ${attr.name}: ${attr.type}`;
                dom.cardAttributesList.appendChild(div);
            });
        }

        // Renderizar métodos en tarjeta
        dom.cardMethodsList.innerHTML = '';
        if (state.umlClass.methods.length === 0) {
            dom.cardMethodsList.innerHTML = '<span class="class-card-empty-msg">sin métodos</span>';
        } else {
            state.umlClass.methods.forEach(met => {
                const div = document.createElement('div');
                const paramsStr = met.params ? met.params : '';
                div.textContent = `${met.vis} ${met.name}(${paramsStr}): ${met.ret}`;
                dom.cardMethodsList.appendChild(div);
            });
        }

        // 2. Generar el JSON de StarUML (.mdj)
        const mdjModel = {
            "_type": "UMLClass",
            "_id": `AAAAAAFF+class-${state.umlClass.name.toLowerCase()}`,
            "name": state.umlClass.name,
            "visibility": "public",
            "attributes": state.umlClass.attributes.map(a => ({
                "_type": "UMLAttribute",
                "_id": `AAAAAAFF+attr-${a.id}-${a.name}`,
                "name": a.name,
                "visibility": a.vis === "+" ? "public" : (a.vis === "#" ? "protected" : "private"),
                "type": a.type
            })),
            "operations": state.umlClass.methods.map(m => ({
                "_type": "UMLOperation",
                "_id": `AAAAAAFF+op-${m.id}-${m.name}`,
                "name": m.name,
                "visibility": m.vis === "+" ? "public" : (m.vis === "#" ? "protected" : "private"),
                "parameters": [
                    ...(m.params ? [{
                        "_type": "UMLParameter",
                        "_id": `AAAAAAFF+param-${m.id}-p`,
                        "name": m.params.split(':')[0].trim(),
                        "type": (m.params.split(':')[1] || 'String').trim(),
                        "direction": "in"
                    }] : []),
                    {
                        "_type": "UMLParameter",
                        "_id": `AAAAAAFF+param-ret-${m.id}`,
                        "name": "returnType",
                        "type": m.ret,
                        "direction": "return"
                    }
                ]
            }))
        };
        dom.outputMdj.textContent = JSON.stringify(mdjModel, null, 2);

        // 3. Generar Código Java
        let javaCode = `// Generado automáticamente por StarUML M2T (Determinista)\n`;
        javaCode += `public class ${state.umlClass.name} {\n\n`;
        
        state.umlClass.attributes.forEach(a => {
            const visWord = a.vis === "+" ? "public" : (a.vis === "#" ? "protected" : "private");
            javaCode += `    ${visWord} ${a.type} ${a.name};\n`;
        });
        if (state.umlClass.attributes.length > 0) javaCode += `\n`;

        // Constructor
        javaCode += `    public ${state.umlClass.name}() {\n`;
        javaCode += `        // Constructor\n`;
        javaCode += `    }\n\n`;

        // Métodos
        state.umlClass.methods.forEach(m => {
            const visWord = m.vis === "+" ? "public" : (m.vis === "#" ? "protected" : "private");
            let paramsSig = "";
            if (m.params) {
                const parts = m.params.split(':');
                const pName = parts[0].trim();
                const pType = (parts[1] || 'String').trim();
                paramsSig = `${pType} ${pName}`;
            }
            javaCode += `    ${visWord} ${m.ret} ${m.name}(${paramsSig}) {\n`;
            if (m.ret !== "void") {
                javaCode += `        // TODO: Retorno de ${m.ret}\n`;
                javaCode += `        return ${getDefaultValueForType(m.ret)};\n`;
            } else {
                javaCode += `        // TODO: Lógica\n`;
            }
            javaCode += `    }\n\n`;
        });
        javaCode += `}`;
        dom.outputJava.textContent = javaCode;

        // 4. Generar Código Python
        let pyCode = `# Generado automáticamente por StarUML M2T (Determinista)\n\n`;
        pyCode += `class ${state.umlClass.name}:\n`;
        
        // Constructor & atributos (privados llevan doble guión bajo)
        pyCode += `    def __init__(self):\n`;
        if (state.umlClass.attributes.length === 0) {
            pyCode += `        pass\n`;
        } else {
            state.umlClass.attributes.forEach(a => {
                const prefix = a.vis === "+" ? "" : (a.vis === "#" ? "_" : "__");
                pyCode += `        self.${prefix}${a.name} = None  # Tipo: ${a.type}\n`;
            });
        }
        pyCode += `\n`;

        // Métodos
        if (state.umlClass.methods.length === 0) {
            pyCode += `    # Sin métodos definidos\n`;
        } else {
            state.umlClass.methods.forEach(m => {
                let paramsSig = "self";
                if (m.params) {
                    const pName = m.params.split(':')[0].trim();
                    paramsSig += `, ${pName}`;
                }
                const prefix = m.vis === "+" ? "" : (m.vis === "#" ? "_" : "__");
                pyCode += `    def ${prefix}${m.name}(${paramsSig}):\n`;
                pyCode += `        """\n`;
                pyCode += `        Método que retorna un ${m.ret}\n`;
                pyCode += `        """\n`;
                pyCode += `        # TODO: Lógica\n`;
                if (m.ret !== "void") {
                    pyCode += `        return ${getDefaultValueForTypePython(m.ret)}\n\n`;
                } else {
                    pyCode += `        pass\n\n`;
                }
            });
        }
        dom.outputPython.textContent = pyCode;

        // 5. Generar Código C++
        let cppCode = `// Generado automáticamente por StarUML M2T (Determinista)\n`;
        cppCode += `#ifndef ${state.umlClass.name.toUpperCase()}_H\n`;
        cppCode += `#define ${state.umlClass.name.toUpperCase()}_H\n\n`;
        cppCode += `#include <string>\n#include <vector>\n\n`;
        cppCode += `class ${state.umlClass.name} {\n`;

        // Agrupar por visibilidad
        const publics = [];
        const protecteds = [];
        const privates = [];

        // Distribuir atributos
        state.umlClass.attributes.forEach(a => {
            const decl = `    ${translateTypeCpp(a.type)} ${a.name};`;
            if (a.vis === "+") publics.push(decl);
            else if (a.vis === "#") protecteds.push(decl);
            else privates.push(decl);
        });

        // Distribuir métodos
        state.umlClass.methods.forEach(m => {
            let paramsSig = "";
            if (m.params) {
                const parts = m.params.split(':');
                const pName = parts[0].trim();
                const pType = (parts[1] || 'String').trim();
                paramsSig = `${translateTypeCpp(pType)} ${pName}`;
            }
            const decl = `    ${translateTypeCpp(m.ret)} ${m.name}(${paramsSig});`;
            if (m.vis === "+") publics.push(decl);
            else if (m.vis === "#") protecteds.push(decl);
            else privates.push(decl);
        });

        // Escribir bloques C++
        if (publics.length > 0) {
            cppCode += `public:\n`;
            cppCode += `    ${state.umlClass.name}(); // Constructor\n`;
            publics.forEach(line => cppCode += line + "\n");
            cppCode += `\n`;
        }
        if (protecteds.length > 0) {
            cppCode += `protected:\n`;
            protecteds.forEach(line => cppCode += line + "\n");
            cppCode += `\n`;
        }
        if (privates.length > 0) {
            cppCode += `private:\n`;
            privates.forEach(line => cppCode += line + "\n");
            cppCode += `\n`;
        }
        
        cppCode += `};\n\n`;
        cppCode += `#endif // ${state.umlClass.name.toUpperCase()}_H`;
        dom.outputCpp.textContent = cppCode;
    }

    // Auxiliares de tipo para generación de código
    function getDefaultValueForType(type) {
        const t = type.toLowerCase();
        if (t === "int" || t === "float" || t === "double" || t === "long") return "0";
        if (t === "boolean" || t === "bool") return "false";
        if (t === "string") return "\"\"";
        return "null";
    }

    function getDefaultValueForTypePython(type) {
        const t = type.toLowerCase();
        if (t === "int" || t === "float" || t === "double") return "0";
        if (t === "boolean" || t === "bool") return "False";
        if (t === "string") return "\"\"";
        return "None";
    }

    function translateTypeCpp(type) {
        const t = type.trim();
        if (t === "String") return "std::string";
        if (t === "boolean" || t === "bool") return "bool";
        return t;
    }

    // --- MANEJO DE TECLADO ---
    function handleKeyDown(e) {
        // No cambiar slides si el usuario está escribiendo en campos de texto
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
            return;
        }

        switch (e.key) {
            case 'ArrowRight':
            case ' ': // Espacio
                nextSlide();
                break;
            case 'ArrowLeft':
            case 'Backspace':
                prevSlide();
                break;
            case 'p':
            case 'P':
                // Atajo p para abrir el panel de notas
                togglePresenterMode();
                break;
        }
    }

    // --- ENLAZAR EVENTOS DE INTERFAZ ---
    function bindEvents() {
        // Navegación
        dom.prevBtn.addEventListener('click', prevSlide);
        dom.nextBtn.addEventListener('click', nextSlide);
        document.addEventListener('keydown', handleKeyDown);

        // Timer
        dom.toggleTimerBtn.addEventListener('click', toggleTimer);
        dom.resetTimerBtn.addEventListener('click', resetTimer);

        // Panel de Notas
        dom.presenterToggleBtn.addEventListener('click', togglePresenterMode);
        dom.closeNotesBtn.addEventListener('click', closeNotes);

        // Configuración de Integrantes
        dom.configNamesBtn.addEventListener('click', openModal);
        dom.closeModalBtn.addEventListener('click', closeModal);
        dom.saveNamesBtn.addEventListener('click', saveSpeakers);
        dom.resetNamesBtn.addEventListener('click', resetSpeakersToDefault);
        
        // Cerrar modal al hacer clic en el backdrop
        dom.namesModal.addEventListener('click', (e) => {
            if (e.target === dom.namesModal) closeModal();
        });

        // Impresión a PDF
        dom.exportPdfBtn.addEventListener('click', () => {
            window.print();
        });

        // Alternancia de Tema Claro/Oscuro
        const themeToggleBtn = document.getElementById('theme-toggle-btn');
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => {
                if (document.body.classList.contains('light-theme')) {
                    document.body.classList.remove('light-theme');
                    document.body.classList.add('dark-theme');
                    themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i> Tema';
                } else {
                    document.body.classList.remove('dark-theme');
                    document.body.classList.add('light-theme');
                    themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i> Tema';
                }
            });
        }
    }

    // --- INICIALIZACIÓN ---
    function init() {
        loadSpeakers();
        initSlides();
        initDemoSimulator();
        bindEvents();
        updateTimerDisplay();
    }

    init();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPresentationApp);
} else {
    initPresentationApp();
}
