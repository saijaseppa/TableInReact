/*
 * Taulukon tavallisen rivin komponentti, joka
 * sisältää taulukon rivit vain 
 * luettavassa muodossa. 
 * Viimeisellä rivillä kaksi buttonia, muokkaus ja poisto.
*/

import React from "react";

const ReadOnlyRow = ({ tyyppi, handleEditClick, handleDeleteClick }) => {
    return (
        <tr>
            <td>{tyyppi.etunimi}</td>
            <td>{tyyppi.sukunimi}</td>
            <td>{tyyppi.ika}</td>
            <td>
                <button type="button" onClick={(event)=> handleEditClick(event, tyyppi)}>
                    Muokkaa
                </button>
                <button type="button" onClick={()=>handleDeleteClick(tyyppi.id) }>
                    Poista
                </button>
            </td>
        </tr>
    )
}

export default ReadOnlyRow;

