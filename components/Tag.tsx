/**
 * Pill / tag component used for skills and project tech stacks.
 *
 * Two variants:
 *   accent  — blue background, used for the Skills section
 *   neutral — grey background, used for project tech tags so cards stay calm
 */
type TagProps = {
  children: React.ReactNode;
  variant?: "accent" | "neutral";
};

const variants = {
  accent:
    "bg-accent-soft text-accent ring-1 ring-inset ring-accent/20 dark:bg-accent/15 dark:text-blue-300 dark:ring-accent/30",
  neutral:
    "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700",
};

export function Tag({ children, variant = "accent" }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
