import { Request, Response } from 'express';
import { query } from '../database';
import { getGPSMetricsByEntityIdQuery, postGpsMetricsQuery } from './queries';
import { checkModel } from './schemas';
import { GeofenceModel, GpsMetricsModel } from './models';
import { Exception } from './exceptions';
import { HttpStatus } from './utils/enums';

export async function postGpsMetricsByEntityId(
	request: Request,
	response: Response
): Promise<void> {
	try {
		const gpsMetrics = new GpsMetricsModel(request.body);
		checkModel(gpsMetrics);

		const gpsMetricsJson = JSON.stringify(gpsMetrics);

		const entityId = request.body.entityId;
		const latitude = request.body.latitude;
		const longitude = request.body.longitude;
		await query(postGpsMetricsQuery, [
			entityId,
			gpsMetricsJson,
			latitude,
			longitude,
		]);
		response.sendStatus(HttpStatus.CREATED);
	} catch (error: unknown) {
		if (error instanceof Exception) {
			response.status(error.errorCode).send(error.message);
		} else {
			console.log(error);
			response.sendStatus(HttpStatus.UNKNOWN_ERROR);
		}
	}
}

export async function postGeofenceByEntityId(
	request: Request,
	response: Response
): Promise<void> {
	try {
		const geofence = new GeofenceModel(request.body);
		checkModel(geofence);

		const name = request.body.name;
		const entityId = request.body.entityId;
		const notYetDimensions = request.body.dimensions.map(
			(point: [number, number]) => point.join(' ')
		);
		const dimensions = notYetDimensions.join(', ');

		const postGeofenceQuery = `INSERT
        INTO geofence
        (name, dimensions, entity_id)
        VALUES
        (?, ST_GeomFromText('POLYGON((${dimensions}))'), ?)`;

		await query(postGeofenceQuery, [name, entityId]);
		response.sendStatus(HttpStatus.CREATED);
	} catch (error: unknown) {
		if (error instanceof Exception) {
			response.status(error.errorCode).send(error.message);
		} else {
			response.sendStatus(HttpStatus.UNKNOWN_ERROR);
		}
	}
}

export async function getGpsMetricsByEntityId(
	request: Request,
	response: Response
): Promise<void> {
	try {
		if (!request.body.entityId) {
			throw new Exception(
				'Invalid Format',
				'EntityId is required',
				HttpStatus.BAD_REQUEST
			);
		}
		const entityId: string = request.body.entityId;

		const results = await query(getGPSMetricsByEntityIdQuery, [entityId]);

		if (Array.isArray(results)) {
			if (results.length === 0) {
				throw new Exception(
					'Sin Información',
					'Metricas de GPS no encontradas, ingresa un Entity ID válido',
					HttpStatus.NOT_FOUND
				);
			} else {
				response.status(HttpStatus.OK).send(results);
			}
		}
	} catch (error: unknown) {
		if (error instanceof Exception) {
			response.status(error.errorCode).send(error.message);
		} else {
			response.sendStatus(HttpStatus.UNKNOWN_ERROR);
		}
	}
}
