import React, { useEffect } from 'react';

import useActsStore from '../store/store';
import { editBeat } from '../pages/api/beat';


export default function Form({ handleCloseModal }) {
  const { selectedAct, selectedBeat } = useActsStore(
    (state) => ({
      selectedAct: state.selectedAct, 
      selectedBeat: state.selectedBeat,
    })
  );
  const updateSelectedBeat = useActsStore((state) => state.updateSelectedBeat);
  const updateSelectedActBeats = useActsStore((state) => state.updateSelectedActBeats);

  const handleEditBeat = async (event) => {
    event.preventDefault();
    console.log('do we have edited beats payload:', selectedBeat);
    editBeat(updateSelectedActBeats, selectedAct, selectedBeat);
    handleCloseModal(event);
  }

  const handleChange = (e) => {
    const editedBeat = selectedBeat;
    console.log('handlechange', e.target);
    editedBeat[e.target.name] = e.target.value;
    updateSelectedBeat(editedBeat);
  };
  
  return (
    <form method="dialog" className="modal-box" onSubmit={(e) => handleEditBeat(e)}>
      <h3 className="font-bold text-lg">Edit beat</h3>
      <div className="form-control w-full max-w-xs">
        <label htmlFor="name" className="label">
          <span className="label-text">Beat Title</span>
        </label>
        <input type="text" name="name" value={selectedBeat.name} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
        <label htmlFor="time" className="label">
          <span className="label-text">Beat Duration</span>
        </label>
        <input type="text" name="time" value={selectedBeat.time} onChange={handleChange} placeholder="Beat Duration" className="input input-bordered w-full max-w-xs" />
        <label htmlFor="content" className="label">
          <span className="label-text">Beat Description</span>
        </label>
        <input type="text" name="content" value={selectedBeat.content} onChange={handleChange} placeholder="Beat Description" className="input input-bordered w-full max-w-xs" />
        <label htmlFor="cameraAngle" className="label">
          <span className="label-text">Beat Camera Angle</span>
        </label>
        <input type="text" name="cameraAngle" value={selectedBeat.cameraAngle} onChange={handleChange} placeholder="Beat Camera Angle" className="input input-bordered w-full max-w-xs" />
        <label htmlFor="notes" className="label">
          <span className="label-text">Beat Caption</span>
        </label>
        <input type="text" name="notes" value={selectedBeat.notes} onChange={handleChange} placeholder="Beat Caption" className="input input-bordered w-full max-w-xs" />
      </div>
      
      <div className="modal-action">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn" type='submit'>Apply</button>
        <button className="btn" onClick={(e) => handleCloseModal(e)}>Cancel</button>
      </div>
    </form>
  )
}