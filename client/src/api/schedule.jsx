// POST: Add new schedule using student email
export const addScheduleByEmail = async(email, formData) =>
{
    try
    {
        const response = await fetch
        (
            `http://localhost:8080/api/schedule/student?email=${encodeURIComponent(email)}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            }
        );

        if(response.ok)
            return response;
        else
            throw new Error('Failed to add schedule');
    }
    catch(error)
    {
        alert(error.message);
        return { success: false, error };
    }
};

// GET: All schedules belonging to a specific student
export const getStudentSchedules = async(email) =>
{
    try
    {
        const response = await fetch(`http://localhost:8080/api/schedule/student?email=${encodeURIComponent(email)}`);

        if(response.ok)
            return response;
        else
            throw new Error('Failed to fetch schedules');
    }
    catch(error)
    {
        alert(error.message);
        return { success: false, error };
    }
};