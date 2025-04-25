import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const GoogleCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const state = JSON.parse(params.get('state') || {});

    if (code) {
      // Exchange code for token (you'll need a backend endpoint for this)
      exchangeCodeForToken(code)
        .then(userData => {
          // Store user data and redirect
          localStorage.setItem('user', JSON.stringify(userData));
          navigate(state.path || '/user-dashboard', {
            state: state.props
          });
        })
        .catch(error => {
          navigate('/login', { state: { error: 'Google login failed' } });
        });
    }
  }, [location, navigate]);

  return <div>Processing Google login...</div>;
};

async function exchangeCodeForToken(code) {
  const response = await fetch('/api/google-auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  });
  return await response.json();
}