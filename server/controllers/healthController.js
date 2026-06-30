/**
 * Returns server status, uptime, and timestamp.
 * Used to verify the backend is running and reachable from the client.
 */
export function getHealth(req, res) {
  res.status(200).json({
    success: true,
    message: 'ViceHub API is healthy.',
    data: {
      status: 'ok',
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    },
  });
}
