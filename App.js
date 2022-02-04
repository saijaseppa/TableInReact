import React, { useState } from "react";
import data from './data.json';
import { nanoid } from 'nanoid';
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import "./App.css";


const App = () => {
  // info sisältää kaikkien tyyppien tiedot. SetInfo
  // asettaa tiedot. 
  const [info, setInfo] = useState(data);
  // Formiin syötettyjen tietojen tila.
  const [addFormData, setAddFormData] = useState({
    etuNimi: '',
    sukuNimi: '',
    ika: ''
  });

  // Formin muokkaukseen syötettyjen tietojen  tila. 
  const [editFormData, setEditFormData] = useState({
    etuNimi: '',
    sukuNimi: '',
    ika: ''
  });

  //EditInfoId:n talletetaan valitun tyypin id. 
  const [editInfoId, setEditInfoId] = useState(null);

  // Eventhandler, jolla otetaan formiin kirjoitetut
  // syötteet okeisiin "etuliitteisiin", ja asetetaan
  // tämä uusi tieto.
  const handleAddFormChange = (event)=> {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newData = { ...addFormData};
    newData[fieldName] = fieldValue;

    setAddFormData(newData);
  };

  // Eventhandler, jonka avulla talletetaan 
  // talukon muokatun rivin tiedot. 
  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  }

  // Eventhandler, jolla talletetaan uusi
  // lisätty tyyppi taulukon oikeille riveille. 
  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newLine = {
      id: nanoid(),
      etunimi: addFormData.etuNimi,
      sukunimi: addFormData.sukuNimi,
      ika: addFormData.ika
    };

    const newLines = [...info, newLine]
    setInfo(newLines);
  };

  // Eventhandler, jolla talletetaan muutokset,
  // jotka taulukon riveihin on annettu. 
  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedInfo = {
      id: editInfoId,
      etunimi: editFormData.etuNimi,
      sukunimi: editFormData.sukuNimi,
      ika: editFormData.ika
    };

    const newInfo = [...info];

    const index = info.findIndex((tyyppi) => tyyppi.id == editInfoId)

    newInfo[index] = editedInfo;

    setInfo(newInfo);
    //Tyhjennetään lopuksi valittu tyyppi. 
    setEditInfoId(null);
  }

  // Eventhandler, joka välittää valitun
  // tyypin id:n, kun Muokkaa-nappia painetaan.
  const handleEditClick = (event, tyyppi) => {
    event.preventDefault();
    setEditInfoId(tyyppi.id);

    const formValues = {
      etuNimi: tyyppi.etunimi,
      sukuNimi: tyyppi.sukunimi,
      ika: tyyppi.ika
    }
    setEditFormData(formValues);
  };
  // Eventhandler, joka peruu tyypin
  // valinnan muokkaukseen. Asettaa
  // arvon nulliksi.
  const handleCancelClick = () => {
    setEditInfoId(null);
  }
  
  // Eventhandler, joka saa poistettavan id:n,
  // ja sen avulla poistaa taulukosta oikean rivin.
  const handleDeleteClick = (tyypinId) => {
    const newInfo = [...info];

    const index = info.findIndex((tyyppi) => tyyppi.id === tyypinId);

    newInfo.splice(index, 1);

    setInfo(newInfo);
  }

  return (
    <div>
      <h2>Tyyppien lisäystaulukko</h2>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Etunimi</th>
              <th>Sukunimi</th>
              <th>Ikä</th>
              <th>Toiminnot</th>
            </tr>
          </thead>
          <tbody>
            {info.map((tyyppi) => (
              // Jos editInfoId on asetettu, ja id on sama
              // kuin läpikäytävän tyypin id, näytetään
              // taulukossa muokattava rivi. Muuten rivi
              // näytetään tavallisena rivinä. 
              <>
                { editInfoId == tyyppi.id ? (
                   <EditableRow 
                    editFormData={editFormData} 
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}/> 
                    ) : ( 
                   <ReadOnlyRow 
                    tyyppi={tyyppi} 
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}/> )}   
              </>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Lisää uusi tyyppi</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input 
        type="text" 
        name="etuNimi" 
        required="required" 
        placeholder="etunimi"
        onChange={handleAddFormChange}
        />
        <input 
        type="text" 
        name="sukuNimi" 
        required="required" 
        placeholder="sukunimi"
        onChange={handleAddFormChange}
        />
        <input 
        type="text" 
        name="ika" 
        required="required" 
        placeholder="ikä"
        onChange={handleAddFormChange}
        />
        <button type="submit">Lisää</button>  
      </form>
    </div>
  )
}

export default App;
