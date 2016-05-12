(function() {
  
  var output = document.querySelector('#output');

  //var input = document.querySelector('#master');

  var input = document.querySelector('#input');
  var button = document.querySelector('#button');
  var avatar = document.querySelector('#avatar');
  var presence = document.querySelector('#presence');
  var channel = 'north';
  var activeChat='north';
  var orientation = "true";
  document.querySelector('#activeChat').innerHTML= activeChat;
  

  // Assign a random avatar in random color
  if (avatar!=null){


      avatar.className = 'face-' + ((Math.random() * 13 + 1) >>> 0) + ' color-' + ((Math.random() * 10 + 1) >>> 0);
  }
  
  var p = PUBNUB.init({
    subscribe_key: 'sub-c-df282052-110a-11e6-a9bb-02ee2ddab7fe',
    publish_key: 'pub-c-4b0a6fc4-cc59-4b22-9e59-bc0a0f595a00'
  });
  
function subscribe(){

    p.subscribe({
      // vi byter ut kanelerna som beror på west/söder
      channel: channel,
      callback: function(m) {

        var content= '<p> <i class="' + m.avatar + '"></i><span>' + m.text.replace(/[<>]/ig, '') + '</span></p>';

        output.innerHTML=content + output.innerHTML
        
      },
    });
  }

    p.bind('keyup', input, function(e) {
      (e.keyCode || e.charCode) === 13 && publish()
    });

    p.bind('click', button, publish);


function unsubscribe(){
  
  p.unsubscribe({

  channel : channel,
  });
  output.innerHTML=""
};
  function publish() {
    p.publish({
      channel: channel,
      message: {  
        avatar: avatar.className,
        text: input.value
      },
      x: (input.value = '')
    });
  }

function changeChannel (currentChannel){
  if (currentChannel!=channel){
    unsubscribe()
    channel = currentChannel
    subscribe()   
    activeChat=channel
    document.querySelector('#activeChat').innerHTML= activeChat; 

  }
}
  window.addEventListener('deviceorientation', OrientationListener);



  function OrientationListener(data){
    if (orientation == "true"){
      if (data.alpha > 0 && data.alpha < 90 ){
        currentChannel= "west"
        
      };
      if(data.alpha >=90 && data.alpha < 180){
        currentChannel= "east"
      };
      if(data.alpha >= 180 && data.alpha < 270){
        currentChannel= "south"  
      };
      if (data.alpha >= 270 && data.alpha <= 360){
        currentChannel= "north"
      };
      changeChannel(currentChannel)
    }
  }

function master(){
  orientation="false"
  currentChannel=["west", "east", "north", "south"]
  changeChannel(currentChannel)
  
};

function orient(){
  orientation="true"
};
document.getElementById("masterButton").addEventListener("click",master);
document.getElementById("orientationButton").addEventListener("click",orient);
})();