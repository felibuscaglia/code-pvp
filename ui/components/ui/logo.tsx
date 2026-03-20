import { cn } from "@/lib/utils"

function LogoIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-8", className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M13 7L5 16L13 25"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 7L27 16L19 25"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 9L14 23"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-primary"
      />
    </svg>
  )
}

function Logo({
  className,
  iconClassName,
  ...props
}: React.ComponentProps<"div"> & { iconClassName?: string }) {
  return (
    <div
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      <LogoIcon className={iconClassName} />
      <span className="font-heading text-lg font-bold tracking-tight">
        Code<span className="text-primary">Arena</span>
      </span>
    </div>
  )
}

export { Logo, LogoIcon }
