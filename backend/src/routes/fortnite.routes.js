import { Router } from 'express';
import { getFortniteStats, getFortniteCosmeticById, getConfigValue } from '../services/fortnite.service.js';

const router = Router();

// GET 📊 STATS
router.get('/stats/:username', async (req, res) => {
  try {
    const stats = await getFortniteStats(req.params.username);
    res.json(stats);
  } catch (err) {
    console.error('Fortnite API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch Fortnite stats' });
  }
});

// GET 🎭 COSMETIC
router.get('/cosmetic/:id', async (req, res) => {
  try {
    const data = await getFortniteCosmeticById(req.params.id);
    res.json(data);
  } catch (err) {
    console.error('Cosmetic error:', err.message);
    res.status(500).json({ error: 'Failed to fetch cosmetic' });
  }
});

// GET 🧩 PROFILE (COMBINED ENDPOINT)
router.get('/profile', async (req, res) => {
  try {
    const username = getConfigValue('fortnite.username');

    const [stats, cosmetic] = await Promise.all([
      getFortniteStats(username),
      getFortniteCosmeticById()
    ]);

    res.json({
      username,
      stats,
      cosmetic
    });

  } catch (err) {
    console.error('Profile error:', err.message);
    res.status(500).json({ error: 'Failed to fetch Fortnite profile' });
  }
});

export default router;