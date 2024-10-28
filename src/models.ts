import { Geofence, GpsMetrics } from './interfaces';

export class GpsMetricsModel {
	latitude: number;
	longitude: number;
	speed: number;
	battery: number;
	timestamp: string;
	entityId: string;
	mapUrl: string;

	constructor(gpsMetrics: GpsMetrics) {
		this.latitude = gpsMetrics.latitude;
		this.longitude = gpsMetrics.longitude;
		this.speed = gpsMetrics.speed;
		this.battery = gpsMetrics.battery;
		this.timestamp = gpsMetrics.timestamp;
		this.entityId = gpsMetrics.entityId;
		this.mapUrl = gpsMetrics.mapUrl;
	}
}

export class GeofenceModel {
	name: string;
	dimensions: Array<number>[];
	entityId: string;

	constructor(geofence: Geofence) {
		this.name = geofence.name;
		this.dimensions = geofence.dimensions;
		this.entityId = geofence.entityId;
	}
}
