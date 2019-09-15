import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from '@material-ui/core/Button';
import useForm from 'react-hook-form';
const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 200,
    height: 200,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    width: 200,
    height: 200
};


function Dropzone(props) {
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => {
                console.log(file)
                props.image(file);
                return Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            }
            ));

        }
    });
    let thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                />
            </div>
        </div>
    ));

    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <React.Fragment>
            {files.length > 0 ? <Button onClick={() => { setFiles([]); props.image(""); }}>Remove Avatar</Button> : <React.Fragment />}
            <div style={{ border: '2px dotted #c6c6c6', width: 200, height: 200 }} {...getRootProps()}>
                {files.length > 0 ?
                    <div>
                        <input id="avatar" name="avatar"  {...getInputProps()} />
                        {thumbs}

                    </div>
                    :
                    <div>
                        <input id="avatar" name="avatar" {...getInputProps()} />
                        <p >Drag 'n' drop the avatar here, or click to select</p>
                    </div>
                }

            </div>
        </React.Fragment>
    );
}
export default Dropzone;