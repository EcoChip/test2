"use client";

import React, { useState, useEffect, useRef } from "react";
import { CloseIcon, ArrowRightIcon, CalendarIcon, PhoneIcon, WhatsAppIcon, NovaChatIcon } from "../ui/Icons";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  hasCalendar?: boolean;
  appointment?: {
    bookingId: string;
    date: string;
    time: string;
    treatment: string;
    doctor: string;
    gcalUrl: string;
    waUrl: string;
  };
}

interface AvailableDay {
  date: string;
  dayName: string;
  formattedDate: string;
  isAvailable: boolean;
  slots: string[];
}

export function AuraChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"chat" | "calendar">("chat");
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [unreadPrompt, setUnreadPrompt] = useState(true);

  // Calendar & Booking state
  const [availableDays, setAvailableDays] = useState<AvailableDay[]>([]);
  const [selectedDay, setSelectedDay] = useState<AvailableDay | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    email: "",
    treatment: "Invisalign® Diamond Apex",
  });
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const fabRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close speed dial when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (fabRef.current && !fabRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [menuOpen]);

  // Initial greeting message
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-1",
      role: "assistant",
      content:
        "Hola, soy NOVA, tu asistente virtual en AURA Dental Architecture. ¿En qué puedo ayudarte hoy? Puedes consultarme sobre Invisalign, implantes o ver los días libres para tu cita.",
      hasCalendar: true,
    },
  ]);

  // Load calendar availability
  useEffect(() => {
    async function loadCalendar() {
      try {
        const res = await fetch("/api/appointments");
        if (res.ok) {
          const data = await res.json();
          setAvailableDays(data.calendar || []);
          const firstAvailable = data.calendar?.find((d: AvailableDay) => d.isAvailable);
          if (firstAvailable) {
            setSelectedDay(firstAvailable);
          }
        }
      } catch (err) {
        console.error("Failed to fetch calendar", err);
      }
    }
    loadCalendar();
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (isOpen && viewMode === "chat") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, viewMode, isLoading]);

  // Focus input on open
  useEffect(() => {
    if (isOpen && viewMode === "chat") {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, viewMode]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const history = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok) throw new Error("Error en servidor");
      const data = await res.json();

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply,
        hasCalendar: data.hasCalendar,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "Disculpa la interrupción temporal. Puedes consultar la disponibilidad en nuestro calendario interactivo o llamarnos directamente al +34 910 234 567.",
          hasCalendar: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDay || !selectedSlot || !bookingForm.name || !bookingForm.phone) return;

    setIsSubmittingBooking(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...bookingForm,
          date: selectedDay.date,
          time: selectedSlot,
        }),
      });

      if (!res.ok) throw new Error("Error al reservar");
      const result = await res.json();

      // Add confirmation message to chat thread
      const confirmationMsg: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: `🎉 **¡Cita Agendada con Éxito!**\n\nTe esperamos el **${selectedDay.dayName}, ${selectedDay.formattedDate}** a las **${selectedSlot} h** en Calle de Serrano 48, 1º Dcha.\n\nCódigo de reserva: **${result.bookingId}**\nDoctor/a asignado: **${result.doctor}**\nTratamiento: **${result.treatment}**`,
        appointment: {
          bookingId: result.bookingId,
          date: selectedDay.formattedDate,
          time: selectedSlot,
          treatment: result.treatment,
          doctor: result.doctor,
          gcalUrl: result.gcalUrl,
          waUrl: result.waUrl,
        },
      };

      setMessages((prev) => [...prev, confirmationMsg]);
      setViewMode("chat");
    } catch (err) {
      console.error(err);
      alert("Hubo un problema al registrar la cita. Por favor, llámanos al +34 910 234 567.");
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  return (
    <>
      {/* Unified Floating Action Button (FAB) & Speed-Dial Menu */}
      <div ref={fabRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5">
        {/* Soft Notification Cue on Page Load */}
        {unreadPrompt && !isOpen && !menuOpen && (
          <div
            onClick={() => {
              setIsOpen(true);
              setUnreadPrompt(false);
            }}
            className="mb-1 max-w-xs bg-obsidian/95 border border-white/15 text-porcelain p-3.5 rounded-2xl shadow-2xl backdrop-blur-md animate-fade-in flex items-start gap-3 cursor-pointer hover:border-coral/50 transition-colors"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-coral shrink-0 mt-1.5 opacity-90" />
            <div className="text-xs space-y-1">
              <div className="font-semibold text-coral flex items-center justify-between">
                <span>NOVA · Asistente Virtual</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setUnreadPrompt(false);
                  }}
                  className="text-porcelain/40 hover:text-porcelain transition-colors p-1"
                  aria-label="Cerrar aviso"
                >
                  ✕
                </button>
              </div>
              <p className="text-porcelain/80 text-[11px] leading-relaxed">
                ¿Tienes dudas sobre Invisalign o deseas ver qué días tenemos libres para tu cita?
              </p>
            </div>
          </div>
        )}

        {/* Speed-Dial Expanded Options (WhatsApp & NOVA) */}
        {menuOpen && !isOpen && (
          <div className="flex flex-col gap-2.5 items-end mb-1 animate-fade-in">
            {/* WhatsApp Trigger */}
            <a
              href="https://wa.me/34600000000?text=Hola%20AURA%2C%20quisiera%20solicitar%20informaci%C3%B3n%20para%20una%20cita%20cl%C3%ADnica."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#1EA952] hover:bg-[#189345] text-white shadow-xl hover:shadow-2xl transition-all duration-300 min-h-[48px] text-xs font-sans font-medium"
              aria-label="Pedir cita vía WhatsApp"
            >
              <WhatsAppIcon className="w-5 h-5 shrink-0" />
              <span className="whitespace-nowrap">WhatsApp Directo</span>
            </a>

            {/* Chatbot NOVA Trigger */}
            <button
              onClick={() => {
                setMenuOpen(false);
                setIsOpen(true);
                setUnreadPrompt(false);
              }}
              className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-obsidian border border-coral/50 text-porcelain hover:bg-black/90 shadow-xl hover:shadow-2xl transition-all duration-300 min-h-[48px] text-xs font-sans font-medium"
              aria-label="Abrir asistente NOVA"
            >
              <NovaChatIcon className="w-5 h-5 text-coral shrink-0" />
              <span className="whitespace-nowrap">Asistente Virtual NOVA</span>
            </button>
          </div>
        )}

        {/* Single Unified FAB Main Trigger */}
        <button
          onClick={() => {
            if (isOpen) {
              setIsOpen(false);
            } else {
              setMenuOpen(!menuOpen);
              setUnreadPrompt(false);
            }
          }}
          className={`group flex items-center h-14 rounded-full bg-obsidian text-porcelain border shadow-2xl backdrop-blur-md transition-all duration-300 ease-out px-4 min-h-[48px] ${
            isOpen || menuOpen
              ? "border-coral/60 bg-black/90"
              : "border-white/20 hover:border-coral/50"
          }`}
          aria-expanded={isOpen || menuOpen}
          aria-label={
            isOpen
              ? "Cerrar asistente"
              : menuOpen
              ? "Cerrar menú de contacto"
              : "Abrir opciones de contacto y asistente NOVA"
          }
        >
          <div className="w-6 h-6 flex items-center justify-center shrink-0 text-coral group-hover:text-white transition-colors">
            {isOpen || menuOpen ? (
              <CloseIcon className="w-4 h-4 text-porcelain" />
            ) : (
              <NovaChatIcon className="w-5 h-5 text-coral group-hover:text-white transition-colors" />
            )}
          </div>

          <span
            className={`${
              isOpen || menuOpen
                ? "max-w-xs opacity-100 ml-2.5"
                : "max-w-0 sm:group-hover:max-w-[190px] opacity-0 sm:group-hover:opacity-100 ml-0 sm:group-hover:ml-2.5"
            } font-sans font-medium text-xs tracking-wider uppercase text-porcelain transition-all duration-300 ease-out overflow-hidden whitespace-nowrap`}
          >
            {isOpen ? "Cerrar" : menuOpen ? "Cerrar" : "Contacto & Citas"}
          </span>
        </button>
      </div>

      {/* Main Chatbot Modal / Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[640px] max-h-[calc(100dvh-7rem)] bg-obsidian/95 border border-white/15 rounded-2xl shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden animate-fade-in text-porcelain">
          
          {/* Header - Simple & Clean */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-coral to-amber-500 flex items-center justify-center text-white font-editorial text-lg font-bold shadow-md shrink-0">
                N
              </div>
              <div>
                <h3 className="font-editorial text-lg text-porcelain font-normal leading-none">
                  NOVA
                </h3>
                <p className="text-[11px] text-porcelain/60 font-sans mt-1">
                  Asistente virtual
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Toggle Calendar View Button */}
              <button
                onClick={() => setViewMode(viewMode === "chat" ? "calendar" : "chat")}
                className={`p-2 rounded-lg text-xs transition-colors flex items-center gap-1.5 border ${
                  viewMode === "calendar"
                    ? "bg-coral text-white border-coral"
                    : "bg-white/5 border-white/10 text-porcelain/80 hover:bg-white/10"
                }`}
                title={viewMode === "chat" ? "Ver calendario de citas" : "Volver al chat"}
              >
                <CalendarIcon className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase tracking-wider font-sans font-medium">
                  {viewMode === "chat" ? "Días libres" : "Chat"}
                </span>
              </button>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-porcelain/60 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Cerrar"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* VIEW 1: CONVERSATIONAL CHAT */}
          {viewMode === "chat" && (
            <>
              {/* Message History Area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans leading-relaxed scrollbar-thin scrollbar-thumb-white/10">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.role === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl ${
                        msg.role === "user"
                          ? "bg-coral text-white rounded-br-none shadow-md"
                          : "bg-white/5 border border-white/10 text-porcelain/90 rounded-bl-none shadow-sm"
                      }`}
                    >
                      <div className="whitespace-pre-line space-y-2">
                        {msg.content}
                      </div>

                      {/* Embedded Calendar Action Trigger */}
                      {msg.hasCalendar && (
                        <div className="mt-3 pt-3 border-t border-white/15">
                          <button
                            onClick={() => setViewMode("calendar")}
                            className="btn-slide-left btn-slide-dark w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-coral text-white font-medium transition-colors shadow-sm text-xs"
                          >
                            <CalendarIcon className="w-3.5 h-3.5" />
                            <span>Ver calendario y días libres</span>
                          </button>
                        </div>
                      )}

                      {/* Embedded Confirmed Appointment Card */}
                      {msg.appointment && (
                        <div className="mt-3 p-3 bg-black/40 border border-white/15 rounded-xl space-y-2.5">
                          <div className="flex items-center justify-between text-[11px] text-porcelain/60">
                            <span>Serrano 48, 1º Dcha</span>
                            <span className="font-mono text-coral font-bold">
                              #{msg.appointment.bookingId}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <a
                              href={msg.appointment.gcalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 py-1.5 px-2 bg-white/10 hover:bg-white/20 text-center rounded text-[11px] font-medium text-porcelain transition-colors"
                            >
                              📅 Añadir a Google Calendar
                            </a>
                            <a
                              href={msg.appointment.waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="py-1.5 px-2.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] rounded text-[11px] font-medium transition-colors"
                              title="Confirmar por WhatsApp"
                            >
                              WhatsApp
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-porcelain/40 px-1 mt-1 font-mono">
                      {msg.role === "user" ? "Tú" : "NOVA"}
                    </span>
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex items-center gap-2 text-porcelain/50 text-xs italic p-2 bg-white/5 rounded-xl w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse" />
                    <span>NOVA está escribiendo...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompt Pills */}
              <div className="px-4 py-2 bg-black/20 border-t border-white/5 flex gap-2 overflow-x-auto text-[11px] no-scrollbar">
                <button
                  onClick={() => setViewMode("calendar")}
                  className="shrink-0 px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-coral/40 text-porcelain/80 hover:text-white transition-colors"
                >
                  📅 Ver días libres
                </button>
                <button
                  onClick={() => handleSendMessage("¿Cuánto cuesta el tratamiento Invisalign Diamond?")}
                  className="shrink-0 px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-coral/40 text-porcelain/80 hover:text-white transition-colors"
                >
                  🦷 Precio Invisalign
                </button>
                <button
                  onClick={() => handleSendMessage("¿Cuáles son los horarios y doctores de la clínica?")}
                  className="shrink-0 px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-coral/40 text-porcelain/80 hover:text-white transition-colors"
                >
                  ⏱️ Horarios y Doctores
                </button>
                <button
                  onClick={() => handleSendMessage("¿Cómo llegar a la clínica en Serrano 48?")}
                  className="shrink-0 px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-coral/40 text-porcelain/80 hover:text-white transition-colors"
                >
                  📍 Cómo llegar
                </button>
              </div>

              {/* Input Area */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 border-t border-white/10 bg-black/40 flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Pregunta sobre tratamientos o pide cita..."
                  disabled={isLoading}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-porcelain placeholder:text-porcelain/40 focus:outline-none focus:border-coral/50"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputMessage.trim()}
                  className="btn-slide-left btn-slide-dark p-2.5 bg-coral disabled:opacity-40 text-white rounded-xl transition-colors"
                  aria-label="Enviar mensaje"
                >
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </form>
            </>
          )}

          {/* VIEW 2: INTERACTIVE CALENDAR & APPOINTMENT SCHEDULER */}
          {viewMode === "calendar" && (
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h4 className="font-editorial text-lg text-porcelain font-normal">
                    Calendario de Citas AURA
                  </h4>
                  <p className="text-[11px] text-porcelain/60">
                    Selecciona día y hora para tu primera valoración 3D gratuita.
                  </p>
                </div>
                <button
                  onClick={() => setViewMode("chat")}
                  className="text-coral hover:underline text-xs"
                >
                  Volver al chat
                </button>
              </div>

              {/* 14 Days Carousel / Picker */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-wider text-porcelain/50">
                  Próximos días disponibles
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {availableDays.map((day) => {
                    const isSelected = selectedDay?.date === day.date;
                    return (
                      <button
                        key={day.date}
                        disabled={!day.isAvailable}
                        onClick={() => {
                          setSelectedDay(day);
                          setSelectedSlot("");
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          !day.isAvailable
                            ? "bg-white/[0.02] border-white/5 opacity-40 cursor-not-allowed"
                            : isSelected
                            ? "bg-coral/20 border-coral text-white shadow-sm"
                            : "bg-white/5 border-white/10 hover:border-white/20 text-porcelain"
                        }`}
                      >
                        <div className="text-[10px] uppercase tracking-wider text-porcelain/60 font-mono">
                          {day.dayName}
                        </div>
                        <div className="text-sm font-semibold mt-0.5">
                          {day.formattedDate}
                        </div>
                        <div className="text-[10px] mt-1 flex items-center gap-1.5">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              day.isAvailable ? "bg-emerald-400" : "bg-red-400"
                            }`}
                          />
                          <span className="text-porcelain/60">
                            {day.isAvailable ? `${day.slots.length} horas` : "Cerrado"}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots for Selected Day */}
              {selectedDay && selectedDay.isAvailable && (
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-porcelain/50">
                      Horas libres ({selectedDay.dayName} {selectedDay.formattedDate})
                    </span>
                    <span className="text-[10px] text-coral font-medium">45 min consulta</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {selectedDay.slots.map((slot) => {
                      const isSelectedSlot = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 px-3 rounded-lg border text-center font-mono text-xs transition-all ${
                            isSelectedSlot
                              ? "bg-coral text-white border-coral font-bold shadow-md"
                              : "bg-white/5 border-white/10 hover:bg-white/10 text-porcelain"
                          }`}
                        >
                          {slot} h
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Patient Details Booking Form */}
              {selectedDay && selectedSlot && (
                <form
                  onSubmit={handleBookingSubmit}
                  className="space-y-3 pt-3 border-t border-white/10 bg-black/40 p-4 rounded-xl border"
                >
                  <div className="font-editorial text-base text-coral font-normal">
                    Confirmar Reserva para {selectedDay.formattedDate} a las {selectedSlot} h
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-porcelain/60">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Carmen Navarro"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-porcelain focus:outline-none focus:border-coral"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-porcelain/60">
                      Teléfono Móvil (Confirmación por SMS/WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+34 600 000 000"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-porcelain focus:outline-none focus:border-coral"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-porcelain/60">
                      Tratamiento de Interés
                    </label>
                    <select
                      value={bookingForm.treatment}
                      onChange={(e) => setBookingForm({ ...bookingForm, treatment: e.target.value })}
                      className="w-full bg-obsidian border border-white/10 rounded-lg px-3 py-2 text-xs text-porcelain focus:outline-none focus:border-coral"
                    >
                      <option value="Invisalign® Diamond Apex">Invisalign® Diamond Apex (Ortodoncia)</option>
                      <option value="Implantes de Carga Inmediata">Implantes Dentales de Carga Inmediata</option>
                      <option value="Carillas de Porcelana">Carillas de Porcelana Biomimética</option>
                      <option value="Blanqueamiento Philips Zoom">Blanqueamiento Philips Zoom</option>
                      <option value="Primera Consulta Diagnóstica 3D">Primera Consulta Diagnóstica General</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingBooking}
                    className="btn-slide-left btn-slide-dark w-full py-2.5 bg-coral text-white font-medium rounded-lg text-xs uppercase tracking-wider transition-colors shadow-cta flex items-center justify-center gap-2 mt-2"
                  >
                    {isSubmittingBooking ? (
                      <span>Registrando reserva...</span>
                    ) : (
                      <>
                        <span>Agendar Cita en Serrano 48</span>
                        <ArrowRightIcon className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Footer Info Strip */}
          <div className="p-2.5 px-4 bg-black/60 border-t border-white/10 flex items-center justify-between text-[10px] text-porcelain/50">
            <span>Urgencias & Recepción: +34 910 234 567</span>
            <span>C/ Serrano 48, Madrid</span>
          </div>
        </div>
      )}
    </>
  );
}
