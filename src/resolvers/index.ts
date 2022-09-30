
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
import { RecordsArgs, Records, Link } from "../types";
import { SPECIAL_CHARACTERS } from '../config';
import { getHTMLTitle } from "../helpers";


export const resolvers = {
  Query: {
    records: async (_: any, args: RecordsArgs): Promise<Records> => {
      const { message } = args;

      // match any word that starts with @ and word characters (\w)
      const mentions = message.match(/(^|\s)@(\w+)/g) || [];

      // get all words that are within parenthesis ()
      const emoticonsRaw = message.match(/\(([^()]*)\)/g) || [];
      const emoticons = emoticonsRaw
        // remove leading and trailing parenthesis
        .map(emoticon => emoticon.slice(1, emoticon.length - 1))
        // filter out strings with special characters and lengths greater than 15
        .filter(emoticon => !SPECIAL_CHARACTERS.test(emoticon) && emoticon.length <= 15);

      // get all words that looks like a url
      const linksRaw = message.match(/([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi) || [];
      // parse URL's <title/>
      const links = await Promise.all(linksRaw.map((link) => getHTMLTitle(link.trim())));

      return {
        emoticons: emoticons,
        links: links.filter(link => link !== null) as Link[],
        mentions: mentions.map(el => el.replace('@', '').trim()),
      }
    }
  },
  // using the JSON type, because the exercise calls the links type without any sub-fields
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
};