import axios from 'axios';
import "./deleteAccount.css"; 
import { Link } from "react-router-dom";

function DeleteUser() {
    const handleDelete = async () => {
      const email = document.getElementById('emailInput').value;
      const password = document.getElementById('passwordInput').value;
      await axios
        .delete('http://localhost:3001/delete/' + email + '/' + password)
        .then((response) => {
          console.log('User deleted successfully');
        })
        .catch((error) => {
          console.log('Error deleting User:');
        });
    }

    return (
        <div>
          <h2>Delete Account</h2>
          <h3 class="instructions">Enter your email and password to delete your account</h3>
          <div class="deleteAccount">
            <div class="row">
              <label for="emailInput">Email: </label>
              <input id="emailInput" type="text"/>
            </div>
            <div class="row">
            <label for="passwordInput">Password: </label>
            <input id="passwordInput" type="text"/>
            </div>
            <button onClick={() => handleDelete()}>Delete Account</button>
          </div>
          <Link to="/map"><button>Back</button></Link>
        </div>
      );
    };
    
    export default DeleteUser;