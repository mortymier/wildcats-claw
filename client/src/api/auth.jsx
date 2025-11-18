// POST: Login user
export const loginUser = async(role, email, password) =>
{
    try
    {
        const response = await fetch
        (
            `http://localhost:8080/api/${role}/login`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify
                ({
                    email: email,
                    password: password
                })
            }
        );

        if(response.ok && role === 'student')
        {
            alert('Student login successful!');
        }
        else if(response.ok && role === 'staff')
        {
            alert('Staff login successful!');
        }
        else if(response.status === 401)
        {
            throw new Error('Invalid role, email, or password');
        }
        else
        {
            throw new Error('Login failed');
        }
    }
    catch(error)
    {
        alert(error.message);
    }
};

// POST: Register user
export const registerUser = async(role, formData) =>
{
    try
    {
        const response = await fetch
        (
            `http://localhost:8080/api/${role}/register`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            }
        );

        if(response.ok)
        {
            alert('Registration successful')
            return response;
        }
        else if(response.status === 500 || response.status === 403)
        {
            throw new Error('Email is already used');
        }
        else
        {
            throw new Error('Registration failed');
        }
    }
    catch(error)
    {
        alert(error.message);
    }
};