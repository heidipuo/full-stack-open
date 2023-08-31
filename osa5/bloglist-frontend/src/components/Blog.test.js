import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title:	'Testipostaus',
  author:	'Robert C. Martin',
  url:	'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  likes:	51,
  user: {
    username: 'Heidi'
  }
}

test('renders content', () => {

  render(<Blog blog={blog} />)

  const element = screen.getAllByText('Testipostaus', { exact: false })

})

test('url, likes and user are displayed when the view button is clicked', async () => {

  const  { container } = render(<Blog blog={blog} />)
  const blogInfoDiv = container.querySelector('.blogInfo')
  
  const user = userEvent.setup() 
  const button = screen.getByText('view')
  await user.click(button)
  
  expect(blogInfoDiv).not.toHaveStyle({display: 'none'})
  expect(blogInfoDiv).toHaveTextContent('http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll')
  expect(blogInfoDiv).toHaveTextContent('51')
  expect(blogInfoDiv).toHaveTextContent('Heidi')

})

