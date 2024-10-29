export interface GpsMetrics {
  latitude: number;
  longitude: number;
  speed?: number;
  battery?: number;
  timestamp?: string;
  entityId: string;
  mapUrl?: string;
}

export interface Geofence {
  name: string;
  dimensions: Array<number>[];
  entityId: string;
}
