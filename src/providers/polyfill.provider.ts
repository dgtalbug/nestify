import 'source-map-support/register';

import { AbstractDto } from 'src/common/dto';
import { AbstractEntity } from 'src/common/entities';
import * as _ from 'lodash';

declare global {
  interface Array<T> {
    toDtos<B extends AbstractDto>(this: AbstractEntity<B>[]): B[];
  }
}

Array.prototype.toDtos = function <B extends AbstractDto>(options?: any): B[] {
  return <B[]>_(this)
    .map((item) => item.toDto(options))
    .compact()
    .value();
};
