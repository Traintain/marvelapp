import MD5 from "crypto-js/md5";
const { useState, useEffect } = require("react");

function Characters() {
  const [character, setCharacter] = useState("");

  let timeStamp = "1";
  let privateKey = "7a009ac896faba29b84b64823e5f0225a248eab0";
  let publicKey = "3f15027c4461d6a7da0dcfe655338be6";
  let hash = MD5(timeStamp + privateKey + publicKey).toString();
  let key = "ts=" + timeStamp + "&apikey=" + publicKey + "&hash=" + hash;
  let url = "https://gateway.marvel.com/v1/public/characters?" + key;

  useEffect(() => {
    if (!navigator.onLine) {
      console.log("No connection");
      if (localStorage.getItem("characters") === null) {
        setCharacter("Loading");
      } else {
        setCharacter(localStorage.getItem("characters"));
      }
    } else {
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          console.log("response", res.data.results);

          setCharacter(res.data.results[0].name);
          localStorage.setItem("characters", res.data.results[0].name);
          console.log("character", character);
        });
    }
  }, []);

  return <div>{character}</div>;
}

export default Characters;
