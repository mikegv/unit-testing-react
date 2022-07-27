import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component',()=>{

  test('renders the heading', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i, {exact: false});
    expect(linkElement).toBeInTheDocument();
  });
  
  test('renders initial text before click and before fetch', () => {
    render(<App />);
    const textElement = screen.getByText('Original Text');
    const itemsElement = screen.getByText('No Items')
    expect(itemsElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  })

  test('renders button', () => {
    render(<App />);
    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toBeInTheDocument();
  })

  test('initial text does not render after button click', () => {
    render(<App />)
    const initialText = screen.getByText('Original Text')
    const button = screen.getByText('Click')
    fireEvent.click(button)
    expect(initialText).not.toBeInTheDocument();
  })

  test('changed text renders after button click', () => {
    render(<App />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    const changedText = screen.getByText(/Changed Text/i)
    expect(changedText).toBeInTheDocument();
  })

  test('renders items after fetch', async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => ([
        {id: 1, title: 'my title'},
        {id: 2, title: 'my title'},
        {id: 3, title: 'my title'},
        {id: 4, title: 'my title'},
        {id: 5, title: 'my title'},
        {id: 6, title: 'my title'},
        {id: 7, title: 'my title'},
        {id: 8, title: 'my title'},
        {id: 9, title: 'my title'},
        {id: 10, title: 'my title'},
        {id: 11, title: 'my title'}
      ])
    })
    render(<App />)
    const textElement = await screen.findByText(/fetched/i, {exact: false})
    const itemElements = await screen.findAllByRole('listitem')
    expect(textElement).toBeInTheDocument();
    expect(itemElements).not.toHaveLength(0);
  })

})
