import * as LucideIcons from "lucide-react";

/** Resolves an icon name string (as stored in topics.js/badges.js data) to
 * its lucide-react component, so those data files stay plain/portable. */
export function getMathsIcon(name) {
  return LucideIcons[name] || LucideIcons.HelpCircle;
}
