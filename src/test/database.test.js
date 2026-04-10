import { describe, it, expect } from 'vitest';
import database from '../utils/database.js';

describe('Database', () => {
  it('should execute a simple SELECT query', () => {
    const result = database.executeQuery('SELECT * FROM estudiantes');
    expect(result.success).toBe(true);
    expect(result.data.length).toBeGreaterThan(0);
  });

  it('should execute a COUNT query', () => {
    const result = database.executeQuery('SELECT COUNT(*) AS total FROM estudiantes');
    expect(result.success).toBe(true);
    expect(result.data[0].total).toBeGreaterThan(0);
  });

  it('should handle WHERE clause', () => {
    const result = database.executeQuery('SELECT * FROM estudiantes WHERE edad > 20');
    expect(result.success).toBe(true);
    result.data.forEach(est => {
      expect(est.edad).toBeGreaterThan(20);
    });
  });

  it('should return error for invalid SQL', () => {
    const result = database.executeQuery('SELECT * FROM nonexistent_table');
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
