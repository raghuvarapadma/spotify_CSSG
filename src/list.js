import Button from "react-bootstrap/Button";

const songs = 
[<iframe src="https://open.spotify.com/embed/track/6MdqqkQ8sSC0WB4i8PyRuQ" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>,
<iframe src="https://open.spotify.com/embed/track/0RnDu3eYJqbFKz6MHv2ajd" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>,
<iframe src="https://open.spotify.com/embed/track/6zsk6uF3MxfIeHPlubKBvR" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>,
<iframe src="https://open.spotify.com/embed/track/2PpruBYCo4H7WOBJ7Q2EwM" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>,
<iframe src="https://open.spotify.com/embed/track/3SwlakM6VX47IwG0Wll5ek" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>]


const playlist = () => {
  return (
    <div className="container">
      {songs.map((song) => {
        return (
        <div>
         <Button onClick={console.log}>Add song</Button>
         {song}
        <Button onClick={console.log}>Delete song</Button>
        </div>
      )})}
    </div>
  )
};

export default playlist;