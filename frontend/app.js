const API_URL = window.ENV_API_URL || 'http://localhost:5000/api/attendance';

async function fetchAttendance() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    const tbody = document.getElementById('attendanceList');
    tbody.innerHTML = '';
    data.forEach((record, index) => {
      const time = new Date(record.created_at).toLocaleTimeString();
      tbody.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${record.name}</td>
          <td>${time}</td>
        </tr>
      `;
    });
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

async function markAttendance() {
  const input = document.getElementById('nameInput');
  const message = document.getElementById('message');
  const name = input.value.trim();

  if (!name) {
    message.textContent = 'Please enter your name!';
    message.className = 'message error';
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });

    if (res.ok) {
      message.textContent = `✅ Attendance marked for ${name}!`;
      message.className = 'message success';
      input.value = '';
      fetchAttendance();
    } else {
      message.textContent = 'Something went wrong!';
      message.className = 'message error';
    }
  } catch (err) {
    message.textContent = 'Cannot connect to server!';
    message.className = 'message error';
  }

  setTimeout(() => { message.textContent = ''; }, 3000);
}

// Load on start
fetchAttendance();
