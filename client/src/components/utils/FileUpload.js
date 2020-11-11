import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from 'antd'
import Axios from 'axios'

function FileUpload(props) {

    const [Images, setImages] = useState([])

    const onDrop = files => {

        let formData = new FormData()
        const config = {
            header: {
                'content-type': 'multipart/form-data'
            }
        }
        formData.append('file', files[0])

        Axios.post('/api/courses/uploadImage', formData, config)
            .then(res => {
                if (res.data.success) {
                    setImages([...Images, res.data.image])
                    props.refreshFunction([...Images, res.data.image])
                } else {
                    alert('Failed to save the image!')
                }
            })
    }

    const onDelete = image => {
        const currentId = Images.indexOf(image)

        let newImages = [...Images]
        newImages.splice(currentId, 1)

        setImages(newImages)
        props.refreshFunction(newImages)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around'}}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={8000000000}
            >
                {({getRootProps, getInputProps}) => (
                    <div style={{ 
                        width: '300px', 
                        height: '240px',
                        border: '1px solid lightgray',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{fontSize: '3rem'}} />
                    </div>
                )}
            </Dropzone>

            <div 
                style={{ 
                    display: 'flex', 
                    width: '350px', 
                    height: '240px',
                    overflowX: 'scroll'
                }}
            >
                {Images.map((image, index) => (
                    <div key={index} onClick={() => onDelete(image)}>
                        <img 
                            src={`http://localhost:5000/${image}`}
                            style={{
                                minWidth: '300px',
                                width: '300px',
                                height: '240px'
                            }}
                        />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default FileUpload
