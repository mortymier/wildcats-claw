// POST: Add new laptop
export const addLaptop = async(formData) =>
{
    try
    {
        const payload = new FormData();
        payload.append('brand', formData.brand);
        payload.append('model', formData.model);
        payload.append('image', formData.image); // Attach the image file
        payload.append('ram', formData.ram);
        payload.append('cpu', formData.cpu);
        payload.append('storage', formData.storage);
        payload.append('price', formData.price);

        const response = await fetch
        (
            `http://localhost:8080/api/laptop/add2`,
            {
                method: 'POST',
                body: payload // No need to set Content-Type; browser sets it automatically
            }
        );

        if(response.ok)
        {
            alert('Laptop has been added!');
            return response;
        }
        else
        {
            throw new Error('Failed to add laptop');
        }
    }
    catch(error)
    {
        alert(error.message);
        return { success: false, error };
    }
};

// GET: All laptops
export const getAllLaptops = async() =>
{
    try
    {
        const response = await fetch(`http://localhost:8080/api/laptop/all`);

        if(response.ok)
            return response;
        else
            throw new Error('Failed to fetch laptops');
    }
    catch(error)
    {
        alert(error.message);
        return { success: false, error };
    }
};

// PUT: Return laptop
export const returnLaptop = async(laptop) =>
{
    try
    {
        const response = await fetch
        (
            `http://localhost:8080/api/laptop/status/AVAILABLE`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(laptop) 
            }
        );

        if(response.ok)
            return response;
        else
            throw new Error('Failed to return laptop');
    }
    catch(error)
    {
        alert(error.message);
        return { success: false, error };
    }
};