import { server } from "../index";
import { gpsMetricsValidMockup } from "./gpsMetrics.mockups";
import { query } from "../database";
import { checkModel } from "../src/schemas";
import { GpsMetricsModel } from "../src/models";
import { Exception } from "../src/exceptions";

describe("Schema Functions Tests", () => {
  afterAll(async () => {
    await query("DELETE FROM gps_metrics");
    server.close();
  });

  it("Funcion checkModel verifica que JSON tenga valores validos", async () => {
    const gpsMetrics = new GpsMetricsModel(gpsMetricsValidMockup);
    const isGpsMetricsValid = checkModel(gpsMetrics);
    expect(isGpsMetricsValid).toBe(true);
  });

  it("Funcion checkModel verifica que objeto este definido", async () => {
    const gpsMetrics = gpsMetricsValidMockup;
    const isGpsMetricsValid = checkModel(gpsMetrics);
    expect(isGpsMetricsValid instanceof Exception).toBe(true);
  });
});
