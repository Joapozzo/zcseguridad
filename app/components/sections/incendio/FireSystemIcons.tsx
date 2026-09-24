import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Frame({ size = 32, children, ...props }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.35} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{children}</svg>
}

export function ConventionalIcon(props: IconProps) {
  return <Frame {...props}><rect x="5" y="3" width="22" height="6" rx="1" /><rect x="5" y="13" width="22" height="6" rx="1" fill="currentColor" fillOpacity=".25" /><rect x="5" y="23" width="22" height="6" rx="1" /></Frame>
}

export function AddressableIcon(props: IconProps) {
  return <Frame {...props}><circle cx="16" cy="5" r="3" /><circle cx="16" cy="16" r="6" /><circle cx="16" cy="16" r="2" fill="currentColor" stroke="none" /><circle cx="16" cy="27" r="3" /></Frame>
}

export function ExistingBuildingIcon(props: IconProps) {
  return <Frame {...props}><path d="M4 29V6l15-3v26H4ZM9 9v3m5-4v3M9 16v3m5-4v3M9 23v3m5-4v3" /><circle cx="25" cy="24" r="6" fill="var(--color-background)" /><path d="M22 24h6m-3-3v6" /></Frame>
}
