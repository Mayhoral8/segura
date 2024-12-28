"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';  // Next.js router
import axios from 'axios';

const VerifyEmailPage = () => {
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Get the token from the query params
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      // Call API to verify email with the token
      verifyEmail(token);
    } else {
      setError("Invalid verification link.");
      setLoading(false);
    }
  }, [token]);

  const verifyEmail = async (token) => {
    try {
      const response = await axios.post('/api/verify-email', { token });
      if (response.data.success) {
        setVerified(true);
      } else {
        setError("Email verification failed.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const redirectToLogin = () => {
    router.push('/login');
  };

  return (
    <div className="verification-container">
      <h2>Email Verification</h2>
      {loading ? (
        <p>Verifying your email...</p>
      ) : (
        <>
          {verified ? (
            <div>
              <h3>Email Verified Successfully!</h3>
              <p>Your email has been verified. You can now log in.</p>
              <button onClick={redirectToLogin}>Go to Login</button>
            </div>
          ) : (
            <div>
              <h3>Verification Failed</h3>
              <p>{error}</p>
              <button onClick={redirectToLogin}>Try Again</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VerifyEmailPage;
