import { Router } from 'express';
import { shareService } from '../services/shareService';
import { importService } from '../services/importService';
import { requireAuth } from '../middleware/auth';
import { createShareLimiter, getShareLimiter } from '../middleware/rateLimit';
import { asyncHandler, createError } from '../middleware/errorHandler';
import { createShareSchema, listSharesSchema } from '../utils/validators';

const router = Router();

/**
 * POST /shares
 * Create a new share (auth required).
 */
router.post(
  '/',
  requireAuth,
  createShareLimiter,
  asyncHandler(async (req, res) => {
    const input = createShareSchema.parse(req.body);
    const share = await shareService.createShare(req.userId!, input);

    res.status(201).json({
      success: true,
      data: {
        id: share.id,
        domain: share.domain,
        expires_at: share.expires_at,
        max_uses: share.max_uses,
        created_at: share.created_at,
        share_url: `${process.env.SHARE_BASE_URL || '/s'}/${share.id}`,
      },
    });
  })
);

/**
 * GET /shares
 * List current user's shares (auth required).
 */
router.get(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const { status, limit, offset } = listSharesSchema.parse(req.query);
    const result = await shareService.listShares(req.userId!, status, limit, offset);

    res.json({
      success: true,
      data: result.shares,
      total: result.total,
      limit,
      offset,
    });
  })
);

/**
 * GET /shares/:id
 * Get a share for importing (NO auth required).
 */
router.get(
  '/:id',
  getShareLimiter,
  asyncHandler(async (req, res) => {
    const shareId = req.params.id as string;
    const share = await shareService.getShareForImport(shareId);

    res.json({
      success: true,
      data: share,
    });
  })
);

/**
 * DELETE /shares/:id
 * Revoke a share (auth required, owner only).
 */
router.delete(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res) => {
    const shareId = req.params.id as string;
    const share = await shareService.revokeShare(shareId, req.userId!);

    res.json({
      success: true,
      data: {
        id: share.id,
        is_revoked: share.is_revoked,
        revoked_at: share.revoked_at,
      },
      message: 'Share revoked successfully',
    });
  })
);

/**
 * GET /shares/:id/imports
 * Get import history for a share (auth required, owner only).
 */
router.get(
  '/:id/imports',
  requireAuth,
  asyncHandler(async (req, res) => {
    const shareId = req.params.id as string;

    // Check ownership via shareService
    const ownerId = await shareService.getShareOwner(shareId);

    if (!ownerId) {
      throw createError('Share not found', 404);
    }

    if (ownerId !== req.userId) {
      throw createError('Not authorized to view import history for this share', 403);
    }

    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;

    const result = await importService.getImportHistory(shareId, limit, offset);

    res.json({
      success: true,
      data: result.imports,
      total: result.total,
      limit,
      offset,
    });
  })
);

export default router;
