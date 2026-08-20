/// Fix: Import React to use React.FC type.
import React from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  category?: 'fullstack' | 'backend' | 'frontend';
  badge?: string;
  liveUrl?: string;
  codeUrl?: string;
}

export interface Skill {
  name: string;
  icon: React.FC<{ className?: string }>;
  className?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  iconName?: string;
}