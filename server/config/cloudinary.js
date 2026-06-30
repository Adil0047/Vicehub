import NotImplementedError from '../utils/NotImplementedError.js';

/**
 * STUB MODULE — Phase 4 deliverable.
 *
 * This will configure the Cloudinary SDK for avatar and image uploads
 * once Phase 4 (User Features) begins, per 07_DEVELOPMENT_PHASES.md.
 *
 * Real implementation will:
 *   - import { v2 as cloudinary } from 'cloudinary'
 *   - read CLOUDINARY_CLOUD_NAME / API_KEY / API_SECRET from config/env.js
 *   - call cloudinary.config({ ... })
 *   - export the configured cloudinary instance for use in upload middleware
 *
 * The export below is intentionally non-functional. Calling it throws
 * a clear, typed error rather than silently failing or faking a
 * successful upload — no route should import this until Phase 4 adds
 * the cloudinary dependency.
 */
export function getCloudinary() {
  throw new NotImplementedError('Cloudinary image storage', 4);
}

export default getCloudinary;
