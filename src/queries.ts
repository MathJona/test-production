export const postGpsMetricsQuery = `INSERT INTO gps_metrics
(entity_id, metrics, gps_point)
VALUES
(?, ?,ST_GeomFromText('POINT(? ?)'))`;

export const getGPSMetricsByEntityIdQuery = `
WITH gps_vs_geofence AS (
    SELECT
        gps_metrics.entity_id AS entity_id,
        DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS created_at,
        metrics,
        IF(ST_Within(gps_metrics.gps_point, geofence.dimensions), UPPER(name), "AFUERA") AS status
    FROM gps_metrics
    INNER JOIN geofence ON gps_metrics.entity_id = geofence.entity_id
    WHERE gps_metrics.entity_id = ?
)
SELECT
    entity_id,
    created_at AS latest_update,
    metrics,
    status
FROM gps_vs_geofence
WHERE created_at = (
    SELECT MAX(created_at) FROM gps_vs_geofence
	) 
ORDER BY
    CASE WHEN status <> 'AFUERA'
    THEN 1 ELSE 2
    END, created_at DESC
LIMIT 1;
`;
