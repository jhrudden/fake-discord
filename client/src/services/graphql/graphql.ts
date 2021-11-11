import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};


export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type Message = {
  __typename?: 'Message';
  messageId: Scalars['String'];
  datePosted: Scalars['DateTime'];
  content: Scalars['String'];
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  message: Message;
  author: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  killInvite: Scalars['Boolean'];
  createServerInvite?: Maybe<ServerInvite>;
  postMessageToServer: Scalars['Boolean'];
  deleteMessageFromServer: Scalars['Boolean'];
  createServer: Scalars['Boolean'];
  addUserToServer: Scalars['Boolean'];
  deleteUserFromServer: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  revokeRefreshToken: Scalars['Boolean'];
  login: LoginResponse;
  register: Scalars['Boolean'];
};


export type MutationKillInviteArgs = {
  inviteUrl: Scalars['String'];
};


export type MutationCreateServerInviteArgs = {
  serverId: Scalars['String'];
};


export type MutationPostMessageToServerArgs = {
  content: Scalars['String'];
  serverId: Scalars['String'];
};


export type MutationDeleteMessageFromServerArgs = {
  messageId: Scalars['String'];
  serverId: Scalars['String'];
};


export type MutationCreateServerArgs = {
  serverName: Scalars['String'];
};


export type MutationAddUserToServerArgs = {
  serverId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationDeleteUserFromServerArgs = {
  serverId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationRevokeRefreshTokenArgs = {
  userId: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getValidInvite?: Maybe<ServerInvite>;
  userMessages: Array<Message>;
  serverMessages: Array<MessageResponse>;
  getServerInfo?: Maybe<ServerInfo>;
  usersOnServer: Array<User>;
  servers: Array<Server>;
  users: Array<User>;
  me?: Maybe<User>;
};


export type QueryGetValidInviteArgs = {
  inviteUrl: Scalars['String'];
};


export type QueryUserMessagesArgs = {
  userId?: Maybe<Scalars['String']>;
  serverId: Scalars['String'];
};


export type QueryServerMessagesArgs = {
  serverId: Scalars['String'];
};


export type QueryGetServerInfoArgs = {
  serverId: Scalars['String'];
};


export type QueryUsersOnServerArgs = {
  serverId: Scalars['String'];
};


export type QueryServersArgs = {
  userId: Scalars['String'];
};

export type Server = {
  __typename?: 'Server';
  id: Scalars['String'];
  serverName: Scalars['String'];
};

export type ServerInfo = {
  __typename?: 'ServerInfo';
  serverName: Scalars['String'];
};

export type ServerInvite = {
  __typename?: 'ServerInvite';
  url: Scalars['String'];
  created_at: Scalars['DateTime'];
  serverId: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newServerMessage: MessageResponse;
  deleteServerMessage: MessageResponse;
  newServerUser: User;
  deleteServerUser: User;
};


export type SubscriptionNewServerMessageArgs = {
  serverId: Scalars['String'];
};


export type SubscriptionDeleteServerMessageArgs = {
  serverId: Scalars['String'];
};


export type SubscriptionNewServerUserArgs = {
  serverId: Scalars['String'];
};


export type SubscriptionDeleteServerUserArgs = {
  serverId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  tokenVersion: Scalars['Int'];
};

export type CreateServerInviteMutationVariables = Exact<{
  serverId: Scalars['String'];
}>;


export type CreateServerInviteMutation = { __typename?: 'Mutation', createServerInvite?: Maybe<{ __typename?: 'ServerInvite', url: string }> };

export type GetValidInviteQueryVariables = Exact<{
  inviteUrl: Scalars['String'];
}>;


export type GetValidInviteQuery = { __typename?: 'Query', getValidInvite?: Maybe<{ __typename?: 'ServerInvite', serverId: string }> };

export type ServerMessagesQueryVariables = Exact<{
  serverId: Scalars['String'];
}>;


export type ServerMessagesQuery = { __typename?: 'Query', serverMessages: Array<{ __typename?: 'MessageResponse', message: { __typename?: 'Message', content: string, messageId: string, datePosted: any }, author: { __typename?: 'User', id: string, username: string } }> };

export type PostMessageToServerMutationVariables = Exact<{
  serverId: Scalars['String'];
  content: Scalars['String'];
}>;


export type PostMessageToServerMutation = { __typename?: 'Mutation', postMessageToServer: boolean };

export type DeleteMessageFromServerMutationVariables = Exact<{
  messageId: Scalars['String'];
  serverId: Scalars['String'];
}>;


export type DeleteMessageFromServerMutation = { __typename?: 'Mutation', deleteMessageFromServer: boolean };

export type DeleteServerMessageSubscriptionVariables = Exact<{
  serverId: Scalars['String'];
}>;


export type DeleteServerMessageSubscription = { __typename?: 'Subscription', deleteServerMessage: { __typename?: 'MessageResponse', message: { __typename?: 'Message', content: string, messageId: string, datePosted: any }, author: { __typename?: 'User', id: string, username: string } } };

export type NewServerMessageSubscriptionVariables = Exact<{
  serverId: Scalars['String'];
}>;


export type NewServerMessageSubscription = { __typename?: 'Subscription', newServerMessage: { __typename?: 'MessageResponse', message: { __typename?: 'Message', content: string, messageId: string, datePosted: any }, author: { __typename?: 'User', id: string, username: string } } };

export type CreateServerMutationVariables = Exact<{
  serverName: Scalars['String'];
}>;


export type CreateServerMutation = { __typename?: 'Mutation', createServer: boolean };

export type ServersQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type ServersQuery = { __typename?: 'Query', servers: Array<{ __typename?: 'Server', id: string, serverName: string }> };

export type GetServerInfoQueryVariables = Exact<{
  serverId: Scalars['String'];
}>;


export type GetServerInfoQuery = { __typename?: 'Query', getServerInfo?: Maybe<{ __typename?: 'ServerInfo', serverName: string }> };

export type UsersOnServerQueryVariables = Exact<{
  serverId: Scalars['String'];
}>;


export type UsersOnServerQuery = { __typename?: 'Query', usersOnServer: Array<{ __typename?: 'User', username: string, id: string }> };

export type NewServerUserSubscriptionVariables = Exact<{
  serverId: Scalars['String'];
}>;


export type NewServerUserSubscription = { __typename?: 'Subscription', newServerUser: { __typename?: 'User', username: string, id: string } };

export type DeleteServerUserSubscriptionVariables = Exact<{
  serverId: Scalars['String'];
}>;


export type DeleteServerUserSubscription = { __typename?: 'Subscription', deleteServerUser: { __typename?: 'User', username: string, id: string } };

export type AddUserToServerMutationVariables = Exact<{
  serverId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type AddUserToServerMutation = { __typename?: 'Mutation', addUserToServer: boolean };

export type DeleteServerFromUserMutationVariables = Exact<{
  serverId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type DeleteServerFromUserMutation = { __typename?: 'Mutation', deleteUserFromServer: boolean };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', email: string, username: string, id: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: string, email: string, username: string }> };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RevokeRefreshTokenMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type RevokeRefreshTokenMutation = { __typename?: 'Mutation', revokeRefreshToken: boolean };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string, user: { __typename?: 'User', id: string, email: string, username: string } } };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: boolean };


export const CreateServerInviteDocument = gql`
    mutation CreateServerInvite($serverId: String!) {
  createServerInvite(serverId: $serverId) {
    url
  }
}
    `;
export type CreateServerInviteMutationFn = Apollo.MutationFunction<CreateServerInviteMutation, CreateServerInviteMutationVariables>;

/**
 * __useCreateServerInviteMutation__
 *
 * To run a mutation, you first call `useCreateServerInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateServerInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createServerInviteMutation, { data, loading, error }] = useCreateServerInviteMutation({
 *   variables: {
 *      serverId: // value for 'serverId'
 *   },
 * });
 */
export function useCreateServerInviteMutation(baseOptions?: Apollo.MutationHookOptions<CreateServerInviteMutation, CreateServerInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateServerInviteMutation, CreateServerInviteMutationVariables>(CreateServerInviteDocument, options);
      }
export type CreateServerInviteMutationHookResult = ReturnType<typeof useCreateServerInviteMutation>;
export type CreateServerInviteMutationResult = Apollo.MutationResult<CreateServerInviteMutation>;
export type CreateServerInviteMutationOptions = Apollo.BaseMutationOptions<CreateServerInviteMutation, CreateServerInviteMutationVariables>;
export const GetValidInviteDocument = gql`
    query GetValidInvite($inviteUrl: String!) {
  getValidInvite(inviteUrl: $inviteUrl) {
    serverId
  }
}
    `;

/**
 * __useGetValidInviteQuery__
 *
 * To run a query within a React component, call `useGetValidInviteQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetValidInviteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetValidInviteQuery({
 *   variables: {
 *      inviteUrl: // value for 'inviteUrl'
 *   },
 * });
 */
export function useGetValidInviteQuery(baseOptions: Apollo.QueryHookOptions<GetValidInviteQuery, GetValidInviteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetValidInviteQuery, GetValidInviteQueryVariables>(GetValidInviteDocument, options);
      }
export function useGetValidInviteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetValidInviteQuery, GetValidInviteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetValidInviteQuery, GetValidInviteQueryVariables>(GetValidInviteDocument, options);
        }
export type GetValidInviteQueryHookResult = ReturnType<typeof useGetValidInviteQuery>;
export type GetValidInviteLazyQueryHookResult = ReturnType<typeof useGetValidInviteLazyQuery>;
export type GetValidInviteQueryResult = Apollo.QueryResult<GetValidInviteQuery, GetValidInviteQueryVariables>;
export const ServerMessagesDocument = gql`
    query ServerMessages($serverId: String!) {
  serverMessages(serverId: $serverId) {
    message {
      content
      messageId
      datePosted
    }
    author {
      id
      username
    }
  }
}
    `;

/**
 * __useServerMessagesQuery__
 *
 * To run a query within a React component, call `useServerMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useServerMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServerMessagesQuery({
 *   variables: {
 *      serverId: // value for 'serverId'
 *   },
 * });
 */
export function useServerMessagesQuery(baseOptions: Apollo.QueryHookOptions<ServerMessagesQuery, ServerMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ServerMessagesQuery, ServerMessagesQueryVariables>(ServerMessagesDocument, options);
      }
export function useServerMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ServerMessagesQuery, ServerMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ServerMessagesQuery, ServerMessagesQueryVariables>(ServerMessagesDocument, options);
        }
export type ServerMessagesQueryHookResult = ReturnType<typeof useServerMessagesQuery>;
export type ServerMessagesLazyQueryHookResult = ReturnType<typeof useServerMessagesLazyQuery>;
export type ServerMessagesQueryResult = Apollo.QueryResult<ServerMessagesQuery, ServerMessagesQueryVariables>;
export const PostMessageToServerDocument = gql`
    mutation PostMessageToServer($serverId: String!, $content: String!) {
  postMessageToServer(serverId: $serverId, content: $content)
}
    `;
export type PostMessageToServerMutationFn = Apollo.MutationFunction<PostMessageToServerMutation, PostMessageToServerMutationVariables>;

/**
 * __usePostMessageToServerMutation__
 *
 * To run a mutation, you first call `usePostMessageToServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostMessageToServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postMessageToServerMutation, { data, loading, error }] = usePostMessageToServerMutation({
 *   variables: {
 *      serverId: // value for 'serverId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function usePostMessageToServerMutation(baseOptions?: Apollo.MutationHookOptions<PostMessageToServerMutation, PostMessageToServerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostMessageToServerMutation, PostMessageToServerMutationVariables>(PostMessageToServerDocument, options);
      }
export type PostMessageToServerMutationHookResult = ReturnType<typeof usePostMessageToServerMutation>;
export type PostMessageToServerMutationResult = Apollo.MutationResult<PostMessageToServerMutation>;
export type PostMessageToServerMutationOptions = Apollo.BaseMutationOptions<PostMessageToServerMutation, PostMessageToServerMutationVariables>;
export const DeleteMessageFromServerDocument = gql`
    mutation DeleteMessageFromServer($messageId: String!, $serverId: String!) {
  deleteMessageFromServer(messageId: $messageId, serverId: $serverId)
}
    `;
export type DeleteMessageFromServerMutationFn = Apollo.MutationFunction<DeleteMessageFromServerMutation, DeleteMessageFromServerMutationVariables>;

/**
 * __useDeleteMessageFromServerMutation__
 *
 * To run a mutation, you first call `useDeleteMessageFromServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageFromServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageFromServerMutation, { data, loading, error }] = useDeleteMessageFromServerMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *      serverId: // value for 'serverId'
 *   },
 * });
 */
export function useDeleteMessageFromServerMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMessageFromServerMutation, DeleteMessageFromServerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMessageFromServerMutation, DeleteMessageFromServerMutationVariables>(DeleteMessageFromServerDocument, options);
      }
export type DeleteMessageFromServerMutationHookResult = ReturnType<typeof useDeleteMessageFromServerMutation>;
export type DeleteMessageFromServerMutationResult = Apollo.MutationResult<DeleteMessageFromServerMutation>;
export type DeleteMessageFromServerMutationOptions = Apollo.BaseMutationOptions<DeleteMessageFromServerMutation, DeleteMessageFromServerMutationVariables>;
export const DeleteServerMessageDocument = gql`
    subscription DeleteServerMessage($serverId: String!) {
  deleteServerMessage(serverId: $serverId) {
    message {
      content
      messageId
      datePosted
    }
    author {
      id
      username
    }
  }
}
    `;

/**
 * __useDeleteServerMessageSubscription__
 *
 * To run a query within a React component, call `useDeleteServerMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useDeleteServerMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeleteServerMessageSubscription({
 *   variables: {
 *      serverId: // value for 'serverId'
 *   },
 * });
 */
export function useDeleteServerMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<DeleteServerMessageSubscription, DeleteServerMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<DeleteServerMessageSubscription, DeleteServerMessageSubscriptionVariables>(DeleteServerMessageDocument, options);
      }
