export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: "Ortodoncia Invisible" | "Estética Biomimética" | "Implantología Quirúrgica" | "Rehabilitación Oral";
  readTime: string;
  publishedDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  featuredImage: string;
  tags: string[];
  content: {
    intro: string;
    sections: {
      heading: string;
      paragraphs: string[];
      highlightBox?: {
        title: string;
        text: string;
      };
      table?: {
        headers: string[];
        rows: string[][];
      };
    }[];
    conclusion: string;
  };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "invisalign-vs-brackets-metalicos-ceramicos",
    title: "¿Invisalign, brackets metálicos o zafiro cerámico? Guía comparativa definitiva 2026",
    excerpt:
      "Análisis biomecánico exhaustivo de los tres sistemas líderes de ortodoncia: efectividad de movimiento, estética, impacto en la higiene gingival y tiempos reales de tratamiento.",
    category: "Ortodoncia Invisible",
    readTime: "7 min de lectura",
    publishedDate: "24 Septiembre 2026",
    author: {
      name: "Dra. Elena Santamaría",
      role: "Directora Médica & Invisalign Diamond Apex Provider",
      avatar: "/images/team/elena_santamaria.jpg",
    },
    featuredImage: "/images/treatments/invisalign.jpg",
    tags: ["Invisalign", "Brackets", "Ortodoncia Adultos", "Biomecánica"],
    content: {
      intro:
        "Elegir el sistema de ortodoncia adecuado ya no es una simple cuestión de estética. En la odontología moderna, la biomecánica, la salud periodontal del paciente y el ritmo de vida profesional determinan qué técnica proporcionará resultados estables en el menor tiempo posible sin comprometer la biología dental.",
      sections: [
        {
          heading: "1. De la fricción metálica al movimiento digital programado",
          paragraphs: [
            "Durante décadas, la ortodoncia convencional se basó en brackets metálicos ligados mediante arcos de aleación níquel-titanio. Si bien este mecanismo ha resuelto millones de maloclusiones, presenta una limitación biológica intrínseca: la fuerza se transmite de forma reactiva y con alta fricción, lo que puede provocar reabsorciones radiculares leves y molestias continuas tras cada ajuste mensual.",
            "El sistema Invisalign®, desarrollado mediante más de 800 patentes activas y el material termoplástico multicapa SmartTrack®, cambió el paradigma. Cada alineador aplica fuerzas suaves, constantes e hiperlocalizadas de 0.25 mm por etapa, respetando la irrigación vascular del ligamento periodontal.",
          ],
        },
        {
          heading: "2. Matriz comparativa clínica: Los 3 sistemas cara a cara",
          paragraphs: [
            "A continuación, desglosamos los factores determinantes que evaluamos en nuestra primera sesión diagnóstica en Calle Serrano 48:",
          ],
          table: {
            headers: [
              "Criterio Clínico",
              "Invisalign® SmartTrack",
              "Brackets Cerámicos (Zafiro)",
              "Brackets Metálicos Tradicionales",
            ],
            rows: [
              [
                "Visibilidad estética",
                "Prácticamente imperceptible a distancia social",
                "Discretos a media distancia; arco metálico visible",
                "Completamente visibles y reflectantes",
              ],
              [
                "Higiene y salud gingival",
                "Óptima: 100% removibles para comer y cepillarse",
                "Difícil: retención de placa alrededor del bracket",
                "Difícil: requiere cepillos interproximales e irrigador",
              ],
              [
                "Comodidad y rozaduras",
                "Sin llagas ni heridas; corte gingival festoneado",
                "Frecuentes llagas iniciales en mucosa y labios",
                "Frecuentes llagas y urgencias por despegado",
              ],
              [
                "Restricciones dietéticas",
                "Cero restricciones (se retiran para comer)",
                "Evitar alimentos duros o fibrosos que desprendan piezas",
                "Evitar frutos secos duros, turrón o morder manzanas",
              ],
              [
                "Planificación previa",
                "Simulación virtual 3D ClinCheck antes de iniciar",
                "Planificación analógica; ajuste reactivo en sillón",
                "Planificación analógica; ajuste reactivo en sillón",
              ],
              [
                "Frecuencia de visitas",
                "Cada 6 a 8 semanas (controles breves)",
                "Cada 3 a 4 semanas de forma obligatoria",
                "Cada 3 a 4 semanas de forma obligatoria",
              ],
            ],
          },
        },
        {
          heading: "3. ¿Cuándo tienen ventaja los brackets cerámicos de zafiro?",
          paragraphs: [
            "Los brackets cerámicos de cristal de zafiro representan una alternativa para pacientes que buscan una aparatología fija que no dependa de la disciplina de uso. Mientras que Invisalign requiere que el paciente lleve las férulas 22 horas al día, los brackets actúan 24/7 sin posibilidad de olvido.",
            "Sin embargo, el zafiro presenta dos inconvenientes clínicos relevantes: su dureza excesiva puede provocar desgaste en los dientes antagonistas si se produce contacto oclusal, y las ligaduras elastoméricas que fijan el arco pueden teñirse con café, vino tinto o curry si no se renuevan con frecuencia.",
          ],
          highlightBox: {
            title: "Criterio Clínico de la Dra. Elena Santamaría",
            text: "Hoy en día, con la categoría Diamond Apex y la biomecánica avanzada de ataches SmartForce, el 98% de las maloclusiones complejas (incluyendo sobremordidas severas y mordidas cruzadas) se resuelven con la misma o mayor rapidez con Invisalign que con brackets fijos.",
          },
        },
        {
          heading: "4. Duración media: ¿Es más rápido Invisalign?",
          paragraphs: [
            "La respuesta corta es sí en la mayoría de los casos no quirúrgicos. Al diseñar la trayectoria de cada diente en el software ClinCheck®, no existen los movimientos parásitos o de 'vaivén' típicos de los brackets, donde primero se expande y luego se corrige el torque. Con alineadores, el movimiento es simultáneo y directo a su posición anatómica final.",
            "Un tratamiento de dificultad moderada con Invisalign suele resolverse entre 9 y 14 meses, frente a los 18-24 meses habituales de los brackets convencionales.",
          ],
        },
      ],
      conclusion:
        "La elección depende de tus prioridades de confort, discreción e higiene. Si buscas mantener tus rutinas profesionales sin que nadie perciba tu ortodoncia y disfrutas de la libertad de comer sin restricciones, Invisalign es la opción de máxima excelencia biomédica.",
    },
  },
  {
    slug: "carillas-porcelana-vs-composite",
    title: "Carillas de porcelana feldespática vs. composite: durabilidad, tinción y conservación biológica",
    excerpt:
      "Micro-estratificación artesanal frente a resinas directas. Todo lo que debes saber sobre estabilidad de color a 15 años, grosor de tallado y reversibilidad estética.",
    category: "Estética Biomimética",
    readTime: "6 min de lectura",
    publishedDate: "18 Septiembre 2026",
    author: {
      name: "Dra. Sofía Varela",
      role: "Especialista en Estética Biomimética & DSD",
      avatar: "/images/team/sofia_varela.jpg",
    },
    featuredImage: "/images/treatments/carillas.jpg",
    tags: ["Carillas", "Porcelana", "Composite", "Estética Dental"],
    content: {
      intro:
        "Tanto las carillas de porcelana como las de composite tienen su indicación precisa. No obstante, existe gran confusión entre los pacientes sobre cuál es más conservadora y cuál mantiene el brillo y la textura con el paso de los años.",
      sections: [
        {
          heading: "1. La naturaleza de los materiales: Cerámica vítrea vs. Matriz orgánica",
          paragraphs: [
            "La porcelana feldespática y el disilicato de litio son materiales cerámicos inorgánicos sintetizados a más de 900 ºC. Su estructura cristalina no tiene porosidad, lo que significa que es químicamente inmune a la absorción de pigmentos de café, tabaco o té.",
            "El composite, por el contrario, es una resina plástica cargada con micropartículas de vidrio. Aunque ofrece resultados inmediatos excelentes en una sola sesión, la matriz orgánica se degrada por la acción de la saliva y el cepillado, requiriendo pulidos periódicos cada 12-18 meses para no perder brillo.",
          ],
        },
        {
          heading: "2. Espesor y tallado: Desmintiendo el mito del desgaste agresivo",
          paragraphs: [
            "Existe la creencia popular de que colocar carillas cerámicas exige limar el diente hasta dejarlo como un muñón. En AURA practicamos la odontología biomimética de mínima invasión:",
            "Nuestras carillas cerámicas tienen un grosor ultrafino de solo 0.2 a 0.3 milímetros (el equivalente a una lente de contacto). En más del 70% de nuestros casos no se realiza ningún tallado sobre la dentina, adhiriéndose la cerámica directamente sobre el esmalte natural sin anestesia ni dolor.",
          ],
          highlightBox: {
            title: "Supervivencia a Largo Plazo",
            text: "Los estudios clínicos longitudinales demuestran una tasa de éxito superior al 96% en carillas de disilicato de litio a los 15 años, mientras que las carillas de composite suelen requerir sustitución o reestratificación entre los 5 y 7 años.",
          },
        },
        {
          heading: "3. ¿Cuándo elegir carillas de composite?",
          paragraphs: [
            "Recomendamos el composite en pacientes jóvenes menores de 22 años cuyo margen gingival aún no ha madurado definitivamente, o para reparar pequeñas fracturas incisales puntuales donde no se justifica una intervención de laboratorio.",
          ],
        },
      ],
      conclusion:
        "Para una sonrisa completa y definitiva con la máxima naturalidad óptica y garantía de por vida en color y brillo, las carillas cerámicas feldespáticas estratificadas a mano representan la cúspide de la disciplina.",
    },
  },
  {
    slug: "implantes-carga-inmediata-requisitos",
    title: "Dientes fijos en un solo día: requisitos óseos y anatómicos para implantes de carga inmediata",
    excerpt:
      "Cómo la cirugía guiada por TAC 3D y los biomateriales de titanio Straumann permiten colocar coronas fijas el mismo día de la extracción sin periodos edéntulos.",
    category: "Implantología Quirúrgica",
    readTime: "8 min de lectura",
    publishedDate: "10 Septiembre 2026",
    author: {
      name: "Dr. Javier Morales",
      role: "Cirugía Oral, Implantología & Miembro SECIB",
      avatar: "/images/team/javier_morales.jpg",
    },
    featuredImage: "/images/treatments/implantes.jpg",
    tags: ["Implantes", "Carga Inmediata", "Cirugía Guiada 3D", "Straumann"],
    content: {
      intro:
        "Perder una pieza dental en el sector visible genera una comprensible ansiedad funcional y social. Hace años, el paciente debía esperar entre 3 y 6 meses con una prótesis removible incómoda antes de poder atornillar el diente definitivo. Hoy, el protocolo de carga inmediata resuelve la ausencia en una única mañana.",
      sections: [
        {
          heading: "1. ¿Qué es exactamente la carga inmediata?",
          paragraphs: [
            "Consiste en extraer la raíz deteriorada, insertar el implante de titanio en el lecho óseo y fijar una corona atornillada fija y estética en la misma sesión clínica, todo en un margen de 2 a 3 horas.",
            "El paciente sale de nuestra clínica en Serrano con un diente fijo que no se mueve, permitiéndole hacer vida normal desde el primer instante sin complejos.",
          ],
        },
        {
          heading: "2. Requisitos anatómicos imprescindibles",
          paragraphs: [
            "No todos los pacientes son candidatos inmediatos sin una preparación previa. Para garantizar el éxito del tratamiento evaluamos tres factores críticos en el TAC 3D de haz cónico (CBCT):",
            "1. Estabilidad primaria superior a 35 Ncm: El implante debe anclarse firmemente en el hueso residual.",
            "2. Ausencia de infección bacteriana activa aguda en el tejido periapical.",
            "3. Biotipo gingival suficiente para crear un sellado mucoso estético y proteger el cuello del implante.",
          ],
          highlightBox: {
            title: "Cirugía Guiada por Ordenador",
            text: "Mediante una férula quirúrgica diseñada en software 3D CAD/CAM e impresa en resina esterilizable, insertamos el implante sin necesidad de dar puntos de sutura ni realizar incisiones a colgajo abierto, minimizando la inflamación postoperatoria a niveles casi imperceptibles.",
          },
        },
      ],
      conclusion:
        "La tecnología de implantes de carga inmediata con aleaciones Straumann Roxolid® ha convertido lo que antes era un proceso traumático de meses en una intervención predecible, cómoda y definitiva en una sola visita.",
    },
  },
  {
    slug: "bruxismo-desgaste-dental-reparacion",
    title: "Bruxismo severo y desgaste del esmalte: cómo la odontología reconstructiva restaura la dimensión vertical",
    excerpt:
      "Apretar los dientes no solo desgasta el esmalte: altera el perfil facial y genera cefaleas tensionales. Protocolos para rehabilitar la mordida y proteger las articulaciones ATM.",
    category: "Rehabilitación Oral",
    readTime: "5 min de lectura",
    publishedDate: "2 Septiembre 2026",
    author: {
      name: "Dra. Sofía Varela & Dr. Javier Morales",
      role: "Comisión de Rehabilitación Oral AURA",
      avatar: "/images/team/group.jpg",
    },
    featuredImage: "/images/clinical/case1_after.jpg",
    tags: ["Bruxismo", "Desgaste Dental", "ATM", "Rehabilitación Oral"],
    content: {
      intro:
        "El ritmo de vida actual y el estrés mantenido han disparado los casos de bruxismo nocturno en Madrid. Muchos pacientes acuden a la clínica notando que sus dientes se ven cada vez más cortos, planos y translúcidos, sin saber que están perdiendo soporte óseo y muscular en el tercio inferior del rostro.",
      sections: [
        {
          heading: "1. Consecuencias del desgaste incisal progresivo",
          paragraphs: [
            "Cuando se desgastan 2 o 3 milímetros de esmalte en los dientes anteriores, se pierde lo que en odontología denominamos 'Dimensión Vertical de Oclusión' (DVO).",
            "Esto provoca que los labios se hundan prematuramente, aparezcan arrugas peribucales más marcadas y la mandíbula se sobrecierre, generando chasquidos articulares, dolores cervicales y fatiga masticatoria.",
          ],
        },
        {
          heading: "2. Protocolo reconstructivo biomimético en 3 fases",
          paragraphs: [
            "Fase 1. Desprogramación muscular y férula Michigan de relajación oclusal.",
            "Fase 2. Recuperación de altura mediante 'table-tops' cerámicos o micro-adhesiones posteriores sin desgastar los dientes sanos.",
            "Fase 3. Rehabilitación estética anterior con carillas cerámicas para devolver la forma anatómica original de los dientes.",
          ],
        },
      ],
      conclusion:
        "Tratar el bruxismo a tiempo evita tratamientos mucho más complejos en el futuro. Una férula de descarga personalizada unida a la restauración del esmalte perdido devuelve la juventud y la funcionalidad completa a tu boca.",
    },
  },
];
