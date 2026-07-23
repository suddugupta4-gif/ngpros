import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ControlPanelProps {
  kills: string;
  position: string;
  points: string;
  onKillsChange: (value: string) => void;
  onPositionChange: (value: string) => void;
  onPointsChange: (value: string) => void;
  onDownload: () => void;
}

export function ControlPanel({
  kills,
  position,
  points,
  onKillsChange,
  onPositionChange,
  onPointsChange,
  onDownload,
}: ControlPanelProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    await onDownload();
    setTimeout(() => setIsDownloading(false), 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="w-full max-w-md space-y-8 p-8"
    >
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary uppercase">
          Match Report
        </h1>
        <p className="text-sm text-muted-foreground font-mono">
          Generate export-ready match cards
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="kills" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Kills
          </Label>
          <Input
            id="kills"
            type="text"
            value={kills}
            onChange={(e) => onKillsChange(e.target.value)}
            placeholder="0"
            className="h-14 text-2xl font-bold font-mono bg-card border-2 border-input focus:border-primary transition-colors"
            data-testid="input-kills"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="position" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Position
          </Label>
          <Input
            id="position"
            type="text"
            value={position}
            onChange={(e) => onPositionChange(e.target.value)}
            placeholder="1"
            className="h-14 text-2xl font-bold font-mono bg-card border-2 border-input focus:border-primary transition-colors"
            data-testid="input-position"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="points" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Total Points
          </Label>
          <Input
            id="points"
            type="text"
            value={points}
            onChange={(e) => onPointsChange(e.target.value)}
            placeholder="0"
            className="h-14 text-2xl font-bold font-mono bg-card border-2 border-input focus:border-primary transition-colors"
            data-testid="input-points"
          />
        </div>
      </div>

      <Button
        onClick={handleDownload}
        disabled={isDownloading}
        className="w-full h-16 text-lg font-bold uppercase tracking-wider bg-gradient-to-b from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg transition-all"
        data-testid="button-download"
      >
        <Download className="mr-3 h-5 w-5" />
        {isDownloading ? 'Exporting...' : 'Download PNG'}
      </Button>

      <div className="pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-xs font-mono">
          <div className="space-y-1">
            <div className="text-muted-foreground uppercase tracking-wider">Resolution</div>
            <div className="text-foreground font-bold">1536 × 2752</div>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground uppercase tracking-wider">Format</div>
            <div className="text-foreground font-bold">PNG</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
