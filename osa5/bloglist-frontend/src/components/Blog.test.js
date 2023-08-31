import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title:	'Postaus 3',
    author:	'Robert C. Martin',
    url:	'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes:	51,
    user: {
      username: 'Heidi'
    }
  }

  render(<Blog blog={blog} />)

  const element = screen.getAllByText('Postaus 3', { exact: false })
  expect(element).toBeDefined()
})