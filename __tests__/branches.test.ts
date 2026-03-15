import request from 'supertest';
import app from '@/app';
import { BranchDTO } from '@/dto/BranchDTO';

describe('Branches API', () => {
  /**
   * GET: /api/branches
   * List all branches.
   */
  it('should return a list of branches', async () => {
    const res = await request(app).get('/api/branches');
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
    expect(res.body.total).toBeGreaterThan(0);
  });

  /**
   * GET: /api/branches/1
   * Get specific branch.
   */
  it('should return a single branch by ID', async () => {
    const res = await request(app).get('/api/branches/1');
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe('1');
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();

    const branch: BranchDTO = res.body.data;
    expect(branch.id).toBe('1');
    expect(branch.name).toBeDefined();
    expect(branch.city).toBeDefined();
    expect(branch.coordinates).toHaveProperty('lat');
    expect(branch.coordinates).toHaveProperty('lng');
  });

  /**
   * GET: /api/branches/asdasd
   * Branch not found.
   */
  it('should return 400 for invalid branch ID', async () => {
    const res = await request(app).get('/api/branches/asdasd');
    expect(res.status).toBe(404);
  });

  /**
   * GET: /api/branches?city=Skopje
   * Filter branches by city.
   */
  it('should return filtered branches by city', async () => {
    const res = await request(app).get('/api/branches?city=Skopje');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);

    expect(res.body.data.every((b: BranchDTO) => b.city === 'Skopje')).toBe(true);

    // Default paggination
    expect(res.body.page).toBe(1);
    expect(res.body.limit).toBe(10);
    expect(res.body.total).toBeGreaterThanOrEqual(res.body.data.length);
  });

  /**
   * GET: /api/branches?page=1&limit=2
   * Pagination test
   */
  it('should paginate results', async () => {
    const res = await request(app).get('/api/branches?page=1&limit=2');
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeLessThanOrEqual(2);
  });
});
