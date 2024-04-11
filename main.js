Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' );

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/0y3-_mXh0/model.json',modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "the first prediction is "+ prediction_1;
    speak_data_2 = " And the seconed prediction is "+ prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        document.getElementById("result_hand_gestures").innerHTML = result[0].label;
        document.getElementById("result_hand_gestures2").innerHTML = result[1].label;
        prediction_1 = result[0].label;
        prediction_2 = result[1].label;
        speak();
        if(result[0].label == "Perfect")
        {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        if(result[0].label == "Victory")
        {
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
        if(result[0].label == "Peace")
        {
            document.getElementById("update_emoji").innerHTML = "&#9994;";
        }
        if(result[1].label == "Perfect")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128076;";
        }
        if(result[1].label == "Victory")
        {
            document.getElementById("update_emoji2").innerHTML = "&#9996;";
        }
        if(result[1].label == "Peace")
        {
            document.getElementById("update_emoji2").innerHTML = "&#9994;";
        }
    }
}