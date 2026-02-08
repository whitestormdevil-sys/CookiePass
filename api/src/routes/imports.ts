import { Router } from 'express';
import { importService } from '../services/importService';
import { importLimiter } from '../middleware/rateLimit';
import { asyncHandler } from '../middleware/errorHandler';
import { logImportSchema } from '../utils/validators';
import crypto from 'crypto';

const router = Router();

/**
 * Hash an IP address for privacy-preserving logging.
 */
function hashIp(ip: string): string {
  return crypto.createHash('sha256').update(ip + (process.env.JWT_SECRET || '')).digest('hex');
}

/**
 * POST /shares/:id/import
 * Log an import attempt.
 */
router.post(
  '/:id/import',
  importLimiter,
  asyncHandler(async (req, res) => {
    const { success, user_agent, error_message } = logImportSchema.parse(req.body);

    const ipHash = req.ip ? hashIp(req.ip) : undefined;

    const shareId = req.params.id as string;

    const importRecord = await importService.logImport(shareId, {
      success,
      user_agent: user_agent || req.headers['user-agent'] || undefined,
      ip_hash: ipHash,
      error_message,
    });

    res.status(201).json({
      success: true,
      data: {
        id: importRecord.id,
        imported_at: importRecord.imported_at,
        success: importRecord.success,
      },
    });
  })
);

export default router;
