import { makeStyles,withStyles } from '@material-ui/core/styles';
import Checkbox from "@material-ui/core/Checkbox";

const GreenCheckbox = withStyles({
  root: {
    
    '&$checked': {
      color: 'green',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);


const useStyles = makeStyles({

//   root: {
//     border: 0,
//     borderRadius: 3,
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     color: 'white',
//     height: 48,
//     padding: '0 30px',
//   },


  checkboxContainer : {
    display:'flex',
    flexDirection:'row',
    justifyContent: 'center',
    alignItems:'center',
    listStyle:'none'
  },

  greenButton: {
    margin:'5px 0px',
    backgroundColor: 'green',
    color: '#000',
    '&:hover': {
        backgroundColor: 'green',
        color: '#000'
    },
    '&:enabled': {
      backgroundColor: 'green',
      color: '#000'
  }
},

  dndContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent: 'center',
    alignItems:'center',
    listStyle:'none',
    height:'auto'
  },

  btnContainer:{
      display: 'flex',
      flexDirection: 'column',
      margin:'0px 40px',
  },
  transferButton:{
      margin: '5px 0px',
  },
  
  navContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'none',
  },
  allSection:{
      width: '100%',
      display: 'flex',
      backgroundColor: 'none',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'flex-start',
      borderBottom: '1px solid rgb(224, 224, 224)',
      '& p':{
               margin: '0px auto',
               fontSize: '14px'
      },
      '& div':{
           marginLeft:'40px',
         } 
  },
//   countLabel{
//       margin: 0px auto;
//       font-size: 14px;
//   },
//   /* .all-section p{
//       margin: 0px auto;
//       font-size: 14px;
//   } */
//   /* .all-section div{
//     margin-left:20px
// } */
  checkboxes:{
      backgroundColor: 'none',
      width: '200px',
      height: '100%',
      minHeight:'100vh',
      border: '1px solid rgb(224, 224, 224)'
  },
  container:{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      backgroundColor: 'none',
      width: 'auto',
      
      '& li':{
        backgroundColor: 'none',
        width: 'auto',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
  },
  checkbox_style :{
   
      //margin:'0px 5px',
      marginRight:'10px',
      //checked
  },
//container  
//   /* ul li label{
//       margin: 0px 15px;
//   } */
//   titleLabel{
//     margin: 0px 15px;
//   },
checkbox_color:{
  color:'red'
},
  dragContainer:{
    /* border-bottom: 1px solid black; */
    margin: '0px auto',
    //width: '600px'
},
 loader:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end'
} 

});



export default useStyles;
export {
  GreenCheckbox
}