"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    name: "All",
    icon: "mdi:apps", // or any general icon
    // Add a value to match the filter logic
  },
  {
    name: "Fitness",
    icon: "mdi:dumbbell",
  },
  {
    name: "Grocery",
    icon: "mdi:food-apple-outline",
  },
  {
    name: "Fashion",
    icon: "mdi:tshirt-crew-outline",
  },
  {
    name: "Beauty",
    icon: "mdi:lipstick",
  },
  {
    name: "Home",
    icon: "mdi:sofa-outline",
  },
  {
    name: "Mobile",
    icon: "mdi:cellphone",
  },
  {
    name: "Electronics",
    icon: "mdi:laptop",
  },
  {
    name: "New Arrivals",
    icon: "mdi:star-outline",
  },
  {
    name: "Brands",
    icon: "mdi:label-outline",
  },
];
const formatCat = (name) => name.toLowerCase().replace(/\s|&/g, "-");

export default function CategoryList({ selected = "all", onSelectCategory }) {
  return (
    <section className="w-full flex justify-center py-6 md:py-10">
      <div className="flex flex-wrap justify-center gap-5 md:gap-8 bg-transparent p-0">
        {categories.map((cat) => {
          const isActive = formatCat(cat.name) === selected;
          return (
            <button
              key={cat.name}
              aria-pressed={isActive}
              aria-label={cat.name}
              onClick={() => onSelectCategory(formatCat(cat.name))}
              className="group flex flex-col items-center gap-2"
              style={{ minWidth: 90 }}
            >
              <div
                className={`
                rounded-2xl
                w-16 h-16 md:w-20 md:h-20 flex items-center justify-center
                shadow-xl border 
               
                transition-all duration-200
                group-hover:scale-105 group-hover:border-indigo-400 group-hover:shadow-2xl
              `}
              >
                <Icon
                  icon={cat.icon}
                  width="38"
                  height="38"
                  className="text-indigo-700 dark:text-indigo-200 transition-colors duration-200"
                />
              </div>
              <span className="text-sm md:text-base font-semibold text-zinc-900 dark:text-white transition-colors">
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
