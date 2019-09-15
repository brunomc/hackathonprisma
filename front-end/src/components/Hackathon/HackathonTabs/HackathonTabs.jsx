import React, { useEffect } from 'react';
import { GET_HACKATHON_BY_ID } from '../../../graphql/queries/hackathons'
import { useQuery } from '@apollo/react-hooks';
import { bindActionCreators } from 'redux'
import { setHackathon } from '../../../duck/actions/hackathonAction'
import { setUser } from '../../../duck/actions/userAction'
import { connect } from 'react-redux'
import { navigate } from 'hookrouter'
import LoadingOverlay from 'react-loading-overlay';
import HackathonTabsOwner from '../HackathonTabs/HackathonTabsOwner'
import HackathonTabsParticipant from '../HackathonTabs/HackathonTabsParticipant'

const isHackathonCreator = (props) => {
    return props.user.createdHackathon.filter(created => created.id === props.user.id).length > 0
}

const HackathonTabs = (props) => {
    const id = props.id;
    const { loading, error, data } = useQuery(GET_HACKATHON_BY_ID, { variables: { id } });
    let isHackathonOwner = false;
    useEffect(() => {
        if (data && data.hackathon) props.setHackathon(data.hackathon)
        if (props.user.createdHackathon) isHackathonOwner = isHackathonCreator(props)
    }, [data])
    useEffect(() => {
        if (error) navigate('/hackathons')
    }, [error])
    if (loading) return <LoadingOverlay active={true} spinner text='Loading...' ><div style={{ width: '100vw', height: '100vh' }}></div></LoadingOverlay>
    else if (1==1) {
        window.history.pushState("", "", "/hackathons/edit/"+id);
        return <HackathonTabsOwner />
    } 
    return <HackathonTabsParticipant />
}
const mapStateToProps = state => ({
    hackathon: state.hackathon.hackathon,
    user: state.user.user
})
const mapDispatchToProps = dispatch => bindActionCreators({ setHackathon, setUser }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(HackathonTabs)

