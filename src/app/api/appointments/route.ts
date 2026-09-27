import { NextResponse } from "next/server";

export interface AvailableDay {
  date: string;
  dayName: string;
  formattedDate: string;
  isAvailable: boolean;
  slots: string[];
}

// Generate real dynamic available calendar slots for the next 14 days
function getAvailableCalendar(): AvailableDay[] {
  const days: AvailableDay[] = [];
  const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  const baseDate = new Date();

  for (let i = 1; i <= 14; i++) {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + i);

    const dayOfWeek = d.getDay(); // 0 is Sunday, 6 is Saturday
    const dateStr = d.toISOString().split("T")[0];
    const dayName = dayNames[dayOfWeek];
    const formattedDate = `${d.getDate()} ${monthNames[d.getMonth()]}`;

    if (dayOfWeek === 0) {
      // Sunday: Clinic closed
      days.push({
        date: dateStr,
        dayName,
        formattedDate,
        isAvailable: false,
        slots: [],
      });
    } else if (dayOfWeek === 6) {
      // Saturday: Morning only (VIP / Preferente)
      days.push({
        date: dateStr,
        dayName,
        formattedDate,
        isAvailable: true,
        slots: ["10:00", "11:30", "13:00"],
      });
    } else {
      // Monday to Friday: Full schedule (09:00 - 20:30)
      days.push({
        date: dateStr,
        dayName,
        formattedDate,
        isAvailable: true,
        slots: ["09:30", "11:00", "12:30", "16:00", "17:30", "19:00"],
      });
    }
  }

  return days;
}

export async function GET() {
  const calendar = getAvailableCalendar();
  return NextResponse.json({
    calendar,
    clinicSchedule: "Lunes a Viernes de 09:00 a 20:30 h. Sábados de 10:00 a 14:00 h.",
    address: "Calle de Serrano 48, 1º Dcha, 28001 Madrid",
    phone: "+34 910 234 567",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, date, time, treatment, notes } = body;

    if (!name || !phone || !date || !time) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios para agendar la cita (nombre, teléfono, fecha y hora)." },
        { status: 400 }
      );
    }

    const bookingId = `AURA-${Date.now().toString().slice(-4)}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Prepare Google Calendar link
    const eventTitle = encodeURIComponent(`Cita Diagnóstica 3D AURA Dental - ${treatment || "Estética & Ortodoncia"}`);
    const eventDetails = encodeURIComponent(
      `Cita confirmada en AURA Dental Architecture para ${name}.\nTratamiento: ${treatment || "Valoración general"}\nCódigo de cita: ${bookingId}\nTeléfono: +34 910 234 567\nDirección: Calle Serrano 48, 1º Dcha, Madrid.`
    );
    const eventLocation = encodeURIComponent("Calle de Serrano 48, 1º Derecha, 28001 Madrid");

    // Format ISO start and end timestamps (approx 45 mins appointment)
    const startIso = `${date.replace(/-/g, "")}T${time.replace(":", "")}00`;
    const [hour, min] = time.split(":").map(Number);
    const endMinutes = min + 45;
    const endHour = hour + Math.floor(endMinutes / 60);
    const remMinutes = endMinutes % 60;
    const endIso = `${date.replace(/-/g, "")}T${String(endHour).padStart(2, "0")}${String(remMinutes).padStart(2, "0")}00`;

    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startIso}/${endIso}&details=${eventDetails}&location=${eventLocation}`;

    // Prepare WhatsApp message
    const waText = encodeURIComponent(
      `Hola AURA Dental, confirmo mi solicitud de cita:\n- Código: ${bookingId}\n- Nombre: ${name}\n- Fecha: ${date} a las ${time} h\n- Tratamiento: ${treatment || "Primera Consulta"}`
    );
    const waUrl = `https://wa.me/34600000000?text=${waText}`;

    return NextResponse.json({
      success: true,
      bookingId,
      name,
      phone,
      email,
      date,
      time,
      treatment: treatment || "Primera Consulta Diagnóstica 3D",
      doctor: treatment?.toLowerCase().includes("invisalign")
        ? "Dra. Elena Santamaría (Diamond Apex)"
        : treatment?.toLowerCase().includes("implante")
        ? "Dr. Javier Morales (Implantología)"
        : "Dra. Sofía Varela (Estética Dental)",
      location: "Calle de Serrano 48, 1º Dcha, Madrid",
      gcalUrl,
      waUrl,
      message: `¡Cita reservada con éxito! Tu código de reserva es ${bookingId}. Te esperamos el ${date} a las ${time} h.`,
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Error interno al procesar la cita." },
      { status: 500 }
    );
  }
}
