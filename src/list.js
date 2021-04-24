import Button from "react-bootstrap/Button";


const playlist = (songs) => {
  return (
    <div>
      {songs.map((song) => {
        return (
        <div>
        {song}
        <div>
        <Button onClick={console.log("Hello")}>Add song</Button></div>
        </div>
      )})}
    </div>
  )
};

export default playlist;