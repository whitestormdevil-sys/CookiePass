import { Import } from '../db/models/Import';
import { Share } from '../db/models/Share';
import { CreateImportInput } from '../types';
import { shareService } from './shareService';
import { createError } from '../middleware/errorHandler';

export class ImportService {
  /**
   * Log an import attempt and increment the share's used count.
   */
  async logImport(shareId: string, input: CreateImportInput) {
    // Verify share exists and is importable
    const share = await Share.findOne({ id: shareId });
    if (!share) {
      throw createError('Share not found', 404);
    }

    if (share.is_revoked) {
      throw createError('This share has been revoked', 410);
    }

    if (new Date(share.expires_at) < new Date()) {
      throw createError('This share has expired', 410);
    }

    if (share.max_uses > 0 && share.used_count >= share.max_uses) {
      throw createError('This share has reached its usage limit', 410);
    }

    // Log the import
    const importRecord = await Import.create({
      share_id: shareId,
      ip_hash: input.ip_hash || null,
      user_agent: input.user_agent || null,
      country: input.country || null,
      success: input.success,
      error_message: input.error_message || null,
      recipient_user_id: input.recipient_user_id || null,
    });

    // Increment used count if import was successful
    if (input.success) {
      await shareService.incrementUsedCount(shareId);
    }

    return importRecord.toObject();
  }

  /**
   * Get import history for a share (owner only — auth checked in route).
   */
  async getImportHistory(
    shareId: string,
    limit: number = 50,
    offset: number = 0
  ) {
    const [imports, total] = await Promise.all([
      Import.find({ share_id: shareId })
        .sort({ imported_at: -1 })
        .skip(offset)
        .limit(limit)
        .lean(),
      Import.countDocuments({ share_id: shareId }),
    ]);

    // Transform to match expected API shape
    const transformed = imports.map((i) => ({
      ...i,
      id: (i as any)._id.toString(),
      recipient_user_id: i.recipient_user_id ? i.recipient_user_id.toString() : null,
    }));

    return {
      imports: transformed,
      total,
    };
  }
}

export const importService = new ImportService();
