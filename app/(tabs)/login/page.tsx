'use client';
import React from 'react';
 

const LoginPage = () => {
    return (
        <>

        <div style={styles.container}>
            <h1 style={styles.title}>🍪 Rollin' in Dough 🍪</h1>
            <p style={styles.subtitle}>Welcome back! Please log in to continue.</p>
            <form style={styles.form}>
                <input
                    type="text"
                    placeholder="Username"
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>
                    Log In
                </button>
            </form>
            <p style={styles.footer}>
                Don't have an account? <a href="/signup" style={styles.link}>Sign up here!</a>
            </p>
        </div>
       
        </>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'bg-[#ffccff]',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        fontSize: '2.5rem',
        color: '#ffccff',
        marginBottom: '0.5rem',
    },
    subtitle: {
        fontSize: '1.2rem',
        color: '#ffccff',
        marginBottom: '2rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        width: '100%',
        maxWidth: '300px',
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '1rem',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#008080',
        color: '#black',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1rem',
        cursor: 'pointer',
    },
    buttonHover: {
        backgroundColor: '#a0522d',
    },
    footer: {
        marginTop: '1rem',
        fontSize: '0.9rem',
        color: '#555',
    },
    link: {
        color: '#008080',
        textDecoration: 'none',
    },
};

export default LoginPage;