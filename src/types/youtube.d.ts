/**
 * **YouTube Data API v3**
 *
 * All the names follow the official docs that can be found here:
 * https://developers.google.com/youtube/v3/docs
 *
 */
declare namespace YT {

  /**
   * **Thumbnail**
   * 
   * Object that contains information about the video thumbnail.
   */
  export interface Thumbnail {
    url: string;
    width: number;
    height: number;
  }

  /**
   * **Thumbnails**
   * 
   * A map of thumbnail images associated with the video.
   */
  export interface Thumbnails {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard: Thumbnail;
    maxres: Thumbnail;
  }

  /**
   * **Video**
   *
   * A video resource represents a YouTube video.
   */
  export interface Video {
    id: string;
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: Thumbnails;
    };
  }

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
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: Thumbnails;
      channelTitle: string;
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