export type DeleteServerMessageSubscriptionHookResult = ReturnType<typeof useDeleteServerMessageSubscription>;
export type DeleteServerMessageSubscriptionResult = Apollo.SubscriptionResult<DeleteServerMessageSubscription>;
export const NewServerMessageDocument = gql`
    subscription NewServerMessage($serverId: String!) {
  newServerMessage(serverId: $serverId) {
    message {
      content
      messageId
      datePosted
    }
    author {
      id
      username
    }
  }
}
    `;

/**
 * __useNewServerMessageSubscription__
 *
 * To run a query within a React component, call `useNewServerMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewServerMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewServerMessageSubscription({
 *   variables: {
 *      serverId: // value for 'serverId'
 *   },
 * });
 */
export function useNewServerMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewServerMessageSubscription, NewServerMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewServerMessageSubscription, NewServerMessageSubscriptionVariables>(NewServerMessageDocument, options);
      }
export type NewServerMessageSubscriptionHookResult = ReturnType<typeof useNewServerMessageSubscription>;
export type NewServerMessageSubscriptionResult = Apollo.SubscriptionResult<NewServerMessageSubscription>;
export const CreateServerDocument = gql`
    mutation CreateServer($serverName: String!) {
  createServer(serverName: $serverName)
}
    `;
