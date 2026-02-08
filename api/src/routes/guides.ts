import { Router } from 'express';
import { RevocationGuide } from '../db/models/RevocationGuide';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

/**
 * GET /guides/:domain
 * Get revocation guide for a domain.
 */
router.get(
  '/:domain',
  asyncHandler(async (req, res) => {
    const domain = (req.params.domain as string).toLowerCase().replace(/^www\./, '');

    // Try exact match first, then suffix match
    let guide = await RevocationGuide.findOne({
      is_active: true,
      domain_pattern: domain,
    }).lean();

    // If no exact match, try finding one where domain ends with the pattern
    if (!guide) {
      const allGuides = await RevocationGuide.find({ is_active: true })
        .select('domain_pattern service_name instructions settings_url last_verified_at')
        .lean();

      guide = allGuides.find((g) => domain.endsWith(g.domain_pattern)) || null;
    }

    if (!guide) {
      // Return generic guide if no specific one found
      res.json({
        success: true,
        data: {
          domain_pattern: domain,
          service_name: domain,
          instructions: [
            'Go to your account security settings',
            'Look for "Active Sessions" or "Signed-in Devices"',
            'Sign out all other sessions',
            'Change your password to invalidate all cookies',
          ],
          settings_url: null,
          is_generic: true,
        },
      });
      return;
    }

    res.json({
      success: true,
      data: {
        domain_pattern: guide.domain_pattern,
        service_name: guide.service_name,
        instructions: guide.instructions,
        settings_url: guide.settings_url,
        last_verified_at: guide.last_verified_at,
        is_generic: false,
      },
    });
  })
);

export default router;
