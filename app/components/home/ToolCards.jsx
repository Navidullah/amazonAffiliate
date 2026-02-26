"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function ToolCards({ tools }) {
  return (
    <div className="grid md:grid-cols-3 gap-10">
      {tools.map((tool, i) => (
        <Link key={i} href={tool.href}>
          <motion.div
            whileHover={{ rotateY: 8, rotateX: 5, scale: 1.04 }}
            transition={{ type: "spring", stiffness: 180 }}
            className="perspective"
          >
            <Card
              className="
                rounded-2xl 
                bg-card/70
                dark:bg-muted/40
                border border-border
                shadow-md hover:shadow-xl
                transition-all duration-300
              "
            >
              <CardContent className="p-6">
                <div className="mb-4 text-primary">{tool.icon}</div>

                <h3 className="text-xl font-semibold text-card-foreground">
                  {tool.title}
                </h3>

                <p className="text-muted-foreground mt-2">{tool.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}