export type CreateServerMutationFn = Apollo.MutationFunction<CreateServerMutation, CreateServerMutationVariables>;

/**
 * __useCreateServerMutation__
 *
 * To run a mutation, you first call `useCreateServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createServerMutation, { data, loading, error }] = useCreateServerMutation({
 *   variables: {
 *      serverName: // value for 'serverName'
 *   },
 * });
 */
export function useCreateServerMutation(baseOptions?: Apollo.MutationHookOptions<CreateServerMutation, CreateServerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateServerMutation, CreateServerMutationVariables>(CreateServerDocument, options);
      }
export type CreateServerMutationHookResult = ReturnType<typeof useCreateServerMutation>;
export type CreateServerMutationResult = Apollo.MutationResult<CreateServerMutation>;
export type CreateServerMutationOptions = Apollo.BaseMutationOptions<CreateServerMutation, CreateServerMutationVariables>;
export const ServersDocument = gql`
    query Servers($userId: String!) {
  servers(userId: $userId) {
    id
    serverName
  }
}
    `;

/**
 * __useServersQuery__
 *
 * To run a query within a React component, call `useServersQuery` and pass it any options that fit your needs.
 * When your component renders, `useServersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServersQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useServersQuery(baseOptions: Apollo.QueryHookOptions<ServersQuery, ServersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ServersQuery, ServersQueryVariables>(ServersDocument, options);
      }
export function useServersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ServersQuery, ServersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ServersQuery, ServersQueryVariables>(ServersDocument, options);
        }
export type ServersQueryHookResult = ReturnType<typeof useServersQuery>;
export type ServersLazyQueryHookResult = ReturnType<typeof useServersLazyQuery>;
export type ServersQueryResult = Apollo.QueryResult<ServersQuery, ServersQueryVariables>;
export const GetServerInfoDocument = gql`
    query GetServerInfo($serverId: String!) {
  getServerInfo(serverId: $serverId) {
    serverName
  }
}
    `;

/**
 * __useGetServerInfoQuery__
 *
 * To run a query within a React component, call `useGetServerInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServerInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServerInfoQuery({
 *   variables: {
 *      serverId: // value for 'serverId'
 *   },
 * });
 */
