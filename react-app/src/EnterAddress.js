import './EnterAddress.css';
import { Link } from "react-router-dom"

function NewTrip() {
 return (
   <div className="addressForm">
       <form action="#" class="addressForm">
        <h1>New Trip</h1>
            <div class="horizontalFormContent">
            <div>
                <input type = "text" placeholder="Starting Address" class="formItem" id="addressInput"/>
            </div>
            <h2 class="formItem">To</h2>
            <div>
                <input type = "text" placeholder="Destination" class="formItem" id="addressInput"/>
            </div>
            </div>
            <div class="formItem" id="locationCheckbox">
                <input type = "checkbox" id="checkbox"/>
                <label for="currentLocation">Current Location</label>
            </div>
            <div class="startTrip">
                <Link to="/map"><input type = "submit" value="Start Trip" class="formItem" id="startTrip"/></Link>
            </div>
        </form> 
   </div>
 );
}


export default NewTrip;
