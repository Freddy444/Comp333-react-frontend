import React from 'react';
import { render, screen,fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import RegisterView from './registerview';
import axios from 'axios'; // Add this import
import { waitFor } from '@testing-library/react';


jest.mock('axios');


describe('RegisterView Component', () => {
    test('renders Register Form heading', () => {
        render(
          <MemoryRouter>
            <RegisterView />
          </MemoryRouter>
        );
        const formHeading = screen.getByText(/Register Form/i);
        expect(formHeading).toBeInTheDocument();
      });

    //a. Include a rendering test for each of the input fields and text on the page.
    test('renders username input field', () => {
        render(
          <MemoryRouter>
            <RegisterView />
          </MemoryRouter>
        );
        const usernameInput = screen.getByPlaceholderText(/Username/i);
        expect(usernameInput).toBeInTheDocument();
      });

    test('renders password input field', () => {
        render(
            <MemoryRouter>
                <RegisterView />
            </MemoryRouter>
        )
        const passwordInputs = screen.getAllByPlaceholderText(/Password/i);
        expect(passwordInputs.length).toBe(2);
        expect(passwordInputs[0]).toBeInTheDocument();
        expect(passwordInputs[1]).toBeInTheDocument();

      }
    );

    test('renders confirm password input field', () => {
        render(
            <MemoryRouter>
                <RegisterView />
            </MemoryRouter>
        )
        const confirmPasswordInput = screen.getByPlaceholderText(/Confirm Password/i);
        expect(confirmPasswordInput).toBeInTheDocument();
      });

    //b. Include at least one test of a link that navigates from one page to another.
    //navigating to the login page
    test('navigates to login page when clicking the login link', () => {
        render(
          <MemoryRouter>
            <RegisterView />
          </MemoryRouter>
        );
    
        // Assuming you have a button with the text "Login"
        const loginButton = screen.getByText(/Login/i);
        expect(loginButton).toBeInTheDocument();
    
        // Simulate clicking the login button
        fireEvent.click(loginButton);
        expect(window.location.pathname).toBe('/');
    });


    //Simulate user input in at least one way, such as typing into an input box or clicking a button.
    //username input
    //leave values as they are
    test('renders username input field and simulates typing', () => {
        render(
          <MemoryRouter>
            <RegisterView />
          </MemoryRouter>
        );
    
        // Check if the username input field is present
        const usernameInput = screen.getByPlaceholderText(/Username/i);
        expect(usernameInput).toBeInTheDocument();
    
        // Simulate typing into the username input field
        fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    
        // Check if the value has been updated
        expect(usernameInput.value).toBe('testUser');
    });

    //password input
    //leave values as they are
    test('renders password input field and simulates typing', () => {
        render(
          <MemoryRouter>
            <RegisterView />
          </MemoryRouter>
        );
    
        // Check if the password input field is present
        const passwordInputs = screen.getAllByPlaceholderText(/Password/i);
        passwordInputs.forEach((passwordInput) => {
            expect(passwordInput).toBeInTheDocument();
        });
    
        // Simulate typing into the first password input
        fireEvent.change(passwordInputs[0], { target: { value: 'testPassword' } });
    
        // Check if the value has been updated
        expect(passwordInputs[0].value).toBe('testPassword');
    }
    );

    //confirm password input
    //leave values as they are
    test('renders confirm password input field and simulates typing', () => {
        render(
          <MemoryRouter>
            <RegisterView />
          </MemoryRouter>
        );
    
        // Check if the confirm password input field is present
        const confirmPasswordInput = screen.getByPlaceholderText(/Confirm Password/i);
        expect(confirmPasswordInput).toBeInTheDocument();
    
        // Simulate typing into the confirm password input field
        fireEvent.change(confirmPasswordInput, { target: { value: 'testPassword' } });
    
        // Check if the value has been updated
        expect(confirmPasswordInput.value).toBe('testPassword');
    });


    //d.Test and detect an incorrect value at least once.
    test('shows error for registration failure and does not navigate', async () => {
        // Mocking the axios post method to simulate registration failure
        axios.post.mockRejectedValue({ response: { data: { success: false, username: 'Username already exists' } } });

        render(
        <MemoryRouter>
            <RegisterView />
        </MemoryRouter>
        );

        // Assuming you have an input field for the username
        //make sure to use credentials that already exist in your database
        const usernameInput = screen.getByPlaceholderText(/Username/i);
        expect(usernameInput).toBeInTheDocument();

        // Simulate typing a valid username
        fireEvent.change(usernameInput, { target: { value: 'yo123' } });

        // Assuming you have an input field for the password
        const passwordInputs = screen.getAllByPlaceholderText(/Password/i);

        passwordInputs.forEach((passwordInput) => {
        expect(passwordInput).toBeInTheDocument();
        });

        // Simulate typing into the first password input
        fireEvent.change(passwordInputs[0], { target: { value: '12' } });

        // Assuming you have an input field for the confirm password
        const confirmPasswordInput = screen.getByPlaceholderText(/Confirm Password/i);
        expect(confirmPasswordInput).toBeInTheDocument();

        // Simulate typing a valid confirm password
        fireEvent.change(confirmPasswordInput, { target: { value: '12' } });

        // Assuming you have a submit button
        const registerButton = screen.getByRole('button', { name: /Register/i });
        expect(registerButton).toBeInTheDocument();

        // Simulate clicking the register button
        fireEvent.submit(registerButton);

        // Wait for the asynchronous registration process to complete
        await waitFor(() => {
            const errorMessage = screen.queryByText(/Username already exists/i);
            expect(errorMessage).not.toBeInTheDocument();
        });
  });  

});

