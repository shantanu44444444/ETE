var prediction_1 = "";
var prediction_2 = "";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90,
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML = '<img id="captured_img" src="' + data_uri + '">';
    });
}

console.log('ml5 version : ' , ml5.version);

var classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Ju96bFLt1/model.json',modelLoaded);

function modelLoaded(){
    console.log(" Model Loaded");
}

function speak(){
var synth = window.speechSynthesis;
var speak_data_1 = " The First prediction is " + prediction_1;
var speak_data_2 = " The Second prediction is " + prediction_2;

var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);

synth.speak(utterThis);

}

function check(){
    img = document.getElementById('captured_img');
    classifier.classify(img, gotResult);
}

function gotResult(error, result){
    if (error){
       console.error(error);
    }
    else{
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML = result[0].label;
        document.getElementById("result_emotion_name2").innerHTML = result[1].label;
        prediction_1 = result[0].label;
        prediction_2 = result[1].label;
        speak();

        if(result[0].label == "happy"){
            document.getElementById("update_emoji").innerHTML = "&#128522;";
        }

        if(result[0].label == "sad"){
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }

        if(result[0].label == "angry"){
            document.getElementById("update_emoji").innerHTML = "&#128545;";
        }

        if(result[0].label == "thinking"){
            document.getElementById("update_emoji").innerHTML = "&#129300;";
        }

        if(result[1].label == "happy"){
            document.getElementById("update_emoji2").innerHTML = "&#128522;";
        }

        if(result[1].label == "sad"){
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
        }

        if(result[1].label == "angry"){
            document.getElementById("update_emoji2").innerHTML = "&#128545;";
        }

        if(result[1].label == "thinking"){
            document.getElementById("update_emoji2").innerHTML = "&#129300;";
        }
    }
}