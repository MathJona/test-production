import Ajv from "ajv";
import { ErrorObject } from "ajv";
import { GeofenceModel, GpsMetricsModel } from "./models";
import { Exception } from "./exceptions";
import { HttpStatus } from "./utils/enums";

const ajv = new Ajv(); //Validating JSON data

const gpsMetricsSchema = {
  type: "object",
  properties: {
    latitude: { type: "number" },
    longitude: { type: "number" },
    speed: { type: "number" },
    battery: { type: "number" },
    timestamp: { type: "string" },
    entityId: { type: "string" },
    mapUrl: { type: "string" },
  },
  required: ["latitude", "longitude", "entityId"],
  additionalProperties: true,
};

const geofenceSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    dimensions: {
      type: "array",
      minItems: 4,
      items: {
        type: "array",
        items: [{ type: "number" }, { type: "number" }],
        minItems: 2,
        maxItems: 2,
      },
    },
    entityId: { type: "string" },
  },
  required: ["name", "dimensions", "entityId"],
  additionalProperties: false,
};

export function checkModel(
  json: GpsMetricsModel | GeofenceModel,
): Exception | undefined {
  // JSON Model Validation
  if (json instanceof GpsMetricsModel) {
    if (ajv.validate(gpsMetricsSchema, json)) {
      return;
    } else {
      if (ajv.errors) {
        throw invalidJson(ajv.errors);
      } else {
        throw new Exception(`Error`, `Algo salió mal, intentalo de nuevo.`);
      }
    }
  } else if (json instanceof GeofenceModel) {
    if (ajv.validate(geofenceSchema, json)) {
      return;
    } else {
      if (ajv.errors) {
        throw invalidJson(ajv.errors);
      } else {
        throw new Exception(`Error`, `Algo salió mal, intentalo de nuevo.`);
      }
    }
  } else {
    throw new Exception(
      `Modelo no Encontrado`,
      `Modelo no encontrado, verifica su correcta asignación.`,
      HttpStatus.NOT_FOUND,
    );
  }
}

export function invalidJson(errors: ErrorObject[]): Exception {
  // Detecta el primer error de validación
  if (errors && errors[0]) {
    switch (errors[0].keyword) {
      case "required": {
        const missingProperty = (
          errors[0].params as { missingProperty: string }
        ).missingProperty;
        throw new Exception(
          `Propiedad no Encontrada`,
          `JSON invalido, propiedad "${missingProperty}" no encontrada.`,
          HttpStatus.BAD_REQUEST,
        );
      }
      case "type": {
        const type = (errors[0].params as { type: string }).type;
        throw new Exception(
          `Valor Incorrecto`,
          `JSON invalido, propiedad "${errors[0].dataPath}/" contiene valor incorrecto, debe ser de tipo "${type}".`,
          HttpStatus.BAD_REQUEST,
        );
      }
      case "minItems": {
        throw new Exception(
          `Minimo de Puntos de Geocerca`,
          `Coloca un cantidad mayor a 4 puntos para poder crear una Geocerca.`,
          HttpStatus.BAD_REQUEST,
        );
      }
      default:
        throw new Exception(
          `Exception`,
          `Algo salió mal, intentalo de nuevo. Exception: ${errors[0].keyword}`,
        );
    }
  } else {
    throw new Exception(`Error`, `Algo salió mal, intentalo de nuevo.`);
  }
}
