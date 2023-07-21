import { describe, expect, test } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { renderWithRouter } from './utils/testUtils'
import path from './constants/path'

describe('App', () => {
  test('App render và chuyển trang', async () => {
    const { user } = renderWithRouter()

    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee Clone')
    })

    await user.click(screen.getByText(/Đăng nhập/i))
    await waitFor(() => {
      expect(screen.queryByText('Bạn chưa có tài khoản?')).toBeInTheDocument()
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Shopee Clone')
    })
  })

  test('Về trang not found', async () => {
    const badRoute = '/some/bad/route'
    renderWithRouter({ route: badRoute })
    await waitFor(() => {
      expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument()
    })
  })

  test('Render trang register', async () => {
    renderWithRouter({ route: path.register })
    await waitFor(() => {
      expect(screen.getByText(/Bạn đã có tài khoản?/i)).toBeInTheDocument()
    })
  })
})
