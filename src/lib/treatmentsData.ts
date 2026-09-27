export interface TreatmentDetail {
  slug: string;
  name: string;
  category: "Ortodoncia" | "Implantología" | "Estética Dental" | "Salud Periodontal";
  image: string;
  heroImage: string;
  shortDesc: string;
  fullDesc: string;
  duration: string;
  sessions: string;
  invasiveness: "Mínima" | "Moderada" | "Quirúrgica guiada";
  anesthesia: string;
  warranty: string;
  doctorInCharge: string;
  indications: string[];
  protocolSteps: { title: string; desc: string }[];
  materialsUsed: string[];
}

export const TREATMENTS: TreatmentDetail[] = [
  {
    slug: "invisalign",
    name: "Invisalign® Diamond Apex",
    category: "Ortodoncia",
    image: "/images/treatments/invisalign.jpg",
    heroImage: "/images/treatments/invisalign_patient.jpg",
    shortDesc:
      "Alineación dental invisible de máxima precisión biomecánica mediante férulas secuenciales transparentes SmartTrack®.",
    fullDesc:
      "El sistema líder mundial en ortodoncia transparente. Permite corregir maloclusiones complejas, mordidas abiertas, cruzadas y apiñamientos severos sin la incomodidad ni la estética de los brackets convencionales. Planificado íntegramente en 3D mediante ClinCheck®.",
    duration: "6 a 18 meses",
    sessions: "Revisiones cada 6 a 8 semanas",
    invasiveness: "Mínima",
    anesthesia: "No requerida",
    warranty: "Garantía de refinamiento incluida por 5 años (Comprehensive)",
    doctorInCharge: "Dra. Elena Santamaría",
    indications: [
      "Apiñamiento dental leve, moderado o severo",
      "Diastemas y separaciones interincisales",
      "Sobremordida profunda y mordida abierta",
      "Mordida cruzada anterior o posterior",
      "Recidivas tras ortodoncias metálicas previas",
    ],
    protocolSteps: [
      {
        title: "Escaneo Óptico iTero Lumina",
        desc: "Digitalización intraoral de alta definición sin pastas de impresión.",
      },
      {
        title: "Estudio Biomecánico ClinCheck®",
        desc: "Simulación de movimientos dentales micrométricos antes de fabricar.",
      },
      {
        title: "Colocación de Alineadores SmartTrack",
        desc: "Entrega de las primeras series y fijación de micro-attachments.",
      },
      {
        title: "Monitorización y Refinamiento",
        desc: "Controles bimensuales de ajuste y perfeccionamiento oclusal.",
      },
      {
        title: "Estabilización con Retenedores Vivera",
        desc: "Retención nocturna para consolidar la estructura ósea final.",
      },
    ],
    materialsUsed: [
      "Polímero termoplástico multicapa SmartTrack®",
      "Composite de micro-relleno estético para ataches",
      "Retenedores de copolímero termoformado Vivera®",
    ],
  },
  {
    slug: "implantes",
    name: "Implantes Dentales de Carga Inmediata",
    category: "Implantología",
    image: "/images/treatments/implantes.jpg",
    heroImage: "/images/treatments/implantes_surgery.jpg",
    shortDesc:
      "Rehabilitación fija de piezas ausentes o deterioradas en un único día mediante cirugía guiada por ordenador 3D.",
    fullDesc:
      "Protocolo de vanguardia que permite extraer la pieza inviable, insertar el implante de titanio grado 4 Straumann® y colocar la corona dental fija definitiva o provisional en la misma jornada clínica. Máxima comodidad sin pasar meses con espacios vacíos ni prótesis de quita y pon.",
    duration: "1 sesión quirúrgica + 3 meses osteointegración",
    sessions: "1 sesión principal + 2 revisiones",
    invasiveness: "Quirúrgica guiada",
    anesthesia: "Anestesia local + Sedación consciente monitorizada",
    warranty: "Garantía de por vida en tornillos de implante Straumann® Roxolid",
    doctorInCharge: "Dr. Javier Morales",
    indications: [
      "Pérdida de uno o múltiples dientes por traumatismo o caries profunda",
      "Enfermedad periodontal avanzada con piezas no viables",
      "Sustitución de puentes o prótesis removibles incómodas",
      "Rehabilitación maxilar completa (All-on-4 / All-on-6)",
    ],
    protocolSteps: [
      {
        title: "TAC 3D de Haz Cónico (CBCT)",
        desc: "Evaluación milimétrica del volumen, densidad y altura del hueso maxilar.",
      },
      {
        title: "Férula Quirúrgica Digital",
        desc: "Diseño CAD/CAM de la guía de inserción exacta sin incisiones agresivas.",
      },
      {
        title: "Inserción del Implante Straumann Roxolid",
        desc: "Colocación guiada con estabilidad primaria superior a 35 Ncm.",
      },
      {
        title: "Carga Inmediata de Corona Fija",
        desc: "Fijación del nuevo diente estético el mismo día de la cirugía.",
      },
      {
        title: "Osteointegración y Revisión a 90 días",
        desc: "Control radiológico de la unión ósea definitiva y sellado biológico.",
      },
    ],
    materialsUsed: [
      "Aleación Titanio-Zirconio Straumann® Roxolid",
      "Superficie osteoinductiva SLActive® de curación rápida",
      "Coronas de Circonio monolítico y disilicato de litio",
    ],
  },
  {
    slug: "carillas",
    name: "Carillas de Porcelana Biomimética",
    category: "Estética Dental",
    image: "/images/treatments/carillas.jpg",
    heroImage: "/images/treatments/carillas_lab.jpg",
    shortDesc:
      "Láminas cerámicas de espesor mínimo (0.3 mm) estratificadas a mano para rediseñar forma, color y proporción dental.",
    fullDesc:
      "La cima de la odontología estética conservadora. A diferencia de las coronas que requieren tallar el 70% del diente, las carillas biomiméticas respetan la estructura natural del esmalte. Cada lámina es creada por maestros ceramistas reproduciendo fielmente la opalescencia y textura del diente biológico.",
    duration: "2 a 3 citas clínicas (2 semanas)",
    sessions: "3 sesiones",
    invasiveness: "Mínima",
    anesthesia: "Anestesia local superficial o sin anestesia",
    warranty: "Garantía clínica de 10 años en integridad estructural",
    doctorInCharge: "Dra. Sofía Varela",
    indications: [
      "Tinciones severas por tetraciclinas o fluorosis no blanqueables",
      "Dientes cortos, desgastados por bruxismo o fracturados",
      "Alteraciones en la forma dental (dientes conoides)",
      "Cierre de espacios negros interdentales y armonización de sonrisa",
    ],
    protocolSteps: [
      {
        title: "Estudio Estético Digital DSD",
        desc: "Fotografía y diseño digital de las proporciones áureas faciales.",
      },
      {
        title: "Mock-up Intraoral (Prueba en Boca)",
        desc: "Prueba visual de resina sin tocar los dientes para aprobar el resultado.",
      },
      {
        title: "Micro-preparación y Escaneado 3D",
        desc: "Preparación conservadora de 0.3 mm sobre el esmalte exterior.",
      },
      {
        title: "Estratificación Artesanal en Laboratorio",
        desc: "Creación a mano con polvo de porcelana feldespática policromática.",
      },
      {
        title: "Cementación Adhesiva Micrométrica",
        desc: "Fijación química definitiva bajo aislamiento absoluto con dique de goma.",
      },
    ],
    materialsUsed: [
      "Disilicato de litio IPS e.max® Press",
      "Cerámica feldespática estratificada Creation Willi Geller",
      "Sistemas de cementación fotopolimerizable Variolink Esthetic",
    ],
  },
  {
    slug: "blanqueamiento",
    name: "Blanqueamiento Philips Zoom WhiteSpeed",
    category: "Estética Dental",
    image: "/images/treatments/blanqueamiento.jpg",
    heroImage: "/images/clinical/case4_whitening.jpg",
    shortDesc:
      "Tecnología de fotoactivación LED azul que aclara hasta 8 tonos en una única sesión de 45 minutos sin dañar el esmalte.",
    fullDesc:
      "El tratamiento de blanqueamiento dental médico más contrastado de la literatura científica. Combina una fase en gabinete con lámpara LED Philips Zoom de longitud de onda calibrada y un kit domiciliario con férulas a medida para fijar la luminosidad y evitar la recidiva del color.",
    duration: "1 sesión clínica de 60 min + 10 días refuerzo en casa",
    sessions: "1 sesión en clínica",
    invasiveness: "Mínima",
    anesthesia: "No requerida",
    warranty: "Mantenimiento anual recomendado",
    doctorInCharge: "Dra. Sofía Varela",
    indications: [
      "Pérdida de luminosidad por envejecimiento natural del esmalte",
      "Tinciones extrínsecas por café, té, vino tinto o tabaco",
      "Homogeneización de tono previo a tratamientos de carillas o empastes",
      "Preparación de sonrisa para bodas o eventos profesionales",
    ],
    protocolSteps: [
      {
        title: "Profilaxis y Aislamiento Gingival",
        desc: "Limpieza ultrasónica y barrera de resina para proteger las encías.",
      },
      {
        title: "Aplicación de Gel de Peróxido de Hidrógeno al 25%",
        desc: "Gel médico con tecnología de pH neutro y fosfato de calcio amorfo.",
      },
      {
        title: "3 Ciclos de Fotoactivación LED (15 min)",
        desc: "Luz fría que activa las moléculas de oxígeno sin sobrecalentar la pulpa.",
      },
      {
        title: "Tratamiento Desensibilizante Relief ACP",
        desc: "Remineralización inmediata del esmalte para prevenir sensibilidad.",
      },
      {
        title: "Pauta de Refuerzo Nocturno en Casa",
        desc: "Férulas flexibles con peróxido de carbamida para consolidar el blanco.",
      },
    ],
    materialsUsed: [
      "Gel Philips Zoom WhiteSpeed 25% Peróxido de Hidrógeno",
      "Fórmula desensibilizante Relief ACP (Amorphous Calcium Phosphate)",
      "Lámpara de fotopolimerización LED calibrada Philips",
    ],
  },
  {
    slug: "periodoncia",
    name: "Periodoncia Médica & Cirugía Tisular",
    category: "Salud Periodontal",
    image: "/images/clinical/case5_perio.jpg",
    heroImage: "/images/clinic/consultation.jpg",
    shortDesc:
      "Tratamiento microbiológico y regeneración de encía y soporte óseo para frenar la piorrea y devolver la firmeza a los dientes.",
    fullDesc:
      "La salud periodontal es los cimientos de cualquier tratamiento estético. Mediante curetaje ultrasónico guiado, test bacterianos de ADN y técnicas de microcirugía periodontal con injertos conectivos, recuperamos encías retraídas y eliminamos la inflamación crónica gingival.",
    duration: "2 a 4 sesiones según estadiaje periodontal",
    sessions: "2 a 4 sesiones + mantenimiento bimensual",
    invasiveness: "Moderada",
    anesthesia: "Anestesia local confort",
    warranty: "Control de estabilidad periodontal con sondaje anual",
    doctorInCharge: "Dr. Javier Morales",
    indications: [
      "Sangrado gingival espontáneo o durante el cepillado",
      "Movilidad o separación progresiva de piezas dentales",
      "Recesión de encías (dientes que parecen más largos y raíces expuestas)",
      "Mal aliento crónico resistente a enjuagues bucales",
    ],
    protocolSteps: [
      {
        title: "Periodontograma y Sondaje 3D",
        desc: "Medición exacta de la profundidad de cada bolsa periodontal.",
      },
      {
        title: "Test Microbiológico de ADN Bacteriano",
        desc: "Identificación de los patógenos periodontales específicos en saliva.",
      },
      {
        title: "Raspado y Alisado Radicular Ultrasónico",
        desc: "Descontaminación minuciosa de la superficie de las raíces dentarias.",
      },
      {
        title: "Microcirugía de Regeneración Mucogingival",
        desc: "Injertos de tejido conectivo para recubrir raíces expuestas por recesión.",
      },
      {
        title: "Programa de Mantenimiento Personalizado",
        desc: "Revisiones periódicas y profilaxis periodontal cada 4-6 meses.",
      },
    ],
    materialsUsed: [
      "Instrumental de microcirugía periodontal Hu-Friedy",
      "Matriz de proteínas del esmalte Straumann® Emdogain",
      "Membranas de colágeno bioabsorbible Geistlich Bio-Gide®",
    ],
  },
  {
    slug: "diseno-sonrisa",
    name: "Diseño Digital de Sonrisa (DSD)",
    category: "Estética Dental",
    image: "/images/treatments/diseno_sonrisa.jpg",
    heroImage: "/images/clinic/patient_mirror.jpg",
    shortDesc:
      "Estudio biométrico facial y simulación en vídeo 3D para diseñar la sonrisa ideal en armonía con tus rasgos faciales.",
    fullDesc:
      "La odontología guiada por la arquitectura facial. El protocolo Digital Smile Design (DSD) analiza el rostro en movimiento: cómo sonríes al hablar, tu línea labial y las proporciones de los ojos y la nariz. El paciente puede probar físicamente el diseño en su propia boca antes de tocar ni un solo diente.",
    duration: "1 cita de estudio + 1 cita de prueba mock-up",
    sessions: "2 sesiones",
    invasiveness: "Mínima",
    anesthesia: "No requerida",
    warranty: "Planificación integral garantizada",
    doctorInCharge: "Dra. Sofía Varela",
    indications: [
      "Pacientes que desean mejorar su sonrisa pero no se atreven a dar el paso sin ver el resultado antes",
      "Casos multidisciplinares que combinan ortodoncia, carillas e implantes",
      "Sonrisas gingivales (exceso de encía al reír)",
      "Asimetrías faciales y dentales complejas",
    ],
    protocolSteps: [
      {
        title: "Sesión Fotográfica y Vídeo Dinámico",
        desc: "Registro de alta resolución en estudio de los movimientos labiales.",
      },
      {
        title: "Escaneo Óptico y TAC Facial",
        desc: "Digitalización 3D y superposición con las fotografías del rostro.",
      },
      {
        title: "Diseño Arquitectónico en Software DSD",
        desc: "Cálculo matemático de las curvas y proporciones dentales ideales.",
      },
      {
        title: "Mock-Up Físico en Boca",
        desc: "Colocación de una maqueta provisional sin tallado para verse en el espejo.",
      },
      {
        title: "Aprobación y Plan de Tratamiento",
        desc: "El paciente valida el resultado y se define la ruta clínica exacta.",
      },
    ],
    materialsUsed: [
      "Software 3D DSD Planning Suite",
      "Resinas fotopolimerizables para mock-up estético Protemp 4",
      "Escáner intraoral 3D de alta definición",
    ],
  },
];
