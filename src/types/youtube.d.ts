/**
 * **YouTube Data API v3**
 * 
 * All the names follow the official docs that can be found here:
 * https://developers.google.com/youtube/v3/docs
 * 
 */
declare namespace YT {


  /**
   * **Search Result**
   * 
   * A search result contains information about a YouTube video, channel, or playlist 
   * that matches the search parameters specified in an API request. 
   */
  export interface SearchResult {
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
      description: string;
      thumbnails: {
        default: {
          url: string;
          width: number;
          height: number;
        };
      };
    };
  }

  /**
   * **Search Result: list Response**
   *
   * Response body for the following request:
   * ```
   * GET https://www.googleapis.com/youtube/v3/search
   * ```
   */
  export interface SearchResultListResponse {
    items: SearchResult[];
  }

  /**
   * **Comment**
   *
   * A comment resource contains information about a single YouTube comment.
   */
  export interface Comment {
    id: string;
    snippet: {
      authorDisplayName: string;
      authorProfileImageUrl: string;
      authorChannelUrl: string;
      textOriginal: string;
      publishedAt: Date;
    };
  }

  /**
   * **Comment Thread**
   *
   * Contains information about a top-level comment and replies,
   * if any exist, to that comment.
   *
   * Can represent comments about either a video or a channel.
   */
  export interface CommentThread {
    id: string;
    snippet: {
      channelId: string;
      videoId: string;
      topLevelComment: Comment;
    };
  }

  /**
   * **Comment Threads: list Response**
   *
   * Response body for the following request:
   * ```
   * GET https://www.googleapis.com/youtube/v3/commentThreads
   * ```
   */
  export interface CommentThreadListResponse {
    items: CommentThread[];
  }
}
