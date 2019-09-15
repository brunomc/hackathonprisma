import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { GetUserByToken } from '../../graphql/mutations/user'
import { bindActionCreators } from 'redux'
import { checkToken } from '../../duck/actions/authAction'
import { navigate } from 'hookrouter'
import { connect } from 'react-redux'
import Layout from '../../components/Layout/Layout';
import { menus } from '../../config/menus';
import { colors } from '../../config/colors'
import { BarChart } from "reaviz";
import { AreaChart } from 'reaviz';
import { CircularProgress, Container } from '@material-ui/core';
const ReportsContent = (props) => {
  const data = [
    { key: 'IDS', data: 14 },
    { key: 'Malware', data: 5 },
    { key: 'DLP', data: 18 }
  ];
  const data2 = [
    { key: new Date(), data: 10 }
  ];
  return (
    <div>
      <h1>Reports</h1>
      <BarChart width={350} height={250} data={data} />
      <AreaChart
        width={250}
        height={250}
        data={data2}
      />
    </div>
  );
}
const Reports = (props) => {
  const [checkToken, { data }] = useMutation(GetUserByToken, {
    onCompleted: (resp) => props.checkToken(resp.getUserByToken),
    onError: (error) => { localStorage.setItem('token', ""); }
  })
  useEffect(() => {
    if (localStorage.getItem('token') !== "" && localStorage.getItem('token') !== null) {
      checkToken({ variables: { token: localStorage.getItem('token').split(' ')[1] } });
    } else {
      navigate('/login')
    }
  }, [props.checkedToken])
  if (props.checkedToken)
    return <Layout
      withAppBar={true}
      menus={menus}
      withMenu
      paddinTopMenu="5vh"
      colors={colors}
      textTopMenu=""
      logo="https://www.trzcacak.rs/myfile/full/316-3169204_angry-panda-logo.png"
      logoTxt="Panda"
      logoStyle={{ width: '10%', height: '20%' }}
      content={<ReportsContent {...props} />
      }
    />
  return <Container><CircularProgress disableShrink /></Container>
}
const mapStateToProps = state => ({
  checkedToken: state.auth.checkedToken
})
const mapDispatchToProps = dispatch => bindActionCreators({ checkToken }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Reports)

