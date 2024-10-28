import { Router } from 'express';
import {
	getGpsMetricsByEntityId,
	postGeofenceByEntityId,
	postGpsMetricsByEntityId,
} from './controllers';

const router = Router();

router.post('/gps/metrics', postGpsMetricsByEntityId);
router.post('/geofence', postGeofenceByEntityId);
router.post('/get/gps/metrics', getGpsMetricsByEntityId);

export default router;
