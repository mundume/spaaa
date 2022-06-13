// const Handlebars = require("handlebars");
    

////////////////FIREBASE IMPLEMENTATION////////////////////

const firebaseConfig = {

    apiKey: "AIzaSyA9RItsy7nHqB2yccFCj5Vihto6PgDy89w",

    authDomain: "cinammon-e2da5.firebaseapp.com",

    projectId: "cinammon-e2da5",

    storageBucket: "cinammon-e2da5.appspot.com",

    messagingSenderId: "213742032348",

    appId: "1:213742032348:web:f1d16ea72bfc9886f1ab19"

  };


firebase. initializeApp(firebaseConfig);
var firestore = firebase.firestore();


function writeData() {
    firestore.collection('feedback').doc().set( {
            // Email: document.getElementById("email").value,
            Name: document.getElementById("name").value,
        Message: document.getElementById("my-message").value,
            // Subject: document.getElementById("subject").value,
        }

    ).then(()=> {
        console.log('Completed')
        getReviews();
        // document.getElementById("email").value = '';
    document.getElementById("name").value = '';
    document.getElementById("my-message").value = '';
    // document.getElementById("subject").value = '';
        alert('Thank you for your feedback');
       

    }).catch((e) => {
        console.log(e);
    });
}

let submit = document.getElementById("submit-review");


submit.addEventListener("click", async (e) => {
    
    e.preventDefault();



   if( document.getElementById("name").value!=''&&
       document.getElementById("my-message").value!='') {
       writeData();
       
       
   } else {
       alert('Please fill all the fields');
   
       
    
        };
    
   
 
    



});



function getReviews() {
    let data = {
        list:[]
    };
    
    firestore.collection('feedback').limit(10).get().then((value) => {
        value.forEach((e) => {
            data['list'].unshift({
                
                    Message: e.data().Message,
                Name: e.data().Name,
                    Email: e.data().Email,
                });
        });
            
            console.log(data);
            var template = Handlebars.compile(document.querySelector("#list-template").innerHTML);
            var filled = template(data);
        
            document.querySelector("#get-reviews").innerHTML=filled;           


        
    }).catch((e) => {
        console.log(e);
    });
    console.log('Reviews generated Successfuly');

}

window.addEventListener("load", (e) => {
    
   

    
    
    getReviews();
})