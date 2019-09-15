import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setHackathon } from '../../../duck/actions/hackathonAction'
import LoadingOverlay from 'react-loading-overlay';
import { GET_TERM_BY_HACKATHON_ID } from '../../../graphql/queries/hackathons'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Grid, Container, CircularProgress, Box } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import IconButton from '@material-ui/core/IconButton';
import  CardHackathonTerm  from './HackathonTermCard';
import HackathonTermEdit from './HackathonTermEdit';
import HackathonTermCreate from './HackathonTermCreate';
import DeleteTermDialog from './DeleteTermDialog';
import useForceUpdate from 'use-force-update';
import * as moment from 'moment';

const HackathonTermList = (props) => {
    const { data, refetch } = useQuery(GET_TERM_BY_HACKATHON_ID, { variables: { id: props.hackathon.id } })
    const [isLoading, setIsLoading] = useState(true);
    const [terms,setTerms] = useState([]);
    const [viewTerm,setViewTerm] = useState("list");
    const [term,setTerm] = useState(null);
    const forceUpdate = useForceUpdate();
   
    useEffect(() => {
        if (data && data.hackathon && data.hackathon.terms) {
           console.log('terms',data.hackathon.terms)
           setTerms(data.hackathon.terms)
           setIsLoading(false);        
        }
        setIsLoading(false);
    }, [data,props.terms])

    //  useEffect(() => {
    //     if(deleteTerm !== null){
    //         deleteTerm(true)
    //     }
    // }, [deleteTerm])

    
    return (
        <LoadingOverlay
            active={isLoading}
            spinner
            text='Loading...'
        >
        <Box display="flex" justifyContent="flex-end"  >
         <IconButton color="inherit" onClick={()=>{setViewTerm('create')}} ><AddCircleOutlinedIcon fontSize="large"/></IconButton></Box>
            <div>
             { viewTerm === 'list' ? 
                terms.map(termProps => <CardHackathonTerm termProps={termProps} terms={terms} setViewTerm={setViewTerm} setTerm={setTerm} />)
                :
                term !== null && viewTerm === 'edit'  ?
                    <HackathonTermEdit term={term} setViewTerm={setViewTerm} terms={terms} setTerms={setTerms} />
                :
                    <HackathonTermCreate setViewTerm={setViewTerm} terms={terms} setTerms={setTerms} />
            }
            </div>
        </LoadingOverlay>
    );
}

const mapStateToProps = state => ({
    hackathon: state.hackathon.hackathon,
    user: state.user.user,
    terms: state.term.terms
})
const mapDispatchToProps = dispatch => bindActionCreators({ setHackathon }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(HackathonTermList)

