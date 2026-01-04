import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Camera, 
  Upload, 
  Send, 
  Loader2,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { HAZARD_CONFIG, HazardType } from '@/types/hazard';
import { cn } from '@/lib/utils';
import {
  TsunamiIcon,
  StormIcon,
  WavesIcon,
  FloodIcon,
  TidesIcon,
  DamageIcon,
} from '@/components/icons/HazardIcons';
import { toast } from '@/hooks/use-toast';

const hazardIcons: Record<HazardType, React.ComponentType<{ className?: string; size?: number }>> = {
  tsunami: TsunamiIcon,
  storm_surge: StormIcon,
  high_waves: WavesIcon,
  coastal_flooding: FloodIcon,
  abnormal_tides: TidesIcon,
  coastal_damage: DamageIcon,
};

export const ReportForm = () => {
  const [selectedHazard, setSelectedHazard] = useState<HazardType | null>(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState({ lat: '', lng: '' });
  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);

  const handleGetLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude.toFixed(6),
            lng: position.coords.longitude.toFixed(6),
          });
          setIsLocating(false);
          toast({
            title: "Location detected",
            description: "Your GPS coordinates have been captured.",
          });
        },
        (error) => {
          setIsLocating(false);
          toast({
            title: "Location error",
            description: "Unable to get your location. Please enter manually.",
            variant: "destructive",
          });
        }
      );
    } else {
      setIsLocating(false);
      toast({
        title: "Geolocation not supported",
        description: "Please enter your location manually.",
        variant: "destructive",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMediaFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHazard || !description) {
      toast({
        title: "Missing information",
        description: "Please select a hazard type and add a description.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);

    toast({
      title: "Report submitted!",
      description: "Thank you for helping keep our coasts safe.",
    });

    // Reset form
    setSelectedHazard(null);
    setDescription('');
    setLocation({ lat: '', lng: '' });
    setMediaFiles([]);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-6 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
            Report a Hazard
          </h1>
          <p className="text-muted-foreground">
            Help protect your community by reporting ocean hazards in real-time
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Hazard Type Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              What type of hazard are you reporting?
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {(Object.keys(HAZARD_CONFIG) as HazardType[]).map((type) => {
                const config = HAZARD_CONFIG[type];
                const Icon = hazardIcons[type];
                const isSelected = selectedHazard === type;

                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedHazard(type)}
                    className={cn(
                      "relative p-4 rounded-xl border-2 transition-all duration-200 text-left",
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center mb-2",
                      config.bgColor
                    )}>
                      <Icon className="text-white" size={20} />
                    </div>
                    <span className="font-medium text-foreground text-sm">
                      {config.label}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="absolute top-2 right-2 h-5 w-5 text-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <Label htmlFor="description" className="text-base font-semibold">
              Describe what you observed
            </Label>
            <Textarea
              id="description"
              placeholder="Describe the hazard in detail. Include information about severity, affected area, and any immediate dangers..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px] resize-none"
            />
          </div>

          {/* Location */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              Location
            </Label>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleGetLocation}
                disabled={isLocating}
                className="gap-2"
              >
                {isLocating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Navigation className="h-4 w-4" />
                )}
                {isLocating ? 'Detecting...' : 'Use My Location'}
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="lat" className="text-xs text-muted-foreground">
                  Latitude
                </Label>
                <Input
                  id="lat"
                  placeholder="13.0827"
                  value={location.lat}
                  onChange={(e) => setLocation({ ...location, lat: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="lng" className="text-xs text-muted-foreground">
                  Longitude
                </Label>
                <Input
                  id="lng"
                  placeholder="80.2707"
                  value={location.lng}
                  onChange={(e) => setLocation({ ...location, lng: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Media Upload */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              Add Photos or Videos (Optional)
            </Label>
            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                id="media"
                accept="image/*,video/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="media" className="cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <Camera className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, MP4 up to 10MB each
                  </p>
                </div>
              </label>
            </div>
            {mediaFiles.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {mediaFiles.map((file, i) => (
                  <Badge key={i} variant="secondary" className="gap-1">
                    <Upload className="h-3 w-3" />
                    {file.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Submit Report
              </>
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};
