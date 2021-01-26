import * as React from 'react';
import youtube from 'api/youtube';
import { useParams } from 'react-router-dom';

function Player() {
  const { videoId } = useParams();
  const [video, setVideo] = React.useState({});
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    youtube
      .get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet',
          id: videoId,
          key: process.env.REACT_APP_YOUTUBE_KEY,
        },
      })
      .then((response) => {
        console.log(response);
        setVideo(response.data.items[0]);
      });
  }, [videoId]);

  React.useEffect(() => {
    youtube
      .get('https://www.googleapis.com/youtube/v3/commentThreads', {
        params: {
          part: 'snippet',
          videoId: videoId,
          key: process.env.REACT_APP_YOUTUBE_KEY,
          maxResults: 5,
        },
      })
      .then((response) => {
        console.log(response);
        setComments(response.data.items);
      });
  }, [videoId]);

  return (
    <div id="search-input">
      <h2>Search for a video</h2>
      <div>
        <iframe
          title="Video Title"
          src={`https://www.youtube.com/embed/${videoId}`}
        />
      </div>
      <div>
        <h2>API Response</h2>
        <pre>{JSON.stringify(video, null, 2)}</pre>
      </div>
      <div>
        <h2>Comments</h2>
        <pre>{JSON.stringify(comments, null, 2)}</pre>
      </div>
    </div>
  );
}

export default Player;
