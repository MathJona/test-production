export const gpsMetricsValidMockup = {
  latitude: 1.000001,
  longitude: 1.000001,
  speed: 1.0,
  battery: 101,
  timestamp: "10-10-10 10:00:00",
  entityId: "69c56be6-920a-11ef-90d2-a05950704815",
  mapUrl: "https://maps.app.goo.gl/tJWtf3kbhfaUT7HH6",
};

export const gpsMetricsInvalidKeysMockup = {
  invalidKey: 1.000001,
  longitude: "1.000001",
  speed: "1.000",
  battery: "101",
  timestamp: "10-10-10 10:00:00",
  entityId: "69c56be6-920a-11ef-90d2-a05950704815",
  mapUrl: "https://maps.app.goo.gl/tJWtf3kbhfaUT7HH6",
};

export const gpsMetricsInvalidValuesMockup = {
  latitude: "1.000001",
  longitude: "1.000001",
  speed: "1.000",
  battery: "101",
  timestamp: "10-10-10 10:00:00",
  entityId: "69c56be6-920a-11ef-90d2-a05950704815",
  mapUrl: "https://maps.app.goo.gl/tJWtf3kbhfaUT7HH6",
};

export const gpsMetricsEmptyMockup = undefined;

export const gpsMetricsInvalidEntityIdMockup = {
  latitude: 1.000001,
  longitude: 1.000001,
  speed: 1.0,
  battery: 101,
  timestamp: "10-10-10 10:00:00",
  entityId: "00000000",
  mapUrl: "https://maps.app.goo.gl/tJWtf3kbhfaUT7HH6",
};
