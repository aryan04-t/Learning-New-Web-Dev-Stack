import React, { useState } from 'react' 
import toast from 'react-hot-toast';

import { app } from '../firebase/firebase.config' 
import { getDatabase, ref, set, push, update } from 'firebase/database' 

import { MdClose } from "react-icons/md";


const AddOrUpdateFruitCard = ({addOrUpdateFruitCardProps}) => {

    const {
        isUpdateDivActive, 
        setIsUpdateDivActive, 
        newFruitName, 
        setNewFruitName, 
        newFruitColour, 
        setNewFruitColour, 
        editFruitFirebaseId,
        setEditFruitFirebaseId 
    } = addOrUpdateFruitCardProps; 

    const [fruitName, setFruitName] = useState(''); 
    const [fruitColour, setFruitColour] = useState(''); 

    const handleAddFruit = (e) => {

        e.preventDefault(); 
        e.stopPropagation(); 

        const db = getDatabase(app); 
        const newDocRef = push(ref(db, 'nature/fruits')); 
    
        /*
            ---> If you will just take ref() of a path and then use set() function, then whatever data is present on that path, it will get replaced by the new data which is being set 
            ---> But if you always want to add new data on a given path, then use push() function with ref(), push() function will give you a unique key and now when you will set data using set() function, the data will be set on this ref path 'nature/fruits/<unique_id_provided_by_push_function>' 

            $ You can also create your own unique id and you can skip using push() function 
        */

        /*
            # Creating our own unique id for pushing data to a path using set 

            ---> Either you can create the unique id on your own by writing custom logic or you can use a package like uuid for creating it 


            @ Create unique id using uuid: 

            * uuid docs: https://www.npmjs.com/package/uuid
            ---> Install uuid in frontend: 
                Command: npm install uuid 
            ---> Import package in file where you want to use it: 
                import { v4 as uuidv4 } from 'uuid'; 
            ---> Call uuid constructor for getting the unqiue value: 
                const uniqueId = uuidv4();                                // Ex: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' 


            @ Create your own unqiue id by writing your own custom logic: 

            const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;



            @ Now use the unqiue key which you have created above using any one of the above given ways, and then push data to the path 

            const newDocRef2 = ref(db, `nature/fruits/${uniqueId}`); 
            
            set(newDocRef2, {
                _id : uniqueId, 
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
        */ 

        set(newDocRef, {
            _id : newDocRef.key, 
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

        /*
            # Summary about set() and push() 
                ---> Use set(): When you want to write or replace data at a known location.
                ---> Use push(): When you want to add a new, unique item to a list or collection, ensuring no data is overwritten.
        */

        // Above whole process of using push() while taking ref() and then using set() can also be done by just using push() directly after taking just ref() but in this way you will not be able to add _id attribute, you have to either update the data to add it in .then() or you have to use uuid here for adding _id value, there can be other ways also though 
        
        /*
            const pathRef = ref(db, 'nature/fruits'); 
            push(pathRef, {
                fruitName, 
                fruitColour 
            })
            .then( (newFruitRef) => {
                const newFruitId = newFruitRef.key; 
                console.log(newFruitId); 
                toast.success('Data has been successfully added to Database'); 
            })
            .catch( (err) => {
                toast.error(err?.message); 
                console.log(err); 
            })
        */
    }


    const handleUpdateFruit = async (e) => {

        e.preventDefault(); 
        e.stopPropagation(); 

        const db = getDatabase(app); 
        const docRef = ref(db, `nature/fruits/${editFruitFirebaseId}`); 

        update(docRef, {
            fruitName : newFruitName, 
            fruitColour : newFruitColour 
        })
        .then( () => {
            toast.success('Fruit Updated Successfully'); 
            handleCloseUpdateTab(e); 
        })
        .catch( (err) => {
            toast.error(err?.message); 
            console.log(err); 
        })
    }


    const handleCloseUpdateTab = (e) => {
        e.preventDefault();
        e.stopPropagation(); 
        setIsUpdateDivActive(false);
        setTimeout( () => {
            setFruitName(''); 
            setNewFruitColour(''); 
            setEditFruitFirebaseId(''); 
        }, 600) 
    }

    const cssForRows = 'p-4 text-white text-xl flex flex-col w-full'; 
    const cssForLabels = 'my-2'; 
    const cssForInputTags = 'bg-white text-black p-2 rounded-lg text-[16px] w-full outline-none'; 

    return (
        <div style={ (isUpdateDivActive) ? { transform: 'rotateY(180deg)' } : {} } className='card relative h-[500px] w-[400px] mt-20 xl:mt-0'>
            <form onSubmit={handleAddFruit} className='frontofcard absolute z-20 h-full w-full p-8 bg-zinc-700 rounded-lg'>
                
                <div className='text-5xl mb-[30px] mt-[15px] text-center text-white'>
                    Add Fruit
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
                            placeholder="Enter fruit's name here" 
                            onChange={ (e) => setFruitName(e.target.value) }
                            className={cssForInputTags}
                            required
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
                            required
                        />
                    </div>
                </div>

                <div className='w-full flex justify-center items-center mt-[36px]' >
                    <button type='submit' className='h-[50px] w-[160px] text-lg text-white bg-blue-400 hover:bg-green-400 hover:text-black rounded-xl m-2' >
                        Add
                    </button>
                </div>

            </form>

            <form onSubmit={handleUpdateFruit} className='backofcard absolute z-10 h-full w-full p-8 bg-zinc-700 rounded-lg'>
                
                <button onClick={handleCloseUpdateTab} className='absolute top-[20px] left-[20px] h-[20px] w-[20px] rounded-full flex justify-center items-center hover:text-red-500 text-white text-xl'>
                    <MdClose />
                </button>
                
                <div className='text-5xl mb-[30px] mt-[15px] text-center text-white' >
                    Update Fruit
                </div>

                <div className='w-full h-fit'>
                    <div className={cssForRows} >
                        <label htmlFor='fruit-name' className={cssForLabels} > 
                            Fruit's New Name: 
                        </label>
                        <input 
                            type='text' 
                            value={newFruitName} 
                            id='fruit-name' 
                            name='fruit-name' 
                            placeholder="Enter fruit's new name here" 
                            onChange={ (e) => setNewFruitName(e.target.value) }
                            className={cssForInputTags}
                            required
                        />
                    </div>

                    <div className={cssForRows}>
                        <label htmlFor='fruit-colour' className={cssForLabels} >
                            Fruit's New Colour: 
                        </label>
                        <input 
                            type='text'
                            value={newFruitColour} 
                            id='fruit-colour' 
                            name='fruit-colour' 
                            placeholder="Enter fruit's new colour here" 
                            onChange={ (e) => setNewFruitColour(e.target.value) }
                            className={cssForInputTags}
                            required
                        />
                    </div>
                </div>

                <div className='w-full flex justify-center items-center mt-[36px]' >
                    <button type='submit' className='h-[50px] w-[160px] text-lg text-white bg-blue-400 hover:bg-green-400 hover:text-black rounded-xl m-2' >
                        Update
                    </button>
                </div>

            </form>

        </div>
    )
}

export default AddOrUpdateFruitCard 