// POST: Add new borrow record
export const addBorrowRecord = async(email, course, type, brand, model, formData) =>
{
    try
    {
        const response = await fetch
        (
            `http://localhost:8080/api/borrow/add?email=${encodeURIComponent(email)}&course=${encodeURIComponent(course)}&type=${encodeURIComponent(type)}&brand=${encodeURIComponent(brand)}&model=${encodeURIComponent(model)}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            }
        );

        if(response.ok)
            return response;
        else
            throw new Error('Failed to create borrow request');
    }
    catch(error)
    {
        console.error(error);
        alert(error.message);
    }
};

// GET: All borrow records with a specific status
export const getAllBorrowsByStatus = async(borrowstatus) =>
{
    try
    {
        const response = await fetch
        (
            `http://localhost:8080/api/borrow/all?borrowstatus=${encodeURIComponent(borrowstatus)}`
        );

        if(response.ok)
            return response;
        else
            throw new Error('Failed to fetch borrow records');
    }
    catch(error)
    {
        alert(error.message);
        return { success: false, error };
    }
};

// GET: All borrow records from a specific student with a specific status
export const getAllBorrowsByStudentAndStatus = async(email, borrowstatus) =>
{
    try
    {
        const response = await fetch
        (
            `http://localhost:8080/api/borrow/all/student?email=${encodeURIComponent(email)}&borrowstatus=${encodeURIComponent(borrowstatus)}`
        );

        if(response.ok)
            return response;
        else
            throw new Error('Failed to fetch borrow records');
    }
    catch(error)
    {
        alert(error.message);
        return { success: false, error };
    }
};

// GET: Borrow record by laptop brand, model, and borrow status
export const getBorrowByLaptopAndStatus = async(brand, model, borrowstatus) =>
{
    try
    {
        const response = await fetch
        (
            `http://localhost:8080/api/borrow/get?brand=${encodeURIComponent(brand)}&model=${encodeURIComponent(model)}&borrowstatus=${encodeURIComponent(borrowstatus)}`
        );

        if(response.ok)
            return response;
        else
            throw new Error('Failed to fetch borrow record');
    }
    catch(error)
    {
        alert(error.message);
        return { success: false, error };
    }
}

// PUT: Update borrow status
export const updateBorrowStatus = async(newstatus, borrow) =>
{
    try
    {
        const response = await fetch
        (
            `http://localhost:8080/api/borrow/status/${newstatus}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(borrow)
            }
        );

        if(response.ok && newstatus === 'APPROVED')
        {
            const laptop = borrow.laptop;
            const newlaptopstatus = 'BORROWED';

            try
            {
                const response2 = await fetch
                (
                    `http://localhost:8080/api/laptop/status/${newlaptopstatus}`,
                    {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(laptop) 
                    }
                );

                if(response2.ok)
                {
                    alert('APPROVED: ' + borrow.laptop.brand + ' - ' + borrow.laptop.model + ' - ' + borrow.student.firstname + ' ' + borrow.student.lastname);
                    window.location.reload();
                }
                else
                {
                    throw new Error('Failed to approve request');
                }
            }
            catch(error)
            {
                alert(error.message);
            }
        }
        else if(response.ok && newstatus === 'REJECTED')
        {
            alert('REJECTED: ' + borrow.laptop.brand + ' - ' + borrow.laptop.model + ' - ' + borrow.student.firstname + ' ' + borrow.student.lastname);
            window.location.reload();
        }
        else if(response.ok && newstatus === 'RETURNED')
        {
            alert('RETURNED: ' + borrow.laptop.brand + ' - ' + borrow.laptop.model + ' - ' + borrow.student.firstname + ' ' + borrow.student.lastname);
            window.location.reload();
        }
        else
        {
            throw new Error('Failed to update borrow status');
        }
    }
    catch(error)
    {
        console.error(error);
        alert(error.messsage);
    }
};