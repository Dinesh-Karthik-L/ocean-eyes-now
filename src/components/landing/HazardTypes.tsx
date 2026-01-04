import { HAZARD_CONFIG, HazardType } from '@/types/hazard';
import { 
  TsunamiIcon, 
  StormIcon, 
  WavesIcon, 
  FloodIcon, 
  TidesIcon, 
  DamageIcon 
} from '@/components/icons/HazardIcons';
import { cn } from '@/lib/utils';

const hazardIcons: Record<HazardType, React.ComponentType<{ className?: string; size?: number }>> = {
  tsunami: TsunamiIcon,
  storm_surge: StormIcon,
  high_waves: WavesIcon,
  coastal_flooding: FloodIcon,
  abnormal_tides: TidesIcon,
  coastal_damage: DamageIcon,
};

const hazardDescriptions: Record<HazardType, string> = {
  tsunami: 'Large ocean waves caused by earthquakes or underwater landslides',
  storm_surge: 'Abnormal rise of water during storms pushing seawater onto land',
  high_waves: 'Unusually large waves that pose danger to coastal activities',
  coastal_flooding: 'Inundation of normally dry coastal land by seawater',
  abnormal_tides: 'Tides significantly higher or lower than predicted',
  coastal_damage: 'Damage to infrastructure, boats, or property from sea conditions',
};

export const HazardTypes = () => {
  const hazardTypes = Object.keys(HAZARD_CONFIG) as HazardType[];

  return (
    <section className="py-20 md:py-32 ocean-gradient-light">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Hazard Categories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Report Any{' '}
            <span className="text-primary">Coastal Hazard</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our platform supports reporting of all major ocean-related hazards. 
            Quick identification helps authorities respond faster.
          </p>
        </div>

        {/* Hazard Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {hazardTypes.map((type, index) => {
            const config = HAZARD_CONFIG[type];
            const Icon = hazardIcons[type];
            return (
              <div
                key={type}
                className="group relative bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
              >
                {/* Background Gradient on Hover */}
                <div className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity",
                  config.bgColor
                )} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                    config.bgColor
                  )}>
                    <Icon className="text-white" size={28} />
                  </div>

                  {/* Label */}
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {config.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {hazardDescriptions[type]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
