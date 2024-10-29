import request from "supertest";
import { server } from "../index";
import { query } from "../database";
import { HttpStatus } from "../src/utils/enums";
import {
  geofenceEmptyDimensionsPropertyMockup,
  geofenceEmptyMockup,
  geofenceInvalidDimensionsNumberOfElementsMockup,
  geofenceInvalidDimensionsTypeOfELementsMockup,
  geofenceInvalidDimensionsValuesMockup,
  geofenceInvalidEntityIdMockup,
  geofenceInvalidKeysMockup,
  geofenceInvalidValuesMockup,
  geofenceValidMockup,
} from "./geofence.mockups";

describe("API POST Geofence Tests", () => {
  afterAll(async () => {
    await query("DELETE FROM geofence");
    server.close();
  });

  it("JSON con Keys validas y valores validos devuelve codigo 201", async () => {
    const response = await request(server)
      .post("/geofence")
      .send(geofenceValidMockup);
    expect(response.status).toBe(HttpStatus.CREATED);
  });

  it("JSON con Keys invalidas devuelve codigo 400 (Bad Request)", async () => {
    const response = await request(server)
      .post("/geofence")
      .send(geofenceInvalidKeysMockup);
    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
  });

  it("JSON con Valores invalidos devuelve codigo 400 (Bad Request)", async () => {
    const response = await request(server)
      .post("/geofence")
      .send(geofenceInvalidValuesMockup);
    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
  });

  it("JSON vacio devuelve codigo 400 (Bad Request)", async () => {
    const response = await request(server)
      .post("/geofence")
      .send(geofenceEmptyMockup);
    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
  });

  it('JSON Valido con "entityId" no encontrado en Base de datos devuelve codigo 404 (Not Found)', async () => {
    const response = await request(server)
      .post("/geofence")
      .send(geofenceInvalidEntityIdMockup);
    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });

  it('JSON con valores de propiedad "dimensions" invalidos devuelve codigo 400 (Bad Request)', async () => {
    const response = await request(server)
      .post("/geofence")
      .send(geofenceInvalidDimensionsValuesMockup);
    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
  });

  it('JSON con propiedad "dimensions" vacia devuelve codigo 400 (Bad Request)', async () => {
    const response = await request(server)
      .post("/geofence")
      .send(geofenceEmptyDimensionsPropertyMockup);
    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
  });

  it('JSON con cantidad de elementos de propiedad "dimensions" invalida (menor a 4) devuelve codigo 400 (Bad Request)', async () => {
    const response = await request(server)
      .post("/geofence")
      .send(geofenceInvalidDimensionsNumberOfElementsMockup);
    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
  });

  it('JSON con tipo de elementos de propiedad "dimensions" invalido devuelve codigo 400 (Bad Request)', async () => {
    const response = await request(server)
      .post("/geofence")
      .send(geofenceInvalidDimensionsTypeOfELementsMockup);
    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
  });

  it('JSON con tipo de punto dentro de elementos de propiedad "dimensions" invalido devuelve codigo 400 (Bad Request)', async () => {
    const response = await request(server)
      .post("/geofence")
      .send(geofenceInvalidDimensionsTypeOfELementsMockup);
    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
  });
});
