import React, { useState } from 'react' 

import { app } from '../Firebase/firebase.config' 
import { getDatabase, ref, set, push } from 'firebase/database' 


const Write = () => {

    const [fruitName, setFruitName] = useState(''); 
    const [fruitColour, setFruitColour] = useState(''); 

    const handleSubmit = (e) => {       
        e.preventDefault(); 
        e.stopPropagation(); 

        const db = getDatabase(app); 
        const newDocRef = push(ref(db, 'nature/fruits')); 

        set(newDocRef, {
            fruitName, 
            fruitColour 
        })
        .then( () => {
            console.log('Data has been successfully added to DB');  
        })
        .catch( (err) => {
            console.log(err); 
        }); 
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='h-[300px] w-[200px] bg-green-500'>
                
                <div>
                    <label htmlFor='fruit-name'> 
                        Fruit's Name: 
                    </label>
                    <input 
                        type='text' 
                        value={fruitName} 
                        id='fruit-name' 
                        name='fruit-name' 
                        placeholder="Enter a fruit's name here" 
                        onChange={ (e) => setFruitName(e.target.value) }
                    />
                </div>

                <div>
                    <label htmlFor='fruit-colour'>
                        Fruit's Colour: 
                    </label>
                    <input 
                        type='text'
                        value={fruitColour} 
                        id='fruit-colour' 
                        name='fruit-colour' 
                        placeholder="Enter fruit's colour here" 
                        onChange={ (e) => setFruitColour(e.target.value) }
                    />
                </div>

                <div>
                    <button type='submit' >
                        Submit 
                    </button>
                </div>

            </form>
        </div>
    )
}

export default Write