import { Mongo } from 'meteor/mongo';

// exports a new CheckIO collection for storing "Person's" check-in and check-out details
export const CheckedIO = new Mongo.Collection('checked_io');
