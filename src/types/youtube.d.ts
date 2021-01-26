declare namespace YT {
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
   * Response body with for the following API endpoint:
   * ```
   * GET https://www.googleapis.com/youtube/v3/commentThreads
   * ```
   *
   */
  export interface CommentThreadListResponse {
    items: CommentThread[];
  }
}
