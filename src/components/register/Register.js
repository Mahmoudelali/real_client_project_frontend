import React from 'react'
import "./Register.css"

function Register() {
    return (
        <>
            <form>
                <label for="username">Username:</label><br />
                <input type="text" id="username" name="username" /><br />
                <label for="email">Email:</label><br />
                <input type="email" id="email" name="email" /><br />
                <label for="phone">Phone:</label><br />
                <input type="tel" id="phone" name="phone" /><br />
                <label for="password">Password:</label><br />
                <input type="password" id="password" name="password" /><br />
                <label for="image">Image:</label><br />
                <input type="file" id="image" name="image" accept="image/png, image/jpeg" />
            </form>
        </>
    )
}

export default Register