export function useGetServerInfoQuery(baseOptions: Apollo.QueryHookOptions<GetServerInfoQuery, GetServerInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServerInfoQuery, GetServerInfoQueryVariables>(GetServerInfoDocument, options);
      }
export function useGetServerInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServerInfoQuery, GetServerInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServerInfoQuery, GetServerInfoQueryVariables>(GetServerInfoDocument, options);
        }
export type GetServerInfoQueryHookResult = ReturnType<typeof useGetServerInfoQuery>;
export type GetServerInfoLazyQueryHookResult = ReturnType<typeof useGetServerInfoLazyQuery>;
export type GetServerInfoQueryResult = Apollo.QueryResult<GetServerInfoQuery, GetServerInfoQueryVariables>;
export const UsersOnServerDocument = gql`
    query UsersOnServer($serverId: String!) {
  usersOnServer(serverId: $serverId) {
    username
    id
  }
}
    `;

/**
 * __useUsersOnServerQuery__
 *
 * To run a query within a React component, call `useUsersOnServerQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersOnServerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersOnServerQuery({
 *   variables: {
 *      serverId: // value for 'serverId'
 *   },
 * });
 */
export function useUsersOnServerQuery(baseOptions: Apollo.QueryHookOptions<UsersOnServerQuery, UsersOnServerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersOnServerQuery, UsersOnServerQueryVariables>(UsersOnServerDocument, options);
      }
