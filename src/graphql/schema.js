import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

const ItemType = new GraphQLObjectType({
  name: 'Item',
  fields: {
    someValue: {type: GraphQLBoolean},
    id: {type: GraphQLID},
  },
});

const CartType = new GraphQLObjectType({
  name: 'Cart',
  fields: {
    id: {type: GraphQLID},
    items: {type: new GraphQLList(ItemType)},
  },
});

const generateCartData = () => ({
  id: 'cart',
  items: [
    {
      id: Math.random(),
      someValue: true,
    }
  ],
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    cart: {
      type: CartType,
      resolve: generateCartData,
    },
  },
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    changeItems: {
      type: CartType,
      description: 'Deletes the old items and gives you new ones',
      resolve: generateCartData,
    }
  }),
});

export const schema = new GraphQLSchema({ query: QueryType, mutation: MutationType });
