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
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createServer: Scalars['Boolean'];
  addUserToServer: Scalars['Boolean'];
  deleteUserFromServer: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  revokeRefreshToken: Scalars['Boolean'];
  login: LoginResponse;
  register: Scalars['Boolean'];
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
  usersOnServer: Array<User>;
  servers: Array<Server>;
  users: Array<User>;
  me?: Maybe<User>;
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

export type Subscription = {
  __typename?: 'Subscription';
  newServerUser: User;
  deleteServerUser: User;
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

export type CreateServerMutationVariables = Exact<{
  serverName: Scalars['String'];
}>;


export type CreateServerMutation = { __typename?: 'Mutation', createServer: boolean };

export type UsersOnServerQueryVariables = Exact<{
  serverId: Scalars['String'];
}>;


export type UsersOnServerQuery = { __typename?: 'Query', usersOnServer: Array<{ __typename?: 'User', username: string, id: string }> };

export type ServersQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type ServersQuery = { __typename?: 'Query', servers: Array<{ __typename?: 'Server', id: string, serverName: string }> };

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