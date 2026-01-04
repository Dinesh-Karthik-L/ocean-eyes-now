import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Twitter, Clock, MapPin, ArrowRight, AlertTriangle, Info, Minus } from 'lucide-react';
import { mockSocialPosts } from '@/data/mockData';
import { cn } from '@/lib/utils';

const sentimentConfig = {
  panic: { 
    label: 'Panic', 
    color: 'bg-destructive text-destructive-foreground',
    icon: AlertTriangle 
  },
  neutral: { 
    label: 'Neutral', 
    color: 'bg-muted text-muted-foreground',
    icon: Minus 
  },
  informative: { 
    label: 'Informative', 
    color: 'bg-success text-success-foreground',
    icon: Info 
  },
};

const timeAgo = (date: Date) => {
  const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

export const SocialFeed = () => {
  const hazardPosts = mockSocialPosts.filter(p => p.isHazardRelated).slice(0, 4);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Twitter className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Social Intelligence</h3>
        </div>
        <Button variant="ghost" size="sm" className="gap-1">
          View All
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {hazardPosts.map((post) => {
          const sentiment = sentimentConfig[post.sentiment];
          const SentimentIcon = sentiment.icon;

          return (
            <div
              key={post.id}
              className="p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Twitter className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium text-sm text-foreground">
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {timeAgo(post.timestamp)}
                    </span>
                  </div>
                </div>
                <Badge className={cn("text-xs", sentiment.color)}>
                  <SentimentIcon className="h-3 w-3 mr-1" />
                  {sentiment.label}
                </Badge>
              </div>

              {/* Content */}
              <p className="text-sm text-foreground mb-3 leading-relaxed">
                {post.content}
              </p>

              {/* Keywords & Location */}
              <div className="flex flex-wrap items-center gap-2">
                {post.keywords.slice(0, 3).map((keyword, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    #{keyword.replace(/\s+/g, '')}
                  </Badge>
                ))}
                {post.location && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                    <MapPin className="h-3 w-3" />
                    {post.location.lat.toFixed(2)}, {post.location.lng.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
