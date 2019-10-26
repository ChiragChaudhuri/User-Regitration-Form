import React from 'react';
import './App.css';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBWa-9R_3OHXzSnQFUOfifM_XYIy-89VmQ",
  authDomain: "registration-form-49ebc.firebaseapp.com",
  databaseURL: "https://registration-form-49ebc.firebaseio.com",
  projectId: "registration-form-49ebc",
  storageBucket: "registration-form-49ebc.appspot.com",
  messagingSenderId: "941840738856",
  appId: "1:941840738856:web:07631a95022e3f14bee31d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class User extends React.Component
{

    constructor(props)
   {
      super(props);
      this.state={
          fname:"",
          fullname:"",
          dob:"",
        address:"",
        avatar:null,
        number:""
      };
    }
    handleFile=(e)=>{this.setState({avatar:e.target.files[0]});
  }
    addUser = (e) => {
      //e.preventDefault();
      const db = firebase.firestore();
      console.log('db', db);
      db.collection("Student").add({
        Name: this.state.fullname,
        Address: this.state.address,
        DOB:this.state.dob,
        Fathers_Name:this.state.fname,
        Phone_No:this.state.number,
      }).then((docref) => {
        console.log('docref',docref.id);
        storage.ref().child('images').put(this.state.avatar).then((snapshot)=>{snapshot.ref.getDownloadURL().then((url)=>db.collection("Student").doc(docref.id).set({url:url},{merge:true})
        )});
      }).catch((error) => {
        console.log("error", error);
      });
      this.setState({fullname:"",
           dob:"",
           email:"",
           address:"",
           number:"",
           fname:"",
           avatar:null
    });
      var storage=firebase.storage();
        //db.doc('1').set({})
    }
     setData=(e)=>{
      this.setState({[e.target.name]:e.target.value});
     }
  render(){
  return (
    <div className="Table">
            Name :
              <input
            type="text"
            name="fullname"
            placeholder="Enter your Full name"
            onChange={this.setData}
            value={this.state.fullname}
                />
          <br/> 
            Address :
           <input
            type="text"
            name="address"
            placeholder="Enter your address"
            onChange={this.setData}
            value={this.state.address}
            />
            <br/>
             Phone No:
           <input
            type="text"
            name="number"
            placeholder="Enter your phone number"
            onChange={this.setData}
            value={this.state.number}
            />
            <br/>
            DOB:
           <input
            type="text"
            name="dob"
            placeholder="Enter the date"
            onChange={this.setData}
            value={this.state.dob}
            />
            <br/>
             Father's Name:
           <input
            type="text"
            name="fname"
            placeholder="Enter the name"
            onChange={this.setData}
            value={this.state.fname}
            />
            <br/>
            <input type="file" onChange={this.handleFile}/><br/>
           <input type="button" value="submit" onClick={this.addUser} />
          </div>
      );
  }
}
export default User;