import { useState } from "react"
import { Check, Link } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CopyRoomLinkButton() {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button variant="outline" size="sm" onClick={handleCopy}>
      {copied ? (
        <>
          <Check className="size-4" />
          Copied!
        </>
      ) : (
        <>
          <Link className="size-4" />
          Copy invite link
        </>
      )}
    </Button>
  )
}