export function useUsersOnServerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersOnServerQuery, UsersOnServerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersOnServerQuery, UsersOnServerQueryVariables>(UsersOnServerDocument, options);
        }
export type UsersOnServerQueryHookResult = ReturnType<typeof useUsersOnServerQuery>;
export type UsersOnServerLazyQueryHookResult = ReturnType<typeof useUsersOnServerLazyQuery>;
export type UsersOnServerQueryResult = Apollo.QueryResult<UsersOnServerQuery, UsersOnServerQueryVariables>;
export const NewServerUserDocument = gql`
    subscription NewServerUser($serverId: String!) {
  newServerUser(serverId: $serverId) {
    username
    id
  }
}
    `;

/**
 * __useNewServerUserSubscription__
 *
 * To run a query within a React component, call `useNewServerUserSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewServerUserSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewServerUserSubscription({
 *   variables: {
 *      serverId: // value for 'serverId'
 *   },
 * });
 */
export function useNewServerUserSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewServerUserSubscription, NewServerUserSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewServerUserSubscription, NewServerUserSubscriptionVariables>(NewServerUserDocument, options);
      }
export type NewServerUserSubscriptionHookResult = ReturnType<typeof useNewServerUserSubscription>;
export type NewServerUserSubscriptionResult = Apollo.SubscriptionResult<NewServerUserSubscription>;
export const DeleteServerUserDocument = gql`
    subscription DeleteServerUser($serverId: String!) {
  deleteServerUser(serverId: $serverId) {
    username
    id
  }
}
    `;

/**
 * __useDeleteServerUserSubscription__
 *
 * To run a query within a React component, call `useDeleteServerUserSubscription` and pass it any options that fit your needs.
 * When your component renders, `useDeleteServerUserSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeleteServerUserSubscription({
 *   variables: {
 *      serverId: // value for 'serverId'
 *   },
 * });
 */
