/*
 * Muokattavan rivin komponentti, joka
 * sisältää taulukon rivit muokattavina
 * input-kenttinä. 
*/

import React from "react";

const EditableRow= ( {editFormData, handleEditFormChange, handleCancelClick}) => {
    return (
        <tr>
            <td>
                <input type="text"
                    required="required"
                    placeholder="etunimi"
                    name="etuNimi" 
                    value={editFormData.etuNimi}
                    onChange={handleEditFormChange}/>
            </td>
            <td>
                <input
                    type="text"
                    name="sukuNimi"
                    required="required"
                    placeholder="sukunimi"
                    value={editFormData.sukuNimi}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="ika"
                    required="required"
                    placeholder="ikä"
                    value={editFormData.ika}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <button type="submit">
                    Tallenna
                </button>
                <button type="button" onClick={handleCancelClick}>
                    Peruuta
                </button>
            </td>
        </tr>
    )
}

export default EditableRow;