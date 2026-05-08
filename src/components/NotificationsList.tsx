import React from "react";
import { AnimatedList } from "@/components/ui/animated-list";
import { UserPlus, Calendar, Clock, Trophy } from "lucide-react";

interface Notification {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  icon: React.ReactNode;
}

const notifications: Notification[] = [
  {
    id: 1,
    title: "Nueva inscripción",
    description: "Carla Bravo se ha inscrito en \"Cuerda Frotada\" (Concurso de Otoño 2025).",
    timestamp: "27 abr",
    icon: <UserPlus className="h-4 w-4 text-emerald-500" />,
  },
  {
    id: 2,
    title: "Asignación de ensayo",
    description: "Tienes asignado un ensayo para el Concurso de Primavera 2026.",
    timestamp: "26 abr",
    icon: <Calendar className="h-4 w-4 text-blue-500" />,
  },
  {
    id: 3,
    title: "Cambio de horario",
    description: "Tu actuación en \"Piano Solista\" ha cambiado al sábado 10:00.",
    timestamp: "25 abr",
    icon: <Clock className="h-4 w-4 text-amber-500" />,
  },
  {
    id: 4,
    title: "Has ganado un concurso",
    description: "¡Felicidades! Has obtenido el primer premio en Concurso de Verano.",
    timestamp: "20 abr",
    icon: <Trophy className="h-4 w-4 text-yellow-500" />,
  },
];

function NotificationItem({ notification }: { notification: Notification }) {
  return (
    <div
      className="flex items-start gap-2 bg-white p-3 rounded-lg shadow-sm border border-gray-100 w-full"
      style={{ minWidth: "180px" }}
    >
      <div className="flex-shrink-0 mt-0.5">
        {notification.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-900">
          {notification.title}
        </p>
        <p className="text-[10px] text-gray-600 mt-0.5 line-clamp-2">
          {notification.description}
        </p>
        <p className="text-[10px] text-gray-400 mt-1">
          {notification.timestamp}
        </p>
      </div>
    </div>
  );
}

export function NotificationsList() {
  return (
    <div className="bg-white rounded-2xl p-3 shadow-xl w-full flex flex-col relative" style={{ height: "340px" }}>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
        <h3 className="text-xs font-semibold text-gray-800">Notificaciones</h3>
      </div>
      <div className="flex-1 overflow-hidden relative">
        <AnimatedList delay={1200}>
          {notifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </AnimatedList>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}
