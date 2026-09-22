import React from 'react';
import {
  Award,
  Bell,
  BookOpen,
  Briefcase,
  Building2,
  CheckCircle2,
  CheckSquare,
  Coins,
  Compass,
  Factory,
  FileText,
  GitMerge,
  HelpCircle,
  Home,
  Layers,
  LayoutGrid,
  MapPin,
  Microscope,
  PhoneCall,
  PieChart,
  Rocket,
  Scale,
  ShieldCheck,
  Store,
  TrendingUp,
  UserCheck,
  Users,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Award,
  Bell,
  BookOpen,
  Briefcase,
  Building2,
  CheckCircle2,
  CheckSquare,
  Coins,
  Compass,
  Factory,
  FileText,
  GitMerge,
  HelpCircle,
  Home,
  Layers,
  LayoutGrid,
  MapPin,
  Microscope,
  PhoneCall,
  PieChart,
  Rocket,
  Scale,
  ShieldCheck,
  Store,
  TrendingUp,
  UserCheck,
  Users,
};

interface DynamicIconProps {
  name?: string;
  className?: string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className = 'w-5 h-5' }) => {
  if (!name || !iconMap[name]) {
    return <Briefcase className={className} />;
  }
  const IconComponent = iconMap[name];
  return <IconComponent className={className} />;
};
