import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import { setTerms } from '../../../duck/actions/termAction';
import useForm from 'react-hook-form';
import { Button } from '@material-ui/core';
import FormInputs from '../../FormInputs/FormInputs';
import LoadingOverlay from 'react-loading-overlay';
import { SnackbarContentWrapper } from '../../Snackbar';
import Snackbar from '@material-ui/core/Snackbar';
import { CREATE_TERM } from '../../../graphql/mutations/terms';
import { GET_TERM_BY_HACKATHON_ID } from '../../../graphql/queries/hackathons'
import { EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import * as moment from 'moment';

const HackathonTermCreate = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [editorState,setEditorState] = useState(EditorState.createEmpty());
    const [content,setContent] = useState({});
    const [openSnackBar, setOpenSnackBar] = useState({ open: false, type: "info", message: "" });
    const { register, handleSubmit, setValue, errors, getValues } = useForm({ mode: 'onSubmit' });
    const [createTerm] = useMutation(CREATE_TERM, {
        onCompleted: (resp) => {
            setIsLoading(false);
            props.setTerms([...props.terms,resp.createTerm]);
            setOpenSnackBar({ open: true, type: 'success', message: "Term created with success!" })
        },
        onError: (error) => {
            setIsLoading(false);
            setOpenSnackBar({ open: true, type: 'error', message: "Error on create term!" })
        }
    });
    useEffect(() => {
        setIsLoading(false);
    }, [])
    
    
    const getHtmlFromEditor = () =>{
        const contentHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        return contentHtml ;
    }
   
    const onSubmit = async data => {
        setIsLoading(true);
        createTerm({variables: {...data,content:getHtmlFromEditor(), hackathon:props.hackathon.id}})
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
                        <Button variant="outlined" type='submit' >save</Button> <Button variant="outlined" type='button' onClick={()=>{props.setViewTerm('list'); }} >back</Button>
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
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(HackathonTermCreate)

