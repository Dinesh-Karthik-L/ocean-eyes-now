export type HazardType = 
  | 'tsunami'
  | 'storm_surge'
  | 'high_waves'
  | 'coastal_flooding'
  | 'abnormal_tides'
  | 'coastal_damage';

export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

export type VerificationStatus = 'pending' | 'verified' | 'unverified' | 'false';

export type UserRole = 'citizen' | 'volunteer' | 'official' | 'analyst';

export interface HazardReport {
  id: string;
  hazardType: HazardType;
  description: string;
  latitude: number;
  longitude: number;
  mediaUrls: string[];
  timestamp: Date;
  reportedBy: string;
  verificationStatus: VerificationStatus;
  severity: SeverityLevel;
  language: string;
}

export interface Hotspot {
  id: string;
  latitude: number;
  longitude: number;
  radius: number;
  reportCount: number;
  severity: SeverityLevel;
  hazardTypes: HazardType[];
  lastUpdated: Date;
}

export interface SocialPost {
  id: string;
  platform: 'twitter' | 'facebook' | 'instagram';
  content: string;
  author: string;
  timestamp: Date;
  sentiment: 'panic' | 'neutral' | 'informative';
  keywords: string[];
  isHazardRelated: boolean;
  location?: { lat: number; lng: number };
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  location?: { lat: number; lng: number };
  language: string;
  createdAt: Date;
}

export const HAZARD_CONFIG: Record<HazardType, { 
  label: string; 
  icon: string; 
  color: string;
  bgColor: string;
}> = {
  tsunami: { 
    label: 'Tsunami', 
    icon: '🌊', 
    color: 'text-hazard-tsunami',
    bgColor: 'bg-hazard-tsunami'
  },
  storm_surge: { 
    label: 'Storm Surge', 
    icon: '🌀', 
    color: 'text-hazard-storm',
    bgColor: 'bg-hazard-storm'
  },
  high_waves: { 
    label: 'High Waves', 
    icon: '🌊', 
    color: 'text-hazard-waves',
    bgColor: 'bg-hazard-waves'
  },
  coastal_flooding: { 
    label: 'Coastal Flooding', 
    icon: '💧', 
    color: 'text-hazard-flood',
    bgColor: 'bg-hazard-flood'
  },
  abnormal_tides: { 
    label: 'Abnormal Tides', 
    icon: '🌙', 
    color: 'text-hazard-tides',
    bgColor: 'bg-hazard-tides'
  },
  coastal_damage: { 
    label: 'Coastal Damage', 
    icon: '⚠️', 
    color: 'text-hazard-damage',
    bgColor: 'bg-hazard-damage'
  },
};

export const SEVERITY_CONFIG: Record<SeverityLevel, {
  label: string;
  color: string;
  bgColor: string;
}> = {
  low: { label: 'Low', color: 'text-success', bgColor: 'bg-success' },
  medium: { label: 'Medium', color: 'text-warning', bgColor: 'bg-warning' },
  high: { label: 'High', color: 'text-destructive', bgColor: 'bg-destructive' },
  critical: { label: 'Critical', color: 'text-destructive', bgColor: 'bg-destructive' },
};
