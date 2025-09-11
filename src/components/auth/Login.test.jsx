import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import { AuthProvider } from '../../context/AuthContext';

// Mock ThreeBackground to avoid WebGL
vi.mock('../common/ThreeBackground', () => ({
  default: () => <div data-testid="three-bg" />,
}));

const renderWithProviders = (ui, { route = '/' } = {}) => {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/" element={ui} />
          <Route path="/admin/dashboard" element={<div>Admin Dashboard</div>} />
          <Route path="/user/dashboard" element={<div>User Dashboard</div>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );
};

describe('Login', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows validation errors for empty fields', async () => {
    renderWithProviders(<Login />);

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Password is required/i)).toBeInTheDocument();
  });

  it('logs in with admin credentials and redirects', async () => {
    renderWithProviders(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: 'admin@proctorai.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: 'admin123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();
    });
  });

  it('shows error on invalid credentials', async () => {
    renderWithProviders(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: 'badpass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText(/Invalid credentials/i)).toBeInTheDocument();
  });
});
