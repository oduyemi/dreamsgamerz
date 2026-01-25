const API_BASE = 'https://gamerz-lemon.vercel.app/api/v1';

export async function sendSupportMessage(message: string) {
  const res = await fetch(`${API_BASE}/supportChat/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', 
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    throw new Error('Failed to send message');
  }

  return res.json();
}

export async function fetchSupportMessages() {
  const res = await fetch(`${API_BASE}/supportChat`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to load messages');
  }

  return res.json();
}
