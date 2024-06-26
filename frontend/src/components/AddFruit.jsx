import React, { useState } from 'react' 
import toast from 'react-hot-toast';

import { app } from '../firebase/firebase.config' 
import { getDatabase, ref, set, push } from 'firebase/database' 


const AddFruit = () => {

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
            toast.success('Data has been successfully added to Database'); 
        })
        .catch( (err) => {
            toast.error(err?.message); 
            console.log(err); 
        }); 
    }

    const cssForRows = 'p-4 text-white text-xl flex flex-col w-full'; 
    const cssForLabels = 'my-2'; 
    const cssForInputTags = 'bg-white text-black p-2 rounded-lg text-[16px] w-full'; 

    return (
        <div className='w-screen h-screen bg-zinc-900 flex items-center justify-center'> 
            <form onSubmit={handleSubmit} className='h-[500px] w-[400px] p-8 bg-zinc-700 rounded-lg'>
                
                <div className='text-5xl mb-[30px] mt-[15px] text-center text-white' >
                    Fill the Form 
                </div>

                <div className='w-full h-fit'>
                    <div className={cssForRows} >
                        <label htmlFor='fruit-name' className={cssForLabels} > 
                            Fruit's Name: 
                        </label>
                        <input 
                            type='text' 
                            value={fruitName} 
                            id='fruit-name' 
                            name='fruit-name' 
                            placeholder="Enter a fruit's name here" 
                            onChange={ (e) => setFruitName(e.target.value) }
                            className={cssForInputTags}
                        />
                    </div>

                    <div className={cssForRows}>
                        <label htmlFor='fruit-colour' className={cssForLabels} >
                            Fruit's Colour: 
                        </label>
                        <input 
                            type='text'
                            value={fruitColour} 
                            id='fruit-colour' 
                            name='fruit-colour' 
                            placeholder="Enter fruit's colour here" 
                            onChange={ (e) => setFruitColour(e.target.value) }
                            className={cssForInputTags}
                        />
                    </div>
                </div>

                <div className='w-full flex justify-center items-center mt-[36px]' >
                    <button type='submit' className='h-[50px] w-[160px] text-lg text-white bg-blue-400 hover:bg-green-400 hover:text-black rounded-xl m-2' >
                        Submit 
                    </button>
                </div>

            </form>
        </div>
    )
}

export default AddFruit 