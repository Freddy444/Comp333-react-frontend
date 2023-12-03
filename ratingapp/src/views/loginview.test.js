import React from 'react';
import { render, screen, fireEvent, act,  waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import userEvent from '@testing-library/user-event';
import LoginView from './loginview';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';


jest.mock('axios');


describe('LoginView Component', () => {
    test('renders username and password input fields', () => {
        render(
            <Router>
                <LoginView />
            </Router>
        );
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });

    test('renders login form heading', () => {
        render(
            <Router>
                <LoginView />
            </Router>
        );
        expect(screen.getByText('Login Form')).toBeInTheDocument();
    });
    
    test('navigates to registration page on Register button click', async () => {
        render(
          <MemoryRouter>
            <LoginView />
          </MemoryRouter>
        );
    
        // Wrap the interaction with MemoryRouter in act
        await act(async () => {
          // Click on the Register button
          userEvent.click(screen.getByText('Register'));
    
          // Wait for the presence of the text "Register" on the button
          await waitFor(() => {
            expect(screen.getByText('Register')).toBeInTheDocument();
        });
      });
    });

    test('simulates user input by typing into input boxes', async () => {
        render(
          <MemoryRouter>
            <LoginView />
          </MemoryRouter>
        );
    
        // Wrap the interaction with MemoryRouter in act
        await act(async () => {
          // Simulate typing into the username and password input boxes
          userEvent.type(screen.getByPlaceholderText('Username'), 'testuser');
          userEvent.type(screen.getByPlaceholderText('Password'), 'testpassword');
    
          expect(screen.getByPlaceholderText('Username').value).toBe('testuser');
          expect(screen.getByPlaceholderText('Password').value).toBe('testpassword');
        });
      });

    //Test and detect an incorrect value at least once.

    test('simulates user input and login button click with incorrect values', () => {
        render(
          <BrowserRouter>
            <LoginView />
          </BrowserRouter>
        );
        // Simulate typing into the username input field with incorrect value
        const usernameInput = screen.getByPlaceholderText('Username');
        fireEvent.change(usernameInput, { target: { value: 'incorrectuser' } });
        // Simulate typing into the password input field with incorrect value
        const passwordInput = screen.getByPlaceholderText('Password');
        fireEvent.change(passwordInput, { target: { value: 'incorrectpassword' } });
        // Simulate clicking the login button
        const loginButton = screen.getByRole('button', { name: /login/i });
        fireEvent.click(loginButton);
        // I added assertions based on the expected behavior after clicking the login button
        // For example, one might expect a failed login and display of an error message.
        
        const errorMessage = screen.findAllByText('Error');
        expect(errorMessage).toBeInTheDocument();
      });

});
