import type { SVGProps } from 'react';

const common = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

type IconProps = SVGProps<SVGSVGElement> & { label?: string };

function Svg({ label, children, ...props }: IconProps) {
  return (
    <svg {...common} {...props} aria-hidden={label ? undefined : true} role={label ? 'img' : undefined} aria-label={label}>
      {children}
    </svg>
  );
}

export function BrainIcon(props: IconProps) {
  return <Svg {...props}><path d="M9 3a3 3 0 0 0-3 3v1a4 4 0 0 0 0 8v1a3 3 0 0 0 5 2.24"/><path d="M15 3a3 3 0 0 1 3 3v1a4 4 0 0 1 0 8v1a3 3 0 0 1-5 2.24"/><path d="M12 4v16"/><path d="M8 11h2"/><path d="M14 11h2"/></Svg>;
}
export function ShieldIcon(props: IconProps) { return <Svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-5"/></Svg>; }
export function GraphIcon(props: IconProps) { return <Svg {...props}><circle cx="5" cy="12" r="3"/><circle cx="19" cy="5" r="3"/><circle cx="19" cy="19" r="3"/><path d="M7.8 10.8 16.2 6.2"/><path d="M7.8 13.2 16.2 17.8"/></Svg>; }
export function PulseIcon(props: IconProps) { return <Svg {...props}><path d="M3 12h4l2-6 4 12 2-6h6"/></Svg>; }
export function ArrowIcon(props: IconProps) { return <Svg {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></Svg>; }
export function CheckIcon(props: IconProps) { return <Svg {...props}><path d="M20 6 9 17l-5-5"/></Svg>; }
export function LockIcon(props: IconProps) { return <Svg {...props}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></Svg>; }
export function ChartIcon(props: IconProps) { return <Svg {...props}><path d="M4 19V5"/><path d="M4 19h16"/><path d="m7 15 4-4 3 3 5-7"/></Svg>; }
