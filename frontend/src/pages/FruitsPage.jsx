import React, {useState} from 'react'

import AddOrUpdateFruitCard from '../components/AddOrUpdateFruitCard'
import DisplayFruitsTable from '../components/DisplayFruitsTable'


const FruitsPage = () => {

    const [isUpdateDivActive, setIsUpdateDivActive] = useState(false); 

    const [newFruitName, setNewFruitName] = useState(''); 
    const [newFruitColour, setNewFruitColour] = useState(''); 
    const [editFruitFirebaseId, setEditFruitFirebaseId] = useState(''); 

    const handleCloseUpdateTab = (e) => {
        e.preventDefault();
        e.stopPropagation(); 
        setIsUpdateDivActive(false);
        setTimeout( () => {
            setNewFruitName(''); 
            setNewFruitColour(''); 
            setEditFruitFirebaseId(''); 
        }, 600) 
    }

    const addOrUpdateFruitCardProps = {
        isUpdateDivActive, 
        newFruitName, 
        setNewFruitName, 
        newFruitColour, 
        setNewFruitColour,
        editFruitFirebaseId, 
        handleCloseUpdateTab  
    }

    const displayFruitsTableProps = {
        isUpdateDivActive, 
        setIsUpdateDivActive, 
        setNewFruitName, 
        setNewFruitColour, 
        setEditFruitFirebaseId, 
        handleCloseUpdateTab 
    }

    return (
        <div className='card-flip-animation-container w-screen min-h-screen bg-zinc-900 flex flex-col items-center justify-center gap-20 xl:flex-row'>
            <AddOrUpdateFruitCard addOrUpdateFruitCardProps={addOrUpdateFruitCardProps} /> 
            <DisplayFruitsTable displayFruitsTableProps={displayFruitsTableProps} /> 
        </div>
    )
}

export default FruitsPage