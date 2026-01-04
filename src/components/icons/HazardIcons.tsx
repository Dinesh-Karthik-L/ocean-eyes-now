import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
  size?: number;
}

export const TsunamiIcon = ({ className, size = 24 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={cn("", className)}
  >
    <path 
      d="M3 18C5.5 18 6.5 16 8 16C9.5 16 10.5 18 13 18C15.5 18 16.5 16 18 16C19.5 16 20.5 18 21 18" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M3 12C5.5 12 6.5 10 8 10C9.5 10 10.5 12 13 12C15.5 12 16.5 10 18 10C19.5 10 20.5 12 21 12" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M3 6C5.5 6 6.5 4 8 4C9.5 4 10.5 6 13 6C15.5 6 16.5 4 18 4C19.5 4 20.5 6 21 6" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

export const StormIcon = ({ className, size = 24 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={cn("", className)}
  >
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
    <path 
      d="M12 2C12 2 12 5 12 6" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M12 18C12 19 12 22 12 22" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M4.93 4.93L7.05 7.05" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M16.95 16.95L19.07 19.07" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M2 12H6" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M18 12H22" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M4.93 19.07L7.05 16.95" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M16.95 7.05L19.07 4.93" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

export const WavesIcon = ({ className, size = 24 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={cn("", className)}
  >
    <path 
      d="M2 12C4 10 6 10 8 12C10 14 12 14 14 12C16 10 18 10 22 12" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M2 17C4 15 6 15 8 17C10 19 12 19 14 17C16 15 18 15 22 17" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M2 7C4 5 6 5 8 7C10 9 12 9 14 7C16 5 18 5 22 7" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

export const FloodIcon = ({ className, size = 24 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={cn("", className)}
  >
    <path 
      d="M12 2L12 8" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M12 8C12 8 8 12 8 15C8 18 10 20 12 20C14 20 16 18 16 15C16 12 12 8 12 8Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <circle cx="12" cy="15" r="2" fill="currentColor"/>
  </svg>
);

export const TidesIcon = ({ className, size = 24 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={cn("", className)}
  >
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
    <path 
      d="M12 2V4" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M12 20V22" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M2 12H4" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M20 12H22" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M4 4L6 6" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M18 18L20 20" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M4 20L6 18" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M18 6L20 4" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

export const DamageIcon = ({ className, size = 24 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={cn("", className)}
  >
    <path 
      d="M12 2L12 8L8 8" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 8L16 14L10 14" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M10 14L14 22" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <circle cx="4" cy="18" r="2" stroke="currentColor" strokeWidth="2"/>
    <circle cx="20" cy="6" r="2" stroke="currentColor" strokeWidth="2"/>
  </svg>
);
