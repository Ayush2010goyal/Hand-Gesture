var prediction_1 = "";
var prediction_2 = "";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality: 90
});
    
 camera = document.getElementById("camera");
 Webcam.attach('#camera');

 function take_snapshot(){
 Webcam.snap(function(data_uri){
     document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"></img>';
 });
 }

 console.log( 'ml5 version:', ml5.version);

 classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/CZEIGvEYt/model.json',ModelLoaded);

 function ModelLoaded(){
     console.log("Model Loaded!");
 }

 function speak(){
     var synth = window.speechSynthesis;
     speak_1="The First Prediction Is "+ prediction_1;
     speak_2="The Second Prediction Is "+ prediction_2;
     var utterThis=new SpeechSynthesisUtterance(speak_1+speak_2);
     utterThis.rate=0.5;
     synth.speak(utterThis);
 }

 function check(){
     img=document.getElementById("captured_image");
     classifier.classify(img,GotResult);
 }

 function GotResult(error,results){
     if (error){
         console.error(error);
     }
     else{
         console.log(results);
     }
     document.getElementById("result_emotion_name").innerHTML=results[0].label;
     document.getElementById("result_emotion_name2").innerHTML=results[1].label;
     prediction_1=results[0].label;
     prediction_2=results[1].label;
     speak();
     if (results[0].label=="amazing"){
         document.getElementById("update_emoji1").innerHTML="&#128076;";
     }
     if (results[0].label=="best"){
        document.getElementById("update_emoji1").innerHTML="&#128077;";
    }
    if (results[0].label=="victory"){
        document.getElementById("update_emoji1").innerHTML="&#129304;";
    }
    if (results[1].label=="amazing"){
        document.getElementById("update_emoji2").innerHTML="&#128076;";
    }
    if (results[1].label=="best"){
       document.getElementById("update_emoji2").innerHTML="&#128077;";
   }
   if (results[1].label=="victry"){
       document.getElementById("update_emoji2").innerHTML="&#129304;;";
   }
 }
