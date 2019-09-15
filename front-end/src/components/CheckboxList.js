import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CheckboxList(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    console.log(currentIndex)
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    props.setInitialOptions(newChecked);
  };
  const data = [
  {key:0,title:"Aviso Prévio", content:"Quando uma das partes deseja finalizar o contrato de traba."},
  {key:1,title:"Multa do Artigo nº477 da CLT", content:"Quando uma das partes deseja finalizar o contrato de traba."},
  {key:2,title:"Multa de 40% do FGTS", content:"Quando uma das partes deseja finalizar o contrato de traba."},
  {key:3,title:"Multa do Artigo nº 467 CLT", content:"Quando uma das partes deseja finalizar o contrato de traba."},
  {key:4,title:"Férias Proporcionais / Vencidas", content:"Quando uma das partes deseja finalizar o contrato de traba."},
  {key:5,title:"13º Salário Proporcional / Vencido", content:"Quando uma das partes deseja finalizar o contrato de traba."},
  {key:6,title:"Saldo do Salário", content:"Quando uma das partes deseja finalizar o contrato de traba."},
  ]
  return (
    <List >
      {data.map(value => {
        const labelId = `checkbox-list-label-${value.key}`;

        return (
          <ListItem key={value.key} role={undefined} dense button onClick={handleToggle(value.key)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value.key) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <div>
              <h1>{value.title}</h1>
              <p>{value.content}</p>
            </div>
            <ListItemSecondaryAction onClick={()=>alert('OK')}>
              <IconButton edge="end" aria-label="comments">
                <CommentIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
