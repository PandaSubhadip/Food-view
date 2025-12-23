import React, { useState } from 'react'
import '../styles/foodUploader.css'
import axios from 'axios'

 
const FoodUploder = () => {
  const [Name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [video, setVideo] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [videoPreview, setVideoPreview] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    setImage(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleVideoChange = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    setVideo(file)
    setVideoPreview(URL.createObjectURL(file))
  }

  const resetForm = () => {


    setName('')
    setDescription('')
    setImage(null)
    setVideo(null)
    setImagePreview(null)
    setVideoPreview(null)
  }

  const handleSubmit = async (e) => {
  
    e.preventDefault()
    if (!Name.trim()) {
      alert('Please provide a name for the food item.')
      return
    }
    setSubmitting(true)
    try {
      const form = new FormData()
      form.append('Name', Name)
      form.append('description', description)
      if (image) form.append('image', image)
      if (video) form.append('video', video)
             

     await  axios.post('http://localhost:3000/api/v1/food/upload', form, {
        withCredentials: true,
       
      })
      
      
      alert('Thanks for Your Contribution!')
     

      resetForm()
    } catch (err) {
      console.error(err)
      alert('Upload failed. See console for details.')
    } finally {
      setSubmitting(false)
    }
  }

  const openPreview = () => {
    setPreviewOpen(true)
  }
  const closePreview = () => setPreviewOpen(false)

  return (
    <div className="uploader-page">
      <form className="uploader-card" onSubmit={handleSubmit}>
        <h2 className="uploader-title">Upload Food</h2>

        <div className="field">
          <label className="label">Name</label>
          <input
            className="input"
            type="text"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Spicy Tomato Pasta"
          />
        </div>

        <div className="field">
          <label className="label">Description</label>
          <textarea
            className="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description..."
            rows={4}
          />
        </div>

        <div className="row">
          <div className="field file-field">
            <label className="label">Image (optional)</label>
            <input className="file-input" type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && <img className="preview-img" src={imagePreview} alt="image preview" />}
          </div>

          <div className="field file-field">
            <label className="label">Video (optional)</label>
            <input className="file-input" type="file" accept="video/*" onChange={handleVideoChange} />
            {videoPreview && (
              <video className="preview-video" controls src={videoPreview} />
            )}
          </div>
        </div>

        <div className="actions">
          <button className="btn primary" type="submit" disabled={submitting}>
            {submitting ? 'Uploading...' : 'Upload Food'}
          </button>
          <button className="btn" type="button" onClick={openPreview}>
            Preview
          </button>
          <button className="btn" type="button" onClick={resetForm}>
            Reset
          </button>
        </div>

        <p className="hint">Tip: Use MP4 for videos. Hook up the backend endpoint in the submit handler.</p>
      </form>

      {previewOpen && (
        <div className="preview-modal" role="dialog" aria-modal="true">
          <div className="preview-overlay" onClick={closePreview} />
          <div className="preview-content">
            <header className="preview-header">
              <h3>Preview</h3>
              <button className="close-btn" onClick={closePreview}>✕</button>
            </header>

            <section className="preview-body">
              <div className="preview-media">
                {imagePreview ? (
                  <img src={imagePreview} alt="image preview" className="preview-large-img" />
                ) : videoPreview ? (
                  <video controls src={videoPreview} className="preview-large-video" />
                ) : (
                  <div className="preview-placeholder">No media selected</div>
                )}
              </div>

              <div className="preview-info">
                <h4 className="preview-name">{name || 'Untitled Food'}</h4>
                <p className="preview-desc">{description || 'No description provided.'}</p>
              </div>
            </section>

            <footer className="preview-footer">
              <button className="btn" onClick={closePreview}>Close</button>
            </footer>
          </div>
        </div>
      )}
    </div>
  )
}

export default FoodUploder