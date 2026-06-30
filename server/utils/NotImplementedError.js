/**
 * Thrown by stub config modules (db.js, cloudinary.js) when a feature
 * that belongs to a later development phase is invoked too early.
 * Carries a statusCode so it can flow straight into errorHandler.js
 * with a meaningful response instead of a generic 500 crash.
 */
class NotImplementedError extends Error {
  constructor(featureName, phase) {
    super(
      `${featureName} is not implemented yet. This module is a Phase ${phase} stub — see 07_DEVELOPMENT_PHASES.md.`
    );
    this.name = 'NotImplementedError';
    this.statusCode = 501;
  }
}

export default NotImplementedError;
