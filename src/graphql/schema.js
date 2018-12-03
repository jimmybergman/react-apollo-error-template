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
    item: {type: ItemType},
  },
});

const generateCartData = withItem => {
  const item = {
    id: Math.random(),
    someValue: true,
  };

  return {
    id: 'cart',
    item: withItem ? item : null,
  };
}

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    cart: {
      type: CartType,
      resolve: () => generateCartData(false),
    },
  },
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createItem: {
      type: CartType,
      description: 'Creates an item',
      resolve: () => generateCartData(true),
    }
  }),
});

export const schema = new GraphQLSchema({ query: QueryType, mutation: MutationType });
