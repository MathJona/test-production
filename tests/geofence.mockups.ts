export const geofenceValidMockup = {
  name: "mi casa",
  dimensions: [
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 0],
    [0, 0],
  ],
  entityId: "69c56be6-920a-11ef-90d2-a05950704815",
};

export const geofenceInvalidKeysMockup = {
  invalidKey: "mi casa",
  dimensions: [
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 0],
    [0, 0],
  ],
  entityId: "69c56be6-920a-11ef-90d2-a05950704815",
};

export const geofenceInvalidValuesMockup = {
  name: "mi casa",
  dimensions: "invalid",
  entityId: "69c56be6-920a-11ef-90d2-a05950704815",
};

export const geofenceEmptyMockup = undefined;

export const geofenceInvalidEntityIdMockup = {
  name: "mi casa",
  dimensions: [0, 0],
  entityId: "11111111-1111-1111-1111-111111111111",
};

export const geofenceInvalidDimensionsValuesMockup = {
  //Da otro tipo de error, probablemente porque solo se analiza el primer error
  name: "mi casa",
  dimensions: [[1], [0, 1], [1, 1], [1, 0], [0, 0]],
  entityId: "69c56be6-920a-11ef-90d2-a05950704815",
};

export const geofenceEmptyDimensionsPropertyMockup = {
  name: "mi casa",
  dimensions: [],
  entityId: "69c56be6-920a-11ef-90d2-a05950704815",
};

export const geofenceInvalidDimensionsNumberOfElementsMockup = {
  name: "mi casa",
  dimensions: [
    [1, 0],
    [0, 0],
  ],
  entityId: "69c56be6-920a-11ef-90d2-a05950704815",
};

export const geofenceInvalidDimensionsTypeOfELementsMockup = {
  name: "mi casa",
  dimensions: ["[0, 0]", [0, 1], [1, 1], [1, 0], [0, 0]],
  entityId: "69c56be6-920a-11ef-90d2-a05950704815",
};

export const geofenceInvalidDimensionsPointsValuesMockup = {
  name: "mi casa",
  dimensions: [
    ["0", 0],
    [0, 1],
    [1, 1],
    [1, 0],
    [0, 0],
  ],
  entityId: "69c56be6-920a-11ef-90d2-a05950704815",
};
