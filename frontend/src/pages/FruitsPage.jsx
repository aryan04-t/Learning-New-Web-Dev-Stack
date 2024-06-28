import React, {useState} from 'react'

import AddOrUpdateFruitCard from '../components/AddOrUpdateFruitCard'
import DisplayFruitsTable from '../components/DisplayFruitsTable'


const FruitsPage = () => {

    const [isUpdateDivActive, setIsUpdateDivActive] = useState(false); 

    const [newFruitName, setNewFruitName] = useState(''); 
    const [newFruitColour, setNewFruitColour] = useState(''); 
    const [editFruitFirebaseId, setEditFruitFirebaseId] = useState(''); 

    const addOrUpdateFruitCardProps = {
        isUpdateDivActive, 
        setIsUpdateDivActive, 
        newFruitName, 
        setNewFruitName, 
        newFruitColour, 
        setNewFruitColour,
        editFruitFirebaseId,
        setEditFruitFirebaseId 
    }

    const displayFruitsTableProps = {
        isUpdateDivActive, 
        setIsUpdateDivActive, 
        setNewFruitName, 
        setNewFruitColour, 
        setEditFruitFirebaseId 
    }

    return (
        <div className='card-flip-animation-container w-screen min-h-screen bg-zinc-900 flex flex-col items-center justify-center gap-20 xl:flex-row'>
            <AddOrUpdateFruitCard addOrUpdateFruitCardProps={addOrUpdateFruitCardProps} /> 
            <DisplayFruitsTable displayFruitsTableProps={displayFruitsTableProps} /> 
        </div>
    )
}

export default FruitsPage