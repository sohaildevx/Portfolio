"use client";

import Image from "next/image";
import Link from "next/link";
import { Globe } from "lucide-react";
import { hackathons } from "@/constants/hackathons";

const HackathonList = () => {
  return (
    <div className="w-full text-left">
      {hackathons.map((hackathon, index) => {
        const isLast = index === hackathons.length - 1;
        const linkUrl = hackathon.devpostUrl ?? hackathon.githubUrl;
        const linkLabel = hackathon.devpostUrl
          ? "View on Devpost"
          : hackathon.githubUrl
            ? "View on GitHub"
            : null;

        return (
          <div
            key={hackathon.id}
            className={`flex gap-4 sm:gap-6 ${
              index > 0
                ? "border-t border-dashed border-gray-300 dark:border-zinc-700 pt-8"
                : ""
            }`}
          >
            
            <div className="relative flex shrink-0 flex-col items-center">
              {index > 0 && (
                <span className="absolute bottom-full left-1/2 h-8 w-px -translate-x-1/2 bg-gray-300 dark:bg-zinc-700" />
              )}

              <div className="relative z-10 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center overflow-hidden rounded-full border border-gray-200 dark:border-zinc-800 bg-purple-600">
                {hackathon.logo ? (
                  <Image
                    src={hackathon.logo}
                    alt={`${hackathon.name} logo`}
                    width={56}
                    height={56}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-lg sm:text-xl font-bold text-white">
                    {hackathon.name.charAt(0)}
                  </span>
                )}
              </div>

              {!isLast && (
                <span className="mt-3 w-px flex-1 bg-gray-300 dark:bg-zinc-700" />
              )}
            </div>

            
            <div className="flex-1 min-w-0 pb-8">
              <p className="text-sm text-gray-500 dark:text-zinc-400 tabular-nums">
                {hackathon.date}
              </p>
              <h3 className="mt-1 text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                {hackathon.name}
              </h3>
              <p className="text-sm text-gray-700 dark:text-zinc-300">
                {hackathon.project} · {hackathon.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-zinc-400">
                {hackathon.description}
              </p>

              {linkUrl && linkLabel && (
                <Link
                  href={linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-500 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  {linkLabel}
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HackathonList;
