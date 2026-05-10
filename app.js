const getMoodMessage = (value) => {
  if (value <= 25) return 'you are officially cooked, everyone jeeted (buy, buy, buy)';
  if (value <= 45) return "looks like your portfolio is in for a rough ride (that's if you have one kek)";
  if (value <= 55) return 'you can go touch grass, but be on the lookout';
  if (value <= 75) return 'you on a roll baby, we are back!';
  return 'FOMO inna the market';
};

const getMoodColor = (value) => {
  if (value <= 25) return '#1a0000';
  if (value <= 45) return '#1a0a00';
  if (value <= 55) return '#0a0a1a';
  if (value <= 75) return '#001a0a';
  return '#1a1500';
};

const getTimeStamp = (unix) => {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - unix;
  const mins = Math.floor(diff / 60);
  const hours = Math.floor(diff / 3600);

  if (mins < 60) return `updated ${mins} mins ago`;

  if(mins < 120) return `updated ${hours} hour ago`;
  return `updated ${hours} hours ago`;

};

const fetchMood = async () => {

  document.getElementById('loading').classList.remove('hidden');
  document.getElementById('mood-board').classList.add('hidden');
  document.getElementById('avatar-container').classList.add('hidden');

  document.getElementById('avatar-container').style.opacity = '0';
  document.getElementById('mood-board').style.opacity = '0';

  try {

    await new Promise(resolve => setTimeout(resolve, 600));

    const response = await fetch ('https://api.alternative.me/fng/');
    const data = await response.json();

    const value = data.data[0].value;
    const classification = data.data[0].value_classification;
    const timestamp = data.data[0].timestamp;

    document.getElementById('mood-value').innerText = value;
    document.getElementById('mood-label').innerText = classification;
    document.getElementById('mood-message').innerText = getMoodMessage(value);
    document.getElementById('timestamp').innerText = getTimeStamp(timestamp);
    document.body.style.backgroundColor = getMoodColor(value);



    document.getElementById('loading').classList.add('hidden');
    document.getElementById('mood-board').classList.remove('hidden');
    document.getElementById('avatar-container').classList.remove('hidden');

    setTimeout (() => {
      document.getElementById('avatar-container').style.opacity = '1';
      document.getElementById('mood-board').style.opacity = '1';
    }, 50);

    console.log(value, classification, timestamp);


  } catch (error) {
    document.getElementById('loading').innerText = "well, looks like waleswoosh is screenshotting, try again when he's done"
  }
  
}

document.getElementById('refresh-btn').addEventListener('click', fetchMood);

fetchMood();
