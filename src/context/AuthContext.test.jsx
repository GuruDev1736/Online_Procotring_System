import { describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('logs in admin user and sets redirect path', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      const res = await result.current.login('admin@proctorai.com', 'admin123');
      expect(res.success).toBe(true);
      expect(res.redirectPath).toBe('/admin/dashboard');
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isAdmin).toBe(true);
    expect(localStorage.getItem('user')).toBeTruthy();
  });

  it('fails login with invalid credentials', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await expect(
      act(async () => {
        await result.current.login('wrong@example.com', 'nope');
      })
    ).rejects;

    expect(result.current.isAuthenticated).toBe(false);
  });

  it('logout clears user', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login('admin@proctorai.com', 'admin123');
    });

    act(() => {
      result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(localStorage.getItem('user')).toBeNull();
  });
});
