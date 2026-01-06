import { useState, useMemo, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Circle, InfoWindow } from '@react-google-maps/api';
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

const GOOGLE_MAPS_API_KEY = 'AIzaSyCRZP6UzA8n9o8_U6Qgpmu_gOUXNPCBm3M';

const hazardIcons: Record<HazardType, React.ComponentType<{ className?: string; size?: number }>> = {
  tsunami: TsunamiIcon,
  storm_surge: StormIcon,
  high_waves: WavesIcon,
  coastal_flooding: FloodIcon,
  abnormal_tides: TidesIcon,
  coastal_damage: DamageIcon,
};

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: 13.0827,
  lng: 80.2707,
};

const mapOptions: google.maps.MapOptions = {
  zoom: 11,
  mapTypeId: 'roadmap',
  zoomControl: true,
  fullscreenControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  styles: [
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#193341' }],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [{ color: '#2c5a71' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#29768a' }, { lightness: -37 }],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{ color: '#406d80' }],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#406d80' }],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [{ visibility: 'on' }, { color: '#3e606f' }, { weight: 2 }, { gamma: 0.84 }],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [{ color: '#ffffff' }],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [{ weight: 0.6 }, { color: '#1a3541' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#2c5a71' }],
    },
  ],
};

// Severity colors for markers and circles
const severityColors: Record<string, string> = {
  low: '#22c55e',
  medium: '#f59e0b',
  high: '#ef4444',
  critical: '#dc2626',
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

// Create SVG marker icon as data URL
const createMarkerIcon = (hazardType: HazardType, severity: string): string => {
  const config = HAZARD_CONFIG[hazardType];
  const bgColor = severityColors[severity] || severityColors.medium;
  
  // SVG marker with hazard icon embedded
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
      <circle cx="18" cy="18" r="16" fill="${bgColor}" stroke="white" stroke-width="2"/>
    </svg>
  `;
  
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const HazardMap = () => {
  const [selectedReport, setSelectedReport] = useState<HazardReport | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showHotspots, setShowHotspots] = useState(true);
  const [activeFilters, setActiveFilters] = useState<HazardType[]>([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

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

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)] bg-secondary">
        <p className="text-destructive">Error loading Google Maps</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)] bg-secondary">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-secondary rounded-lg overflow-hidden">
      {/* Google Map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={11}
        options={mapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={() => setSelectedReport(null)}
      >
        {/* Hotspot Circles */}
        {showHotspots && mockHotspots.map((hotspot) => (
          <Circle
            key={hotspot.id}
            center={{ lat: hotspot.latitude, lng: hotspot.longitude }}
            radius={hotspot.radius}
            options={{
              fillColor: severityColors[hotspot.severity],
              fillOpacity: 0.25,
              strokeColor: severityColors[hotspot.severity],
              strokeOpacity: 0.6,
              strokeWeight: 2,
            }}
          />
        ))}

        {/* Hazard Markers */}
        {filteredReports.map((report) => (
          <Marker
            key={report.id}
            position={{ lat: report.latitude, lng: report.longitude }}
            onClick={() => setSelectedReport(report)}
            icon={{
              url: createMarkerIcon(report.hazardType, report.severity),
              scaledSize: new google.maps.Size(36, 36),
              anchor: new google.maps.Point(18, 18),
            }}
            animation={report.severity === 'critical' ? google.maps.Animation.BOUNCE : undefined}
            zIndex={report.severity === 'critical' ? 1000 : 1}
          />
        ))}
      </GoogleMap>

      {/* Location Label Overlay */}
      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm font-medium text-foreground border border-border z-10">
        Chennai Coast, India
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <Button
          variant="glass"
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
          className={cn(showFilters && "ring-2 ring-primary")}
        >
          <Filter className="h-4 w-4" />
        </Button>
        <Button 
          variant="glass" 
          size="icon"
          onClick={() => setShowHotspots(!showHotspots)}
          className={cn(showHotspots && "ring-2 ring-primary")}
        >
          <Layers className="h-4 w-4" />
        </Button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <Card className="absolute top-4 right-16 w-64 p-4 animate-scale-in z-20">
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
      <div className="absolute bottom-4 left-4 glass-card rounded-lg p-3 hidden md:block z-10">
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
