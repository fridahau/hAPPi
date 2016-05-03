(function() {

  var output = document.querySelector('#output');
  var input = document.querySelector('#input');
  var button = document.querySelector('#button');
  var avatar = document.querySelector('#avatar');
  var presence = document.querySelector('#presence');
  var geolocation = document.querySelector('#geolocation');
  var channel = 'mchat';

  // Assign a random avatar in random color
  if (avatar!=null){
      avatar.className = 'face-' + ((Math.random() * 13 + 1) >>> 0) + ' color-' + ((Math.random() * 10 + 1) >>> 0);
  }
  

  var p = PUBNUB.init({
    subscribe_key: 'sub-c-9f3447de-105e-11e6-bb6c-02ee2ddab7fe',
    publish_key: 'pub-c-5d54bf3a-2c7f-4505-9007-e6b0f27c9790'
  });
// pub-c-ce04f67b-0f26-43ce-8be2-192e9821d1a3
// sub-c-182105ac-0001-11e5-8fd4-0619f8945a4f
  
  console.log(p);

  p.subscribe({
    channel: channel,
    callback: function(m) {
      output.innerHTML = '<p><i class="' + m.avatar + '"></i><span>' + m.text.replace(/[<>]/ig, '') + '</span></p>' + output.innerHTML;
    },
    presence: function(m) {
      if (m.occupancy > 1) {
        presence.textContent = m.occupancy + ' people online';
      } else {
        presence.textContent = 'Nobody else is online';
      }
    }
  });

  p.bind('keyup', input, function(e) {
    (e.keyCode || e.charCode) === 13 && publish()
  });

  p.bind('click', button, publish);

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

  //function geolocation () {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        console.log('My position is' + lat + ' and ' + lon)

      });

    }
  //}

})();