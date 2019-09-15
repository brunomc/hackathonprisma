import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setHackathon } from '../../../duck/actions/hackathonAction';
import useForm from 'react-hook-form';
import { Button } from '@material-ui/core';
import FormInputs from '../../FormInputs/FormInputs';
import LoadingOverlay from 'react-loading-overlay';
import { SnackbarContentWrapper } from '../../Snackbar';
import Snackbar from '@material-ui/core/Snackbar';
import { UPDATE_TERM } from '../../../graphql/mutations/terms';
import { EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import * as moment from 'moment';

const HackathonTermEdit = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [editorState,setEditorState] = useState(EditorState.createEmpty());
    const [content,setContent] = useState({});
    const [openSnackBar, setOpenSnackBar] = useState({ open: false, type: "info", message: "" });
    
    const { register, handleSubmit, setValue, errors, getValues } = useForm({ mode: 'onSubmit' });
    const [updateTerm] = useMutation(UPDATE_TERM, {
        onCompleted: (resp) => {
            setIsLoading(false);
            setOpenSnackBar({ open: true, type: 'success', message: "Term updated with success!" })
        },
        onError: (error) => {
            console.log(error)
            setIsLoading(false);
            setOpenSnackBar({ open: true, type: 'error', message: "Error on update term!" })
        }
    });
    useEffect(() => {
        if (props.term) {
            console.log(props.term.id)
             setValue('name', props.term.name);
             updateEditorFromHtml(getHtmlFromProps());          
        }
        setIsLoading(false);
    }, [])
    
    
    const getHtmlFromEditor = () =>{
        const contentHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        return contentHtml ;
    }
    const getHtmlFromProps = () =>{
        return props.term.content ;
    }
    const updateEditorFromHtml = (content) => {
        const contentBlocksFromHtml = htmlToDraft(content);
        const { contentBlocks, entityMap } = contentBlocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        setEditorState(EditorState.createWithContent(contentState));
    }
    const onSubmit = async data => {
        setIsLoading(true);
        updateTerm({variables: {...data,content:getHtmlFromEditor(),term:props.term.id}})
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar({ open: false, type: 'info', message: "" });
    }
    const handleEditorState = (e) => {
        setEditorState(e)
    }
    return (
        <LoadingOverlay
            active={isLoading}
            spinner
            text='Loading...'
        >
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={openSnackBar.open}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <SnackbarContentWrapper
                    onClose={handleClose}
                    variant={openSnackBar.type}
                    message={openSnackBar.message}
                />
            </Snackbar>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                <FormInputs
                        ncols={['6']}
                        properties={[
                            {
                                id: "name",
                                name: 'name',
                                label: 'Name',
                                inputRef: register,
                                validation: {
                                    required: 'Required name'
                                 },
                                error: errors
                            }
                        ]}
                    />
                    <br/>
                    <div style={{height:'100%'}}>
                        <Editor toolbarClassName="toolbarClassName"
                            editorState={editorState}
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={(e)=>handleEditorState(e)} />
                    </div> 
                    <div>
                        <Button variant="outlined" type='submit' >save</Button> <Button variant="outlined" type='button' onClick={()=>{props.setViewTerm('list')}} >back</Button>
                    </div>                   
                </form>
            </div >
        </LoadingOverlay>
    );
}

const mapStateToProps = state => ({
    hackathon: state.hackathon.hackathon,
    user: state.user.user
})
const mapDispatchToProps = dispatch => bindActionCreators({ setHackathon }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(HackathonTermEdit)

