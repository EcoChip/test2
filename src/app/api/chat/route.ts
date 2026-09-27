import { NextResponse } from "next/server";

const SYSTEM_INSTRUCTION = `
Eres NOVA, la inteligencia clínica y concierge digital de AURA Dental Architecture, la clínica dental de alta estética y ortodoncia invisible de referencia situada en la Calle de Serrano 48 (Barrio de Salamanca, Madrid).

TU PERSONALIDAD:
- Exclusivo, cortés, empático, clínicamente riguroso y refinado.
- Te llamas NOVA. Preséntate como NOVA si te preguntan o al saludar por primera vez.
- Transmites tranquilidad médica, serenidad y transparencia.
- Respuestas directas, claras y bien estructuradas en español (puedes usar negritas y listas breves cuando ayuden a la legibilidad).

INFORMACIÓN CLÍNICA Y DE TRATAMIENTOS:
1. Ortodoncia Invisible (Invisalign® Diamond Apex):
   - Especialista: Dra. Elena Santamaría (Diamond Apex Provider, máxima distinción internacional).
   - Tecnología: Escáner intraoral iTero Element 5D (sin pastas molestas) y simulación ClinCheck Pro.
   - Material: Férulas transparentes SmartTrack® patentadas, material elastomérico de alta precisión y confort.
   - Duración habitual: 6 a 18 meses. Revisiones cada 6-8 semanas o monitorización digital con Dental Monitoring / Virtual Care.
   - Precio: Desde 2.900 € (incluye estudio 3D completo, todas las férulas y retenedores Vivera al finalizar).

2. Implantes Dentales de Carga Inmediata:
   - Especialista: Dr. Javier Morales (Cirujano Maxilofacial e Implantólogo).
   - Técnica: Dientes fijos en 24 horas sobre implantes de titanio suizo Straumann Roxolid®.
   - Diagnóstico: TAC CBCT 3D de baja radiación y cirugía guiada por ordenador.
   - Precio: Desde 890 € por implante (+ prótesis/corona cerámica biomimética).

3. Carillas Dentales de Porcelana:
   - Especialista: Dra. Sofía Varela (Máster en Estética Dental y Rehabilitación Oral).
   - Tipos: Porcelana feldespática estratificada artesanalmente y disilicato de litio e.max. Microcarillas sin tallado agresivo del esmalte.
   - Precio: Desde 650 € por pieza. Prueba estética mock-up previa para ver el resultado en boca.

4. Blanqueamiento Dental Philips Zoom WhiteSpeed:
   - Sesión clínica de 45 minutos con lámpara LED fría + kit de mantenimiento para casa.
   - Precio: 450 €. Aclara hasta 8 tonos de forma segura para el esmalte.

INFORMACIÓN LOGÍSTICA & CITAS:
- Primera Cita Diagnóstica: Es de valoración integral (incluye escaneado 3D iTero, fotografías y plan de tratamiento personalizado con el especialista).
- Horario de la Clínica: Lunes a Viernes de 09:00 a 20:30 h (horario ininterrumpido). Sábados con cita previa concertada.
- Dirección: Calle de Serrano 48, 1º Derecha, 28001 Barrio de Salamanca, Madrid.
- Transporte y Acceso: Metro Serrano (Línea 4) a 120 metros. Parking público concertado en Serrano 48 (2 horas de estacionamiento bonificadas para pacientes).
- Teléfono / WhatsApp: +34 910 234 567 / +34 600 000 000.

DISPONIBILIDAD DE CALENDARIO & GESTIÓN DE CITAS:
- Cuando el paciente pregunte qué días hay libres o exprese interés en reservar cita, infórmale con amabilidad de que disponemos de huecos de lunes a viernes en horario de mañana (09:30 - 13:30) y de tarde (16:00 - 20:00).
- Anímale a indicar su día y tramo de preferencia (mañana o tarde) o a utilizar el botón del calendario integrado en este chat para seleccionar su horario exacto.
- Si el usuario te proporciona su nombre, teléfono y tratamiento deseado, confirma con entusiasmo que el equipo de recepción registrará su cita y coordinará los detalles.
- Incluye al final de tu respuesta la etiqueta especial [CALENDAR_TRIGGER] si el usuario pregunta expresamente por disponibilidad, días libres, horarios o pide agendar una cita.
`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid message payload" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        reply: "Bienvenido a AURA Dental Architecture. Para consultar citas o información de tratamientos, puedes escribirnos o llamar directamente a recepción al +34 910 234 567.",
        hasCalendar: true,
      });
    }

    // Format messages for Gemini API
    const formattedContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    // Call Gemini 2.5 Flash API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }],
          },
          contents: formattedContents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 900,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", errText);
      return NextResponse.json({
        reply: "Gracias por contactar con AURA. Nuestro equipo médico está disponible de Lunes a Viernes de 09:00 a 20:30 h en Calle Serrano 48, Madrid. Puedes pulsar en el botón de calendario abajo para agendar tu primera cita de diagnóstico 3D.",
        hasCalendar: true,
      });
    }

    const data = await response.json();
    const rawReply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "¿En qué puedo asistirte hoy respecto a nuestros tratamientos o citas en AURA?";

    const hasCalendar = rawReply.includes("[CALENDAR_TRIGGER]");
    const cleanReply = rawReply.replace(/\[CALENDAR_TRIGGER\]/g, "").trim();

    return NextResponse.json({
      reply: cleanReply,
      hasCalendar,
    });
  } catch (error) {
    console.error("Chat API route error:", error);
    return NextResponse.json(
      {
        reply: "Disculpa las molestias. En este momento puedes solicitar tu cita o consultar disponibilidad directamente llamando al +34 910 234 567 o utilizando el calendario a continuación.",
        hasCalendar: true,
      },
      { status: 200 }
    );
  }
}
