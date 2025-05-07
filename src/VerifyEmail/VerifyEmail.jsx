import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Styles from './VerifyEmail.module.css';
import NavBar from '../NavBar/NavBar';

export default function VerifyEmail() {
  const [message, setMessage] = useState('Loading...');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let isMounted = true;

    async function verifyEmail() {
      const token = searchParams.get('token');
      if (!token) {
        if (isMounted) setMessage('No token provided.');
        return;
      }

      try {
        console.log('Calling Verify Email API');
        const response = await fetch(
          process.env.REACT_APP_URL_VerifyEmail,
          {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(token),
          }
        );
        const Data = await response.json();

        if (isMounted) setMessage(Data?.message);
      } catch (error) {
        console.error('Fetch error:', error);
        if (isMounted) setMessage('Error verifying email.');
      }
    }

    verifyEmail();

    return () => {
      isMounted = false;
    };
  }, [searchParams]);

  return (
    <div className={Styles.Container}>
      <NavBar Postion="relative" Color="black" BackGroundColor="white" />
      <h2 className={Styles.h2}>Verify Email</h2>
      <p className={Styles.Message}>Message: {message}</p>
    </div>
  );
}