export function useDeleteServerUserSubscription(baseOptions: Apollo.SubscriptionHookOptions<DeleteServerUserSubscription, DeleteServerUserSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<DeleteServerUserSubscription, DeleteServerUserSubscriptionVariables>(DeleteServerUserDocument, options);
      }
export type DeleteServerUserSubscriptionHookResult = ReturnType<typeof useDeleteServerUserSubscription>;
export type DeleteServerUserSubscriptionResult = Apollo.SubscriptionResult<DeleteServerUserSubscription>;
export const AddUserToServerDocument = gql`
    mutation AddUserToServer($serverId: String!, $userId: String!) {
  addUserToServer(serverId: $serverId, userId: $userId)
}
    `;
export type AddUserToServerMutationFn = Apollo.MutationFunction<AddUserToServerMutation, AddUserToServerMutationVariables>;

/**
 * __useAddUserToServerMutation__
 *
 * To run a mutation, you first call `useAddUserToServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserToServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserToServerMutation, { data, loading, error }] = useAddUserToServerMutation({
 *   variables: {
 *      serverId: // value for 'serverId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAddUserToServerMutation(baseOptions?: Apollo.MutationHookOptions<AddUserToServerMutation, AddUserToServerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserToServerMutation, AddUserToServerMutationVariables>(AddUserToServerDocument, options);
      }
export type AddUserToServerMutationHookResult = ReturnType<typeof useAddUserToServerMutation>;
export type AddUserToServerMutationResult = Apollo.MutationResult<AddUserToServerMutation>;
export type AddUserToServerMutationOptions = Apollo.BaseMutationOptions<AddUserToServerMutation, AddUserToServerMutationVariables>;
export const DeleteServerFromUserDocument = gql`
    mutation DeleteServerFromUser($serverId: String!, $userId: String!) {
  deleteUserFromServer(serverId: $serverId, userId: $userId)
}
    `;
export type DeleteServerFromUserMutationFn = Apollo.MutationFunction<DeleteServerFromUserMutation, DeleteServerFromUserMutationVariables>;

/**
 * __useDeleteServerFromUserMutation__
 *
 * To run a mutation, you first call `useDeleteServerFromUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteServerFromUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteServerFromUserMutation, { data, loading, error }] = useDeleteServerFromUserMutation({
 *   variables: {
 *      serverId: // value for 'serverId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteServerFromUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteServerFromUserMutation, DeleteServerFromUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteServerFromUserMutation, DeleteServerFromUserMutationVariables>(DeleteServerFromUserDocument, options);
      }
export type DeleteServerFromUserMutationHookResult = ReturnType<typeof useDeleteServerFromUserMutation>;
export type DeleteServerFromUserMutationResult = Apollo.MutationResult<DeleteServerFromUserMutation>;
export type DeleteServerFromUserMutationOptions = Apollo.BaseMutationOptions<DeleteServerFromUserMutation, DeleteServerFromUserMutationVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    email
    username
    id
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    id
    email
    username
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RevokeRefreshTokenDocument = gql`
    mutation RevokeRefreshToken($userId: String!) {
  revokeRefreshToken(userId: $userId)
}
    `;
export type RevokeRefreshTokenMutationFn = Apollo.MutationFunction<RevokeRefreshTokenMutation, RevokeRefreshTokenMutationVariables>;

/**
 * __useRevokeRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRevokeRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRevokeRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [revokeRefreshTokenMutation, { data, loading, error }] = useRevokeRefreshTokenMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRevokeRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RevokeRefreshTokenMutation, RevokeRefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RevokeRefreshTokenMutation, RevokeRefreshTokenMutationVariables>(RevokeRefreshTokenDocument, options);
      }
export type RevokeRefreshTokenMutationHookResult = ReturnType<typeof useRevokeRefreshTokenMutation>;
export type RevokeRefreshTokenMutationResult = Apollo.MutationResult<RevokeRefreshTokenMutation>;
export type RevokeRefreshTokenMutationOptions = Apollo.BaseMutationOptions<RevokeRefreshTokenMutation, RevokeRefreshTokenMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    user {
      id
      email
      username
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $username: String!, $password: String!) {
  register(email: $email, username: $username, password: $password)
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;