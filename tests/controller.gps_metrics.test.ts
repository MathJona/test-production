import request from 'supertest';
import { server } from '../index';
import {
	gpsMetricsValidMockup,
	gpsMetricsInvalidKeysMockup,
	gpsMetricsInvalidValuesMockup,
	gpsMetricsEmptyMockup,
	gpsMetricsInvalidEntityIdMockup,
} from './gpsMetrics.mockups';
import { query } from '../database';
import { HttpStatus } from '../src/utils/enums';

// POST /gps/metrics
describe('API POST GPS Metrics Tests', () => {
	afterAll(async () => {
		await query('DELETE FROM gps_metrics');
		server.close();
	});

	it('JSON con Keys validas y valores validos devuelve codigo 201', async () => {
		const response = await request(server)
			.post('/gps/metrics')
			.send(gpsMetricsValidMockup);
		expect(response.status).toBe(HttpStatus.CREATED);
	});

	it('JSON con Keys invalidas devuelve codigo 400 (Bad Request)', async () => {
		const response = await request(server)
			.post('/gps/metrics')
			.send(gpsMetricsInvalidKeysMockup);
		expect(response.status).toBe(HttpStatus.BAD_REQUEST);
	});

	it('JSON con Valores invalidos devuelve codigo 400 (Bad Request)', async () => {
		const response = await request(server)
			.post('/gps/metrics')
			.send(gpsMetricsInvalidValuesMockup);
		expect(response.status).toBe(HttpStatus.BAD_REQUEST);
	});

	it('JSON vacio devuelve codigo 400 (Bad Request)', async () => {
		const response = await request(server)
			.post('/gps/metrics')
			.send(gpsMetricsEmptyMockup);
		expect(response.status).toBe(HttpStatus.BAD_REQUEST);
	});

	it('JSON Valido con "entityId" no encontrado en Base de datos devuelve codigo 404 (Not Found)', async () => {
		const response = await request(server)
			.post('/gps/metrics')
			.send(gpsMetricsInvalidEntityIdMockup);
		expect(response.status).toBe(HttpStatus.NOT_FOUND);
	});
});
