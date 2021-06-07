import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import Footer from './Components/Footer';
import Landing from './Components/Landing';
import Order from './Components/Order';
import NavBar from './Components/NavBar';

test('renders Title', () => {
  render(
  <BrowserRouter>
    <Landing />
  </BrowserRouter>);
  const linkElement = screen.getByText("Dogs App");
  expect(linkElement).toBeInTheDocument();
});

test('renders Nav element', () => {
  render(
  <BrowserRouter>
    <NavBar />
  </BrowserRouter>);
  const linkElement = screen.getByText("Create a Dog");
  expect(linkElement).toBeInTheDocument();
});

test('renders design by ', () => {
  render(<Footer />);
  const linkElement = screen.getByText("Design By Javier Rossi");
  expect(linkElement).toBeInTheDocument();
});

// test('renders ', () => {
//   render(<SearchBar />);
//   const linkElement = screen.getByText("Filter");
//   expect(linkElement).toBeInTheDocument();
// });

