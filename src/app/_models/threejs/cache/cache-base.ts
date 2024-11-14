import {Group} from "three";
import {Base} from '../../game/base';

export interface CacheBase {
  base: Base,   // raw base
  model: Group, // model of the base
}
