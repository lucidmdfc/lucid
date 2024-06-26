import type { Connection, Post, Profile } from 'src/types/template-types/social';
import { deepCopy } from 'src/utils/deep-copy';
import { connections, feed, posts, profile } from './data';

type GetProfileRequest = void;

type GetProfileResponse = Promise<Profile>;

type GetConnectionsRequest = object;

type GetConnectionsResponse = Promise<Connection[]>;

type GetPostsRequest = object;

type GetPostsResponse = Promise<Post[]>;

type GetFeedRequest = object;

type GetFeedResponse = Promise<Post[]>;

class SocialApi {
  getProfile(request?: GetProfileRequest): GetProfileResponse {
    return Promise.resolve(deepCopy(profile));
  }

  getConnections(request?: GetConnectionsRequest): GetConnectionsResponse {
    return Promise.resolve(deepCopy(connections));
  }

  getPosts(request?: GetPostsRequest): GetPostsResponse {
    return Promise.resolve(deepCopy(posts));
  }

  getFeed(request?: GetFeedRequest): GetFeedResponse {
    return Promise.resolve(deepCopy(feed));
  }
}

export const socialApi = new SocialApi();
