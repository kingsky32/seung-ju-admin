export default {
  Query: {
    me(parent, args, { user }) {
      return user;
    },
  },
};
