// Mark attendance handler
const form = document.getElementById('attendance-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const studentId = document.getElementById('student-id').value;
    const status = document.getElementById('attendance-status').value;

    try {
        const response = await fetch('http://localhost:3000/mark-attendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ studentId, status })
        });

        const text = await response.text();
        const data = text ? JSON.parse(text) : {};

        if (response.ok) {
            alert(data.message || 'Attendance marked successfully!');
        } else {
            alert(data.error || 'Failed to mark attendance.');
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Error connecting to server.');
    }

    form.reset();
});

// Fetch attendance handler
async function fetchAttendance() {
    const studentId = document.getElementById('search-student-id').value;

    try {
        const response = await fetch(`http://localhost:3000/attendance/${studentId}`);
        const text = await response.text();
        const records = text ? JSON.parse(text) : [];

        const list = document.getElementById('attendance-records');
        list.innerHTML = '';

        if (records.length === 0) {
            list.innerHTML = '<li>No records found</li>';
        } else {
            records.forEach(record => {
                const li = document.createElement('li');
                li.textContent = `${new Date(record.date).toLocaleDateString()} - ${record.status}`;
                list.appendChild(li);
            });
        }
    } catch (err) {
        console.error('Fetch error:', err);
        alert('Error fetching attendance records.');
    }
}
