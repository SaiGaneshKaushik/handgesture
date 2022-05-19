Webcam.set({
                    width: 350,
                    heigth:300,
                    image_format:"png",
                    png_quality:90
               
               });
               camera = document.getElementById("camera");
               Webcam.attach("#camera");
               
               function take_snapshot()
               {
                    Webcam.snap(
                        function(data_uri)
                        {
                              document.getElementById("result").innerHTML="<img id='captured_image' src='"+data_uri+"'>";
                        }
                    );
               }
               
               console.log("ml5 version-",ml5.version);
               classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/5pz4_GuqP/model.json",modelLoded);
               
               function modelLoded()
               {
                   console.log("model loaded");
               }
               
               function speak(){
               var synth= window.speechSynthesis;
               speak_data_1 = "the first prediction is "+hand_gesture1;
               speak_data_2 = "and the second prediction is "+hand_gesture2;
               var utterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
               synth.speak(utterThis);
               }

               function check()
               {
                   img = document.getElementById("captured_image");
                   classifier.classify(img, gotResults);
               }
               function gotResults(error, results)
               {
                   if(error)
                   {
                       console.log(error);
                   }
                   else{
                       console.log(results);
                       document.getElementById("hand_gesture1").innerHTML= results[0].label;
                       document.getElementById("hand_gesture2").innerHTML= results[1].label;

                       hand_gesture1 = results[0].label;
                       hand_gesture2 = results[1].label;
                       speak();

      if(results[0].label=="best")
      {
          document.getElementById("uptade_gesture1").innerHTML="&#128077;";
      }
      if(results[0].label=="amazing")
      {
          document.getElementById("uptade_gesture1").innerHTML="&#128076;";
      }
      if(results[0].label=="victory")
      {
          document.getElementById("uptade_gesture1").innerHTML="&#9996;";
      }

      if(results[1].label=="best")
      {
          document.getElementById("uptade_gesture2").innerHTML="&#128077;";
      }
      if(results[1].label=="amazing")
      {
          document.getElementById("uptade_gesture2").innerHTML="&#128076;";
      }
      if(results[1].label=="victory")
      {
          document.getElementById("uptade_gesture2").innerHTML="&#9996;";
      }
                   }
               }