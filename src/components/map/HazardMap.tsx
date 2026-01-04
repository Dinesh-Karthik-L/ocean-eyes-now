import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Layers, 
  Filter, 
  X, 
  Clock, 
  MapPin,
  CheckCircle2,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { HazardReport, HAZARD_CONFIG, SEVERITY_CONFIG, HazardType } from '@/types/hazard';
import { mockReports, mockHotspots } from '@/data/mockData';
import { cn } from '@/lib/utils';
import {
  TsunamiIcon,
  StormIcon,
  WavesIcon,
  FloodIcon,
  TidesIcon,
  DamageIcon,
} from '@/components/icons/HazardIcons';

const hazardIcons: Record<HazardType, React.ComponentType<{ className?: string; size?: number }>> = {
  tsunami: TsunamiIcon,
  storm_surge: StormIcon,
  high_waves: WavesIcon,
  coastal_flooding: FloodIcon,
  abnormal_tides: TidesIcon,
  coastal_damage: DamageIcon,
};

interface HazardPinProps {
  report: HazardReport;
  onClick: () => void;
  isSelected: boolean;
  style: React.CSSProperties;
}

const HazardPin = ({ report, onClick, isSelected, style }: HazardPinProps) => {
  const config = HAZARD_CONFIG[report.hazardType];
  const Icon = hazardIcons[report.hazardType];
  const severityConfig = SEVERITY_CONFIG[report.severity];

  return (
    <div
      className={cn(
        "absolute hazard-pin cursor-pointer transition-all duration-200",
        config.bgColor,
        isSelected && "scale-125 z-20 ring-4 ring-primary-foreground shadow-xl"
      )}
      style={style}
      onClick={onClick}
    >
      <Icon className="text-white" size={16} />
      {report.severity === 'critical' && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
        </span>
      )}
    </div>
  );
};

const ReportDetail = ({ report, onClose }: { report: HazardReport; onClose: () => void }) => {
  const config = HAZARD_CONFIG[report.hazardType];
  const severityConfig = SEVERITY_CONFIG[report.severity];
  const Icon = hazardIcons[report.hazardType];

  const verificationIcon = {
    verified: <CheckCircle2 className="h-4 w-4 text-success" />,
    pending: <AlertCircle className="h-4 w-4 text-warning" />,
    unverified: <XCircle className="h-4 w-4 text-muted-foreground" />,
    false: <XCircle className="h-4 w-4 text-destructive" />,
  };

  const timeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <Card className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 p-0 overflow-hidden z-30 animate-scale-in">
      {/* Header */}
      <div className={cn("p-4 flex items-start justify-between", config.bgColor)}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
            <Icon className="text-white" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-white">{config.label}</h3>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <Clock className="h-3 w-3" />
              {timeAgo(report.timestamp)}
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white/80 hover:text-white hover:bg-white/20"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        <p className="text-sm text-foreground">{report.description}</p>

        <div className="flex flex-wrap gap-2">
          <Badge className={cn(severityConfig.bgColor, "text-white")}>
            {severityConfig.label} Severity
          </Badge>
          <Badge variant="outline" className="gap-1">
            {verificationIcon[report.verificationStatus]}
            {report.verificationStatus.charAt(0).toUpperCase() + report.verificationStatus.slice(1)}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}
        </div>
      </div>
    </Card>
  );
};

export const HazardMap = () => {
  const [selectedReport, setSelectedReport] = useState<HazardReport | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<HazardType[]>([]);

  const filteredReports = useMemo(() => {
    if (activeFilters.length === 0) return mockReports;
    return mockReports.filter(r => activeFilters.includes(r.hazardType));
  }, [activeFilters]);

  const toggleFilter = (type: HazardType) => {
    setActiveFilters(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  // Convert lat/lng to pixel positions (simplified for demo)
  const getPosition = (lat: number, lng: number) => {
    // Normalize to map bounds (Chennai area roughly 12.9 - 13.3 lat, 80.2 - 80.35 lng)
    const minLat = 12.9, maxLat = 13.3;
    const minLng = 80.2, maxLng = 80.35;
    
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 100;
    
    return { left: `${x}%`, top: `${y}%` };
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-secondary rounded-lg overflow-hidden">
      {/* Map Background - Simulated */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-accent/5">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Coast Line Simulation */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <path
            d="M0,30 Q20,35 40,32 T80,35 T100,30 L100,100 L0,100 Z"
            fill="hsl(var(--primary) / 0.1)"
            className="opacity-30"
          />
        </svg>

        {/* Location Label */}
        <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm font-medium text-foreground border border-border">
          Chennai Coast, India
        </div>
      </div>

      {/* Hotspots (Heatmap circles) */}
      {mockHotspots.map((hotspot) => {
        const pos = getPosition(hotspot.latitude, hotspot.longitude);
        const severityColor = SEVERITY_CONFIG[hotspot.severity].bgColor;
        return (
          <div
            key={hotspot.id}
            className={cn(
              "absolute rounded-full opacity-30 animate-ping-slow",
              severityColor
            )}
            style={{
              ...pos,
              width: `${hotspot.radius / 20}px`,
              height: `${hotspot.radius / 20}px`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}

      {/* Report Pins */}
      {filteredReports.map((report) => (
        <HazardPin
          key={report.id}
          report={report}
          onClick={() => setSelectedReport(report)}
          isSelected={selectedReport?.id === report.id}
          style={getPosition(report.latitude, report.longitude)}
        />
      ))}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          variant="glass"
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
          className={cn(showFilters && "ring-2 ring-primary")}
        >
          <Filter className="h-4 w-4" />
        </Button>
        <Button variant="glass" size="icon">
          <Layers className="h-4 w-4" />
        </Button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <Card className="absolute top-4 right-16 w-64 p-4 animate-scale-in">
          <h4 className="font-semibold mb-3">Filter by Hazard Type</h4>
          <div className="space-y-2">
            {(Object.keys(HAZARD_CONFIG) as HazardType[]).map((type) => {
              const config = HAZARD_CONFIG[type];
              const Icon = hazardIcons[type];
              const isActive = activeFilters.includes(type);
              return (
                <button
                  key={type}
                  onClick={() => toggleFilter(type)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <Icon className={isActive ? "text-primary-foreground" : config.color} size={18} />
                  <span className="text-sm font-medium">{config.label}</span>
                </button>
              );
            })}
          </div>
          {activeFilters.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-3"
              onClick={() => setActiveFilters([])}
            >
              Clear Filters
            </Button>
          )}
        </Card>
      )}

      {/* Selected Report Detail */}
      {selectedReport && (
        <ReportDetail
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 glass-card rounded-lg p-3 hidden md:block">
        <h4 className="text-xs font-semibold text-muted-foreground mb-2">SEVERITY</h4>
        <div className="flex items-center gap-4">
          {(['low', 'medium', 'high', 'critical'] as const).map((level) => {
            const config = SEVERITY_CONFIG[level];
            return (
              <div key={level} className="flex items-center gap-1.5">
                <div className={cn("w-3 h-3 rounded-full", config.bgColor)} />
                <span className="text-xs text-muted-foreground">{config.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
