"use client";

import {
  ArrowUpRight,
} from "lucide-react";

interface Props {
  title: string;
  value: number;

  icon?: React.ReactNode;

  color?: string;
}

export default function MetricCard({
  title,
  value,
  icon,
  color = "bg-blue-600",
}: Props) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-xl
        border
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      {/* Top */}

      <div className="flex items-center justify-between">

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${color}`}
        >
          {icon ?? (
            <ArrowUpRight size={22} />
          )}
        </div>

        <ArrowUpRight
          size={18}
          className="
            text-gray-300
            transition-transform
            group-hover:translate-x-1
            group-hover:-translate-y-1
          "
        />

      </div>

      {/* Content */}

      <div className="mt-6">

        <p className="text-sm font-medium text-gray-500">

          {title}

        </p>

        <h2 className="mt-2 text-4xl font-bold text-gray-900">

          {value}

        </h2>

      </div>

      {/* Bottom Accent */}

      <div
        className={`absolute bottom-0 left-0 h-1 w-full ${color}`}
      />

    </div>
  );
}