declare module 'next-auth' {
  interface Session {
    user?: User;
  }
  interface jwt {
    id: string;
  }
}
