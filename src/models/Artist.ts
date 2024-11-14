import { Model } from 'objection';
import Image from './Image';

class Artist extends Model {

    id!: number;
    name!: string;
    slug!: string;
    artsy_id!: string;

    images?: Image[];

    static tableName = 'artists';

    static get relationMappings () {
        return {
          images: {
            relation: Model.HasManyRelation,
            modelClass: Image,
            join: {
              from: 'artists.id',
              to: 'images.artist_id',
            },
          },
        };
      }
}

export default Artist;